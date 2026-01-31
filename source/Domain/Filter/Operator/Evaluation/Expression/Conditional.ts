import {
	any,
	all,
	not,
	isArray,
	isArrayOfSize,
	isArrayOfType,
	isKey,
	isObject,
	isStructure,
	isNumber,
} from "@konfirm/guard";
import { isNULL, isUndefined } from "../../../../BSON";
import { ExpressionCompiler, FieldReference } from "../Expression";
import { Evaluator } from "../../../Compiler";

export type Operation = {
	$cond: Parameters<typeof $cond>[0];
	$ifNull: Parameters<typeof $ifNull>[0];
	$switch: Parameters<typeof $switch>[0];
};
export type Result = {
	$cond: ReturnType<typeof $cond>;
	$ifNull: ReturnType<typeof $ifNull>;
	$switch: ReturnType<typeof $switch>;
};

type ConditionObject = {
	if: unknown;
	then: unknown;
	else: unknown;
};
const isConditionObject = all<ConditionObject>(
	isKey("if"),
	isKey("then"),
	isKey("else"),
);

type ConditionArray = [
	ConditionObject["if"],
	ConditionObject["then"],
	ConditionObject["else"],
];

function isConditionArray(input: any): input is ConditionArray {
	return isArray(input) && input.length === 3;
}

type Condition = ConditionObject | ConditionArray;

type SwitchBranch = {
	case: unknown;
	then: unknown;
};

const isDefined = all(not(isNULL), not(isUndefined));
const isSwitchBranch = isStructure({
	case: isDefined,
	then: isDefined,
});

type SwitchObject = {
	branches: Array<SwitchBranch>;
	default?: unknown;
};

const isSwitchObject = isStructure(
	{
		branches: isArrayOfType(isSwitchBranch),
		default: isDefined,
	},
	"default",
);

/**
 * Check if value is falsy (MongoDB-style)
 * null, undefined, false, 0, '', NaN are falsy
 */
export const isFalsy = any(
	isNULL,
	isUndefined,
	all(isNumber, isNaN),
	(v) => !Boolean(v),
);

/**
 * Helper to check if a value is truthy (MongoDB-style)
 * In MongoDB, null, undefined, 0, '', false are falsy
 * Everything else is truthy
 */
export const isTruthy = not(isFalsy);

/**
 * $cond
 * Evaluates a boolean expression to return one of the two specified return expressions.
 * Supports both object syntax: { if: <condition>, then: <true-case>, else: <false-case> }
 * And array syntax: [ <condition>, <true-case>, <false-case> ]
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/cond/#mongodb-expression-exp.-cond
 */
export function $cond(
	query: Condition,
	compile: ExpressionCompiler,
): Evaluator<any> {
	let normalized: ConditionArray;

	if (isArray(query)) {
		if (isConditionArray(query)) {
			normalized = query;
		} else {
			throw new Error("$cond array must have exactly 3 elements");
		}
	} else if (isObject(query)) {
		if (isConditionObject(query)) {
			normalized = [query.if, query.then, query.else];
		} else {
			throw new Error(
				"$cond object must have if, then, and else properties",
			);
		}
	} else {
		throw new Error(
			"$cond should be [condition, then, else] or {if: ..., then: ..., else: ...}",
		);
	}

	const [condition, ok, nok] = normalized.map((v) => compile(v));

	return (input: any) =>
		isTruthy(condition(input)) ? ok(input) : nok(input);
}

const isIfNullQuery = isArrayOfSize(2, 2);
/**
 * $ifNull
 * Returns the first expression if it evaluates to a non-null value.
 * Otherwise, $ifNull returns the second expression's value.
 * @syntax { $ifNull: [ <expression>, <replacement-expression> ] }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/ifNull/#mongodb-expression-exp.-ifNull
 */
export function $ifNull(
	query: [unknown, unknown],
	compile: ExpressionCompiler,
): Evaluator<any> {
	if (!isIfNullQuery(query)) {
		throw new Error("$ifNull must be an array with exactly 2 elements");
	}

	const [prefer, otherwise] = query.map(compile);

	return (input: any) => prefer(input) ?? otherwise(input);
}

type CompiledBranch = {
	test: Evaluator<boolean>;
	apply: Evaluator<unknown>;
};

function compileBranch(
	branch: SwitchBranch,
	compile: ExpressionCompiler,
): CompiledBranch {
	return {
		test: compile(branch.case),
		apply: compile(branch.then),
	};
}

/**
 * $switch
 * Evaluates a series of case expressions. When it finds an expression which
 * evaluates to true, $switch executes a specified expression and breaks out
 * of the control flow.
 * @syntax {
 *   $switch: {
 *     branches: [
 *       { case: <expression>, then: <expression> },
 *       ...
 *     ],
 *     default: <expression>
 *   }
 * }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/switch/#mongodb-expression-exp.-switch
 */
export function $switch(
	query: SwitchObject,
	compile: ExpressionCompiler,
): Evaluator<any> {
	if (!isSwitchObject(query)) {
		throw new Error("$switch must be an object");
	}
	const otherwise = query.default ? compile(query.default) : () => null;
	const branches: Array<CompiledBranch> = [
		...query.branches.map((branch) => compileBranch(branch, compile)),
		{
			test: () => true,
			apply: otherwise,
		},
	];

	return (input: any) => {
		const found = branches.find(({ test }) => test(input));

		return found?.apply(input);
	};
}
