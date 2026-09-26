import type { Query } from './Compiler';

// MongoDB's legacy DBRef convention: {$ref, $id, $db} identifies a document
// in another collection/database. A document convention that Monger has no
// way to interpret, as it has no concept of collections (let alone databases)
// the exact rules are position-dependent:
// - top-level: $ref/$id/$db are each accepted individually as literal
//   fields, no co-occurrence required.
// - nested: only $ref+$id co-occurring (optionally with $db too) stop being
//   treated as operators (throws "unknown operator" if one is present and the
//   other is not).
const keys = ['$ref', '$id', '$db'];

export function isKey(name: string): boolean {
	return keys.includes(name);
}

export function isLiteral(name: string, query: Partial<Query>, path: Array<string>): boolean {
	return isKey(name)
		? path.length === 0 || ('$ref' in query && '$id' in query)
		: false;
}
