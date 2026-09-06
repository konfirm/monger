import { isArray } from '@konfirm/guard';
import { is, isNumber } from '../../BSON';
import { elementwise } from '../../Compare';
import type { Evaluator } from '../Compiler';

type BitMask = number;
type BitPosition = Array<number>;

export type Operation = {
	$bitsAllClear: Parameters<typeof $bitsAllClear>[0];
	$bitsAllSet: Parameters<typeof $bitsAllSet>[0];
	$bitsAnyClear: Parameters<typeof $bitsAnyClear>[0];
	$bitsAnySet: Parameters<typeof $bitsAnySet>[0];
};

const isWholeNumber = (v: unknown): boolean => (typeof v === 'number' && Number.isInteger(v)) || typeof v === 'bigint';
const INT32_MAX = 2147483647;
const NATIVE_LIMIT = 0x7fffffffn;
const UNREACHABLE_BIT = 64;

type Mask = { mask: bigint; unreachable: boolean };

// Both query forms (single bitmask, list of bit positions) reduce to one
// BigInt mask
function toMask(name: string, query: BitMask | BitPosition): Mask {
	if (isArray(query)) {
		let unreachable = false;
		const mask = query.reduce((mask, position, index) => {
			if (!isNumber(position)) {
				throw new Error(`Failed to parse bit position. Expected a number in: ${index}: ${position}`);
			}
			if (Number.isNaN(position)) {
				throw new Error(`Failed to parse bit position. Expected an integer, but found NaN in: ${index}: ${position}`);
			}
			if (!Number.isFinite(position)) {
				throw new Error(`Failed to parse bit position. Cannot represent as a 64-bit integer: ${index}: ${position}`);
			}
			if (!isWholeNumber(position)) {
				throw new Error(`Failed to parse bit position. Expected an integer: ${index}: ${position}`);
			}
			if ((position as number) < 0) {
				throw new Error(`Failed to parse bit position. Expected a non-negative number in: ${index}: ${position}`);
			}
			if ((position as number) > INT32_MAX) {
				throw new Error(`Failed to parse bit position. Cannot represent ${index}: ${position} in an int`);
			}
			if ((position as number) >= UNREACHABLE_BIT) {
				unreachable = true;

				return mask;
			}

			return mask | (1n << BigInt(position as number));
		}, 0n);

		return { mask, unreachable };
	}

	if (!isNumber(query)) {
		throw new Error(`value takes an Array, a number, or a BinData but received: ${name}: ${query}`);
	}
	if (Number.isNaN(query)) {
		throw new Error(`Expected an integer, but found NaN in: ${name}: ${query}`);
	}
	if (!Number.isFinite(query)) {
		throw new Error(`Cannot represent as a 64-bit integer: ${name}: ${query}`);
	}
	if (!isWholeNumber(query)) {
		throw new Error(`Expected an integer: ${name}: ${query}`);
	}
	if ((query as BitMask) < 0) {
		throw new Error(`Expected a non-negative number in: ${name}: ${query}`);
	}

	return { mask: BigInt(query as BitMask), unreachable: false };
}

// An unreachable position can't just be dropped from the mask — a negative
// value is infinite two's-complement 1s above its own width, so it reads as
// permanently *set* out there, not clear (confirmed against a live MongoDB
// 8.2.9: $bitsAllClear:[100] excludes every negative value; $bitsAllSet/
// $bitsAnySet:[100] match every negative value; $bitsAnyClear:[100] excludes
// them). A non-negative value is permanently clear out there instead. Each
// operator's `matches`/`matchesBig` callback gets the raw `unreachable` flag
// and folds the value's own sign into its formula, since which way it cuts
// (AND-restricting for AllClear/AllSet vs. OR-short-circuiting for
// AnyClear/AnySet) differs per operator, not just per sign.
function bits(
	name: string,
	query: BitMask | BitPosition,
	matches: (value: number, mask: number, unreachable: boolean) => boolean,
	matchesBig: (value: bigint, mask: bigint, unreachable: boolean) => boolean,
): Evaluator {
	const { mask, unreachable } = toMask(name, query);

	if (mask <= NATIVE_LIMIT) {
		const native = Number(mask);

		return elementwise((value) => isWholeNumber(value) && matches(Number(value), native, unreachable));
	}

	return elementwise((value) => isWholeNumber(value) && matchesBig(BigInt(value as number), mask, unreachable));
}

/**
 * $bitsAllClear
 * Matches numeric or binary values in which a set of bit positions all have a value of 0.
 * @syntax  { <field>: { $bitsAllClear: <numeric bitmask> } }
 *          { <field>: { $bitsAllClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllClear/
 */
export function $bitsAllClear(query: BitMask | BitPosition): Evaluator {
	return bits(
		'$bitsAllClear', query,
		(value, mask, unreachable) => (!unreachable || value >= 0) && (value & mask) === 0,
		(value, mask, unreachable) => (!unreachable || value >= 0n) && (value & mask) === 0n,
	);
}

/**
 * $bitsAllSet
 * Matches numeric or binary values in which a set of bit positions all have a value of 1.
 * @syntax  { <field>: { $bitsAllSet: <numeric bitmask> } }
 *          { <field>: { $bitsAllSet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllSet/
 */
export function $bitsAllSet(query: BitMask | BitPosition): Evaluator {
	return bits(
		'$bitsAllSet', query,
		(value, mask, unreachable) => (!unreachable || value < 0) && (value & mask) === mask,
		(value, mask, unreachable) => (!unreachable || value < 0n) && (value & mask) === mask,
	);
}

/**
 * $bitsAnyClear
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
 * @syntax  { <field>: { $bitsAnyClear: <numeric bitmask> } }
 *          { <field>: { $bitsAnyClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnyClear/
 */
export function $bitsAnyClear(query: BitMask | BitPosition): Evaluator {
	return bits(
		'$bitsAnyClear', query,
		(value, mask, unreachable) => (unreachable && value >= 0) || (value & mask) !== mask,
		(value, mask, unreachable) => (unreachable && value >= 0n) || (value & mask) !== mask,
	);
}

/**
 * $bitsAnySet
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
 * @syntax  { <field>: { $bitsAnySet: <numeric bitmask> } }
 *          { <field>: { $bitsAnySet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnySet/
 */
export function $bitsAnySet(query: BitMask | BitPosition): Evaluator {
	return bits(
		'$bitsAnySet', query,
		(value, mask, unreachable) => (unreachable && value < 0) || (value & mask) !== 0,
		(value, mask, unreachable) => (unreachable && value < 0n) || (value & mask) !== 0n,
	);
}
