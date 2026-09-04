import { readFile } from "node:fs/promises";
import { resolve, relative } from "node:path/posix";
import { run } from "node:test";

// @types/node here is pinned to 18.11.19, which predates node:test/reporters
// and run()'s execArgv option — both exist at runtime (Node 22), just not
// in these type defs yet.
type TestEvent = { type: string; data: any };

const root = resolve(__dirname, '..');
const statusPath = resolve(root, 'docs', 'status', 'operators.json');
// Catalog.spec.ts is the generic ground-truth runner: it self-filters by
// reading operators.json at test time, so (unlike the hand-written unit
// test files) it's never declared under any single operator's `files`.
const catalogRunner = 'source/Test/Catalog.spec.ts';

type OperatorStatus = {
	working: 'done' | 'in-progress' | 'not-started';
	files: Array<string>;
	verified: number;
};
type Operators = Record<string, OperatorStatus>;
type Oper = {
	operator: string;
	priority: number;
} & OperatorStatus;
const priorities: Array<OperatorStatus['working']> = process.argv.length > 2
	? process.argv.slice(2).filter((value) => /^(?:done|in-progress|not-started)$/.test(value)) as Array<OperatorStatus['working']>
	: ['done', 'in-progress'];

// Catalog.spec.ts test names: "$op[, $op] :: catalogFile :: id :: query"
// Unit-spec test names: "Domain/Filter/Operator/Comparison - $op"
// Both put the operator(s) last; pull the trailing "$word[, $word]" group.
function group(name: string, file: string): string {
	const match = name.match(/(\$\w+(?:,\s*\$\w+)*)\s*(?:::.*)?$/);

	return match ? match[1] : file;
}

async function main() {
	const buffer = await readFile(statusPath);
	const status = JSON.parse(buffer.toString()) as Operators;

	const active = Object.entries(status)
		.map(([operator, rest]) => ({ operator, priority: priorities.indexOf(rest.working), ...rest } as Oper))
		.filter(({ priority }) => priority >= 0)
		.sort(({ priority: a }, { priority: b }) => a - b);

	if (!active.length) {
		console.log(`No operators match: ${priorities.join(', ')}`);
		return;
	}

	const files = new Set<string>([catalogRunner]);
	active.forEach(({ files: opFiles }) => opFiles.forEach((f) => files.add(f)));

	// A "done" operator no longer needs its own line — fold it into its
	// file's rollup instead. Still-in-progress operators keep their own
	// line, since that's the one actually being steered by right now.
	const isDone = (key: string): boolean =>
		key.startsWith('$') && key.split(/,\s*/).every((op) => status[op]?.working === 'done');

	const tally = new Map<string, { pass: number; fail: number; skip: number; todo: number }>();
	let failing = 0;
	let skipped = 0;
	let todoCount = 0;

	const stream = run({
		files: [...files].map((f) => resolve(root, f)),
		execArgv: ['--require', 'ts-node/register'],
	} as Parameters<typeof run>[0]);

	for await (const event of stream as AsyncIterable<TestEvent>) {
		if (event.type !== 'test:pass' && event.type !== 'test:fail') {
			continue;
		}

		const file = event.data.file ? relative(root, event.data.file) : '(unknown)';
		const rawKey = group(event.data.name, file);
		const key = isDone(rawKey) ? file : rawKey;
		const entry = tally.get(key) ?? { pass: 0, fail: 0, skip: 0, todo: 0 };

		// A skipped test still reports as test:pass, just with `skip` set —
		// it must not silently count as a real pass, or the distribution
		// below would claim more confidence than the run actually earned.
		if (event.data.skip) {
			entry.skip++;
			skipped++;
		} else if (event.data.todo) {
			// todo still runs (unlike skip), so it can genuinely fail
			// (test:fail) or, worth flagging loudly, have quietly started
			// passing again — either way it's tracked, not a real failure.
			entry.todo++;
			todoCount++;

			if (event.type === 'test:pass') {
				console.log(`↑ [${rawKey}] ${file} :: ${event.data.name} (todo, but currently passing — worth revisiting)`);
			}
		} else if (event.type === 'test:pass') {
			entry.pass++;
		} else {
			entry.fail++;
			failing++;

			const error = (event.data as any).details?.error ?? event.data;
			console.log(`✗ [${rawKey}] ${file} :: ${event.data.name}`);
			console.log(String((error as any)?.message ?? error).split('\n').map((line) => `    ${line}`).join('\n'));
			console.log('');
		}
		tally.set(key, entry);
	}

	if (failing) {
		console.log(`${failing} failing\n`);
	}
	if (skipped) {
		console.log(`${skipped} skipped\n`);
	}
	if (todoCount) {
		console.log(`${todoCount} todo\n`);
	}

	const distribution = [...tally.entries()]
		.map(([key, { pass, fail, skip, todo }]) => ({ key, pass, fail, skip, todo, total: pass + fail, pct: Math.round((pass / (pass + fail)) * 100) }))
		.sort((a, b) => a.key < b.key ? -1 : Number(a.key > b.key));
	// A group can be 100% of its *graded* tests while still hiding a skip
	// or todo — keep those out of the collapsed "100% ok" line so they stay
	// visible instead of blending into a claim of full confidence.
	const perfect = distribution.filter(({ fail, skip, todo }) => fail === 0 && skip === 0 && todo === 0);
	const setAside = distribution.filter(({ fail, skip, todo }) => fail === 0 && (skip > 0 || todo > 0));
	const imperfect = distribution.filter(({ fail }) => fail > 0).sort((a, b) => b.pct - a.pct);

	console.log('Summary:');
	if (perfect.length) {
		console.log(`  100% ok  ${perfect.map(({ key }) => key).join(', ')}`);
	}
	setAside.forEach(({ key, pass, skip, todo }) => {
		const notes = [skip && `${skip} skipped`, todo && `${todo} todo`].filter(Boolean).join(', ');
		console.log(`  100% ok  ${key} (${pass} ok, ${notes})`);
	});
	imperfect.forEach(({ key, pct, pass, fail, total, skip, todo }) => {
		const notes = [skip && `${skip} skipped`, todo && `${todo} todo`].filter(Boolean).map((n) => `, ${n}`).join('');
		console.log(`  ${String(pct).padStart(3)}% ok  ${key} (${pass}/${total} ok, ${fail} nok${notes})`);
	});

	process.exitCode = failing ? 1 : 0;
}

main();
