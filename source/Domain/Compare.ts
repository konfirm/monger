import { any, isNULL, isUndefined } from "@konfirm/guard";
import { Decimal128 } from "mongodb";
import {
	type as getType,
	is,
	isArray,
	isDate,
	isObject,
	isRegex,
} from "./BSON";

type A<T = unknown> = Array<T>;
type O<T = unknown> = { [key: string]: T };
type Verifier<T = unknown> = (...values: [T, T, ...A]) => boolean;
type Compare = (a: unknown, b: unknown) => number;

/**
 * Internal bitwise flags for comparison behavior
 * These can be combined for fine-grained control
 */
export enum CompareFlags {
	NONE = 0,
	IMPLICIT = 1 << 0, // 1 - Default/implicit rules (excluded in EXPLICIT mode)
	EXPLICIT_REGEX = 1 << 1, // 2 - Compare regex by toString() vs test()
	NULL_IS_UNDEFINED = 1 << 2, // 4 - Treat null === undefined
	STRICT_TYPES = 1 << 3, // 8 - No type coercion (5 !== "5")
	DEEP_EQUALITY = 1 << 4, // 16 - Deep compare objects/arrays
}

/**
 * Named comparison modes for ease of use
 * Each mode maps to a specific combination of flags
 */
export enum CompareMode {
	// Default MongoDB matching semantics
	// - null/undefined are equal (a null in the list also matches a missing field)
	// - regex matches implicitly (pattern-tests the value, not toString equality)
	// - strict types (no coercion)
	// - deep equality for objects/arrays
	MONGODB = CompareFlags.IMPLICIT |
		CompareFlags.NULL_IS_UNDEFINED |
		CompareFlags.DEEP_EQUALITY |
		CompareFlags.STRICT_TYPES,

	// Strict comparison (default)
	// - strict types
	// - deep equality
	// - null !== undefined
	// - includes default/implicit rules
	STRICT = CompareFlags.IMPLICIT |
		CompareFlags.DEEP_EQUALITY |
		CompareFlags.STRICT_TYPES,

	// Explicit comparison
	// - Replace implicit rules with explicit variants
	// - strict types
	// - deep equality
	// - excludes default/implicit rules
	EXPLICIT = CompareFlags.EXPLICIT_REGEX |
		CompareFlags.DEEP_EQUALITY |
		CompareFlags.STRICT_TYPES |
		CompareFlags.NULL_IS_UNDEFINED,
}

export function type(first: unknown, ...rest: A): boolean {
	const type = getType(first);

	return rest.every((value) => getType(value) === type);
}

const isNullOrUndefined = any(isNULL, isUndefined);

export function isComparable(first: unknown, ...rest: A): boolean {
	if (type(first, ...rest)) {
		return true;
	}
	const isNumeric = is(1, 16, 18);

	if (isNumeric(first) && rest.every(isNumeric)) {
		return true;
	}

	// A missing field (undefined) is comparable to a null query
	return isNullOrUndefined(first) && rest.every(isNullOrUndefined);
}

export function equal(first: unknown, ...rest: A): boolean {
	return rest.every((value) => value === first);
}

function similarArray(first: A, ...rest: A): boolean {
	return rest.every(
		(other) =>
			first.length === (<A>other).length &&
			(<A>first).every((value, index) =>
				deep(value, (<A>other)[index], CompareMode.STRICT),
			),
	);
}

function similarObject(first: O, ...rest: A): boolean {
	const keys = Object.keys(<O>first);

	return rest.every(
		(other) =>
			deep(keys, Object.keys(<O>other), CompareMode.STRICT) &&
			keys.every(
				(key) =>
					key in <O>other &&
					deep((<O>first)[key], (<O>other)[key], CompareMode.STRICT),
			),
	);
}

function typed<T>(
	isType: (v: unknown) => boolean,
	compare: Verifier<T>,
): Verifier {
	return (first, ...rest) =>
		isType(first) &&
		type(first, ...rest) &&
		compare(first as T, ...(rest as [T, ...A<T>]));
}
const deepRules: Array<{ cmp: Verifier; flags?: number }> = [
	{ cmp: equal },
	{ cmp: typed<A>(isArray, similarArray) },
	{ cmp: typed<O>(isObject, similarObject) },
	{
		cmp: (...rest) => rest.every(isNullOrUndefined),
		flags: CompareFlags.NULL_IS_UNDEFINED,
	},
	{
		cmp: (first, ...rest) =>
			isRegex(first) &&
			rest.every(
				(value) =>
					isRegex(value) &&
					(first as RegExp).toString() === (value as RegExp).toString(),
			),
		flags: CompareFlags.EXPLICIT_REGEX,
	},
	{
		cmp: (first, ...rest) =>
			isRegex(first) &&
			rest.every((value) => (first as RegExp).test(String(value))),
		flags: CompareFlags.IMPLICIT,
	},
	{
		cmp: typed<Date>(isDate, (first, ...rest) =>
			rest.every((value) => Number(value) === Number(first)),
		),
	},
	{ cmp: (...rest) => rest.every((value) => Number.isNaN(value)) },
];

