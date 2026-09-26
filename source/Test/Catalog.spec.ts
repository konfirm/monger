// Ground-truth runner: reads docs/status/operators.json for which operators
// are actively being worked on, evaluates every vendored mongo-catalog
// operation tagged with one of them against monger's real `filter`, and
// writes a pass-rate back into the status file per operator. Operators left
// at "planned" or "hold" are skipped entirely — turning this on for an
// operator is a one-line change to the status file, not an edit here.
//
// "Latest version's result" is a deliberate choice made here, not upstream:
// mongo-catalog publishes the full version-range history it observed
// (which version(s) said what) — deciding what to actually test against is
// this project's call, and today that's "whatever the newest collected
// MongoDB version did".

import { after, test } from 'node:test';
import * as assert from 'node:assert/strict';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { filter } from '../Domain/Filter';
import { deserialize } from './deserialize';

const statusPath = resolve(__dirname, '..', '..', 'docs', 'status', 'operators.json');
const catalogDir = resolve(__dirname, 'catalog');
const overridesPath = resolve(__dirname, 'catalog-overrides.json');

type OperatorStatus = {
	working: 'planned' | 'hold' | 'doing' | 'done';
	files: Array<string>;
	verified: number | null;
};
type CatalogResult = { documents?: Array<number>; error?: unknown; versions: string };
type CatalogOperation = {
	id: string;
	query: Record<string, unknown>;
	operators: Array<{ operator: string; score: number }>;
	results: Array<CatalogResult>;
};
type CatalogFile = {
	catalog: string;
	collection: { records: Array<Record<string, unknown>> };
	operations: Array<CatalogOperation>;
};

// The outcome to diff monger's actual output against — either raw ground
// truth (normalized down to this same shape) or a CatalogOverride's
// `expect`. Normalizing both to one shape up front (rather than branching
// on "is this ground truth or an override" throughout the comparison logic
// below) is what keeps that logic a single path regardless of the source.
type ExpectedOutcome = { error: true } | { documents: Array<number> };

// A single entry can override many operations sharing one `reason` (e.g.
// today's ~40 "dot-notation into array-of-subdocuments" cases) rather than
// repeating the reason per id. `todo` and `expect` are independent, not
// alternatives: `expect` decides *what* to compare against (ground truth by
// default, this value if given); `todo` decides *how* a mismatch is
// reported (hard failure by default, an expected/todo failure — with
// surprise-pass visibility if it starts matching — if set). At least one of
// the two must be set, or the entry does nothing and is a config mistake.
type CatalogOverride = {
	reason: string;
	query: Array<string>;
	todo?: boolean;
	expect?: ExpectedOutcome;
};

function isExpectedOutcome(value: unknown): value is ExpectedOutcome {
	return (
		!!value && typeof value === 'object' &&
		(('error' in value && (value as { error: unknown }).error === true) ||
			('documents' in value && Array.isArray((value as { documents: unknown }).documents)))
	);
}

function loadOverrides(): Map<string, CatalogOverride> {
	const raw: Array<CatalogOverride> = JSON.parse(readFileSync(overridesPath, 'utf8'));
	const byId = new Map<string, CatalogOverride>();

	raw.forEach((entry, index) => {
		if (!entry.reason || !entry.query?.length) {
			throw new Error(`catalog-overrides.json[${index}]: "reason" and a non-empty "query" are required`);
		}
		if (!entry.todo && !entry.expect) {
			throw new Error(`catalog-overrides.json[${index}] ("${entry.reason}"): needs "todo", "expect", or both — an override doing neither is a mistake, not a no-op`);
		}
		if (entry.expect && !isExpectedOutcome(entry.expect)) {
			throw new Error(`catalog-overrides.json[${index}] ("${entry.reason}"): "expect" must be { documents: number[] } or { error: true }`);
		}

		entry.query.forEach((id) => {
			if (byId.has(id)) {
				throw new Error(`catalog-overrides.json: id "${id}" is claimed by more than one override entry`);
			}
			byId.set(id, entry);
		});
	});

	return byId;
}

const overrides = loadOverrides();

type Version = [number, number, number];

function parseVersion(version: string): Version {
	const [major, minor = 0, patch = 0] = version.split('.').map(Number);
	return [major, minor, patch];
}
function compareVersions(a: Version, b: Version): number {
	return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}
// A range string ("3.3.15..8.3.8", "3.3.15,3.4.2", or a bare "8.3.8") may mix
// contiguous-range and list separators ambiguously once there are multiple
// segments — irrelevant here, since only the single highest token anywhere
// in the string is wanted, not which segment it belongs to.
function highestVersionIn(range: string): Version {
	return range
		.split(',')
		.flatMap((part) => part.split('..'))
		.map(parseVersion)
		.reduce((highest, current) => (compareVersions(current, highest) > 0 ? current : highest));
}
function latestResult(results: Array<CatalogResult>): CatalogResult {
	return results.reduce((latest, current) =>
		compareVersions(highestVersionIn(current.versions), highestVersionIn(latest.versions)) > 0 ? current : latest
	);
}
function outcomeOf(result: CatalogResult): ExpectedOutcome {
	return result.error !== undefined ? { error: true } : { documents: result.documents ?? [] };
}

