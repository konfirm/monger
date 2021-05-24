// import type { Evaluator } from '../Compiler';
import { dotted } from '../../Field';

// type Target = Parameters<ReturnType<typeof dotted>>[0];
type Target = { [key: string]: unknown };

type CurrentDateType = { $type: 'date' | 'timestamp' };
type CurrentDate = { [key: string]: true | CurrentDateType };
type Increment = { [key: string]: number };

export type Operation = {
	$currentDate: Parameters<typeof $currentDate>[0];
	$inc: Parameters<typeof $inc>[0];
};

/**
 * $currentDate
 * The $currentDate operator sets the value of a field to the current date,
 * either as a Date or a timestamp. The default type is Date.
 * @syntax  { $currentDate: { <field1>: <typeSpecification1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/currentDate/
 */
export function $currentDate(query: CurrentDate): (input: Target) => unknown {
	const execute = Object.keys(query)
		.map((key) => {
			const { $type: type } = (query[key] === true ? { $type: 'date' } : query[key]) as CurrentDateType;
			const accessor = dotted(key);

			return (target: Target, value: Date) => {
				accessor(target, type === 'date' ? new Date(value) : value.getTime());

				return target;
			};
		});

	const date = new Date();

	return (input: Target) => execute.reduce((carry, ex) => ex(carry, date), input);
}

/**
 * $inc
 * Increments the value of the field by the specified amount.
 * @syntax  { $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/inc/
 */
export function $inc(query: Increment): (input: Target) => unknown {
	const execute = Object.keys(query)
		.map((key) => {
			const amount = query[key];
			const accessor = dotted(key);

			return (target: Target) => {
				accessor(target, (accessor(target) as number || 0) + amount);

				return target;
			};
		});

	return (input: Target) => execute.reduce((carry, ex) => ex(carry), input);
}
