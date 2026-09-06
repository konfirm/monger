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

## `$elemMatch` operator-form double-unwraps array-shaped elements — resolved

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

Fixed: every comparison operator built on `elementwise()`
(`$gt`/`$gte`/`$lt`/`$lte`/`$eq`/`$ne`/`$in`/`$nin`) now takes `context:
CompileContext` as its 3rd argument (defaulted to `{query: {}, path: []}`
so the existing direct-call unit tests, which only ever pass the first
argument, keep working) and routes through a shared `scoped()` helper:
elementwise-transparent normally, but the bare `predicate` directly
(no unwrap) when `context.path[context.path.length - 1] === '$elemMatch'`.
One shared helper, not a per-operator flag. Took `$elemMatch`'s verified
score to 0.995 (only the already-tracked dot-notation gap left) and `$gt`
to a clean 1.

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

## Nested-object field values were being partially matched instead of literal-equality — resolved

Was: `Compiler.ts`'s `condition()` recursed into *any* object-valued field
condition as a set of independent sub-conditions (`{address: {city: "X"}}`
compiled as "does address.city equal X", ignoring any other keys on
address). Confirmed via docker this is wrong two ways: `{priority: {}}`
matched *every* document (including ones with no `priority` field at all)
since recursing into `{}` produces zero conditions, vacuously true; and
`{address: {city: "X"}}` matched a superset object
(`{city: "X", zip: "1"}`) that should have failed, since real MongoDB
compares the whole value with deep equality when the object has no
`$`-prefixed key, not a per-key partial match. `$eq` itself was already
correct on both counts — the bug was `condition()` bypassing it whenever
the value happened to be an object, rather than only bypassing it when
the object is genuinely an operator expression (has at least one
`$`-prefixed key). Fixed by gating on `hasOperatorKey` instead of
`isObject`. Same underlying distinction as `$elemMatch`'s own field-form
vs. operator-form split from earlier — turned out to be a compiler-wide
rule, not an `$elemMatch`-specific one.

## Mixing an operator key with a non-operator key in one object — order-dependent, not modeled

While fixing the above, tried adding "an object with any `$`-prefixed key
must have *only* `$`-prefixed keys, when nested" (mirroring
`{$gt: 5, extra: 1}` throwing "unrecognized operator: extra", confirmed
via docker). This caused a real regression against `coverage_elemmatch`
fixtures like `{scores: {$elemMatch: {rank: {$elemMatch: {level: 16}},
$or: [...]}}}}`, which mix a field key (`rank`) with `$or` and are
expected to work, not throw.

Further docker digging found the actual rule is **order-dependent**: the
*first* key decides how the whole object is parsed.
`{$exists: true, height: 9}` throws ("unknown operator: height"), but
`{height: 9, $exists: true}` does not — same two keys, different order.
Odder still, `$elemMatch`'s own parsing isn't consistent with an ordinary
nested field on this: `{scores: {$elemMatch: {height: 9, $exists: true}}}`
throws `"unknown top level operator: $exists"` (note: *top level*, despite
being nested), while `{level: {height: 9, $exists: true}}` (plain nested
field, not `$elemMatch`) does not throw at all. `$or`/`$and`/`$nor`
(logical combinators) seem to freely mix with field keys regardless of
position or order in every case tried; `$exists`/`$gt` (value-testing
operators) are the ones with the order-dependent, `$elemMatch`-inconsistent
behavior.

Deliberately not modeled — reverted the attempted fix rather than leave a
wrong generalization in place. Needs a proper dedicated investigation
(probably: is it really "first key" or something about *which* operators
count as combinators vs. value-testers; and why does `$elemMatch` parse
differently from a plain nested field at all) before implementing
anything here.

## Implicit-equality queries were invisible to `Catalog.spec.ts` — resolved

Was: mongo-catalog's own operator-classification (`findFieldOperator()`)
only tags a field's operator when its value contains a `$`-prefixed key —
a value with none (implicit equality, whether `{field: "x"}` or
`{field: {...noOperatorKey}}`) gets `operators: []`. `Catalog.spec.ts`
only ever ran operations with at least one tagged *active* operator, so
every implicit-equality query in the entire catalog — not just the new
`nestedEquality` one — was silently never exercised. Confirmed intended
on mongo-catalog's side (implicit equality genuinely has no operator to
tag); the fix belongs on Monger's side instead. Fixed: `Catalog.spec.ts`
now treats `operators: []` as `[{operator: '$eq', score: 1}]` before the
existing active/multi-operator filtering runs.

