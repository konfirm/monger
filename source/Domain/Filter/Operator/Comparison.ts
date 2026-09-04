import { isArray, isObject, isRegex } from "../../BSON";
import {
	bsonCompare,
	CompareMode,
	deep,
	elementwise,
	isComparable,
	type,
} from "../../Compare";
import type { Evaluator } from "../Compiler";

type Primitive = string | number | boolean;
type Comparable = Primitive | Array<Comparable> | { [key: string]: Comparable };

export type Operation = {
	$eq: Parameters<typeof $eq>[0];
	$gt: Parameters<typeof $gt>[0];
	$gte: Parameters<typeof $gte>[0];
	$in: Parameters<typeof $in>[0];
	$lt: Parameters<typeof $lt>[0];
	$lte: Parameters<typeof $lte>[0];
	$ne: Parameters<typeof $ne>[0];
	$nin: Parameters<typeof $nin>[0];
};

function predicate(
	query: Primitive,
	predicate: (value: number) => boolean,
): Evaluator {
	if (isRegex(query)) {
		throw new Error("Can't have RegEx as arg to predicate over field");
	}

	return elementwise(
		(value) =>
			isComparable(value, query) && predicate(bsonCompare(value, query)),
	);
}

// $in/$nin take a list of literal values to match — an object element
// containing an operator key would be a nested operator expression, which
// MongoDB rejects outright ("cannot nest $ under $in").
function noNestedOperator(query: Array<unknown>): void {
	const nested = query.some(
		(value) => isObject(value) && Object.keys(value as object).some((key) => key.startsWith('$')),
	);

	if (nested) {
		throw new Error('cannot nest $ under $in');
	}
}

/**
 * $eq
 * Matches values that are equal to a specified value.
 * @syntax  { <field>: { $eq: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/eq/
 */
export function $eq(query: RegExp | Comparable): Evaluator {
	return elementwise((value) => deep(query, value, CompareMode.EXPLICIT));
}

/**
 * $gt
 * Matches values that are greater than a specified value.
 * @syntax  { <field>: { $gt: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/gt/
 */
export function $gt(query: Primitive): Evaluator {
	return predicate(query, (value) => value > 0);
}

/**
 * $gte
 * Matches values that are greater than or equal to a specified value.
 * @syntax  { <field>: { $gte: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/gte/
 */
export function $gte(query: Primitive): Evaluator {
	return predicate(query, (value) => value >= 0);
}

/**
 * $in
 * Matches any of the values specified in an array.
 * @syntax  { <field>: { $in: [<value1>, <value2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/in/
 */
export function $in(query: Array<unknown>): Evaluator {
	if (!isArray(query)) {
		throw new Error('$in requires an array');
	}
	noNestedOperator(query);

	return elementwise((value) => query.some((q) => deep(q, value, CompareMode.MONGODB)));
}

/**
 * $lt
 * Matches values that are less than a specified value.
 * @syntax  { <field>: { $lt: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/lt/
 */
export function $lt(query: Primitive): Evaluator {
	return predicate(query, (value) => value < 0);
}

/**
 * $lte
 * Matches values that are less than or equal to a specified value.
 * @syntax  { <field>: { $lte: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/lte/
 */
export function $lte(query: Primitive): Evaluator {
	return predicate(query, (value) => value <= 0);
}

/**
 * $ne
 * Matches all values that are not equal to a specified value.
 * @syntax  { <field>: { $ne: <value> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/ne/
 */
export function $ne(query: Primitive): Evaluator {
	if (isRegex(query)) {
		throw new Error("Can't have regex as arg to $ne.");
	}

	const matches = elementwise((value) => deep(query, value, CompareMode.MONGODB));
	return (input: unknown) => !matches(input);
}

/**
 * $nin
 * Matches none of the values specified in an array.
 * @syntax  { <field>: { $nin: [<value1>, <value2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/nin/
 */
export function $nin(query: Array<unknown>): Evaluator {
	if (!isArray(query)) {
		throw new Error('$nin requires an array');
	}
	noNestedOperator(query);

	const matches = elementwise((value) => query.some((q) => deep(q, value, CompareMode.MONGODB)));
	return (input: unknown) => !matches(input);
}
