import * as test from 'tape';
import * as main from '../source/main';

test('main - exports', (t) => {
	const functions: Array<keyof typeof main> = ['compile'];
	const objects: Array<keyof typeof main> = ['Operator', 'Compiler'];
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

test('main - Operator', (t) => {
	const { Operator } = main;

	// console.log(Operator);

	t.end();
});

test('main - Compiler', (t) => {
	const { Compiler } = main;

	// console.log(Compiler);

	t.end();
});

test('main - compile', (t) => {
	const { compile } = main;
	const query = compile({
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
