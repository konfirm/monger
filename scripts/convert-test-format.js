#!/usr/bin/env node
/**
 * Convert test data from "input" format to "query" format
 * This makes the test data more explicit and robust
 */

const fs = require('fs');
const path = require('path');

const TEST_DATA_DIR = path.join(__dirname, '..', 'test-data');

function convertTestData(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const operator = data.operator;
  
  // Convert all test categories
  const categories = ['happyPath', 'nullCases', 'errors', 'typeCoercionCases', 'collationTests'];
  
  for (const category of categories) {
    if (data.tests[category]) {
      for (const test of data.tests[category]) {
        // If it has "input", convert to "query"
        if (test.input !== undefined && !test.query) {
          // Build the query object
          if (Array.isArray(test.input)) {
            test.query = { [operator]: test.input };
          } else if (typeof test.input === 'string' && test.input.startsWith('$')) {
            // Field reference
            test.query = { [operator]: test.input };
          } else {
            // Direct value
            test.query = { [operator]: test.input };
          }
          // Remove old "input" field
          delete test.input;
        }
      }
    }
  }
  
  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ Converted ${path.basename(filePath)}`);
}

// Convert all JSON files
const files = fs.readdirSync(TEST_DATA_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => path.join(TEST_DATA_DIR, f));

for (const file of files) {
  convertTestData(file);
}

console.log('\nAll test data files converted to use "query" format!');
