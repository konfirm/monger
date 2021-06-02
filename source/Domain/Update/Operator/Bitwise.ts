import type { Target, Updater } from '../Compiler';
import { prepare } from '../Compiler';
import { accessor } from '../../Field';

type BitOperation
	= { and: number }
	| { or: number }
	| { xor: number };

export type Operation = {
	$bit: Parameters<typeof $bit>[0];
};

/**
 * $bit
 * Performs bitwise AND, OR, and XOR updates of integer values.
 * @syntax  { $bit: { <field>: { <and|or|xor>: <int> } } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/bit/
 */
export function $bit(query: Target<BitOperation>): Updater {
	const execution = prepare<Target<BitOperation>>(query, (key, value) => {
		const access = accessor(key as string);
		const execute = 'and' in value
			? (v: number) => v & value.and
			: 'or' in value
				? (v: number) => v | value.or
				: (v: number) => v ^ value.xor

		return (target: Target): Target => {
			access(target, execute(access(target) as number));

			return target;
		};
	});

	return (input: Target) => execution.reduce((carry, ex) => ex(carry), input);
}
