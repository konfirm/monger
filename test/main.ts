import * as test from 'tape';
import * as main from '../source/main';
import { preserve, json, jsonify } from './Utility';

test('main - exports', (t) => {
	const functions: Array<keyof typeof main> = ['filter', 'update'];
	const objects: Array<keyof typeof main> = ['Filter', 'Update'];
	const expected = functions.concat(objects);
	const actual = Object.keys(main);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);

	functions.forEach((key) => {
		t.equal(typeof main[key], 'function', `contains function ${key}`);
	});

	objects.forEach((key) => {
		t.equal(typeof main[key], 'object', `contains object ${key}`);
	});

	t.end();
});

test('main - Filter', (t) => {
	const { Filter } = main;
	const functions: Array<keyof typeof Filter> = ['Compiler', 'filter'];
	const objects: Array<keyof typeof Filter> = ['Operator'];
	const expected = functions.concat(objects);
	const actual = Object.keys(Filter);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);

	functions.forEach((key) => {
		t.equal(typeof Filter[key], 'function', `contains function ${key}`);
	});

	objects.forEach((key) => {
		t.equal(typeof Filter[key], 'object', `contains object ${key}`);
	});

	t.end();
});

test('main - filter', (t) => {
	const { filter } = main;
	const query = filter({
		name: { $eq: 'Sample' },
		$and: [
			{
				$or: [
					{ counter: { $in: [1] } },
					{ counter: { $gt: 2 } },
				]
			}
		],
	});

	t.false(query({}), 'does not match empty object');
	t.false(query({ name: 'Sample' }), 'does not match object with only name');
	t.false(query({ counter: 1 }), 'does not match object with only counter');
	t.true(query({ name: 'Sample', counter: 1 }), 'matches object with name "Sample" and counter: 1');
	t.false(query({ name: 'Sample', counter: 2 }), 'does not match object with name "Sample" and counter: 2');
	t.true(query({ name: 'Sample', counter: 3 }), 'matches object with name "Sample" and counter: 3');
	t.true(query({ name: 'Sample', counter: 4 }), 'matches object with name "Sample" and counter: 4');
	t.false(query({ name: 'Test', counter: 4 }), 'does not match object with name "Test" and counter: 4');
	t.false(query({ name: 'Test', counter: 3 }), 'does not match object with name "Test" and counter: 3');
	t.false(query({ name: 'Test', counter: 2 }), 'does not match object with name "Test" and counter: 2');
	t.false(query({ name: 'Test', counter: 1 }), 'does not match object with name "Test" and counter: 1');

	t.end();
});

test('main - Update', (t) => {
	const { Update } = main;
	const functions: Array<keyof typeof Update> = ['Compiler', 'update'];
	const objects: Array<keyof typeof Update> = ['Operator'];
	const expected = functions.concat(objects);
	const actual = Object.keys(Update);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);

	functions.forEach((key) => {
		t.equal(typeof Update[key], 'function', `contains function ${key}`);
	});

	objects.forEach((key) => {
		t.equal(typeof Update[key], 'object', `contains object ${key}`);
	});

	t.end();
});

test('main - update', (t) => {
	const { update } = main;
	const query = {
		$set: { foo: 'bar', 'bar.baz': 'qux' },
	};

	[
		[{}, { foo: 'bar', bar: { baz: 'qux' } }],
		[{ foo: 'xyzzy' }, { foo: 'bar', bar: { baz: 'qux' } }],
		[{ foo: 1 }, { foo: 'bar', bar: { baz: 'qux' } }],
		[{ foo: 1, baz: 3 }, { foo: 'bar', baz: 3, bar: { baz: 'qux' } }],
	].forEach(([input, output]) => {
		const updater = update(query);
		const result = updater(preserve(input) as Parameters<typeof updater>[0]);

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${output}`
		);
	});

	t.end();
});
