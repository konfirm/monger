import * as test from 'tape';
import { filter } from '../../source/main';

test('Samples/Dotted - it supports dot notation', (t) => {
	const target = { foo: { bar: { baz: { qux: 1 } } } };

	[
		{ foo: { bar: { baz: { qux: { $eq: 1 } } } } },
		{ foo: { bar: { 'baz.qux': { $eq: 1 } } } },
		{ foo: { 'bar.baz.qux': { $eq: 1 } } },
		{ 'foo.bar': { baz: { qux: { $eq: 1 } } } },
		{ 'foo.bar': { 'baz.qux': { $eq: 1 } } },
		{ 'foo.bar.baz': { qux: { $eq: 1 } } },
		{ 'foo.bar.baz.qux': { $eq: 1 } },
	].forEach((query) => {
		const equal = filter(query);

		t.true(equal(target), `${JSON.stringify(query)} matches ${JSON.stringify(target)}`);
	});

	t.end();
});
