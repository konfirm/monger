/**
 * MongoDB Test Proxy - Intercepts db.* and coll.* calls
 * 
 * This creates a proxy layer that intercepts MongoDB shell calls
 * and can redirect them to Monger for execution
 */

const fs = require('fs');
const path = require('path');

// Store captured test data
const capturedData = {
  inserts: [],
  pipelines: [],
  assertions: [],
  currentCollection: null
};

// Create a proxy for collection operations
function createCollectionProxy(name) {
  const documents = []; // In-memory storage for this collection
  
  return new Proxy({}, {
    get(target, prop) {
      return (...args) => {
        console.log(`  [PROXY] coll.${String(prop)}(${args.map(a => JSON.stringify(a).substring(0, 50)).join(', ')})`);
        
        switch(prop) {
          case 'drop':
            documents.length = 0;
            capturedData.currentCollection = name;
            return true;
            
          case 'insert':
            const docs = args[0];
            documents.push(...docs);
            capturedData.inserts.push({ collection: name, documents: docs });
            return { nInserted: docs.length };
            
          case 'aggregate':
            const pipeline = args[0];
            capturedData.pipelines.push({ collection: name, pipeline });
            
            // Return mock cursor with all methods
            return {
              toArray: () => {
                console.log(`  [EXECUTE] Would run pipeline against ${name}`);
                return [];
              },
              map: (fn) => {
                // MongoDB cursor.map applies fn to each result
                const results = []; // Would come from execution
                return results.map(fn);
              },
              forEach: (fn) => {
                // Could iterate and call fn with results
              }
            };
            
          case 'find':
            return {
              toArray: () => documents
            };
            
          default:
            console.log(`  [UNHANDLED] coll.${String(prop)}`);
            return undefined;
        }
      };
    }
  });
}

// Create proxy for db operations
const db = new Proxy({}, {
  get(target, prop) {
    // Handle db.getCollection() or direct db.collectionName access
    if (prop === 'getCollection') {
      return (name) => createCollectionProxy(name);
    }
    
    // Any property access returns a collection proxy
    return createCollectionProxy(String(prop));
  }
});

// Create assert as a function that also has methods
function assertFunction(condition, message) {
  if (!condition) {
    console.log(`  [ASSERT] FAILED: ${message || 'assertion failed'}`);
    capturedData.assertions.push({ type: 'bare_assert', condition: false, message });
  } else {
    capturedData.assertions.push({ type: 'bare_assert', condition: true });
  }
}

// Add methods to assert function
assertFunction.eq = (actual, expected) => {
  capturedData.assertions.push({ type: 'eq', actual, expected });
  console.log(`  [ASSERT] eq(${JSON.stringify(actual).substring(0, 50)}, ${JSON.stringify(expected).substring(0, 50)})`);
};

assertFunction.commandWorked = () => true;

assertFunction.commandFailedWithCode = (fn, code) => {
  try {
    fn();
    capturedData.assertions.push({ type: 'should_have_failed', code });
  } catch (e) {
    capturedData.assertions.push({ type: 'error', code, message: e.message });
  }
};

assertFunction.throws = (fn, errorType, message) => {
  try {
    const result = fn();
    capturedData.assertions.push({ type: 'should_have_thrown', expected: errorType?.name || 'Error', actual: 'no error' });
    console.log(`  [ASSERT] throws() - FAILED: Expected error but got ${JSON.stringify(result).substring(0, 30)}`);
  } catch (e) {
    capturedData.assertions.push({ type: 'threw', error: e.message });
    console.log(`  [ASSERT] throws() - OK: Threw ${e.message.substring(0, 50)}`);
  }
};

assertFunction.doesNotThrow = (fn) => {
  try {
    fn();
    capturedData.assertions.push({ type: 'did_not_throw' });
  } catch (e) {
    capturedData.assertions.push({ type: 'unexpected_error', message: e.message });
  }
};

const assert = assertFunction;