const status: Record<string, OperatorStatus> = JSON.parse(readFileSync(statusPath, 'utf8'));
const active = new Set(
	Object.entries(status)
		.filter(([, s]) => s.working === 'doing' || s.working === 'done')
		.map(([operator]) => operator)
);

type RunnableOperation = {
	id: string;
	catalog: string;
	query: Record<string, unknown>;
	records: Array<Record<string, unknown>>;
	expected: ExpectedOutcome;
	operators: Array<string>;
};

// Every operation id seen across the catalog, active-filtered or not — used
// to validate overrides reference something real. Kept separate from
// `runnable` (the active-filtered subset actually under test) so an
// override for an operator that's currently "planned"/"hold" doesn't get
// wrongly flagged as stale just because nothing's exercising it this run.
const allIds = new Set<string>();
const runnable = new Map<string, RunnableOperation>();

{
	const files = readdirSync(catalogDir).filter((f) => f.endsWith('.json') && f !== 'manifest.json');

	for (const file of files) {
		const data = deserialize<CatalogFile>(readFileSync(resolve(catalogDir, file), 'utf8'));

		for (const op of data.operations) {
			allIds.add(op.id);

			if (!active.size) {
				continue;
			}

			// A query with no $-prefixed key anywhere (implicit equality,
			// e.g. {field: "x"} or {field: {}}) is intentionally left
			// untagged by mongo-catalog's own classification — it's still
			// exactly $eq, just implicit, so treat "no tag" as "$eq" here
			// rather than that in mongo-catalog itself.
			const operators = op.operators.length ? op.operators : [{ operator: '$eq', score: 1 }];
			const maxScore = Math.max(...operators.map((t) => t.score));
			const matched = operators
				// during migration and refactoring on new findings for the real
				// mongo behaviour we focus first on only the queries that have
				// the operator we're after as primary (the top level one) this
				// is represented by the highest scoring operator
				.filter((t) => t.score === maxScore)
				.map(({ operator }) => operator)
				.filter((op) => active.has(op))
				;
			if (!matched.length || operators.length > 1 || runnable.has(op.id)) {
				continue;
			}

			runnable.set(op.id, {
				id: op.id,
				catalog: data.catalog,
				query: op.query,
				records: data.collection.records,
				expected: outcomeOf(latestResult(op.results)),
				operators: matched,
			});
		}
	}
}

test('Domain/Test/Catalog - overrides reference real operations', () => {
	const stale = [...overrides.entries()].filter(([id]) => !allIds.has(id));

	assert.deepEqual(
		stale.map(([id, { reason }]) => `${id} ("${reason}")`),
		[],
		'catalog-overrides.json has entries whose id no longer matches any catalog operation — the query it pointed at changed or was removed, the override needs updating',
	);
});

const tally = new Map<string, { pass: number; total: number }>();

function record(operators: Array<string>, passed: boolean): void {
	for (const operator of operators) {
		const entry = tally.get(operator) ?? { pass: 0, total: 0 };
		entry.total++;
		if (passed) {
			entry.pass++;
		}
		tally.set(operator, entry);
	}
}

for (const op of runnable.values()) {
	const override = overrides.get(op.id);
	const expected = override?.expect ?? op.expected;

	// todo, not skip: the body still runs, so a fixed override shows up as
	// a (still green) surprise pass instead of staying silently disabled.
	test(`${op.operators.join(', ')} :: ${op.catalog} :: ${op.id} :: ${JSON.stringify(op.query)}`, { todo: override?.todo ? override.reason : undefined }, () => {
		const expectsError = 'error' in expected;
		let failure: unknown = null;

		try {
			const compiled = filter(op.query as any);
			const matched = op.records.filter((r) => compiled(r)).map((r) => r._id as number);

			if (expectsError) {
				failure = new Error('expected this query to throw, but it compiled and evaluated without error');
			} else {
				// Order-insensitive by design: mongo-catalog's expected
				// documents reflect real MongoDB's actual result order
				// (e.g. $near sorts by distance), and monger doesn't
				// implement a query planner or sort guarantee to
				// reproduce that — only whether the matched *set* agrees.
				const extra = matched.filter((id) => !expected.documents.includes(id));
				const missing = expected.documents.filter((id) => !matched.includes(id));

				if (extra.length || missing.length) {
					const byId = new Map(op.records.map((r) => [r._id as number, r]));
					const describe = (id: number) => `    _id ${id}: ${JSON.stringify(byId.get(id))}`;

					failure = new Error([
						extra.length && `matched, but should not have:\n${extra.map(describe).join('\n')}`,
						missing.length && `expected to match, but did not:\n${missing.map(describe).join('\n')}`,
					].filter(Boolean).join('\n'));
				}
			}
		} catch (e) {
			// Any thrown error counts as agreeing the query is invalid —
			// monger's error text is its own, not MongoDB's, so message
			// equality was never going to be a meaningful check here.
			if (!expectsError) {
				failure = e;
			}
		}

		record(op.operators, failure === null);

		if (failure) {
			throw failure;
		}
	});
}

after(() => {
	if (!runnable.size) {
		return;
	}

	for (const [operator, { pass, total }] of tally) {
		status[operator].verified = total ? Math.round((pass / total) * 1000) / 1000 : null;
	}

	writeFileSync(statusPath, JSON.stringify(status, null, '\t') + '\n');
});
