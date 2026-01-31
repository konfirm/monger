# $cond - Implementation Status

**Operator**: `$cond`  
**Type**: Conditional  
**MongoDB Version**: 1.0  

## Summary

Status: **complete** ✓

The `$cond` operator is a ternary operator that evaluates a boolean expression and returns one of two values depending on the result.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts` (lines 99-129)

**Function Signature**:
```typescript
export function $cond(
  query: Condition,
  compile: ExpressionCompiler,
): Evaluator<any>
```

**Logic**:
- Supports two syntaxes:
  - Object syntax: `{ if: <condition>, then: <true-case>, else: <false-case> }`
  - Array syntax: `[ <condition>, <true-case>, <false-case> ]`
- Normalizes both syntaxes to array format upfront
- Uses `isTruthy` helper for MongoDB-style truthiness checking
- Returns compiled evaluator that evaluates condition at runtime

**Validation**:
- `isConditionArray`: Checks array has exactly 3 elements
- `isConditionObject`: Uses `all(isKey("if"), isKey("then"), isKey("else"))` from @konfirm/guard
- Clear error messages for missing properties or wrong formats

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts`

**Test Results**: All tests passing ✓

**Test Cases (12 total)**:
- ✓ Object syntax with true/false conditions
- ✓ Array syntax with true/false conditions
- ✓ Truthy/falsy value handling (1, 0, '', 'hello', null, undefined)
- ✓ Different return types (strings, numbers, objects, arrays)
- ✓ Array syntax with various types
- ✓ Unhappy paths: wrong array length, missing properties, invalid types

**Coverage Summary**:
- ✓ Both syntax variations
- ✓ All MongoDB truthy/falsy values
- ✓ Various return value types
- ✓ Validation error handling

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Dependencies

- **@konfirm/guard**: `isArray`, `isKey`, `isObject`, `all`
- **Internal**: `isTruthy`, `isFalsy` helpers (also exported)

## Notes

- Uses normalization pattern - both syntaxes converted to array format
- Validation uses declarative guard library patterns
- Very commonly used in real-world aggregation pipelines
