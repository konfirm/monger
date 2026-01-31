# $bitsAllClear - Implementation Status

**Operator**: `$bitsAllClear`  
**Type**: Bitwise  
**MongoDB Version**: 3.2  

## Summary

Status: **complete**

The `$bitsAllClear` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Bitwise.ts` (lines 21-36)

**Function Signature**:
```typescript
export function $bitsAllClear(query: number | Array<number>): Evaluator {
  const positions = Array.isArray(query) ? query : [query];
  const mask = positions.reduce((acc, pos) => acc | (1 << pos), 0);

  return (input: any) => (input & mask) === 0;
}
```

**Logic**:
- Accepts single bit position or array of bit positions
- Creates mask from all specified positions
- Returns true if all specified bits are 0 (clear) in input

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Bitwise.ts` (lines 20-54)

**Test Results**: All tests passing ✓

**Test Cases**:
- Single position: 1 vs 0, 1, 2
- Multiple positions: [0, 2] vs 0-8
- Negative numbers: [200] vs -5, 5

**Coverage Summary**:
- ✓ Single bit position
- ✓ Multiple bit positions
- ✓ Mask creation
- ✓ Bitwise AND operation
- ✓ Negative number handling

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $bitsAllClear
- Useful for flags and permission checking
- All specified bits must be 0 to match