/**
 * Deep comparison function with configurable behavior
 * @param a First value to compare
 * @param b Second value to compare
 * @param mode Comparison mode (defaults to STRICT)
 * @returns true if values are equal according to the mode
 */
export function deep(
	a: unknown,
	b: unknown,
	mode: CompareMode = CompareMode.STRICT,
): boolean {
	// Filter rules: use if no flags required OR mode has all required flags
	return deepRules
		.filter(({ flags }) => !flags || (mode & flags) === flags)
		.some(({ cmp }) => cmp(a, b));
}

function cmp(a: unknown, b: unknown): -1 | 0 | 1 {
	return (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0;
}

type CompareRule = { type: (v: unknown) => boolean; cmp: Compare };
const bsonCompareRules: Array<CompareRule> = [
	// { type: is(-1), cmp }, // MinKey
	{ type: isNullOrUndefined, cmp: () => 0 }, // Null (undefined counts as null — missing field)
	{
		// Numbers (all numeric types)
		// NaN equals NaN, but NaN never matches <, <=, >=, >
		type: is(1, 16, 18, 19),
		cmp: (a, b) => {
			const [x, y] = [a as number, b as number];

			if (Number.isNaN(x) && Number.isNaN(y)) {
				return 0;
			}

			return Number.isNaN(x) || Number.isNaN(y) ? NaN : cmp(x, y);
		},
	},
	{
		// String (and Symbol)
		type: is(2, 14),
		cmp: (a, b) => cmp(String(a), String(b)),
	},
	{
		// Object
		type: is(3),
		cmp: (a, b) => {
			const left = Object.entries(a as O) as Array<[keyof O, O[keyof O]]>;
			const right = Object.entries(b as O) as Array<[keyof O, O[keyof O]]>;
			const length = Math.min(left.length, right.length);

			for (let i = 0; i < length; ++i) {
				const result =
					bsonCompare(left[i][0], right[i][0]) ||
					bsonCompare(left[i][1], right[i][1]);

				if (result) return result;
			}

			return cmp(left.length, right.length);
		},
	},
	{
		// Array
		type: is(4),
		cmp: (a, b) => {
			const [left, right] = [a as A, b as A];
			const length = Math.min(left.length, right.length);

			for (let i = 0; i < length; ++i) {
				const result =
					left[i] === right[i] ? 0 : bsonCompare(left[i], right[i]);

				if (result) return result;
			}

			return cmp(left.length, right.length);
		},
	},
	// { type: is(5), cmp }, // BinData
	// { type: is(7), cmp }, // ObjectId
	{ type: is(8), cmp }, // Boolean
	{ type: is(9), cmp }, // Date
	// { type: is(17), cmp }, // Timestamp
	{ type: is(11), cmp: (): -1 | 0 | 1 => 0 }, // Regex
	// { type: is(127), cmp }, // MaxKey
];

function bsonRuleIndex(value: unknown): number {
	return bsonCompareRules.findIndex(({ type }) => type(value));
}

// NaN is a legitimate return value (not just -1/0/1): a comparison
// touching NaN must fail every one of >0/>=0/</<=0 at once, which no
// single sign can express — see the Numbers rule below.
export function bsonCompare(a: unknown, b: unknown): number {
	const rule = bsonCompareRules.find(({ type }) => type(a) && type(b));

	return rule ? rule.cmp(a, b) : bsonRuleIndex(a) < bsonRuleIndex(b) ? -1 : 1;
}

/**
 * Wrap a predicate into a predicate comparing either each element of an array
 * or the direct value otherwise.
 *
 * Enables MongoDB's implicit behavior for query conditions against array
 * fields: a condition matches the field if it matches the field's value
 * directly, or if the field holds an array containing at least one element that does
 * @param predicate (value: unknown) => boolean
 * @returns (input: unknown) => boolean
 */
export function elementwise(
	predicate: (value: unknown) => boolean,
): (input: unknown) => boolean {
	return (input) =>
		predicate(input) || (Array.isArray(input) && input.some(predicate));
}

/**
 * @deprecated Use deep(a, b, CompareMode.EXPLICIT) instead
 * Kept for backward compatibility
 */
export function deepExplicit(a: unknown, b: unknown): boolean {
	return deep(a, b, CompareMode.EXPLICIT);
}

/**
 * @deprecated Use deep(a, b, CompareMode.STRICT) instead
 * Kept for backward compatibility
 */
export function deepStrict(a: unknown, b: unknown): boolean {
	return deep(a, b, CompareMode.STRICT);
}
