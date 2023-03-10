import { ExpressionCompiler, FieldReference } from "../Expression";
import { isNULL, isUndefined } from "../../../../BSON";
import { Evaluator } from "../../../Compiler";
import { any, isNumber } from "@konfirm/guard";

export type Operation = {
    $abs: Parameters<typeof $abs>[0];
    $add: Parameters<typeof $add>[0];
    $ceil: Parameters<typeof $ceil>[0];
    $divide: Parameters<typeof $divide>[0];
    $exp: Parameters<typeof $exp>[0];
    $floor: Parameters<typeof $floor>[0];
    $ln: Parameters<typeof $ln>[0];
    $log: Parameters<typeof $log>[0];
    $log10: Parameters<typeof $log10>[0];
    $mod: Parameters<typeof $mod>[0];
    $multiply: Parameters<typeof $multiply>[0];
    $pow: Parameters<typeof $pow>[0];
    $round: Parameters<typeof $round>[0];
    $sqrt: Parameters<typeof $sqrt>[0];
    $subtract: Parameters<typeof $subtract>[0];
    $trunc: Parameters<typeof $trunc>[0];
};
export type Result = {
    $abs: ReturnType<typeof $abs>;
    $add: ReturnType<typeof $add>;
    $ceil: ReturnType<typeof $ceil>;
    $divide: ReturnType<typeof $divide>;
    $exp: ReturnType<typeof $exp>;
    $floor: ReturnType<typeof $floor>;
    $ln: ReturnType<typeof $ln>;
    $log: ReturnType<typeof $log>;
    $log10: ReturnType<typeof $log10>;
    $mod: ReturnType<typeof $mod>;
    $multiply: ReturnType<typeof $multiply>;
    $pow: ReturnType<typeof $pow>;
    $round: ReturnType<typeof $round>;
    $sqrt: ReturnType<typeof $sqrt>;
    $subtract: ReturnType<typeof $subtract>;
    $trunc: ReturnType<typeof $trunc>;
};

type Numeric = number | FieldReference;

function single<Q = Numeric, I = number, O = number>(fn: (i: I) => O): (q: Q, c: ExpressionCompiler) => Evaluator<O> {
    return (query: Q, compile: ExpressionCompiler): Evaluator<O> => {
        const resolve = compile(query);

        return (input: any) => fn(resolve(input) as I);
    };
}

type Nullable<T> = T | null;
const isUnresolved = any(isNULL, isUndefined);
function isDate(input: any): input is Date {
    return input instanceof Date;
}

function calculate<Q = Numeric, I = Nullable<number>, O = Nullable<number>>(fn: (value: I) => O, unresolved: O = <O>null, nan: O = <O>NaN): (query: Q, compiler: ExpressionCompiler) => Evaluator<O> {
    return single<Q, I, O>((input: I): O => isUnresolved(input) ? unresolved : isNumber(input) ? fn(input) : nan);
}

/**
 * $abs
 * Returns the absolute value of a number
 * @syntax  { $abs: <number> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/abs/
 */
export const $abs = calculate(Math.abs);

/**
 * $add
 * Adds numbers together or adds numbers and a date. If one of the arguments is a date, 
 * $add treats the other arguments as milliseconds to add to the date
 * @syntax  { $add: [ <expression1>, <expression2>, ... ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/
 */
export function $add(query: [Numeric | Date, Numeric | Date, ...Array<Numeric | Date>], compile: ExpressionCompiler): Evaluator<number | Date | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const values = resolve.map((f) => f(input));
        const dates = values.filter((v) => <any>v instanceof Date) as Array<Date>;
        const numbers = values.filter((v) => typeof v === 'number') as Array<number>;

        if (dates.length > 1) {
            throw new Error('only one date allowed in an $add expression');
        }
        if (values.length > numbers.length + dates.length) {
            return null;
        }
        const sum = numbers.reduce((c: number, v) => c + v, 0);

        return dates.length
            ? new Date(dates[0].getTime() + sum)
            : sum
    };
}

/**
 * $ceil
 * Returns the smallest integer greater than or equal to the specified number.
 * @syntax  { $ceil: <number> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/ceil/
 */
// export const $ceil = math(Math.ceil);
export const $ceil = calculate(Math.ceil);

/**
 * $divide
 * Divides one number by another and returns the result.
 * @syntax  { $divide: [ <expression1>, <expression2> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/divide/
 */
export function $divide(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [dividend, divisor] = resolve.map((f) => f(input));

        return isNumber(dividend) && isNumber(divisor)
            ? dividend / divisor
            : NaN;
    };
}

/**
 * $exp
 * Raises Euler's number (i.e. e ) to the specified exponent and returns the result.
 * @syntax  { $exp: <expression> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/exp/
 */
export const $exp = calculate(Math.exp);

/**
 * $floor
 * Returns the smallest integer less than or equal to the specified number.
 * @syntax  { $floor: <expression> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/floor/
 */
export const $floor = calculate(Math.floor);

