# $nin (not in) - Implementation Status

**Operator**: `$nin`  
**Type**: Comparison  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$nin` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Comparison.ts` (lines 94-96)

**Function Signature**:
```typescript
export function $nin(query: Array<unknown>): Evaluator {
  return (input: unknown) => !query.some((value) => deep(value, input));
}
```

**Logic**:
- Negates the $in logic
- Checks if input value does NOT match any element in the query array
- Uses deep comparison for matching
- Supports primitives, arrays, objects, and RegExp patterns

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Comparison.ts` (lines 247-281)

**Test Results**: All tests passing ✓

**Test Cases**:
- Numbers: [1,2,3] vs 0,1,2,3,4
- Strings: ['foo', 'bar'] vs 'foo', 'bar', 'baz'
- Booleans: [true], [false], [true, false] vs true/false
- RegExp: [/foo/, /^ba/] vs 'foo', 'goo', 'bar', 'baz'

**Coverage Summary**:
- ✓ Numeric non-matching
- ✓ String non-matching
- ✓ Boolean non-matching
- ✓ RegExp pattern non-matching
- ✓ Array exclusion logic

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation is the logical inverse of $in
- Follows MongoDB specification for $nin
- Supports complex matching including regex patterns
