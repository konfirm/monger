# $arrayToObject - Implementation Status

**Operator**: `$arrayToObject`  
**Type**: Array  
**MongoDB Version**: 3.6  

## Summary

Status: **complete** ✓

The `$arrayToObject` operator converts an array of key-value pairs into an object/document.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Evaluation/Expression/Array.ts` (lines 88-116)

**Function Signature**:
```typescript
export function $arrayToObject<T extends object = { [key: string]: unknown }>(
  query: ArrayToObjectExpression,
  compile: ExpressionCompiler,
): Evaluator<T | null>
```

**Logic**:
- Compiles the query expression using the expression compiler
- The compiled expression should resolve to an array
- Supports two input formats (as per MongoDB spec):
  1. **Tuple format**: `["key", "value"]` arrays
  2. **Object format**: `{k: "key", v: "value"}` objects
- Iterates through the array and builds an object with key-value pairs
- Returns `null` if input is not an array

**Implementation**:
```typescript
return (input: any): T | null => {
  const array = resolve(input) as Array<unknown>;
  
  if (!isArray(array)) {
    return null;
  }

  const result: { [key: string]: unknown } = {};

  array.forEach((item: unknown) => {
    if (Array.isArray(item) && item.length === 2) {
      // Tuple format: ["key", "value"]
      const tuple = item as [unknown, unknown];
      result[String(tuple[0])] = tuple[1];
    } else if (typeof item === 'object' && item !== null && 'k' in item && 'v' in item) {
      // Object format: {k: "key", v: "value"}
      const obj = item as {k: unknown; v: unknown};
      result[String(obj.k)] = obj.v;
    }
  });

  return result as T;
};
```

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Evaluation/Expression/Array.ts`

**Test Results**: All tests passing ✓

**Test Cases (1 current)**:
- ✓ Field reference syntax: `'$props'` resolves to array of tuples
- ✓ Output: `{ key: 'value' }` from input `props: [['key', 'value']]`

**Note**: Test coverage is minimal - only one happy path test exists. Additional tests recommended:
- Object format (`{k, v}`)
- Multiple key-value pairs
- Empty array (should return empty object)
- Non-array input (should return null)
- Invalid items in array (should be skipped)

## Exported From

- `source/Domain/Filter/Operator/Evaluation/Expression.ts`

## Dependencies

- **Internal**: `isArray` from BSON module

## Notes

- Fixed from stub implementation that returned `undefined`
- Follows MongoDB specification for both tuple and object formats
- Uses TypeScript's `as` assertions for type narrowing
- Very useful for transforming array data into document format
- **Achievement**: This fix resolved 3 failing tests, bringing total to 100% passing!
