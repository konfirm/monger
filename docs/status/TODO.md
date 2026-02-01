# TODO: Missing and Partial Expression Operators

This document tracks all expression operators that are either partially implemented or missing from the monger project.

## Priority Legend
- **High**: Core functionality, frequently used, or blocks other features
- **Medium**: Useful but not critical, good for completeness
- **Low**: Niche use cases, advanced features
- **?**: Needs evaluation

## Complexity Legend
- **Low**: Simple implementation, straightforward logic
- **Medium**: Some complexity, may require utilities
- **High**: Complex algorithms or external dependencies
- **?**: Needs evaluation

## Usefulness Legend
- **High**: Very commonly used in real-world queries
- **Medium**: Occasionally useful
- **Low**: Rarely used, specialized cases
- **?**: Needs evaluation

---

## Partially Implemented

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$cond` | Conditional | 1.0 | ≈ | High | Low | High | Empty stub - needs full ternary logic implementation. Core conditional expression used everywhere. |

---

## Missing Operators (Sorted by Type)

### Boolean Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$and` | Boolean | 1.0 | × | High | Low | High | Logical AND of expressions. Very commonly used. |
| `$or` | Boolean | 1.0 | × | High | Low | High | Logical OR of expressions. Very commonly used. |
| `$not` | Boolean | 1.0 | × | Medium | Low | Medium | Logical NOT. Straightforward negation. |
| `$allElementsTrue` | Boolean | 3.6 | × | Medium | Low | Medium | Checks if all array elements are true. |
| `$anyElementTrue` | Boolean | 3.6 | × | Medium | Low | Medium | Checks if any array element is true. |
| `$isArray` | Boolean | 3.2 | × | High | Low | High | Type checking for arrays. Very useful. |

### Array Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$concatArrays` | Array | 3.2 | × | High | Low | High | Concatenates multiple arrays. Common operation. |
| `$filter` | Array | 3.2 | × | High | Medium | High | Filters array elements by condition. Very useful. |
| `$firstN` | Array | 5.2 | × | Medium | Low | Low | Returns first N elements. Window operator overlap. |
| `$in` | Array | 1.0 | × | High | Low | High | Checks if value exists in array. Core functionality. |
| `$indexOfArray` | Array | 3.4 | × | Medium | Medium | Medium | Finds index of element in array. |
| `$lastN` | Array | 5.2 | × | Medium | Low | Low | Returns last N elements. Window operator overlap. |
| `$map` | Array | 3.2 | × | High | Medium | High | Applies expression to each element. Functional programming. |
| `$maxN` | Array | 5.2 | × | Medium | Medium | Medium | Returns N largest values. |
| `$minN` | Array | 5.2 | × | Medium | Medium | Medium | Returns N smallest values. |
| `$range` | Array | 3.2 | × | Medium | Low | Low | Generates array of integers. |
| `$reduce` | Array | 3.2 | × | High | High | Medium | Reduces array to single value. Complex but powerful. |
| `$reverseArray` | Array | 3.2 | × | Low | Low | Low | Reverses array order. |
| `$size` | Array | 1.0 | × | High | Low | High | Returns array length. Note: Query $size exists. |
| `$slice` | Array | 3.2 | × | Medium | Low | Medium | Returns portion of array. |
| `$sortArray` | Array | 5.2 | × | Medium | High | Low | Sorts array elements. |
| `$zip` | Array | 3.2 | × | Low | Medium | Low | Merges arrays together. |

### Comparison Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$in` | Comparison | 1.0 | × | High | Low | High | Note: Query predicate $in exists, expression version differs. |

### Conditional Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$ifNull` | Conditional | 1.0 | × | High | Low | High | Returns alternative if null. Very commonly used. |
| `$switch` | Conditional | 1.0 | × | Medium | Medium | Medium | Case statement with multiple branches. |

