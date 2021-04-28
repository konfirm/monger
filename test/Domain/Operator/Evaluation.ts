import * as test from 'tape';
import each from 'template-literal-each';
import * as Evaluation from '../../../source/Domain/Operator/Evaluation';

test('Domain/Operator/Evaluation - exports', (t) => {
	const expected = ['$expr', '$jsonSchema', '$mod', '$regex', '$text', '$where'];
	const actual = Object.keys(Evaluation);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Evaluation[<keyof typeof Evaluation>key], 'function', `contains function ${key}`);
	});

	t.end();
});


test('Domain/Operator/Evaluation - $expr', (t) => {
	const { $expr } = Evaluation;
	const expr = $expr('@TODO');

	t.throws(() => expr('@TODO'), '$expr is not implemented');

	t.end();
});

test('Domain/Operator/Evaluation - $jsonSchema', (t) => {
	const { $jsonSchema } = Evaluation;
	const jsonSchema = $jsonSchema('@TODO');

	t.throws(() => jsonSchema('@TODO'), '$jsonSchema is not implemented');

	t.end();
});

test('Domain/Operator/Evaluation - $mod', (t) => {
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

test('Domain/Operator/Evaluation - $regex', (t) => {
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
		const regex = $regex(query as unknown as QueryType, undefined, { $options: options } as ContextType);
		const verdict = matches === 'yes';
		const message = verdict ? 'matches' : 'does not match';
		const type = query instanceof RegExp ? 'RegExp' : 'string';

		t.equal(regex(input), verdict, `${input} ${message} ${type} ${query}, $options: ${JSON.stringify(options)}`);
	});

	t.end();
});

test('Domain/Operator/Evaluation - $text', (t) => {
	const { $text } = Evaluation;
	const text = $text('@TODO');

	t.throws(() => text('@TODO'), '$text is not implemented');

	t.end();
});

test('Domain/Operator/Evaluation - $where', (t) => {
	const { $where } = Evaluation;
	const where = $where('@TODO');

	t.throws(() => where('@TODO'), '$where is not implemented');

	t.end();
});
