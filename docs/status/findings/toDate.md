# $toDate (expression) - Implementation Status

**Operator**: `$toDate`  
**Type**: Type  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$toDate` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $toDate(input: unknown): Date {
  return new Date(input as any);
}
```

**Logic**:
- Converts a value to a Date object
- Accepts numbers (milliseconds), strings, or Date objects

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Timestamp (milliseconds)
- ✓ Date string
- ✓ Date object
- ✓ Invalid dates

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $toDate
