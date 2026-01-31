# $exists - Implementation Status

**Operator**: `$exists`  
**Type**: Element  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$exists` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Element.ts` (lines 17-27)

**Function Signature**:
```typescript
export function $exists(query: boolean): Evaluator {
  if (query) {
    return (input: unknown) => input !== undefined && input !== null;
  }

  return (input: unknown) => input === undefined || input === null;
}
```

**Logic**:
- When query is true: returns true if value is not undefined and not null
- When query is false: returns true if value is undefined or null
- Checks for field existence in documents

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Element.ts` (lines 17-53)

**Test Results**: All tests passing ✓

**Test Cases**:
- Query true: '1', 1, [1,2], {one:1}, Date, /regex/, true, false all match
- Query true: undefined, null do not match
- Query false: '1', 1, [1,2], {one:1}, Date, /regex/, true, false do not match
- Query false: undefined, null match

**Coverage Summary**:
- ✓ Field existence check
- ✓ Field non-existence check
- ✓ All BSON types tested
- ✓ Edge cases (null vs undefined)

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $exists
- Distinguishes between undefined and null
- Works with all BSON types
