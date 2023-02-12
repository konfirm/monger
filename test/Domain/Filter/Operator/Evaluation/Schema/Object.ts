import type { JSONSchema } from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';
import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Schema from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';

test('Domain/Filter/Operator/Evaluation/Schema - schema/maxProperties', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/minProperties', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/required', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/additionalProperties', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/properties', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/patternProperties', (t) => {
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

test('Domain/Filter/Operator/Evaluation/Schema - schema/dependencies', (t) => {
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
