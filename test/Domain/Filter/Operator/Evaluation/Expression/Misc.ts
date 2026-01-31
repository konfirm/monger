import type { TestRecord } from '../Expression';
import * as test from 'tape';
import * as Misc from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Misc';
import { resolve } from './Helper';

export const data: Array<TestRecord> = [
	{
		operator: '$getField',
		query: 'foo.bar.baz',
		tests: [
			{ output: null, foo: { bar: { baz: 1 } } },
			{ output: null, 'foo.bar': { baz: 1 } },
			{ output: 1, 'foo.bar.baz': 1 },
		],
	},
	{
		operator: '$getField',
		query: { field: 'foo.bar.baz', input: '$$CURRENT' },
		tests: [
			{ output: null, foo: { bar: { baz: 2 } } },
			{ output: null, 'foo.bar': { baz: 2 } },
			{ output: 2, 'foo.bar.baz': 2 },
		],
	},
	{
		operator: '$getField',
		query: { field: 'foo.bar.baz', input: { foo: { bar: { baz: 3 } } } },
		tests: [
			{ output: null },
			{ output: null, 'foo.bar.baz': 100 },
		],
	},
	{
		operator: '$getField',
		query: { field: 'foo.bar.baz', input: { 'foo.bar.baz': 4 } },
		tests: [
			{ output: 4 },
			{ output: 4, 'foo.bar.baz': 100 },
		],
	},
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<keyof typeof Misc>;


operators.forEach((op) => {
	test(`Domain/Filter/Operator/Evaluation/Expression/Misc - ${op}`, (t) => {
		t.equal(typeof Misc[op], 'function', `${op} is an exported function`);

		data.filter(({ operator }) => operator === op).forEach(({ query, tests }: any) => {
			const compiled = Misc[op](query, resolve);

			tests.forEach(({ output, error, ...input }: any) => {
				if (error) {
					t.throws(() => compiled(input), error, `{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} throws ${error}`);
				}
				else {
					t.deepEqual(compiled(input), output, `{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} equals ${JSON.stringify(output)}`);
				}
			});
		});

		t.end();
	});
});

test('Domain/Filter/Operator/Evaluation/Expression/Misc - $rand', (t) => {
	const seen: Array<number> = [];
	const compiled = Misc.$rand({});

	for (let i = 0; i < 1000; ++i) {
		const rand = compiled({});

		seen.push(rand);
	}

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Expression/Misc - $sampleRate', (t) => {
	const tolerance = 0.05; // we allow for 5% more or less items

	[0.1, 0.2, 0.25, 0.33, 0.4, 0.5, 0.75, 1].forEach((rate) => {
		for (let length = 100; length < 1e6; length *= 10) {
			const compiled = Misc.$sampleRate(rate);
			const samples = Array.from({ length }, () => ({}));
			const precise = Math.round(length * rate);
			const result = samples.filter(compiled);

			if (rate < 1) {
				const min = Math.floor(length * (rate - tolerance));
				const max = Math.ceil(length * (rate + tolerance));

				t.true(
					result.length >= min && result.length <= max,
					`$sampleRate ${rate} on ${length} is ~${precise}, ${result.length} should be between ${min} and ${max}`
				);
			}
			else {
				t.true(
					result.length === length,
					`$sampleRate ${rate} on ${length} should be exactly ${length}`
				);
			}
		}
	});

	t.end();
});


