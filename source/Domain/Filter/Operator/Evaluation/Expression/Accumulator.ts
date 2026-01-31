// $accumulator
// Returns the result of a user-defined accumulator function.
// $addToSet
// Returns an array of unique expression values for each group. Order of the array elements is undefined.

// Changed in version 5.0: Available in $setWindowFields stage.

// $avg
// Returns an average of numerical values. Ignores non-numeric values.

// Changed in version 5.0: Available in $setWindowFields stage.

// $bottom
// Returns the bottom element within a group according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.

// $bottomN
// Returns an aggregation of the bottom n fields within a group, according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.

// $count
// Returns the number of documents in a group.

// Distinct from the $count pipeline stage.

// New in version 5.0: Available in $group and $setWindowFields stages.

// $first
// Returns a value from the first document for each group. Order is only defined if the documents are sorted.

// Distinct from the $first array operator.

// Changed in version 5.0: Available in $setWindowFields stage.

// $firstN
// Returns an aggregation of the first n elements within a group. Only meaningful when documents are in a defined order. Distinct from the $firstN array operator.

// New in version 5.2: Available in $group, expression and $setWindowFields stages.

// $last
// Returns a value from the last document for each group. Order is only defined if the documents are sorted.

// Distinct from the $last array operator.

// Changed in version 5.0: Available in $setWindowFields stage.

// $lastN
// Returns an aggregation of the last n elements within a group. Only meaningful when documents are in a defined order. Distinct from the $lastN array operator.

// New in version 5.2: Available in $group, expression and $setWindowFields stages.

// $max
// Returns the highest expression value for each group.

// Changed in version 5.0: Available in $setWindowFields stage.

// $maxN
// Returns an aggregation of the n maximum valued elements in a group. Distinct from the $maxN array operator.

// New in version 5.2.

// Available in $group, $setWindowFields and as an 
// expression.

// $mergeObjects
// Returns a document created by combining the input documents for each group.
// $min
// Returns the lowest expression value for each group.

// Changed in version 5.0: Available in $setWindowFields stage.

// $push
// Returns an array of expression values for documents in each group.

// Changed in version 5.0: Available in $setWindowFields stage.

// $stdDevPop
// Returns the population standard deviation of the input values.

// Changed in version 5.0: Available in $setWindowFields stage.

// $stdDevSamp
// Returns the sample standard deviation of the input values.

// Changed in version 5.0: Available in $setWindowFields stage.

// $sum
// Returns a sum of numerical values. Ignores non-numeric values.

// Changed in version 5.0: Available in $setWindowFields stage.

// $top
// Returns the top element within a group according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.

// $topN
// Returns an aggregation of the top n fields within a group, according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.