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

## `$elemMatch` needs its own operand validation

Surfaced via a catalog fixture tagged `$ne`-primary (`txUCYGRKHB7z`):
`{"indices": {"$ne": 10, "$elemMatch": 42}}` expects `"$elemMatch needs an
Object"` — `$elemMatch`'s own operand validation (`42` isn't an object),
unrelated to `$ne`. Not yet investigated.
