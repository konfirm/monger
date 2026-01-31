# $ne (not equal) - Implementation Status

**Operator**: `$ne`  
**Type**: Comparison  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$ne` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Comparison.ts` (lines 84-86)

**Function Signature**:
```typescript
export function $ne(query: Primitive): Evaluator {
  return (input: unknown) => !deep(query, input);
}
```

**Logic**:
- Uses deep comparison and negates the result
- Returns true if input does NOT equal query value
- Supports primitives, arrays, objects, and RegExp patterns

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Comparison.ts` (lines 58-97)

**Test Results**: All tests passing ✓

**Test Cases**:
- Booleans: true vs true, false vs true, etc.
- Strings: "stri" vs "string", exact matches, partial matches
- Numbers: 0 vs 1, 1 vs 1, 2 vs 1
- Arrays: [1,2] vs [1,2], length differences, order differences
- Objects: {foo:'bar'} vs {foo:'bar'}, key order matters
- RegExp: Various regex patterns tested

**Coverage Summary**:
- ✓ Primitive inequality (string, number, boolean)
- ✓ Deep array inequality
- ✓ Deep object inequality (order-sensitive)
- ✓ RegExp handling
- ✓ Type coercion handling

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation uses deep comparison utility
- Follows MongoDB specification for $ne
- Object property order is significant (as per MongoDB behavior)
- All edge cases covered in tests
