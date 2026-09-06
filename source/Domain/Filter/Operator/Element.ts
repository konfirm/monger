import { any, isArrayOfType } from '@konfirm/guard';
import { is, isArray, isBSONAlias, isBSONID } from '../../BSON';
import { elementwise } from '../../Compare';
import type { Evaluator } from '../Compiler';

type TypeIdentifier = Parameters<typeof is>[0];

export type Operation = {
	$exists: Parameters<typeof $exists>[0];
	$type: Parameters<typeof $type>[0];
};

function isTypeIdentifier(input: unknown): input is TypeIdentifier {
	return isBSONID(input) || isBSONAlias(input);
}

const isTypeIdentifierValueOrArray = any<TypeIdentifier | Array<TypeIdentifier>>(
	isTypeIdentifier,
	isArrayOfType(isTypeIdentifier)
);

/**
 * $exists
 * Matches documents that have the specified field.
 * @syntax  { <field>: { $exists: <boolean> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/exists/
 */
export function $exists(query: boolean): Evaluator {
	// A field explicitly set to null still exists
	const missing = (input: any): boolean => typeof input === 'undefined';
	// query isn't guaranteed to be a real boolean
	// e.g. Mongo $exists:0 or $exists:"yes"
	const shouldExist = Boolean(query);

	return (input: unknown) => missing(input) !== shouldExist;
};

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

	return elementwise(type);
};
