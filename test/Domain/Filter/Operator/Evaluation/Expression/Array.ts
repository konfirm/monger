import type { TestRecord } from '../Expression';
// import * as test from 'tape';
// import * as Array from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Array';
// import { resolve } from './Helper';

export const data: Array<TestRecord> = [
	{
		operator: '$arrayElemAt',
		query: ['$list', '$index'],
		tests: [
			{ output: null },
			{ output: null, list: null },
			{ output: null, list: null, index: null },
			{ output: null, list: null, index: 1 },
			{ output: null, list: null, index: -1 },

			{ output: undefined, list: [], index: 1 },
			{ output: undefined, list: [], index: -1 },

			{ output: 'abc', list: ['abc', 'def', 'ghi', 'jkl'], index: 0 },
			{ output: 'def', list: ['abc', 'def', 'ghi', 'jkl'], index: 1 },
			{ output: 'jkl', list: ['abc', 'def', 'ghi', 'jkl'], index: -1 },
			{ output: undefined, list: ['abc', 'def', 'ghi', 'jkl'], index: 10 },
			{ output: undefined, list: ['abc', 'def', 'ghi', 'jkl'], index: -10 },
		],
	},
	{
		operator: '$arrayElemAt',
		query: [[1, 2, 3, 4], '$index'],
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
		operator: '$arrayElemAt',
		query: ['$list', 1],
		tests: [
			{ output: null },
			{ output: null, list: null },

			{ output: undefined, list: [] },

			{ output: 'def', list: ['abc', 'def', 'ghi', 'jkl'] },
			{ output: 'ghi', list: ['def', 'ghi', 'jkl', 'abc'] },
		],
	},
];
