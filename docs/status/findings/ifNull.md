# $ifNull - Implementation Status

**Operator**: `$ifNull`  
**Type**: Conditional  
**MongoDB Version**: 1.0  

## Summary

Status: **complete** ✓

The `$ifNull` operator returns the first expression if it evaluates to a non-null value. Otherwise, it returns the second expression's value.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts` (lines 140-151)

**Function Signature**:
```typescript
export function $ifNull(
  query: [unknown, unknown],
  compile: ExpressionCompiler,
): Evaluator<any>
```

**Logic**:
- Accepts array with exactly 2 elements: `[expression, replacement]`
- Compiles both expressions using the expression compiler
- Returns evaluator that returns first value unless it's null/undefined
- Uses nullish coalescing operator (`??`) for clean implementation

**Validation**:
- `isArrayOfSize(2, 2)`: Ensures exactly 2-element array
- Clear error message: "$ifNull must be an array with exactly 2 elements"

**Implementation**:
```typescript
const [prefer, otherwise] = query.map(compile);
return (input: any) => prefer(input) ?? otherwise(input);
```

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts`

**Test Results**: All tests passing ✓

**Test Cases (8 total)**:
- ✓ Valid value returns itself (strings, numbers, objects)
- ✓ null returns replacement value
- ✓ undefined returns replacement value
- ✓ Falsy but non-null values return themselves (0, '', false)
- ✓ Different replacement types (strings, objects)
- ✓ Unhappy paths: wrong array length (1 element, 3 elements)
- ✓ Unhappy paths: non-array types (string, object)

**Coverage Summary**:
- ✓ Null and undefined handling
- ✓ Distinguishes between null/undefined and other falsy values
- ✓ Various value types
- ✓ Validation error handling

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Dependencies

- **@konfirm/guard**: `isArrayOfSize`

## Notes

- Very commonly used for providing default values
- Distinguishes null/undefined from other falsy values (0, '', false)
- Clean implementation using nullish coalescing operator (`??`)
- First conditional operator to use `isArrayOfSize` validation pattern
