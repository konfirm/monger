import * as test from 'tape';
import each from 'template-literal-each';
import * as ArrayOp from '../../../../source/Domain/Filter/Operator/Array';

test('Domain/Filter/Operator/Array - exports', (t) => {
	const expected = ['$all', '$size'];
	const actual = Object.keys(ArrayOp);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof ArrayOp[<keyof typeof ArrayOp>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Array - $all', (t) => {
	const { $all } = ArrayOp;

	each`
		query                       | input                                   | matches
		----------------------------|-----------------------------------------|---------
		${[1]}                      | ${[1, 2]}                               | yes
		${[1]}                      | ${[2]}                                  | no
		${[1]}                      | ${[2, 1]}                               | yes
		${[1]}                      | ${1}                                    | yes
		${[1, 2]}                   | ${1}                                    | no
		${[1, 2]}                   | ${[1]}                                  | no
		${[1, 2]}                   | ${[1, 2]}                               | yes
		${[1, 2]}                   | ${[2, 1]}                               | yes
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ foo: 1 }]}                         | no
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ baz: 2 }]}                         | no
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ bar: 3 }]}                         | no
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ foo: 1 }, { baz: 3 }]}             | yes
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ foo: 1 }, { bar: 2 }]}             | no
		${[{ foo: 1 }, { baz: 3 }]} | ${[{ foo: 1 }, { bar: 2 }, { baz: 3 }]} | yes
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $all(query as ArrayOp.Operation['$all']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Array - $size', (t) => {
	const { $size } = ArrayOp;

	each`
		query | input     | matches
		------|-----------|---------
		${1}  | ${[2]}    | yes
		${1}  | ${[1, 2]} | no
		${2}  | ${[1, 2]} | yes
		${3}  | ${'foo'}  | no
	`((record) => {
		const { query, input, matches } = record;
		const compiled = $size(query as ArrayOp.Operation['$size']);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match'

		t.equal(compiled(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`);
	});

	t.end();
});
