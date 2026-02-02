/**
 * MongoDB jstest Tracer - Records EVERYTHING
 * 
 * Intercepts ALL property access, function calls, and state changes
 * Outputs complete execution trace for test reconstruction
 */

const fs = require('fs');
const path = require('path');

// Execution trace
const trace = {
  source: null,
  sequence: [],
  state: {
    collections: {},
    globals: {},
    variables: {}
  },
  meta: {
    startTime: null,
    endTime: null,
    totalOperations: 0
  }
};

let seqId = 0;
const MAX_LOG_LEN = 500;

function truncate(obj) {
  if (obj === undefined) return { __undefined: true };
  if (obj === null) return null;
  const str = JSON.stringify(obj);
  if (!str) return obj;
  if (str.length <= MAX_LOG_LEN) return obj;
  return { __truncated: str.substring(0, MAX_LOG_LEN) + '...' };
}

// Tracer utility - wraps any value and logs all interactions
function createTracer(name, value, path = '') {
  const currentPath = path ? `${path}.${name}` : name;
  
  // Primitive values - just return them
  if (value === null || typeof value !== 'object' && typeof value !== 'function') {
    return value;
  }
  
  // Functions - wrap to log calls
  if (typeof value === 'function') {
    return function(...args) {
      const callId = ++seqId;
      const callEntry = {
        id: callId,
        type: 'function_call',
        path: currentPath,
        target: name,
        arguments: args.map(truncate),
        timestamp: Date.now()
      };
      
      trace.sequence.push(callEntry);
      trace.meta.totalOperations++;
      
      try {
        const result = value.apply(this, args);
        const tracedResult = createTracer('result', result, currentPath);
        
        trace.sequence.push({
          id: callId,
          type: 'function_return',
          path: currentPath,
          result: truncate(tracedResult),
          timestamp: Date.now()
        });
        
        return tracedResult;
      } catch (error) {
        trace.sequence.push({
          id: callId,
          type: 'function_error',
          path: currentPath,
          error: { message: error.message, name: error.name },
          timestamp: Date.now()
        });
        throw error;
      }
    };
  }
  
  // Arrays - trace access but keep as array
  if (Array.isArray(value)) {
    return new Proxy(value, {
      get(target, prop) {
        const val = target[prop];
        if (typeof val === 'function') {
          return function(...args) {
            const callId = ++seqId;
            trace.sequence.push({
              id: callId,
              type: 'array_method',
              path: currentPath,
              method: String(prop),
              arguments: args.map(truncate),
              timestamp: Date.now()
            });
            
            const result = val.apply(target, args);
            trace.sequence.push({
              id: callId,
              type: 'array_method_return',
              path: currentPath,
              method: String(prop),
              result: truncate(result),
              timestamp: Date.now()
            });
            
            return result;
          };
        }
        
        trace.sequence.push({
          id: ++seqId,
          type: 'property_get',
          path: currentPath,
          property: String(prop),
          value: truncate(val),
          timestamp: Date.now()
        });
        
        return createTracer(String(prop), val, currentPath);
      },
      set(target, prop, val) {
        trace.sequence.push({
          id: ++seqId,
          type: 'property_set',
          path: currentPath,
          property: String(prop),
          value: truncate(val),
          timestamp: Date.now()
        });
        target[prop] = val;
        return true;
      }
    });
  }
  
  // Objects - proxy all access
  return new Proxy(value, {
    get(target, prop) {
      if (prop === Symbol.toStringTag || prop === 'constructor') {
        return target[prop];
      }
      
      const val = target[prop];
      const entry = {
        id: ++seqId,
        type: 'property_get',
        path: currentPath,
        property: String(prop),
        valueType: typeof val,
        timestamp: Date.now()
      };
      
      if (typeof val !== 'function') {
        entry.value = truncate(val);
      }
      
      trace.sequence.push(entry);
      
      return createTracer(String(prop), val, currentPath);
    },
    set(target, prop, val) {
      trace.sequence.push({
        id: ++seqId,
        type: 'property_set',
        path: currentPath,
        property: String(prop),
        value: truncate(val),
        timestamp: Date.now()
      });
      target[prop] = val;
      return true;
    }
  });
}

