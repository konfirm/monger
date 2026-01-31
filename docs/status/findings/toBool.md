# $toBool (expression) - Implementation Status

**Operator**: `$toBool`  
**Type**: Type  
**MongoDB Version**: 3.6  

## Summary

Status: **complete**

The `$toBool` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Function Signature**:
```typescript
export function $toBool(input: unknown): boolean {
  return Boolean(input);
}
```

**Logic**:
- Converts a value to a boolean
- Follows JavaScript truthy/falsy rules

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Type.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ True values
- ✓ False values
- ✓ Truthy values (non-zero, non-empty)
- ✓ Falsy values (0, '', null, undefined)

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $toBool
