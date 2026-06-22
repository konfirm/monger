import { type } from "../../../../BSON";
import { Evaluator } from "../../../Compiler";
import { Expression, ExpressionCompiler } from "../Expression";

export type Operation = {
	$convert: Parameters<typeof $convert>[0];
	$isNumber: Parameters<typeof $isNumber>[0];
	$toBool: Parameters<typeof $toBool>[0];
	$toDate: Parameters<typeof $toDate>[0];
	$toDecimal: Parameters<typeof $toDecimal>[0];
	$toDouble: Parameters<typeof $toDouble>[0];
	$toInt: Parameters<typeof $toInt>[0];
	$toLong: Parameters<typeof $toLong>[0];
	$toObjectId: Parameters<typeof $toObjectId>[0];
	$toString: Parameters<typeof $toString>[0];
	$type: Parameters<typeof $type>[0];
};
export type Result = {
	$convert: ReturnType<typeof $convert>;
	$isNumber: ReturnType<typeof $isNumber>;
	$toBool: ReturnType<typeof $toBool>;
	$toDate: ReturnType<typeof $toDate>;
	$toDecimal: ReturnType<typeof $toDecimal>;
	$toDouble: ReturnType<typeof $toDouble>;
	$toInt: ReturnType<typeof $toInt>;
	$toLong: ReturnType<typeof $toLong>;
	$toObjectId: ReturnType<typeof $toObjectId>;
	$toString: ReturnType<typeof $toString>;
	$type: ReturnType<typeof $type>;
};

type BSONTypeAlias =
	| "double"
	| "string"
	| "object"
	| "array"
	| "undefined"
	| "bool"
	| "date"
	| "null"
	| "regex"
	| "javascript"
	| "symbol"
	| "int"
	| "long";
const typeAliasList: Array<BSONTypeAlias> = [
	"double",
	"string",
	"object",
	"array",
	"undefined",
	"bool",
	"date",
	"null",
	"regex",
	"javascript",
	"symbol",
	"int",
	"long",
];
function isBSONTypeAlias(input: any): input is BSONTypeAlias {
	return typeAliasList.includes(input);
}

type BSONTypeID = 1 | 2 | 3 | 4 | 6 | 8 | 9 | 10 | 11 | 13 | 14 | 16 | 18;
const typeIDList: Array<BSONTypeID> = [
	1, 2, 3, 4, 6, 8, 9, 10, 11, 13, 14, 16, 18,
];
function isBSONTypeID(input: any): input is BSONTypeID {
	return typeIDList.includes(input);
}
type BSONType = BSONTypeID | BSONTypeAlias;
function isBSONType(input: any): input is BSONType {
	return isBSONTypeAlias(input) || isBSONTypeID(input);
}

type Convert = {
	input: Expression;
	to: Expression | BSONType;
	onError?: Expression;
	onNull?: Expression;
};

/**
 * $convert
 * Converts a value to a specified type.
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $convert(
	query: Convert,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	const input = compile(query.input);
	const to = compile(query.to);
	const onError = query.onError && compile(query.onError);
	const onNull = query.onNull && compile(query.onNull);

	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $isNumber
 * Returns boolean true if the specified expression resolves to an integer, decimal, double, or long
 * @syntax  ...
 * @see     ...
 * @version 4.4
 */
export function $isNumber(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toBool
 * Converts value to a boolean.
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toBool(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toDate
 * Converts value to a Date.
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toDate(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toDecimal
 * Converts value to a Decimal128
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toDecimal(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toDouble
 * Converts value to a double
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toDouble(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toInt
 * Converts value to an integer
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toInt(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toLong
 * Converts value to a long
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toLong(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toObjectId
 * Converts value to an ObjectId
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toObjectId(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $toString
 * Converts value to a string
 * @syntax  ...
 * @see     ...
 * @version 4.0
 */
export function $toString(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	return (input: any) => {
		throw new Error("not implemented");
	};
}

/**
 * $type
 * Return the BSON data type of the field
 * @syntax  ...
 * @see     ...
 */
export function $type(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	const expression = compile(query as Expression);

	return (input: any) => {
		const value = expression(input);
		// if (value === undefined) return 'missing';
		return type(value);
	};
}
