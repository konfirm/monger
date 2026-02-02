/**
 * MongoDB jstest Interceptor - Prototype
 * 
 * Mocks MongoDB's test framework to extract test cases from jstests
 * Run: node scripts/intercept-jstest.js <path-to-jstest>
 */

// Mock MongoDB test framework 't'
const capturedTests = [];
let currentTest = null;

const t = new Proxy({}, {
  get(target, prop) {
    // Intercept all t.* calls
    return (...args) => {
      const call = { method: prop, args, timestamp: Date.now() };
      
      if (currentTest) {
        currentTest.calls.push(call);
      } else {
        console.log(`Unmatched call: t.${prop}(${args.map(a => JSON.stringify(a)).join(', ')})`);
      }
      
      // Return mock values for common methods
      switch(prop) {
        case 'insert':
          return { nInserted: args[0]?.length || 0 };
        case 'aggregate':
          // This is where we capture the pipeline!
          currentTest.pipeline = args[0];
          return {
            toArray: () => {
              // Return mock results - we'll need to execute against Monger
              currentTest.status = 'needs_execution';
              return [];
            }
          };
        case 'drop':
          return true;
        default:
          return undefined;
      }
    };
  }
});

// Mock assert extensions used in imports
const assertArrayEq = (actual, expected) => {
  if (currentTest) {
    currentTest.assertions.push({ type: 'arrayEq', actual, expected });
  }
};

const checkSbeFullyEnabled = () => false; // Assume not enabled

// Mock assert object
const assert = {
  eq: (actual, expected) => {
    if (currentTest) {
      currentTest.assertions.push({ type: 'eq', actual, expected });
    }
  },
  commandWorked: (result) => {
    // Command succeeded
  },
  commandFailedWithCode: (fn, code) => {
    try {
      fn();
      if (currentTest) {
        currentTest.assertions.push({ type: 'should_error', code, actual: 'no_error' });
      }
    } catch (e) {
      if (currentTest) {
        currentTest.assertions.push({ type: 'error', code, message: e.message });
      }
    }
  }
};

// Mock db/collection
db = {
  getCollection: (name) => ({
    drop: () => true,
    insert: (docs) => ({ nInserted: docs.length }),
    aggregate: (pipeline) => ({
      toArray: () => {
        currentTest.pipeline = pipeline;
        return [];
      }
    })
  })
};

// Mock MongoDB globals
global.ObjectId = (str) => ({ $oid: str });
global.ISODate = (str) => ({ $date: str });
global.NumberLong = (val) => ({ $numberLong: String(val) });
global.NumberInt = (val) => ({ $numberInt: String(val) });
global.BinData = (subtype, base64) => ({ $binary: { base64, subType: String(subtype) } });

// Test file loader
function loadTestFile(filePath) {
  currentTest = {
    file: filePath,
    calls: [],
    assertions: [],
    pipeline: null,
    status: 'loaded'
  };
  
  try {
    // Execute the jstest in our mocked environment
    const fs = require('fs');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Strip ES6 imports (not supported in our mock environment)
    content = content.replace(/^import\s+.*$/gm, '');
    
    // Wrap in function to isolate scope
    const testFunction = new Function('t', 'assert', 'assertArrayEq', 'checkSbeFullyEnabled', 'db', 'ObjectId', 'ISODate', 'NumberLong', content);
    testFunction(t, assert, assertArrayEq, checkSbeFullyEnabled, db, ObjectId, ISODate, NumberLong);
    
    capturedTests.push(currentTest);
    return currentTest;
  } catch (e) {
    console.error(`Error loading ${filePath}:`, e.message);
    return null;
  } finally {
    currentTest = null;
  }
}

// Extract test cases from captured data
function extractTestCases() {
  const testCases = [];
  
  for (const test of capturedTests) {
    // Look for aggregate pipeline calls
    if (test.pipeline) {
      // Extract the operator being tested
      const operator = extractOperator(test.pipeline);
      if (operator) {
        testCases.push({
          operator: operator.name,
          query: operator.query,
          source: test.file,
          rawPipeline: test.pipeline
        });
      }
    }
  }
  
  return testCases;
}

function extractOperator(pipeline) {
  // Look for operators in pipeline stages
  for (const stage of pipeline) {
    if (stage.$project) {
      // Check for expression operators in $project
      for (const [field, expr] of Object.entries(stage.$project)) {
        if (typeof expr === 'object' && !Array.isArray(expr)) {
          const opName = Object.keys(expr).find(k => k.startsWith('$'));
          if (opName) {
            return { name: opName, query: expr };
          }
        }
      }
    }
  }
  return null;
}

// Main execution
function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.log('Usage: node intercept-jstest.js <path-to-jstest>');
    console.log('Example: node intercept-jstest.js mongo/jstests/aggregation/expressions/concat_arrays.js');
    process.exit(1);
  }
  
  console.log(`Loading test file: ${filePath}`);
  const test = loadTestFile(filePath);
  
  if (test) {
    console.log('\nCaptured test:');
    console.log(`  Calls: ${test.calls.length}`);
    console.log(`  Assertions: ${test.assertions.length}`);
    console.log(`  Pipeline: ${JSON.stringify(test.pipeline, null, 2)}`);
    
    const testCases = extractTestCases();
    console.log(`\nExtracted ${testCases.length} test case(s):`);
    testCases.forEach((tc, i) => {
      console.log(`\n${i + 1}. ${tc.operator}`);
      console.log(`   Query: ${JSON.stringify(tc.query)}`);
    });
  }
}

main();