### String Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$concat` | String | 1.0 | × | High | Low | High | Concatenates strings. Very commonly used. |
| `$dateFromString` | String | 1.0 | × | Medium | Medium | Medium | Parses date from string. |
| `$dateToString` | String | 1.0 | × | High | Medium | High | Formats date as string. Very useful. |
| `$indexOfBytes` | String | 3.4 | × | Medium | Medium | Medium | Finds substring index (byte-based). |
| `$indexOfCP` | String | 3.4 | × | Medium | Medium | Medium | Finds substring index (codepoint-based). |
| `$ltrim` | String | 3.4 | × | Medium | Low | Medium | Removes whitespace from left. |
| `$regexFind` | String | 4.0 | × | Medium | Medium | Medium | Returns first regex match with details. |
| `$regexFindAll` | String | 4.0 | × | Medium | Medium | Medium | Returns all regex matches. |
| `$regexMatch` | String | 3.4 | × | High | Medium | High | Tests if string matches regex. Note: Query $regex exists. |
| `$replaceOne` | String | 4.0 | × | Medium | Medium | Medium | Replaces first occurrence. |
| `$replaceAll` | String | 4.0 | × | Medium | Medium | Medium | Replaces all occurrences. |
| `$rtrim` | String | 3.4 | × | Medium | Low | Medium | Removes whitespace from right. |
| `$split` | String | 3.4 | × | Medium | Low | Medium | Splits string by delimiter. |
| `$strcasecmp` | String | 1.0 | × | Medium | Low | Medium | Case-insensitive comparison. |
| `$strLenBytes` | String | 3.4 | × | Low | Low | Low | Returns byte length of string. |
| `$strLenCP` | String | 3.4 | × | Medium | Low | Medium | Returns UTF-8 codepoint length. |
| `$substr` | String | 1.0 | × | Medium | Medium | Medium | Deprecated in favor of $substrBytes/$substrCP. |
| `$substrBytes` | String | 3.4 | × | Medium | Medium | Medium | Returns substring (byte-based). |
| `$substrCP` | String | 3.4 | × | Medium | Medium | Medium | Returns substring (codepoint-based). |
| `$toLower` | String | 1.0 | × | Medium | Low | Medium | Converts to lowercase. |
| `$toUpper` | String | 1.0 | × | Medium | Low | Medium | Converts to uppercase. |
| `$trim` | String | 3.4 | × | Medium | Low | Medium | Removes whitespace from both ends. |

### Date Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$dateAdd` | Date | 3.6 | × | High | Medium | High | Adds time to date. |
| `$dateDiff` | Date | 5.0 | × | High | Medium | High | Returns difference between dates. |
| `$dateFromParts` | Date | 3.6 | × | Medium | Medium | Medium | Constructs date from parts. |
| `$dateFromString` | Date | 1.0 | × | Medium | Medium | Medium | Parses date from string. |
| `$dateSubtract` | Date | 3.6 | × | High | Medium | High | Subtracts time from date. |
| `$dateToParts` | Date | 3.6 | × | Low | Medium | Low | Returns date components as object. |
| `$dateToString` | Date | 1.0 | × | High | Medium | High | Formats date as string. |
| `$dateTrunc` | Date | 3.6 | × | Medium | Medium | Medium | Truncates date to specified unit. |
| `$dayOfMonth` | Date | 1.0 | × | Medium | Low | Medium | Returns day of month (1-31). |
| `$dayOfWeek` | Date | 1.0 | × | Medium | Low | Medium | Returns day of week (1-7). |
| `$dayOfYear` | Date | 1.0 | × | Medium | Low | Medium | Returns day of year (1-366). |
| `$hour` | Date | 1.0 | × | Medium | Low | Medium | Returns hour (0-23). |
| `$isoDayOfWeek` | Date | 3.6 | × | Medium | Low | Medium | ISO 8601 day of week (1-7). |
| `$isoWeek` | Date | 3.6 | × | Medium | Medium | Medium | ISO 8601 week number. |
| `$isoWeekYear` | Date | 3.6 | × | Medium | Medium | Medium | ISO 8601 year. |
| `$millisecond` | Date | 1.0 | × | Low | Low | Low | Returns milliseconds (0-999). |
| `$minute` | Date | 1.0 | × | Medium | Low | Medium | Returns minute (0-59). |
| `$month` | Date | 1.0 | × | Medium | Low | Medium | Returns month (1-12). |
| `$second` | Date | 1.0 | × | Medium | Low | Medium | Returns seconds (0-60). |
| `$toDate` | Date | 1.0 | × | High | Low | High | Converts value to Date. |
| `$week` | Date | 1.0 | × | Medium | Medium | Medium | Returns week number. |
| `$year` | Date | 1.0 | × | Medium | Low | Medium | Returns year. |

