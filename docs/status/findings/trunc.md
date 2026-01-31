# $trunc (expression) - Implementation Status

**Operator**: `$trunc`  
**Type**: Arithmetic  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$trunc` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Arithmetic.ts`

**Function Signature**:
```typescript
export function $trunc(input: number, place?: number): number {
  const factor = Math.pow(10, place ?? 0);
  return Math.trunc(input * factor) / factor;
}
```

**Logic**:
- Truncates a number to a specified decimal place
- Removes the fractional part without rounding
- Uses JavaScript's Math.trunc()

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Arithmetic.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Truncating to whole number
- ✓ Truncating to decimal places
- ✓ Positive and negative numbers

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $trunc
- Unlike $round, this removes the fractional part without rounding
