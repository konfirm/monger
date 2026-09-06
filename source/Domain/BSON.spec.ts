import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { exported, pretty } from "../Test/helpers";
import * as BSON from "./BSON";

const UNSAFE_INT = Number.MAX_SAFE_INTEGER + 1;

describe("Domain/BSON", () => {
	it("exports", exported(BSON, [
		"isBSONID",
		"isBSONAlias",
		"type",
		"is",
		"isArray",
		"isObject",
		"isUndefined",
		"isDate",
		"isNULL",
		"isRegex",
		"isInteger",
		"isNumber",
		"isContainer",
	]));

	describe("type", () => {
		each`
			input                      | expected
			---------------------------|----------
			${3.14}                    | double
			${-3.14}                   | double
			${0.1}                     | double
			${NaN}                     | double
			${Infinity}                | double
			${-Infinity}               | double
			${0}                       | int
			${1}                       | int
			${-1}                      | int
			${42}                      | int
			${2147483647}              | int
			${-2147483648}             | int
			${Number.MAX_SAFE_INTEGER} | double
			${Number.MIN_SAFE_INTEGER} | double
			${UNSAFE_INT}              | double
			${-UNSAFE_INT}             | double
			${BigInt(0)}               | long
			${BigInt(1)}               | long
			${BigInt(-1)}              | long
			${''}                      | string
			hello                      | string
			${{}}                      | object
			${{ a: 1 }}                | object
			${[]}                      | array
			${[1, 2, 3]}               | array
			${undefined}               | undefined
			${true}                    | bool
			${false}                   | bool
			${new Date()}              | date
			${null}                    | null
			${/regex/}                 | regex
			${/regex/gi}               | regex
		`(({ input, expected }: Record<string, unknown>) => {
			it(`${pretty(input)} is ${expected}`, () => {
				assert.equal(BSON.type(input), expected);
			});
		});

		it("Function is javascript", () => {
			assert.equal(BSON.type(() => {}), "javascript");
		});
		it("Symbol is symbol", () => {
			assert.equal(BSON.type(Symbol()), "symbol");
		});
	});

	describe("is", () => {
		describe("by alias", () => {
			each`
				alias     | input           | expected
				----------|-----------------|---------
				double    | ${3.14}         | yes
				double    | ${42}           | no
				int       | ${42}           | yes
				int       | ${3.14}         | no
				int       | ${UNSAFE_INT}   | no
				long      | ${UNSAFE_INT}   | no
				long      | ${-UNSAFE_INT}  | no
				long      | ${BigInt(1)}    | yes
				long      | ${42}           | no
				string    | hello           | yes
				string    | ${42}           | no
				object    | ${{}}           | yes
				object    | ${[]}           | no
				object    | ${null}         | no
				array     | ${[]}           | yes
				array     | ${{}}           | no
				undefined | ${undefined}    | yes
				undefined | ${null}         | no
				bool      | ${true}         | yes
				bool      | ${false}        | yes
				bool      | ${1}            | no
				date      | ${new Date()}   | yes
				date      | 2020-01-01      | no
				null      | ${null}         | yes
				null      | ${undefined}    | no
				regex     | ${/x/}          | yes
				regex     | x               | no
			`(({ alias, input, expected }: Record<string, unknown>) => {
				const matches = expected === "yes";

				it(`is('${alias}')(${pretty(input)}) is ${matches}`, () => {
					assert.equal(BSON.is(alias as never)(input), matches);
				});
			});
		});

		describe("by numeric id", () => {
			each`
				id     | input         | expected
				-------|---------------|---------
				${1}   | ${3.14}       | yes
				${1}   | ${42}         | no
				${16}  | ${42}         | yes
				${16}  | ${UNSAFE_INT} | no
				${18}  | ${UNSAFE_INT} | no
				${18}  | ${BigInt(1)}  | yes
				${18}  | ${42}         | no
				${8}   | ${true}       | yes
				${10}  | ${null}       | yes
				${11}  | ${/x/}        | yes
			`(({ id, input, expected }: Record<string, unknown>) => {
				const matches = expected === "yes";

				it(`is(${id})(${pretty(input)}) is ${matches}`, () => {
					assert.equal(BSON.is(id as never)(input), matches);
				});
			});
		});

		describe("with multiple types", () => {
			const isNumeric = BSON.is("int", "double", "long");
			const isIntOrLong = BSON.is("int", "long");

			it("int matches isNumeric", () => assert.equal(isNumeric(42), true));
			it("double matches isNumeric", () => assert.equal(isNumeric(3.14), true));
			it("long (bigint) matches isNumeric", () => assert.equal(isNumeric(BigInt(1)), true));
			it("string does not match isNumeric", () => assert.equal(isNumeric("hello"), false));
			it("int matches isIntOrLong", () => assert.equal(isIntOrLong(42), true));
			it("long (bigint) matches isIntOrLong", () => assert.equal(isIntOrLong(BigInt(1)), true));
			it("double does not match isIntOrLong", () => assert.equal(isIntOrLong(3.14), false));
		});
	});

	describe("isBSONID / isBSONAlias", () => {
		it("isBSONID accepts every registered id", () => {
			assert.equal(BSON.isBSONID(1, 2, 3, 4, 6, 8, 9, 10, 11, 13, 14, 16, 18, -1, 127), true);
		});
		it("isBSONID rejects an unregistered id", () => {
			assert.equal(BSON.isBSONID(9999), false);
		});
		it("isBSONAlias accepts every registered alias", () => {
			assert.equal(BSON.isBSONAlias("double", "string", "object", "array", "int", "long"), true);
		});
		it("isBSONAlias rejects an unknown alias", () => {
			assert.equal(BSON.isBSONAlias("not-a-real-alias"), false);
		});
	});

	describe("common exports", () => {
		it("isArray([])", () => assert.equal(BSON.isArray([]), true));
		it("isArray({})", () => assert.equal(BSON.isArray({}), false));
		it("isObject({})", () => assert.equal(BSON.isObject({}), true));
		it("isObject([])", () => assert.equal(BSON.isObject([]), false));
		it("isObject(null)", () => assert.equal(BSON.isObject(null), false));
		it("isUndefined(undefined)", () => assert.equal(BSON.isUndefined(undefined), true));
		it("isUndefined(null)", () => assert.equal(BSON.isUndefined(null), false));
		it("isDate(new Date())", () => assert.equal(BSON.isDate(new Date()), true));
		it("isDate(string)", () => assert.equal(BSON.isDate("2020-01-01"), false));
		it("isNULL(null)", () => assert.equal(BSON.isNULL(null), true));
		it("isNULL(undefined)", () => assert.equal(BSON.isNULL(undefined), false));
		it("isRegex(/x/)", () => assert.equal(BSON.isRegex(/x/), true));
		it("isRegex('x')", () => assert.equal(BSON.isRegex("x"), false));
		it("isInteger(42)", () => assert.equal(BSON.isInteger(42), true));
		it("isInteger(3.14)", () => assert.equal(BSON.isInteger(3.14), false));
		it("isInteger(unsafe int) — unsafe integers are double, not int", () => assert.equal(BSON.isInteger(UNSAFE_INT), false));
		it("isNumber(42) — int", () => assert.equal(BSON.isNumber(42), true));
		it("isNumber(3.14) — double", () => assert.equal(BSON.isNumber(3.14), true));
		it("isNumber(BigInt(1)) — long", () => assert.equal(BSON.isNumber(BigInt(1)), true));
		it("isNumber('42') — string is not a number", () => assert.equal(BSON.isNumber("42"), false));
		it("isContainer({})", () => assert.equal(BSON.isContainer({}), true));
		it("isContainer([])", () => assert.equal(BSON.isContainer([]), true));
		it("isContainer(42)", () => assert.equal(BSON.isContainer(42), false));
	});
});
