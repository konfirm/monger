# $switch - Implementation Status

**Operator**: `$switch`  
**Type**: Conditional  
**MongoDB Version**: 1.0  

## Summary

Status: **complete** ✓

The `$switch` operator evaluates a series of case expressions and executes the first matching case, similar to a switch/case statement in programming languages.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts` (lines 194-215)

**Function Signature**:
```typescript
export function $switch(
  query: SwitchObject,
  compile: ExpressionCompiler,
): Evaluator<any>
```

**Logic**:
- Accepts object with `branches` array and optional `default`
- Each branch has `case` (condition) and `then` (value)
- Compiles all branches and default into `CompiledBranch` objects
- Uses clever pattern: adds default as final branch with `() => true` test
- Returns evaluator that finds first matching branch using `.find()`

**Validation**:
- `isDefined`: `all(not(isNULL), not(isUndefined))` - ensures values exist
- `isSwitchBranch`: `isStructure({ case: isDefined, then: isDefined })`
- `isSwitchObject`: `isStructure({ branches: isArrayOfType(isSwitchBranch), default: isDefined }, 'default')`
- Declarative validation using @konfirm/guard's `isStructure` and `isArrayOfType`

**Helper Function**:
```typescript
type CompiledBranch = {
  test: Evaluator<boolean>;
  apply: Evaluator<unknown>;
};

function compileBranch(branch: SwitchBranch, compile: ExpressionCompiler): CompiledBranch
```

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts`

**Test Results**: All tests passing ✓

**Test Cases (6 total)**:
- ✓ Multiple branches with equality checks
- ✓ Multiple branches with range checks ($gt)
- ✓ Default case matching when no branch matches
- ✓ No default case returns null
- ✓ First matching branch wins (order matters)
- ✓ Unhappy paths: invalid structure, wrong keys, missing branches

**Coverage Summary**:
- ✓ Multiple branches
- ✓ Default handling
- ✓ No-default case (returns null)
- ✓ Various condition types
- ✓ Validation error handling

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Dependencies

- **@konfirm/guard**: `isStructure`, `isArrayOfType`, `all`, `not`, `isNULL`, `isUndefined`
- **Internal**: `isTruthy` helper

## Notes

- Most elegant implementation of the three conditional operators
- Uses clever pattern: default case added as final always-matching branch
- Excellent example of @konfirm/guard's `isStructure` and `isArrayOfType` usage
- Type-safe with proper TypeScript narrowing after validation
- More powerful than `$cond` for multiple conditions
