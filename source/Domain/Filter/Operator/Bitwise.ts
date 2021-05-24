import type { Evaluator } from '../Compiler';
import { isArray } from '../../BSON';

type BitMask = number;
type BitPosition = Array<number>;

export type Operation = {
	$bitsAllClear: Parameters<typeof $bitsAllClear>[0];
	$bitsAllSet: Parameters<typeof $bitsAllSet>[0];
	$bitsAnyClear: Parameters<typeof $bitsAnyClear>[0];
	$bitsAnySet: Parameters<typeof $bitsAnySet>[0];
};

/**
 * $bitsAllClear
 * Matches numeric or binary values in which a set of bit positions all have a value of 0.
  * @syntax  { <field>: { $bitsAllClear: <numeric bitmask> } }
  *          { <field>: { $bitsAllClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllClear/
 */
export function $bitsAllClear(query: BitMask | BitPosition): Evaluator {
	if (isArray(query)) {
		const shifted = (query as BitPosition).map((shift) => 1 << shift);

		return (input: unknown): boolean => shifted.every((bit) => (Number(input) & bit) === 0);
	}

	return (input: unknown): boolean => (Number(input) & Number(query)) === 0;
}

/**
 * $bitsAllSet
 * Matches numeric or binary values in which a set of bit positions all have a value of 1.
 * @syntax  { <field>: { $bitsAllSet: <numeric bitmask> } }
 *          { <field>: { $bitsAllSet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAllSet/
 */
export function $bitsAllSet(query: BitMask | BitPosition): Evaluator {
	if (isArray(query)) {
		return (input: unknown): boolean => (query as BitPosition)
			.every((shift) => Number(input) & 1 << shift);
	}

	return (input: unknown): boolean => (Number(input) & Number(query)) === query;
}

/**
 * $bitsAnyClear
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
 * @syntax  { <field>: { $bitsAnyClear: <numeric bitmask> } }
 *          { <field>: { $bitsAnyClear: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnyClear/
 */
export function $bitsAnyClear(query: BitMask | BitPosition): Evaluator {
	if (isArray(query)) {
		return (input: unknown): boolean => (query as BitPosition)
			.some((shift) => (Number(input) & 1 << shift) !== 1 << shift);
	}

	return (input: unknown): boolean => (Number(input) & Number(query)) !== query;
}

/**
 * $bitsAnySet
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
 * @syntax  { <field>: { $bitsAnySet: <numeric bitmask> } }
 *          { <field>: { $bitsAnySet: [ <position1>, <position2>, ...] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/bitsAnySet/
 */
export function $bitsAnySet(query: BitMask | BitPosition): Evaluator {
	if (isArray(query)) {
		return (input: unknown): boolean => (query as BitPosition)
			.some((shift) => (Number(input) & 1 << shift));
	}

	return (input: unknown): boolean => (Number(input) & Number(query)) !== 0;
}
