import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { compare, pretty } from "../../../Test/helpers";
import * as Element from "./Element";

describe("Domain/Filter/Operator/Element", () => {
	it("exports", () => {
		const expected = ["$exists", "$type"];
		const actual = Object.keys(Element);

		assert.equal(
			actual.length,
			expected.length,
			`contains ${expected.length} keys`,
		);
		expected.forEach((key) => {
			assert.equal(
				typeof Element[<keyof typeof Element>key],
				"function",
				`contains function ${key}`,
			);
		});
	});

	describe("$exists", () => {
		each`
			query    | input         | matches
			---------|---------------|---------
			${true}  | ${"1"}        | yes
			${true}  | ${1}          | yes
			${true}  | ${[1, 2]}     | yes
			${true}  | ${{ one: 1 }} | yes
			${true}  | ${new Date()} | yes
			${true}  | ${/regex/}    | yes
			${true}  | ${true}       | yes
			${true}  | ${false}      | yes
			${true}  | ${undefined}  | no
			${true}  | ${null}       | yes
			${false} | ${"1"}        | no
			${false} | ${1}          | no
			${false} | ${[1, 2]}     | no
			${false} | ${{ one: 1 }} | no
			${false} | ${new Date()} | no
			${false} | ${/regex/}    | no
			${false} | ${true}       | no
			${false} | ${false}      | no
			${false} | ${undefined}  | yes
			${false} | ${null}       | no
		`(compare(Element.$exists));
	});

	describe("$type", () => {
		// Each alias is checked four ways: alias, BSON code, it being excluded
		// when every other alias is present, and it being included once its
		// own alias rejoins the list
		const types: Record<string, number> = {
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
		const cases: Array<[string, unknown]> = [
			["double", 1.2],
			["string", "string"],
			["object", { one: 1 }],
			["array", [1, 2]],
			["undefined", undefined],
			["bool", true],
			["date", new Date()],
			["null", null],
			["regex", /regex/],
			["javascript", () => {}],
			["symbol", Symbol()],
			["int", 123],
			["long", BigInt(12345678900987654321)],
		];

		// pretty() throws on bigint and stringifies symbol/function to
		// "undefined" — none of which are meaningful in a test title anyway.
		function label(value: unknown): string {
			if (typeof value === "symbol") return "Symbol";
			if (typeof value === "bigint") return `BigInt(${value})`;
			if (typeof value === "function") return "Function";
			return pretty(value);
		}

		for (const [alias, input] of cases) {
			const number = types[alias];
			const never = keys.filter((key) => key !== alias);
			const always = never.concat(alias);

			it(`${label(input)} is ${alias}`, () => {
				assert.equal(Element.$type(alias)(input), true);
			});
			it(`${label(input)} is ${number}`, () => {
				assert.equal(Element.$type(number)(input), true);
			});
			// $type examines array elements too
			if (alias !== "array") {
				it(`${label(input)} is not in ${pretty(never)}`, () => {
					assert.equal(Element.$type(never)(input), false);
				});
			}
			it(`${label(input)} is in ${pretty(always)}`, () => {
				assert.equal(Element.$type(always)(input), true);
			});
		}
	});
});
