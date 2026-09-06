import type { CompileStep, Evaluator, Query } from '../Compiler';
import { deep } from '../../Compare';
import { is, isArray } from '../../BSON';

export type Operation = {
	$all: Parameters<typeof $all>[0];
	$elemMatch: Parameters<typeof $elemMatch>[0];
	$size: Parameters<typeof $size>[0];
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

	const evaluate = query
		.map((value) => (input: Array<unknown>) =>
			input.indexOf(value) >= 0
			|| input.some((other) => deep(value, other))
		);

	return (input: unknown): boolean => {
		const normal = ([] as Array<unknown>).concat(input);

		return evaluate.every((evaluate) => evaluate(normal));
	};
}

/**
 * $elemMatch
 * Matches if the array field is a specified size.
 * @syntax  { <field>: { $elemMatch: { <query1>, <query2>, ... } } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
 */
export function $elemMatch(query: Query, compile: CompileStep): Evaluator {
	const evaluate = Object.keys(query)
		.map((key) => compile({ [key]: query[key as keyof Query] }))

	return (input: unknown): boolean =>
		isArray(input)
		&& (input as Array<unknown>).some((value) =>
			evaluate.every((evaluate) => evaluate(value))
		);
}

const isNumber = is(1, 16, 18);

// Confirmed against a live MongoDB 8.2.9: wrong type, NaN, +/-Infinity,
// non-integer, and negative are five distinct errors, checked in that
// order — same shape as $type/Bitwise's validation, different wording.
function assertValidSize(query: unknown): asserts query is number {
	if (!isNumber(query)) {
		throw new Error(`Failed to parse $size. Expected a number in: $size: ${query}`);
	}
	if (Number.isNaN(query)) {
		throw new Error(`Failed to parse $size. Expected an integer, but found NaN in: $size: ${query}`);
	}
	if (!Number.isFinite(query)) {
		throw new Error(`Failed to parse $size. Cannot represent as a 64-bit integer: $size: ${query}`);
	}
	if (!Number.isInteger(query)) {
		throw new Error(`Failed to parse $size. Expected an integer: $size: ${query}`);
	}
	if ((query as number) < 0) {
		throw new Error(`Failed to parse $size. Expected a non-negative number in: $size: ${query}`);
	}
}

/**
 * $size
 * Matches if the array field is a specified size.
 * @syntax  { <field>: { $size: number } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/size/
 */
export function $size(query: number): Evaluator {
	assertValidSize(query);

	return (input: unknown) => isArray(input) && (input as Array<unknown>).length === query;
}
