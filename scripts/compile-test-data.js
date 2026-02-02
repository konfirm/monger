#!/usr/bin/env node
/**
 * Compile intercepted scenarios + MongoDB results into clean test data
 * 
 * Merges:
 *   test-data/intercepted/<operator>.json (scenarios)
 *   test-data/result/7.0.8/<operator>.json (real MongoDB outputs)
 * 
 * Into:
 *   test-data/compiled/<operator>.json (clean, ready-to-use)
 */

const fs = require('fs');
const path = require('path');

const INTERCEPTED_DIR = path.join(__dirname, '..', 'test-data', 'intercepted');
const RESULTS_DIR = path.join(__dirname, '..', 'test-data', 'result', '7.0.8');
const OUTPUT_DIR = path.join(__dirname, '..', 'test-data', 'compiled');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function compileTestData(operatorName) {
  const interceptedFile = path.join(INTERCEPTED_DIR, `${operatorName}.json`);
  const resultsFile = path.join(RESULTS_DIR, `${operatorName}.json`);
  
  if (!fs.existsSync(interceptedFile)) {
    return { error: 'No intercepted data found' };
  }
  
  if (!fs.existsSync(resultsFile)) {
    return { error: 'No MongoDB results found' };
  }
  
  const intercepted = JSON.parse(fs.readFileSync(interceptedFile, 'utf8'));
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  
  // Extract the operator from the first aggregate pipeline
  let operator = 'unknown';
  let description = 'Test from MongoDB jstests';
  
  const firstAggregate = intercepted.sequence?.find(s => s.type === 'aggregate');
  if (firstAggregate?.pipeline?.[0]?.$project) {
    const proj = firstAggregate.pipeline[0].$project;
    const field = Object.values(proj)[0];
    if (field && typeof field === 'object') {
      operator = Object.keys(field).find(k => k.startsWith('$')) || 'unknown';
    }
  }
  
  // Build clean test structure
  const compiled = {
    operator: operator,
    description: description,
    source: intercepted.source,
    validatedAgainst: results.mongoVersion || '7.0.8',
    extractedAt: new Date().toISOString(),
    
    tests: {
      happyPath: [],
      nullCases: [],
      errors: [],
      edgeCases: []
    },
    
    metadata: {
      totalOperations: results.operations?.length || 0,
      totalDocuments: Object.values(intercepted.state?.collections || {})
        .reduce((sum, docs) => sum + (docs?.length || 0), 0),
      errors: results.errors?.length || 0
    }
  };
  
  // Match intercepted operations with results
  const aggregates = intercepted.sequence?.filter(s => s.type === 'aggregate') || [];
  
  aggregates.forEach((agg, index) => {
    const result = results.operations?.[index];
    if (!result) return;
    
    // Determine test category
    let category = 'happyPath';
    if (result.error || !result.success) {
      category = 'errors';
    } else if (JSON.stringify(result.result).includes('null')) {
      category = 'nullCases';
    }
    
    // Build clean test case
    const testCase = {
      description: `Aggregate operation ${index + 1}`,
      query: buildQuery(agg.pipeline),
      context: buildContext(intercepted.state?.collections),
      expected: result.success ? result.result : { error: result.error?.message || 'error' }
    };
    
    if (result.duration) {
      testCase.duration = result.duration;
    }
    
    compiled.tests[category].push(testCase);
  });
  
  // Remove empty categories
  Object.keys(compiled.tests).forEach(key => {
    if (compiled.tests[key].length === 0) {
      delete compiled.tests[key];
    }
  });
  
  return compiled;
}

function buildQuery(pipeline) {
  // Find the operator in the pipeline
  if (!pipeline || !Array.isArray(pipeline)) return {};
  
  for (const stage of pipeline) {
    if (stage.$project) {
      // Return the first projection field's expression
      const fields = Object.values(stage.$project);
      if (fields.length > 0 && typeof fields[0] === 'object') {
        return fields[0];
      }
    }
  }
  
  return pipeline;
}

function buildContext(collections) {
  if (!collections) return {};
  
  // Flatten all collection documents into a single context
  const context = {};
  Object.values(collections).forEach(docs => {
    if (Array.isArray(docs) && docs.length > 0) {
      // Use first document as context (simplified)
      Object.assign(context, docs[0]);
    }
  });
  
  return context;
}

// Main
function main() {
  // Get all intercepted files
  const files = fs.readdirSync(INTERCEPTED_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
  
  console.log(`Compiling ${files.length} test data files...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const operator of files) {
    process.stdout.write(`${operator}... `);
    
    const compiled = compileTestData(operator);
    
    if (compiled.error) {
      console.log(`⚠️  ${compiled.error}`);
      failed++;
      continue;
    }
    
    // Write compiled file
    const outputFile = path.join(OUTPUT_DIR, `${operator}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(compiled, null, 2));
    
    // Count tests
    const totalTests = Object.values(compiled.tests)
      .reduce((sum, tests) => sum + tests.length, 0);
    
    console.log(`✅ ${totalTests} tests (${Object.keys(compiled.tests).join(', ')})`);
    success++;
  }
  
  console.log(`\n✨ Done! ${success} compiled, ${failed} skipped`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main();
