# $isArray Operator Implementation

**Date:** 2026-02-01
**Operator:** $isArray
**Type:** Boolean (type check)
**MongoDB Version:** 3.2
**Status:** Complete

## Overview

Implemented the `$isArray` expression operator which determines if the operand is an array and returns a boolean value.

## Implementation Details

**File:** `source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts`

```typescript
export function $isArray(
	query: unknown,
	compile: ExpressionCompiler,
): Evaluator<boolean> {
	if (query === undefined) {
		throw new Error("$isArray must have an expression");
	}

	const expression = compile(query);

	return (input: any) => isArray(expression(input));
}
```

### Key Features
- Accepts any expression as input
- Uses @konfirm/guard's `isArray` function for type checking
- Returns `true` for arrays (including empty arrays)
- Returns `false` for all other types (objects, strings, numbers, null, undefined, etc.)
- Throws error if expression is undefined

## Syntax

```javascript
{ $isArray: <expression> }
```

## Test Coverage

**File:** `test/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts`

### Happy Path Tests
- Arrays: `[1, 2, 3]` → `true`
- Empty arrays: `[]` → `true`
- Non-arrays:
  - Strings: `"not an array"` → `false`
  - Numbers: `123` → `false`
  - Objects: `{ a: 1 }` → `false`
  - Null: `null` → `false`
  - Undefined: `undefined` → `false`
  - Booleans: `true` → `false`

### Field Reference Tests
- `$value.items` with various values:
  - Array values → `true`
  - Non-array values → `false`
  - Missing field → `false`

### Expression Tests
- Works with nested expressions like `$cond`

### Unhappy Path Tests
- Undefined expression throws error: `$isArray: undefined` → Error

## Documentation Updates

**File:** `docs/status/README.md`

- Boolean category: 50% → 67% (4/6 operators)
- MongoDB 3.2 expressions: 10% → 20% (2/10 operators)

## Notes

- $isArray is classified as a Boolean operator in MongoDB documentation (returns boolean)
- It's essentially a type-checking operator
- Three remaining Boolean operators ($allElementsTrue, $anyElementTrue) will complete the category to 100%
