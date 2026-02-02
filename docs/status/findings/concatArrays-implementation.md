# $concatArrays - Implementation Needed

**Operator**: `$concatArrays`  
**Type**: Array  
**MongoDB Version**: 3.2  
**Status**: ❌ Not Implemented (0% pass rate)

## Summary

The `$concatArrays` operator is currently not implemented in Monger. All 36 tests fail with "Invalid expression" error.

## Test Results

**Test File**: `test-data/concatArrays.json`

**Current Status**: 0/36 tests passing (0%)

**Error Message**: 
```
Invalid expression: {"$concatArrays": [[1,2,3,4], ["a","b","c"]]}
```

## MongoDB Specification

**Syntax**:
```javascript
{ $concatArrays: [ <array1>, <array2>, ... ] }
```

**Behavior**:
- Takes one or more arrays as arguments
- Returns a concatenated array containing all elements in order
- Returns `null` if any argument is null or missing
- Throws error (28664) if any argument is not an array
- Empty array `[]` returns empty array
- No arguments returns empty array

**Error Code**: 28664
**Error Message**: `$concatArrays only supports arrays, not <type>`

## Implementation Requirements

### Happy Path Cases (16 tests)
1. Single array returns the array
2. Concatenate two arrays
3. Concatenate multiple arrays of different types
4. Concatenate arrays with objects
5. Concatenate nested arrays
6. Concatenate arrays containing null values
7. Empty array returns empty array
8. Complex nested expressions

### Null Cases (11 tests)
- Any null argument returns null
- Missing field returns null
- Multiple arrays with one null returns null

### Error Cases (9 tests)
- Non-array number throws error 28664
- Non-array string throws error 28664
- Non-array object throws error 28664
- Mixed valid and invalid arguments throws error

## Implementation Location

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Array.ts`

**Suggested Implementation**:

```typescript
export function $concatArrays(
  query: Array<unknown>,
  compile: ExpressionCompiler,
): Evaluator<Array<unknown> | null> {
  // Validate that query is an array
  if (!isArray(query)) {
    throw new Error("$concatArrays must be an array");
  }

  // Compile all array expressions
  const expressions = query.map(compile);

  return (input: any) => {
    const result: Array<unknown> = [];

    for (const expr of expressions) {
      const value = expr(input);

      // Check for null/missing - returns null
      if (value === null || value === undefined) {
        return null;
      }

      // Validate it's an array
      if (!isArray(value)) {
        throw new Error("$concatArrays only supports arrays, not " + typeof value);
      }

      // Concatenate
      result.push(...value);
    }

    return result;
  };
}
```

## Validation Rules

1. **Input must be array**: Check with @konfirm/guard `isArray`
2. **Each evaluated expression must be array**: Runtime check
3. **Null/missing handling**: Return null immediately if encountered
4. **Type error**: Throw with code 28664 message

## Test Command

Run tests to verify:
```bash
node scripts/run-mongodb-tests.js concatArrays
```

## Implementation Checklist

- [ ] Implement `$concatArrays` function in `Array.ts`
- [ ] Add to `Operation` and `Result` type definitions
- [ ] Add error handling for non-array inputs
- [ ] Add null/missing handling
- [ ] Write comprehensive tests
- [ ] Verify all 36 tests pass
- [ ] Update README.md status

## Related Operators

- `$arrayToObject` - Converting arrays to objects (already implemented)
- `$objectToArray` - Converting objects to arrays (needs implementation)
- `$slice` - Array slicing (needs implementation)
- `$size` - Array length (needs implementation)

## Notes

- This is a commonly used operator in aggregations
- Test data is complete and ready to use
- Error code 28664 is extracted from MongoDB source
- Implementation is straightforward - just array concatenation

## MongoDB Source Reference

- **jstests**: `mongo/jstests/aggregation/expressions/concat_arrays.js`
- **Implementation**: `mongo/src/mongo/db/exec/expression/evaluate_array.cpp` (lines 257-276)

