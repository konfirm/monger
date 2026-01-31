# $arrayElemAt (expression) - Implementation Status

**Operator**: `$arrayElemAt`  
**Type**: Array  
**MongoDB Version**: 3.2  

## Summary

Status: **complete**

The `$arrayElemAt` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Array.ts`

**Function Signature**:
```typescript
export function $arrayElemAt(array: Array<unknown>, index: number): unknown {
  return array[index < 0 ? array.length + index : index];
}
```

**Logic**:
- Returns the element at the specified index in the array
- Supports negative indices (from end of array)

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Array.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Positive indices
- ✓ Negative indices
- ✓ Out of bounds handling

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $arrayElemAt
