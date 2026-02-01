import { any, isNULL, isUndefined } from "@konfirm/guard";

import { type as getType, isArray, isObject, isRegex } from "./BSON";

type A<T = unknown> = Array<T>;
type O<T = unknown> = { [key: string]: T };
type Verifier<T = unknown> = (...values: [T, T, ...A]) => boolean;

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
	// MongoDB aggregation expression comparison
	// - null/undefined are equal
	// - strict types (no coercion)
	// - deep equality for objects/arrays
	// - includes default/implicit rules
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
		CompareFlags.STRICT_TYPES,
}

export function type(first: unknown, ...rest: A): boolean {
	const type = getType(first);

	return rest.every((value) => getType(value) === type);
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

const isNullOrUndefined = any(isNULL, isUndefined);
const ruleset: Array<{ cmp: Verifier; flags?: number }> = [
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
					(first as RegExp).toString() ===
						(value as RegExp).toString(),
			),
		flags: CompareFlags.EXPLICIT_REGEX,
	},
	{
		cmp: (first, ...rest) =>
			isRegex(first) &&
			rest.every((value) => (first as RegExp).test(String(value))),
		flags: CompareFlags.IMPLICIT,
	},
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
	return ruleset
		.filter(({ flags }) => !flags || (mode & flags) === flags)
		.some(({ cmp }) => cmp(a, b));
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
