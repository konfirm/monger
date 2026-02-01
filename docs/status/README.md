# MongoDB Query Operators Implementation Status

This document provides a comprehensive reference of all MongoDB query operators with their implementation status in this project.

# Summary

## By MongoDB version

### Query Predicates

| MongoDB | total | implemented | completion |
| ------- | ----- | ----------- | ---------- |
| 1.0     | 20    | 20          | 100%       |
| 2.0     | 1     | 1           | 100%       |
| 2.2     | 1     | 1           | 100%       |
| 2.4     | 2     | 2           | 100%       |
| 2.6     | 1     | 1           | 100%       |
| 3.2     | 4     | 4           | 100%       |
| 3.6     | 2     | 2           | 100%       |

### Expressions

| MongoDB | total | implemented | completion |
| ------- | ----- | ----------- | ---------- |
| 1.0     | 58    | 32          | 55%        |
| 2.6     | 1     | 0           | 0%         |
| 3.2     | 10    | 2           | 20%        |
| 3.4     | 12    | 0           | 0%         |
| 3.6     | 37    | 6           | 16%        |
| 4.0     | 6     | 1           | 16%        |
| 4.2     | 1     | 0           | 0%         |
| 4.4     | 1     | 0           | 0%         |
| 5.0     | 16    | 2           | 12%        |
| 5.1     | 2     | 0           | 0%         |
| 5.2     | 4     | 0           | 0%         |
| 5.3     | 1     | 0           | 0%         |
| 6.3     | 4     | 0           | 0%         |

## By type

### Query Predicates

| type       | total | implemented | completion |
| ---------- | ----- | ----------- | ---------- |
| Array      | 3     | 3           | 100%       |
| Bitwise    | 4     | 4           | 100%       |
| Comparison | 8     | 8           | 100%       |
| Element    | 2     | 2           | 100%       |
| Evaluation | 6     | 6           | 100%       |
| Geospatial | 4     | 4           | 100%       |
| Logical    | 4     | 4           | 100%       |

### Expressions

| type               | total | implemented | completion |
| ------------------ | ----- | ----------- | ---------- |
| Arithmetic         | 16    | 16          | 100%       |
| Array              | 15    | 3           | 20%        |
| Bitwise            | 4     | 0           | 0%         |
| Boolean            | 6     | 4           | 67%        |
| Comparison         | 8     | 7           | 87%        |
| Conditional        | 3     | 3           | 100%       |
| Custom Aggregation | 1     | 0           | 0%         |
| Data Size          | 2     | 0           | 0%         |
| Date               | 21    | 0           | 0%         |
| Literal Expression | 1     | 1           | 100%       |
| Miscellaneous      | 4     | 3           | 75%        |
| Object             | 3     | 0           | 0%         |
| Set                | 5     | 0           | 0%         |
| String             | 20    | 0           | 0%         |
| Text               | 1     | 0           | 0%         |
| Timestamp          | 2     | 0           | 0%         |
| Trigonometry       | 15    | 0           | 0%         |
| Type               | 12    | 11          | 91%        |
| Variable           | 1     | 0           | 0%         |
| Window             | 13    | 0           | 0%         |

# Overview

## Query Predicates

Query predicates are expressions that return a boolean that indicates whether a document matches a specified query.
[Query Predicates on mongodb.com](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/)

