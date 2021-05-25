import { accessor } from '../../Field';

type Target = { [key: string]: unknown };

type CurrentDateType = { $type: 'date' | 'timestamp' };
type CurrentDate = { [key: string]: true | CurrentDateType };
type Numeric = { [key: string]: number };

export type Operation = {
	$currentDate: Parameters<typeof $currentDate>[0];
	$inc: Parameters<typeof $inc>[0];
	$min: Parameters<typeof $min>[0];
	$max: Parameters<typeof $max>[0];
	$mul: Parameters<typeof $mul>[0];
};

function numericOperation(query: Numeric, modify: (value: number, current: unknown) => unknown) {
	const execute = Object.keys(query)
		.map((key) => {
			const value = query[key];
			const access = accessor(key);

			return (target: Target) => {
				access(target, modify(value, access(target)));

				return target;
			}
		});

	return (input: Target) => execute.reduce((carry, ex) => ex(carry), input);
}

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
			const access = accessor(key);

			return (target: Target, value: Date) => {
				access(target, type === 'date' ? new Date(value) : value.getTime());

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
export function $inc(query: Numeric): (input: Target) => unknown {
	return numericOperation(
		query,
		(value: number, current: unknown) =>
			((current || 0) as number) + value
	);
}

/**
 * $min
 * Only updates the field if the specified value is less than the existing field value.
 * @syntax  { $min: { <field1>: <value1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/min/
 */
export function $min(query: Numeric): (input: Target) => unknown {
	return numericOperation(
		query,
		(value: number, current: unknown) =>
			typeof current !== 'number' || current < value ? value : current
	);
}

/**
 * $max
 * Only updates the field if the specified value is greater than the existing field value.
 * @syntax  { $max: { <field1>: <value1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/max/
 */
export function $max(query: Numeric): (input: Target) => unknown {
	return numericOperation(
		query,
		(value: number, current: unknown) =>
			typeof current !== 'number' || current > value ? value : current
	);
}

/**
 * $mul
 * Multiplies the value of the field by the specified amount.
 * @syntax  { $mul: { <field1>: <number1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/mul/
 */
export function $mul(query: Numeric): (input: Target) => unknown {
	return numericOperation(
		query,
		(value: number, current: unknown) =>
			typeof current !== 'number' ? 0 : value * current
	);
}

