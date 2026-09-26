import type { Query } from './Compiler';

// $near/$nearSphere read $minDistance/$maxDistance directly off their own
// sibling query keys (context.query) — the same mechanism $regex uses for
// $options — so these two must never be dispatched as their own
// (nonexistent) operators when their owner is present. Generalized from a
// $near/$nearSphere-specific special case (see docs/todo.md) into a table
// so any future operator with the same "claims a sibling key" need is one
// entry, not another bespoke filter.
//
// When the owner is absent, a claimed key behaves like any other
// unrecognized operator (throws) — confirmed via mongo-catalog ground
// truth (geoNearMatrix, 2026-09-18): `{field: {$minDistance: 100}}` alone
// throws "unknown operator: $minDistance" in real MongoDB, it does not
// silently no-op.
const claims: Record<string, Array<string>> = {
	$minDistance: ['$near', '$nearSphere'],
	$maxDistance: ['$near', '$nearSphere'],
};

export function isClaimed(name: string, query: Partial<Query>): boolean {
	return (claims[name] ?? []).some((owner) => owner in query);
}
