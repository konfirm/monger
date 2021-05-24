import * as test from 'tape';
import * as Field from '../../../../source/Domain/Update/Operator/Field';

test('Domain/Update/Operator/Field - exports', (t) => {
	const expected = ['$currentDate'];
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
