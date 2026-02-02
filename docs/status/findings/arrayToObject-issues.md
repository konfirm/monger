# $arrayToObject - Known Issues

**Operator**: `$arrayToObject`  
**Type**: Array  
**MongoDB Version**: 3.6  
**Status**: ⚠️ Partial Implementation (45% pass rate)

## Summary

The `$arrayToObject` operator has basic functionality but fails on edge cases including null handling, format validation, and error message formatting.

## Test Results

**Test File**: `test-data/arrayToObject.json`

**Current Status**: 13/29 tests passing (45%)

**Failing Tests** (16 failures):

### Null Handling Issues

- ❌ **Null input returns null**
  - Expected: `null`
  - Actual: Error: `$arrayToObject requires an array input, found: object`
  - Issue: Null should be returned, not error

- ❌ **Undefined input returns null**
  - Expected: `null`
  - Actual: Error: `$arrayToObject requires an array input, found: string`
  - Issue: Undefined should be treated as null

- ❌ **Missing field returns null**
  - Expected: `null`
  - Actual: Error: `$arrayToObject requires an array input, found: undefined`
  - Issue: Missing fields should return null

### Validation Issues

- ❌ **Mixed formats detection**
  - Error message format mismatch
  - Getting: Object detected first, then array
  - Should be: Consistent format error

- ❌ **First element not array or object**
  - Input: `[0]`
  - Expected: Error 40398
  - Actual: Returns `{}` (empty object)

- ❌ **Tuple with non-string key**
  - Input: `[[321, 12]]`
  - Expected: Error 40395 (key must be string)
  - Actual: Returns `{"321": 12}` (converts to string)

- ❌ **Object format with extra fields**
  - Input: `[{"y": "ignored", "k": "item", "v": "pear"}]`
  - Expected: Error 40392 (too many keys)
  - Actual: Behavior not consistent with MongoDB

- ❌ **Null byte in key (tuple)**
  - Input: `[["a\u0000b", "value"]]`
  - Expected: Error 4940400
  - Actual: Returns object with null byte key

- ❌ **Null byte in key (object format)**
  - Input: `[{"k": "a\u0000b", "v": "blah"}]`
  - Expected: Error 4940401
  - Actual: Returns object with null byte key

## Issues Identified

### Issue #1: Null Input Handling
**Priority**: High

**Current Behavior**:
```javascript
$arrayToObject(null)      // Throws error (should return null)
$arrayToObject(undefined) // Throws error (should return null)
$arrayToObject("$missing") // Throws error (should return null)
```

**Expected Behavior** (per MongoDB spec):
- `null` input → returns `null`
- `undefined` input → returns `null`
- Missing field → returns `null`
- Only non-nullish, non-array values should throw error 40386

**Fix**: Check for null/undefined BEFORE type validation:
```typescript
if (value === null || value === undefined) {
  return null;
}
if (!isArray(value)) {
  throw new Error("$arrayToObject requires an array input, found: " + typeof value);
}
```

### Issue #2: Non-String Key Validation
**Priority**: Medium

**Current Behavior**: Converts non-string keys to strings
```javascript
$arrayToObject([[321, 12]]) // Returns {"321": 12}
```

**Expected Behavior**: Throw error 40395
```javascript
$arrayToObject([[321, 12]]) // Error: key must be of type string
```

**Note**: MongoDB requires keys to be strings. Numbers should not be auto-converted.

### Issue #3: Null Byte Validation
**Priority**: Low (security edge case)

**Current Behavior**: Allows null bytes in keys
```javascript
$arrayToObject([["a\u0000b", "value"]]) // Returns {"a\u0000b": "value"}
```

**Expected Behavior**: Throw error 4940400/4940401

**Note**: MongoDB prohibits null bytes in document keys (BSON restriction).

### Issue #4: Format Consistency
**Priority**: Medium

**Current Behavior**: Doesn't enforce consistent format mixing

**Expected Behavior**: 
- If first element is array (tuple format), all elements must be arrays
- If first element is object (k/v format), all elements must be objects
- Mixed formats should throw error 40391 or 40396

## Implementation Location

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Array.ts` (lines 88-116)

**Current Issues in Code**:
```typescript
// Line 39 - Wrong order: checks isArray before null check
if (!isArray(array)) {
  return null;  // This is wrong - should throw for non-array, non-null
}

// Line 46 - No type validation for keys
const tuple = item as [unknown, unknown];
result[String(tuple[0])] = tuple[1];  // Auto-converts to string
```

## Proposed Fixes

### Fix #1: Proper Null Handling
```typescript
return (input: any): T | null => {
  const array = resolve(input);
  
  // Check for null/undefined first
  if (array === null || array === undefined) {
    return null;
  }
  
  // Then validate it's an array
  if (!isArray(array)) {
    throw new Error("$arrayToObject requires an array input, found: " + typeof array);
  }
  
  // ... rest of implementation
};
```

### Fix #2: Key Validation
```typescript
// For tuple format
if (Array.isArray(item) && item.length === 2) {
  const [key, value] = item;
  
  // Validate key is string
  if (typeof key !== 'string') {
    throw new Error("$arrayToObject requires an array of key-value pairs, where the key must be of type string");
  }
  
  // Check for null bytes
  if (key.includes('\u0000')) {
    throw new Error("Key field cannot contain an embedded null byte");
  }
  
  result[key] = value;
}
```

## Test Command

Run tests to verify:
```bash
node scripts/run-mongodb-tests.js arrayToObject
```

## Progress

From test run (29 tests):
- ✅ 13 passing (45%)
- ❌ 16 failing (55%)

**Target**: 100% passing

## Related

- **Test Data**: `test-data/arrayToObject.json` (complete with all edge cases)
- **MongoDB jstests**: `mongo/jstests/aggregation/expressions/arrayToObject.js`
- **Implementation**: `mongo/src/mongo/db/exec/expression/evaluate_array.cpp` (lines 151-255)

## Notes

- This is one of the more complex array operators
- Has 11 different error codes in MongoDB
- Both tuple and object formats need to be supported
- Null byte validation is a security consideration
- The existing implementation covers basic cases well

