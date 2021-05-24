import { is } from './BSON';

type Nest = {
	value: unknown;
	key?: string | number;
	parent?: Nest;
};
type Nesting = (target: unknown) => Nest;
type Target = { [key: string]: unknown };

const isObject = is('object');
const isUndefined = is('undefined');

function read({ value }: Nest): unknown {
	return value;
}

function all(condition: (value: unknown) => boolean, ...nest: Array<Nest>): boolean {
	return nest.every(({ value }) => condition(value));
}

function element({ key, value }: Nest): unknown {
	const element = key ? { [key]: value } : value;

	return element && JSON.stringify(element).replace(/"([^"]+)"\s*:/, '$1:');
}

function write(nest: Nest, value: unknown): void {
	const { parent, key } = nest;

	if (parent) {
		if (!all(isObject, parent) && all(isUndefined, nest, parent)) {
			write(parent, {});
		}
		if (!all(isObject, parent)) {
			throw new Error(`Cannot create field '${key}' in element ${element(parent)}`);
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

export function dotted(key: string) {
	const nesting = key.split('.')
		.reduce(nest, (value: unknown) => ({ value }));

	return (target: unknown, ...values: Array<unknown>): unknown => {
		const nested = nesting(target);

		return values.length ? write(nested, values[0]) : read(nested);
	}
}
