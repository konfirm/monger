// $addToSet
// Returns an array of all unique values that results from applying an 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $avg
// Returns the average for the specified 
// expression
// . Ignores non-numeric values.

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
// Returns the number of documents in the group or window.

// Distinct from the $count pipeline stage.

// New in version 5.0.

// $covariancePop
// Returns the population covariance of two numeric 
// expressions.

// New in version 5.0.

// $covarianceSamp
// Returns the sample covariance of two numeric 
// expressions.

// New in version 5.0.

// $denseRank
// Returns the document position (known as the rank) relative to other documents in the $setWindowFields stage partition. There are no gaps in the ranks. Ties receive the same rank.

// New in version 5.0.

// $derivative
// Returns the average rate of change within the specified window.

// New in version 5.0.

// $documentNumber
// Returns the position of a document (known as the document number) in the $setWindowFields stage partition. Ties result in different adjacent document numbers.

// New in version 5.0.

// $expMovingAvg
// Returns the exponential moving average for the numeric 
// expression.

// New in version 5.0.

// $first
// Returns the value that results from applying an 
// expression
//  to the first document in a group or window.

// Changed in version 5.0: Available in $setWindowFields stage.

// $integral
// Returns the approximation of the area under a curve.

// New in version 5.0.

// $last
// Returns the value that results from applying an 
// expression
//  to the last document in a group or window.

// Changed in version 5.0: Available in $setWindowFields stage.

// $linearFill
// Fills null and missing fields in a window using 
// linear interpolation
//  based on surrounding field values.

// Available in $setWindowFields stage.

// New in version 5.3.

// $locf
// Last observation carried forward. Sets values for null and missing fields in a window to the last non-null value for the field.

// Available in $setWindowFields stage.

// New in version 5.2.

// $max
// Returns the maximum value that results from applying an 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $min
// Returns the minimum value that results from applying an 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $minN
// Returns an aggregation of the n minimum valued elements in a group. Distinct from the $minN array operator.

// New in version 5.2.

// Available in $group, $setWindowFields and as an 
// expression.

// $push
// Returns an array of values that result from applying an 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $rank
// Returns the document position (known as the rank) relative to other documents in the $setWindowFields stage partition.

// New in version 5.0.

// $shift
// Returns the value from an 
// expression
//  applied to a document in a specified position relative to the current document in the $setWindowFields stage partition.

// New in version 5.0.

// $stdDevPop
// Returns the population standard deviation that results from applying a numeric 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $stdDevSamp
// Returns the sample standard deviation that results from applying a numeric 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $sum
// Returns the sum that results from applying a numeric 
// expression
//  to each document.

// Changed in version 5.0: Available in $setWindowFields stage.

// $top
// Returns the top element within a group according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.

// $topN
// Returns an aggregation of the top n fields within a group, according to the specified sort order.

// New in version 5.2.

// Available in $group and $setWindowFields stages.