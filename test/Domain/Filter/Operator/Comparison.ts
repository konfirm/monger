import * as test from 'tape';
import each from 'template-literal-each';
import * as Comparison from '../../../../source/Domain/Filter/Operator/Comparison';

test('Domain/Filter/Operator/Comparison - exports', (t) => {
	const expected = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin'];
	const actual = Object.keys(Comparison);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Comparison[<keyof typeof Comparison>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $eq', (t) => {
	const { $eq } = Comparison;

	each`
		query                         | input                         | matches
		------------------------------|-------------------------------|---------
		${true}                       | ${true}                       | yes
		${true}                       | ${false}                      | no
		${false}                      | ${true}                       | no
		${false}                      | ${false}                      | yes
		string                        | stri                          | no
		string                        | string                        | yes
		string                        | stringed                      | no
		${1}                          | ${0}                          | no
		${1}                          | ${1}                          | yes
		${1}                          | ${2}                          | no
		${[1, 2]}                     | ${[1, 2]}                     | yes
		${[1, 2]}                     | ${[1, 2, 3]}                  | no
		${[1, 2, 3]}                  | ${[1, 2]}                     | no
		${[1, 2, 3]}                  | ${[1, 3, 2]}                  | no
		${{ foo: 'bar' }}             | ${{ foo: 'bar' }}             | yes
		${{ foo: 'bar', bar: 'baz' }} | ${{ foo: 'bar', bar: 'baz' }} | yes
		${{ foo: 'bar', bar: 'baz' }} | ${{ bar: 'baz', foo: 'bar' }} | no
		${/^bar/}                     | ${'bar'}                      | yes
		${/^bar/}                     | ${'barry'}                    | yes
		${/^bar/}                     | ${'Barry'}                    | no
		${/^bar/i}                    | ${'Barry'}                    | yes
		${/^bar$/}                    | ${'Barry'}                    | no
		${/^bar$/i}                   | ${'Barry'}                    | no
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $eq(query as Comparison.Operation['$eq']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $ne', (t) => {
	const { $ne } = Comparison;

	each`
		query    | input    | matches
		---------|----------|---------
		${true}  | ${true}  | no
		${true}  | ${false} | yes
		${false} | ${true}  | yes
		${false} | ${false} | no
		string   | stri     | yes
		string   | string   | no
		string   | stringed | yes
		${1}     | ${0}     | yes
		${1}     | ${1}     | no
		${1}     | ${2}     | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $ne(query as Comparison.Operation['$ne']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $gt', (t) => {
	const { $gt } = Comparison;

	each`
		query    | input    | matches
		---------|----------|---------
		${1}     | ${0}     | no
		${1}     | ${1}     | no
		${1}     | ${2}     | yes
		one      | on       | no
		one      | one      | no
		one      | ones     | yes
		${true}  | ${false} | no
		${true}  | ${true}  | no
		${false} | ${false} | no
		${false} | ${true}  | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $gt(query as Comparison.Operation['$gt']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $gte', (t) => {
	const { $gte } = Comparison;

	each`
		query    | input    | matches
		---------|----------|---------
		${1}     | ${0}     | no
		${1}     | ${1}     | yes
		${1}     | ${2}     | yes
		one      | on       | no
		one      | one      | yes
		one      | ones     | yes
		${true}  | ${false} | no
		${true}  | ${true}  | yes
		${false} | ${false} | yes
		${false} | ${true}  | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $gte(query as Comparison.Operation['$gte']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $lt', (t) => {
	const { $lt } = Comparison;

	each`
		query    | input    | matches
		---------|----------|---------
		${1}     | ${0}     | yes
		${1}     | ${1}     | no
		${1}     | ${2}     | no
		one      | on       | yes
		one      | one      | no
		one      | ones     | no
		${true}  | ${false} | yes
		${true}  | ${true}  | no
		${false} | ${false} | no
		${false} | ${true}  | no
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $lt(query as Comparison.Operation['$lt']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $lte', (t) => {
	const { $lte } = Comparison;

	each`
		query    | input    | matches
		---------|----------|---------
		${1}     | ${0}     | yes
		${1}     | ${1}     | yes
		${1}     | ${2}     | no
		one      | on       | yes
		one      | one      | yes
		one      | ones     | no
		${true}  | ${false} | yes
		${true}  | ${true}  | yes
		${false} | ${false} | yes
		${false} | ${true}  | no
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $lte(query as Comparison.Operation['$lte']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $in', (t) => {
	const { $in } = Comparison;

	each`
		query             | input    | matches
		------------------|----------|---------
		${[1, 2, 3]}      | ${0}     | no
		${[1, 2, 3]}      | ${1}     | yes
		${[1, 2, 3]}      | ${2}     | yes
		${[1, 2, 3]}      | ${3}     | yes
		${[1, 2, 3]}      | ${4}     | no
		${['foo', 'bar']} | foo      | yes
		${['foo', 'bar']} | bar      | yes
		${['foo', 'bar']} | baz      | no
		${[true]}         | ${true}  | yes
		${[true]}         | ${false} | no
		${[false]}        | ${true}  | no
		${[false]}        | ${false} | yes
		${[true, false]}  | ${false} | yes
		${[true, false]}  | ${true}  | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $in(query as Comparison.Operation['$in']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Comparison - $nin', (t) => {
	const { $nin } = Comparison;

	each`
		query             | input    | matches
		------------------|----------|---------
		${[1, 2, 3]}      | ${0}     | yes
		${[1, 2, 3]}      | ${1}     | no
		${[1, 2, 3]}      | ${2}     | no
		${[1, 2, 3]}      | ${3}     | no
		${[1, 2, 3]}      | ${4}     | yes
		${['foo', 'bar']} | foo      | no
		${['foo', 'bar']} | bar      | no
		${['foo', 'bar']} | baz      | yes
		${[true]}         | ${true}  | no
		${[true]}         | ${false} | yes
		${[false]}        | ${true}  | yes
		${[false]}        | ${false} | no
		${[true, false]}  | ${false} | no
		${[true, false]}  | ${true}  | no
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $nin(query as Comparison.Operation['$nin']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), matches === 'yes', `${input} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});
