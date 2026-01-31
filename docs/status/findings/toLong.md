# $toLong (expression) - Implementation Status

**Operator**: `$toLong`  
**Type**: Type  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$toLong` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $toLong(input: unknown): number | bigint {
  const val = Number(input);
  if (val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
    return BigInt(val);
  }
  return Math.trunc(val);
}
```

**Logic**:
- Converts a value to a 64-bit long integer
- Uses BigInt for values outside safe integer range

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Regular integers
- ✓ Very large integers (BigInt)
- ✓ Float truncation
- ✓ String parsing

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $toLong
- Handles large numbers using BigInt
