import { isObject, isArray, isUndefined } from './BSON';

type Nest = {
	value: unknown;
	key?: string | number;
	parent?: Nest;
};
type Nesting = (target: unknown) => Nest;
type Target = { [key: string]: unknown };

function normalize(key: string): string | number {
	return /^[0-9]+$/.test(key) ? Number(key) : key;
}

function get({ value }: Nest): unknown {
	return value;
}

function all(condition: (value: unknown) => boolean, ...nest: Array<Nest>): boolean {
	return nest.every(({ value }) => condition(value));
}

function element({ key, value }: Nest): unknown {
	const element = key ? { [key]: value } : value;

	return element && JSON.stringify(element).replace(/"([^"]+)"\s*:/g, '$1:');
}

function exit(key: unknown, parent: Nest): void {
	const field = JSON.stringify(key).replace(/"/g, '\'');

	throw new Error(`Cannot create field ${field} in element ${element(parent)}`);
}

function set(nest: Nest, value: unknown): void {
	const { parent, key } = nest;

	if (parent) {
		const [detect, create] = typeof key === 'number' ? [isArray, []] : [isObject, {}];

		if (!all(detect, parent) && all(isUndefined, nest, parent)) {
			set(parent, create);
		}
		if (!all(detect, parent)) {
			exit(key, parent);
		}

		(parent.value as Target)[key as string] = value;
		nest.value = value;
	}
}

function nest(nesting: Nesting, key: Nest['key']): Nesting {
	return (target: unknown): Nest => {
		const parent = nesting(target);
		const { value: scope } = parent;
		const { [key as keyof typeof scope]: value } = scope || {};

		return { value, key, parent }
	};
}

function chain(key: string): Nesting {
	return key.split('.')
		.map(normalize)
		.reduce(nest, (value: unknown) => ({ value }));
}

export function accessor(key: string) {
	const nesting = chain(key);

	return (target: unknown, ...values: Array<unknown>): unknown => {
		const nested = nesting(target);

		return values.length ? write(nested, values[0]) : read(nested);
	}
}