### Trigonometry Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$acos` | Trigonometry | 3.6 | × | Low | Low | Low | Arc cosine. |
| `$acosh` | Trigonometry | 3.6 | × | Low | Low | Low | Inverse hyperbolic cosine. |
| `$asin` | Trigonometry | 3.6 | × | Low | Low | Low | Arc sine. |
| `$asinh` | Trigonometry | 3.6 | × | Low | Low | Low | Inverse hyperbolic sine. |
| `$atan` | Trigonometry | 3.6 | × | Low | Low | Low | Arc tangent. |
| `$atan2` | Trigonometry | 3.6 | × | Low | Low | Low | Arc tangent of y/x. |
| `$atanh` | Trigonometry | 3.6 | × | Low | Low | Low | Inverse hyperbolic tangent. |
| `$cos` | Trigonometry | 3.6 | × | Low | Low | Low | Cosine. |
| `$cosh` | Trigonometry | 3.6 | × | Low | Low | Low | Hyperbolic cosine. |
| `$degreesToRadians` | Trigonometry | 3.6 | × | Low | Low | Low | Converts degrees to radians. |
| `$radiansToDegrees` | Trigonometry | 3.6 | × | Low | Low | Low | Converts radians to degrees. |
| `$sin` | Trigonometry | 3.6 | × | Low | Low | Low | Sine. |
| `$sinh` | Trigonometry | 3.6 | × | Low | Low | Low | Hyperbolic sine. |
| `$tan` | Trigonometry | 3.6 | × | Low | Low | Low | Tangent. |
| `$tanh` | Trigonometry | 3.6 | × | Low | Low | Low | Hyperbolic tangent. |

### Bitwise Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$bitAnd` | Bitwise | 6.3 | × | Low | Low | Low | Bitwise AND. |
| `$bitNot` | Bitwise | 6.3 | × | Low | Low | Low | Bitwise NOT. |
| `$bitOr` | Bitwise | 6.3 | × | Low | Low | Low | Bitwise OR. |
| `$bitXor` | Bitwise | 6.3 | × | Low | Low | Low | Bitwise XOR. |

### Data Size Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$binarySize` | Data Size | 1.0 | × | Low | Low | Low | Returns byte size of string/binary. |
| `$bsonSize` | Data Size | 1.0 | × | Low | Low | Low | Returns BSON size of document. |

### Object Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$mergeObjects` | Object | 3.6 | × | High | Medium | High | Combines multiple documents. |
| `$objectToArray` | Object | 3.6 | × | High | Medium | High | Converts document to key-value array. |
| `$setField` | Object | 5.0 | × | Medium | Medium | Medium | Adds/updates field in document. |
| `$unsetField` | Object | 5.0 | × | Medium | Medium | Medium | Removes field from document. |

### Set Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$setDifference` | Set | 3.6 | × | Low | Medium | Low | Returns set difference. |
| `$setEquals` | Set | 3.6 | × | Low | Medium | Low | Checks set equality. |
| `$setIntersection` | Set | 3.6 | × | Low | Medium | Low | Returns set intersection. |
| `$setIsSubset` | Set | 3.6 | × | Low | Medium | Low | Checks if subset. |
| `$setUnion` | Set | 3.6 | × | Low | Medium | Low | Returns set union. |

### Text Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$meta` | Text | 2.6 | × | Medium | Medium | Medium | Accesses text search metadata. |

### Timestamp Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$tsIncrement` | Timestamp | 5.1 | × | Low | Low | Low | Returns timestamp increment. |
| `$tsSecond` | Timestamp | 5.1 | × | Low | Low | Low | Returns timestamp seconds. |

### Custom Aggregation Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$accumulator` | Custom Aggregation | 4.4 | × | Low | High | Low | Defines custom accumulator function. |
| `$function` | Custom Aggregation | 4.4 | × | Medium | High | Low | Executes JavaScript function. |

### Variable Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$let` | Variable | 1.0 | × | Medium | Medium | Medium | Defines variables for subexpressions. |

### Window Operators

