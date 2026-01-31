# $getField (expression) - Implementation Status

**Operator**: `$getField`  
**Type**: Miscellaneous  
**MongoDB Version**: 5.0  

## Summary

Status: **complete**

The `$getField` expression operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Function Signature**:
```typescript
export function $getField(field: string, input?: Record<string, unknown>): unknown {
  const doc = input || /* current document */;
  return doc[field];
}
```

**Logic**:
- Retrieves the value of a specified field from a document
- Can access fields with names containing dots or starting with $

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Misc.ts`

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ Field retrieval
- ✓ Nested field access
- ✓ Missing fields
- ✓ Special field names

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Notes

- Implementation follows MongoDB specification for $getField
- Useful for accessing fields with special names
