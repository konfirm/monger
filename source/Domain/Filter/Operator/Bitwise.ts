import type { Evaluator } from '../Compiler';
import { isArray, is } from '../../BSON';
import { elementwise } from '../../Compare';
import { isArrayOfType } from '@konfirm/guard';

type BitMask = number;
type BitPosition = Array<number>;

export type Operation = {
	$bitsAllClear: Parameters<typeof $bitsAllClear>[0];
	$bitsAllSet: Parameters<typeof $bitsAllSet>[0];
	$bitsAnyClear: Parameters<typeof $bitsAnyClear>[0];
	$bitsAnySet: Parameters<typeof $bitsAnySet>[0];
};

// Whole-number JS values only (BSON int/long)
const isWholeNumber = is(16, 18);
const isBitPosition = isArrayOfType<BitPosition>(isWholeNumber);

// Both query forms (single bitmask, list of bit positions) reduce to one mask
function toMask(name: string, query: BitMask | BitPosition): number {
	if (isBitPosition(query)) {
		return query.reduce((mask, position) => {
			if (position < 0) {
				throw new Error(`Failed to parse bit position. Expected a non-negative number in: ${name}: ${position}`);
			}

			return mask | (1 << position);
		}, 0);
	}

	if ((query as BitMask) < 0) {
		throw new Error(`Expected a non-negative number in: ${name}: ${query}`);
	}

	return query as BitMask;
}

function bits(
	name: string,
	query: BitMask | BitPosition,
	matches: (value: number, mask: number) => boolean,
): Evaluator {
	const mask = toMask(name, query);

	return elementwise((value) => isWholeNumber(value) && matches(Number(value), mask));
}

/**
 * $bitsAllClear
 * Matches numeric or binary values in which a set of bit positions all have a value of 0.
 * @syntax  { <field>: { $bitsAllClear: <numeric bitmask> } }
 *          { <field>: { $bitsAllClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllClear/
 */
export function $bitsAllClear(query: BitMask | BitPosition): Evaluator {
	return bits('$bitsAllClear', query, (value, mask) => (value & mask) === 0);
}

/**
 * $bitsAllSet
 * Matches numeric or binary values in which a set of bit positions all have a value of 1.
 * @syntax  { <field>: { $bitsAllSet: <numeric bitmask> } }
 *          { <field>: { $bitsAllSet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllSet/
 */
export function $bitsAllSet(query: BitMask | BitPosition): Evaluator {
	return bits('$bitsAllSet', query, (value, mask) => (value & mask) === mask);
}

/**
 * $bitsAnyClear
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
 * @syntax  { <field>: { $bitsAnyClear: <numeric bitmask> } }
 *          { <field>: { $bitsAnyClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnyClear/
 */
export function $bitsAnyClear(query: BitMask | BitPosition): Evaluator {
	return bits('$bitsAnyClear', query, (value, mask) => (value & mask) !== mask);
}

/**
 * $bitsAnySet
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
 * @syntax  { <field>: { $bitsAnySet: <numeric bitmask> } }
 *          { <field>: { $bitsAnySet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnySet/
 */
export function $bitsAnySet(query: BitMask | BitPosition): Evaluator {
	return bits('$bitsAnySet', query, (value, mask) => (value & mask) !== 0);
}
