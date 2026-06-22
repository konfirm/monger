import {
	type Expression,
	type ExpressionCompiler,
	type FieldReference,
	isFieldReference,
} from "../Expression";
import {
	not,
	any,
	isArray,
	isNumber,
	isString,
	isArrayOfSize,
	isArrayOfType,
	isStrictStructure,
	isUndefined,
} from "@konfirm/guard";
import { Evaluator } from "../../../Compiler";
import { isInteger, isObject } from "../../../../BSON";
import { ErrorCode, MongerError } from "../../../../Error/MongerError";

export type Operation = {
	$arrayElemAt: Parameters<typeof $arrayElemAt>[0];
	$arrayToObject: Parameters<typeof $arrayToObject>[0];
	$concatArrays: Parameters<typeof $concatArrays>[0];
	// $filter: Parameters<typeof $filter>[0];
	// $firstN: Parameters<typeof $firstN>[0];
	// $in: Parameters<typeof $in>[0];
	// $indexOfArray: Parameters<typeof $indexOfArray>[0];
	// $isArray: Parameters<typeof $isArray>[0];
	// $lastN: Parameters<typeof $lastN>[0];
	// $map: Parameters<typeof $map>[0];
	// $maxN: Parameters<typeof $maxN>[0];
	// $minN: Parameters<typeof $minN>[0];
	// $objectToArray: Parameters<typeof $objectToArray>[0];
	// $range: Parameters<typeof $range>[0];
	// $reduce: Parameters<typeof $reduce>[0];
	// $reverseArray: Parameters<typeof $reverseArray>[0];
	// $size: Parameters<typeof $size>[0];
	// $slice: Parameters<typeof $slice>[0];
	// $sortArray: Parameters<typeof $sortArray>[0];
	// $zip: Parameters<typeof $zip>[0];
};
export type Result = {
	$arrayElemAt: ReturnType<typeof $arrayElemAt>;
	$arrayToObject: ReturnType<typeof $arrayToObject>;
	$concatArrays: ReturnType<typeof $concatArrays>;
	// $filter: ReturnType<typeof $filter>;
	// $firstN: ReturnType<typeof $firstN>;
	// $in: ReturnType<typeof $in>;
	// $indexOfArray: ReturnType<typeof $indexOfArray>;
	// $isArray: ReturnType<typeof $isArray>;
	// $lastN: ReturnType<typeof $lastN>;
	// $map: ReturnType<typeof $map>;
	// $maxN: ReturnType<typeof $maxN>;
	// $minN: ReturnType<typeof $minN>;
	// $objectToArray: ReturnType<typeof $objectToArray>;
	// $range: ReturnType<typeof $range>;
	// $reduce: ReturnType<typeof $reduce>;
	// $reverseArray: ReturnType<typeof $reverseArray>;
	// $size: ReturnType<typeof $size>;
	// $slice: ReturnType<typeof $slice>;
	// $sortArray: ReturnType<typeof $sortArray>;
	// $zip: ReturnType<typeof $zip>;
};

/**
 * $arrayElemAt
 * Returns the element at the specified array index.
 * @syntax { $arrayElemAt: [ <array>, <idx> ] }
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayElemAt
 */
export function $arrayElemAt<T extends unknown>(
	query: [Expression, Expression],
	compile: ExpressionCompiler,
): Evaluator<T | null | undefined> {
	const resolve = query.map(compile);

	return (input: any) => {
		const [list, index] = resolve.map((f) => f(input)) as [
			Array<T>,
			number,
		];

		if (isArray(list) && isInteger(index)) {
			return index < 0 ? list[list.length + index] : list[index];
		}

		return null;
	};
}

type ArrayToObjectExpressionTuple = [unknown, unknown];
type ArrayToObjectExpressionObject = { k: unknown; v: unknown };
type ArrayToObjectExpression =
	| Expression
	| Array<ArrayToObjectExpressionTuple | ArrayToObjectExpressionObject>;

const isArrayToObjectTuple = isArrayOfSize<ArrayToObjectExpressionTuple>(2, 2);
const isArrayToObjectObject = isStrictStructure<ArrayToObjectExpressionObject>({
	k: isString,
	v: not(isUndefined),
});

/**
 * $arrayToObject
 * Converts an array of key value pairs to a document.
 * @syntax { $arrayToObject: <unknown> }
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayToObject
 */
export function $arrayToObject<T extends Record<string, unknown>>(
	query: ArrayToObjectExpression,
	compile: ExpressionCompiler,
): Evaluator<T | null> {
	const resolve = compile(query);

	return (input: any): T | null => {
		const array = resolve(input) as Array<unknown>;

		if (!isArray(array)) {
			throw new MongerError(ErrorCode.ARRAY_TO_OBJECT_REQUIRES_ARRAY, {
				value: array,
			});
		}

		if (isArray(array[0])) {
			const mapped = array.map((record, index) => {
				if (Array.isArray(record)) {
					if (isArrayToObjectTuple(record)) {
						return { [String(record[0])]: record[1] };
					}

					// throw new MongerError(40397, { size: record.length });
					throw new Error(
						`$arrayToObject requires an array of size 2 arrays, found array of size: ${record.length}`,
					);
				}

				throw new Error(
					`$arrayToObject requires a consistent input format. Elements must all be arrays or all be objects. Array was detected, now found: ${typeof record}`,
				);
			});

			return Object.assign({}, ...mapped);
		} else if (isObject(array[0])) {
			const mapped = array.map((record) => {
				if (isObject(record)) {
					if (isArrayToObjectObject(record)) {
						return { [String(record.k)]: record.v };
					}

					const { length } = Object.keys(
						record as Record<string, unknown>,
					);
					throw new Error(
						`$arrayToObject requires an object keys of 'k' and 'v'. Found incorrect number of keys:${length}`,
					);
				}

				throw new Error(
					`$arrayToObject requires a consistent input format. Elements must all be arrays or all be objects. Object was detected, now found: ${isArray(record) ? "array" : typeof record}`,
				);
			});

			return Object.assign({}, ...mapped);
		}

		return {} as T;
	};
}

