import type { Evaluator } from './Query/Compiler';

type ECMAType
	= 'bigint'
	| 'boolean'
	| 'function'
	| 'number'
	| 'object'
	| 'string'
	| 'symbol'
	| 'undefined';
export type TypeAlias
	= 'double'
	| 'string'
	| 'object'
	| 'array'
	| 'binData'
	| 'undefined'
	| 'objectId'
	| 'bool'
	| 'date'
	| 'null'
	| 'regex'
	| 'dbPointer'
	| 'javascript'
	| 'symbol'
	| 'javascriptWithScope'
	| 'int'
	| 'timestamp'
	| 'long'
	| 'decimal'
	| 'minKey'
	| 'maxKey';
export type TypeAliasUnavailable
	= 'binData'
	& 'objectId'
	& 'dbPointer'
	& 'javascriptWithScope'
	& 'timestamp'
	& 'decimal'
	& 'minKey'
	& 'maxKey';
export type TypeAliasAvailable = Omit<TypeAlias, TypeAliasUnavailable>;

type TypeClassifier = {
	id: number;
	alias: TypeAliasAvailable;
	group: ECMAType | 'unknown';
	is: (input: unknown) => boolean;
}
type TypeIdentifier = TypeClassifier['id'] | TypeClassifier['alias'];

const detectors: Array<TypeClassifier> = [
	{ id: 1, alias: 'double', group: 'number', is: (v) => !Number.isInteger(v) },
	{ id: 2, alias: 'string', group: 'string', is: () => true },
	{ id: 3, alias: 'object', group: 'object', is: () => true },
	{ id: 4, alias: 'array', group: 'object', is: (v) => Array.isArray(v) },
	// { id: 5, alias: 'binData', group: 'unknown', is: () => false },
	{ id: 6, alias: 'undefined', group: 'undefined', is: () => true },
	// { id: 7, alias: 'objectId', group: 'unknown', is: () => false },
	{ id: 8, alias: 'bool', group: 'boolean', is: () => true },
	{ id: 9, alias: 'date', group: 'object', is: (v) => v instanceof Date },
	{ id: 10, alias: 'null', group: 'object', is: (v) => v === null },
	{ id: 11, alias: 'regex', group: 'object', is: (v) => v instanceof RegExp },
	// { id: 12, alias: 'dbPointer', group: 'unknown', is: () => false },
	{ id: 13, alias: 'javascript', group: 'function', is: () => true },
	{ id: 14, alias: 'symbol', group: 'symbol', is: () => true },
	// { id: 15, alias: 'javascriptWithScope', group: 'unknown', is: () => false },
	{ id: 16, alias: 'int', group: 'number', is: (v) => Number.isInteger(v) },
	// { id: 17, alias: 'timestamp', group: 'unknown', is: () => false },
	{ id: 18, alias: 'long', group: 'number', is: (v) => Number.isInteger(v) && !Number.isSafeInteger(v) },
	{ id: 18, alias: 'long', group: 'bigint', is: (v) => true },
	// { id: 19, alias: 'decimal', group: 'unknown', is: () => false },
	// { id: -1, alias: 'minKey', group: 'unknown', is: () => false },
	// { id: 127, alias: 'maxKey', group: 'unknown', is: () => false },
];

function detect(value: unknown): TypeClassifier {
	const type: ECMAType = typeof value;
	const types: Array<TypeClassifier> = detectors
		.filter((tc) => tc.group === type && tc.is(value))
		.sort((one, two) => {
			const a = Number(one.alias === String(one.group));
			const b = Number(two.alias === String(two.group));

			return a < b ? -1 : Number(a > b);
		});
	const [found] = types;

	return found;
}

export function id(value: unknown): number {
	const found = detect(value);

	return found && found.id;
}

export function alias(value: unknown): TypeAliasAvailable {
	const found = detect(value);

	return found && found.alias;
}

export function is(type: TypeIdentifier | Array<TypeIdentifier>): Evaluator {
	const list = ([] as Array<TypeIdentifier>).concat(type);
	const includes = ({ id, alias }: TypeClassifier) => list.indexOf(id) >= 0 || list.indexOf(alias) >= 0;

	return (input: unknown): boolean => includes(detect(input));
}
