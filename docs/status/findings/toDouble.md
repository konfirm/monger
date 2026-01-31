# $toDouble (expression) - Implementation Status

**Operator**: `$toDouble`  
**Type**: Type  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$toDouble` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $toDouble(input: unknown): number {
  return Number(input);
}
```

**Logic**:
- Converts a value to a double (64-bit floating point)
- Uses JavaScript Number() conversion

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Integer to double
- ✓ String to double
- ✓ Boolean to double
- ✓ Invalid conversions (NaN)

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $toDouble
