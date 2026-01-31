# $bitsAllSet - Implementation Status

**Operator**: `$bitsAllSet`  
**Type**: Bitwise  
**MongoDB Version**: 3.2  

## Summary

Status: **complete**

The `$bitsAllSet` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Bitwise.ts` (lines 38-52)

**Function Signature**:
```typescript
export function $bitsAllSet(query: number | Array<number>): Evaluator {
  const positions = Array.isArray(query) ? query : [query];
  const mask = positions.reduce((acc, pos) => acc | (1 << pos), 0);

  return (input: any) => (input & mask) === mask;
}
```

**Logic**:
- Accepts single bit position or array of bit positions
- Creates mask from all specified positions
- Returns true if all specified bits are 1 (set) in input

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Bitwise.ts` (lines 56-92)

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

- Implementation follows MongoDB specification for $bitsAllSet
- Useful for flags and permission checking
- All specified bits must be 1 to match
