#!/usr/bin/env node
/**
 * Run MongoDB test cases against Monger
 * 
 * Usage: npx ts-node scripts/run-mongodb-tests.js <operator>
 * Example: npx ts-node scripts/run-mongodb-tests.js arrayToObject
 * 
 * For expression operators, use the expr- prefix:
 * Example: npx ts-node scripts/run-mongodb-tests.js expr-and
 */

const fs = require('fs');
const path = require('path');

// Import Monger's expression evaluator (compiled from TypeScript)
// We need to use ts-node to run TypeScript files directly
require('ts-node').register({
  transpileOnly: true,  // Skip type checking to avoid strict mode issues
  compilerOptions: {
    module: 'commonjs',
    target: 'es2015',
    strict: false
  }
});
const { expression } = require('../source/Domain/Filter/Operator/Evaluation/Expression');

const TEST_DATA_DIR = path.join(__dirname, '..', 'test-data');

/**
 * Format a value for display
 */
function formatValue(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Deep equality check
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (a === undefined || b === undefined) return a === b;
  if (typeof a !== typeof b) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}

/**
 * Run a single test case
 */
function runTest(operator, test, testType) {
  const { description, query, expected, context = {}, expectedError, error, errorExpected } = test;
  
  // Validate that query is present
  if (!query) {
    return {
      pass: false,
      description,
      reason: 'Test missing "query" field',
      expected: formatValue(expected),
      actual: 'undefined'
    };
  }
  
  // Check if we expect any kind of error
  const expectsAnyError = errorExpected === true;
  const expectsSpecificError = expectedError || error;
  
  try {
    // Compile and run
    const compiled = expression(query);
    const result = compiled(context);
    
    // Check if we expected an error
    if (expectsAnyError || expectsSpecificError) {
      return {
        pass: false,
        description,
        reason: 'Expected error but got result',
        expected: expectsSpecificError || 'any error',
        actual: formatValue(result)
      };
    }
    
    // Check result
    if (!deepEqual(result, expected)) {
      return {
        pass: false,
        description,
        reason: 'Result mismatch',
        expected: formatValue(expected),
        actual: formatValue(result)
      };
    }
    
    return { pass: true, description };
    
  } catch (err) {
    // Check if we expected an error
    if (expectsAnyError) {
      // Any error is acceptable
      return { pass: true, description, isError: true };
    }
    
    if (expectsSpecificError) {
      // Check if error message matches (fuzzy matching)
      const errorMessage = err.message || String(err);
      const expectedPattern = expectsSpecificError;
      
      // Simple case-insensitive substring match
      if (errorMessage.toLowerCase().includes(expectedPattern.toLowerCase())) {
        return { pass: true, description, isError: true };
      }
      
      return {
        pass: false,
        description,
        reason: 'Error message mismatch',
        expected: expectedPattern,
        actual: errorMessage
      };
    }
    
    // Unexpected error
    return {
      pass: false,
      description,
      reason: 'Unexpected error',
      expected: formatValue(expected),
      actual: `Error: ${err.message || String(err)}`
    };
  }
}

/**
 * Run all tests for an operator
 */
