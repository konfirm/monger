import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Element from '../../../../source/Domain/Filter/Operator/Element';

test('Domain/Filter/Operator/Element - exports', (t) => {
	const expected = ['$exists', '$type'];
	const actual = Object.keys(Element);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Element[<keyof typeof Element>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Element - $exists', (t) => {
	const { $exists } = Element;

	each`
		query    | input         | matches
		---------|---------------|---------
		${true}  | ${'1'}        | yes
		${true}  | ${1}          | yes
		${true}  | ${[1, 2]}     | yes
		${true}  | ${{ one: 1 }} | yes
		${true}  | ${new Date()} | yes
		${true}  | ${/regex/}    | yes
		${true}  | ${true}       | yes
		${true}  | ${false}      | yes
		${true}  | ${undefined}  | no
		${true}  | ${null}       | no
		${false} | ${'1'}        | no
		${false} | ${1}          | no
		${false} | ${[1, 2]}     | no
		${false} | ${{ one: 1 }} | no
		${false} | ${new Date()} | no
		${false} | ${/regex/}    | no
		${false} | ${true}       | no
		${false} | ${false}      | no
		${false} | ${undefined}  | yes
		${false} | ${null}       | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $exists(query as Element.Operation['$exists']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Element - $type', (t) => {
	const { $type } = Element;
	const types = {
		double: 1,
		string: 2,
		object: 3,
		array: 4,
		undefined: 6,
		bool: 8,
		date: 9,
		null: 10,
		regex: 11,
		javascript: 13,
		symbol: 14,
		int: 16,
		long: 18,
	};
	const keys = Object.keys(types);

	each`
		query      | input
		-----------|-------
		double     | ${1.2}
		string     | ${'string'}
		object     | ${{ one: 1 }}
		array      | ${[1, 2]}
		undefined  | ${undefined}
		bool       | ${true}
		date       | ${new Date()}
		null       | ${null}
		regex      | ${/regex/}
		javascript | ${() => { }}
		symbol     | ${Symbol()}
		int        | ${123}
		long       | ${BigInt(12345678900987654321)}
	`((record) => {
		const { query, input } = record;
		const number = types[query as keyof typeof types];
		const display = typeof input === 'symbol' ? 'Symbol' : input;
		const never = keys.filter((key) => key !== query);
		const always = never.concat(query as string);

		const aliased = $type(query as string);
		const numbered = $type(number);
		const excludes = $type(never);
		const includes = $type(always);

		t.true(aliased(input), `${display} is ${query}`);
		t.true(numbered(input), `${display} is ${number}`);
		t.false(excludes(input), `${display} not in ${JSON.stringify(never)}`);
		t.true(includes(input), `${display} in ${JSON.stringify(always)}`);
	});

	t.end();
});
