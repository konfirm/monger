import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Evaluation from '../../../../source/Domain/Filter/Operator/Evaluation';
import { data as expression, TestRecord } from './Evaluation/Expression';

test('Domain/Filter/Operator/Evaluation - exports', (t) => {
	const expected = ['$expr', '$jsonSchema', '$mod', '$regex', '$text', '$where'];
	const actual = Object.keys(Evaluation);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Evaluation[<keyof typeof Evaluation>key], 'function', `contains function ${key}`);
	});

	t.end();
});


test('Domain/Filter/Operator/Evaluation - $expr', (t) => {
	const { $expr } = Evaluation;

	expression.forEach(({ operator, query, tests }: TestRecord) => {
		const q = { [operator]: query };

		tests.forEach(({ output, error, ...input }) => {
			if (error) {
				t.throws(() => {
					const compiled = $expr(q);

					return compiled(input)
				}, <any>error, `$expr(${JSON.stringify(q)}) on ${JSON.stringify(input)} throws ${error}`);
			}
			else {
				const compiled = $expr(q);
				t.equals(compiled(input), Boolean(output), `$expr(${JSON.stringify(q)}) on ${JSON.stringify(input)} returns ${Boolean(output)}`);
			}
		});
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation - $jsonSchema', (t) => {
	const { $jsonSchema } = Evaluation;
	const schema = $jsonSchema({
		type: 'object',
		required: ['foo'],
		properties: {
			foo: {
				type: 'string',
				minLength: 2,
				maxLength: 7,
			},
		},
		dependencies: {
			bar: ['baz'],
			qux: {
				properties: {
					foo: {
						maxLength: 5,
					}
				},
			}
		},
	});

	t.false(schema({}), `{} does not match schema`);
	t.false(schema({ foo: 1 }), `{foo: 1} does not match schema`);
	t.false(schema({ foo: 'a' }), `{foo: 'a'} does not match schema`);
	t.true(schema({ foo: 'hi' }), `{foo: 'hi'} matches schema`);
	t.false(schema({ bar: 'hi' }), `{bar: 'hi'} does not match schema`);
	t.true(schema({ foo: 'hello' }), `{foo: 'hello'} matches schema`);
	t.true(schema({ foo: 'hellooo' }), `{foo: 'hellooo'} matches schema`);
	t.false(schema({ foo: 'helloooo' }), `{foo: 'helloooo'} does not match schema`);
	t.false(schema({ foo: 'hello world' }), `{foo: 'hello world'} does not match schema`);
	t.false(schema({ foo: 'hello', bar: 1 }), `{foo: 'hello', bar: 1} does not match schema`);
	t.true(schema({ foo: 'hello', bar: 1, baz: 2 }), `{foo: 'hello', bar: 1, baz: 1} matches schema`);
	t.true(schema({ foo: 'hello', qux: 3 }), `{foo: 'hello', qux: 3} matches schema`);
	t.false(schema({ foo: 'helloo', qux: 3 }), `{foo: 'helloo', qux: 3} does not match schema`);
	t.false(schema({ foo: 'hellooo', qux: 3 }), `{foo: 'hellooo', qux: 3} does not match schema`);

	t.end();
});

test('Domain/Filter/Operator/Evaluation - $mod', (t) => {
	const { $mod } = Evaluation;

	each`
		query     | input | matches
		----------|-------|---------
		${[2, 0]} | ${1}  | no
		${[2, 0]} | ${2}  | yes
		${[2, 0]} | ${3}  | no
		${[2, 0]} | ${4}  | yes
		${[3, 0]} | ${1}  | no
		${[3, 0]} | ${2}  | no
		${[3, 0]} | ${3}  | yes
		${[3, 0]} | ${4}  | no
		${[3, 0]} | ${5}  | no
		${[3, 0]} | ${6}  | yes
		${[4, 2]} | ${1}  | no
		${[4, 2]} | ${2}  | yes
		${[4, 2]} | ${3}  | no
		${[4, 2]} | ${4}  | no
		${[4, 2]} | ${5}  | no
		${[4, 2]} | ${6}  | yes
	`((record) => {
		const { query, input, matches } = record;
		const mod = $mod(query as [number, number]);
		const verdict = matches === 'yes';
		const message = verdict ? 'matches' : 'does not match';

		t.equal(mod(input), verdict, `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation - $regex', (t) => {
	const { $regex } = Evaluation;

	type RegexArgs = Parameters<typeof $regex>;
	type QueryType = RegexArgs[0];
	type ContextType = RegexArgs[2];

	each`
		query      | options | input   | matches
		-----------|---------|---------|---------
		${/part/}  |         | partial | yes
		${/PART/}  |         | partial | no
		${/PART/i} |         | partial | yes
		${'part'}  |         | partial | yes
		${'PART'}  |         | partial | no
		${'PART'}  | ${'i'}  | partial | yes
	`((record) => {
		const { query, options, input, matches } = record;
		const regex = $regex(query as unknown as QueryType, () => () => true, { $options: options } as ContextType);
		const verdict = matches === 'yes';
		const message = verdict ? 'matches' : 'does not match';
		const type = query instanceof RegExp ? 'RegExp' : 'string';

		t.equal(regex(input), verdict, `${input} ${message} ${type} ${query}, $options: ${JSON.stringify(options)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation - $text', (t) => {
	const { $text } = Evaluation;

	each`
		search       | casing | diacritic | input                    | matches
		-------------|--------|-----------|--------------------------|---------
		a bar        | no     | no        | a foo walks into the bar | yes
		a bar        | yes    | no        | a foo walks into the bar | yes
		a bar        | no     | yes       | a foo walks into the bar | yes
		a bar        | yes    | yes       | a foo walks into the bar | yes
		ä bär        | no     | no        | a foo walks into the bar | yes
		ä bär        | yes    | no        | a foo walks into the bar | yes
		ä bär        | no     | yes       | a foo walks into the bar | no
		ä bär        | yes    | yes       | a foo walks into the bar | no
		a bar        | no     | no        | A FOO WALKS INTO THE BAR | yes
		a bar        | yes    | no        | A FOO WALKS INTO THE BAR | no
		a bar        | no     | yes       | A FOO WALKS INTO THE BAR | yes
		a bar        | yes    | yes       | A FOO WALKS INTO THE BAR | no
		ä bär        | no     | no        | A FOO WALKS INTO THE BAR | yes
		ä bär        | yes    | no        | A FOO WALKS INTO THE BAR | no
		ä bär        | no     | yes       | A FOO WALKS INTO THE BAR | no
		ä bär        | yes    | yes       | A FOO WALKS INTO THE BAR | no
		a bar        | no     | no        | á foo walks into the bār | yes
		a bar        | yes    | no        | á foo walks into the bār | yes
		a bar        | no     | yes       | á foo walks into the bār | no
		a bar        | yes    | yes       | á foo walks into the bār | no
		ä bär        | no     | no        | á foo walks into the bār | yes
		ä bär        | yes    | no        | á foo walks into the bār | yes
		ä bär        | no     | yes       | á foo walks into the bār | no
		ä bär        | yes    | yes       | á foo walks into the bār | no
		a bar        | no     | no        | Á FOO WALKS INTO THE BĀR | yes
		a bar        | yes    | no        | Á FOO WALKS INTO THE BĀR | no
		a bar        | no     | yes       | Á FOO WALKS INTO THE BĀR | no
		a bar        | yes    | yes       | Á FOO WALKS INTO THE BĀR | no
		ä bär        | no     | no        | Á FOO WALKS INTO THE BĀR | yes
		ä bär        | yes    | no        | Á FOO WALKS INTO THE BĀR | no
		ä bär        | no     | yes       | Á FOO WALKS INTO THE BĀR | no
		ä bär        | yes    | yes       | Á FOO WALKS INTO THE BĀR | no

		"a bar"      | no     | no        | a foo walks into the bar | no
		"a bar"      | yes    | no        | a foo walks into the bar | no
		"a bar"      | no     | yes       | a foo walks into the bar | no
		"a bar"      | yes    | yes       | a foo walks into the bar | no
		"ä bär"      | no     | no        | a foo walks into the bar | no
		"ä bär"      | yes    | no        | a foo walks into the bar | no
		"ä bär"      | no     | yes       | a foo walks into the bar | no
		"ä bär"      | yes    | yes       | a foo walks into the bar | no

		a "the bar"  | no     | no        | a foo walks into the bar | yes
		a "the bar"  | yes    | no        | a foo walks into the bar | yes
		a "the bar"  | no     | yes       | a foo walks into the bar | yes
		a "the bar"  | yes    | yes       | a foo walks into the bar | yes
		ä "the bär"  | no     | no        | a foo walks into the bar | yes
		ä "the bär"  | yes    | no        | a foo walks into the bar | yes
		ä "the bär"  | no     | yes       | a foo walks into the bar | no
		ä "the bär"  | yes    | yes       | a foo walks into the bar | no
		a "the bar"  | no     | no        | A FOO WALKS INTO THE BAR | yes
		a "the bar"  | yes    | no        | A FOO WALKS INTO THE BAR | no
		a "the bar"  | no     | yes       | A FOO WALKS INTO THE BAR | yes
		a "the bar"  | yes    | yes       | A FOO WALKS INTO THE BAR | no
		ä "the bär"  | no     | no        | A FOO WALKS INTO THE BAR | yes
		ä "the bär"  | yes    | no        | A FOO WALKS INTO THE BAR | no
		ä "the bär"  | no     | yes       | A FOO WALKS INTO THE BAR | no
		ä "the bär"  | yes    | yes       | A FOO WALKS INTO THE BAR | no
		a "the bar"  | no     | no        | á foo walks into the bār | yes
		a "the bar"  | yes    | no        | á foo walks into the bār | yes
		a "the bar"  | no     | yes       | á foo walks into the bār | no
		a "the bar"  | yes    | yes       | á foo walks into the bār | no
		ä "the bär"  | no     | no        | á foo walks into the bār | yes
		ä "the bär"  | yes    | no        | á foo walks into the bār | yes
		ä "the bär"  | no     | yes       | á foo walks into the bār | no
		ä "the bär"  | yes    | yes       | á foo walks into the bār | no
		a "the bar"  | no     | no        | Á FOO WALKS INTO THE BĀR | yes
		a "the bar"  | yes    | no        | Á FOO WALKS INTO THE BĀR | no
		a "the bar"  | no     | yes       | Á FOO WALKS INTO THE BĀR | no
		a "the bar"  | yes    | yes       | Á FOO WALKS INTO THE BĀR | no
		ä "the bär"  | no     | no        | Á FOO WALKS INTO THE BĀR | yes
		ä "the bär"  | yes    | no        | Á FOO WALKS INTO THE BĀR | no
		ä "the bär"  | no     | yes       | Á FOO WALKS INTO THE BĀR | no
		ä "the bär"  | yes    | yes       | Á FOO WALKS INTO THE BĀR | no

		-bar         | no     | no        | a foo walks into the bar | no
		-foo -bar    | no     | no        | a foo walks into the bar | no

		a -bar       | no     | no        | a foo walks into the bar | no
		a -bar       | yes    | no        | a foo walks into the bar | no
		a -bar       | no     | yes       | a foo walks into the bar | no
		a -bar       | yes    | yes       | a foo walks into the bar | no
	`((record) => {
		const { search, casing, diacritic, input, matches } = record;
		const options = {
			$search: search as string,
			$caseSensitive: casing === 'yes',
			$diacriticSensitive: diacritic === 'yes',
		};
		const text = $text(options);
		const verdict = matches === 'yes';
		const message = verdict ? 'matches' : 'does not match';

		t.equal(text(input), verdict, `${JSON.stringify(options)} ${message} ${input}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation - $where', (t) => {
	const { $where } = Evaluation;

	const plain = $where(function (this: any) {
		return this.foo === 'bar';
	});

	const fat = $where((obj: any) => obj.foo === 'baz');

	t.true(plain({ foo: 'bar' }), 'has this.foo "bar"');
	t.false(plain({ foo: 'baz' }), 'does not have this.foo "baz"');

	t.false(fat({ foo: 'bar' }), 'does not have this.foo "bar"');
	t.true(fat({ foo: 'baz' }), 'has this.foo "baz"');

	t.end();
});
