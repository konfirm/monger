#!/usr/bin/env node
/**
 * Batch extract MongoDB test data for ALL operators listed in docs/status/README.md
 * 
 * Usage: node scripts/batch-extract-tests.js
 * Options:
 *   --force    Overwrite existing test files
 *   --dry-run  Show what would be created without creating files
 */

const fs = require('fs');
const path = require('path');

const README_PATH = path.join(__dirname, '..', 'docs', 'status', 'README.md');
const MONGO_TESTS_DIR = path.join(__dirname, '..', 'mongo', 'jstests');
const MONGO_SRC_DIR = path.join(__dirname, '..', 'mongo', 'src');
const OUTPUT_DIR = path.join(__dirname, '..', 'test-data');

// Parse command line arguments
const args = process.argv.slice(2);
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');

/**
 * Parse README.md to extract all operators
 */
function parseOperatorsFromReadme() {
    const content = fs.readFileSync(README_PATH, 'utf8');
    const operators = [];
    
    // Match lines like: | [`$operator`](#...) | Type | Version | Status |
    const operatorRegex = /\|\s*\[`\$([a-zA-Z0-9_]+)`\]\(#([^)]+)\)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;
    
    let match;
    while ((match = operatorRegex.exec(content)) !== null) {
        const operatorName = match[1];
        const anchor = match[2];
        const type = match[3].trim();
        const version = match[4].trim();
        const status = match[5].trim();
        
        // Skip if already in our list
        if (!operators.find(o => o.name === operatorName)) {
            operators.push({
                name: operatorName,
                anchor: anchor,
                type: type,
                mongodbVersion: version,
                implemented: status.includes('✓')
            });
        }
    }
    
    return operators;
}

/**
 * Find test files for an operator in mongo/jstests
 */
function findTestFiles(operator) {
    const results = [];
    const searchPatterns = [
        operator.toLowerCase(),
        operator.toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase(), // camelCase to snake_case
    ];
    
    // Search in aggregation/expressions directory
    const expressionsDir = path.join(MONGO_TESTS_DIR, 'aggregation', 'expressions');
    if (fs.existsSync(expressionsDir)) {
        const files = fs.readdirSync(expressionsDir);
        for (const file of files) {
            const fileLower = file.toLowerCase().replace('.js', '');
            if (searchPatterns.some(p => fileLower.includes(p) || p.includes(fileLower))) {
                results.push(path.join(expressionsDir, file));
            }
        }
    }
    
    // Search in aggregation/sources
    const sourcesDir = path.join(MONGO_TESTS_DIR, 'aggregation', 'sources');
    if (fs.existsSync(sourcesDir) && fs.statSync(sourcesDir).isDirectory()) {
        const subdirs = fs.readdirSync(sourcesDir, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);
        
        for (const subdir of subdirs) {
            const subdirPath = path.join(sourcesDir, subdir);
            const files = fs.readdirSync(subdirPath);
            for (const file of files) {
                const fileLower = file.toLowerCase().replace('.js', '');
                if (searchPatterns.some(p => fileLower.includes(p))) {
                    results.push(path.join(subdirPath, file));
                }
            }
        }
    }
    
    return [...new Set(results)]; // Remove duplicates
}

/**
 * Find implementation source files
 */
function findImplementationFiles(operator) {
    const results = [];
    const searchName = operator.toLowerCase();
    
    // Common implementation directories
    const implDirs = [
        path.join(MONGO_SRC_DIR, 'mongo', 'db', 'exec', 'expression'),
        path.join(MONGO_SRC_DIR, 'mongo', 'db', 'pipeline'),
    ];
    
    for (const dir of implDirs) {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir).filter(f => f.endsWith('.cpp') || f.endsWith('.h'));
            for (const file of files) {
                const fileLower = file.toLowerCase();
                if (fileLower.includes(searchName) || fileLower.includes('expression_' + searchName)) {
                    results.push(path.join(dir, file));
                }
            }
        }
    }
    
    return [...new Set(results)];
}

/**
 * Extract error codes from test file content
 */
