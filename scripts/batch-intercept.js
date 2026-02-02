#!/usr/bin/env node
/**
 * Batch Intercept - Run tracer on all operators from README
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const README_PATH = path.join(__dirname, '..', 'docs', 'status', 'README.md');
const TRACER_SCRIPT = path.join(__dirname, 'jstest-tracer.js');
const OUTPUT_DIR = path.join(__dirname, '..', 'test-data', 'intercepted');
const MONGO_JSTESTS = path.join(__dirname, '..', 'mongo', 'jstests');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Parse README to get operator list
function getOperatorsFromReadme() {
  const content = fs.readFileSync(README_PATH, 'utf8');
  const operators = [];
  
  // Match lines like: | [`$eq`](#eq) | Comparison | 1.0 | ✓ |
  // More flexible regex to handle varying whitespace
  const regex = /\[\`\$([a-zA-Z0-9_]+)\`\]\([^)]+\)\s*\|\s*([\w\s]+?)\s*\|\s*([\d.]+)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const [_, name, type, version] = match;
    operators.push({
      name: '$' + name,
      cleanName: name,
      type: type.trim(),
      version: version.trim()
    });
  }
  
  return operators;
}

// Find jstest files for an operator
function findJstestFiles(operator) {
  const files = [];
  const cleanOp = operator.cleanName.toLowerCase();
  
  // Search in aggregation/expressions
  const exprDir = path.join(MONGO_JSTESTS, 'aggregation', 'expressions');
  if (fs.existsSync(exprDir)) {
    const exprFiles = fs.readdirSync(exprDir);
    for (const file of exprFiles) {
      if (file.toLowerCase().includes(cleanOp) && file.endsWith('.js')) {
        files.push(path.join(exprDir, file));
      }
    }
  }
  
  // Search in aggregation/sources subdirectories
  const sourcesDir = path.join(MONGO_JSTESTS, 'aggregation', 'sources');
  if (fs.existsSync(sourcesDir)) {
    const subdirs = fs.readdirSync(sourcesDir, { withFileTypes: true })
      .filter(d => d.isDirectory());
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(sourcesDir, subdir.name);
      const subFiles = fs.readdirSync(subdirPath);
      for (const file of subFiles) {
        if (file.toLowerCase().includes(cleanOp) && file.endsWith('.js')) {
          files.push(path.join(subdirPath, file));
        }
      }
    }
  }
  
  // Search in core
  const coreDir = path.join(MONGO_JSTESTS, 'core');
  if (fs.existsSync(coreDir)) {
    const coreFiles = fs.readdirSync(coreDir);
    for (const file of coreFiles) {
      if (file.toLowerCase().includes(cleanOp) && file.endsWith('.js')) {
        files.push(path.join(coreDir, file));
      }
    }
  }
  
  return [...new Set(files)]; // Remove duplicates
}

// Run tracer on a file
function runTracer(jstestPath, outputName) {
  try {
    const result = execSync(
      `node "${TRACER_SCRIPT}" "${jstestPath}"`,
      { encoding: 'utf8', timeout: 30000, maxBuffer: 50 * 1024 * 1024 }
    );
    
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.json`);
    fs.writeFileSync(outputPath, result);
    
    // Count operations
    const data = JSON.parse(result);
    const opCount = data.sequence?.length || 0;
    
    return { success: true, operations: opCount, output: outputPath };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Main
function main() {
  console.log('🔍 Parsing README.md for operators...\n');
  const operators = getOperatorsFromReadme();
  console.log(`Found ${operators.length} operators\n`);
  
  let processed = 0;
  let succeeded = 0;
  let failed = 0;
  const results = [];
  
  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];
    console.log(`[${i + 1}/${operators.length}] ${op.name} (${op.type})`);
    
    const jstestFiles = findJstestFiles(op);
    
    if (jstestFiles.length === 0) {
      console.log(`  ⚠️  No jstest files found`);
      results.push({ operator: op.name, status: 'no_files' });
      continue;
    }
    
    console.log(`  📁 Found ${jstestFiles.length} test file(s)`);
    
    // Process first file (or all files)
    for (let j = 0; j < jstestFiles.length; j++) {
      const file = jstestFiles[j];
      const outputName = j === 0 ? op.cleanName : `${op.cleanName}_${j}`;
      
      process.stdout.write(`  🔄 Processing ${path.basename(file)}... `);
      const result = runTracer(file, outputName);
      
      if (result.success) {
        console.log(`✅ (${result.operations} ops)`);
        succeeded++;
      } else {
        console.log(`❌ ${result.error.substring(0, 50)}`);
        failed++;
      }
      
      results.push({
        operator: op.name,
        file: path.basename(file),
        status: result.success ? 'success' : 'error',
        operations: result.operations || 0
      });
    }
    
    processed++;
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total operators: ${operators.length}`);
  console.log(`Processed: ${processed}`);
  console.log(`Successful: ${succeeded}`);
  console.log(`Failed: ${failed}`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  
  // Save summary
  const summaryPath = path.join(OUTPUT_DIR, '_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalOperators: operators.length,
    processed,
    succeeded,
    failed,
    results
  }, null, 2));
  
  console.log(`Summary saved: ${summaryPath}`);
}

main();
