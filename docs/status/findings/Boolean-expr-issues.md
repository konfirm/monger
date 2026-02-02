# Boolean Operators ($and, $or, $not) - Known Issues

**Operators**: `$and`, `$or`, `$not`  
**Type**: Boolean  
**MongoDB Version**: 1.0  
**Status**: ⚠️ Not Working (0% pass rate)

## Summary

Despite having an implementation, the Boolean expression operators are failing all tests. The issue appears to be with how they're registered or invoked in the expression system.

## Test Results

**Test File**: `test-data/and.json`, `test-data/or.json`, `test-data/not.json`

**Current Status**: 0% pass rate for all three operators

**Error Message**:
```
Invalid expression: {"and":[true,true]}
Invalid expression: {"or":[true,false]}
Invalid expression: {"not":true}
```

## Issue Analysis

### Root Cause: Registration Problem

The operators appear to be implemented but not properly registered in the expression evaluation system.

**Implementation File**: `source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts`

**Registration File**: `source/Domain/Filter/Operator/Evaluation/Expression.ts`

**Current Registration** (lines 8-10, 27-30):
```typescript
import * as Boolean from './Expression/Boolean';

const expressions = {
  ...Arithmetic,
  ...Array,
  ...Boolean,  // <-- Should spread Boolean operators
  ...Comparison,
  // ...
};
```

**Possible Issues**:

1. **Export format**: The Boolean operators might not be exported correctly
2. **Naming conflict**: Boolean might conflict with JavaScript's native Boolean
3. **Registration timing**: Operators might be registered after expression compilation
4. **Query predicate vs Expression**: Confusion between Query Predicate and Expression operators

## Distinguishing Query Predicate from Expression

**Important**: There are TWO types of Boolean operators in MongoDB:

### 1. Query Predicates (Document-level)
- **File**: `source/Domain/Filter/Operator/Comparison.ts` (for $and, $or, $not as predicates)
- **Usage**: `{ $and: [{a: 1}, {b: 2}] }` - filters documents
- **Status**: ✅ Already implemented and working

### 2. Expressions (Value-level)
- **File**: `source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts`
- **Usage**: `{ $project: { result: { $and: [$expr1, $expr2] } } }` - computes values
- **Status**: ❌ Implemented but not working

**The Problem**: We have Query Predicate implementations but need Expression implementations for aggregation context.

## Verification Steps

### 1. Check if Implementation Exists
```bash
grep -n "export function \$and" source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts
grep -n "export function \$or" source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts
grep -n "export function \$not" source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts
```

### 2. Check Registration
```bash
grep -n "Boolean" source/Domain/Filter/Operator/Evaluation/Expression.ts
```

### 3. Test Direct Compilation
```bash
npx ts-node -e "
const { expression } = require('./source/Domain/Filter/Operator/Evaluation/Expression');
try {
  const compiled = expression({and: [true, true]});
  console.log('Compiled:', compiled);
  console.log('Result:', compiled({}));
} catch(e) {
  console.error('Error:', e.message);
}
"
```

## Expected Behavior

### $and
```javascript
$and([true, true])         // Returns: true
$and([true, false])        // Returns: false
$and([1, "hello", [1,2]])  // Returns: true (truthy values)
$and([])                   // Returns: true (vacuous truth)
$and([true, null])         // Returns: false (null is falsy)
```

### $or
```javascript
$or([true, false])         // Returns: true
$or([false, false])        // Returns: false
$or([0, "", null, 1])      // Returns: true (1 is truthy)
$or([])                    // Returns: false
```

### $not
```javascript
$not(true)                 // Returns: false
$not(false)                // Returns: true
$not(1)                    // Returns: false (1 is truthy)
$not(0)                    // Returns: true (0 is falsy)
$not(null)                 // Returns: true (null is falsy)
```

## Truthiness Rules (MongoDB-style)

**Falsy values**:
- `null`
- `undefined`
- `0`
- `""` (empty string)
- `NaN`
- `false`

**Truthy values**:
- Non-zero numbers
- Non-empty strings
- Objects (including empty `{}`)
- Arrays (including empty `[]`)
- `true`

## Implementation Requirements

The implementation should:
1. Accept arrays for $and/$or, single value for $not
2. Use `isTruthy()` and `isFalsy()` helpers from Conditional.ts
3. Compile each expression before evaluation
4. Return boolean values

**Example Implementation**:
```typescript
export function $and(
  query: Array<unknown>,
  compile: ExpressionCompiler,
): Evaluator<boolean> {
  if (!isArray(query)) {
    throw new Error("$and must be an array");
  }

  const expressions = query.map(compile);

  return (input: any) => expressions.every((expr) => isTruthy(expr(input)));
}
```

## Test Command

Run tests to verify:
```bash
node scripts/run-mongodb-tests.js and
node scripts/run-mongodb-tests.js or
node scripts/run-mongodb-tests.js not
```

## Debugging Checklist

- [ ] Verify functions are exported from Boolean.ts
- [ ] Check for naming conflicts with native Boolean
- [ ] Ensure Expression.ts imports and spreads Boolean correctly
- [ ] Test direct compilation outside of test runner
- [ ] Compare working operators (like $eq) with Boolean operators
- [ ] Check if issue is in compilation or execution phase

## Related

- **Implementation**: `source/Domain/Filter/Operator/Evaluation/Expression/Boolean.ts`
- **Registration**: `source/Domain/Filter/Operator/Evaluation/Expression.ts`
- **Query Predicates**: `source/Domain/Filter/Operator/Comparison.ts` (working)
- **isTruthy helper**: `source/Domain/Filter/Operator/Evaluation/Expression/Conditional.ts`

## Notes

- These operators are different from Query Predicate versions
- The Query Predicate $and/$or/$not work on document filters
- The Expression versions work on computed values in aggregations
- isTruthy/isFalsy helpers should be reused from Conditional.ts
- Empty array behavior differs: $and returns true, $or returns false

## Next Steps

1. Verify the functions exist and are exported correctly
2. Check the Expression.ts registration
3. Test a simple case directly
4. Compare with working expression operators
5. Fix the registration or implementation issue