function extractErrorCodes(content) {
    const errors = [];
    
    // Look for assertErrorCode patterns
    const errorPatterns = [
        { regex: /assertErrorCode\s*\(\s*[^,]+,\s*[^,]+,\s*(\d+)\s*,?[^)]*\)/g, type: 'assertErrorCode' },
        { regex: /ErrorCodes\.(\w+)/g, type: 'ErrorCodes' },
        { regex: /(\d{6})/g, type: 'numericCode' }, // 6-digit error codes
    ];
    
    for (const pattern of errorPatterns) {
        let match;
        while ((match = pattern.regex.exec(content)) !== null) {
            const errorCode = match[1];
            // Get surrounding context
            const start = Math.max(0, match.index - 100);
            const end = Math.min(content.length, match.index + 200);
            const context = content.substring(start, end).trim();
            
            errors.push({
                code: errorCode,
                type: pattern.type,
                context: context.replace(/\s+/g, ' ').substring(0, 200)
            });
        }
    }
    
    // Deduplicate by code
    const seen = new Set();
    return errors.filter(e => {
        if (seen.has(e.code)) return false;
        seen.add(e.code);
        return true;
    });
}

/**
 * Generate test data structure for an operator
 */
function generateTestData(operator, testFiles, implFiles) {
    const cleanOperator = operator.name.startsWith('$') ? operator.name : `$${operator.name}`;
    
    // Parse test files if they exist
    let extractedTests = {
        happyPath: [],
        errorCases: [],
        nullCases: [],
        edgeCases: [],
        typeConversionCases: []
    };
    
    let allErrorCodes = [];
    const sources = [];
    
    for (const testFile of testFiles) {
        if (fs.existsSync(testFile)) {
            const content = fs.readFileSync(testFile, 'utf8');
            const errors = extractErrorCodes(content);
            allErrorCodes = allErrorCodes.concat(errors);
            sources.push(testFile.replace(path.join(__dirname, '..'), '').replace(/\\/g, '/'));
        }
    }
    
    const implSources = implFiles.map(f => 
        f.replace(path.join(__dirname, '..'), '').replace(/\\/g, '/')
    );
    
    // Generate template tests based on operator type
    const type = operator.type;
    
    // Add some basic template tests based on operator type
    if (type === 'Comparison') {
        extractedTests.happyPath.push(
            { description: "Basic comparison with matching values", query: { [cleanOperator]: ["$field", 100] }, context: { field: 100 }, expected: true },
            { description: "Basic comparison with non-matching values", query: { [cleanOperator]: ["$field", 100] }, context: { field: 50 }, expected: false }
        );
    } else if (type === 'Arithmetic') {
        extractedTests.happyPath.push(
            { description: "Basic arithmetic operation", query: { [cleanOperator]: [10, 5] }, expected: null },
            { description: "Arithmetic with field references", query: { [cleanOperator]: ["$a", "$b"] }, context: { a: 10, b: 5 }, expected: null }
        );
        extractedTests.nullCases.push(
            { description: "Operation with null argument", query: { [cleanOperator]: [null, 5] }, expected: null }
        );
    } else if (type === 'Array') {
        extractedTests.happyPath.push(
            { description: "Basic array operation", query: { [cleanOperator]: [[1, 2, 3]] }, expected: null }
        );
        extractedTests.nullCases.push(
            { description: "Operation with null array", query: { [cleanOperator]: [null] }, expected: null }
        );
    } else if (type === 'String') {
        extractedTests.happyPath.push(
            { description: "Basic string operation", query: { [cleanOperator]: ["hello", "world"] }, expected: null }
        );
    } else if (type === 'Boolean') {
        extractedTests.happyPath.push(
            { description: "Basic boolean operation with true values", query: { [cleanOperator]: [true, true] }, expected: true },
            { description: "Basic boolean operation with false values", query: { [cleanOperator]: [true, false] }, expected: false }
        );
    } else if (type === 'Date') {
        extractedTests.happyPath.push(
            { description: "Basic date operation", query: { [cleanOperator]: ["$dateField"] }, context: { dateField: new Date("2024-01-01") }, expected: null }
        );
    }
    
    return {
        operator: cleanOperator,
        description: `Tests for ${cleanOperator} - ${type} operator`,
        mongodbVersion: operator.mongodbVersion || "TBD",
        implemented: operator.implemented,
        source: sources.length > 0 ? sources.join(', ') : `mongo/jstests/aggregation/expressions/${operator.name}.js`,
        implementationSource: implSources.length > 0 ? implSources.join(', ') : "TBD",
        tests: extractedTests,
        errorCodes: allErrorCodes.length > 0 ? allErrorCodes : undefined,
        metadata: {
            extractedAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            totalTests: extractedTests.happyPath.length + extractedTests.errorCases.length + extractedTests.nullCases.length,
            happyPathCount: extractedTests.happyPath.length,
            errorCaseCount: extractedTests.errorCases.length,
            nullCaseCount: extractedTests.nullCases.length,
            edgeCaseCount: extractedTests.edgeCases.length,
            typeConversionCount: extractedTests.typeConversionCases.length,
            errorCodesExtracted: allErrorCodes.length > 0,
            notes: [
                `Generated by batch-extract-tests.js`,
                `Operator type: ${type}`,
                `MongoDB version: ${operator.mongodbVersion || 'TBD'}`,
                `Implementation status: ${operator.implemented ? '✓ Implemented' : '× Not implemented'}`,
                testFiles.length === 0 ? `No jstests file found - template created` : `Found ${testFiles.length} jstest file(s)`,
                `Fill in expected values and add more test cases from MongoDB documentation`
            ],
            mongodbSourceFiles: implSources.length > 0 ? implSources : undefined
        }
    };
}

