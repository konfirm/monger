import type { Evaluator } from '../Compiler';
import { is, isArray, isBSONAlias, isBSONID } from '../../BSON';
import { any, isArrayOfType, isNumber, isString } from '@konfirm/guard';

type TypeIdentifier = Parameters<typeof is>[0];

export type Operation = {
	$exists: Parameters<typeof $exists>[0];
	$type: Parameters<typeof $type>[0];
};

/**
 * $exists
 * Matches documents that have the specified field.
 * @syntax  { <field>: { $exists: <boolean> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/exists/
 */
export function $exists(query: boolean): Evaluator {
	const und = (input: any): boolean => input === null || typeof input === 'undefined';
	const exists = !query;

	return (input: any) => und(input) === exists;
};

function isTypeIdentifier(input: unknown): input is TypeIdentifier {
	return isBSONID(input) || isBSONAlias(input);
}

const isTypeIdentifierValueOrArray = any<TypeIdentifier | Array<TypeIdentifier>>(
	isTypeIdentifier,
	isArrayOfType(isTypeIdentifier)
);

/**
 * $type
 * Selects documents if a field is of the specified type.
 * @syntax  { <field>: { $type: <BSON type> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/type/
 */
export function $type(query: TypeIdentifier | Array<TypeIdentifier>): Evaluator {
	if (!isTypeIdentifierValueOrArray(query)) {
		throw new Error('"type must be represented as a number or a string');
	}

	const type = isArray(query) ? is(...(query as Array<TypeIdentifier>)) : is(query as TypeIdentifier);

	return (input: unknown) => type(input);
};