// Collection storage with full tracing
const collectionData = {};

function getCollection(name) {
  if (!collectionData[name]) {
    collectionData[name] = [];
  }
  return collectionData[name];
}

// Create traced collection
function createTracedCollection(name) {
  const docs = getCollection(name);
  
  const collInterface = {
    drop: function() {
      docs.length = 0;
      trace.state.collections[name] = [];
      return true;
    },
    
    insert: function(documents) {
      // Handle both single objects and arrays, with safety checks
      try {
        if (!documents) {
          return { nInserted: 0 };
        }
        if (Array.isArray(documents)) {
          // Filter out any null/undefined items
          const validDocs = documents.filter(d => d != null);
          docs.push(...validDocs);
        } else if (typeof documents === 'object') {
          docs.push(documents);
        }
        trace.state.collections[name] = JSON.parse(JSON.stringify(docs));
        return { nInserted: docs.length };
      } catch (e) {
        // Log error but don't crash
        trace.sequence.push({
          id: ++seqId,
          type: 'insert_error',
          error: e.message,
          documents: truncate(documents)
        });
        return { nInserted: 0 };
      }
    },
    
    insertOne: function(document) {
      docs.push(document);
      trace.state.collections[name] = JSON.parse(JSON.stringify(docs));
      return { nInserted: 1 };
    },
    
    insertMany: function(documents) {
      // Handle insertMany (bulk insert)
      if (Array.isArray(documents)) {
        const validDocs = documents.filter(d => d != null);
        docs.push(...validDocs);
      }
      trace.state.collections[name] = JSON.parse(JSON.stringify(docs));
      return { nInserted: docs.length };
    },
    
    find: function(query) {
      return {
        toArray: () => docs,
        count: () => docs.length
      };
    },
    
    aggregate: function(pipeline) {
      // Capture the operation
      trace.sequence.push({
        id: ++seqId,
        type: 'aggregate',
        collection: name,
        pipeline: pipeline,
        documents: JSON.parse(JSON.stringify(docs)),
        timestamp: Date.now()
      });
      
      return {
        toArray: () => [],
        map: (fn) => [],
        forEach: (fn) => {},
        hasNext: () => false,
        next: () => null
      };
    }
  };
  
  return createTracer(`collection.${name}`, collInterface);
}

// DB proxy
const db = new Proxy({}, {
  get(target, prop) {
    trace.sequence.push({
      id: ++seqId,
      type: 'db_access',
      property: String(prop),
      timestamp: Date.now()
    });
    
    if (prop === 'getCollection') {
      return (n) => createTracedCollection(n);
    }
    return createTracedCollection(String(prop));
  }
});

// Assert with tracing
const assertBase = function(condition, message) {
  trace.sequence.push({
    id: ++seqId,
    type: 'assert',
    condition: !!condition,
    message: message,
    timestamp: Date.now()
  });
};

assertBase.eq = function(actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_eq',
    passed,
    actual: truncate(actual),
    expected: truncate(expected),
    timestamp: Date.now()
  });
};

assertBase.throws = function(fn, errorType, message) {
  let threw = false;
  let error = null;
  try {
    fn();
  } catch (e) {
    threw = true;
    error = { message: e.message, name: e.name };
  }
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_throws',
    threw,
    error,
    timestamp: Date.now()
  });
};

assertBase.doesNotThrow = function(fn) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
  }
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_doesNotThrow',
    threw,
    timestamp: Date.now()
  });
};

assertBase.commandWorked = function(result) {
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_commandWorked',
    result: truncate(result),
    timestamp: Date.now()
  });
  return true;
};

assertBase.arrayEq = function(actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_arrayEq',
    passed,
    timestamp: Date.now()
  });
};

