import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { compare, exported } from "../../../Test/helpers";
import * as Bitwise from "./Bitwise";

describe("Domain/Filter/Operator/Bitwise", () => {
	it("exports", exported(Bitwise, [
			"$bitsAllClear",
			"$bitsAllSet",
			"$bitsAnyClear",
			"$bitsAnySet",
	]));

	describe("$bitsAllClear", () => {
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
			${[2, 100]}         | ${4}  | no
			${[2, 100]}         | ${0}  | yes
			${[2, 100]}         | ${-5} | no
			${[2, 100]}         | ${-4} | no
			${[2147483647]}     | ${4}  | yes
			${[2147483647]}     | ${0}  | yes
			${[2147483647]}     | ${-5} | no
			${[2147483647]}     | ${-4} | no
		`(compare(Bitwise.$bitsAllClear));
	});

	describe("$bitsAllSet", () => {
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
			${[2, 100]}         | ${4}  | no
			${[2, 100]}         | ${0}  | no
			${[2, 100]}         | ${-5} | no
			${[2, 100]}         | ${-4} | yes
			${[2147483647]}     | ${4}  | no
			${[2147483647]}     | ${0}  | no
			${[2147483647]}     | ${-5} | yes
			${[2147483647]}     | ${-4} | yes
		`(compare(Bitwise.$bitsAllSet));
	});

	describe("$bitsAnyClear", () => {
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
			${[2, 100]}         | ${4}  | yes
			${[2, 100]}         | ${0}  | yes
			${[2, 100]}         | ${-5} | yes
			${[2, 100]}         | ${-4} | no
			${[2147483647]}     | ${4}  | yes
			${[2147483647]}     | ${0}  | yes
			${[2147483647]}     | ${-5} | no
			${[2147483647]}     | ${-4} | no
		`(compare(Bitwise.$bitsAnyClear));
	});

	describe("$bitsAnySet", () => {
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
			${[2, 100]}         | ${4}  | yes
			${[2, 100]}         | ${0}  | no
			${[2, 100]}         | ${-5} | yes
			${[2, 100]}         | ${-4} | yes
			${[2147483647]}     | ${4}  | no
			${[2147483647]}     | ${0}  | no
			${[2147483647]}     | ${-5} | yes
			${[2147483647]}     | ${-4} | yes
		`(compare(Bitwise.$bitsAnySet));
	});

	it("rejects a bit position beyond INT32_MAX", () => {
		assert.throws(
			() => Bitwise.$bitsAllClear([2147483648]),
			/Cannot represent 0: 2147483648 in an int/,
			"$bitsAllClear rejects a position beyond INT32_MAX",
		);
		assert.doesNotThrow(
			() => Bitwise.$bitsAllClear([2147483647]),
			"$bitsAllClear accepts INT32_MAX itself",
		);
	});
});
