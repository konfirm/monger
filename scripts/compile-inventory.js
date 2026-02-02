#!/usr/bin/env node
/**
 * Compile comprehensive inventory of all operators and their test results
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_DATA_DIR = path.join(__dirname, '..', 'test-data');
const INVENTORY_FILE = path.join(TEST_DATA_DIR, 'inventory-report.json');

function testOperator(operatorName) {
  const testFile = path.join(TEST_DATA_DIR, `${operatorName}.json`);
  
  if (!fs.existsSync(testFile)) {
    return null;
  }
  
  const testData = JSON.parse(fs.readFileSync(testFile, 'utf8'));
  
  try {
    const output = execSync(
      `node ${path.join(__dirname, 'run-mongodb-tests.js')} ${operatorName} 2>&1`,
      { encoding: 'utf8', timeout: 30000 }
    );
    
    const passedMatch = output.match(/Passed:\s*(\d+)/);
    const failedMatch = output.match(/Failed:\s*(\d+)/);
    const totalMatch = output.match(/Total Tests:\s*(\d+)/);
    
    const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;
    
    const notImplemented = output.includes('Invalid expression') && failed > 0;
    
    return {
      operator: operatorName,
      type: testData.operator || operatorName,
      mongodbVersion: testData.mongodbVersion,
      totalTests: total,
      passed: passed,
      failed: failed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      notImplemented: notImplemented
    };
    
  } catch (error) {
    const output = error.stdout ? error.stdout.toString() : '';
    
    const passedMatch = output.match(/Passed:\s*(\d+)/);
    const failedMatch = output.match(/Failed:\s*(\d+)/);
    const totalMatch = output.match(/Total Tests:\s*(\d+)/);
    
    const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;
    
    const notImplemented = output.includes('Invalid expression');
    
    return {
      operator: operatorName,
      type: testData.operator || operatorName,
      mongodbVersion: testData.mongodbVersion,
      totalTests: total,
      passed: passed,
      failed: failed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      notImplemented: notImplemented
    };
  }
}

function compileInventory() {
  console.log('Compiling operator inventory...\n');
  
  const files = fs.readdirSync(TEST_DATA_DIR)
    .filter(f => f.endsWith('.json') && f !== 'inventory-report.json')
    .map(f => f.replace('.json', ''))
    .sort();
  
  console.log(`Found ${files.length} operators with test data\n`);
  
  const results = [];
  const categories = {
    notImplemented: [],
    needsWork: [],
    partial: [],
    mostlyWorking: [],
    perfect: []
  };
  
  for (let i = 0; i < files.length; i++) {
    const operator = files[i];
    process.stdout.write(`Testing ${operator} (${i + 1}/${files.length})... `);
    
    const result = testOperator(operator);
    
    if (result) {
      results.push(result);
      
      if (result.notImplemented) {
        categories.notImplemented.push(result);
        console.log('NOT IMPLEMENTED');
      } else if (result.passRate === 100) {
        categories.perfect.push(result);
        console.log('PERFECT (100%)');
      } else if (result.passRate >= 81) {
        categories.mostlyWorking.push(result);
        console.log(`${result.passRate}% - mostly working`);
      } else if (result.passRate >= 51) {
        categories.partial.push(result);
        console.log(`${result.passRate}% - partial`);
      } else {
        categories.needsWork.push(result);
        console.log(`${result.passRate}% - needs work`);
      }
    } else {
      console.log('ERROR');
    }
  }
  
  const inventory = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalOperators: results.length,
      notImplemented: categories.notImplemented.length,
      needsWork: categories.needsWork.length,
      partial: categories.partial.length,
      mostlyWorking: categories.mostlyWorking.length,
      perfect: categories.perfect.length
    },
    categories: categories,
    allResults: results
  };
  
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inventory, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('INVENTORY SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Operators: ${results.length}`);
  console.log(`Not Implemented: ${categories.notImplemented.length}`);
  console.log(`Needs Major Work (0-50%): ${categories.needsWork.length}`);
  console.log(`Partial (51-80%): ${categories.partial.length}`);
  console.log(`Mostly Working (81-99%): ${categories.mostlyWorking.length}`);
  console.log(`Perfect (100%): ${categories.perfect.length}`);
  
  if (categories.perfect.length > 0) {
    console.log('\nWorking perfectly:');
    categories.perfect.forEach(r => {
      console.log(`  - ${r.operator} (${r.passed}/${r.totalTests})`);
    });
  }
  
  if (categories.mostlyWorking.length > 0) {
    console.log('\nMostly working (easy fixes):');
    categories.mostlyWorking.slice(0, 10).forEach(r => {
      console.log(`  - ${r.operator} (${r.passed}/${r.totalTests} = ${r.passRate}%)`);
    });
  }
  
  console.log(`\nInventory saved to: ${INVENTORY_FILE}`);
}

compileInventory();