/**
 * Main execution
 */
function main() {
    console.log('='.repeat(80));
    console.log('Batch Extract MongoDB Test Data');
    console.log('='.repeat(80));
    console.log(`
Mode: ${dryRun ? 'DRY RUN (no files will be created)' : 'LIVE'}
Force overwrite: ${force ? 'YES' : 'NO'}
Output directory: ${OUTPUT_DIR}
`);
    
    // Ensure output directory exists
    if (!dryRun && !fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`Created output directory: ${OUTPUT_DIR}\n`);
    }
    
    // Parse operators from README
    console.log('Parsing operators from README.md...');
    const operators = parseOperatorsFromReadme();
    console.log(`Found ${operators.length} operators\n`);
    
    // Statistics
    let created = 0;
    let skipped = 0;
    let errors = 0;
    const createdFiles = [];
    const skippedFiles = [];
    
    // Process each operator
    console.log('Processing operators...\n');
    console.log('-'.repeat(80));
    
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        
        // Find test files first to determine operator type
        const testFiles = findTestFiles(operator.name);
        
        // Determine if this is an expression operator based on test file location
        const isExpressionOperator = testFiles.some(f => f.includes('aggregation/expressions'));
        
        // Set output filename based on operator type
        const filename = isExpressionOperator ? `expr-${operator.name}.json` : `${operator.name}.json`;
        const outputFile = path.join(OUTPUT_DIR, filename);
        
        // Check if file already exists (check both naming conventions for backwards compatibility)
        const oldStyleFile = path.join(OUTPUT_DIR, `${operator.name}.json`);
        const fileExists = fs.existsSync(outputFile) || fs.existsSync(oldStyleFile);
        
        if (fileExists && !force) {
            console.log(`[${i + 1}/${operators.length}] SKIPPED: ${operator.name} (already exists)`);
            skipped++;
            skippedFiles.push(operator.name);
            continue;
        }
        
        try {
            // Find implementation files
            const implFiles = findImplementationFiles(operator.name);
            
            // Generate test data
            const testData = generateTestData(operator, testFiles, implFiles);
            
            if (!dryRun) {
                // Write the file
                fs.writeFileSync(outputFile, JSON.stringify(testData, null, 2));
            }
            
            const action = fs.existsSync(outputFile) && force ? 'OVERWRITTEN' : 'CREATED';
            const testFileStatus = testFiles.length > 0 ? `(${testFiles.length} test files)` : '(no test files)';
            const implFileStatus = implFiles.length > 0 ? `(${implFiles.length} impl files)` : '(no impl files)';
            
            console.log(`[${i + 1}/${operators.length}] ${action}: ${operator.name} ${testFileStatus} ${implFileStatus}`);
            
            created++;
            createdFiles.push(operator.name);
            
        } catch (err) {
            console.error(`[${i + 1}/${operators.length}] ERROR: ${operator.name} - ${err.message}`);
            errors++;
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`
Total operators: ${operators.length}
Created: ${created}
Skipped: ${skipped}
Errors: ${errors}
`);
    
    if (created > 0) {
        console.log('Created files:');
        createdFiles.forEach(f => console.log(`  - ${f}.json`));
        console.log('');
    }
    
    if (skipped > 0 && !force) {
        console.log('Skipped (already exist - use --force to overwrite):');
        skippedFiles.slice(0, 10).forEach(f => console.log(`  - ${f}.json`));
        if (skippedFiles.length > 10) {
            console.log(`  ... and ${skippedFiles.length - 10} more`);
        }
        console.log('');
    }
    
    if (dryRun) {
        console.log('\n*** DRY RUN - No files were actually created ***');
        console.log('Remove --dry-run flag to create files\n');
    }
    
    console.log('Done!\n');
}

main();
