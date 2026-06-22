import * as test from 'tape';
import { each } from 'template-literal-each';
import { type, is, isArray, isObject, isUndefined, isNULL, isRegex, isInteger } from '../../source/Domain/BSON';

const UNSAFE_INT = Number.MAX_SAFE_INTEGER + 1;

test('Domain/BSON - type detection', (t) => {
	each`
		input                    | expected
		-------------------------|----------
		${3.14}                  | double
		${-3.14}                 | double
		${0.1}                   | double
		${NaN}                   | double
		${Infinity}              | double
		${-Infinity}             | double
		${0}                     | int
		${1}                     | int
		${-1}                    | int
		${42}                    | int
		${Number.MAX_SAFE_INTEGER}  | int
		${Number.MIN_SAFE_INTEGER}  | int
		${UNSAFE_INT}            | long
		${-UNSAFE_INT}           | long
		${BigInt(0)}             | long
		${BigInt(1)}             | long
		${BigInt(-1)}            | long
		${''}                    | string
		${'hello'}               | string
		${{}}                    | object
		${{ a: 1 }}              | object
		${[]}                    | array
		${[1, 2, 3]}             | array
		${undefined}             | undefined
		${true}                  | bool
		${false}                 | bool
		${new Date()}            | date
		${null}                  | null
		${/regex/}               | regex
		${/regex/gi}             | regex
		${() => {}}              | javascript
		${Symbol()}              | symbol
	`((record) => {
		const { input, expected } = record as { input: unknown; expected: string };
		t.equal(type(input), expected, `type(${String(input)}) is '${expected}'`);
	});

	t.end();
});

test('Domain/BSON - is() by alias', (t) => {
	each`
		alias        | input           | expected
		-------------|-----------------|----------
		double       | ${3.14}         | ${true}
		double       | ${42}           | ${false}
		int          | ${42}           | ${true}
		int          | ${3.14}         | ${false}
		int          | ${UNSAFE_INT}   | ${false}
		long         | ${UNSAFE_INT}   | ${true}
		long         | ${-UNSAFE_INT}  | ${true}
		long         | ${BigInt(1)}    | ${true}
		long         | ${42}           | ${false}
		string       | ${'hello'}      | ${true}
		string       | ${42}           | ${false}
		object       | ${{}}           | ${true}
		object       | ${[]}           | ${false}
		object       | ${null}         | ${false}
		array        | ${[]}           | ${true}
		array        | ${{}}           | ${false}
		undefined    | ${undefined}    | ${true}
		undefined    | ${null}         | ${false}
		bool         | ${true}         | ${true}
		bool         | ${false}        | ${true}
		bool         | ${1}            | ${false}
		date         | ${new Date()}   | ${true}
		date         | ${'2020-01-01'} | ${false}
		null         | ${null}         | ${true}
		null         | ${undefined}    | ${false}
		regex        | ${/x/}          | ${true}
		regex        | ${'x'}          | ${false}
	`((record) => {
		const { alias, input, expected } = record as { alias: string; input: unknown; expected: boolean };
		t.equal(is(alias as never)(input), expected, `is('${alias}')(${String(input)}) is ${expected}`);
	});

	t.end();
});

test('Domain/BSON - is() by numeric id', (t) => {
	each`
		id   | input           | expected
		-----|-----------------|----------
		${1} | ${3.14}         | ${true}
		${1} | ${42}           | ${false}
		${16}| ${42}           | ${true}
		${16}| ${UNSAFE_INT}   | ${false}
		${18}| ${UNSAFE_INT}   | ${true}
		${18}| ${BigInt(1)}    | ${true}
		${18}| ${42}           | ${false}
		${8} | ${true}         | ${true}
		${10}| ${null}         | ${true}
		${11}| ${/x/}          | ${true}
	`((record) => {
		const { id, input, expected } = record as { id: number; input: unknown; expected: boolean };
		t.equal(is(id)(input), expected, `is(${id})(${String(input)}) is ${expected}`);
	});

	t.end();
});

test('Domain/BSON - is() with multiple types', (t) => {
	const isNumeric = is('int', 'double', 'long');
	const isIntOrLong = is('int', 'long');

	t.equal(isNumeric(42),         true,  'int matches isNumeric');
	t.equal(isNumeric(3.14),       true,  'double matches isNumeric');
	t.equal(isNumeric(UNSAFE_INT), true,  'long matches isNumeric');
	t.equal(isNumeric('hello'),    false, 'string does not match isNumeric');
	t.equal(isIntOrLong(42),       true,  'int matches isIntOrLong');
	t.equal(isIntOrLong(UNSAFE_INT), true, 'long matches isIntOrLong');
	t.equal(isIntOrLong(3.14),     false, 'double does not match isIntOrLong');

	t.end();
});

test('Domain/BSON - common exports', (t) => {
	t.equal(isArray([]),        true,  'isArray([])');
	t.equal(isArray({}),        false, 'isArray({})');
	t.equal(isObject({}),       true,  'isObject({})');
	t.equal(isObject([]),       false, 'isObject([])');
	t.equal(isObject(null),     false, 'isObject(null)');
	t.equal(isUndefined(undefined), true,  'isUndefined(undefined)');
	t.equal(isUndefined(null),      false, 'isUndefined(null)');
	t.equal(isNULL(null),       true,  'isNULL(null)');
	t.equal(isNULL(undefined),  false, 'isNULL(undefined)');
	t.equal(isRegex(/x/),       true,  'isRegex(/x/)');
	t.equal(isRegex('x'),       false, 'isRegex("x")');
	t.equal(isInteger(42),      true,  'isInteger(42)');
	t.equal(isInteger(3.14),    false, 'isInteger(3.14)');
	t.equal(isInteger(UNSAFE_INT), false, 'isInteger(unsafe int) — unsafe integers are long, not int');

	t.end();
});