This immediately surfaced ~34 previously-invisible dot-notation failures
across `array`/`coverage_all`/`coverage_array`/`coverage_count`/
`coverage_exists`/`coverage_find`/`coverage_regex` (all tagged into
`knownIssues` under the general "array-of-subdocuments" gap rather than
individually diagnosed to their exact sub-variant — not worth the time
for a label that's purely for human legibility) — plus two genuinely new
findings below.

## Empty-object query against a nonexistent field matches everything — mongo-catalog collection bug, not Monger

`{"invalid": {}}` (comparison.json, `eED8uGvPD09h`) and `{"price": {}}`
(misc.json, `iKeSdyBbDy4j`) are both recorded as matching *every*
document in their collection, even though neither collection has that
field on any record at all. Confirmed via direct, repeated docker testing
this session (see the `nestedEquality` catalog work) that real MongoDB
does the opposite: `{field: {}}` only matches a document where `field` is
*literally* `{}`, never a no-op. Two independent catalogs showing the
identical wrong pattern rules out a one-off mistake — this is very likely
a bug in mongo-catalog's own collection harness (possibly something
treating an empty-object field value as equivalent to an empty top-level
filter `{}` when actually querying live MongoDB), not something to "fix"
in Monger. Needs looking at from the mongo-catalog side.

## Null bytes in field names now rejected — resolved

`Compiler.ts`'s `compile()` now throws `"key ... must not contain null
bytes"` for any key (field name or operator) containing `\0`, at any
nesting level — confirmed via mongo-catalog ground truth
(`misc.json`'s `dMOJWM6DK84i`) that real MongoDB rejects this at every
version. Only field-name/key validation is covered; whether a *value*
containing a null byte is also restricted (and specifically, whether
regex patterns have their own null-byte rejection — flagged as worth
checking, real error messages seen for that case too) is a separate,
not-yet-investigated question — likely a `typeMatrix`-style catalog
addition once characterized.

## `$type: "undefined"` — resolved for today, but revisit for version-aware emulation

Was: `{value: {$type: "undefined"}}` incorrectly matched a document
missing the `value` field entirely (`typeMatrix`'s `vONmVsXxWNZp`) — BSON
type 6 ("undefined", deprecated) is structurally indistinguishable from a
missing field once `Field.ts`'s `accessor()` resolves both to plain JS
`undefined` via property access. Fixed in `Element.ts`'s `$type` by
excluding `typeof value === 'undefined'` unconditionally, rather than
touching the shared `isUndefined`/`is(6)` used pervasively elsewhere
(`$exists`, `Field.ts`'s own missing-value tracking, Update operators,
`Schema.ts`, `Expression/Conditional.ts`) for genuine missing-value
detection — that usage is structurally load-bearing and must stay accurate.

Pushed back on and confirmed empirically before accepting the "always
false" fix: **this is a design choice in `Field.ts`, not a hard
limitation** — `in`/`hasOwnProperty` could distinguish "key present with
value `undefined`" from "key absent" perfectly well; `accessor()` just
currently discards that distinction via plain destructuring. It doesn't
matter *today* because no modern path can produce a genuinely-present
BSON-undefined value to tell apart from "missing" in the first place:
inserting `{value: undefined}` via the modern driver silently stores
`value: null`, not type 6, and the `bson` library exposes no constructible
"Undefined" sentinel at all (confirmed via a live insert test and
inspecting `BSON`'s own exports). So the "always false" fix is correct for
every case reachable through any current tooling, not just a shortcut.

Matters for later: if Monger ever supports emulating a *specific* older
MongoDB version, this stops being moot — older drivers may have actually
permitted inserting genuine BSON-undefined values, and correctly matching
legacy data collected under an old version could require telling "missing"
apart from "present but undefined" again. That's the same underlying
presence-vs-value distinction already needed for the dot-notation gap
above (empty-array / non-document-scalar array traversal losing MongoDB
distinctions by collapsing everything to `undefined`) — if `Field.ts`'s
accessor ever gets a presence-aware rework for that, `$type: "undefined"`
should be revisited to use it instead of the blunt exclusion.
