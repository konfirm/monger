# $eq (equal) - Implementation Status

**Operator**: `$eq`  
**Type**: Comparison  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$eq` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Comparison.ts` (lines 24-26)

**Function Signature**:
```typescript
export function $eq(query: RegExp | Comparable): Evaluator {
  return (input: unknown) => deep(query, input, true);
}
```

**Logic**:
- Uses deep comparison to check equality
- Supports primitives, arrays, objects, and RegExp
- Returns true if input equals query value
- Arrays and objects compared by deep equality
- Object key order matters for equality

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Comparison.ts` (lines 17-56)

**Test Results**: All tests passing ✓

**Test Cases**:
- Booleans: true vs true, false vs true, etc.
- Strings: "stri" vs "string", exact matches, partial matches
- Numbers: 0 vs 1, 1 vs 1, 2 vs 1
- Arrays: [1,2] vs [1,2], length differences, order differences
- Objects: {"foo":"bar"} matches, key order matters
- RegExp: Various regex patterns tested

**Coverage Summary**:
- ✓ Primitive equality (string, number, boolean)
- ✓ Deep array equality
- ✓ Deep object equality (order-sensitive)
- ✓ RegExp handling
- ✓ Type coercion handling

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation uses deep comparison utility
- Follows MongoDB specification for $eq
- Object property order is significant (as per MongoDB behavior)
- All edge cases covered in tests
