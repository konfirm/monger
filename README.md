# @konfirm/monger

A typescript/javascript implementation of MongoDB's query language

## API

## BSON

| available | number | alias               | typeof              | description                                    |
| --------- | ------ | ------------------- | ------------------- | ---------------------------------------------- |
| yes       | 1      | double              | `number`            | Floating point number                          |
| yes       | 2      | string              | `string`            | String                                         |
| yes       | 3      | object              | `object`            | Object (not `Array`, `Date`, `NULL`, `RegExp`) |
| yes       | 4      | array               | `object`            | Array                                          |
| no        | 5      | binData             |                     |                                                |
| yes       | 6      | undefined           | `undefined`         | Undefined                                      |
| no        | 7      | objectId            |                     |                                                |
| yes       | 8      | bool                | `boolean`           | Boolean                                        |
| yes       | 9      | date                | `object`            | Date                                           |
| yes       | 10     | null                | `object`            | NULL                                           |
| yes       | 11     | regex               | `object`            | RexExp                                         |
| no        | 12     | dbPointer           |                     |                                                |
| yes       | 13     | javascript          | `function`          | Function                                       |
| yes       | 14     | symbol              | `symbol`            | Symbol                                         |
| no        | 15     | javascriptWithScope |                     |                                                |
| yes       | 16     | int                 | `number`            | Integer Number                                 |
| no        | 17     | timestamp           |                     |                                                |
| yes       | 18     | long                | `number` / `bigint` | BigInt or an Integer Number (outside of 2^53)  |
| no        | 19     | decimal             |                     |                                                |
| no        | -1     | minKey              |                     |                                                |
| no        | 127    | maxKey              |                     |                                                |



## Filter


### Comparison Operators

| available | name   | description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| yes       | `$eq`  | Matches values that are equal to a specified value.                 |
| yes       | `$gt`  | Matches values that are greater than a specified value.             |
| yes       | `$gte` | Matches values that are greater than or equal to a specified value. |
| yes       | `$in`  | Matches any of the values specified in an array.                    |
| yes       | `$lt`  | Matches values that are less than a specified value.                |
| yes       | `$lte` | Matches values that are less than or equal to a specified value.    |
| yes       | `$ne`  | Matches all values that are not equal to a specified value.         |
| yes       | `$nin` | Matches none of the values specified in an array.                   |


### Logical Operators

| available | name   | description                                                                                             |
| --------- | ------ | ------------------------------------------------------------------------------------------------------- |
| yes       | `$and` | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses. |
| yes       | `$not` | Inverts the effect of a query expression and returns documents that do not match the query expression.  |
| yes       | `$nor` | Joins query clauses with a logical NOR returns all documents that fail to match both clauses.           |
| yes       | `$or`  | Joins query clauses with a logical OR returns all documents that match the conditions of either clause. |


### Element Operators

| available | name      | description                                            |
| --------- | --------- | ------------------------------------------------------ |
| yes       | `$exists` | Matches documents that have the specified field.       |
| yes       | `$type`   | Selects documents if a field is of the specified type. |


### Evaluation Operators

| available | name          | description                                                                                        |
| --------- | ------------- | -------------------------------------------------------------------------------------------------- |
| **no**    | `$expr`       | Allows use of aggregation expressions within the query language.                                   |
| yes       | `$jsonSchema` | Validate documents against the given JSON Schema.                                                  |
| yes       | `$mod`        | Performs a modulo operation on the value of a field and selects documents with a specified result. |
| yes       | `$regex`      | Selects documents where values match a specified regular expression.                               |
| yes       | `$text`       | Performs text search.                                                                              |
| yes       | `$where`      | Matches documents that satisfy a JavaScript expression.                                            |


### Geospatial Operators

| available | name             | description                                                                                                                                   |
| --------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **no**    | `$geoIntersects` | Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.                                        |
| **no**    | `$geoWithin`     | Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.                                        |
| **no**    | `$near`          | Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.                   |
| **no**    | `$nearSphere`    | Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere. |

#### Specifiers

| available | name            | description                                                                                                                                                                        |
| --------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **no**    | `$box`          | Specifies a rectangular box using legacy coordinate pairs for $geoWithin queries. The 2d index supports $box.                                                                      |
| **no**    | `$center`       | Specifies a circle using legacy coordinate pairs to $geoWithin queries when using planar geometry. The 2d index supports $center.                                                  |
| **no**    | `$centerSphere` | Specifies a circle using either legacy coordinate pairs or GeoJSON format for $geoWithin queries when using spherical geometry. The 2dsphere and 2d indexes support $centerSphere. |
| **no**    | `$geometry`     | Specifies a geometry in GeoJSON format to geospatial query operators.                                                                                                              |
| **no**    | `$maxDistance`  | Specifies a maximum distance to limit the results of $near and $nearSphere queries. The 2dsphere and 2d indexes support $maxDistance.                                              |
| **no**    | `$minDistance`  | Specifies a minimum distance to limit the results of $near and $nearSphere queries. For use with 2dsphere index only.                                                              |
| **no**    | `$polygon`      | Specifies a polygon to using legacy coordinate pairs for $geoWithin queries. The 2d index supports $center.                                                                        |
| **no**    | `$uniqueDocs`   | Deprecated. Modifies a $geoWithin and $near queries to ensure that even if a document matches the query multiple times, the query returns the document once.                       |

