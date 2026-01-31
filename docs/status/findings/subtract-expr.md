# $subtract (expression) - Implementation Status

**Operator**: `$subtract`  
**Type**: Arithmetic  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$subtract` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Arithmetic.ts`

**Function Signature**:
```typescript
export function $subtract(minuend: number, subtrahend: number): number {
  return minuend - subtrahend;
}
```

**Logic**:
- Subtracts the second number from the first
- Returns the difference

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Arithmetic.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Simple subtraction
- ✓ Subtracting larger from smaller
- ✓ Zero subtraction
- ✓ Negative results

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $subtract
- Can also subtract dates
