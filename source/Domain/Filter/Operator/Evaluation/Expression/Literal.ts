import { Evaluator } from "../../../Compiler";
import { ExpressionCompiler } from "../Expression";

export type Operation = {
    $literal: Parameters<typeof $literal>[0];
};
export type Result = {
    $literal: ReturnType<typeof $literal>;
};


/**
 * $literal
 * Returns a value without parsing. Use for values that the aggregation pipeline 
 * may interpret as an expression.
 * @syntax  { $literal: <value> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/
 */
export function $literal(query: unknown, _compile: ExpressionCompiler): Evaluator<unknown> {
    return () => query;
}
