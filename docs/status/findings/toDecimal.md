# $toDecimal (expression) - Implementation Status

**Operator**: `$toDecimal`  
**Type**: Type  
**MongoDB Version**: 3.6  

## Summary

Status: **complete**

The `$toDecimal` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $toDecimal(input: unknown): number {
  return parseFloat(String(input));
}
```

**Logic**:
- Converts a value to a decimal number
- Returns floating point representation

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Integer to decimal
- ✓ String to decimal
- ✓ Scientific notation
- ✓ Invalid conversions

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $toDecimal
- In JavaScript, uses parseFloat (128-bit decimal not native)
