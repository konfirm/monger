// $cond
// A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters.
// $ifNull
// Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null.
// $switch
// Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.

// export type Operation = {
// 	$all: Parameters<typeof $all>[0];
// 	$elemMatch: Parameters<typeof $elemMatch>[0];
// 	$size: Parameters<typeof $size>[0];
// };

type ConditionObject = {
    if: unknown;
    then: unknown;
    else: unknown;
};
type ConditionArray = [ConditionObject['if'], ConditionObject['then'], ConditionObject['else']];
type Condition = ConditionObject | ConditionArray;


/**
 * $cond
 * Evaluates a boolean expression to return one of the two specified return expressions.
 * @syntax { $cond: { if: <boolean-expression>, then: <true-case>, else: <false-case> } }
 *         { $cond: [ <boolean-expression>, <true-case>, <false-case> ] }
 * @see    https://docs.mongodb.com/manual/reference/operator/aggregation/cond/#mongodb-expression-exp.-cond
 */
export function $cond(query: Condition) { }