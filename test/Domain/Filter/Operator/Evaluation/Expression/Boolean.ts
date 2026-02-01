import type { TestRecord } from '../Expression';
import * as Boolean from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Boolean';

export const data: Array<TestRecord> = [
	// $and - returns true only when all expressions are true
	{
		operator: '$and',
		query: [true, true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$and',
		query: [true, false],
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$and',
		query: [false, true],
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$and',
		query: [false, false],
		tests: [
			{ output: false },
		],
	},
	// $and with multiple expressions
	{
		operator: '$and',
		query: [true, true, true, true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$and',
		query: [true, true, false, true],
		tests: [
			{ output: false },
		],
	},
	// $and with single expression
	{
		operator: '$and',
		query: [true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$and',
		query: [false],
		tests: [
			{ output: false },
		],
	},
	// $and with truthy/falsy values (MongoDB style)
	{
		operator: '$and',
		query: [1, 'hello', [1, 2], { a: 1 }],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$and',
		query: [1, 0, 'hello'],  // 0 is falsy
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$and',
		query: ['', 1, 2],  // empty string is falsy
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$and',
		query: [null, 1, 2],  // null is falsy
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$and',
		query: [undefined, 1, 2],  // undefined is falsy
		tests: [
			{ output: false },
		],
	},
	// $and with empty array
	{
		operator: '$and',
		query: [],
		tests: [
			{ output: true },  // empty array returns true (vacuous truth)
		],
	},
	// $or - returns true when any expression is true
	{
		operator: '$or',
		query: [true, true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [true, false],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [false, true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [false, false],
		tests: [
			{ output: false },
		],
	},
	// $or with multiple expressions
	{
		operator: '$or',
		query: [false, false, true, false],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [false, false, false, false],
		tests: [
			{ output: false },
		],
	},
	// $or with single expression
	{
		operator: '$or',
		query: [true],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [false],
		tests: [
			{ output: false },
		],
	},
	// $or with truthy/falsy values (MongoDB style)
	{
		operator: '$or',
		query: [0, '', null, 1],  // 1 is truthy
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$or',
		query: [0, '', null, undefined],  // all falsy
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$or',
		query: ['hello', 0, null],  // 'hello' is truthy
		tests: [
			{ output: true },
		],
	},
	// $or with empty array
	{
		operator: '$or',
		query: [],
		tests: [
			{ output: false },  // empty array returns false
		],
	},
	// $not - returns the opposite boolean value
	{
		operator: '$not',
		query: true,
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$not',
		query: false,
		tests: [
			{ output: true },
		],
	},
	// $not with truthy/falsy values
	{
		operator: '$not',
		query: 1,
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$not',
		query: 0,
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$not',
		query: 'hello',
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$not',
		query: '',
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$not',
		query: null,
		tests: [
			{ output: true },
		],
	},

	{
		operator: '$not',
		query: [1, 2, 3],
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$not',
		query: [],
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$not',
		query: { a: 1 },
		tests: [
			{ output: false },
		],
	},
	// Boolean operators with field references
	{
		operator: '$and',
		query: [{ $gt: ['$value', 10] }, { $lt: ['$value', 100] }],
		tests: [
			{ output: true, value: 50 },
			{ output: false, value: 5 },
			{ output: false, value: 150 },
		],
	},
	{
		operator: '$or',
		query: [{ $lt: ['$value', 10] }, { $gt: ['$value', 100] }],
		tests: [
			{ output: true, value: 5 },
			{ output: true, value: 150 },
			{ output: false, value: 50 },
		],
	},
	{
		operator: '$not',
		query: { $eq: ['$value', 42] },
		tests: [
			{ output: false, value: 42 },
			{ output: true, value: 41 },
		],
	},
	// Complex nested expressions
	{
		operator: '$and',
		query: [
			{ $or: [{ $eq: ['$value.status', 'active'] }, { $eq: ['$value.status', 'pending'] }] },
			{ $gt: ['$value.score', 50] }
		],
		tests: [
			{ output: true, value: { status: 'active', score: 75 } },
			{ output: true, value: { status: 'pending', score: 60 } },
			{ output: false, value: { status: 'inactive', score: 75 } },
			{ output: false, value: { status: 'active', score: 30 } },
		],
	},
	// $isArray - checks if expression evaluates to an array
	{
		operator: '$isArray',
		query: [1, 2, 3],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$isArray',
		query: [],
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$isArray',
		query: 'not an array',
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$isArray',
		query: 123,
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$isArray',
		query: { a: 1 },
		tests: [
			{ output: false },
		],
	},
	{
		operator: '$isArray',
		query: null,
		tests: [
			{ output: false },
		],
	},
	// $isArray with undefined (error case tested below)
	{
		operator: '$isArray',
		query: true,
		tests: [
			{ output: false },
		],
	},
	// $isArray with field references
	{
		operator: '$isArray',
		query: '$value.items',
		tests: [
			{ output: true, value: { items: [1, 2, 3] } },
			{ output: true, value: { items: [] } },
			{ output: false, value: { items: 'string' } },
			{ output: false, value: { items: 42 } },
			{ output: false, value: { items: { a: 1 } } },
			{ output: false, value: { items: null } },
			{ output: false, value: {} },  // undefined field
		],
	},
	// $isArray with nested expressions
	{
		operator: '$isArray',
		query: { $cond: { if: true, then: [1, 2, 3], else: 'not-array' } },
		tests: [
			{ output: true },
		],
	},
	{
		operator: '$isArray',
		query: { $cond: { if: false, then: [1, 2, 3], else: 'not-array' } },
		tests: [
			{ output: false },
		],
	},
	// UNHAPPY PATH TESTS - validation errors
	// $and with non-array
	{
		operator: '$and',
		query: true,
		tests: [
			{ error: /must be an array/ },
		],
	},
	{
		operator: '$and',
		query: { field: 'value' },
		tests: [
			{ error: /must be an array/ },
		],
	},
	{
		operator: '$and',
		query: 'not-an-array',
		tests: [
			{ error: /must be an array/ },
		],
	},
	// $or with non-array
	{
		operator: '$or',
		query: true,
		tests: [
			{ error: /must be an array/ },
		],
	},
	{
		operator: '$or',
		query: { field: 'value' },
		tests: [
			{ error: /must be an array/ },
		],
	},
	{
		operator: '$or',
		query: 'not-an-array',
		tests: [
			{ error: /must be an array/ },
		],
	},
	// $not with undefined
	{
		operator: '$not',
		query: undefined,
		tests: [
			{ error: /must have an expression/ },
		],
	},
	// $isArray with undefined
	{
		operator: '$isArray',
		query: undefined,
		tests: [
			{ error: /must have an expression/ },
		],
	},
];
