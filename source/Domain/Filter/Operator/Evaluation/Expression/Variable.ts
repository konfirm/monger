// NOW
// $$NOW
// Returns the current datetime value, which is same across all members of the deployment and remains constant throughout the aggregation pipeline. (Available in 4.2+)
// CLUSTER_TIME
// $$CLUSTER_TIME
// Returns the current timestamp value, which is same across all members of the deployment and remains constant throughout the aggregation pipeline. For replica sets and sharded clusters only. (Available in 4.2+)
// ROOT
// $$ROOT
// References the root document, i.e. the top-level document.
// CURRENT
// $$CURRENT
// References the start of the field path, which by default is ROOT but can be changed.
// REMOVE
// $$REMOVE
// Allows for the conditional exclusion of fields. (Available in 3.6+)
// DESCEND
// $$DESCEND
// One of the allowed results of a $redact expression.
// PRUNE
// $$PRUNE
// One of the allowed results of a $redact expression.
// KEEP
// $$KEEP
// One of the allowed results of a $redact expression.


// $let
// Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.

// Accepts any number of argument expressions.
