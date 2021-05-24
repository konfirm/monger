import * as test from 'tape';
import * as Field from '../../../../source/Domain/Update/Operator/Field';

test('Domain/Update/Operator/Field - exports', (t) => {
	const expected = ['$currentDate', '$inc', '$min'];
	const actual = Object.keys(Field);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Field[<keyof typeof Field>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Update/Operator/Field - $currentDate', (t) => {
	const { $currentDate } = Field;
	const query = {
		lastModified: true,
		'cancellation.date': { $type: 'date' },
		'cancellation.time': { $type: 'timestamp' }
	};
	const target = { name: 'Foo' } as any;
	const update = $currentDate(query as Parameters<typeof $currentDate>[0]);
	const now = Date.now();

	update(target);

	const { lastModified } = target;
	t.true(lastModified instanceof Date, 'lastModified is set to a Date');

	// we know the date is create once and reused within $currentDate
	// this means the tests can actually test for the exact date/time values
	// without suffering from slight deviations as the clock continues to tick
	// while running the tests

	t.true(target.cancellation.date instanceof Date, 'cancellation.date is set to a Date');
	t.false(target.cancellation.date === lastModified, 'it is not the same Date instance');
	t.equal(String(target.cancellation.date), String(lastModified), 'it represents the correct date');

	t.true(typeof target.cancellation.time === 'number', 'cancellation.time is set to a number');
	t.equal(target.cancellation.time, lastModified.getTime(), 'it represents the correct time');

	t.end();
});

test('Domain/Update/Operator/Field - $inc', (t) => {
	const { $inc } = Field;
	const query = {
		'one': 1,
		'nested.two': 2,
		'nested.nested.three': 3
	};
	const target = {} as any;
	const update = $inc(query);

	update(target);

	t.equal(target.one, 1, 'one is 1');
	t.equal(target.nested.two, 2, 'nested.two is 2');
	t.equal(target.nested.nested.three, 3, 'nested.nested.three is 3');

	update(target);

	t.equal(target.one, 2, 'one is 2');
	t.equal(target.nested.two, 4, 'nested.two is 4');
	t.equal(target.nested.nested.three, 6, 'nested.nested.three is 6');

	t.end();
});

test('Domain/Update/Operator/Field - $min', (t) => {
	const { $min } = Field;
	const query = {
		'one': 1,
		'nested.two': 2,
		'nested.nested.three': 3
	};
	const target = {} as any;
	const update = $min(query);

	update(target);

	t.equal(target.one, 1, 'one is 1');
	t.equal(target.nested.two, 2, 'nested.two is 2');
	t.equal(target.nested.nested.three, 3, 'nested.nested.three is 3');

	const lower = update({
		one: 0,
		nested: {
			two: 1,
			nested: { three: 2 },
		},
	}) as any;

	t.equal(lower.one, 1, 'one is 1');
	t.equal(lower.nested.two, 2, 'nested.two is 2');
	t.equal(lower.nested.nested.three, 3, 'nested.nested.three is 3');

	const higher = update({
		one: 10,
		nested: {
			two: 10,
			nested: { three: 10 },
		},
	}) as any;

	t.equal(higher.one, 10, 'one is 10');
	t.equal(higher.nested.two, 10, 'nested.two is 10');
	t.equal(higher.nested.nested.three, 10, 'nested.nested.three is 10');

	t.end();
});

