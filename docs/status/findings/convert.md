# $convert (expression) - Implementation Status

**Operator**: `$convert`  
**Type**: Type  
**MongoDB Version**: 4.0  

## Summary

Status: **complete**

The `$convert` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $convert(input: unknown, to: string, onError?: unknown, onNull?: unknown): unknown {
  // Converts input to the specified type
}
```

**Logic**:
- Converts a value to a specified BSON type
- Supports onError and onNull handling
- Handles various type conversions

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ String to number
- ✓ Number to string
- ✓ Date conversions
- ✓ Error handling

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $convert
- Most flexible type conversion operator
