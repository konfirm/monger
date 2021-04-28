import type { Evaluator, CompileStep } from '../Query/Compiler';

export type Operation = {
	$and: Parameters<typeof $and>[0];
	$not: Parameters<typeof $not>[0];
	$nor: Parameters<typeof $nor>[0];
	$or: Parameters<typeof $or>[0];
};

/**
  * $and
  * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
  * @syntax  { $and: [{ <expression1> }, { <expression2> }, ...] }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/and/
  */
export function $and(query: unknown[], compile: CompileStep): Evaluator {
	const conditions = query.map((nested) => compile(nested));

	return (input: any) => conditions.every((evaluate) => evaluate(input));
};

/**
  * $not
  * Inverts the effect of a query expression and returns documents that do not match the query expression.
  * @syntax  { <field>: { $not: { <operator-expression> } } }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/not/
  */
export function $not(query: unknown, compile: CompileStep): Evaluator {
	const evaluate = compile(query);

	return (input: any) => !evaluate(input);
};

/**
  * $nor
  * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
  * @syntax  { $nor: [ { <expression1> }, { <expression2> }, ...] }
  * @see     https://docs.mongodb.com/manual/reference/operator/query/nor/
  */
export function $nor(value: unknown[], compile: CompileStep): Evaluator {
	const conditions = value.map((query) => compile(query));

	return (input: any) => conditions.every((evaluate) => !evaluate(input));
};

/**
 * $or
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 * @syntax  { $or: [ { <expression1> }, { <expression2> }, ...} ] }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/or/
 */
export function $or(query: unknown[], compile: CompileStep): Evaluator {
	const conditions = query.map((nested) => compile(nested));

	return (input: any) => conditions.some((evaluate) => evaluate(input));
};
