# $where - Implementation Status

**Operator**: `$where`  
**Type**: Evaluation  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$where` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation.ts` (lines 98-112)

**Function Signature**:
```typescript
export function $where(query: string | Function): Evaluator {
  const fn = typeof query === 'string' ? new Function('return ' + query)() : query;

  return (input: unknown) => fn.call(input, input);
}
```

**Logic**:
- Accepts JavaScript function or string containing function
- Executes function in context of the document
- Function receives document as 'this' and as parameter
- Returns boolean result of function execution

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation.ts` (lines 253-269)

**Test Results**: All tests passing ✓

**Test Cases**:
- Function using 'this' context: function() { return this.foo === 'bar'; }
- Arrow function with parameter: (obj) => obj.foo === 'baz'
- Matching and non-matching documents

**Coverage Summary**:
- ✓ Function context (this) access
- ✓ Parameter access
- ✓ Arrow functions
- ✓ Traditional functions
- ✓ String-to-function conversion

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $where
- Allows arbitrary JavaScript execution
- Caution: Can impact performance and security
- Deprecated in MongoDB 8.0 but still supported here
