# $sampleRate (expression) - Implementation Status

**Operator**: `$sampleRate`  
**Type**: Miscellaneous  
**MongoDB Version**: 5.0  

## Summary

Status: **complete**

The `$sampleRate` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Function Signature**:
```typescript
export function $sampleRate(rate: number): boolean {
  return Math.random() < rate;
}
```

**Logic**:
- Randomly selects documents at a given rate
- Returns true approximately 'rate' percent of the time

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Different sample rates
- ✓ 0% rate (never true)
- ✓ 100% rate (always true)
- ✓ Statistical distribution

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $sampleRate
- Useful for random sampling of documents
