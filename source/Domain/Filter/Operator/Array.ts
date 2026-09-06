import { is, isArray, isObject } from '../../BSON';
import { CompareMode, deep, elementwise } from '../../Compare';
import type { CompileStep, Evaluator, Query } from '../Compiler';

export type Operation = {
	$all: Parameters<typeof $all>[0];
	$elemMatch: Parameters<typeof $elemMatch>[0];
	$size: Parameters<typeof $size>[0];
};

type ElemMatchClause = { $elemMatch: unknown };

function isElemMatchClause(value: unknown): value is ElemMatchClause {
	return isObject(value) && Object.keys(value as object).length === 1 && '$elemMatch' in (value as object);
}

const isNumber = is(1, 16, 18);

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

const restrictedInElemMatch = ['$where', '$text', '$expr'];

function assertNoRestrictedOperators(value: unknown): void {
	if (isArray(value)) {
		(value as Array<unknown>).forEach(assertNoRestrictedOperators);
		return;
	}
	if (!isObject(value)) {
		return;
	}

	Object.entries(value as object).forEach(([key, sub]) => {
		if (restrictedInElemMatch.includes(key)) {
			throw new Error(`${key} can only be applied to the top-level document`);
		}
		assertNoRestrictedOperators(sub);
	});
}

function assertElemMatch(query: unknown): asserts query is Query {
	if (!isObject(query)) {
		throw new Error('$elemMatch needs an Object');
	}

	assertNoRestrictedOperators(query);
}

/**
 * $all
 * Matches arrays that contain all elements specified in the query.
 * @syntax  { <field>: { $all: [ <value1> , <value2> ... ] } }
 *          { <field>: { $all: [ { $elemMatch: <query1> }, { $elemMatch: <query2> }, ... ] } }
 * @see      https://docs.mongodb.com/manual/reference/operator/query/all/
 */
export function $all(query: Array<unknown>, compile: CompileStep): Evaluator {
	if (!isArray(query)) {
		throw new Error('$all needs an array');
	}

	if (!query.length) {
		return () => false;
	}

	const elemMatchClauses = query.filter(isElemMatchClause);

	// elements are either all plain values (equality) or
	// all { $elemMatch: ... } clauses, mixing them throws
	if (elemMatchClauses.length && elemMatchClauses.length !== query.length) {
		throw new Error('no $ expressions in $all');
	}

	if (elemMatchClauses.length) {
		const evaluate = elemMatchClauses.map(({ $elemMatch: sub }) => $elemMatch(sub, compile));

		return (input: unknown): boolean => evaluate.every((evaluate) => evaluate(input));
	}

	const evaluate = query.map((value) => elementwise((other) => deep(value, other, CompareMode.EXPLICIT)));

	return (input: unknown): boolean => evaluate.every((evaluate) => evaluate(input));
}

/**
 * $elemMatch
 * Matches if the array field is a specified size.
 * @syntax  { <field>: { $elemMatch: { <query1>, <query2>, ... } } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
 */
export function $elemMatch(query: unknown, compile: CompileStep): Evaluator {
	assertElemMatch(query);

	const evaluate = Object.keys(query)
		.map((key) => compile({ [key]: query[key as keyof Query] }))

	return (input: unknown): boolean =>
		isArray(input)
		&& (input as Array<unknown>).some((value) =>
			evaluate.every((evaluate) => evaluate(value))
		);
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
