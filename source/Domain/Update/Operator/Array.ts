import type { Query } from '../../Filter/Compiler';
import type { Target, Updater } from '../Compiler';
import { filter } from '../../Filter';
import { prepare } from '../Compiler';
import { accessor } from '../../Field';
import { isObject, isArray, isUndefined, type } from '../../BSON';

type Primitve = string | number | boolean | null;
type MinPlus = -1 | 1;
type AddToSetOptions = {
	[key: string]
	: { $each: Array<unknown> }
	| ({ [key: string]: unknown } & { $each?: never })
	| Primitve
	| Array<unknown>;
};
type SortOptions = MinPlus | Target<MinPlus>
type PushOptions = {
	[key: string]
	: { $each: Array<unknown>, $slice?: number, $sort?: SortOptions, $position?: MinPlus }
	| ({ [key: string]: unknown } & { $each?: never, $slice?: never, $sort?: never, $position?: never })
	| Primitve
	| Array<unknown>;
};

export type Operation = {
	$addToSet: Parameters<typeof $addToSet>[0];
	$pop: Parameters<typeof $pop>[0];
	$pull: Parameters<typeof $pull>[0];
	$push: Parameters<typeof $push>[0];
	$pullAll: Parameters<typeof $pullAll>[0];
};

function validateArrayFor(method: string): (key: string, value: unknown) => Array<unknown> {
	return (key: string, value: unknown): Array<unknown> => {
		if (isArray(value)) {
			return value as Array<unknown>;
		}

		const [, tail] = (String(key).match(/^(.+\.)?([^\.]+)$/) as Array<string>).slice(1);

		throw new Error(`Cannot apply ${method} to non-array field. Field named '${tail}' has non-array type ${type(value)}`);
	};
}

function contains(collection: Array<any>, value: unknown): boolean {
	const json = JSON.stringify(value);

	return collection.some((value) => JSON.stringify(value) === json);
}

function compare(settings: unknown): (value: unknown) => boolean {
	const json = JSON.stringify(settings);

	return (value: unknown): boolean => json === JSON.stringify(value);
}

function ensureArray(target: Target, access: ReturnType<typeof accessor>): Array<unknown> {
	let current = access(target);

	if (isUndefined(current)) {
		access(target, []);
		current = access(target);
	}

	return current as Array<unknown>;
}

function isFilter(settings: Partial<Query> | { [key: string]: Primitve }): boolean {
	if (isObject(settings)) {
		const keys = Object.keys(settings);
		const hasFilter = keys.some((key) => key[0] === '$');
		const [first] = hasFilter ? keys.filter((key) => key[0] !== '$') : [];

		if (first) {
			throw new Error(`unknown operator: ${first}`);
		}

		return hasFilter;
	}

	return false;
}

function $each(settings: unknown, method: string): Array<unknown> {
	if (isObject(settings)) {
		const { $each = [settings] } = settings as any;

		if (!isArray($each)) {
			throw new Error(`The argument to $each in ${method} must be an array but it was of type ${type($each)}`);
		}

		return $each;
	}

	return [settings];
}

function $slice(settings: unknown): (list: Array<unknown>) => Array<unknown> {
	const { $slice } = (isObject(settings) ? settings : {}) as any;

	return (list: Array<unknown>): Array<unknown> => list.slice(0, $slice);
}

function $sort(settings: unknown): (list: Array<unknown>) => Array<unknown> {
	const { $sort = 0 } = (isObject(settings) ? settings : {}) as any;

	if (isObject($sort)) {
		const order = Object.keys($sort as Target<MinPlus>)
			.map((key) => ({ [key]: one }: Target<any>, { [key]: two }: Target<any>) => (one < two ? -1 : Number(one > two)) * ($sort as Target<MinPlus>)[key]);

		return (list: Array<unknown>) => order.reduce((carry, sorter) => carry.sort(sorter), list as Array<Target>);
	}

	return (list: Array<unknown>): Array<unknown> => list.sort((one: any, two: any) => (one < two ? -1 : Number(one > two)) * $sort);
}

