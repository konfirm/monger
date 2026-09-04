// Ground-truth runner: reads docs/status/operators.json for which operators
// are actively being worked on, evaluates every vendored mongo-catalog
// operation tagged with one of them against monger's real `filter`, and
// writes a pass-rate back into the status file per operator. Operators left
// at "not-started" are skipped entirely — turning this on for an operator
// is a one-line change to the status file, not an edit here.
//
// "Latest version's result" is a deliberate choice made here, not upstream:
// mongo-catalog publishes the full version-range history it observed
// (which version(s) said what) — deciding what to actually test against is
// this project's call, and today that's "whatever the newest collected
// MongoDB version did".

import { after, test } from 'node:test';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { filter } from '../Domain/Filter';
import { deserialize } from './deserialize';

const statusPath = resolve(__dirname, '..', '..', 'docs', 'status', 'operators.json');
const catalogDir = resolve(__dirname, 'catalog');

type OperatorStatus = {
	working: 'not-started' | 'in-progress' | 'done';
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

const status: Record<string, OperatorStatus> = JSON.parse(readFileSync(statusPath, 'utf8'));
const active = new Set(
	Object.entries(status)
		.filter(([, s]) => s.working === 'in-progress' || s.working === 'done')
		.map(([operator]) => operator)
);

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

type RunnableOperation = {
	id: string;
	catalog: string;
	query: Record<string, unknown>;
	records: Array<Record<string, unknown>>;
	expected: CatalogResult;
	operators: Array<string>;
};

const runnable = new Map<string, RunnableOperation>();

if (active.size) {
	const files = readdirSync(catalogDir).filter((f) => f.endsWith('.json') && f !== 'manifest.json');

	for (const file of files) {
		const data = deserialize<CatalogFile>(readFileSync(resolve(catalogDir, file), 'utf8'));

		for (const op of data.operations) {
			const maxScore = Math.max(...op.operators.map((t) => t.score));
			const matched = op.operators
				// during migration and refactoring on new findings for the real
				// mongo behaviour we focus first on only the queries that have
				// the operator we're after as primary (the top level one) this
				// is represented by the highest scoring operator
				.filter((t) => t.score === maxScore)
				.map(({ operator }) => operator)
				.filter((op) => active.has(op))
				;
			if (!matched.length || op.operators.length > 1 || runnable.has(op.id)) {
				continue;
			}

			runnable.set(op.id, {
				id: op.id,
				catalog: data.catalog,
				query: op.query,
				records: data.collection.records,
				expected: latestResult(op.results),
				operators: matched,
			});
		}
	}
}

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

// Known, already-diagnosed gaps unrelated to the operator they happen to be
// tagged with — tracked in docs/todo.md rather than left as unexplained
// noise in whichever operator's active run surfaces them.
const knownIssues: Record<string, string> = {
	j2LcEFzbd083: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	vW955KXRzaI8: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	uctCQArWHvPX: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	j8IG6BDE1c3r: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	tVFoDXVRYxhX: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	tYKZjCHLsaUr: 'dot-notation into array-of-subdocuments not implemented — see docs/todo.md',
	tmvPBYA9eSEz: 'dot-notation through an array of non-document scalars not implemented — see docs/todo.md',
	uY2fLtrMOKuA: 'dot-notation through an array of non-document scalars not implemented — see docs/todo.md',
	n1CqM5LBKHMe: 'dot-notation through an empty array not implemented — see docs/todo.md',
};

for (const op of runnable.values()) {
	// todo, not skip: the body still runs, so a fixed knownIssue shows up as
	// a (still green) surprise pass instead of staying silently disabled.
	test(`${op.operators.join(', ')} :: ${op.catalog} :: ${op.id} :: ${JSON.stringify(op.query)}`, { todo: knownIssues[op.id] }, () => {
		const expectsError = op.expected.error !== undefined;
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
				const expected = op.expected.documents ?? [];
				const extra = matched.filter((id) => !expected.includes(id));
				const missing = expected.filter((id) => !matched.includes(id));

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
