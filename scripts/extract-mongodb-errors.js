#!/usr/bin/env node
/**
 * Extract MongoDB error messages from C++ source files
 * 
 * Usage: node scripts/extract-mongodb-errors.js <operator-name>
 * Example: node scripts/extract-mongodb-errors.js arrayToObject
 */

const fs = require('fs');
const path = require('path');

const MONGO_SRC_DIR = path.join(__dirname, '..', 'mongo', 'src');
const OUTPUT_DIR = path.join(__dirname, '..', 'test-data');

/**
 * Find C++ implementation files for an expression operator
 */
function findSourceFiles(operatorName) {
    const results = [];
    const cleanName = operatorName.replace(/^\$/, '');
    const expressionName = `Expression${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`;
    
    // Common locations for expression implementations
    const searchDirs = [
        path.join(MONGO_SRC_DIR, 'mongo', 'db', 'exec', 'expression'),
        path.join(MONGO_SRC_DIR, 'mongo', 'db', 'exec', 'sbe', 'vm'),
        path.join(MONGO_SRC_DIR, 'mongo', 'db', 'pipeline'),
    ];
    
    console.log(`Searching for ${operatorName} (${expressionName}) implementation...\n`);
    
    for (const dir of searchDirs) {
        if (!fs.existsSync(dir)) continue;
        
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (!file.endsWith('.cpp')) continue;
            
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check if file contains the operator
            if (content.includes(`$${cleanName}`) || 
                content.includes(expressionName) ||
                content.includes(`"${cleanName}"`)) {
                results.push(filePath);
            }
        }
    }
    
    return [...new Set(results)]; // Remove duplicates
}

/**
 * Parse error codes and messages from C++ source
 * Simple approach: find all uassert patterns in relevant files
 */
function parseErrors(sourceFiles, operatorName) {
    const errors = [];
    const seenCodes = new Set(); // Track unique error codes
    
    for (const file of sourceFiles) {
        // Skip test files
        if (file.includes('_test.cpp')) continue;
        
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        // Look for uassert patterns with line numbers
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Match: uassert(code,
            const uassertStart = line.match(/uassert\s*\(\s*(\d+)\s*,/);
            if (uassertStart) {
                const errorCode = parseInt(uassertStart[1]);
                
                // Skip duplicates
                if (seenCodes.has(errorCode)) continue;
                seenCodes.add(errorCode);
                
                // Collect the full message (may span multiple lines)
                let messageLines = [line];
                let j = i + 1;
                while (j < lines.length && !lines[j].includes('),') && !lines[j].includes(');')) {
                    messageLines.push(lines[j]);
                    j++;
                }
                
                // Extract string literals from message
                const fullText = messageLines.join(' ');
                const stringMatches = [...fullText.matchAll(/"([^"]*)"/g)];
                
                if (stringMatches.length > 0) {
                    let errorMessage = '';
                    for (const match of stringMatches) {
                        errorMessage += match[1];
                    }
                    
                    // Replace dynamic parts with placeholders
                    errorMessage = errorMessage
                        .replace(/typeName\([^)]+\)/g, '<type>')
                        .replace(/getType\(\)/g, '<type>')
                        .replace(/\.size\(\)/g, '<size>')
                        .replace(/coerceTo[^,]+/g, '<value>')
                        .replace(/toString\(\)/g, '<value>');
                    
                    errors.push({
                        code: errorCode,
                        message: errorMessage,
                        sourceFile: file.replace(MONGO_SRC_DIR, 'mongo/src'),
                        line: i + 1
                    });
                }
            }
        }
    }
    
    return errors;
}

/**
 * Generate test data file
 */
function generateTestFile(operatorName, errors) {
    const cleanName = operatorName.replace(/^\$/, '');
    
    const testData = {
        operator: operatorName,
        description: `Tests for ${operatorName} aggregation expression`,
        mongodbVersion: "TBD",
        source: `mongo/jstests/aggregation/expressions/${cleanName}.js`,
        implementationSource: errors.length > 0 ? errors[0].sourceFile : null,
        tests: {
            happyPath: [],
            errors: errors.map(e => ({
                description: `Error ${e.code}`,
                mongodbErrorCode: e.code,
                mongodbErrorMessage: e.message,
                input: null, // To be filled in manually
                expectedError: e.message.replace(/\$[a-zA-Z]+/g, m => m.toLowerCase())
            }))
        },
        metadata: {
            extractedAt: new Date().toISOString().split('T')[0],
            totalTests: errors.length,
            errorCount: errors.length,
            errorCodesExtracted: true,
            errorMessagesExact: true,
            notes: ["Extracted from MongoDB C++ source"],
            mongodbSourceFiles: errors.map(e => e.sourceFile)
        }
    };
    
    return testData;
}

function main() {
    const operatorName = process.argv[2];
    
    if (!operatorName) {
        console.error('Usage: node extract-mongodb-errors.js <operator-name>');
        console.error('Example: node extract-mongodb-errors.js arrayToObject');
        process.exit(1);
    }
    
    console.log(`Extracting error codes for ${operatorName}...\n`);
    
    // Find source files
    const sourceFiles = findSourceFiles(operatorName);
    
    if (sourceFiles.length === 0) {
        console.log(`❌ No source files found for ${operatorName}`);
        console.log('\nSearched in:');
        console.log('  - mongo/src/mongo/db/exec/expression/');
        console.log('  - mongo/src/mongo/db/exec/sbe/vm/');
        console.log('  - mongo/src/mongo/db/pipeline/');
        process.exit(1);
    }
    
    console.log(`✅ Found ${sourceFiles.length} source file(s):`);
    sourceFiles.forEach(f => console.log(`  - ${path.basename(f)}`));
    
    // Parse errors
    const errors = parseErrors(sourceFiles, operatorName);
    
    console.log(`\n✅ Found ${errors.length} error code(s):`);
    errors.forEach(e => {
        console.log(`  - ${e.code}: "${e.message.substring(0, 60)}..."`);
    });
    
    // Generate output
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    const cleanName = operatorName.replace(/^\$/, '');
    const outputFile = path.join(OUTPUT_DIR, `${cleanName}.json`);
    const testData = generateTestFile(operatorName, errors);
    
    fs.writeFileSync(outputFile, JSON.stringify(testData, null, 2));
    console.log(`\n✅ Test data written to: ${outputFile}`);
    console.log('\nNext steps:');
    console.log('1. Fill in test inputs (see mongo/jstests for examples)');
    console.log('2. Run against MongoDB to verify');
    console.log('3. Implement tests in Monger');
}

main();
