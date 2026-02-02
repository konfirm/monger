#!/usr/bin/env node
/**
 * Create Complete Test Specification from jstest
 * Combines tracer output with assertion extraction
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TRACER = path.join(__dirname, 'jstest-tracer.js');
const ASSERT_EXTRACTOR = path.join(__dirname, 'extract-assertions.js');

function createTestSpec(jstestPath) {
  // Step 1: Run tracer to get operations
  console.error('Running tracer...');
  let traceOutput;
  try {
    traceOutput = execSync(`node "${TRACER}" "${jstestPath}"`, { 
      encoding: 'utf8', 
      timeout: 30000,
      maxBuffer: 50 * 1024 * 1024
    });
  } catch (e) {
    console.error('Tracer error:', e.message);
    traceOutput = e.stdout || '{}';
  }
  
  const trace = JSON.parse(traceOutput);
  
  // Step 2: Extract assertions
  console.error('Extracting assertions...');
  let assertOutput;
  try {
    assertOutput = execSync(`node "${ASSERT_EXTRACTOR}" "${jstestPath}"`, {
      encoding: 'utf8',
      timeout: 10000
    });
  } catch (e) {
    console.error('Assertion extractor error:', e.message);
    assertOutput = '{"assertions": []}';
  }
  
  const assertions = JSON.parse(assertOutput);
  
  // Step 3: Combine into test specification
  const testSpec = {
    source: path.basename(jstestPath),
    fullPath: jstestPath,
    extractedAt: new Date().toISOString(),
    
    // From tracer: test setup
    setup: {
      collections: trace.state?.collections || {},
      inserts: trace.sequence?.filter(s => s.type === 'insert' || s.type === 'insertOne') || []
    },
    
    // From tracer: operations to test
    operations: trace.sequence?.filter(s => s.type === 'aggregate') || [],
    
    // From assertions: expected results
    expectations: assertions.assertions || [],
    
    // Metadata
    meta: {
      totalOperations: trace.sequence?.length || 0,
      totalAssertions: assertions.totalAssertions || 0,
      errors: trace.sequence?.filter(s => s.type?.endsWith('_error')).length || 0
    }
  };
  
  return testSpec;
}

// Main
function main() {
  const jstestPath = process.argv[2];
  const outputPath = process.argv[3];
  
  if (!jstestPath) {
    console.error('Usage: node create-test-spec.js <jstest-file> [output-file]');
    console.error('Example: node create-test-spec.js mongo/jstests/aggregation/expressions/concat_arrays.js test-spec.json');
    process.exit(1);
  }
  
  console.error(`Creating test spec for: ${jstestPath}`);
  
  const spec = createTestSpec(jstestPath);
  const json = JSON.stringify(spec, null, 2);
  
  if (outputPath) {
    fs.writeFileSync(outputPath, json);
    console.error(`Test spec saved to: ${outputPath}`);
  } else {
    console.log(json);
  }
}

main();
