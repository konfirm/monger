#!/usr/bin/env ts-node
/**
 * Compile intercepted scenarios + MongoDB results into TypeScript test data
 * 
 * Outputs .ts files with real types (undefined, Infinity, NaN, etc.)
 */

import * as fs from 'fs';
import * as path from 'path';

const INTERCEPTED_DIR = path.join(__dirname, '..', 'test-data', 'intercepted');
const RESULTS_DIR = path.join(__dirname, '..', 'test-data', 'result', '7.0.8');
const OUTPUT_DIR = path.join(__dirname, '..', 'test-data', 'compiled-ts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Serialize a value to TypeScript code, handling special types
 */
function serializeToTs(value: any, indent: string = ''): string {
  if (value === undefined) {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return 'NaN';
    if (value === Infinity) return 'Infinity';
    if (value === -Infinity) return '-Infinity';
    return String(value);
  }
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'boolean') {
    return String(value);
  }
  if (value instanceof Date) {
    return `new Date(${JSON.stringify(value.toISOString())})`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => serializeToTs(v, indent + '  '));
    return `[\n${indent}  ${items.join(',\n' + indent + '  ')}\n${indent}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    const props = entries.map(([k, v]) => {
      // Quote key if needed
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${key}: ${serializeToTs(v, indent + '  ')}`;
    });
    return `{\n${indent}  ${props.join(',\n' + indent + '  ')}\n${indent}}`;
  }
  return JSON.stringify(value);
}

function compileTestData(operatorName: string): string | null {
  const interceptedFile = path.join(INTERCEPTED_DIR, `${operatorName}.json`);
  const resultsFile = path.join(RESULTS_DIR, `${operatorName}.json`);
  
  if (!fs.existsSync(interceptedFile) || !fs.existsSync(resultsFile)) {
    return null;
  }
  
  const intercepted = JSON.parse(fs.readFileSync(interceptedFile, 'utf8'));
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  
  // Extract operator name from first pipeline
  let operator = 'unknown';
  const firstAgg = intercepted.sequence?.find((s: any) => s.type === 'aggregate');
  if (firstAgg?.pipeline?.[0]?.$project) {
    const proj = firstAgg.pipeline[0].$project;
    const field = Object.values(proj)[0] as any;
    if (field && typeof field === 'object') {
      operator = Object.keys(field).find((k: string) => k.startsWith('$')) || 'unknown';
    }
  }
  
  // Build test cases
  const happyPath: any[] = [];
  const nullCases: any[] = [];
  const errors: any[] = [];
  const edgeCases: any[] = [];
  
  const aggregates = intercepted.sequence?.filter((s: any) => s.type === 'aggregate') || [];
  
  aggregates.forEach((agg: any, index: number) => {
    const result = results.operations?.[index];
    if (!result) return;
    
    // Determine category
    let category = happyPath;
    if (result.error || !result.success) {
      category = errors;
    } else if (JSON.stringify(result.result).includes('null')) {
      category = nullCases;
    }
    
    // Build context from collection state
    const context: any = {};
    const collections = intercepted.state?.collections || {};
    Object.values(collections).forEach((docs: any) => {
      if (Array.isArray(docs) && docs.length > 0) {
        Object.assign(context, docs[0]);
      }
    });
    
    // Extract query from pipeline
    let query: any = {};
    if (agg.pipeline?.[0]?.$project) {
      const proj = agg.pipeline[0].$project;
      const fieldExpr = Object.values(proj)[0];
      if (typeof fieldExpr === 'object') {
        query = fieldExpr;
      }
    }
    
    const testCase = {
      description: `Operation ${index + 1}`,
      query,
      context,
      expected: result.success ? result.result : { error: result.error?.message || 'error' }
    };
    
    category.push(testCase);
  });
  
  // Generate TypeScript code
  const tsCode = `/**
 * Test data for ${operator}
 * Source: ${intercepted.source}
 * Validated against: MongoDB ${results.mongoVersion || '7.0.8'}
 * Generated: ${new Date().toISOString()}
 */

export const operator = ${JSON.stringify(operator)};

export const description = 'Test from MongoDB jstests';

export const tests = {
${happyPath.length > 0 ? `  happyPath: ${serializeToTs(happyPath, '  ')},` : ''}
${nullCases.length > 0 ? `  nullCases: ${serializeToTs(nullCases, '  ')},` : ''}
${errors.length > 0 ? `  errors: ${serializeToTs(errors, '  ')},` : ''}
${edgeCases.length > 0 ? `  edgeCases: ${serializeToTs(edgeCases, '  ')},` : ''}
};

export default tests;
`;
  
  return tsCode;
}

// Main
function main() {
  const files = fs.readdirSync(INTERCEPTED_DIR)
    .filter((f: string) => f.endsWith('.json'))
    .map((f: string) => f.replace('.json', ''));
  
  console.log(`Compiling ${files.length} test data files to TypeScript...\n`);
  
  let success = 0;
  let skipped = 0;
  
  for (const operator of files) {
    process.stdout.write(`${operator}... `);
    
    const tsCode = compileTestData(operator);
    
    if (!tsCode) {
      console.log('⚠️  skipped (no data)');
      skipped++;
      continue;
    }
    
    const outputFile = path.join(OUTPUT_DIR, `${operator}.ts`);
    fs.writeFileSync(outputFile, tsCode);
    
    console.log('✅');
    success++;
  }
  
  console.log(`\n✨ Done! ${success} compiled, ${skipped} skipped`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main();