type ConcatArrraysExpression = Array<Array<unknown> | FieldReference<string>>;

const isArrayOrExpression = any(isArray, isFieldReference);
const isConcatArraysExpression =
	isArrayOfType<ConcatArrraysExpression>(isArrayOrExpression);

/**
 * $concatArrays
 * Concatenates arrays to return the concatenated array.
 * @syntax { $concatArrays: Array<Array<unknown>|FieldReference<string>> }
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/concatArrays
 */
export function $concatArrays(query: unknown, compile: ExpressionCompiler) {
	if (!isConcatArraysExpression(query)) {
		throw new MongerError(ErrorCode.CONCAT_ARRAYS_UNSUPPORTED_TYPE, {
			value: query,
		});
	}

	const compiled = query.map((value) => {
		if (isArray(value)) {
			return () => value;
		}
		return compile(value);
	});

	return (input: any) => {
		const result = compiled.map((get) => get(input));

		const unsupported = result.find((value) => !isArray(value));
		if (unsupported) {
			throw new MongerError(ErrorCode.CONCAT_ARRAYS_UNSUPPORTED_TYPE, {
				value: unsupported,
			});
		}
		if (result.some((value) => value === null || value === undefined)) {
			return null;
		}

		return result.flat();
	};
}

// /**
//  * $filter
//  * Selects a subset of the array to return an array with only the elements that match the filter condition.
//  * @syntax { $filter: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter
//  */
// export function $filter(query: unknown) { }

// /**
//  * $firstN
//  * Returns a specified number of elements from the beginning of an array.Distinct from the $firstN accumulator.
//  * @syntax { $firstN: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN
//  */
// export function $firstN(query: unknown) { }

/**
 * $in
 * Returns a boolean indicating whether a specified value is in an array.
 * @syntax { $in: <unknown> }
 * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/in
 */
// export function $in(query: unknown) {}

// /**
//  * $indexOfArray
//  * Searches an array for an occurrence of a specified value and returns the array index of the first occurrence.Array indexes start at zero.
//  * @syntax { $indexOfArray: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexOfArray
//  */
// export function $indexOfArray(query: unknown) { }

// /**
//  * $isArray
//  * Determines if the operand is an array.Returns a boolean.
//  * @syntax { $isArray: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/isArray
//  */
// export function $isArray(query: unknown) { }

// /**
//  * $lastN
//  * Returns a specified number of elements from the end of an array.Distinct from the $lastN accumulator.
//  * @syntax { $lastN: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN
//  */
// export function $lastN(query: unknown) { }

// /**
//  * $map
//  * Applies a subexpression to each element of an array and returns the array of resulting values in order.Accepts named parameters.
//  * @syntax { $map: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/map
//  */
// export function $map(query: unknown) { }

// /**
//  * $maxN
//  * Returns the n largest values in an array.Distinct from the $maxN accumulator.
//  * @syntax { $maxN: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN
//  */
// export function $maxN(query: unknown) { }

// /**
//  * $minN
//  * Returns the n smallest values in an array.Distinct from the $minN accumulator.
//  * @syntax { $minN: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN
//  */
// export function $minN(query: unknown) { }

// /**
//  * $objectToArray
//  * Converts a document to an array of documents representing key - value pairs.
//  * @syntax { $objectToArray: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/objectToArray
//  */
// export function $objectToArray(query: unknown) { }

// /**
//  * $range
//  * Outputs an array containing a sequence of integers according to user - defined inputs.
//  * @syntax { $range: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/range
//  */
// export function $range(query: unknown) { }

// /**
//  * $reduce
//  * Applies an expression to each element in an array and combines them into a single value.
//  * @syntax { $reduce: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/reduce
//  */
// export function $reduce(query: unknown) { }

// /**
//  * $reverseArray
//  * Returns an array with the elements in reverse order.
//  * @syntax { $reverseArray: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/reverseArray
//  */
// export function $reverseArray(query: unknown) { }

// /**
//  * $size
//  * Returns the number of elements in the array.Accepts a single expression as argument.
//  * @syntax { $size: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/size
//  */
// export function $size(query: unknown) { }

// /**
//  * $slice
//  * Returns a subset of an array.
//  * @syntax { $slice: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/slice
//  */
// export function $slice(query: unknown) { }

// /**
//  * $sortArray
//  * Sorts the elements of an array.
//  * @syntax { $sortArray: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray
//  */
// export function $sortArray(query: unknown) { }

// /**
//  * $zip
//  * Merge two arrays together.
//  * @syntax { $zip: <unknown> }
//  * @see    https://www.mongodb.com/docs/manual/reference/operator/aggregation/zip
//  */
// export function $zip(query: unknown) { }