| Operator | Type | MongoDB | Status | Usefulness | Complexity | Priority | Notes |
|----------|------|---------|--------|------------|------------|----------|-------|
| `$addToSet` | Window | 3.6 | × | Medium | Medium | Medium | Returns unique values in window. |
| `$avg` | Window | 1.0 | × | High | Low | High | Returns average in window. |
| `$bottom` | Window | 5.2 | × | Low | Medium | Low | Returns bottom element. |
| `$bottomN` | Window | 5.2 | × | Low | High | Low | Returns N bottom elements. |
| `$count` | Window | 5.0 | × | High | Low | High | Counts documents in window. |
| `$covariancePop` | Window | 5.0 | × | Low | Medium | Low | Population covariance. |
| `$covarianceSamp` | Window | 5.0 | × | Low | Medium | Low | Sample covariance. |
| `$denseRank` | Window | 5.0 | × | Medium | Medium | Medium | Dense rank in window. |
| `$derivative` | Window | 5.0 | × | Medium | High | Low | Rate of change in window. |
| `$documentNumber` | Window | 5.0 | × | Medium | Low | Medium | Position in window partition. |
| `$expMovingAvg` | Window | 5.0 | × | Medium | Medium | Medium | Exponential moving average. |
| `$first` | Window | 1.0 | × | High | Low | High | Returns first value in window. |
| `$integral` | Window | 5.0 | × | Low | High | Low | Approximates area under curve. |
| `$last` | Window | 1.0 | × | High | Low | High | Returns last value in window. |
| `$linearFill` | Window | 5.3 | × | Low | High | Low | Linear interpolation for nulls. |
| `$locf` | Window | 5.2 | × | Low | Medium | Low | Last observation carried forward. |
| `$max` | Window | 1.0 | × | High | Low | High | Returns max value in window. |
| `$min` | Window | 1.0 | × | High | Low | High | Returns min value in window. |
| `$minMaxScaler` | Window | 5.0 | × | Low | Medium | Low | Scales to [-1, 1] range. |
| `$push` | Window | 3.6 | × | High | Low | High | Returns array of values in window. |
| `$rank` | Window | 5.0 | × | Medium | Medium | Medium | Rank in window partition. |
| `$shift` | Window | 5.0 | × | Medium | Medium | Medium | Value at offset position. |
| `$sigmoid` | Window | 5.0 | × | Low | Medium | Low | Sigmoid normalization. |
| `$stdDevPop` | Window | 3.6 | × | Medium | Medium | Medium | Population std deviation. |
| `$stdDevSamp` | Window | 3.6 | × | Medium | Medium | Medium | Sample std deviation. |
| `$sum` | Window | 1.0 | × | High | Low | High | Returns sum in window. |
| `$top` | Window | 5.2 | × | Low | Medium | Low | Returns top element. |
| `$topN` | Window | 5.2 | × | Low | High | Low | Returns N top elements. |

---

## Summary Statistics

### By Priority
- **High Priority**: 32 operators
- **Medium Priority**: 43 operators
- **Low Priority**: 61 operators

### By Complexity
- **Low**: 47 operators
- **Medium**: 43 operators
- **High**: 11 operators

### By Usefulness
- **High**: 32 operators
- **Medium**: 53 operators
- **Low**: 50 operators

### Quick Wins (High Usefulness + Low Complexity)
These are the best candidates for immediate implementation:

1. `$and` (Boolean) - Core logic operator
2. `$or` (Boolean) - Core logic operator
3. `$isArray` (Boolean) - Type checking
4. `$concatArrays` (Array) - Simple concatenation
5. `$concat` (String) - String building
6. `$ifNull` (Conditional) - Null handling
7. `$toLower` / `$toUpper` (String) - Case conversion
8. `$split` (String) - String manipulation
9. `$trim` / `$ltrim` / `$rtrim` (String) - Whitespace handling
10. `$size` (Array) - Array length (similar to query version)

---

## Recommended Implementation Order

### Phase 1: Core Foundation (High Priority, Low Complexity)
1.  ~Complete `$cond` (currently partial)~
2. `$and`, `$or`, `$not` (Boolean)
3. `$isArray` (Boolean)
4. `$concatArrays` (Array)
5. `$concat` (String)
6. ~`$ifNull`, `$switch` (Conditional)~
7. `$in` (Array/Comparison)

### Phase 2: String & Array Essentials
1. `$trim`, `$ltrim`, `$rtrim` (String)
2. `$toLower`, `$toUpper` (String)
3. `$split` (String)
4. `$filter` (Array)
5. `$map` (Array)
6. `$size` (Array)

### Phase 3: Date Operations
1. `$toDate` (Date/Type)
2. `$dateAdd`, `$dateSubtract` (Date)
3. `$dateDiff` (Date)
4. `$dateFromString` (Date)
5. `$dateToString` (Date)
6. Basic date part extractors: `$year`, `$month`, `$dayOfMonth`

### Phase 4: Window Functions (for aggregation support)
1. `$sum`, `$avg`, `$min`, `$max` (Window)
2. `$first`, `$last` (Window)
3. `$push` (Window)
4. `$count` (Window)

### Phase 5: Remaining operators based on demand
- Object operators (`$mergeObjects`, `$objectToArray`)
- Remaining date operators
- String manipulation operators
- Trigonometry (lowest priority unless needed)
- Advanced window functions

---

*Last updated: $(date)*