// Mock global constructors
global.ObjectId = (str) => ({ $oid: str });
global.ISODate = (str) => ({ $date: str });
global.NumberLong = (val) => ({ $numberLong: String(val) });
global.NumberInt = (val) => ({ $numberInt: String(val) });
global.BinData = (subtype, base64) => ({ $binary: { base64, subType: String(subtype) } });
global.db = db;
global.assert = assert;

// Handle imports by making them no-ops or providing minimal mocks
global.jstests = {
  libs: {
    query: {
      sbe_assert_error_override: () => {}
    }
  },
  aggregation: {
    extras: {
      utils: {
        assertArrayEq: (actual, expected) => {
          capturedData.assertions.push({ type: 'arrayEq', actual, expected });
        }
      }
    }
  }
};

// Mock module imports
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  // Intercept jstests imports
  if (id.includes('jstests/')) {
    console.log(`  [IMPORT] ${id}`);
    
    // Return appropriate mock
    if (id.includes('utils.js')) {
      return { assertArrayEq: global.jstests.aggregation.extras.utils.assertArrayEq };
    }
    if (id.includes('sbe_util.js')) {
      return { checkSbeFullyEnabled: () => false };
    }
    if (id.includes('sbe_assert_error_override')) {
      return {};
    }
    
    return {};
  }
  return originalRequire.apply(this, arguments);
};

// Main execution
function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.log('Usage: node test-proxy.js <path-to-jstest>');
    process.exit(1);
  }
  
  console.log(`\n🧪 Loading: ${filePath}\n`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove comments, imports, and special directives
    const cleaned = content
      .replace(/\/\/.*$/gm, '')
      .replace(/^\/\*[\s\S]*?\*\//gm, '')
      .replace(/@tags:\s*\[[\s\S]*?\]/, '')
      .replace(/^import\s+.*$/gm, '');  // Strip ES6 imports
    
    // Define assertArrayEq for the test
    const assertArrayEq = (actual, expected) => {
      capturedData.assertions.push({ type: 'arrayEq', actual, expected });
      console.log(`  [ASSERT] arrayEq(actual, expected)`);
    };
    
    // Execute the test with all mocks in scope
    const testFunc = new Function('db', 'assert', 'assertArrayEq', 'ObjectId', 'ISODate', 'NumberLong', cleaned);
    testFunc(db, assert, assertArrayEq, ObjectId, ISODate, NumberLong);
    
    // Report results
    console.log('\n📊 Captured Data:\n');
    console.log(`  Inserts: ${capturedData.inserts.length}`);
    console.log(`  Pipelines: ${capturedData.pipelines.length}`);
    console.log(`  Assertions: ${capturedData.assertions.length}`);
    
    if (capturedData.pipelines.length > 0) {
      console.log('\n🎯 Pipelines found:\n');
      capturedData.pipelines.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.collection}:`);
        p.pipeline.forEach((stage, j) => {
          const stageName = Object.keys(stage)[0];
          console.log(`     Stage ${j}: $${stageName}`);
        });
      });
    }
    
    // Output as test data format
    console.log('\n📝 Test Data Format:\n');
    capturedData.pipelines.forEach((p, i) => {
      // Extract operator from pipeline
      const operator = extractOperator(p.pipeline);
      if (operator) {
        console.log(JSON.stringify({
          operator: operator.name,
          description: `Test from ${path.basename(filePath)}`,
          query: operator.query,
          context: {}, // Would need to map from captured inserts
          expected: null // Would need to get from assertions
        }, null, 2));
      }
    });
    
  } catch (e) {
    console.error('❌ Error:', e.message);
    console.error(e.stack);
  }
}

function extractOperator(pipeline) {
  for (const stage of pipeline) {
    if (stage.$project) {
      for (const [field, expr] of Object.entries(stage.$project)) {
        if (typeof expr === 'object' && expr !== null) {
          const opKey = Object.keys(expr).find(k => k.startsWith('$'));
          if (opKey) {
            return { name: opKey, query: expr };
          }
        }
      }
    }
  }
  return null;
}

main();
