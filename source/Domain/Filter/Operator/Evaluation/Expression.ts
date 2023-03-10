import { isStringWithPattern } from '@konfirm/guard';
import { isObject } from '../../../BSON';
import { accessor } from '../../../Field';
import { Evaluator } from '../../Compiler';
import * as Arithmetic from './Expression/Arithmetic';
import * as Comparison from './Expression/Comparison';

const expressions = {
    ...Arithmetic,
    ...Comparison,
};
const operators = Object.keys(expressions);

type Expressions = typeof expressions;
type IO<K extends keyof Expressions> = { input: Parameters<Expressions[K]>[0], output: ReturnType<Expressions[K]> };
type ExpressionIO = {
    [K in keyof Expressions]: IO<K>;
}
type ExpressionQuery = {
    [K in keyof ExpressionIO]: ExpressionIO[K]['input'];
}

export type Expression = unknown;
export type ExpressionResolver<T = any> = (input: any) => T;
export type FieldReference<T extends string = string> = `$${T}`;
export type ExpressionCompiler = <T = unknown>(query: Partial<ExpressionQuery> | FieldReference | unknown) => (input: any) => T;

/**
 * Type Guard for FieldReference types
 *
 * @param {*} input
 * @return {*}  {input is FieldReference}
 */
const isFieldReference = isStringWithPattern<FieldReference>(/^\$[a-zA-Z0-9]+/);

/**
 * Type Guard for ExpressionQuery types
 *
 * @param {*} input
 * @return {*}  {input is ExpressionQuery}
 */
function isExpressionQuery(input: any): input is ExpressionQuery {
    return isObject(input) && operators.some((key) => key in input);
}

/**
 * Compiler for expression queries, field resolvers and direct values
 *
 * @param {(Partial<ExpressionQuery> | FieldReference | unknown)} query
 * @return {*}  {(input: any) => any}
 */
function compile(query: Partial<ExpressionQuery> | FieldReference | unknown): (input: any) => any {
    if (isExpressionQuery(query)) {
        // TODO: allow for $comment
        const keys = Object.keys(query);
        const ops = keys.filter((key) => key in expressions).map((key) => {
            const op = expressions[key as keyof typeof expressions];
            const { [key as keyof typeof query]: value } = query;

            return (<(...args: Array<any>) => ReturnType<typeof op>>op)(value, compile);
        });

        return (input: any) => ops.reduce((carry, op) => op(carry), input);
    }

    if (isFieldReference(query)) {
        return accessor(query.slice(1));
    }

    return () => query;
}

/**
 * Compile expressions
 *
 * @export
 * @param {Partial<ExpressionQuery>} query
 * @return {*}  {ExpressionResolver}
 */
export function expression(query: Partial<ExpressionQuery>): ExpressionResolver {
    if (!isExpressionQuery(query)) {
        throw new Error(`Invalid expression: ${JSON.stringify(query)}`);
    }

    return compile(query);
}