/**
 * $ln
 * Calculates the natural logarithm ln (i.e log e) of a number and returns the result as a double.
 * @syntax  { $ln: <expression> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/ln/
 */
export const $ln = calculate(Math.log, NaN);

/**
 * $log
 * Calculates the log of a number in the specified base and returns the result as a double.
 * @syntax  { $log: [ <number>, <base> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/log/
 */
export function $log(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [number, base] = resolve.map((f) => f(input));

        return isNumber(number) && isNumber(base)
            ? Math.log(number) / Math.log(base)
            : NaN
    };
}

/**
 * $log10
 * Calculates the log base 10 of a number and returns the result as a double
 * @syntax  { $log10: <number> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/log10/
 */
export const $log10 = calculate(Math.log10, NaN);

/**
 * $mod
 * Divides one number by another and returns the remainder.
 * @syntax  { $mod: [ <expression1>, <expression2> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/mod/
 */
export function $mod(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [dividend, divisor] = resolve.map((f) => f(input));

        return isNumber(dividend) && isNumber(divisor)
            ? dividend % divisor
            : null;
    }
}

/**
 * $multiply
 * Multiplies numbers together and returns the result.
 * @syntax  { $multiply: [ <expression1>, <expression2>, ... ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/multiply/
 */
export function $multiply(query: [Numeric, Numeric, ...Array<Numeric>], compile: ExpressionCompiler): Evaluator<Nullable<number>> {
    const resolve = query.map(compile);

    return (input: any) => resolve
        .map((f) => f(input))
        .reduce((c, v) => isNumber(c) && isNumber(v) ? c * v : null) as number | null;
}

/**
 * $pow
 * Raises a number to the specified exponent and returns the result.
 * @syntax  { $pow: [ <number>, <exponent> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/pow/
 */
export function $pow(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [number, exponent] = resolve.map((f) => f(input));

        return isNumber(number) && isNumber(exponent)
            ? Math.pow(number, exponent)
            : null;
    }
}

/**
 * $round
 * Rounds a number to a whole integer or to a specified decimal place
 * @syntax  { $round : [ <number>, <place>? ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/round/
 */
export function $round(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [number, place = 0] = resolve.map((f) => f(input));

        if (isUnresolved(number) || isUnresolved(place)) {
            return null;
        }

        if (isNumber(number) && isNumber(place)) {
            const factor = Math.pow(10, place);

            return Math.round(number * factor) / factor;
        }

        return NaN;
    }
}

/**
 * $sqrt
 * Calculates the square root of a positive number and returns the result as a double
 * @syntax  { $sqrt: <number> }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/sqrt/
 */
export function $sqrt(query: Numeric, compile: ExpressionCompiler): Evaluator<number | null> {
    const resolve = compile(query);

    return (input: any) => {
        const number = resolve(input);

        if (isUnresolved(number)) {
            return null;
        }

        if (isNumber(number)) {
            if (number < 0) {
                throw new Error(`$sqrt requires a positive value, got ${number}`);
            }
            return Math.sqrt(number);
        }

        return NaN;
    };
}

/**
 * $subtract
 * Subtracts two numbers to return the difference, or two dates to return the 
 * difference in milliseconds, or a date and a number in milliseconds to return 
 * the resulting date
 * @syntax  { $subtract: [ <expression1>, <expression2> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/subtract/
 */
export function $subtract(query: [Date | Numeric, Date | Numeric], compile: ExpressionCompiler): Evaluator<Date | number | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [a, b] = resolve.map((f) => f(input));

        if (isUnresolved(a) || isUnresolved(b)) {
            return null;
        }
        if (isNumber(a) && isNumber(b)) {
            return a - b;
        }
        if (isDate(a) && isDate(b)) {
            return (<Date>a).getTime() - (<Date>b).getTime();
        }
        if (isDate(a) && isNumber(b)) {
            const date = new Date(a);
            date.setTime(date.getTime() - b);
            return date;
        }

        return NaN;
    };
}

/**
 * $trunc
 * Truncates a number to a whole integer or to a specified decimal place
 * @syntax  { $trunc : [ <number>, <place> ] }
 * @see     https://www.mongodb.com/docs/manual/reference/operator/aggregation/trunc/
 */
export function $trunc(query: [Numeric, Numeric], compile: ExpressionCompiler): Evaluator<number | null> {
    const resolve = query.map(compile);

    return (input: any) => {
        const [number, base = 0] = resolve.map((f) => f(input));
        const zero = (length: number) => Array.from({ length }, () => 0).join('');

        if (isUnresolved(number) || isUnresolved(base)) {
            return null;
        }
        if (isNumber(number) && isNumber(base)) {
            const [int, dec = 0] = String(number).split('.');

            if (base < 0) {
                return Number(int.slice(0, base) + zero(-base));
            }
            if (base > 0) {
                return Number(int + '.' + String(dec).slice(0, base))
            }

            return Number(int);
        }

        return NaN;
    };
}