function runOperatorTests(operatorName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing operator: $${operatorName}`);
  console.log('='.repeat(60));
  
  // Load test data
  const testFile = path.join(TEST_DATA_DIR, `${operatorName}.json`);
  
  if (!fs.existsSync(testFile)) {
    console.error(`❌ Test file not found: ${testFile}`);
    process.exit(1);
  }
  
  const testData = JSON.parse(fs.readFileSync(testFile, 'utf8'));
  
  console.log(`Source: ${testData.source}`);
  console.log(`Implementation: ${testData.implementationSource}`);
  console.log(`MongoDB Version: ${testData.mongodbVersion}`);
  console.log();
  
  const allResults = [];
  const { tests } = testData;
  
  // Run happy path tests
  if (tests.happyPath && tests.happyPath.length > 0) {
    console.log(`\n📗 Happy Path Tests (${tests.happyPath.length}):`);
    console.log('-'.repeat(60));
    
    for (const test of tests.happyPath) {
      const result = runTest(operatorName, test, 'happyPath');
      allResults.push(result);
      
      if (result.pass) {
        console.log(`  ✅ ${result.description}`);
      } else {
        console.log(`  ❌ ${result.description}`);
        console.log(`     Expected: ${result.expected}`);
        console.log(`     Actual: ${result.actual}`);
        if (result.reason) console.log(`     Reason: ${result.reason}`);
      }
    }
  }
  
  // Run null cases
  if (tests.nullCases && tests.nullCases.length > 0) {
    console.log(`\n📙 Null/Missing Tests (${tests.nullCases.length}):`);
    console.log('-'.repeat(60));
    
    for (const test of tests.nullCases) {
      const result = runTest(operatorName, test, 'nullCases');
      allResults.push(result);
      
      if (result.pass) {
        console.log(`  ✅ ${result.description}`);
      } else {
        console.log(`  ❌ ${result.description}`);
        console.log(`     Expected: ${result.expected}`);
        console.log(`     Actual: ${result.actual}`);
        if (result.reason) console.log(`     Reason: ${result.reason}`);
      }
    }
  }
  
  // Run error tests
  if (tests.errors && tests.errors.length > 0) {
    console.log(`\n📕 Error Tests (${tests.errors.length}):`);
    console.log('-'.repeat(60));
    
    for (const test of tests.errors) {
      const result = runTest(operatorName, test, 'errors');
      allResults.push(result);
      
      if (result.pass) {
        console.log(`  ✅ ${result.description} ${result.isError ? '(error)' : ''}`);
      } else {
        console.log(`  ❌ ${result.description}`);
        console.log(`     Expected: ${result.expected}`);
        console.log(`     Actual: ${result.actual}`);
        if (result.reason) console.log(`     Reason: ${result.reason}`);
      }
    }
  }
  
  // Run collation tests (if supported)
  if (tests.collationTests && tests.collationTests.length > 0) {
    console.log(`\n📘 Collation Tests (${tests.collationTests.length}) - [Collation not yet supported in Monger]:`);
    console.log('-'.repeat(60));
    
    for (const test of tests.collationTests) {
      // For now, just mark as skipped
      console.log(`  ⏭️  ${test.description} [SKIPPED - collation not supported]`);
    }
  }
  
  // Run type coercion tests
  if (tests.typeCoercionCases && tests.typeCoercionCases.length > 0) {
    console.log(`\n📔 Type Coercion Tests (${tests.typeCoercionCases.length}):`);
    console.log('-'.repeat(60));
    
    for (const test of tests.typeCoercionCases) {
      const result = runTest(operatorName, test, 'typeCoercion');
      allResults.push(result);
      
      if (result.pass) {
        console.log(`  ✅ ${result.description}`);
      } else {
        console.log(`  ❌ ${result.description}`);
        console.log(`     Expected: ${result.expected}`);
        console.log(`     Actual: ${result.actual}`);
        if (result.reason) console.log(`     Reason: ${result.reason}`);
      }
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('SUMMARY');
  console.log('='.repeat(60));
  
  const passed = allResults.filter(r => r.pass).length;
  const failed = allResults.filter(r => !r.pass).length;
  const total = allResults.length;
  
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ${failed > 0 ? '❌' : ''}`);
  
  if (failed === 0) {
    console.log(`\n🎉 All tests passed!`);
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed`);
    process.exit(1);
  }
}

function main() {
  const operatorName = process.argv[2];
  
  if (!operatorName) {
    console.error('Usage: node scripts/run-mongodb-tests.js <operator>');
    console.error('Example: node scripts/run-mongodb-tests.js arrayToObject');
    console.error('\nAvailable operators:');
    
    // List available test files
    if (fs.existsSync(TEST_DATA_DIR)) {
      const files = fs.readdirSync(TEST_DATA_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
      files.forEach(f => console.error(`  - ${f}`));
    }
    
    process.exit(1);
  }
  
  runOperatorTests(operatorName);
}

main();
