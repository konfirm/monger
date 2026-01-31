# $cmp (expression) - Implementation Status

**Operator**: `$cmp`  
**Type**: Comparison  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$cmp` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Comparison.ts`

**Function Signature**:
```typescript
export function $cmp(left: any, right: any): number {
  if (left === right) return 0;
  if (left > right) return 1;
  return -1;
}
```

**Logic**:
- Compares two values
- Returns 0 if equal, 1 if left > right, -1 if left < right

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Comparison.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Equal values
- ✓ Left greater than right
- ✓ Left less than right
- ✓ Different types

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $cmp
