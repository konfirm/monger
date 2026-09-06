# TODO

Things noticed in passing that are worth a deliberate look once the test
suite (see `docs/status/operators.json`) is in working order, but that
aren't blocking the current operator-by-operator pass.

## `CompareMode.STRICT` — likely genuinely dead now

Originally flagged here as possibly dead code (reasoning: `Compiler.ts`'s
`condition()` desugars implicit `{ field: value }` into `{ $eq: value }`,
so it runs through `$eq`'s `CompareMode.EXPLICIT`, never `STRICT`). That
turned out to be incomplete at the time — `STRICT` was `deep()`'s default
parameter, and `$in`/`$nin`/`$ne` all relied on exactly that default. All
three have since been moved to explicit `CompareMode.MONGODB` (same
null-matches-missing, implicit-regex-as-pattern semantics, just correctly
named and no longer accidental).

`STRICT` is now only reached internally by `similarArray`/`similarObject`,
plus `deep()`'s own default parameter (which nothing calls unqualified
anymore, as far as the Comparison operators go). Worth a final check across
the rest of the codebase (Update operators, Array/Element operators, etc.)
for any other bare `deep(a, b)` call before concluding `STRICT` and the
implicit/explicit split it implies can be removed outright.

## Dot-notation doesn't traverse arrays of subdocuments

`Field.ts`'s `chain()`/`nest()` do plain property access at each dot-segment
(`scope[key]`). That's correct when `scope` is a plain object, but when
`scope` is an *array* of subdocuments and `key` isn't a numeric index (e.g.
`"scores.score"` where `scores` is `[{score: 91}, {score: 60}, ...]`),
MongoDB's actual rule is to project `key` across every array element
(`scores.map(el => el.score)`), not index into the array itself — which is
just `scope['score']`, always `undefined`.

Confirmed via catalog fixtures currently parked in `Catalog.spec.ts`'s
`knownIssues` (`j2LcEFzbd083`, `vW955KXRzaI8`, `uctCQArWHvPX`,
`j8IG6BDE1c3r`, `tVFoDXVRYxhX`, `tYKZjCHLsaUr`) — tagged `$gte`/`$in` only
because those happened to be the highest-scoring operator in the query, the
actual gap is entirely in `Field.ts`, unrelated to any comparison operator.

There's a sharper edge case in the same subsystem, also parked
(`tmvPBYA9eSEz`, `uY2fLtrMOKuA`): when the array holds *non-document*
scalars (e.g. `email: [7, "Abundant"]`, not `[{attempts: ...}, ...]`),
`"email.attempts"` resolving to `undefined` should **not** count as "field
is missing" for null-matching purposes — MongoDB treats "path descends
through an array of non-documents, so it fundamentally can't resolve" as
different from "field is genuinely absent," even though both currently
produce the same `undefined` in `Field.ts` today. Whatever traversal fix
lands needs to preserve that distinction, not just fix the subdocument case.

And a third variant, also parked (`n1CqM5LBKHMe`): when the array is
*empty* (`scores: []`, or `[[]]`), there's nothing to project at all, but
real MongoDB still treats that as distinct from "field is missing" for
null-equality purposes (`{"scores.grade": {$ne: null}}` matches an empty
`scores` array) — a third way the same `undefined`-collapse in `Field.ts`
loses a real distinction MongoDB makes.

Not a local fix: `accessor()` (from `Field.ts`) is shared with three Update
operators (`Update/Operator/Bitwise.ts`, `Update/Operator/Field.ts`,
`Update/Operator/Array.ts`) for writes, and MongoDB's write semantics
through an unindexed array path are genuinely different from its read
semantics — naively changing `nest()`'s traversal for reads would also
change what `set()`/`unset()` see. Needs either a read-only traversal
variant or explicit gating so write behavior doesn't shift, plus testing
against the Update operator suite specifically before landing.

## `$type` operand validation — resolved

