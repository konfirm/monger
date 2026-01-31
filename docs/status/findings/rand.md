# $rand (expression) - Implementation Status

**Operator**: `$rand`  
**Type**: Miscellaneous  
**MongoDB Version**: 3.6  

## Summary

Status: **complete**

The `$rand` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Function Signature**:
```typescript
export function $rand(): number {
  return Math.random();
}
```

**Logic**:
- Returns a random float between 0 and 1
- Uses JavaScript's Math.random()

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Returns number between 0 and 1
- ✓ Multiple calls return different values
- ✓ Distribution over many calls

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $rand
- Useful for random sampling
