import type { Evaluator } from '../Compiler';
import { deep } from '../../Compare';

export type Operation = {
	$all: Parameters<typeof $all>[0];
};

/**
 * $all
 * Matches arrays that contain all elements specified in the query.
 * @syntax  { <field>: { $all: [ <value1> , <value2> ... ] } }
 * @see      https://docs.mongodb.com/manual/reference/operator/query/all/
 */
export function $all(query: Array<unknown>): Evaluator {
	/*
	"ok" : 0,
		"errmsg" : "$all needs an array",
		"code" : 2,
		"codeName" : "BadValue"
	*/

	const condition = query
		.map((value) => (input: Array<unknown>) =>
			input.indexOf(value) >= 0
			|| input.some((other) => deep(value, other))
		);

	return (input: unknown): boolean => {
		const normal = ([] as Array<unknown>).concat(input);

		return condition.every((cond) => cond(normal));
	};
}