Was: catalog fixtures tagged `$in`-primary (`uaGXTcV1CcKf`, `jtAXT35rdYXh`,
`p9mIKnPOOUMf`) expected `$type` to reject malformed operands (`null`, an
unknown type-alias string) but didn't. Fixed by validating against the full
BSON id/alias set (`BSON.ts`'s `isBSONID`/`isBSONAlias`, now covering the
previously-commented-out `binData`/`objectId`/`dbPointer`/
`javascriptWithScope`/`timestamp`/`decimal`/`minKey`/`maxKey` rows too) —
important distinction kept: a *valid* but currently-undetectable type code
(e.g. `$type: 5` for `binData`) must still pass validation and simply never
match anything, not be rejected as unknown.

## `$elemMatch` needs its own operand validation — resolved

Was: surfaced via a catalog fixture tagged `$ne`-primary (`txUCYGRKHB7z`):
`{"indices": {"$ne": 10, "$elemMatch": 42}}` expects `"$elemMatch needs an
Object"` — `$elemMatch`'s own operand validation (`42` isn't an object),
unrelated to `$ne`. Fixed: `Array.ts`'s `assertElemMatch` now validates the
operand is an object, recursively rejects `$where`/`$text`/`$expr` anywhere
in the (sub-)query (confirmed via docker these throw even nested inside
`$and`), and field-form conditions (any query with no `$`-prefixed key,
including `{}`) now require the candidate array element be a container
(object or array — confirmed arrays support numeric-string field access
too, e.g. `{"0": "value"}` against `[["value"]]`) rather than vacuously
matching any element type. Took `verified` from 0.626 to 0.962.

## `$elemMatch` operator-form double-unwraps array-shaped elements

`{value: {$elemMatch: {$gt: 1}}}` incorrectly matches `value:
[[1,2],[3,4]]` (confirmed wrong via docker: real MongoDB excludes it, same
for `$eq`). Root cause: `Comparison.ts`'s comparison operators (`$gt`
et al., via the shared `predicate()` helper, plus `$eq`/`$ne`/`$in`/`$nin`)
are built on `elementwise()`, which unwraps one level of array
automatically — correct for a normal top-level field query (`{field:
{$gt: 1}}` where `field` is an array, confirmed this matches real Mongo),
but wrong inside `$elemMatch`'s operator-form, where `$elemMatch`'s own
`.some()` loop over the outer array *is* that one level of unwrapping.
Handing a candidate element straight to the compiled `$gt` and letting
`elementwise()` unwrap it a second time (if that element happens to itself
be an array) is the bug — real MongoDB never does a second unwrap.

Not a local `Array.ts` fix: needs the comparison operators to distinguish
"field-level compile" (elementwise-transparent) from "value-level compile"
(strict, no unwrapping). The mechanism for this now exists —
`Compiler.ts`'s `CompileContext` (`{ query, path }`, threaded through every
operator call as the 3rd argument) already carries `path`, the ancestor
chain of operator/field names (closest last, `[]` at the root) — added to
resolve the `$ref`/`$id`/`$db` gap below, which turned out to be the same
underlying blind spot. `$gt`/`$gte`/`$lt`/`$lte`/`$eq`/`$ne`/`$in`/`$nin`
(all built on `elementwise()`) would each need to check
`context.path[context.path.length - 1] === '$elemMatch'` and skip the
unwrap when true, not just the two ($gt/$eq) caught by catalog fixtures so
far (`nRrQZO1b91AC`, `lijSZRhzhG4S`, both `typeMatrix`-tagged). Parked
because it touches every comparison operator at once — worth doing as one
deliberate pass rather than fixing the two known failures piecemeal.

## `$ref`/`$id`/`$db` (legacy DBRef keys) wrongly rejected as unknown operators — resolved

`{level: {$ref: "Couple", $id: 30}}` should match a document whose `level`
field is literally the object `{$ref: "Couple", $id: 30}` — MongoDB has a
long-standing backward-compatibility carve-out where `$ref`/`$id`/`$db`
are treated as literal field names (a plain nested-object equality check),
never as operators, because of the legacy DBRef convention. Monger's
`Compiler.ts` doesn't know about this and throws `"Unrecognized operator:
'$ref'"` instead (surfaced via `coverage_dbref` catalog fixtures, e.g.
`bvJFMKQaA0Qp`, tagged `$elemMatch`-primary but unrelated to `$elemMatch`
itself — same as the `$type`/dot-notation gaps above, wrong operator
attribution because that's how the catalog scores matches).

