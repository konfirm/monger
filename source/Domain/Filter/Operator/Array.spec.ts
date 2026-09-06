import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { compare, exported } from "../../../Test/helpers";
import { filter } from "../../Filter";
import * as ArrayOp from "./Array";

describe("Domain/Filter/Operator/Array", () => {
	it('exports', exported(ArrayOp, [
		"$all",
		"$elemMatch",
		"$size",
	]));

	describe("$all", () => {
		// $all can compile { $elemMatch: ... } clauses, same reasoning as
		// $elemMatch itself above.
		const $all = (query: never) => ArrayOp.$all(query, filter);

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
			${[]}                       | ${[1, 2]}                               | no
			${[{ $elemMatch: { $gte: 10, $lt: 20 } }]}                    | ${[5, 15, 25]} | yes
			${[{ $elemMatch: { $gte: 10, $lt: 20 } }]}                    | ${[5, 25]}     | no
			${[{ $elemMatch: { $gte: 10 } }, { $elemMatch: { $lt: 5 } }]} | ${[15, 2]}     | yes
			${[{ $elemMatch: { $gte: 10 } }, { $elemMatch: { $lt: 5 } }]} | ${[15]}        | no
		`(compare($all));

		it("rejects mixing plain values with $elemMatch clauses", () => {
			assert.throws(
				() => ArrayOp.$all([9, { $elemMatch: { attempts: 11 } }], filter),
				/no \$ expressions in \$all/,
				"$all rejects mixing styles",
			);
		});

		it("rejects a non-object $elemMatch value", () => {
			assert.throws(
				() => ArrayOp.$all([{ $elemMatch: 42 }], filter),
				/\$elemMatch needs an Object/,
				"$all rejects a malformed $elemMatch clause",
			);
		});
	});

	describe("$elemMatch", () => {
		// $elemMatch needs to compile its own sub-query (e.g. {$gte, $lt}
		// together) — reusing the real filter() as the compile step is both
		// the simplest source of one and how it's actually used in practice.
		const $elemMatch = (query: never) => ArrayOp.$elemMatch(query, filter);

		each`
			query                    | input          | matches
			-------------------------|----------------|---------
			${{ $gte: 10, $lt: 20 }} | ${[5, 15, 25]} | yes
			${{ $gte: 10, $lt: 20 }} | ${[15, 25]}    | yes
			${{ $gte: 10, $lt: 20 }} | ${[5, 25]}     | no
			${{ $gte: 10, $lt: 20 }} | ${[5, 15]}     | yes
			${{ $gte: 10, $lt: 20 }} | ${[15]}        | yes
			${{ $gte: 10, $lt: 20 }} | ${[5]}         | no
		`(compare($elemMatch));

		it("rejects a non-object query", () => {
			assert.throws(
				() => ArrayOp.$elemMatch(42 as never, filter),
				/\$elemMatch needs an Object/,
				"$elemMatch rejects a non-object query",
			);
		});

		it("rejects $where", () => {
			assert.throws(
				() => ArrayOp.$elemMatch({ $where: "this" } as never, filter),
				/\$where can only be applied to the top-level document/,
				"$elemMatch rejects $where",
			);
		});

		it("rejects $where nested inside $and", () => {
			assert.throws(
				() => ArrayOp.$elemMatch({ $and: [{ rank: 9 }, { $where: "this" }] } as never, filter),
				/\$where can only be applied to the top-level document/,
				"$elemMatch rejects $where nested inside $and",
			);
		});

		it("rejects $text", () => {
			assert.throws(
				() => ArrayOp.$elemMatch({ $text: { $search: "foo" } } as never, filter),
				/\$text can only be applied to the top-level document/,
				"$elemMatch rejects $text",
			);
		});

		it("rejects $expr", () => {
			assert.throws(
				() => ArrayOp.$elemMatch({ $expr: { $eq: ["$a", "$b"] } } as never, filter),
				/\$expr can only be applied to the top-level document/,
				"$elemMatch rejects $expr",
			);
		});
	});

	describe("$size", () => {
		each`
			query | input     | matches
			------|-----------|---------
			${1}  | ${[2]}    | yes
			${1}  | ${[1, 2]} | no
			${2}  | ${[1, 2]} | yes
			${3}  | ${"foo"}  | no
		`(compare(ArrayOp.$size));

		it("rejects an invalid size argument", () => {
			assert.throws(
				() => ArrayOp.$size(-1),
				/Expected a non-negative number in: \$size: -1/,
				"$size rejects a negative number",
			);
			assert.throws(
				() => ArrayOp.$size(2.5),
				/Expected an integer: \$size: 2.5/,
				"$size rejects a non-integer number",
			);
			assert.throws(
				() => ArrayOp.$size("value" as never),
				/Expected a number in: \$size: value/,
				"$size rejects a non-numeric value",
			);
		});
	});
});
