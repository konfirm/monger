import * as test from 'tape';
import * as Bitwise from '../../../../source/Domain/Update/Operator/Bitwise';

test('Domain/Update/Operator/Bitwise - exports', (t) => {
	const expected = ['$bit'];
	const actual = Object.keys(Bitwise);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Bitwise[<keyof typeof Bitwise>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Update/Operator/Bitwise - $bit', (t) => {
	const { $bit } = Bitwise;
	const query = {
		foo: { and: 2 },
		bar: { or: 4 },
		baz: { xor: 8 },
	};
	const target = { foo: 1, bar: 1, baz: 1 } as any;
	const bit = $bit(query as Parameters<typeof $bit>[0]);

	t.equal(target.foo, 1, 'foo is 1');
	t.equal(target.bar, 1, 'bar is 1');
	t.equal(target.baz, 1, 'baz is 1');

	bit(target);

	t.equal(target.foo, 0, 'foo is 0');
	t.equal(target.bar, 5, 'bar is 5');
	t.equal(target.baz, 9, 'baz is 9');

	bit(target);

	t.equal(target.foo, 0, 'foo is 0');
	t.equal(target.bar, 5, 'bar is 5');
	t.equal(target.baz, 1, 'baz is 1');

	bit(target);

	t.equal(target.foo, 0, 'foo is 0');
	t.equal(target.bar, 5, 'bar is 5');
	t.equal(target.baz, 9, 'baz is 9');

	t.end();
});