Confirmed via docker the actual rule is position-dependent and stricter
than "just whitelist these three names":
- **Top-level** (the whole query document): `$ref`, `$id`, `$db` are each
  accepted individually as literal fields, no co-occurrence required
  (`{$ref: "Couple"}`, `{$id: 30}`, `{$db: "mydb"}` all fine alone) — while
  a genuinely unknown top-level key still correctly errors `"unknown top
  level operator"`.
- **Nested** (inside a field's sub-document, or `$elemMatch`'s operand):
  `$id` alone → `"unknown operator: $id"`; `$db` alone → `"unknown
  operator: $db"`; `$ref` alone → `"unknown operator: $ref"`; even
  `$ref`+`$db` without `$id` still errors on `$ref`. Only `{$ref, $id}` or
  `{$ref, $id, $db}` are accepted as a literal DBRef sub-document — nested
  position requires `$ref` **and** `$id` to co-occur before either stops
  being treated as an operator.

Fixed: `Compiler.ts`'s `compile()`/`operation()`/`delegate()`/`condition()`
now thread `path` (the ancestor chain, see `$elemMatch` double-unwrap
entry above) through every recursive call. `isLiteralDBRefKey()` uses
`path.length === 0` for the root case and `'$ref' in query && '$id' in
query` for the nested co-occurrence rule. Also needed: DBRef field
*values* are now always compared literally (never recursed into as a
nested condition set even when object-shaped) — confirmed via docker
`{$id: {$bogus: 1}}` doesn't throw, it's a deep-equality check against the
literal object. `$elemMatch` itself also had to change: it used to compile
each of its own keys separately (`compile({[key]: value})` per key), which
hid `$id` from seeing its sibling `$ref` — now compiles its whole operand
as one `compile(query)` call instead (which was redundant duplication of
what `Compiler.compile()` already does internally anyway).

Open question, not yet settled: whether this carve-out belongs in
`Compiler.ts` (i.e. monger's core query engine) at all, versus being out
of scope for a modern-MongoDB-targeting library given DBRef itself is a
legacy/discouraged convention. Parked for a later discussion — the fix
above is in place and verified either way, but worth revisiting whether
it should exist.

## `$near`/`$nearSphere`'s sibling `$minDistance`/`$maxDistance` — same shape as DBRef, revisit once geospatial work resumes

`Compiler.ts`'s `compile()` has a special-cased filter to stop
`$minDistance`/`$maxDistance` from being independently dispatched as their
own (nonexistent) operators, since `$near`/`$nearSphere` already read them
directly off `context.query` (sibling keys, same mechanism `$regex` uses
for `$options`). The filter is currently also buggy:
`!('$near' in query || '$nearSphere')` — the second operand is a bare
string literal (always truthy), so the whole condition is always `true`
and `$minDistance`/`$maxDistance` get stripped unconditionally, not just
when `$near`/`$nearSphere` is actually present. Harmless in practice
(nobody queries `$minDistance` alone), but not what the comment claims.

Same shape as the `$ref`/`$id`/`$db` fix: a `$`-prefixed key that isn't an
operator itself but shouldn't be independently dispatched because a
sibling operator already consumes it. Proposed fix: generalize the
`dbRefKeys` table-lookup pattern into a `claimedSiblingKeys` table —

```ts
const claimedSiblingKeys: Record<string, Array<string>> = {
	$minDistance: ['$near', '$nearSphere'],
	$maxDistance: ['$near', '$nearSphere'],
};
```

— checked in `operation()` alongside the DBRef check: if `name` is claimed
and one of its listed owner-operators is present in `query`, skip
dispatch entirely (no-op evaluator) instead of throwing or trying to
compile it standalone. Removes the ad-hoc `.filter()` in `compile()`,
fixes the always-true bug as a side effect, and covers any future
operator with the same "claims a sibling key" need via one table entry
rather than another bespoke filter. Deliberately not implemented yet —
touches `Geospatial.ts`, which is being migrated separately; revisit once
that work resumes.
