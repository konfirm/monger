import type { TestRecord } from '../Expression';
import * as Conditional from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Conditional';

export const data: Array<TestRecord> = [
	// $cond with object syntax: { if: <condition>, then: <value>, else: <value> }
	{
		operator: '$cond',
		query: { if: true, then: 'yes', else: 'no' },
		tests: [
			{ output: 'yes' },
		],
	},
	{
		operator: '$cond',
		query: { if: false, then: 'yes', else: 'no' },
		tests: [
			{ output: 'no' },
		],
	},
	// $cond with array syntax: [ <condition>, <true-case>, <false-case> ]
	{
		operator: '$cond',
		query: [true, 'yes', 'no'],
		tests: [
			{ output: 'yes' },
		],
	},
	{
		operator: '$cond',
		query: [false, 'yes', 'no'],
		tests: [
			{ output: 'no' },
		],
	},
	// $cond with truthy/falsy values
	{
		operator: '$cond',
		query: { if: 1, then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'truthy' },
		],
	},
	{
		operator: '$cond',
		query: { if: 0, then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'falsy' },
		],
	},
	{
		operator: '$cond',
		query: { if: '', then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'falsy' },
		],
	},
	{
		operator: '$cond',
		query: { if: 'hello', then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'truthy' },
		],
	},
	{
		operator: '$cond',
		query: { if: null, then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'falsy' },
		],
	},
	{
		operator: '$cond',
		query: { if: undefined, then: 'truthy', else: 'falsy' },
		tests: [
			{ output: 'falsy' },
		],
	},
	// $cond with different return types
	{
		operator: '$cond',
		query: { if: true, then: 42, else: 0 },
		tests: [
			{ output: 42 },
		],
	},
	{
		operator: '$cond',
		query: { if: true, then: { success: true }, else: { success: false } },
		tests: [
			{ output: { success: true } },
		],
	},
	{
		operator: '$cond',
		query: { if: true, then: [1, 2, 3], else: [] },
		tests: [
			{ output: [1, 2, 3] },
		],
	},
	// $cond with array syntax and various types
	{
		operator: '$cond',
		query: [1, 'true-branch', 'false-branch'],
		tests: [
			{ output: 'true-branch' },
		],
	},
	{
		operator: '$cond',
		query: [0, 'true-branch', 'false-branch'],
		tests: [
			{ output: 'false-branch' },
		],
	},
	{
		operator: '$cond',
		query: ['non-empty', 'true-branch', 'false-branch'],
		tests: [
			{ output: 'true-branch' },
		],
	},
	{
		operator: '$cond',
		query: ['', 'true-branch', 'false-branch'],
		tests: [
			{ output: 'false-branch' },
		],
	},
	// $ifNull - returns first value if not null, otherwise second
	{
		operator: '$ifNull',
		query: ['$value', 'default'],
		tests: [
			{ output: 'hello', value: 'hello' },
			{ output: 'default', value: null },
			{ output: 'default', value: undefined },
			{ output: 0, value: 0 },
			{ output: '', value: '' },
			{ output: false, value: false },
		],
	},
	{
		operator: '$ifNull',
		query: ['$value', { fallback: true }],
		tests: [
			{ output: { existing: 'data' }, value: { existing: 'data' } },
			{ output: { fallback: true }, value: null },
		],
	},
	// $switch - case statement with multiple branches
	{
		operator: '$switch',
		query: {
			branches: [
				{ case: { $eq: ['$value', 'A'] }, then: 'Grade A' },
				{ case: { $eq: ['$value', 'B'] }, then: 'Grade B' },
				{ case: { $eq: ['$value', 'C'] }, then: 'Grade C' },
			],
			default: 'Other Grade',
		},
		tests: [
			{ output: 'Grade A', value: 'A' },
			{ output: 'Grade B', value: 'B' },
			{ output: 'Grade C', value: 'C' },
			{ output: 'Other Grade', value: 'D' },
			{ output: 'Other Grade', value: null },
		],
	},
	{
		operator: '$switch',
		query: {
			branches: [
				{ case: { $gt: ['$value', 90] }, then: 'Excellent' },
				{ case: { $gt: ['$value', 70] }, then: 'Good' },
				{ case: { $gt: ['$value', 50] }, then: 'Average' },
			],
			default: 'Poor',
		},
		tests: [
			{ output: 'Excellent', value: 95 },
			{ output: 'Good', value: 80 },
			{ output: 'Average', value: 60 },
			{ output: 'Poor', value: 40 },
		],
	},
	// Edge case: switch with no matching branches and no default
	{
		operator: '$switch',
		query: {
			branches: [
				{ case: false, then: 'never' },
			],
		},
		tests: [
			{ output: null },
		],
	},
	// UNHAPPY PATH TESTS - validation errors
	// $cond with wrong array length
	{
		operator: '$cond',
		query: [true, 'only-two'],
		tests: [
			{ error: /must have exactly 3 elements/ },
		],
	},
	{
		operator: '$cond',
		query: [true, 'yes', 'no', 'extra'],
		tests: [
			{ error: /must have exactly 3 elements/ },
		],
	},
	// $cond with wrong object structure (missing properties)
	{
		operator: '$cond',
		query: { if: true, then: 'yes' },  // missing else
		tests: [
			{ error: /must have if, then, and else properties/ },
		],
	},
	{
		operator: '$cond',
		query: { then: 'yes', else: 'no' },  // missing if
		tests: [
			{ error: /must have if, then, and else properties/ },
		],
	},
	// $cond with non-array, non-object
	{
		operator: '$cond',
		query: 'invalid-string',
		tests: [
			{ error: /should be \[condition, then, else\] or \{if: \.\.\., then: \.\.\., else: \.\.\.\}/ },
		],
	},
	{
		operator: '$cond',
		query: 42,
		tests: [
			{ error: /should be \[condition, then, else\] or \{if: \.\.\., then: \.\.\., else: \.\.\.\}/ },
		],
	},
	// $ifNull with wrong array length
	{
		operator: '$ifNull',
		query: ['only-one'],
		tests: [
			{ error: /must be an array with exactly 2 elements/ },
		],
	},
	{
		operator: '$ifNull',
		query: ['one', 'two', 'three'],
		tests: [
			{ error: /must be an array with exactly 2 elements/ },
		],
	},
	// $ifNull with non-array
	{
		operator: '$ifNull',
		query: 'not-an-array',
		tests: [
			{ error: /must be an array with exactly 2 elements/ },
		],
	},
	{
		operator: '$ifNull',
		query: { field: 'value' },
		tests: [
			{ error: /must be an array with exactly 2 elements/ },
		],
	},
	// $switch with invalid structure
	{
		operator: '$switch',
		query: {
			branches: [
				{ when: true, then: 'value' },  // wrong key: 'when' instead of 'case'
			],
		},
		tests: [
			{ error: /must be an object/ },
		],
	},
	{
		operator: '$switch',
		query: 'not-an-object',
		tests: [
			{ error: /must be an object/ },
		],
	},
	{
		operator: '$switch',
		query: {
			default: 'fallback',  // missing branches
		},
		tests: [
			{ error: /must be an object/ },
		],
	},
];
