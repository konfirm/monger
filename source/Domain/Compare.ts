import { type as getType, isArray, isObject, isRegex } from './BSON';

type A<T = unknown> = Array<T>;
type O<T = unknown> = { [key: string]: T };
type Verifier<T = unknown> = (...values: [T, ...Array<unknown>]) => boolean;

export function type(first: unknown, ...rest: Array<unknown>): boolean {
	const type = getType(first);

	return rest.every((value) => getType(value) === type);
}

export function equal(first: unknown, ...rest: Array<unknown>): boolean {
	return rest.every((value) => value === first);
}

function similarArray(first: Array<unknown>, ...rest: Array<unknown>): boolean {
	return rest.every((other) =>
		first.length === (<A>other).length
		&& (<A>first).every((value, index) => deep(value, (<A>other)[index])));
}

function similarObject(first: O, ...rest: Array<unknown>): boolean {
	const keys = Object.keys(<O>first);

	return rest.every((other) =>
		deep(keys, Object.keys(<O>other)) &&
		keys.every((key) => key in <O>other && deep((<O>first)[key], (<O>other)[key]))
	);
}

function typed<T>(isType: (v: unknown) => boolean, compare: Verifier<T>): Verifier {
	return (first, ...rest) =>
		isType(first)
		&& type(first, ...rest)
		&& compare(<T>first, ...rest);
}

const rules: Array<Verifier> = [
	equal,
	typed<A>(isArray, similarArray),
	typed<O>(isObject, similarObject),
	(first, ...rest) =>
		isRegex(first)
		&& rest.every((value) => (first as RegExp).test(String(value))),
];

export function deep(...rest: [unknown, ...Array<unknown>]): boolean {
	return rules.some((rule) => rule(...rest));
}

export function json([first, ...rest]: [unknown, unknown, ...Array<unknown>]): boolean {
	const json = JSON.stringify(first);

	return rest.every((value) => JSON.stringify(value) === json);
}
