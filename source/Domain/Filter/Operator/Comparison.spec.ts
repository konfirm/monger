import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { compare } from "../../../Test/helpers";
import * as Comparison from "./Comparison";

describe("Domain/Filter/Operator/Comparison", () => {
	it("exports", () => {
		const expected = [
			"$eq",
			"$gt",
			"$gte",
			"$in",
			"$lt",
			"$lte",
			"$ne",
			"$nin",
		];
		const actual = Object.keys(Comparison);

		assert.equal(
			actual.length,
			expected.length,
			`contains ${expected.length} keys`,
		);
		expected.forEach((key) => {
			assert.equal(
				typeof Comparison[<keyof typeof Comparison>key],
				"function",
				`contains function ${key}`,
			);
		});
	});

	describe("$eq", () => {
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
			${{ foo: "bar" }}             | ${{ foo: "bar" }}             | yes
			${{ foo: "bar", bar: "baz" }} | ${{ foo: "bar", bar: "baz" }} | yes
			${{ foo: "bar", bar: "baz" }} | ${{ bar: "baz", foo: "bar" }} | no
			${/^bar/}                     | ${"bar"}                      | no
			${/^bar/}                     | ${"barry"}                    | no
			${/^bar/}                     | ${"Barry"}                    | no
			${/^bar/i}                    | ${"Barry"}                    | no
			${/^bar$/}                    | ${"Barry"}                    | no
			${/^bar$/i}                   | ${"Barry"}                    | no
		`(compare(Comparison.$eq));
	});

	describe("$ne", () => {
		each`
			query                         | input                         | matches
			------------------------------|-------------------------------|---------
			${true}                       | ${true}                       | no
			${true}                       | ${false}                      | yes
			${false}                      | ${true}                       | yes
			${false}                      | ${false}                      | no
			string                        | stri                          | yes
			string                        | string                        | no
			string                        | stringed                      | yes
			${1}                          | ${0}                          | yes
			${1}                          | ${1}                          | no
			${1}                          | ${2}                          | yes
			${[1, 2]}                     | ${[1, 2]}                     | no
			${[1, 2]}                     | ${[1, 2, 3]}                  | yes
			${[1, 2, 3]}                  | ${[1, 2]}                     | yes
			${[1, 2, 3]}                  | ${[1, 3, 2]}                  | yes
			${{ foo: "bar" }}             | ${{ foo: "bar" }}             | no
			${{ foo: "bar", bar: "baz" }} | ${{ foo: "bar", bar: "baz" }} | no
			${{ foo: "bar", bar: "baz" }} | ${{ bar: "baz", foo: "bar" }} | yes
		`(compare(Comparison.$ne));

		it("rejects RegExp", () => {
			const { $ne } = Comparison;

			assert.throws(
				() => $ne(/^bar/ as unknown as Comparison.Operation["$ne"]),
				/Can't have regex as arg to \$ne/,
				"$ne rejects a RegExp operand",
			);
		});
	});

	describe("$gt", () => {
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
		`(compare(Comparison.$gt));
	});

	describe("$gte", () => {
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
		`(compare(Comparison.$gte));
	});

	describe("$lt", () => {
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
		`(compare(Comparison.$lt));
	});

	describe("$lte", () => {
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
		`(compare(Comparison.$lte));
	});

	describe("$in", () => {
		each`
			query             | input    | matches
			------------------|----------|---------
			${[1, 2, 3]}      | ${0}     | no
			${[1, 2, 3]}      | ${1}     | yes
			${[1, 2, 3]}      | ${2}     | yes
			${[1, 2, 3]}      | ${3}     | yes
			${[1, 2, 3]}      | ${4}     | no
			${["foo", "bar"]} | foo      | yes
			${["foo", "bar"]} | bar      | yes
			${["foo", "bar"]} | baz      | no
			${[true]}         | ${true}  | yes
			${[true]}         | ${false} | no
			${[false]}        | ${true}  | no
			${[false]}        | ${false} | yes
			${[true, false]}  | ${false} | yes
			${[true, false]}  | ${true}  | yes
			${[/foo/, /^ba/]} | foo      | yes
			${[/foo/, /^ba/]} | goo      | no
			${[/foo/, /^ba/]} | bar      | yes
			${[/foo/, /^ba/]} | baz      | yes
		`(compare(Comparison.$in));
	});

	describe("$nin", () => {
		each`
			query             | input    | matches
			------------------|----------|---------
			${[1, 2, 3]}      | ${0}     | yes
			${[1, 2, 3]}      | ${1}     | no
			${[1, 2, 3]}      | ${2}     | no
			${[1, 2, 3]}      | ${3}     | no
			${[1, 2, 3]}      | ${4}     | yes
			${["foo", "bar"]} | foo      | no
			${["foo", "bar"]} | bar      | no
			${["foo", "bar"]} | baz      | yes
			${[true]}         | ${true}  | no
			${[true]}         | ${false} | yes
			${[false]}        | ${true}  | yes
			${[false]}        | ${false} | no
			${[true, false]}  | ${false} | no
			${[true, false]}  | ${true}  | no
			${[/foo/, /^ba/]} | foo      | no
			${[/foo/, /^ba/]} | goo      | yes
			${[/foo/, /^ba/]} | bar      | no
			${[/foo/, /^ba/]} | baz      | no
		`(compare(Comparison.$nin));
	});
});
