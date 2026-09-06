import { any, isArrayOfType, isNumber, isString, isStringWithPattern, isUndefined } from "@konfirm/guard";
import { is, isArray, isBSONAlias, isBSONID } from "../../BSON";
import { elementwise } from "../../Compare";
import type { Evaluator } from "../Compiler";

// "number" is a $type-only convenience alias, not a real BSON type
const NUMBER_ALIAS: Array<TypeIdentifier> = [1, 16, 18, 19];

type TypeIdentifier = Parameters<typeof is>[0] | "number";
// signal intent from a type, Boolish will be cast to boolean, $exists needs it
type Boolish = unknown;

export type Operation = {
	$exists: Parameters<typeof $exists>[0];
	$type: Parameters<typeof $type>[0];
};

const isTypeIdentifier = any<TypeIdentifier>(
	isBSONAlias,
	isBSONID,
	(v) => v === "number", // allow the $type specific 'number' type
);
const isTypeIdentifierArray =
	isArrayOfType<Array<TypeIdentifier>>(isTypeIdentifier);

/**
 * Assert the type identifier and throw the appropriate message if not
 * @param value
 */
function assertTypeIdentifier(value: unknown): asserts value is TypeIdentifier {
	if (isTypeIdentifier(value)) return;

	const message = isString(value)
		? `Unknown type name alias: ${value}`
		: isNumber(value)
			? `Invalid numerical type code: ${value}`
			: "type must be represented as a number or a string";

	throw new Error(message);
}

/**
 * Ensure the $type specific 'number' type is mapped as real BSON value
 * @param query
 * @returns query
 */
function normalizeTypes(query: Operation["$type"]): Operation["$type"] {
	if (isTypeIdentifierArray(query)) return query.flatMap(normalizeTypes);

	return query === "number" ? NUMBER_ALIAS : query;
}

/**
 * $exists
 * Matches documents that have the specified field.
 * @syntax  { <field>: { $exists: <boolean> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/exists/
 */
export function $exists(query: Boolish): Evaluator {
	const shouldExist = Boolean(query);

	return (input: unknown) => isUndefined(input) !== shouldExist;
}

/**
 * $type
 * Selects documents if a field is of the specified type.
 * @syntax  { <field>: { $type: <BSON type> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/type/
 */
export function $type(
	query: TypeIdentifier | Array<TypeIdentifier>,
): Evaluator {
	const expanded = normalizeTypes(query);

	if (isArray(expanded)) {
		const identifiers = expanded as Array<unknown>;

		if (!identifiers.length) {
			throw new Error("value must match at least one type");
		}
		identifiers.forEach(assertTypeIdentifier);
	} else {
		assertTypeIdentifier(expanded);
	}

	const type = isArray(expanded)
		? is(...(expanded as Array<TypeIdentifier>))
		: is(expanded as TypeIdentifier);

	// the BSON `undefined` (deprecated type 6) is not implemented, so the
	// behavior is on par with what mongo (since the deprecation) does
	return elementwise((value) => typeof value !== 'undefined' && type(value));
}
