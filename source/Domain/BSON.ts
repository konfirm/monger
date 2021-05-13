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
	priority: number,
	is: (input: unknown) => boolean;
}
type TypeIdentifier = TypeClassifier['id'] | TypeClassifier['alias'];

const detectors: Array<TypeClassifier> = [
	{ id: 1, alias: 'double', group: 'number', is: (v) => !Number.isInteger(v), priority: 1 },
	{ id: 2, alias: 'string', group: 'string', is: () => true, priority: 0 },
	{ id: 3, alias: 'object', group: 'object', is: () => true, priority: 0 },
	{ id: 4, alias: 'array', group: 'object', is: (v) => Array.isArray(v), priority: 1 },
	// { id: 5, alias: 'binData', group: 'unknown', is: () => false, priority: 1 },
	{ id: 6, alias: 'undefined', group: 'undefined', is: () => true, priority: 0 },
	// { id: 7, alias: 'objectId', group: 'unknown', is: () => false, priority: 1 },
	{ id: 8, alias: 'bool', group: 'boolean', is: () => true, priority: 0 },
	{ id: 9, alias: 'date', group: 'object', is: (v) => v instanceof Date, priority: 1 },
	{ id: 10, alias: 'null', group: 'object', is: (v) => v === null, priority: 1 },
	{ id: 11, alias: 'regex', group: 'object', is: (v) => v instanceof RegExp, priority: 1 },
	// { id: 12, alias: 'dbPointer', group: 'unknown', is: () => false, priority: 1 },
	{ id: 13, alias: 'javascript', group: 'function', is: () => true, priority: 0 },
	{ id: 14, alias: 'symbol', group: 'symbol', is: () => true, priority: 0 },
	// { id: 15, alias: 'javascriptWithScope', group: 'unknown', is: () => false, priority: 1 },
	{ id: 16, alias: 'int', group: 'number', is: (v) => Number.isInteger(v), priority: 1 },
	// { id: 17, alias: 'timestamp', group: 'unknown', is: () => false, priority: 1 },
	{ id: 18, alias: 'long', group: 'number', is: (v) => Number.isInteger(v) && !Number.isSafeInteger(v), priority: 1 },
	{ id: 18, alias: 'long', group: 'bigint', is: () => true, priority: 0 },
	// { id: 19, alias: 'decimal', group: 'unknown', is: () => false, priority: 1 },
	// { id: -1, alias: 'minKey', group: 'unknown', is: () => false, priority: 1 },
	// { id: 127, alias: 'maxKey', group: 'unknown', is: () => false, priority: 1 },
];
const ordered: Array<TypeClassifier> = detectors
	.sort(({ priority: one }, { priority: two }) => one > two ? -1 : Number(one < two));

function detect(value: unknown): TypeClassifier {
	const type: ECMAType = typeof value;
	const [found]: Array<TypeClassifier> = ordered
		.filter((tc) => tc.group === type && tc.is(value));

	return found;
}

export function is(type: TypeIdentifier | Array<TypeIdentifier>): Evaluator {
	const list = ([] as Array<TypeIdentifier>).concat(type);
	const includes = ({ id, alias }: TypeClassifier) => list.indexOf(id) >= 0 || list.indexOf(alias) >= 0;

	return (input: unknown): boolean => includes(detect(input));
}