function $position(settings: unknown): (list: Array<unknown>, insert: Array<unknown>) => Array<unknown> {
	const { $position = 0 } = (isObject(settings) ? settings : {}) as any;

	return (list, insert) => ([] as Array<unknown>)
		.concat($position < 0 ? insert : list, $position < 0 ? list : insert);
}

/**
 * $addToSet
 * Adds elements to an array only if they do not already exist in the set.
 * @syntax  { $addToSet: { <field1>: <value1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/addToSet/
 */
export function $addToSet(query: AddToSetOptions): Updater {
	const name = '$addToSet';
	const validate = validateArrayFor(name);
	const execution = prepare(query, (key, settings) => {
		const values = $each(settings, name);
		const access = accessor(key as string);

		return (target: Target): Target => {
			const current = ensureArray(target, access);
			const list = validate(key as string, current);

			values.forEach((value) => {
				if (!contains(list, value)) {
					list.push(value);
				}
			});

			return target;
		};
	});

	return (input: Target): Target => execution.reduce((carry, ex) => ex(carry), input);
}

/**
 * $pop
 * Removes the first or last item of an array.
 * @syntax  { $pop: { <field>: <-1 | 1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/pop/
 */
export function $pop(query: Target<MinPlus>): Updater {
	const name = '$pop';
	const validate = validateArrayFor(name);
	const execution = prepare(query, (key, direction) => {
		const method = direction > 0 ? 'pop' : 'shift';
		const access = accessor(key as string);

		return (target: Target): Target => {
			const current = access(target);

			if (!isUndefined(current)) {
				const list = validate(key as string, current);

				list[method]();
			}

			return target;
		}
	})

	return (input: Target): Target => execution.reduce((carry, ex) => ex(carry), input);
}

/**
 * $pull
 * Removes all array elements that match a specified query.
 * @syntax  { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/pull/
 */
export function $pull(query: Target<Partial<Query> | { [key: string]: Primitve }>): Updater {
	const name = '$pull';
	const validate = validateArrayFor(name);
	const execution = prepare(query, (key, settings) => {
		const access = accessor(key as string);
		const condition = isFilter(settings) ? filter(settings) : compare(settings);

		return (target: Target): Target => {
			const current = access(target);

			if (!isUndefined(current)) {
				const list = validate(key as string, current);

				list
					.filter(condition)
					.forEach((item) => {
						const index = list.indexOf(item);
						list.splice(index, 1);
					});
			}

			return target;
		};
	});

	return (input: Target): Target => execution.reduce((carry, ex) => ex(carry), input);
}

/**
 * $push
 * Adds an item to an array.
 * @syntax  { $push: { <field1>: <value1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/push/
 */
export function $push(query: PushOptions): Updater {
	const name = '$push';
	const validate = validateArrayFor(name);
	const execution = prepare(query, (key, settings) => {
		const values = $each(settings, name);
		const access = accessor(key as string);
		const combine = $position(settings);
		const sort = $sort(settings);
		const slice = $slice(settings);

		return (target: Target): Target => {
			const list = validate(key as string, ensureArray(target, access));
			const insert = slice(sort(combine(list, values)));

			list.splice(0, list.length, ...insert);

			return target;
		}
	});

	return (input: Target): Target => execution.reduce((carry, ex) => ex(carry), input);
}


/**
 * $pullAll
 * Removes all matching values from an array.
 * @syntax  { $pullAll: { <field1>: [ <value1>, <value2> ... ], ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/pullAll/
 */
export function $pullAll(query: Target<Array<unknown>>): Updater {
	const name = '$pullAll';
	const validate = validateArrayFor(name);
	const execution = prepare(query, (key, settings) => {
		if (!isArray(settings)) {
			throw new Error(`${name} requires an array argument but was given non-array type ${type(settings)}`);
		}
		const access = accessor(key as string);

		return (target: Target): Target => {
			const current = access(target);

			if (!isUndefined(current)) {
				const list = validate(key as string, current);

				list
					.filter((value) => contains(settings, value))
					.forEach((item) => {
						const index = list.indexOf(item);
						list.splice(index, 1);
					});
			}

			return target;
		};
	});

	return (input: Target): Target => execution.reduce((carry, ex) => ex(carry), input);
}