assertBase.commandFailedWithCode = function(fn, code) {
  let threw = false;
  let error = null;
  try {
    fn();
  } catch (e) {
    threw = true;
    error = { message: e.message, name: e.name };
  }
  trace.sequence.push({
    id: ++seqId,
    type: 'assert_commandFailedWithCode',
    code,
    threw,
    error,
    timestamp: Date.now()
  });
};

// MongoDB test utility - assertErrorCode
function assertErrorCode(collection, pipeline, code, message) {
  trace.sequence.push({
    id: ++seqId,
    type: 'assertErrorCode',
    collection: collection?._name || 'unknown',
    pipeline: truncate(pipeline),
    expectedCode: code,
    message,
    timestamp: Date.now()
  });
}

// Make it available globally for imported modules
global.assertErrorCode = assertErrorCode;

assertBase.commandWorked = () => true;
assertBase.commandFailedWithCode = () => {};

// Don't wrap assert in tracer - it breaks function calls
const assert = assertBase;

// Global constructors with tracing
const ObjectId = createTracer('ObjectId', function(str) {
  return { $oid: str };
});

const ISODate = createTracer('ISODate', function(str) {
  return { $date: str };
});

const NumberLong = createTracer('NumberLong', function(val) {
  return { $numberLong: String(val) };
});

const NumberInt = createTracer('NumberInt', function(val) {
  return { $numberInt: String(val) };
});

const BinData = createTracer('BinData', function(subtype, base64) {
  return { $binary: { base64, subType: String(subtype) } };
});

// Import mocks
const Module = require('module');
const origRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  if (id.includes('jstests/')) {
    trace.sequence.push({
      id: ++seqId,
      type: 'import',
      module: id,
      timestamp: Date.now()
    });
    
    if (id.includes('utils.js')) {
      return createTracer('utils', {
        assertArrayEq: (a, e) => {
          trace.sequence.push({
            id: ++seqId,
            type: 'assertArrayEq',
            passed: JSON.stringify(a) === JSON.stringify(e),
            timestamp: Date.now()
          });
        }
      });
    }
    if (id.includes('sbe_util.js')) {
      return createTracer('sbe_util', { checkSbeFullyEnabled: () => false });
    }
    return createTracer('imported_module', {});
  }
  return origRequire.apply(this, arguments);
};

// Main
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node jstest-tracer.js <jstest-file> > trace.json');
  process.exit(1);
}

trace.source = filePath;
trace.meta.startTime = Date.now();
trace.sequence.push({ id: ++seqId, type: 'test_start', file: filePath, timestamp: Date.now() });

try {
  const content = fs.readFileSync(filePath, 'utf8')
    .replace(/\/\/.*$/gm, '')
    .replace(/^\/\*[\s\S]*?\*\//gm, '')
    .replace(/@tags:\s*\[[\s\S]*?\]/, '')
    .replace(/^import\s+.*$/gm, '');
  
  // Set up globals
  global.db = db;
  global.assert = assert;
  global.assertArrayEq = assert.arrayEq.bind(assert);
  global.ObjectId = ObjectId;
  global.ISODate = ISODate;
  global.NumberLong = NumberLong;
  global.NumberInt = NumberInt;
  global.BinData = BinData;
  
  // Execute
  const fn = new Function(
    'db', 'assert', 'assertArrayEq', 'ObjectId', 'ISODate', 'NumberLong', 'NumberInt', 'BinData',
    content
  );
  
  fn(db, assert, assert.arrayEq.bind(assert), ObjectId, ISODate, NumberLong, NumberInt, BinData);
  
  trace.meta.endTime = Date.now();
  trace.sequence.push({ 
    id: ++seqId, 
    type: 'test_end', 
    status: 'success',
    duration: trace.meta.endTime - trace.meta.startTime,
    timestamp: Date.now()
  });
  
} catch (error) {
  trace.meta.endTime = Date.now();
  trace.sequence.push({
    id: ++seqId,
    type: 'test_error',
    error: { message: error.message, name: error.name },
    timestamp: Date.now()
  });
}

console.log(JSON.stringify(trace, null, 2));
