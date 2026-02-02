/**
 * MongoDB Compatibility Tests
 * 
 * These tests use real test scenarios from MongoDB's official jstests,
 * captured and validated against MongoDB 7.0.8.
 * 
 * Source: mongo/jstests/aggregation/expressions/
 */

import * as test from 'tape';
import * as Expression from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression';
import { accessor } from '../../../../../../source/Domain/Field';

// Import test data files
import * as arrayToObjectTests from '../../../../../../test-data/compiled-ts/arrayToObject';
import * as concatArraysTests from '../../../../../../test-data/compiled-ts/concat_arrays';
import * as zipTests from '../../../../../../test-data/compiled-ts/zip';

const { expression } = Expression;

// Test data modules
const testModules = [
	arrayToObjectTests,
	concatArraysTests,
	zipTests,
];

// Helper to resolve $ references in queries
function resolveQuery(query: any, context: any): any {
	if (typeof query === 'string' && query.startsWith('$')) {
		return accessor(query.slice(1))(context);
	}
	if (Array.isArray(query)) {
		return query.map(item => resolveQuery(item, context));
	}
	if (query && typeof query === 'object') {
		const resolved: any = {};
		for (const [key, value] of Object.entries(query)) {
			resolved[key] = resolveQuery(value, context);
		}
		return resolved;
	}
	return query;
}

// Helper to run a single test case
function runTestCase(operator: string, testCase: any, t: any) {
	const { description, query, context, expected, error } = testCase;
	
	if (error) {
		// Handle error cases
		t.throws(() => {
			const resolvedQuery = resolveQuery(query[operator], context);
			const compiled = expression({ [operator]: resolvedQuery });
			return compiled(context);
		}, new RegExp(error), `${operator}: ${description} - should throw error`);
	} else {
		// Handle normal cases
		try {
			const resolvedQuery = resolveQuery(query[operator], context);
			const compiled = expression({ [operator]: resolvedQuery });
			
			// Run the expression against each expected document
			expected.forEach((expectedDoc: any) => {
				const inputDoc = { ...context, _id: expectedDoc._id };
				const actual = compiled(inputDoc);
				
				// Find the output field name (not _id)
				const outputField = Object.keys(expectedDoc).find(k => k !== '_id');
				if (outputField) {
					const expectedValue = expectedDoc[outputField];
					t.deepEqual(actual, expectedValue, 
						`${operator}: ${description} - input ${JSON.stringify(inputDoc)} should produce ${JSON.stringify(expectedValue)}`);
				}
			});
		} catch (err: any) {
			t.fail(`${operator}: ${description} - threw unexpected error: ${err.message}`);
		}
	}
}

// Run tests for each operator
testModules.forEach((testModule) => {
	const { operator, tests } = testModule;
	
	if (!operator || !tests) {
		return;
	}
	
	test(`MongoDB Compatibility - ${operator}`, (t) => {
		// Run each category of tests (happyPath, nullCases, etc.)
		Object.entries(tests).forEach(([category, testCases]: [string, any]) => {
			testCases.forEach((testCase: any) => {
				runTestCase(operator, testCase, t);
			});
		});
		t.end();
	});
});
