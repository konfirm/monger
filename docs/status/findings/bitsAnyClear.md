# $bitsAnyClear - Implementation Status

**Operator**: `$bitsAnyClear`  
**Type**: Bitwise  
**MongoDB Version**: 3.2  

## Summary

Status: **complete**

The `$bitsAnyClear` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Bitwise.ts` (lines 54-68)

**Function Signature**:
```typescript
export function $bitsAnyClear(query: number | Array<number>): Evaluator {
  const positions = Array.isArray(query) ? query : [query];
  const mask = positions.reduce((acc, pos) => acc | (1 << pos), 0);

  return (input: any) => (input & mask) !== mask;
}
```

**Logic**:
- Accepts single bit position or array of bit positions
- Creates mask from all specified positions
- Returns true if ANY specified bit is 0 (clear) in input

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Bitwise.ts` (lines 94-130)

**Test Results**: All tests passing ✓

**Test Cases**:
- Single position: 1 vs 0, 1, 2
- Multiple positions: [0, 2] vs 0-8
- Negative numbers: [200] vs -5, 5

**Coverage Summary**:
- ✓ Single bit position
- ✓ Multiple bit positions
- ✓ Mask creation
- ✓ Bitwise AND with mask comparison
- ✓ Negative number handling

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $bitsAnyClear
- Logical inverse of $bitsAllSet
- At least one specified bit must be 0 to match
