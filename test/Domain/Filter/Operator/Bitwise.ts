import * as test from 'tape';
import each from 'template-literal-each';
import * as Bitwise from '../../../../source/Domain/Filter/Operator/Bitwise';

type TestRecord = { query: number | Array<number>, input: number, matches: string };

test('Domain/Filter/Operator/Bitwise - exports', (t) => {
	const expected = ['$bitsAllClear', '$bitsAllSet', '$bitsAnyClear', '$bitsAnySet'];
	const actual = Object.keys(Bitwise);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Bitwise[<keyof typeof Bitwise>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Bitwise - $bitsAllClear', (t) => {
	const { $bitsAllClear } = Bitwise;

	each`
		query     | input | matches
		----------|-------|---------
		${1}      | ${0}  | yes
		${1}      | ${1}  | no
		${1}      | ${2}  | yes
		${2}      | ${2}  | no
		${3}      | ${0}  | yes
		${3}      | ${1}  | no
		${3}      | ${2}  | no
		${3}      | ${3}  | no
		${3}      | ${4}  | yes
		${[0, 2]} | ${0}  | yes
		${[0, 2]} | ${1}  | no
		${[0, 2]} | ${2}  | yes
		${[0, 2]} | ${3}  | no
		${[0, 2]} | ${4}  | no
		${[0, 2]} | ${5}  | no
		${[0, 2]} | ${6}  | no
		${[0, 2]} | ${7}  | no
		${[0, 2]} | ${8}  | yes
		${[200]}  | ${-5} | no
		${[200]}  | ${5}  | yes
	`((record) => {
		const { query, input, matches } = <TestRecord>record;
		const compiled = $bitsAllClear(query);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Bitwise - $bitsAllSet', (t) => {
	const { $bitsAllSet } = Bitwise;

	each`
		query     | input | matches
		----------|-------|---------
		${1}      | ${0}  | no
		${1}      | ${1}  | yes
		${1}      | ${2}  | no
		${2}      | ${2}  | yes
		${3}      | ${0}  | no
		${3}      | ${1}  | no
		${3}      | ${2}  | no
		${3}      | ${3}  | yes
		${3}      | ${4}  | no
		${[0, 2]} | ${0}  | no
		${[0, 2]} | ${1}  | no
		${[0, 2]} | ${2}  | no
		${[0, 2]} | ${3}  | no
		${[0, 2]} | ${4}  | no
		${[0, 2]} | ${5}  | yes
		${[0, 2]} | ${6}  | no
		${[0, 2]} | ${7}  | yes
		${[0, 2]} | ${8}  | no
		${[200]}  | ${-5} | yes
		${[200]}  | ${5}  | no
	`((record) => {
		const { query, input, matches } = <TestRecord>record;
		const compiled = $bitsAllSet(query);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Bitwise - $bitsAnyClear', (t) => {
	const { $bitsAnyClear } = Bitwise;

	each`
		query     | input | matches
		----------|-------|---------
		${1}      | ${0}  | yes
		${1}      | ${1}  | no
		${1}      | ${2}  | yes
		${2}      | ${2}  | no
		${3}      | ${0}  | yes
		${3}      | ${1}  | yes
		${3}      | ${2}  | yes
		${3}      | ${3}  | no
		${3}      | ${4}  | yes
		${[0, 2]} | ${0}  | yes
		${[0, 2]} | ${1}  | yes
		${[0, 2]} | ${2}  | yes
		${[0, 2]} | ${3}  | yes
		${[0, 2]} | ${4}  | yes
		${[0, 2]} | ${5}  | no
		${[0, 2]} | ${6}  | yes
		${[0, 2]} | ${7}  | no
		${[0, 2]} | ${8}  | yes
		${[200]}  | ${-5} | no
		${[200]}  | ${5}  | yes
	`((record) => {
		const { query, input, matches } = <TestRecord>record;
		const compiled = $bitsAnyClear(query);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Bitwise - $bitsAnySet', (t) => {
	const { $bitsAnySet } = Bitwise;

	each`
		query     | input | matches
		----------|-------|---------
		${1}      | ${0}  | no
		${1}      | ${1}  | yes
		${1}      | ${2}  | no
		${2}      | ${2}  | yes
		${3}      | ${0}  | no
		${3}      | ${1}  | yes
		${3}      | ${2}  | yes
		${3}      | ${3}  | yes
		${3}      | ${4}  | no
		${[0, 2]} | ${0}  | no
		${[0, 2]} | ${1}  | yes
		${[0, 2]} | ${2}  | no
		${[0, 2]} | ${3}  | yes
		${[0, 2]} | ${4}  | yes
		${[0, 2]} | ${5}  | yes
		${[0, 2]} | ${6}  | yes
		${[0, 2]} | ${7}  | yes
		${[0, 2]} | ${8}  | no
		${[200]}  | ${-5} | yes
		${[200]}  | ${5}  | no
	`((record) => {
		const { query, input, matches } = <TestRecord>record;
		const compiled = $bitsAnySet(query);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});
