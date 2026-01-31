# $not - Implementation Status

**Operator**: `$not`  
**Type**: Logical  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$not` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Logical.ts` (lines 28-38)

**Function Signature**:
```typescript
export function $not(query: Record<string, unknown>, compiler: Compiler): Evaluator {
  const evaluate = compiler.compile(query);

  return (input: unknown) => !evaluate(input);
}
```

**Logic**:
- Compiles the query using the compiler
- Returns the logical negation of the evaluator result
- Inverts the match result

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Logical.ts` (test sections for $not)

**Test Results**: All tests passing ✓

**Test Coverage**:
- ✓ True condition negated to false
- ✓ False condition negated to true
- ✓ Nested expressions
- ✓ Complex query negation

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $not
- Inverts the result of the compiled expression
- Supports any query predicate as input
