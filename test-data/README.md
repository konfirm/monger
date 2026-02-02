# MongoDB Test Extraction Tool

This tool extracts test cases from MongoDB's official jstests to create comprehensive test data for Monger.

## Overview

MongoDB maintains an extensive test suite in `mongo/jstests/` with thousands of test files. This tool helps us:

1. Extract test cases for specific operators
2. Identify error codes and edge cases
3. Create structured JSON test data
4. Compare Monger behavior against MongoDB

## Current Status

### Completed Extractions

| Operator | File | Status | Test Count |
|----------|------|--------|------------|
| $arrayToObject | `test-data/arrayToObject.json` | ✅ Complete | 28 tests |

### Extraction Process

1. **Find the test file** in `mongo/jstests/aggregation/expressions/`
2. **Parse test cases** - both happy path and error cases
3. **Extract error codes** - MongoDB uses specific numeric error codes
4. **Structure the data** - JSON format with metadata
5. **Verify against MongoDB** - Run tests against actual MongoDB instance

## Test Data Format

```json
{
  "operator": "$operatorName",
  "description": "Human-readable description",
  "mongodbVersion": "3.6",
  "source": "mongo/jstests/aggregation/expressions/operator.js",
  "tests": {
    "happyPath": [
      {
        "description": "What this test checks",
        "input": /* input value */,
        "expected": /* expected output */
      }
    ],
    "errors": [
      {
        "description": "What error this tests",
        "input": /* invalid input */,
        "mongodbErrorCode": 12345,
        "expectedError": "Human-readable error description"
      }
    ]
  },
  "metadata": {
    "extractedAt": "2026-02-01",
    "totalTests": 42,
    "notes": ["Important observations"]
  }
}
```

## Usage

### Manual Extraction

For now, manual extraction from jstests is recommended:

1. Find the test file:
   ```bash
   find mongo/jstests -name "*<operator>*.js" -type f
   ```

2. Read the test file and identify:
   - `assert.*()` calls for happy path tests
   - `assertErrorCode()` calls for error cases
   - Test functions like `assertCollapsed()`, `assertPipelineErrors()`

3. Extract test data to JSON format

4. Note the MongoDB error codes - these are documented in:
   - `mongo/src/mongo/base/error_codes.yml`
   - Search the codebase for the error code number

### Using the Extraction Script

```bash
# Generate a template for an operator
node scripts/extract-mongodb-tests.js $concatArrays

# This creates test-data/concatArrays.json with a template
```

## Error Code Reference

MongoDB error codes are defined in `mongo/src/mongo/base/error_codes.yml`. Common expression error codes:

| Code | Error | Description |
|------|-------|-------------|
| 40386 | ErrorCodes::ExpressionFailed | General expression failure |
| 40391 | 40391 | arrayToObject mixed formats |
| 40392 | 40392 | arrayToObject missing v field |
| 40393 | 40393 | arrayToObject missing required fields |
| 40394 | 40394 | arrayToObject non-string key |
| 40395 | 40395 | arrayToObject tuple non-string key |
| 40396 | 40396 | arrayToObject mixed formats (reverse) |
| 40397 | 40397 | arrayToObject tuple wrong size |
| 40398 | 40398 | arrayToObject single element array |
| 4940400 | 4940400 | arrayToObject null byte in key (tuple) |
| 4940401 | 4940401 | arrayToObject null byte in key (object) |

## Comparison Strategy

Since exact error message parity is impractical (MongoDB error codes are scattered throughout C++ codebase), we:

1. **Document MongoDB error codes** in our test data for reference
2. **Create descriptive error messages** that help developers understand the issue
3. **Test the same edge cases** MongoDB tests
4. **Match behavior** (success/failure) even if error messages differ

## Next Steps

### Priority Operators to Extract

1. **$concatArrays** (Array, MongoDB 3.2) - Next priority
2. **$concat** (String, MongoDB 1.0)
3. **$in** (Comparison, MongoDB 1.0)
4. **$size** (Array, MongoDB 1.0)

### Automation Ideas

Future improvements could include:

1. **Regex-based parser** to extract `assert.*` patterns from JS files
2. **MongoDB runner** to execute queries against a real MongoDB and capture outputs
3. **Diff tool** to compare Monger output vs MongoDB output
4. **Coverage tracker** showing which MongoDB tests we've implemented

## Example: $arrayToObject

See `test-data/arrayToObject.json` for a complete example:
- 10 happy path tests
- 19 error tests with MongoDB error codes
- 2 collation-specific tests
- Metadata with notes about edge cases

This comprehensive coverage ensures Monger handles all the same scenarios as MongoDB.
