import * as test from 'tape';
import each from 'template-literal-each';
import * as Field from '../../../../source/Domain/Update/Operator/Field';

test('Domain/Update/Operator/Field - exports', (t) => {
	const expected = ['$currentDate', '$inc', '$min', '$max', '$mul', '$rename', '$set', '$setOnInsert', '$unset'];
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

test('Domain/Update/Operator/Field - $max', (t) => {
	const { $max } = Field;
	const query = {
		'one': 1,
		'nested.two': 2,
		'nested.nested.three': 3
	};
	const target = {} as any;
	const update = $max(query);

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

	t.equal(lower.one, 0, 'one is 0');
	t.equal(lower.nested.two, 1, 'nested.two is 1');
	t.equal(lower.nested.nested.three, 2, 'nested.nested.three is 2');

	const higher = update({
		one: 10,
		nested: {
			two: 10,
			nested: { three: 10 },
		},
	}) as any;

	t.equal(higher.one, 1, 'one is 1');
	t.equal(higher.nested.two, 2, 'nested.two is 2');
	t.equal(higher.nested.nested.three, 3, 'nested.nested.three is 3');

	t.end();
});

test('Domain/Update/Operator/Field - $mul', (t) => {
	const { $mul } = Field;
	const query = {
		'one': 1,
		'nested.two': 2,
		'nested.nested.three': 3
	};
	const target = {} as any;
	const update = $mul(query);

	update(target);

	t.equal(target.one, 0, 'one created 0');
	t.equal(target.nested.two, 0, 'nested.two created 0');
	t.equal(target.nested.nested.three, 0, 'nested.nested.three created 0');

	const lower = update({
		one: 10,
		nested: {
			two: 20,
			nested: { three: 30 },
		},
	}) as any;

	t.equal(lower.one, 10, 'one is 10');
	t.equal(lower.nested.two, 40, 'nested.two is 40');
	t.equal(lower.nested.nested.three, 90, 'nested.nested.three is 90');

	t.end();
});

test('Domain/Update/Operator/Field - $rename', (t) => {
	const { $rename } = Field;
	const target = { foo: { bar: 'A foo walks into a bar' } };

	t.equal(JSON.stringify(target), '{"foo":{"bar":"A foo walks into a bar"}}', 'matches initial value');

	each`
		name           | rename              | error
		---------------|---------------------|-------
		foo.bar        | other               |
		other          | other.nested        | The source and target field for $rename must not be on the same path: other: "other.nested"
		other          | some.different.path |
		some.different | some                | The source and target field for $rename must not be on the same path: some.different: "some"
		some.different | created             |
	`((record) => {
		const { name, rename, error } = record as { [key: string]: string };
		const update = $rename({ [name]: rename });

		if (error) {
			const match = new RegExp(error.replace(/\$/g, '\\$'));
			t.throws(() => update(target), match, `The source and target field for $rename must not be on the same path: ${name}: "${rename}"`);
		}
		else {
			update(target);
		}
	});

	t.equal(JSON.stringify(target), '{"foo":{},"some":{},"created":{"path":"A foo walks into a bar"}}', 'matches targetted value');

	t.end();
});

test('Domain/Update/Operator/Field - $set', (t) => {
	const { $set } = Field;
	const query = {
		'foo': 'written',
		'bar.baz.qux': false,
		'array.1': 2,
		'nested.array.0.inside': 'zero'
	};
	const target = {};
	const update = $set(query);

	t.false('foo' in target, 'target.foo does not exist');
	t.false('bar' in target, 'target.bar does not exist');
	t.false('array' in target, 'target.array does not exist');
	t.false('nested' in target, 'target.nested does not exist');

	update(target);

	t.equal((target as any).foo, 'written', 'target.foo exists');
	t.equal((target as any).bar.baz.qux, false, 'target.bar.baz.qux exists');
	t.true(Array.isArray((target as any).array), 'target.array is an array');
	t.equal((target as any).array[1], 2, 'target.array.1 has value 2');
	t.true(Array.isArray((target as any).nested.array), 'target.nested.array is an array');
	t.equal((target as any).nested.array[0].inside, 'zero', 'target.nested.array.0.inside exists');

	t.end();
});

test('Domain/Update/Operator/Field - $setOnInsert is not implemented', (t) => {
	const { $setOnInsert } = Field;
	const setOnInsert = $setOnInsert(undefined);

	t.throws(
		() => {
			setOnInsert({} as Parameters<typeof setOnInsert>[0]);
		},
		/\$setOnInsert not implemented/,
		'$setOnInsert is not implemented'
	);

	t.end();
});

test('Domain/Update/Operator/Field - $unset', (t) => {
	const { $unset } = Field;
	const query = {
		'nop': '',
		'foo': '',
		'bar.baz.qux': '',
		'array.1': '',
		'nested.array.0.inside': ''
	};
	const target = {
		foo: 'remove before flight',
		bar: {
			baz: {
				qux: 'remove before flight',
			},
		},
		array: [1, 2, 3],
		nested: {
			array: [
				{ inside: 'zero' },
				{ inside: 'one' },
			],
		}
	};
	const update = $unset(query);

	t.false('nop' in target, 'target.nop does not exist');
	t.equal(target.foo, 'remove before flight', 'target.foo exists');
	t.equal(target.bar.baz.qux, 'remove before flight', 'target.bar.baz.qux exists');
	t.equal(target.array[1], 2, 'target.array.1 has value 2');
	t.equal(target.nested.array[0].inside, 'zero', 'target.nested.array.0.inside exists');

	update(target);

	t.false('nop' in target, 'target.nop does not exist');
	t.false('foo' in target, 'target.foo no longer exists');
	t.false('qux' in target.bar.baz, 'target.bar.baz.qux no longer exists');
	t.equal(target.array[1], null, 'target.array.1 is set to null');
	t.false('inside' in target.nested.array[0], 'target.nested.array.0.inside no longer exists');

	t.end();
});
