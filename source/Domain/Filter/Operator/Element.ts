import type { Evaluator } from '../Compiler';
import { is, isArray } from '../../BSON';

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

/**
 * $type
 * Selects documents if a field is of the specified type.
 * @syntax  { <field>: { $type: <BSON type> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/type/
 */
export function $type(query: TypeIdentifier | Array<TypeIdentifier>): Evaluator {
	const type = isArray(query) ? is(...(query as Array<TypeIdentifier>)) : is(query as TypeIdentifier);

	return (input: unknown) => type(input);
};
