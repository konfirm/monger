import type { Evaluator } from '../Query/Compiler';
import { is } from '../BSON';

type TypeArg = number | string;

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
export function $type(query: TypeArg | Array<TypeArg>): Evaluator {
	const type = is(query);

	return (input: unknown) => type(input);
};
