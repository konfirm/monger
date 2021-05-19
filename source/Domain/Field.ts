import { is } from './BSON';

const isObject = is('object');
const isUndefined = is('undefined');
const isObjectable = is('undefined', 'null');

type Nest = {
	value: any;
	key?: string;
	parent?: Nest;
};
type FieldTarget = (target: unknown) => Nest;

function tail(tail?: FieldTarget, key?: string): FieldTarget {
	return (target: unknown): Nest => {
		if (tail) {
			const parent = tail(target);
			const { value: { [key as string]: value } = {} } = parent;

			return { key, value, parent };
		}

		return { value: target };
	};
}

function canContainKey({ value }: Nest): boolean {
	return isObject(value) || isObjectable(value);
}

function reachable({ parent }: Nest): boolean {
	return !parent || (canContainKey(parent) && reachable(parent));
}

function exit({ key, parent }: Nest): void {
	const { parent: { value } = {} } = parent as Nest;
	const element = JSON.stringify(value || 'undefined').replace(/"([^"]+)"(:|$)/g, '$1$2');

	throw new Error(`Cannot create field '${key}' in element ${element}`)
}

export function dotted(dotted: string): (target: unknown, value?: unknown) => unknown {
	const path: FieldTarget = dotted.split('.').reduce(tail, tail());

	return (target: unknown, ...values: Array<unknown>) => {
		const tree = path(target);

		if (values.length) {
		}

		return tree.value;
	};
}
