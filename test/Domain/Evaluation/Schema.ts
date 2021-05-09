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

	each`
		maximum      | exclusive | input        | matches
		-------------|-----------|--------------|---------
		${4}         |           | ${2}         | yes
		${4}         |           | ${4}         | yes
		${4}         |           | ${8}         | no
		${4}         | ${false}  | ${2}         | yes
		${4}         | ${false}  | ${4}         | yes
		${4}         | ${false}  | ${8}         | no
		${4}         | ${true}   | ${2}         | yes
		${4}         | ${true}   | ${4}         | no
		${4}         | ${true}   | ${8}         | no
		${4}         | ${5}      | ${2}         | yes
		${4}         | ${5}      | ${4}         | yes
		${4}         | ${5}      | ${8}         | no
		${4}         | ${4}      | ${2}         | yes
		${4}         | ${4}      | ${4}         | no
		${4}         | ${4}      | ${8}         | no
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { maximum, exclusive, input, matches } = record as { maximum: JSONSchema['maximum'], exclusive: JSONSchema['exclusiveMaximum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ maximum: maximum as JSONSchema['maximum'], exclusiveMaximum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { maximum: ${maximum}, exclusiveMaximum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/exclusiveMaximum', (t) => {
	const { schema } = Schema;

	each`
		exclusive    | maximum |input         | matches
		-------------|---------|--------------|---------
		${5}         |         | ${2}         | yes
		${5}         |         | ${4}         | yes
		${5}         |         | ${8}         | no
		${4}         |         | ${2}         | yes
		${4}         |         | ${4}         | no
		${4}         |         | ${8}         | no
		${5}         | ${4}    | ${2}         | yes
		${5}         | ${4}    | ${4}         | yes
		${5}         | ${4}    | ${8}         | no
		${4}         | ${4}    | ${2}         | yes
		${4}         | ${4}    | ${4}         | no
		${4}         | ${4}    | ${8}         | no
		${false}     | ${4}    | ${2}         | yes
		${false}     | ${4}    | ${4}         | yes
		${false}     | ${4}    | ${8}         | no
		${true}      | ${4}    | ${2}         | yes
		${true}      | ${4}    | ${4}         | no
		${true}      | ${4}    | ${8}         | no
		${undefined} |         | ${0}         | yes
		${undefined} |         | ${Infinity}  | yes
		${undefined} |         | ${-Infinity} | yes
	`((record) => {
		const { exclusive, maximum, input, matches } = record as { maximum: JSONSchema['maximum'], exclusive: JSONSchema['exclusiveMaximum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ maximum: maximum as JSONSchema['maximum'], exclusiveMaximum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { maximum: ${maximum}, exclusiveMaximum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/minimum', (t) => {
	const { schema } = Schema;

	each`
		minimum      | exclusive | input        | matches
		-------------|-----------|--------------|---------
		${4}         |           | ${2}         | no
		${4}         |           | ${4}         | yes
		${4}         |           | ${8}         | yes
		${4}         | ${false}  | ${2}         | no
		${4}         | ${false}  | ${4}         | yes
		${4}         | ${false}  | ${8}         | yes
		${4}         | ${true}   | ${2}         | no
		${4}         | ${true}   | ${4}         | no
		${4}         | ${true}   | ${8}         | yes
		${4}         | ${5}      | ${2}         | no
		${4}         | ${5}      | ${4}         | no
		${4}         | ${5}      | ${8}         | yes
		${4}         | ${4}      | ${2}         | no
		${4}         | ${4}      | ${4}         | no
		${4}         | ${4}      | ${8}         | yes
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { minimum, exclusive, input, matches } = record as { minimum: JSONSchema['minimum'], exclusive: JSONSchema['exclusiveMinimum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ minimum: minimum as JSONSchema['minimum'], exclusiveMinimum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { minimum: ${minimum}, exclusiveMinimum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/exclusiveMinimum', (t) => {
	const { schema } = Schema;

	each`
		exclusive    | minimum   |input | matches
		-------------|-----------|------|---------
		${5}         |           |${2}  | no
		${5}         |           |${4}  | no
		${5}         |           |${8}  | yes
		${4}         |           |${2}  | no
		${4}         |           |${4}  | no
		${4}         |           |${8}  | yes
		${5}         | ${4}      |${2}  | no
		${5}         | ${4}      |${4}  | no
		${5}         | ${4}      |${8}  | yes
		${4}         | ${4}      |${2}  | no
		${4}         | ${4}      |${4}  | no
		${4}         | ${4}      |${8}  | yes
		${false}     | ${4}      |${2}  | no
		${false}     | ${4}      |${4}  | yes
		${false}     | ${4}      |${8}  | yes
		${true}      | ${4}      |${2}  | no
		${true}      | ${4}      |${4}  | no
		${true}      | ${4}      |${8}  | yes
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { exclusive, minimum, input, matches } = record as { minimum: JSONSchema['minimum'], exclusive: JSONSchema['exclusiveMinimum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ minimum: minimum as JSONSchema['minimum'], exclusiveMinimum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { minimum: ${minimum}, exclusiveMinimum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/maxLength', (t) => {
	const { schema } = Schema;
	const maxLength = schema({ maxLength: 7 });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i <= 7;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);

		t.equal(maxLength(input), isMatch, `${input} ${message} { maxLength: 7 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/minLength', (t) => {
	const { schema } = Schema;
	const minLength = schema({ minLength: 7 });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i >= 7;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);

		t.equal(minLength(input), isMatch, `${input} ${message} { minLength: 7 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/pattern', (t) => {
	const { schema } = Schema;
	const pattern = schema({ pattern: '^[a-z]{2,}$' });
	const regex = schema({ pattern: /^[a-z]{2,}$/i });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i >= 2;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);
		const upper = input.toUpperCase();

		t.equal(pattern(input), isMatch, `${input} ${message} { pattern: "^[a-z]{2,}$" }`);
		t.equal(pattern(upper), false, `${upper} does not match { pattern: "^[a-z]{2,}$" }`);
		t.equal(regex(input), isMatch, `${input} ${message} { pattern: /^[a-z]{2,}$/i }`);
		t.equal(regex(upper), isMatch, `${upper} ${message} { pattern: /^[a-z]{2,}$/i }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/maxProperties', (t) => {
	const { schema } = Schema;
	const maxProperties = schema({ maxProperties: 3 });
	const input: { [key: string]: unknown } = {};

	for (let i = 1; i < 7; ++i) {
		const isMatch = i <= 3;
		const message = isMatch ? 'matches' : 'does not match';

		input[`p${i}`] = i;

		t.equal(maxProperties(input), isMatch, `${JSON.stringify(input)} ${message} { maxProperties: 3 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/minProperties', (t) => {
	const { schema } = Schema;
	const minProperties = schema({ minProperties: 3 });
	const input: { [key: string]: unknown } = {};

	for (let i = 1; i < 7; ++i) {
		const isMatch = i >= 3;
		const message = isMatch ? 'matches' : 'does not match';

		input[`p${i}`] = i;

		t.equal(minProperties(input), isMatch, `${JSON.stringify(input)} ${message} { minProperties: 3 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/required', (t) => {
	const { schema } = Schema;
	const required = schema({ required: ['p2', 'p4'] });
	const input: { [key: string]: unknown } = {};

	for (let i = 1; i < 7; ++i) {
		const isMatch = i >= 4;
		const message = isMatch ? 'matches' : 'does not match';

		input[`p${i}`] = i;

		t.equal(required(input), isMatch, `${JSON.stringify(input)} ${message} { required: ["p2", "p4"] }`);
	}

	t.false(required(null), 'null does not match { required: ["p2", "p4"] }');
	t.false(required('foo'), '"foo" does not match { required: ["p2", "p4"] }');
	t.false(required(1), '"foo" does not match { required: ["p2", "p4"] }');

	t.end();
});

test('Domain/Evaluation/Schema - schema/additionalProperties', (t) => {
	const { schema } = Schema;
	const foo: JSONSchema['properties'] = { foo: { bsonType: 'int' } };
	const bar: JSONSchema['properties'] = { bar: { bsonType: 'int' } };
	const baz: JSONSchema['properties'] = { baz: { bsonType: 'int' } };
	const all: JSONSchema['properties'] = { ...foo, ...bar, ...baz };
	const input = { foo: 1, bar: 2, baz: 3 };

	each`
		additional | required                 | properties            | matches
		-----------|--------------------------|-----------------------|---------
		${true}    |                          |                       | yes
		${true}    | ${['bar']}               |                       | yes
		${true}    | ${['bar']}               | ${baz}                | yes
		${true}    | ${['bar']}               | ${foo}                | yes
		${true}    | ${['foo', 'bar']}        |                       | yes
		${true}    | ${['foo', 'bar']}        | ${baz}                | yes
		${true}    | ${['foo', 'bar', 'baz']} |                       | yes
		${true}    |                          | ${all}                | yes
		${false}   |                          |                       | no
		${false}   | ${['bar']}               |                       | no
		${false}   | ${['bar']}               | ${baz}                | no
		${false}   | ${['bar']}               | ${foo}                | no
		${false}   | ${['foo', 'bar']}        |                       | no
		${false}   | ${['foo', 'bar']}        | ${baz}                | yes
		${false}   | ${['foo', 'bar', 'baz']} |                       | yes
		${false}   |                          | ${all}                | yes
		${foo}     |                          |                       | no
		${foo}     |                          | ${{ ...bar, ...baz }} | yes
		${foo}     | ${['bar']}               | ${baz}                | yes
		${bar}     |                          |                       | no
		${bar}     |                          | ${{ ...foo, ...baz }} | yes
		${bar}     | ${['foo']}               | ${baz}                | yes
		${baz}     |                          |                       | no
		${baz}     |                          | ${{ ...foo, ...bar }} | yes
		${baz}     | ${['foo']}               | ${bar}                | yes
		${all}     |                          |                       | yes
	`((record) => {
		const { additional, required, properties, matches } = record as {
			additional: JSONSchema['additionalProperties'];
			required: JSONSchema['required'];
			properties: JSONSchema['properties'];
			matches: 'yes' | 'no';
		};
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const jsonSchema = { additionalProperties: additional, required, properties };
		const evaluate = schema(jsonSchema);

		t.equal(evaluate(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(jsonSchema)}`);
	});

	t.end();
});

test('Domain/Evaluation/Schema - schema/properties', (t) => {
	const { schema } = Schema;
	const properties = {
		properties: {
			foo: { bsonType: 'int' },
		},
	}
	const props = schema(properties);

	t.true(props({}), `{} matches ${JSON.stringify(properties)}`);
	t.true(props({ foo: 1 }), `{ foo: 1 } matches ${JSON.stringify(properties)}`);
	t.false(props({ foo: 1.1 }), `{ foo: 1.1 } does not match ${JSON.stringify(properties)}`);
	t.true(props({ bar: 1 }), `{ bar: 1 } match ${JSON.stringify(properties)}`);
	t.true(props({ foo: 1, bar: 2 }), `{ foo: 1, bar: 2 } matches ${JSON.stringify(properties)}`);
	t.false(props({ foo: 'yes', bar: 2 }), `{ foo: "yes", bar: 2 } does not match ${JSON.stringify(properties)}`);

	t.end();
});

test('Domain/Evaluation/Schema - schema/patternProperties', (t) => {
	const { schema } = Schema;
	const patternProperties = {
		patternProperties: {
			'^iso(?:639|3166)': { minLength: 2, maxLength: 3 },
			'^iso639': { pattern: '^[a-z]+$' },
			'^iso3166': { pattern: '^[A-Z]+$' },
		},
	}
	const props = schema(patternProperties);

	t.true(props({}), `{} matches ${JSON.stringify(patternProperties)}`);
	t.true(props({ iso639: 'nl' }), `{iso639: 'nl'} matches ${JSON.stringify(patternProperties)}`);
	t.true(props({ iso639: 'nld' }), `{iso639: 'nld'} matches ${JSON.stringify(patternProperties)}`);
	t.true(props({ iso639: 'dut' }), `{iso639: 'dut'} matches ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso639: 'NL' }), `{iso639: 'NL'} does not match ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso639: 'NLD' }), `{iso639: 'NLD'} does not match ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso639: 'DUT' }), `{iso639: 'DUT'} does not match ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso639: 'dutch' }), `{iso639: 'dutch'} does not match ${JSON.stringify(patternProperties)}`);
	t.true(props({ iso3166: 'NL' }), `{iso3166: 'NL'} matches ${JSON.stringify(patternProperties)}`);
	t.true(props({ iso3166: 'NLD' }), `{iso3166: 'NLD'} matches ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso3166: 'nl' }), `{iso3166: 'nl'} does not match ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso3166: 'nld' }), `{iso3166: 'nld'} does not match ${JSON.stringify(patternProperties)}`);
	t.false(props({ iso3166: 'Netherlands' }), `{iso3166: 'Netherlands'} does not match ${JSON.stringify(patternProperties)}`);

	t.end();
});

test('Domain/Evaluation/Schema - schema/dependencies', (t) => {
	const { schema } = Schema;
	const dependencies = {
		bar: ['baz'],
		qux: {
			properties: {
				foo: { bsonType: 'string' },
			},
		}
	};
	const deps = schema({ dependencies });

	t.true(deps({}), `{} matches ${JSON.stringify({ dependencies })}`);
	t.true(deps({ foo: 'bar' }), `{foo: 'bar'} matches ${JSON.stringify({ dependencies })}`);
	t.true(deps({ foo: 1 }), `{foo: 1} matches ${JSON.stringify({ dependencies })}`);
	t.false(deps({ foo: 1, bar: 2 }), `{foo: 1, bar: 2} does not match ${JSON.stringify({ dependencies })}`);
	t.true(deps({ foo: 'yes', bar: 2, baz: 3 }), `{foo: 1, bar: 2, baz: 3} matches ${JSON.stringify({ dependencies })}`);
	t.true(deps({ foo: 'yes', qux: 4 }), `{foo: 'yes', qux: 4} matches ${JSON.stringify({ dependencies })}`);
	t.false(deps({ foo: true, qux: 4 }), `{foo: true, qux: 4} does not match ${JSON.stringify({ dependencies })}`);
	t.false(deps({ foo: 1, qux: 4 }), `{foo: 1, qux: 4} does not match ${JSON.stringify({ dependencies })}`);

	t.end();
});

test('Domain/Evaluation/Schema - schema/items', (t) => {
	const { schema } = Schema;
	const singleSchematic = { items: { type: 'string' } };
	const multipleSchematic = { items: [{ type: 'string' }, { type: 'object', required: ['name'] }] };
	const singleItem = schema(singleSchematic as JSONSchema);
	const multipleItems = schema(multipleSchematic as JSONSchema);

	each`
		input                         | single | multiple
		------------------------------|--------|----------
		${[]}                         | yes    | yes
		${['one']}                    | yes    | yes
		${['one', 'two']}             | yes    | yes
		${['one', 'two', 3]}          | no     | no
		${['one', 2]}                 | no     | no
		${[{ name: 'one' }]}          | no     | yes
		${['one', { name: 'two' }]}   | no     | yes
		${['one', { name: 2 }]}       | no     | yes
		${[{ name: 1 }, 'two']}       | no     | yes
		${[{ name: 1 }, { name: 2 }]} | no     | yes
		${[{ num: 1 }]}               | no     | no
	`((record) => {
		const { input, single, multiple } = record as { input: any, single: string, multiple: string };
		const isSingleMatch = single === 'yes';
		const isMultipleMatch = multiple === 'yes';
		const singleMessage = isSingleMatch ? 'matches' : 'does not match';
		const multipleMessage = isMultipleMatch ? 'matches' : 'does not match';

		t.equal(singleItem(input), isSingleMatch, `${JSON.stringify(input)} ${singleMessage} ${JSON.stringify(singleSchematic)}`);
		t.equal(multipleItems(input), isMultipleMatch, `${JSON.stringify(input)} ${multipleMessage} ${JSON.stringify(multipleSchematic)}`);
	});

	t.end();
});
