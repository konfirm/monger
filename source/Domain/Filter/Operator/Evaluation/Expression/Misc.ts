import { Evaluator } from "../../../Compiler";
import { Expression, ExpressionCompiler } from "../Expression";
import { util } from "../../../../Util";

export type Operation = {
	$getField: Parameters<typeof $getField>[0];
	$rand: Parameters<typeof $rand>[0];
	$sampleRate: Parameters<typeof $sampleRate>[0];
};
export type Result = {
	$getField: ReturnType<typeof $getField>;
	$rand: ReturnType<typeof $rand>;
	$sampleRate: ReturnType<typeof $sampleRate>;
};

type FieldExpression =
	| string
	| {
			field: string;
			input?: Expression<{ [key: string]: unknown }>;
	  };
type SampleRateExpression = number;

/**
 * $getField
 * Returns the value of a specified field from a document. You can use $getField to retrieve the value of fields with names that contain periods (.) or start with dollar signs ($).
 * @syntax    $getField: { field: <String>, input: <Object> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/
 * @version 5.0
 */
export function $getField(
	query: FieldExpression,
	compile: ExpressionCompiler,
): Evaluator<unknown> {
	const { field, input: target = "$$CURRENT" } =
		typeof query === "string" ? { field: query } : query;
	const resolve = compile(target);

	return (input: any) => {
		const scope = resolve(input);

		return typeof scope === "object" && scope && field in scope
			? (<{ [key: string]: unknown }>scope)?.[field]
			: null;
	};
}

/**
 * $rand
 * Returns a random float between 0 and 1
 * @syntax  { $rand: {} }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/rand/
 * @version 4.4.2
 */
export function $rand(
	_query: Expression,
	_compile?: ExpressionCompiler,
): Evaluator<number> {
	return (_input: any): number => Math.random();
}

/**
 * $sampleRate
 * Randomly select documents at a given rate. Although the exact number of
 * documents selected varies on each run, the quantity chosen approximates the
 * sample rate expressed as a percentage of the total number of documents.
 * @syntax  { $sampleRate: <non-negative float> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/sampleRate/
 * @version 4.4.2
 */
export function $sampleRate(
	query: SampleRateExpression,
	_compile?: ExpressionCompiler,
): Evaluator<unknown> {
	if (query <= 0) return (_input: unknown) => false;
	if (query >= 1) return (_input: unknown) => true;

	const phase = util.rand();
	let count = 0;
	let selected = 0;

	return (_input: unknown) => {
		const target = Math.floor(++count * query + phase);
		if (target > selected) {
			selected = target;
			return true;
		}
		return false;
	};
}
