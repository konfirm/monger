import type { Evaluator } from '../Query/Compiler';

type Primitive = string | number | boolean;

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

/**
  * $eq
  * Matches values that are equal to a specified value.
  * @syntax  { <field>: { $eq: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/eq/
  */
export function $eq(query: Primitive): Evaluator {
	return (input: unknown) => input === query;
}

/**
  * $gt
  * Matches values that are greater than a specified value.
  * @syntax  { <field>: { $gt: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/gt/
  */
export function $gt(query: Primitive): Evaluator {
	return (input: any) => typeof input === typeof query && input > query;
}

/**
  * $gte
  * Matches values that are greater than or equal to a specified value.
  * @syntax  { <field>: { $gte: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/gte/
  */
export function $gte(query: Primitive): Evaluator {
	return (input: any) => typeof input === typeof query && input >= query;
}

/**
  * $in
  * Matches any of the values specified in an array.
  * @syntax  { <field>: { $in: [<value1>, <value2>, ...] } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/in/
  */
export function $in(query: Array<unknown>): Evaluator {
	return (input: unknown) => query.includes(input);
}

/**
  * $lt
  * Matches values that are less than a specified value.
  * @syntax  { <field>: { $lt: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/lt/
  */
export function $lt(query: Primitive): Evaluator {
	return (input: any) => typeof input === typeof query && input < query;
}

/**
  * $lte
  * Matches values that are less than or equal to a specified value.
  * @syntax  { <field>: { $lte: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/lte/
  */
export function $lte(query: Primitive): Evaluator {
	return (input: any) => typeof input === typeof query && input <= query;
}

/**
  * $ne
  * Matches all values that are not equal to a specified value.
  * @syntax  { <field>: { $ne: <value> } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/ne/
  */
export function $ne(query: Primitive): Evaluator {
	return (input: unknown) => input !== query;
}

/**
  * $nin
  * Matches none of the values specified in an array.
  * @syntax  { <field>: { $nin: [<value1>, <value2>, ...] } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/nin/
  */
export function $nin(query: Array<unknown>): Evaluator {
	return (input: unknown) => !query.includes(input);
}
