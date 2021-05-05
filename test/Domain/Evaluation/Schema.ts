import * as test from 'tape';
import each from 'template-literal-each';
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
