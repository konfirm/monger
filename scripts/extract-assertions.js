#!/usr/bin/env node
/**
 * Extract assertions from MongoDB jstests
 * Parses assert.* calls to extract expected values
 */

const fs = require('fs');
const path = require('path');

function extractAssertions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const assertions = [];
  
  // Match assert.eq(actual, expected)
  // Handle multiline by matching balanced parentheses
  const eqRegex = /assert\.eq\s*\(([^)]+(?:\([^)]*\)[^)]*)*)\)/gs;
  let match;
  
  while ((match = eqRegex.exec(content)) !== null) {
    const args = match[1];
    // Split on first comma not in parentheses
    const commaIndex = findArgSplit(args);
    if (commaIndex > 0) {
      const actual = args.substring(0, commaIndex).trim();
      const expected = args.substring(commaIndex + 1).trim();
      assertions.push({
        type: 'eq',
        actual: cleanup(actual),
        expected: cleanup(expected),
        line: getLineNumber(content, match.index)
      });
    }
  }
  
  // Match assert.commandWorked(result)
  const workedRegex = /assert\.commandWorked\s*\(([^)]+)\)/gs;
  while ((match = workedRegex.exec(content)) !== null) {
    assertions.push({
      type: 'commandWorked',
      result: cleanup(match[1]),
      line: getLineNumber(content, match.index)
    });
  }
  
  // Match assert.commandFailedWithCode(fn, code)
  const failedRegex = /assert\.commandFailedWithCode\s*\(([^)]+(?:\([^)]*\)[^)]*)*)\)/gs;
  while ((match = failedRegex.exec(content)) !== null) {
    const args = match[1];
    const commaIndex = findArgSplit(args);
    if (commaIndex > 0) {
      const fn = args.substring(0, commaIndex).trim();
      const code = args.substring(commaIndex + 1).trim();
      assertions.push({
        type: 'commandFailedWithCode',
        function: cleanup(fn),
        code: cleanup(code),
        line: getLineNumber(content, match.index)
      });
    }
  }
  
  // Match assert.throwsWithCode(fn, code)
  const throwsRegex = /assert\.throwsWithCode\s*\(([^)]+(?:\([^)]*\)[^)]*)*)\)/gs;
  while ((match = throwsRegex.exec(content)) !== null) {
    const args = match[1];
    const commaIndex = findArgSplit(args);
    if (commaIndex > 0) {
      const fn = args.substring(0, commaIndex).trim();
      const code = args.substring(commaIndex + 1).trim();
      assertions.push({
        type: 'throwsWithCode',
        function: cleanup(fn),
        code: cleanup(code),
        line: getLineNumber(content, match.index)
      });
    }
  }
  
  return {
    file: path.basename(filePath),
    totalAssertions: assertions.length,
    assertions: assertions
  };
}

// Find the comma that separates arguments (not inside parentheses)
function findArgSplit(str) {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === '[' || str[i] === '{') depth++;
    else if (str[i] === ')' || str[i] === ']' || str[i] === '}') depth--;
    else if (str[i] === ',' && depth === 0) return i;
  }
  return -1;
}

// Get line number for an index in the content
function getLineNumber(content, index) {
  const lines = content.substring(0, index).split('\n');
  return lines.length;
}

// Clean up extracted code
function cleanup(str) {
  return str
    .replace(/\s+/g, ' ')
    .replace(/;\s*$/, '')
    .trim();
}

// Main
function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Usage: node extract-assertions.js <jstest-file>');
    console.error('Example: node extract-assertions.js mongo/jstests/aggregation/expressions/concat_arrays.js');
    process.exit(1);
  }
  
  try {
    const result = extractAssertions(filePath);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();
