import * as test from 'tape';
import type { JSONSchema } from '../../../source/Domain/Evaluation/Schema';
import * as Schema from '../../../source/Domain/Evaluation/Schema';

test('Domain/Evaluation/Schema - exports', (t) => {
	const expected = ['schema'];
	const actual = Object.keys(Schema);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Schema[<keyof typeof Schema>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/bsonType', (t) => {
	const { schema } = Schema;
	const typed: Array<{ type: string, value: any }> = [
		{ type: 'double', value: 1.2 },
		{ type: 'string', value: 'true' },
		{ type: 'object', value: { one: 1 } },
		{ type: 'array', value: [1, 2] },
		{ type: 'undefined', value: undefined },
		{ type: 'bool', value: false },
		{ type: 'date', value: new Date() },
		{ type: 'null', value: null },
		{ type: 'regex', value: /^$/ },
		{ type: 'javascript', value: () => { } },
		{ type: 'javascript', value: function () { } },
		{ type: 'symbol', value: Symbol('one') },
		{ type: 'int', value: 1 },
		{ type: 'long', value: BigInt(12345678900987654321) },
	];
	const keys = typed.map(({ type }) => type).filter((v, i, a) => a.indexOf(v) === i);

	typed.forEach(({ type, value }) => {
		const none = keys.filter((v) => v !== type);
		const exact = schema({ bsonType: type });
		const except = schema({ bsonType: none });
		const display = typeof value === 'symbol'
			? 'Symbol'
			: typeof value === 'bigint'
				? 'BigInt'
				: JSON.stringify(value)

		t.true(exact(value), `bsonType ${type} matches ${display}`);
		t.false(except(value), `bsonType ${none} does not ${display}`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/enum', (t) => {
	const { schema } = Schema;
	const values = ['foo', 'bar', 'baz'];
	const evaluate = schema({ enum: values });
	const display = JSON.stringify(values);

	t.true(evaluate('foo'), `enum ${display} matches "foo"`);
	t.true(evaluate('bar'), `enum ${display} matches "bar"`);
	t.true(evaluate('baz'), `enum ${display} matches "baz"`);
	t.false(evaluate('qux'), `enum ${display} matches "qux"`);

	t.end();
});

test('Domain/Evaluation/Schema - schema/type', (t) => {
	const { schema } = Schema;
	const typed: Array<{ type: string, value: any }> = [
		{ type: 'string', value: 'true' },
		{ type: 'object', value: { one: 1 } },
		{ type: 'array', value: [1, 2] },
		{ type: 'boolean', value: false },
		{ type: 'null', value: null },
		{ type: 'number', value: 1.23 },
	];
	const keys = typed.map(({ type }) => type).filter((v, i, a) => a.indexOf(v) === i);

	typed.forEach(({ type, value }) => {
		const none = keys.filter((v) => v !== type);
		const exact = schema({ type: type as JSONSchema['type'] });
		const except = schema({ type: none as JSONSchema['type'] });
		const display = typeof value === 'symbol'
			? 'Symbol'
			: typeof value === 'bigint'
				? 'BigInt'
				: JSON.stringify(value)

		t.true(exact(value), `type ${type} matches ${display}`);
		t.false(except(value), `type ${none} does not ${display}`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/allOf', (t) => {
	const { schema } = Schema;
	const values = [
		{ enum: ['foo', 'bar', 'baz'], },
		{ type: ['string', 'number'] },
	];
	const allOf = schema({ allOf: values as JSONSchema['allOf'] });

	t.true(allOf('foo'), '"foo" matches allOf');
	t.true(allOf('bar'), '"bar" matches allOf');
	t.true(allOf('baz'), '"baz" matches allOf');
	t.false(allOf('qux'), '"qux" does not match allOf');
	t.false(allOf(42), '42 does not match allOf');
	t.false(allOf(true), 'true does not match allOf');

	t.end();
});

test('Domain/Evaluation/Schema - schema/anyOf', (t) => {
	const { schema } = Schema;
	const values = [
		{ enum: ['foo', 'bar', 'baz'], },
		{ type: ['string', 'number'] },
	];
	const anyOf = schema({ anyOf: values as JSONSchema['anyOf'] });

	t.true(anyOf('foo'), '"foo" matches anyOf');
	t.true(anyOf('bar'), '"bar" matches anyOf');
	t.true(anyOf('baz'), '"baz" matches anyOf');
	t.true(anyOf('qux'), '"qux" matches anyOf');
	t.true(anyOf(42), '42 matches anyOf');
	t.false(anyOf(true), 'true does not match anyOf');

	t.end();
});

test('Domain/Evaluation/Schema - schema/oneOf', (t) => {
	const { schema } = Schema;
	const values = [
		{ enum: ['foo', 'bar', 'baz'], },
		{ type: ['string', 'number'] },
	];
	const oneOf = schema({ oneOf: values as JSONSchema['oneOf'] });

	t.false(oneOf('foo'), '"foo" does not match oneOf');
	t.false(oneOf('bar'), '"bar" does not match oneOf');
	t.false(oneOf('baz'), '"baz" does not match oneOf');
	t.true(oneOf('qux'), '"qux" matches oneOf');
	t.true(oneOf(42), '42 matches oneOf');
	t.false(oneOf(true), 'true does not match oneOf');

	t.end();
});

test('Domain/Evaluation/Schema - schema/not', (t) => {
	const { schema } = Schema;
	const values = { type: ['string', 'number'] };
	const not = schema({ not: values as JSONSchema['not'] });

	t.true(not(true), 'true matches not { type: ["string", "number" ] }');
	t.false(not(42), '42 does not match { type: ["string", "number" ] }');
	t.false(not('hello'), '"hello" does not match { type: ["string", "number" ] }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/multipleOf', (t) => {
	const { schema } = Schema;
	const value = 4;
	const multipleOf = schema({ multipleOf: value as JSONSchema['multipleOf'] });

	t.true(multipleOf(0), '0 matches { multipleOf: 4 }');
	t.false(multipleOf(2), '2 does not match { multipleOf: 4 }');
	t.true(multipleOf(4), '4 matches { multipleOf: 4 }');
	t.true(multipleOf(8), '8 matches { multipleOf: 4 }');
	t.true(multipleOf(308), '308 matches { multipleOf: 4 }');
	t.false(multipleOf(42), '42 does not match { multipleOf: 4 }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/maximum', (t) => {
	const { schema } = Schema;
	const value = 4;
	const maximum = schema({ maximum: value as JSONSchema['maximum'] });

	t.true(maximum(0), '0 matches { maximum: 4 }');
	t.true(maximum(2), '2 matches { maximum: 4 }');
	t.true(maximum(4), '4 matches { maximum: 4 }');
	t.false(maximum(8), '8 does not match { maximum: 4 }');
	t.false(maximum(308), '308 does not match { maximum: 4 }');
	t.false(maximum(42), '42 does not match { maximum: 4 }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/exclusiveMaximum', (t) => {
	const { schema } = Schema;
	const value = 4;
	const exclusiveMaximum = schema({ exclusiveMaximum: value as JSONSchema['exclusiveMaximum'] });

	t.true(exclusiveMaximum(0), '0 matches { exclusiveMaximum: 4 }');
	t.true(exclusiveMaximum(2), '2 matches { exclusiveMaximum: 4 }');
	t.false(exclusiveMaximum(4), '4 does not match { exclusiveMaximum: 4 }');
	t.false(exclusiveMaximum(8), '8 does not match { exclusiveMaximum: 4 }');
	t.false(exclusiveMaximum(308), '308 does not match { exclusiveMaximum: 4 }');
	t.false(exclusiveMaximum(42), '42 does not match { exclusiveMaximum: 4 }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/minimum', (t) => {
	const { schema } = Schema;
	const value = 4;
	const minimum = schema({ minimum: value as JSONSchema['minimum'] });

	t.false(minimum(0), '0 does not match { minimum: 4 }');
	t.false(minimum(2), '2 does not match { minimum: 4 }');
	t.true(minimum(4), '4 matches { minimum: 4 }');
	t.true(minimum(8), '8 matches { minimum: 4 }');
	t.true(minimum(308), '308 matches { minimum: 4 }');
	t.true(minimum(42), '42 matches { minimum: 4 }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/exclusiveMinimum', (t) => {
	const { schema } = Schema;
	const value = 4;
	const exclusiveMinimum = schema({ exclusiveMinimum: value as JSONSchema['exclusiveMinimum'] });

	t.false(exclusiveMinimum(0), '0 does not match { exclusiveMinimum: 4 }');
	t.false(exclusiveMinimum(2), '2 does not match { exclusiveMinimum: 4 }');
	t.false(exclusiveMinimum(4), '4 does not match { exclusiveMinimum: 4 }');
	t.true(exclusiveMinimum(8), '8 matches { exclusiveMinimum: 4 }');
	t.true(exclusiveMinimum(308), '308 matches { exclusiveMinimum: 4 }');
	t.true(exclusiveMinimum(42), '42 matches { exclusiveMinimum: 4 }');

	t.end();
});