### Array Operators

| available | name         | description                                                                                      |
| --------- | ------------ | ------------------------------------------------------------------------------------------------ |
| yes       | `$all`       | Matches arrays that contain all elements specified in the query.                                 |
| yes       | `$elemMatch` | Selects documents if element in the array field matches all the specified $elemMatch conditions. |
| yes       | `$size`      | Selects documents if the array field is a specified size.                                        |


### Bitwise Operators

| available | name            | description                                                                                     |
| --------- | --------------- | ----------------------------------------------------------------------------------------------- |
| yes       | `$bitsAllClear` | Matches numeric or binary values in which a set of bit positions all have a value of 0.         |
| yes       | `$bitsAllSet`   | Matches numeric or binary values in which a set of bit positions all have a value of 1.         |
| yes       | `$bitsAnyClear` | Matches numeric or binary values in which any bit from a set of bit positions has a value of 0. |
| yes       | `$bitsAnySet`   | Matches numeric or binary values in which any bit from a set of bit positions has a value of 1. |


### Projection Operators

| available | name         | description                                                                             |
| --------- | ------------ | --------------------------------------------------------------------------------------- |
| **no**    | `$`          | Projects the first element in an array that matches the query condition.                |
| **no**    | `$elemMatch` | Projects the first element in an array that matches the specified $elemMatch condition. |
| **no**    | `$meta`      | Projects the document's score assigned during $text operation.                          |
| **no**    | `$slice`     | Limits the number of elements projected from an array. Supports skip and limit slices.  |


### Miscellanious Operators

| available | name       | description                               |
| --------- | ---------- | ----------------------------------------- |
| **no**    | `$comment` | Adds a comment to a query predicate.      |
| **no**    | `$rand`    | Generates a random float between 0 and 1. |



## Update

### Fields Operators

| available | name           | description                                                                                                                                   |
| --------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| yes       | `$currentDate` | Sets the value of a field to current date, either as a Date or a Timestamp.                                                                   |
| yes       | `$inc`         | Increments the value of the field by the specified amount.                                                                                    |
| yes       | `$min`         | Only updates the field if the specified value is less than the existing field value.                                                          |
| yes       | `$max`         | Only updates the field if the specified value is greater than the existing field value.                                                       |
| yes       | `$mul`         | Multiplies the value of the field by the specified amount.                                                                                    |
| yes       | `$rename`      | Renames a field.                                                                                                                              |
| yes       | `$set`         | Sets the value of a field in a document.                                                                                                      |
| **no**    | `$setOnInsert` | Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents. |
| yes       | `$unset`       | Removes the specified field from a document.                                                                                                  |


### Array Operators

| available | name              | description                                                                                                                          |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **no**    | `$`               | Acts as a placeholder to update the first element that matches the query condition.                                                  |
| **no**    | `$[]`             | Acts as a placeholder to update all elements in an array for the documents that match the query condition.                           |
| **no**    | `$[<identifier>]` | Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition. |
| yes       | `$addToSet`       | Adds elements to an array only if they do not already exist in the set.                                                              |
| yes       | `$pop`            | Removes the first or last item of an array.                                                                                          |
| yes       | `$pull`           | Removes all array elements that match a specified query.                                                                             |
| yes       | `$push`           | Adds an item to an array.                                                                                                            |
| yes       | `$pullAll`        | Removes all matching values from an array.                                                                                           |


#### Modifiers

| available | name        | description                                                                                |
| --------- | ----------- | ------------------------------------------------------------------------------------------ |
| yes       | `$each`     | Modifies the `$push` and `$addToSet` operators to append multiple items for array updates. |
| yes       | `$position` | Modifies the `$push` operator to specify the position in the array to add elements.        |
| yes       | `$slice`    | Modifies the `$push` operator to limit the size of updated arrays.                         |
| yes       | `$sort`     | Modifies the `$push` operator to reorder documents stored in an array.                     |


### Bitwise Operators

| available | name   | description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| yes       | `$bit` | Performs bitwise AND, OR, and XOR updates of integer values. |
