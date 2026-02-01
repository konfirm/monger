import { isArray, any, all } from "@konfirm/guard";
import { isNULL, isUndefined } from "../../../../BSON";
import { ExpressionCompiler, FieldReference } from "../Expression";
import { Evaluator } from "../../../Compiler";
import { isTruthy, isFalsy } from "./Conditional";

export type Operation = {
	$and: Parameters<typeof $and>[0];
	$isArray: Parameters<typeof $isArray>[0];
	$not: Parameters<typeof $not>[0];
	$or: Parameters<typeof $or>[0];
};
export type Result = {
	$and: ReturnType<typeof $and>;
	$isArray: ReturnType<typeof $isArray>;
	$not: ReturnType<typeof $not>;
	$or: ReturnType<typeof $or>;
};

/**
 * $isArray
 * Determines if the operand is an array. Returns a boolean.
 * @syntax { $isArray: <expression> }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/isArray/#mongodb-expression-exp.-isArray
 */
export function $isArray(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<boolean> {
	if (query === undefined) {
		throw new Error("$isArray must have an expression");
	}

	const expression = compile(query);

	return (input: any) => isArray(expression(input));
}

/**
 * $and
 * Returns true only when all its expressions evaluate to true.
 * Accepts any number of argument expressions.
 * @syntax { $and: [ <expression1>, <expression2>, ... <expressionN> ] }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/and/#mongodb-expression-exp.-and
 */
export function $and(
	query: Array<unknown>,
	compile: ExpressionCompiler,
): Evaluator<boolean> {
	if (!isArray(query)) {
		throw new Error("$and must be an array");
	}

	const expressions = query.map(compile);

	return (input: any) => expressions.every((expr) => isTruthy(expr(input)));
}

/**
 * $or
 * Returns true when any of its expressions evaluates to true.
 * Accepts any number of argument expressions.
 * @syntax { $or: [ <expression1>, <expression2>, ... <expressionN> ] }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/or/#mongodb-expression-exp.-or
 */
export function $or(
	query: Array<unknown>,
	compile: ExpressionCompiler,
): Evaluator<boolean> {
	if (!isArray(query)) {
		throw new Error("$or must be an array");
	}

	const expressions = query.map(compile);

	return (input: any) => expressions.some((expr) => isTruthy(expr(input)));
}

/**
 * $not
 * Returns the boolean value that is the opposite of its argument expression.
 * Accepts a single argument expression.
 * @syntax { $not: <expression> }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/not/#mongodb-expression-exp.-not
 */
export function $not(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<boolean> {
	console.log({ query });
	if (query === undefined) {
		throw new Error("$not must have an expression");
	}

	const expression = compile(query);

	return (input: any) => isFalsy(expression(input));
}
