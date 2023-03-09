import { Evaluator } from '../../../Compiler';
import { Expression, ExpressionCompiler } from '../Expression';

export type Operation = {
    $cmp: Parameters<typeof $cmp>[0];
    $eq: Parameters<typeof $eq>[0];
    $gt: Parameters<typeof $gt>[0];
    $gte: Parameters<typeof $gte>[0];
    $lt: Parameters<typeof $lt>[0];
    $lte: Parameters<typeof $lte>[0];
    $ne: Parameters<typeof $ne>[0];
};
export type Result = {
    $cmp: ReturnType<typeof $cmp>;
    $eq: ReturnType<typeof $eq>;
    $gt: ReturnType<typeof $gt>;
    $gte: ReturnType<typeof $gte>;
    $lt: ReturnType<typeof $lt>;
    $lte: ReturnType<typeof $lte>;
    $ne: ReturnType<typeof $ne>;
};


/**
 * $cmp
 * Returns 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
 * @syntax  { $cmp: [ <expression1>, <expression2> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/cmp/
 */
export function $cmp(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<-1 | 0 | 1> {
    const resolve = query.map(compile);

    return (input: any): -1 | 0 | 1 => {
        const [a, b] = resolve.map((f) => f(input));

        return <any>a < <any>b ? -1 : Number(<any>a > <any>b) as -1 | 0 | 1;
    }
}

/**
 * $eq
 * Returns true if the values are equivalent.
 * @syntax { $cmp: [ <expression1>, <expression2> ] }
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/eq/
 */
export function $eq(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return a == b;
    };
}

/**
 * $gt
 * Returns true if the first value is greater than the second.
 * @syntax 
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/gt/
 */
export function $gt(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    console.log()
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return <any>a > <any>b;
    };
}

/**
 * $gte
 * Returns true if the first value is greater than or equal to the second.
 * @syntax 
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/gte/
 */
export function $gte(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return <any>a >= <any>b;
    };
}

/**
 * $lt
 * Returns true if the first value is less than the second.
 * @syntax 
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/lt/
 */
export function $lt(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return <any>a < <any>b;
    };
}

/**
 * $lte
 * Returns true if the first value is less than or equal to the second.
 * @syntax 
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/lte/
 */
export function $lte(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return <any>a <= <any>b;
    };
}

/**
 * $ne
 * Returns true if the values are not equivalent.
 * @syntax 
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/ne/
 */
export function $ne(query: [Expression, Expression], compile: ExpressionCompiler): Evaluator<boolean> {
    const resolve = query.map(compile);

    return (input: any): boolean => {
        const [a, b] = resolve.map((f) => f(input));

        return a != b;
    };
}