| operator                           | type       | MongoDB | status |
| ---------------------------------- | ---------- | ------- | ------ |
| [`$eq`](#eq)                       | Comparison | 1.0     | ✓      |
| [`$gt`](#gt)                       | Comparison | 1.0     | ✓      |
| [`$gte`](#gte)                     | Comparison | 1.0     | ✓      |
| [`$in`](#in)                       | Comparison | 1.0     | ✓      |
| [`$lt`](#lt)                       | Comparison | 1.0     | ✓      |
| [`$lte`](#lte)                     | Comparison | 1.0     | ✓      |
| [`$ne`](#ne)                       | Comparison | 1.0     | ✓      |
| [`$nin`](#nin)                     | Comparison | 1.0     | ✓      |
| [`$and`](#and)                     | Logical    | 1.0     | ✓      |
| [`$nor`](#nor)                     | Logical    | 1.0     | ✓      |
| [`$not`](#not)                     | Logical    | 1.0     | ✓      |
| [`$or`](#or)                       | Logical    | 1.0     | ✓      |
| [`$exists`](#exists)               | Element    | 1.0     | ✓      |
| [`$type`](#type)                   | Element    | 1.0     | ✓      |
| [`$expr`](#expr)                   | Evaluation | 3.6     | ✓      |
| [`$jsonSchema`](#jsonschema)       | Evaluation | 3.6     | ✓      |
| [`$mod`](#mod)                     | Evaluation | 1.0     | ✓      |
| [`$regex`](#regex)                 | Evaluation | 1.0     | ✓      |
| [`$text`](#text)                   | Evaluation | 2.6     | ✓      |
| [`$where`](#where)                 | Evaluation | 1.0     | ✓      |
| [`$all`](#all)                     | Array      | 1.0     | ✓      |
| [`$elemMatch`](#elemmatch)         | Array      | 2.2     | ✓      |
| [`$size`](#size)                   | Array      | 1.0     | ✓      |
| [`$geoIntersects`](#geointersects) | Geospatial | 2.4     | ✓      |
| [`$geoWithin`](#geowithin)         | Geospatial | 2.4     | ✓      |
| [`$near`](#near)                   | Geospatial | 1.0     | ✓      |
| [`$nearSphere`](#nearsphere)       | Geospatial | 2.0     | ✓      |
| [`$bitsAllClear`](#bitsallclear)   | Bitwise    | 3.2     | ✓      |
| [`$bitsAllSet`](#bitsallset)       | Bitwise    | 3.2     | ✓      |
| [`$bitsAnyClear`](#bitsanyclear)   | Bitwise    | 3.2     | ✓      |
| [`$bitsAnySet`](#bitsanyset)       | Bitwise    | 3.2     | ✓      |

## Expressions

Expressions are MQL components that resolve to a value. Expressions are stateless, meaning they return a value without mutating any of the values used to build the expression. You can use expressions in the following MQL contexts:

- ~Some aggregation pipeline stages, such as $project, $addFields, and $group~
- Query predicates that use [$expr](#expr)
- ~Find command projections~
  [Expressions on mongodb.com](https://www.mongodb.com/docs/manual/reference/mql/expressions/)

| expression                               | type               | MongoDB | status |
| ---------------------------------------- | ------------------ | ------- | ------ |
| [`$abs`](#abs)                           | Arithmetic         | 3.6     | ✓      |
| [`$acos`](#acos)                         | Trigonometry       | 3.6     | ×      |
| [`$acosh`](#acosh)                       | Trigonometry       | 3.6     | ×      |
| [`$add`](#add)                           | Arithmetic         | 1.0     | ✓      |
| [`$allElementsTrue`](#allElementsTrue)   | Boolean            | 3.6     | ×      |
| [`$and`](#and-expr)                      | Boolean            | 1.0     | ✓      |
| [`$anyElementTrue`](#anyElementTrue)     | Boolean            | 3.6     | ×      |
| [`$arrayElemAt`](#arrayElemAt)           | Array              | 3.2     | ✓      |
| [`$arrayToObject`](#arrayToObject)       | Array              | 3.6     | ✓      |
| [`$asin`](#asin)                         | Trigonometry       | 3.6     | ×      |
| [`$asinh`](#asinh)                       | Trigonometry       | 3.6     | ×      |
| [`$atan`](#atan)                         | Trigonometry       | 3.6     | ×      |
| [`$atan2`](#atan2)                       | Trigonometry       | 3.6     | ×      |
| [`$atanh`](#atanh)                       | Trigonometry       | 3.6     | ×      |
| [`$binarySize`](#binarySize)             | Data Size          | 1.0     | ×      |
| [`$bitAnd`](#bitAnd)                     | Bitwise            | 6.3     | ×      |
| [`$bitNot`](#bitNot)                     | Bitwise            | 6.3     | ×      |
| [`$bitOr`](#bitOr)                       | Bitwise            | 6.3     | ×      |
| [`$bitXor`](#bitXor)                     | Bitwise            | 6.3     | ×      |
| [`$bsonSize`](#bsonSize)                 | Data Size          | 1.0     | ×      |
| [`$ceil`](#ceil)                         | Arithmetic         | 1.0     | ✓      |
| [`$cmp`](#cmp-expr)                      | Comparison         | 1.0     | ✓      |
| [`$concat`](#concat)                     | String             | 1.0     | ×      |
| [`$concatArrays`](#concatArrays)         | Array              | 3.2     | ×      |
| [`$cond`](#cond)                         | Conditional        | 1.0     | ✓      |
| [`$convert`](#convert)                   | Type               | 4.0     | ✓      |
| [`$cos`](#cos)                           | Trigonometry       | 3.6     | ×      |
| [`$cosh`](#cosh)                         | Trigonometry       | 3.6     | ×      |
| [`$covariancePop`](#covariancePop)       | Window             | 5.0     | ×      |
| [`$covarianceSamp`](#covarianceSamp)     | Window             | 5.0     | ×      |
| [`$dateAdd`](#dateAdd)                   | Date               | 3.6     | ×      |
| [`$dateDiff`](#dateDiff)                 | Date               | 5.0     | ×      |
| [`$dateFromParts`](#dateFromParts)       | Date               | 3.6     | ×      |
| [`$dateFromString`](#dateFromString)     | Date               | 1.0     | ×      |
| [`$dateSubtract`](#dateSubtract)         | Date               | 3.6     | ×      |
| [`$dateToParts`](#dateToParts)           | Date               | 3.6     | ×      |
| [`$dateToString`](#dateToString)         | Date               | 1.0     | ×      |
| [`$dateTrunc`](#dateTrunc)               | Date               | 3.6     | ×      |
| [`$dayOfMonth`](#dayOfMonth)             | Date               | 1.0     | ×      |
| [`$dayOfWeek`](#dayOfWeek)               | Date               | 1.0     | ×      |
| [`$dayOfYear`](#dayOfYear)               | Date               | 1.0     | ×      |
| [`$degreesToRadians`](#degreesToRadians) | Trigonometry       | 3.6     | ×      |
| [`$denseRank`](#denseRank)               | Window             | 5.0     | ×      |
| [`$derivative`](#derivative)             | Window             | 5.0     | ×      |
| [`$divide`](#divide)                     | Arithmetic         | 1.0     | ✓      |
| [`$documentNumber`](#documentNumber)     | Window             | 5.0     | ×      |
| [`$eq`](#eq-expr)                        | Comparison         | 1.0     | ✓      |
| [`$exp`](#exp)                           | Arithmetic         | 1.0     | ✓      |
| [`$expMovingAvg`](#expMovingAvg)         | Window             | 5.0     | ×      |
| [`$filter`](#filter)                     | Array              | 3.2     | ×      |
| [`$floor`](#floor)                       | Arithmetic         | 1.0     | ✓      |
| [`$function`](#function)                 | Custom Aggregation | 4.4     | ×      |
| [`$getField`](#getField)                 | Miscellaneous      | 5.0     | ✓      |
| [`$gt`](#gt-expr)                        | Comparison         | 1.0     | ✓      |
| [`$gte`](#gte-expr)                      | Comparison         | 1.0     | ✓      |
| [`$hour`](#hour)                         | Date               | 1.0     | ×      |
| [`$ifNull`](#ifNull)                     | Conditional        | 1.0     | ✓      |
| [`$in`](#in-expr)                        | Comparison         | 1.0     | ×      |
| [`$indexOfArray`](#indexOfArray)         | Array              | 3.4     | ×      |
| [`$indexOfBytes`](#indexOfBytes)         | String             | 3.4     | ×      |
| [`$indexOfCP`](#indexOfCP)               | String             | 3.4     | ×      |
| [`$integral`](#integral)                 | Window             | 5.0     | ×      |
| [`$isArray`](#isArray)                   | Boolean            | 3.2     | ✓      |
| [`$isNumber`](#isNumber)                 | Type               | 3.6     | ✓      |
| [`$isoDayOfWeek`](#isoDayOfWeek)         | Date               | 3.6     | ×      |
| [`$isoWeek`](#isoWeek)                   | Date               | 3.6     | ×      |
| [`$isoWeekYear`](#isoWeekYear)           | Date               | 3.6     | ×      |
| [`$let`](#let)                           | Variable           | 1.0     | ×      |
| [`$linearFill`](#linearFill)             | Window             | 5.3     | ×      |
| [`$literal`](#literal)                   | Literal Expression | 1.0     | ✓      |
| [`$ln`](#ln)                             | Arithmetic         | 1.0     | ✓      |
| [`$locf`](#locf)                         | Window             | 5.2     | ×      |
| [`$log`](#log)                           | Arithmetic         | 1.0     | ✓      |
| [`$log10`](#log10)                       | Arithmetic         | 1.0     | ✓      |
| [`$lt`](#lt-expr)                        | Comparison         | 1.0     | ✓      |
| [`$lte`](#lte-expr)                      | Comparison         | 1.0     | ✓      |
| [`$ltrim`](#ltrim)                       | String             | 3.4     | ×      |
| [`$map`](#map)                           | Array              | 3.2     | ×      |
| [`$maxN`](#maxN)                         | Array              | 5.2     | ×      |
| [`$meta`](#meta)                         | Text               | 2.6     | ×      |
| [`$minN`](#minN)                         | Array              | 5.2     | ×      |
| [`$minMaxScaler`](#minMaxScaler)         | Window             | 5.0     | ×      |
| [`$millisecond`](#millisecond)           | Date               | 1.0     | ×      |
| [`$minute`](#minute)                     | Date               | 1.0     | ×      |
| [`$mod`](#mod-expr)                      | Arithmetic         | 1.0     | ×      |
| [`$month`](#month)                       | Date               | 1.0     | ×      |
| [`$multiply`](#multiply)                 | Arithmetic         | 1.0     | ✓      |
| [`$ne`](#ne-expr)                        | Comparison         | 1.0     | ✓      |
| [`$not`](#not-expr)                      | Boolean            | 1.0     | ✓      |
| [`$objectToArray`](#objectToArray)       | Object             | 3.6     | ×      |
| [`$or`](#or-expr)                        | Boolean            | 1.0     | ✓      |
| [`$pow`](#pow)                           | Arithmetic         | 1.0     | ✓      |
| [`$radiansToDegrees`](#radiansToDegrees) | Trigonometry       | 3.6     | ×      |
| [`$rand`](#rand)                         | Miscellaneous      | 3.6     | ✓      |
| [`$range`](#range)                       | Array              | 3.2     | ×      |
| [`$rank`](#rank)                         | Window             | 5.0     | ×      |
| [`$reduce`](#reduce)                     | Array              | 3.2     | ×      |
| [`$regexFind`](#regexFind)               | String             | 4.0     | ×      |
| [`$regexFindAll`](#regexFindAll)         | String             | 4.0     | ×      |
| [`$regexMatch`](#regexMatch)             | String             | 3.4     | ×      |
| [`$replaceOne`](#replaceOne)             | String             | 4.0     | ×      |
| [`$replaceAll`](#replaceAll)             | String             | 4.0     | ×      |
| [`$reverseArray`](#reverseArray)         | Array              | 3.2     | ×      |
| [`$round`](#round)                       | Arithmetic         | 1.0     | ✓      |
| [`$rtrim`](#rtrim)                       | String             | 3.4     | ×      |
| [`$sampleRate`](#sampleRate)             | Miscellaneous      | 5.0     | ✓      |
| [`$second`](#second)                     | Date               | 1.0     | ×      |
| [`$setDifference`](#setDifference)       | Set                | 3.6     | ×      |
| [`$setEquals`](#setEquals)               | Set                | 3.6     | ×      |
| [`$setField`](#setField)                 | Object             | 5.0     | ×      |
| [`$setIntersection`](#setIntersection)   | Set                | 3.6     | ×      |
| [`$setIsSubset`](#setIsSubset)           | Set                | 3.6     | ×      |
| [`$setUnion`](#setUnion)                 | Set                | 3.6     | ×      |
| [`$shift`](#shift)                       | Window             | 5.0     | ×      |
| [`$sigmoid`](#sigmoid)                   | Window             | 5.0     | ×      |
| [`$sin`](#sin)                           | Trigonometry       | 3.6     | ×      |
| [`$sinh`](#sinh)                         | Trigonometry       | 3.6     | ×      |
| [`$size`](#size-expr)                    | Array              | 1.0     | ×      |
| [`$slice`](#slice)                       | Array              | 3.2     | ×      |
| [`$sortArray`](#sortArray)               | Array              | 5.2     | ×      |
| [`$split`](#split)                       | String             | 3.4     | ×      |
| [`$sqrt`](#sqrt)                         | Arithmetic         | 1.0     | ✓      |
| [`$strcasecmp`](#strcasecmp)             | String             | 1.0     | ×      |
| [`$strLenBytes`](#strLenBytes)           | String             | 3.4     | ×      |
| [`$strLenCP`](#strLenCP)                 | String             | 3.4     | ×      |
| [`$substr`](#substr)                     | String             | 1.0     | ×      |
| [`$substrBytes`](#substrBytes)           | String             | 3.4     | ×      |
| [`$substrCP`](#substrCP)                 | String             | 3.4     | ×      |
| [`$subtract`](#subtract-expr)            | Arithmetic         | 1.0     | ×      |
| [`$switch`](#switch)                     | Conditional        | 1.0     | ✓      |
| [`$tan`](#tan)                           | Trigonometry       | 3.6     | ×      |
| [`$tanh`](#tanh)                         | Trigonometry       | 3.6     | ×      |
| [`$toBool`](#toBool)                     | Type               | 3.6     | ✓      |
| [`$toDate`](#toDate)                     | Type               | 1.0     | ✓      |
| [`$toDecimal`](#toDecimal)               | Type               | 3.6     | ✓      |
| [`$toDouble`](#toDouble)                 | Type               | 1.0     | ✓      |
| [`$toHashedIndexKey`](#toHashedIndexKey) | Miscellaneous      | 4.2     | ×      |
| [`$toInt`](#toInt)                       | Type               | 1.0     | ✓      |
| [`$toLong`](#toLong)                     | Type               | 1.0     | ✓      |
| [`$toLower`](#toLower)                   | String             | 1.0     | ×      |
| [`$toObjectId`](#toObjectId)             | Type               | 1.0     | ✓      |
| [`$toString`](#toString-expr)            | Type               | 1.0     | ×      |
| [`$toUpper`](#toUpper)                   | String             | 1.0     | ×      |
| [`$toUUID`](#toUUID)                     | Type               | 4.0     | ×      |
| [`$trim`](#trim)                         | String             | 3.4     | ×      |
| [`$trunc`](#trunc)                       | Arithmetic         | 1.0     | ✓      |
| [`$tsIncrement`](#tsIncrement)           | Timestamp          | 5.1     | ×      |
| [`$tsSecond`](#tsSecond)                 | Timestamp          | 5.1     | ×      |
| [`$type`](#type-expr)                    | Type               | 1.0     | ×      |
| [`$unsetField`](#unsetField)             | Object             | 5.0     | ×      |
| [`$week`](#week)                         | Date               | 1.0     | ×      |
| [`$year`](#year)                         | Date               | 1.0     | ×      |
| [`$zip`](#zip)                           | Array              | 3.2     | ×      |

# Query Predicates - Operators

## $eq

Specifies equality condition. The $eq operator matches documents where the value of a field equals the specified value.
[`$eq` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/eq/)

### Syntax

```javascript
{ <field>: { $eq: <value> } }
```

## $gt

Matches values that are greater than a specified value.
[`$gt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/gt/)

### Syntax

```javascript
{ <field>: { $gt: <value> } }
```

## $gte

Matches values that are greater than or equal to a specified value.
[`$gte` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/gte/)

### Syntax

```javascript
{ <field>: { $gte: <value> } }
```

## $in

Matches any of the values specified in an array.
[`$in` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/in/)

### Syntax

```javascript
{ <field>: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

## $lt

Matches values that are less than a specified value.
[`$lt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/lt/)

### Syntax

```javascript
{ <field>: { $lt: <value> } }
```

## $lte

Matches values that are less than or equal to a specified value.
[`$lte` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/lte/)

### Syntax

```javascript
{ <field>: { $lte: <value> } }
```

## $ne

Matches all values that are not equal to a specified value.
[`$ne` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/ne/)

### Syntax

```javascript
{ <field>: { $ne: <value> } }
```

## $nin

Matches if the value is not equal to any of the values specified in an array.
[`$nin` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/nin/)

### Syntax

```javascript
{ <field>: { $nin: [<value1>, <value2>, ... <valueN> ] } }
```

## $and

Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
[`$and` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/and/)

### Syntax

```javascript
{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
```

## $nor

Joins query clauses with a logical NOR returns all documents that fail to match all clauses.
[`$nor` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/nor/)

### Syntax

```javascript
{ $nor: [ { <expression1> }, { <expression2> }, ... { <expressionN> } ] }
```

## $not

Inverts the effect of a query expression and returns documents that do not match the query expression.
[`$not` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/not/)

### Syntax

```javascript
{ field: { $not: { <operator-expression> } } }
```

## $or

Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
[`$or` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/or/)

### Syntax

```javascript
{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
```

## $exists

Matches documents that have the specified field.
[`$exists` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/exists/)

### Syntax

```javascript
{ field: { $exists: <boolean> } }
```

## $type

Selects documents if a field is of the specified type.
[`$type` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/type/)

### Syntax

```javascript
{ field: { $type: <BSON type> } }
```

## $expr

Allows use of aggregation expressions in query language.
[`$expr` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/expr/)

### Syntax

```javascript
{ $expr: { <aggregation expression> } }
```

## $jsonSchema

Validates documents against the given JSON Schema.
[`$jsonSchema` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/)

### Syntax

```javascript
{ $jsonSchema: <JSON Schema object> }
```

## $mod

Performs a modulo operation on the value of a field and selects documents with a specified result.
[`$mod` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/mod/)

### Syntax

```javascript
{
	field: {
		$mod: [divisor, remainder];
	}
}
```

## $regex

Selects documents where values match a specified regular expression.
[`$regex` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)

### Syntax

```javascript
{ <field>: { $regex: /pattern/, $options: '<options>' } }
```

## $text

Performs text search.
[`$text` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/text/)

### Syntax

```javascript
{
  $text: {
    $search: <string>,
    $language: <string>,
    $caseSensitive: <boolean>,
    $diacriticSensitive: <boolean>
  }
}
```

## $where

Matches documents that satisfy a JavaScript expression.
[`$where` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/where/)

### Syntax

```javascript
{ $where: <javascript-string> }
```

## $all

Matches arrays that contain all elements specified in the query.
[`$all` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/all/)

### Syntax

```javascript
{ <field>: { $all: [ <value1> , <value2> , ... ] } }
```

## $elemMatch

Selects documents if element in the array field matches all the specified $elemMatch conditions.
[`$elemMatch` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/)

### Syntax

```javascript
{ <field>: { $elemMatch: { <query1>, <query2>, ... } } }
```

## $size

Selects documents if the array field is a specified size.
[`$size` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/size/)

### Syntax

```javascript
{ field: { $size: <value> } }
```

## $geoIntersects

Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.
[`$geoIntersects` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/geoIntersects/)

### Syntax

```javascript
{
  <location field>: {
    $geoIntersects: {
      $geometry: { type: <GeoJSON type> , coordinates: <coordinates> }
    }
  }
}
```

## $geoWithin

Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.
[`$geoWithin` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/)

### Syntax

```javascript
{
  <location field>: {
    $geoWithin: {
      $geometry: { type: <GeoJSON type> , coordinates: <coordinates> }
    }
  }
}
```

## $near

Returns geospatial objects in proximity to a point. Requires a geospatial index.
[`$near` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/near/)

### Syntax

```javascript
{
  <location field>: {
    $near: {
      $geometry: { type: <GeoJSON type> , coordinates: <coordinates> },
      $maxDistance: <distance in meters>
    }
  }
}
```

## $nearSphere

Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index.
[`$nearSphere` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/nearSphere/)

### Syntax

```javascript
{
  <location field>: {
    $nearSphere: {
      $geometry: { type: <GeoJSON type> , coordinates: <coordinates> },
      $maxDistance: <distance in meters>
    }
  }
}
```

## $bitsAllClear

Matches numeric or binary values in which a set of bit positions all have a value of 0.
[`$bitsAllClear` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAllClear/)

### Syntax

```javascript
{ <field>: { $bitsAllClear: [ <bitposition1>, <bitposition2>, ... ] } }
```

## $bitsAllSet

Matches numeric or binary values in which a set of bit positions all have a value of 1.
[`$bitsAllSet` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAllSet/)

### Syntax

```javascript
{ <field>: { $bitsAllSet: [ <bitposition1>, <bitposition2>, ... ] } }
```

## $bitsAnyClear

Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
[`$bitsAnyClear` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAnyClear/)

### Syntax

```javascript
{ <field>: { $bitsAnyClear: [ <bitposition1>, <bitposition2>, ... ] } }
```

## $bitsAnySet

Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
[`$bitsAnySet` official documentation](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAnySet/)

### Syntax

```javascript
{ <field>: { $bitsAnySet: [ <bitposition1>, <bitposition2>, ... ] } }
```

# Expressions - Operators

## $abs

Returns the absolute value of a number.

### Syntax

{ $abs: <number> }

The <number> expression can be any valid expression as long as it resolves to a number. For more information on expressions, see Expressions.

## $add

Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
[`$add` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/)

### Syntax

```javascript
{ $add: [ <expression1>, <expression2>, ... <expressionN> ] }
```

## $ceil

Returns the smallest integer greater than or equal to the specified number.
[`$ceil` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ceil/)

### Syntax

```javascript
{ $ceil: <expression> }
```

## $divide

Returns the result of dividing the first number by the second. Accepts two argument expressions.
[`$divide` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/divide/)

### Syntax

```javascript
{ $divide: [ <expression1>, <expression2> ] }
```

## $exp

Raises e to the specified exponent.
[`$exp` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/exp/)

### Syntax

```javascript
{ $exp: <expression> }
```

## $floor

Returns the largest integer less than or equal to the specified number.
[`$floor` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/floor/)

### Syntax

```javascript
{ $floor: <expression> }
```

## $ln

Calculates the natural log of a number.
[`$ln` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ln/)

### Syntax

```javascript
{ $ln: <expression> }
```

## $log

Calculates the log of a number in the specified base.
[`$log` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/log/)

### Syntax

```javascript
{ $log: [ <expression>, <base> ] }
```

## $log10

Calculates the log base 10 of a number.
[`$log10` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/log10/)

### Syntax

```javascript
{ $log10: <expression> }
```

## $mod-expr

Returns the remainder of the first number divided by the second. Accepts two argument expressions.
[`$mod` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mod/)

### Syntax

```javascript
{ $mod: [ <expression1>, <expression2> ] }
```

## $multiply

Multiplies numbers to return the product. Accepts any number of argument expressions.
[`$multiply` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/multiply/)

### Syntax

```javascript
{ $multiply: [ <expression1>, <expression2>, ... <expressionN> ] }
```

## $pow

Raises a number to the specified exponent.
[`$pow` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/pow/)

### Syntax

```javascript
{ $pow: [ <expression>, <exponent> ] }
```

## $round

Rounds a number to to a whole integer or to a specified decimal place.
[`$round` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/round/)

### Syntax

```javascript
{ $round: [ <expression>, <place> ] }
```

## $sqrt

Calculates the square root.
[`$sqrt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sqrt/)

### Syntax

```javascript
{ $sqrt: <expression> }
```

## $subtract-expr

Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
[`$subtract` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/subtract/)

### Syntax

```javascript
{ $subtract: [ <expression1>, <expression2> ] }
```

## $trunc

Truncates a number to a whole integer or to a specified decimal place.
[`$trunc` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/trunc/)

### Syntax

```javascript
{ $trunc: [ <expression>, <place> ] }
```

## Array Operators

## $arrayElemAt

Returns the element at the specified array index.
[`$arrayElemAt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayElemAt/)

### Syntax

```javascript
{ $arrayElemAt: [ <array>, <index> ] }
```

## $arrayToObject

Converts an array of key value pairs to a document.
[`$arrayToObject` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayToObject/)

### Syntax

```javascript
{ $arrayToObject: <array> }
```

## $concatArrays

Concatenates arrays to return the concatenated array.
[`$concatArrays` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concatArrays/)

### Syntax

```javascript
{ $concatArrays: [ <array1>, <array2>, ... <arrayN> ] }
```

## $filter

Selects a subset of the array to return an array with only the elements that match the filter condition.
[`$filter` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter/)

### Syntax

```javascript
{ $filter: { input: <expression>, as: <string>, cond: <expression> } }
```

## $firstN

Returns a specified number of elements from the beginning of an array. Distinct from the $firstN accumulator.
[`$firstN` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN/)

### Syntax

```javascript
{ $firstN: { input: <expression>, n: <expression> } }
```

## $in-expr

Returns a boolean indicating whether a specified value is in an array.
[`$in` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/in/)

### Syntax

```javascript
{ $in: [ <expression>, <array expression> ] }
```

## $indexOfArray

Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. Array indexes start at zero.
[`$indexOfArray` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexOfArray/)

### Syntax

```javascript
{ $indexOfArray: [ <array>, <expression>, <start>, <end> ] }
```

## $isArray

Determines if the operand is an array. Returns a boolean.
[`$isArray` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isArray/)

### Syntax

```javascript
{ $isArray: <expression> }
```

## $lastN

Returns a specified number of elements from the end of an array. Distinct from the $lastN accumulator.
[`$lastN` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN/)

### Syntax

```javascript
{ $lastN: { input: <expression>, n: <expression> } }
```

## $map

Applies a subexpression to each element of an array and returns an array of resulting values in order. Accepts named parameters.
[`$map` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/map/)

### Syntax

```javascript
{ $map: { input: <expression>, as: <string>, in: <expression> } }
```

## $maxN

Returns n largest values in an array. Distinct from the $maxN accumulator.
[`$maxN` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN/)

### Syntax

```javascript
{ $maxN: { input: <expression>, n: <expression> } }
```

## $minN

Returns n smallest values in an array. Distinct from the $minN accumulator.
[`$minN` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN/)

### Syntax

```javascript
{ $minN: { input: <expression>, n: <expression> } }
```

## $objectToArray

Converts a document to an array of documents representing key-value pairs.
[`$objectToArray` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/objectToArray/)

### Syntax

```javascript
{ $objectToArray: <object> }
```

## $range

Outputs an array containing a sequence of integers according to user-defined inputs.
[`$range` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/range/)

### Syntax

```javascript
{ $range: [ <start>, <end>, <step> ] }
```

## $reduce

Applies an expression to each element in an array and combines them into a single value.
[`$reduce` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/reduce/)

### Syntax

```javascript
{ $reduce: { input: <expression>, initialValue: <expression>, in: <expression> } }
```

## $reverseArray

Returns an array with the elements in reverse order.
[`$reverseArray` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/reverseArray/)

### Syntax

```javascript
{ $reverseArray: <array> }
```

## $size-expr

Returns the number of elements in the array. Accepts a single expression as argument.
[`$size` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/)

### Syntax

```javascript
{ $size: <expression> }
```

## $slice

Returns a subset of an array.
[`$slice` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/slice/)

### Syntax

```javascript
{ $slice: [ <array>, <n>, <position> ] }
```

## $sortArray

Sorts the elements of an array.
[`$sortArray` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray/)

### Syntax

```javascript
{ $sortArray: { input: <expression>, sortBy: <expression> } }
```

## $zip

Merges two arrays together.
[`$zip` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/zip/)

### Syntax

```javascript
{ $zip: { inputs: [ <array1>, <array2>, ... ], useLongestLength: <boolean> } }
```

## Boolean Operators

## $and-expr

Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
[`$and` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/and/)

### Syntax

```javascript
{ $and: [ <expression1>, <expression2>, ... <expressionN> ] }
```

## $not-expr

Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
[`$not` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/not/)

### Syntax

```javascript
{ $not: <expression> }
```

## $or-expr

Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.
[`$or` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/or/)

### Syntax

```javascript
{ $or: [ <expression1>, <expression2>, ... <expressionN> ] }
```

## Comparison Operators

## $cmp-expr

Returns 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
[`$cmp` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cmp/)

### Syntax

```javascript
{ $cmp: [ <expression1>, <expression2> ] }
```

## $eq-expr

Returns true if the values are equivalent.
[`$eq` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/eq/)

### Syntax

```javascript
{ $eq: [ <expression1>, <expression2> ] }
```

## $gt-expr

Returns true if the first value is greater than the second.
[`$gt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/gt/)

### Syntax

```javascript
{ $gt: [ <expression1>, <expression2> ] }
```

## $gte-expr

Returns true if the first value is greater than or equal to the second.
[`$gte` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/gte/)

### Syntax

```javascript
{ $gte: [ <expression1>, <expression2> ] }
```

## $lt-expr

Returns true if the first value is less than the second.
[`$lt` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lt/)

### Syntax

```javascript
{ $lt: [ <expression1>, <expression2> ] }
```

## $lte-expr

Returns true if the first value is less than or equal to the second.
[`$lte` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lte/)

### Syntax

```javascript
{ $lte: [ <expression1>, <expression2> ] }
```

## $ne-expr

Returns true if the values are not equivalent.
[`$ne` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ne/)

### Syntax

```javascript
{ $ne: [ <expression1>, <expression2> ] }
```

## $in-expr

Returns a boolean indicating whether a specified value is in an array.
[`$in` official documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/in/)

### Syntax

```javascript
{ $in: [ <expression>, <array expression> ] }
```
