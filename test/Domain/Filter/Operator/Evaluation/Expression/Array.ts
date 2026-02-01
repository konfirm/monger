import type { TestRecord } from "../Expression";
import * as test from "tape";
import * as ArrayOps from "../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Array";
import { resolve } from "./Helper";

export const data: Array<TestRecord> = [
	{
		operator: "$arrayElemAt",
		query: ["$list", "$index"],
		tests: [
			{ output: null },
			{ output: null, list: null },
			{ output: null, list: null, index: null },
			{ output: null, list: null, index: 1 },
			{ output: null, list: null, index: -1 },

			{ output: undefined, list: [], index: 1 },
			{ output: undefined, list: [], index: -1 },

			{ output: "abc", list: ["abc", "def", "ghi", "jkl"], index: 0 },
			{ output: "def", list: ["abc", "def", "ghi", "jkl"], index: 1 },
			{ output: "jkl", list: ["abc", "def", "ghi", "jkl"], index: -1 },
			{
				output: undefined,
				list: ["abc", "def", "ghi", "jkl"],
				index: 10,
			},
			{
				output: undefined,
				list: ["abc", "def", "ghi", "jkl"],
				index: -10,
			},
		],
	},
	{
		operator: "$arrayElemAt",
		query: [[1, 2, 3, 4], "$index"],
		tests: [
			{ output: null },
			{ output: null, index: null },

			{ output: 1, index: 0 },
			{ output: 2, index: 1 },
			{ output: 4, index: -1 },
			{ output: undefined, index: 10 },
			{ output: undefined, index: -10 },
		],
	},
	{
		operator: "$arrayElemAt",
		query: ["$list", 1],
		tests: [
			{ output: null },
			{ output: null, list: null },

			{ output: undefined, list: [] },

			{ output: "def", list: ["abc", "def", "ghi", "jkl"] },
			{ output: "ghi", list: ["def", "ghi", "jkl", "abc"] },
		],
	},
	{
		operator: "$arrayToObject",
		query: "$props",
		tests: [
			{ output: { key: false }, props: [["key", false]] },
			{
				output: { key: null },
				props: [
					["key", false],
					["key", null],
				],
			},
			{ output: { key: 1 }, props: [["key", 1]] },
			{
				output: { key: 3 },
				props: [
					["key", 1],
					["key", 2],
					["key", 3],
				],
			},
			{ output: { key: 1 }, props: [{ k: "key", v: 1 }] },
			{
				output: { key: 3 },
				props: [
					{ k: "key", v: 1 },
					{ k: "key", v: 2 },
					{ k: "key", v: 3 },
				],
			},
			{
				output: {},
				props: [],
			},
			{
				props: [["key"]],
				error: /\$arrayToObject requires an array of size 2 arrays, found array of size: 1/,
			},
			{
				error: /\$arrayToObject requires an array of size 2 arrays, found array of size: 3/,
				props: [["key", "value", "excess"]],
			},
			{
				error: /\$arrayToObject requires an array input, found: string/,
				props: "not an array",
			},
			{
				props: [{ k: "key" }],
				error: /\$arrayToObject requires an object keys of 'k' and 'v'\. Found incorrect number of keys:1/,
			},
			{
				error: /\$arrayToObject requires an object keys of 'k' and 'v'\. Found incorrect number of keys:1/,
				props: [{ key: "value" }],
			},
			{
				error: /\$arrayToObject requires a consistent input format\. Elements must all be arrays or all be objects. Array was detected, now found: object/,
				props: [["key", "value"], { k: "key2", v: "value" }],
			},
			{
				error: /\$arrayToObject requires a consistent input format\. Elements must all be arrays or all be objects. Object was detected, now found: array/,
				props: [{ k: "key2", v: "value" }, ["key", "value"]],
			},
		],
	},
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<
	keyof typeof ArrayOps
>;

operators.forEach((op) => {
	test(`Domain/Filter/Operator/Evaluation/Expression/Array - ${op}`, (t) => {
		t.equal(
			typeof ArrayOps[op],
			"function",
			`${op} is an exported function`,
		);

		data.filter(({ operator }) => operator === op).forEach(
			({ query, tests }: any) => {
				const compiled = (ArrayOps[op] as Function)(query, resolve);

				tests.forEach(({ output, error, ...input }: any) => {
					if (error) {
						t.throws(
							() => compiled(input),
							error,
							`{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} throws ${error}`,
						);
					} else {
						t.deepEqual(
							compiled(input),
							output,
							`{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} equals ${JSON.stringify(output)}`,
						);
					}
				});
			},
		);

		t.end();
	});
});
