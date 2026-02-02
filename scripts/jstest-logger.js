/**
 * MongoDB jstest Logger - Comprehensive Test Capture
 * Captures ALL activity from jstests in JSON format
 */

const fs = require('fs');

const executionLog = {
  source: null,
  operations: [],
  assertions: [],
  errors: [],
  collections: {},
  timeline: []
};

let opId = 0;
const truncate = (str, max) => str.length > max ? str.substring(0, max) + '...' : str;

function log(type, data) {
  executionLog.timeline.push({ id: ++opId, type, data, time: Date.now() });
}

// Collection storage
const collections = {};

function getCollection(name) {
  if (!collections[name]) collections[name] = [];
  return collections[name];
}

// Assert functions with logging
const assertArrayEq = (actual, expected) => {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  log('assert_arrayEq', { passed });
  executionLog.assertions.push({ type: 'arrayEq', passed });
};

const checkSbeFullyEnabled = () => false;

const assert = (condition, msg) => {
  log('assert', { condition: !!condition, msg });
  executionLog.assertions.push({ type: 'assert', condition: !!condition });
};

assert.eq = (a, e) => {
  const passed = JSON.stringify(a) === JSON.stringify(e);
  log('assert_eq', { passed });
  executionLog.assertions.push({ type: 'eq', passed });
};

assert.throws = (fn) => {
  let threw = false;
  try { fn(); } catch(e) { threw = true; }
  log('assert_throws', { threw });
  executionLog.assertions.push({ type: 'throws', threw });
};

assert.doesNotThrow = (fn) => {
  let threw = false;
  try { fn(); } catch(e) { threw = true; }
  log('assert_doesNotThrow', { threw });
};

assert.commandWorked = () => true;
assert.commandFailedWithCode = () => {};

// DB proxy
const db = new Proxy({}, {
  get: (t, p) => {
    if (p === 'getCollection') return (n) => createColl(n);
    return createColl(String(p));
  }
});

function createColl(name) {
  const docs = getCollection(name);
  return {
    drop: () => {
      log('drop', { name, count: docs.length });
      docs.length = 0;
      executionLog.collections[name] = [];
      return true;
    },
    insert: (d) => {
      log('insert', { name, count: d.length });
      docs.push(...d);
      executionLog.collections[name] = JSON.parse(JSON.stringify(docs));
      return { nInserted: d.length };
    },
    insertOne: (d) => {
      log('insertOne', { name });
      docs.push(d);
      executionLog.collections[name] = JSON.parse(JSON.stringify(docs));
      return { nInserted: 1 };
    },
    aggregate: (pipeline) => {
      log('aggregate', { 
        name, 
        stages: pipeline.map(s => Object.keys(s)[0])
      });
      executionLog.operations.push({
        collection: name,
        pipeline,
        documents: JSON.parse(JSON.stringify(docs))
      });
      return {
        toArray: () => [],
        map: () => []
      };
    },
    find: () => ({ toArray: () => docs })
  };
}

// Globals
global.ObjectId = (s) => ({ $oid: s });
global.ISODate = (s) => ({ $date: s });
global.NumberLong = (v) => ({ $numberLong: String(v) });
global.NumberInt = (v) => ({ $numberInt: String(v) });
global.db = db;
global.assert = assert;
global.assertArrayEq = assertArrayEq;
global.checkSbeFullyEnabled = checkSbeFullyEnabled;

// Import mock
const Module = require('module');
const origRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  if (id.includes('jstests/')) {
    log('import', { module: id });
    if (id.includes('utils.js')) return { assertArrayEq };
    if (id.includes('sbe_util.js')) return { checkSbeFullyEnabled };
    return {};
  }
  return origRequire.apply(this, arguments);
};

// Main
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node jstest-logger.js <jstest-file> > output.json');
  process.exit(1);
}

executionLog.source = filePath;
log('start', { file: filePath });

try {
  const content = fs.readFileSync(filePath, 'utf8')
    .replace(/\/\/.*$/gm, '')
    .replace(/^\/\*[\s\S]*?\*\//gm, '')
    .replace(/@tags:\s*\[[\s\S]*?\]/, '')
    .replace(/^import\s+.*$/gm, '');
  
  const fn = new Function('db', 'assert', 'assertArrayEq', 'checkSbeFullyEnabled', 
    'ObjectId', 'ISODate', 'NumberLong', 'NumberInt', content);
  
  fn(db, assert, assertArrayEq, checkSbeFullyEnabled, ObjectId, ISODate, NumberLong, NumberInt);
  
  log('end', { status: 'success' });
} catch (e) {
  log('error', { message: e.message });
  executionLog.errors.push({ message: e.message });
}

console.log(JSON.stringify(executionLog, null, 2));
