import type { Target, Updater } from '../Compiler';
import { prepare } from '../Compiler';
import { accessor } from '../../Field';
import { isObject, isArray, isUndefined, type } from '../../BSON';

type Primitve = string | number | boolean | null;
type MinPlus = -1 | 1;
type AddToSet = {
	[key: string]
	: { $each: Array<unknown> }
	| ({ [key: string]: unknown } & { $each?: never })
	| Primitve
	| Array<unknown>;
};

export type Operation = {
	$addToSet: Parameters<typeof $addToSet>[0];
	$pop: Parameters<typeof $pop>[0];
};

function validateArrayFor(method: string): (key: string, value: unknown) => Array<unknown> {
	return (key: string, value: unknown): Array<unknown> => {
		if (isArray(value)) {
			return value as Array<unknown>;
		}

		const [, tail] = (String(key).match(/^(.+\.)?([^\.]+)$/) || []).slice(1);

		throw new Error(`Cannot apply ${method} to non-array field. Field named '${tail}' has non-array type ${type(value)}`);
	};
}

function contains(collection: Array<any>, value: unknown): boolean {
	const json = JSON.stringify(value);

	return collection.some((value) => JSON.stringify(value) === json);
}

function ensureArray(target: Target, access: ReturnType<typeof accessor>): Array<unknown> {
	let current = access(target);

	if (isUndefined(current)) {
		access(target, []);
		current = access(target);
	}

	return current as Array<unknown>;
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

/**
 * $addToSet
 * Adds elements to an array only if they do not already exist in the set.
 * @syntax  { $addToSet: { <field1>: <value1>, ... } }
 * @see     https://docs.mongodb.com/manual/reference/operator/update/addToSet/
 * @todo    implement $addToSet
 */
export function $addToSet(query: AddToSet): Updater {
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
 * @todo    implement $pop
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

