import { type } from "../BSON";

export const ErrorCode = {
	/** $concatArrays only supports arrays, not {?} */
	CONCAT_ARRAYS_UNSUPPORTED_TYPE: 28664,

	// /** chunks out of order */
    // CHUNKS_ORDER: 10040,
    // /** geo values must be 'legacy coordinate pairs' for 2d indexes{?} */
    // VALUES_MUST_LEGACY_COORDINATE: 13026,
    // /** point not in interval of [ {?}, {?} ]{?} */
    // POINT_INTERVAL: 13027,
    // /** geo field is empty{?} */
    // EMPTY_FIELD: 13067,
    // /** geo field only has 1 element{?} */
    // FIELD_ELEMENT: 13068,
    // /** {?}. Command line oplog size: {?}, existing oplog size: {?} */
    // COMMAND_LINE_OPLOG_SIZE: 13257,
    // /** invalid db name: {?} */
    // INVALID_NAME: 13280,
    // /** no _id index */
    // INDEX: 13430,
    // /** please specify one of [replace|merge|reduce|inline] in 'out' object */
    // SPECIFY_REPLACE_MERGE_REDUCE: 13522,
    // /** in Collection::updateDocument _id mismatch */
    // MISMATCH_COLLECTION_UPDATEDOCUMENT: 13596,
    // /** 'out' has to be a string or an object */
    // STRING_OBJECT: 13606,
    // /** specify size:<n> when capped is true */
    // SPECIFY_SIZE_CAPPED_TRUE: 14832,
    // /** The nonAtomic:false option is no longer allowed in the mapReduce command. Please omit or specify nonAtomic:true */
    // NONATOMIC_FALSE_OPTION_LONGER: 15895,
    // /** a group's fields must be specified in an object */
    // GROUP_FIELDS_MUST_OBJECT: 15947,
    // /** a group's _id may only be specified once */
    // GROUP_ONCE: 15948,
    // /** unknown group operator '{?}' */
    // UNKNOWN_GROUP_OPERATOR: 15952,
    // /** a group specification must include an _id */
    // GROUP_SPECIFICATION_MUST_INCLUDE: 15955,
    // /** Argument to $skip cannot be negative */
    // SKIP_CANNOT_ARGUMENT_NEGATIVE: 15956,
    // /** the limit must be positive */
    // LIMIT_MUST_POSITIVE: 15958,
    // /** the match filter must be an expression in an object */
    // MATCH_FILTER_MUST_EXPRESSION: 15959,
    // /** $project specification must be an object */
    // PROJECT_SPECIFICATION_MUST_OBJECT: 15969,
    // /** the $sort key specification must be an object */
    // SORT_SPECIFICATION_MUST_OBJECT: 15973,
    // /** Illegal key in $sort specification: {?} */
    // SORT_ILLEGAL_SPECIFICATION: 15974,
    // /** $sort key ordering must be 1 (for ascending) or -1 (for descending) */
    // SORT_ORDERING_MUST_ASCENDING_DESCENDING: 15975,
    // /** $sort stage must have at least one sort key */
    // SORT_STAGE_MUST: 15976,
    // /** expected either a string or an object as specification for $unwind stage, got {?} */
    // UNWIND_STRING_OBJECT_SPECIFICATION_STAGE: 15981,
    // /** field path references must be prefixed with a '$' ('{?}' */
    // FIELD_PATH_REFERENCES_MUST: 15982,
    // /** {?}{?} */
    // UNKNOWN_ERROR: 15983,
    // /** can't convert from BSON type {?} to int */
    // CONVERT_BSON_TYPE: 16003,
    // /** can't convert from BSON type {?} to long */
    // CONVERT_BSON_TYPE_LONG: 16004,
    // /** can't convert from BSON type {?} to double */
    // CONVERT_BSON_TYPE_DOUBLE: 16005,
    // /** can't convert from BSON type {?} to Date */
    // CONVERT_BSON_TYPE_DATE: 16006,
    // /** can't convert from BSON type {?} to String */
    // CONVERT_BSON_TYPE_STRING: 16007,
    // /** can't convert from BSON type {?} to decimal */
    // CONVERT_BSON_TYPE_DECIMAL: 16008,
    // /** Expression {?} takes exactly {?} arguments. {?} were passed in. */
    // EXPRESSION_TAKES_EXACTLY_ARGUMENTS: 16020,
    // /** {?}:  starting index must be a numeric type (is BSON type {?}) */
    // STARTING_INDEX_MUST_NUMERIC: 16034,
    // /** {?}:  length must be a numeric type (is BSON type {?}) */
    // LENGTH_MUST_NUMERIC_TYPE: 16035,
    // /** can't convert from BSON type {?} to timestamp */
    // CONVERT_BSON_TYPE_TIMESTAMP: 16378,
    // /** duplicate field name specified in object literal: {?} */
    // DUPLICATE_FIELD_NAME: 16406,
    // /** field path must not contain embedded null characters */
    // FIELD_PATH_MUST_CONTAIN: 16419,
    // /** point not in interval of [ {?}, {?} ]{?} */
    // POINT_INTERVAL_16433: 16433,
    // /** A pipeline stage specification object must contain exactly one field. */
    // PIPELINE_STAGE_SPECIFICATION_OBJECT: 16435,
    // /** initFromString passed a too-long string */
    // INITFROMSTRING_PASSED_LONG_STRING: 16457,
    // /** initFromString passed an odd length string */
    // INITFROMSTRING_PASSED_LENGTH_STRING: 16458,
    // /** Tried to make oversized document */
    // TRIED_MAKE_OVERSIZED_DOCUMENT: 16490,
    // /** Tried to make oversized document */
    // TRIED_MAKE_OVERSIZED_DOCUMENT_16491: 16491,
    // /** $geoNear requires that the 'distanceField' option is a String */
    // GEO_NEAR_REQUIRES_DISTANCEFIELD_OPTION: 16606,
    // /** $geoNear requires that 'includeLocs' option is a String */
    // GEO_NEAR_REQUIRES_INCLUDELOCS_OPTION: 16607,
    // /** only one date allowed in an $add expression */
    // ADD_DATE_ALLOWED_EXPRESSION: 16612,
    // /** $concat only supports strings, not {?} */
    // CONCAT_SUPPORTS_STRINGS: 16702,
    // /** {?}{?}' for array: {?} */
    // ARRAY: 16746,
    // /** coarsestIndexedLevel must be >= 0 */
    // COARSESTINDEXEDLEVEL_MUST: 16747,
    // /** finestIndexedLevel must be <= 30 */
    // FINESTINDEXEDLEVEL_MUST: 16748,
    // /** finestIndexedLevel must be >= coarsestIndexedLevel */
    // FINESTINDEXEDLEVEL_MUST_COARSESTINDEXEDLEVEL: 16749,
    // /** Expect at least one geo field, spec={?} */
    // EXPECT_FIELD_SPEC: 16750,
    // /** Can't extract geo keys: {?}  {?} */
    // EXTRACT_KEYS: 16755,
    // /** Unable to generate keys for (likely malformed) geometry: {?} */
    // UNABLE_GENERATE_KEYS_LIKELY: 16756,
    // /** Currently hashed indexes cannot guarantee uniqueness. Use a regular index. */
    // CANNOT_HASHED_INDEXES: 16764,
    // /** {?}{?} */
    // UNKNOWN_ERROR_16766: 16766,
    // /** can't have 2 geo fields */
    // FIELDS: 16800,
    // /** 2d has to be first in index */
    // FIRST_INDEX: 16801,
    // /** no geo field specified */
    // FIELD: 16802,
    // /** location object expected, location array not in correct format */
    // LOCATION_OBJECT_LOCATION_ARRAY: 16804,
    // /** Unexpected empty file: {?} */
    // UNEXPECTED_EMPTY_FILE: 16815,
    // /** file too short? */
    // FILE_SHORT: 16816,
    // /** Error reading file {?}: {?} */
    // ERROR_READING_FILE: 16817,
    // /** Error opening file {?}: {?} */
    // ERROR_OPENING_FILE: 16818,
    // /** Error writing to file {?}: {?} */
    // ERROR_WRITING_FILE: 16821,
    // /** {?}{?} index with other special index types: {?} */
    // INDEX_SPECIAL_INDEX_TYPES: 16823,
    // /** '$' by itself is not a valid FieldPath */
    // ITSELF_VALID_FIELDPATH: 16872,
    // /** FieldPath '{?}' doesn't start with $ */
    // FIELDPATH_DOESN_START: 16873,
    // /** $let only supports an object as its argument */
    // LET_SUPPORTS_OBJECT_ARGUMENT: 16874,
    // /** Unrecognized parameter to $let: {?} */
    // LET_UNRECOGNIZED_PARAMETER: 16875,
    // /** Missing 'vars' parameter to $let */
    // LET_MISSING_VARS_PARAMETER: 16876,
    // /** Missing 'in' parameter to $let */
    // LET_MISSING_PARAMETER: 16877,
    // /** $map only supports an object as its argument */
    // MAP_SUPPORTS_OBJECT_ARGUMENT: 16878,
    // /** Unrecognized parameter to $map: {?} */
    // MAP_UNRECOGNIZED_PARAMETER: 16879,
    // /** Missing 'input' parameter to $map */
    // MAP_MISSING_INPUT_PARAMETER: 16880,
    // /** Missing 'in' parameter to $map */
    // MAP_MISSING_PARAMETER: 16882,
    // /** input to $map must be an array not {?} */
    // MAP_INPUT_MUST_ARRAY: 16883,
    // /** $minDistance must be a number */
    // MIN_DISTANCE_MUST_NUMBER: 16893,
    // /** $minDistance must be non-negative */
    // MIN_DISTANCE_MUST_NEGATIVE: 16894,
    // /** $maxDistance must be a number */
    // MAX_DISTANCE_MUST_NUMBER: 16895,
    // /** $maxDistance must be non-negative */
    // MAX_DISTANCE_MUST_NEGATIVE: 16896,
    // /** Attempting to use external sort from mongos. This is not allowed. */
    // ATTEMPTING_EXTERNAL_SORT_MONGOS: 16946,
    // /** Attempting to use external sort from mongos. This is not allowed. */
    // ATTEMPTING_EXTERNAL_SORT_MONGOS_16947: 16947,
    // /** {?}'s argument must be an array, but is {?} */
    // ARGUMENT_MUST_ARRAY: 17040,
    // /** {?}'s argument must be an array, but is {?} */
    // ARGUMENT_MUST_ARRAY_17041: 17041,
    // /** both operands of $setIsSubset must be arrays. Second argument is of type: {?} */
    // SET_IS_SUBSET_OPERANDS_MUST_ARRAYS_SECOND: 17042,
    // /** All operands of $setUnion must be arrays. One argument is of type: {?} */
    // SET_UNION_OPERANDS_MUST_ARRAYS_ARGUMENT: 17043,
    // /** All operands of $setEquals must be arrays. {?}-th argument is of type: {?} */
    // SET_EQUALS_OPERANDS_MUST_ARRAYS_ARGUMENT: 17044,
    // /** $setEquals needs at least two arguments had: {?} */
    // SET_EQUALS_NEEDS_ARGUMENTS: 17045,
    // /** both operands of $setIsSubset must be arrays. First argument is of type: {?} */
    // SET_IS_SUBSET_OPERANDS_MUST_ARRAYS_FIRST: 17046,
    // /** All operands of $setIntersection must be arrays. One argument is of type: {?} */
    // SET_INTERSECTION_OPERANDS_MUST_ARRAYS_ARGUMENT: 17047,
    // /** both operands of $setDifference must be arrays. First argument is of type: {?} */
    // SET_DIFFERENCE_OPERANDS_MUST_ARRAYS_FIRST: 17048,
    // /** both operands of $setDifference must be arrays. Second argument is of type: {?} */
    // SET_DIFFERENCE_OPERANDS_MUST_ARRAYS_SECOND: 17049,
    // /** $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned {?} */
    // REDACT_KEEP_EXPRESSION_RETURN_ANYTHING: 17053,
    // /** couldn't get uncompressed length */
    // COULDN_UNCOMPRESSED_LENGTH: 17061,
    // /** decompression failed */
    // FAILED_DECOMPRESSION: 17062,
    // /** Missing 'if' parameter to $cond */
    // COND_MISSING_PARAMETER: 17080,
    // /** Missing 'then' parameter to $cond */
    // COND_MISSING_PARAMETER_17081: 17081,
    // /** Missing 'else' parameter to $cond */
    // COND_MISSING_ELSE_PARAMETER: 17082,
    // /** Unrecognized parameter to $cond: {?} */
    // COND_UNRECOGNIZED_PARAMETER: 17083,
    // /** The argument to $size must be an array, but was of type: {?} */
    // SIZE_ARGUMENT_MUST_ARRAY_TYPE: 17124,
    // /** Invalid target namespace {?} */
    // INVALID_TARGET_NAMESPACE: 17138,
    // /** Invalid index type '{?}' in index {?} */
    // INVALID_INDEX_TYPE: 17197,
    // /** can't use Variables::setValue to set a reserved builtin variable */
    // VARIABLES_SETVALUE_RESERVED_BUILTIN: 17199,
    // /** distinct too big, 16mb cap */
    // DISTINCT_16MB: 17217,
    // /** Can't canonicalize query {?} */
    // CANONICALIZE_QUERY: 17240,
    // /** found language override field in document with non-string type */
    // LANGUAGE_OVERRIDE_FIELD_DOCUMENT: 17261,
    // /** language override unsupported: {?} */
    // UNSUPPORTED_LANGUAGE_OVERRIDE: 17262,
    // /** Could not create new ObjectId '_id' field. */
    // CREATE_OBJECTID_FIELD: 17268,
    // /** Use of undefined variable: {?} */
    // UNDEFINED_VARIABLE: 17276,
    // /** $meta only supports string arguments */
    // META_SUPPORTS_STRING_ARGUMENTS: 17307,
    // /** both operands of $setIsSubset must be arrays. Second argument is of type: {?} */
    // SET_IS_SUBSET_OPERANDS_MUST_ARRAYS_SECOND_17311: 17311,
    // /** $meta is the only expression supported by $sort right now */
    // META_SORT_EXPRESSION_SUPPORTED_RIGHT: 17312,
    // /** $match with $text is only allowed as the first pipeline stage */
    // MATCH_TEXT_ALLOWED_FIRST_PIPELINE: 17313,
    // /** $group does not support inclusion-style expressions */
    // GROUP_SUPPORT_INCLUSION_STYLE_EXPRESSIONS: 17390,
    // /** Invalid or missing {?} iteration count */
    // INVALID_MISSING_ITERATION_COUNT: 17501,
    // /** Missing {?} salt */
    // MISSING_SALT: 17502,
    // /** Missing {?} serverKey */
    // MISSING_SERVERKEY: 17503,
    // /** Missing {?} storedKey */
    // MISSING_STOREDKEY: 17504,
    // /** max distance must be non-negative */
    // DISTANCE_MUST_NEGATIVE: 18522,
    // /** $dateToString requires that 'format' be a string, found: {?} with value {?} */
    // DATE_TO_STRING_REQUIRES_FORMAT_STRING: 18533,
    // /** Unrecognized argument to $dateToString: {?} */
    // DATE_TO_STRING_UNRECOGNIZED_ARGUMENT: 18534,
    // /** Unmatched '%' at end of format string */
    // UNMATCHED_FORMAT_STRING: 18535,
    // /** Invalid format character '%{?}' in format string */
    // INVALID_FORMAT_CHARACTER: 18536,
    // /** Missing 'date' parameter to $dateToString */
    // DATE_TO_STRING_MISSING_DATE_PARAMETER: 18628,
    // /** $dateToString only supports an object as its argument */
    // DATE_TO_STRING_SUPPORTS_OBJECT_ARGUMENT: 18629,
    // /** Failed to parse ns string */
    // FAILED_PARSE_STRING: 18633,
    // /** Not enough data to read */
    // ENOUGH_DATA_READ: 18634,
    // /** Cannot start server with an unknown storage engine: {?} */
    // CANNOT_UNKNOWN_START_SERVER: 18656,
    // /** invalid op : {?}. Op ID cannot be represented with 32 bits */
    // INVALID_CANNOT_REPRESENTED_BITS: 26823,
    // /** Database {?} dropped while cloning */
    // DATABASE_DROPPED_CLONING: 28593,
    // /** Collection {?} dropped while cloning */
    // COLLECTION_DROPPED_CLONING: 28594,
    // /** Unable to determine status of lock file in the data directory {?}: {?} */
    // UNABLE_DETERMINE_STATUS_LOCK: 28596,
    // /** no collection name specified */
    // COLLECTION_NAME: 28635,
    // /** $filter only supports an object as its argument */
    // FILTER_SUPPORTS_OBJECT_ARGUMENT: 28646,
    // /** Unrecognized parameter to $filter: {?} */
    // FILTER_UNRECOGNIZED_PARAMETER: 28647,
    // /** Missing 'input' parameter to $filter */
    // FILTER_MISSING_INPUT_PARAMETER: 28648,
    // /** Missing 'cond' parameter to $filter */
    // FILTER_MISSING_COND_PARAMETER: 28650,
    // /** input to $filter must be an array not {?} */
    // FILTER_INPUT_MUST_ARRAY: 28651,
    // /** {?}:  Invalid range, starting index is a UTF-8 continuation byte. */
    // INVALID_RANGE_STARTING: 28656,
    // /** {?}:  Invalid range, ending index is in the middle of a UTF-8 character. */
    // INVALID_RANGE_ENDING: 28657,
    // /** Cannot start server. Detected data files in {?} created by the '{?}' storage engine, but the specified storage engine was '{?}'. */
    // CANNOT_START_SERVER: 28662,
    // /** Expression {?} takes at least {?} arguments, and at most {?}, but {?} were passed in. */
    // EXPRESSION_TAKES_ARGUMENTS_PASSED: 28667,
    // /** can't take $abs of long long min */
    // ABS_TAKE_LONG: 28680,
    // /** Unrecognized language {?}{?} */
    // UNRECOGNIZED_LANGUAGE: 28682,
    // /** {?}'s {?} must be an array, but is {?} */
    // MUST_ARRAY: 28689,
    // /** {?}'s second argument must be a numeric value, but is {?} */
    // SECOND_ARGUMENT_MUST_NUMERIC: 28690,
    // /** {?}'s second argument must be representable as a 32-bit integer: {?} */
    // SECOND_ARGUMENT_MUST_REPRESENTABLE: 28691,
    // /** $sqrt's argument must be greater than or equal to 0 */
    // SQRT_ARGUMENT_MUST_GREATER_EQUAL: 28714,
    // /** First argument to $slice must be an array, but is of type: {?} */
    // SLICE_FIRST_ARGUMENT_MUST_ARRAY: 28724,
    // /** Second argument to $slice must be a numeric value, but is of type: {?} */
    // SLICE_SECOND_ARGUMENT_MUST_NUMERIC: 28725,
    // /** Second argument to $slice can't be represented as a 32-bit integer: {?} */
    // SLICE_SECOND_ARGUMENT_REPRESENTED_INTEGER: 28726,
    // /** Third argument to $slice must be numeric, but is of type: {?} */
    // SLICE_THIRD_ARGUMENT_MUST_NUMERIC: 28727,
    // /** Third argument to $slice can't be represented as a 32-bit integer: {?} */
    // SLICE_THIRD_ARGUMENT_REPRESENTED_INTEGER: 28728,
    // /** Third argument to $slice must be positive: {?} */
    // SLICE_THIRD_ARGUMENT_MUST_POSITIVE: 28729,
    // /** Geo coarsest level must be in range [0,30] */
    // COARSEST_LEVEL_MUST_RANGE: 28739,
    // /** Geo finest level must be in range [0,30] */
    // FINEST_LEVEL_MUST_RANGE: 28740,
    // /** Geo coarsest level must be less than or equal to finest */
    // COARSEST_LEVEL_MUST_EQUAL: 28741,
    // /** Unrecognized marker, unable to deserialize buffer */
    // UNRECOGNIZED_MARKER_UNABLE: 28744,
    // /** the $sample stage specification must be an object */
    // SAMPLE_STAGE_SPECIFICATION_MUST_OBJECT: 28745,
    // /** size argument to $sample must be a number */
    // SAMPLE_SIZE_ARGUMENT_MUST_NUMBER: 28746,
    // /** size argument to $sample must be a positive integer */
    // SAMPLE_SIZE_ARGUMENT_MUST_POSITIVE: 28747,
    // /** unrecognized option to $sample: {?} */
    // SAMPLE_UNRECOGNIZED_OPTION: 28748,
    // /** $sample stage must specify a size */
    // SAMPLE_STAGE_MUST_SPECIFY_SIZE: 28749,
    // /** text contains invalid UTF-8 */
    // INVALID_TEXT_CONTAINS: 28755,
    // /** $log's argument must be numeric, not {?} */
    // LOG_ARGUMENT_MUST_NUMERIC: 28756,
    // /** $log's base must be numeric, not {?} */
    // LOG_BASE_MUST_NUMERIC: 28757,
    // /** $log's argument must be a positive number, but is {?} */
    // LOG_ARGUMENT_MUST_POSITIVE_NUMBER: 28758,
    // /** $log's base must be a positive number not equal to 1, but is {?} */
    // LOG_BASE_MUST_POSITIVE_NUMBER: 28759,
    // /** $log10's argument must be a positive number, but is {?} */
    // LOG10_ARGUMENT_MUST_POSITIVE_NUMBER: 28761,
    // /** $pow's base must be numeric, not {?} */
    // POW_BASE_MUST_NUMERIC: 28762,
    // /** $pow's exponent must be numeric, not {?} */
    // POW_EXPONENT_MUST_NUMERIC: 28763,
    // /** $pow cannot take a base of 0 and a negative exponent */
    // POW_CANNOT_TAKE_BASE: 28764,
    // /** {?} only supports numeric types, not {?} */
    // SUPPORTS_NUMERIC_TYPES: 28765,
    // /** $ln's argument must be a positive number, but is {?} */
    // LN_ARGUMENT_MUST_POSITIVE_NUMBER: 28766,
    // /** Unrecognized configsvr mode number: {?}. Range of known configsvr mode numbers is: [{?}, {?}] */
    // UNRECOGNIZED_CONFIGSVR_MODE: 28785,
    // /** The optimized $sample stage requires all documents have a {?}{?}{?} field: {?} */
    // SAMPLE_REQUIRES_OPTIMIZED_STAGE: 28793,
    // /** $sample stage could not find a non-duplicate document after {?}{?} */
    // SAMPLE_DUPLICATE_STAGE_FIND: 28799,
    // /** The $indexStats stage specification must be an empty object */
    // INDEX_STATS_EMPTY_STAGE_SPECIFICATION: 28803,
    // /** expected a string as the path for $unwind stage, got {?} */
    // UNWIND_STRING_PATH_STAGE: 28808,
    // /** {?}{?} */
    // UNKNOWN_ERROR_28809: 28809,
    // /** {?}{?} */
    // UNKNOWN_ERROR_28810: 28810,
    // /** unrecognized option to $unwind stage: {?} */
    // UNWIND_UNRECOGNIZED_OPTION_STAGE: 28811,
    // /** no path specified to $unwind stage */
    // UNWIND_PATH_STAGE: 28812,
    // /** path option to $unwind stage should be prefixed with a '$': {?} */
    // UNWIND_PATH_OPTION_STAGE_PREFIXED: 28818,
    // /** {?}{?} */
    // UNKNOWN_ERROR_28822: 28822,
    // /** cannot create a non-capped oplog collection */
    // CANNOT_CREATE_CAPPED: 28838,
    // /** Failed to unprotect data: {?} */
    // FAILED_UNPROTECT_DATA: 28841,
    // /** Failed to compress data: {?} */
    // FAILED_COMPRESS_DATA: 28842,
    // /** $unset specification must be a string or an array */
    // UNSET_SPECIFICATION_MUST_STRING_ARRAY: 31002,
    // /** {?} requires 'input' parameter */
    // REQUIRES_INPUT_PARAMETER: 31022,
    // /** {?} requires 'regex' parameter */
    // REQUIRES_REGEX_PARAMETER: 31023,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT: 31024,
    // /** Key field cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN: 31032,
    // /** '{?}' must evaluate to a value in the range [{?}, {?}]; value {?} is not in range */
    // MUST_EVALUATE_VALUE_RANGE: 31034,
    // /** applyOps command can't have 'partialTxn' field. */
    // APPLYOPS_COMMAND_PARTIALTXN_FIELD: 31056,
    // /** Expected command matching {?} but got {?} */
    // COMMAND_MATCHING: 31086,
    // /** Cursor for cursor id {?} has no queued history */
    // CURSOR_QUEUED_HISTORY: 31087,
    // /** Cannot run getMore on cursor id {?} without having run search */
    // CANNOT_GETMORE_CURSOR: 31088,
    // /** Could not find cursor state associated with cursor id {?} */
    // FIND_CURSOR_STATE_ASSOCIATED: 31089,
    // /** Mock mongot supports killCursors of only one cursor at a time */
    // MOCK_MONGOT_SUPPORTS_KILLCURSORS: 31090,
    // /** Could not find cursor state associated with cursor id {?} */
    // FIND_CURSOR_STATE_ASSOCIATED_31092: 31092,
    // /** Cannot run killCursors on cursor id {?} without having run search */
    // CANNOT_KILLCURSORS_CURSOR: 31093,
    // /** {?}{?} */
    // UNKNOWN_ERROR_31094: 31094,
    // /** 'isoWeekYear' must evaluate to an integer in the range {?} to {?}, found {?} */
    // ISOWEEKYEAR_MUST_EVALUATE_INTEGER: 31095,
    // /** The {?} stage is not allowed in this context :: missing an AuthorizationManager */
    // MISSING_STAGE_ALLOWED: 31106,
    // /** Can't coerce out of range value {?} to int */
    // COERCE_RANGE_VALUE: 31108,
    // /** Can't coerce out of range value {?} to long */
    // COERCE_RANGE_VALUE_LONG: 31109,
    // /** The {?} stage is not allowed in this context :: missing a LogicalSessionCache */
    // MISSING_STAGE_ALLOWED_31111: 31111,
    // /** $unset specification must be a string or an array with at least one field */
    // UNSET_SPECIFICATION_MUST_STRING_ARRAY_31119: 31119,
    // /** $unset specification must be a string or an array containing only string values */
    // UNSET_SPECIFICATION_MUST_STRING_ARRAY_31120: 31120,
    // /** Change streams from router may not show migration events */
    // CHANGE_STREAMS_ROUTER_SHOW: 31123,
    // /** Illegal $meta sort: {?} */
    // META_ILLEGAL_SORT: 31138,
    // /** Clock must have moved backwards by at least {?} ms during sleep command */
    // CLOCK_MUST_MOVED_BACKWARDS: 31173,
    // /** emit takes 2 args */
    // EMIT_TAKES_ARGS: 31220,
    // /** {?} requires an object as an argument, found: {?} */
    // REQUIRES_OBJECT_ARGUMENT: 31221,
    // /** The map function must be specified. */
    // FUNCTION_MUST: 31222,
    // /** {?} requires 'this' to be specified */
    // REQUIRES: 31223,
    // /** The map function must be of type string or code */
    // FUNCTION_MUST_TYPE_STRING: 31224,
    // /** 'this' must be an object. */
    // MUST_OBJECT: 31225,
    // /** applyOps command can't have 'count' field. */
    // APPLYOPS_COMMAND_COUNT_FIELD: 31240,
    // /** {?} requires a document argument, but found {?} */
    // REQUIRES_DOCUMENT_ARGUMENT: 31242,
    // /** Invalid argument specified to {?}: {?} */
    // INVALID_ARGUMENT: 31243,
    // /** {?} requires the 'eval' argument to be of type string, or code but found {?} */
    // REQUIRES_EVAL_ARGUMENT: 31244,
    // /** {?} requires 'eval' argument, received input: {?} */
    // REQUIRES_EVAL_ARGUMENT_31245: 31245,
    // /** The user-defined function failed to parse in the javascript engine */
    // FAILED_USER_DEFINED: 31247,
    // /** Path collision at {?} remaining portion {?} */
    // PATH_COLLISION_REMAINING_PORTION: 31249,
    // /** Path collision at {?} */
    // PATH_COLLISION: 31250,
    // /** {?} requires the 'data' argument to have a 'k' and 'v' field. Instead found{?} */
    // REQUIRES_DATA_ARGUMENT: 31251,
    // /** Cannot use expression other than $meta in exclusion projection */
    // META_CANNOT_EXPRESSION_EXCLUSION: 31252,
    // /** Cannot do inclusion on field {?} in exclusion projection */
    // CANNOT_INCLUSION_FIELD: 31253,
    // /** Cannot do exclusion on field {?} in inclusion projection */
    // CANNOT_EXCLUSION_FIELD: 31254,
    // /** Cannot specify positional operator and $elemMatch. */
    // ELEM_MATCH_CANNOT_SPECIFY_POSITIONAL: 31255,
    // /** Cannot specify positional operator and $elemMatch. */
    // ELEM_MATCH_CANNOT_SPECIFY_POSITIONAL_31256: 31256,
    // /** $slice expects the skip argument to be a number, got {?} */
    // SLICE_EXPECTS_SKIP_ARGUMENT_NUMBER: 31257,
    // /** $slice expects the limit argument to be a number, got {?} */
    // SLICE_EXPECTS_LIMIT_ARGUMENT_NUMBER: 31258,
    // /** $slice limit must be positive, got {?} */
    // SLICE_LIMIT_MUST_POSITIVE: 31259,
    // /** {?} requires an object as an argument, found: {?} */
    // REQUIRES_OBJECT_ARGUMENT_31260: 31260,
    // /** The body function must be specified. */
    // BODY_FUNCTION_MUST: 31261,
    // /** The body function must evaluate to type string or code */
    // BODY_FUNCTION_MUST_EVALUATE: 31262,
    // /** The args field must be specified. */
    // ARGS_FIELD_MUST: 31263,
    // /** Cannot run server-side javascript without the javascript engine enabled */
    // CANNOT_SERVER_SIDE: 31264,
    // /** The body function did not evaluate */
    // BODY_FUNCTION_EVALUATE: 31265,
    // /** The args field must be of type array */
    // ARGS_FIELD_MUST_TYPE: 31266,
    // /** positional projection cannot be used with an expression or sub object */
    // CANNOT_POSITIONAL_PROJECTION: 31271,
    // /** $slice array argument should be of form [skip, limit] */
    // SLICE_ARRAY_ARGUMENT_FORM_SKIP: 31272,
    // /** $slice only supports numbers and [skip, limit] arrays */
    // SLICE_SUPPORTS_NUMBERS_SKIP_LIMIT: 31273,
    // /** elemMatch: Invalid argument, object required, but got {?} */
    // INVALID_REQUIRED_ELEMMATCH_ARGUMENT: 31274,
    // /** Cannot use $elemMatch projection on a nested field. */
    // ELEM_MATCH_CANNOT_PROJECTION_NESTED: 31275,
    // /** Cannot specify more than one positional projection per query. */
    // CANNOT_SPECIFY_POSITIONAL: 31276,
    // /** Empty sort key in metadata */
    // EMPTY_SORT_METADATA: 31282,
    // /** Size of emitted values exceeds the set size limit of {?} bytes */
    // SIZE_EMITTED_VALUES_EXCEEDS: 31292,
    // /** Sync source returned invalid result from replSetGetRBID */
    // INVALID_SYNC_SOURCE: 31298,
    // /** distinct too big, 16mb cap */
    // DISTINCT_16MB_31299: 31299,
    // /** A maximum of one index field is allowed to be hashed but found {?} for 'key' {?} */
    // MAXIMUM_INDEX_FIELD_ALLOWED: 31303,
    // /** positional projection cannot be used with a literal */
    // CANNOT_POSITIONAL_PROJECTION_31308: 31308,
    // /** Cannot use an expression {?} in an exclusion projection */
    // CANNOT_EXPRESSION_EXCLUSION: 31310,
    // /** Cannot use positional projection in aggregation projection */
    // CANNOT_POSITIONAL_PROJECTION_31324: 31324,
    // /** {?} */
    // UNKNOWN_ERROR_31325: 31325,
    // /** {?} requires a document argument, but found {?} */
    // REQUIRES_DOCUMENT_ARGUMENT_31326: 31326,
    // /** {?} requires 'data' argument, received input: {?} */
    // REQUIRES_DATA_ARGUMENT_31349: 31349,
    // /** collection already exists. ns: {?} */
    // EXISTS_COLLECTION: 31370,
    // /** topologyVersion must have a non-negative counter */
    // TOPOLOGYVERSION_MUST_NEGATIVE_COUNTER: 31372,
    // /** While attempting to write migration information for migration , found document with the same migration id. Attempted migration: {?} */
    // ATTEMPTING_WRITE_MIGRATION_INFORMATION: 31374,
    // /** While attempting to write range deletion task for migration {?}{?} */
    // ATTEMPTING_WRITE_RANGE_DELETION: 31375,
    // /** Received a topology version with counter: {?} which is greater than the server topology version counter: {?} */
    // RECEIVED_TOPOLOGY_VERSION_COUNTER: 31382,
    // /** {?}{?} */
    // UNKNOWN_ERROR_31388: 31388,
    // /** {?}{?} */
    // UNKNOWN_ERROR_31389: 31389,
    // /** {?}{?} */
    // UNKNOWN_ERROR_31390: 31390,
    // /** {?}{?} */
    // UNKNOWN_ERROR_31391: 31391,
    // /** Value too large to reduce */
    // VALUE_LARGE_REDUCE: 31392,
    // /** $bsonSize requires a document input, found: {?} */
    // BSON_SIZE_REQUIRES_DOCUMENT_INPUT: 31393,
    // /** positional projection cannot be used with exclusion */
    // CANNOT_POSITIONAL_PROJECTION_31395: 31395,
    // /** Cannot open backup cursor with in-memory storage engine. */
    // CANNOT_OPEN_BACKUP: 31401,
    // /** No commit timestamp set while applying commitIndexBuild operation. Build UUID: {?} */
    // COMMIT_TIMESTAMP_APPLYING_COMMITINDEXBUILD: 31417,
    // /** The lang field must be specified. */
    // LANG_FIELD_MUST: 31418,
    // /** Currently the only supported language specifier is 'js'. */
    // SUPPORTED_LANGUAGE_SPECIFIER: 31419,
    // /** No commit timestamp set while applying abortIndexBuild operation. Build UUID: {?} */
    // COMMIT_TIMESTAMP_APPLYING_ABORTINDEXBUILD: 31420,
    // /** field path $$CURRENT must be the only element in args */
    // CURRENT_FIELD_PATH_MUST_ELEMENT: 31422,
    // /** The body function must be a constant expression */
    // BODY_FUNCTION_MUST_CONSTANT: 31432,
    // /** js function failed to execute: {?} */
    // FAILED_FUNCTION_EXECUTE: 31439,
    // /** {?} is not allowed within a $unionWith's sub-pipeline */
    // UNION_WITH_ALLOWED_PIPELINE: 31441,
    // /** Found a duplicate field '{?}' */
    // DUPLICATE_FIELD: 31465,
    // /** js function failed to execute: {?} */
    // FAILED_FUNCTION_EXECUTE_31470: 31470,
    // /** 'secs' must be a number. */
    // SECS_MUST_NUMBER: 34344,
    // /** 'millis' must be a number. */
    // MILLIS_MUST_NUMBER: 34345,
    // /** Only one of 'w' and 'lock' may be set. */
    // LOCK: 34346,
    // /** 'lock' must be one of 'r', 'ir', 'w', 'iw', 'none'. */
    // LOCK_MUST_NONE: 34347,
    // /** Server was started in queryable backup mode, but the configured storage engine, {?}, does not support queryable backup mode */
    // SERVER_STARTED_QUERYABLE_BACKUP: 34368,
    // /** invalid argument in geo near query: {?} */
    // INVALID_ARGUMENT_NEAR: 34413,
    // /** The argument to $reverseArray must be an array, but was of type: {?} */
    // REVERSE_ARRAY_ARGUMENT_MUST_ARRAY_TYPE: 34435,
    // /** $range requires a numeric starting value, found value of type: {?} */
    // RANGE_REQUIRES_NUMERIC_STARTING: 34443,
    // /** {?}{?} */
    // UNKNOWN_ERROR_34444: 34444,
    // /** $range requires a numeric ending value, found value of type: {?} */
    // RANGE_REQUIRES_NUMERIC_ENDING: 34445,
    // /** {?}{?} */
    // UNKNOWN_ERROR_34446: 34446,
    // /** $range requires a numeric step value, found value of type:{?} */
    // RANGE_REQUIRES_NUMERIC_STEP: 34447,
    // /** {?}{?} */
    // UNKNOWN_ERROR_34448: 34448,
    // /** $range requires a non-zero step value */
    // RANGE_REQUIRES_ZERO_STEP: 34449,
    // /** {?}: starting index must be a numeric type (is BSON type {?}) */
    // STARTING_INDEX_MUST_NUMERIC_34450: 34450,
    // /** {?}: starting index cannot be represented as a 32-bit integral value: {?} */
    // CANNOT_STARTING_INDEX: 34451,
    // /** {?}: length must be a numeric type (is BSON type {?}) */
    // LENGTH_MUST_NUMERIC_TYPE_34452: 34452,
    // /** {?}: length cannot be represented as a 32-bit integral value: {?} */
    // CANNOT_LENGTH_REPRESENTED: 34453,
    // /** {?}: length must be a nonnegative integer. */
    // LENGTH_MUST_NONNEGATIVE_INTEGER: 34454,
    // /** {?}: the starting index must be nonnegative integer. */
    // STARTING_INDEX_MUST_NONNEGATIVE: 34455,
    // /** $substrCP: invalid UTF-8 string */
    // SUBSTR_CP_INVALID_STRING: 34456,
    // /** $substrCP: invalid UTF-8 string */
    // SUBSTR_CP_INVALID_STRING_34457: 34457,
    // /** $substrCP: invalid UTF-8 string */
    // SUBSTR_CP_INVALID_STRING_34458: 34458,
    // /** $substrCP: invalid UTF-8 string */
    // SUBSTR_CP_INVALID_STRING_34459: 34459,
    // /** $zip only supports an object as an argument, found {?} */
    // ZIP_SUPPORTS_OBJECT_ARGUMENT: 34460,
    // /** inputs must be an array of expressions, found {?} */
    // INPUTS_MUST_ARRAY_EXPRESSIONS: 34461,
    // /** defaults must be an array of expressions, found {?} */
    // DEFAULTS_MUST_ARRAY_EXPRESSIONS: 34462,
    // /** useLongestLength must be a bool, found {?} */
    // USELONGESTLENGTH_MUST_BOOL: 34463,
    // /** $zip found an unknown argument: {?} */
    // ZIP_UNKNOWN_ARGUMENT: 34464,
    // /** $zip requires at least one input array */
    // ZIP_REQUIRES_INPUT_ARRAY: 34465,
    // /** cannot specify defaults unless useLongestLength is true */
    // CANNOT_SPECIFY_DEFAULTS: 34466,
    // /** defaults and inputs must have the same length */
    // DEFAULTS_INPUTS_MUST_LENGTH: 34467,
    // /** $zip found a non-array expression in input: {?} */
    // ZIP_ARRAY_EXPRESSION_INPUT: 34468,
    // /** string length could not be represented as an int. */
    // STRING_LENGTH_REPRESENTED: 34470,
    // /** $strLenCP requires a string argument, found: {?} */
    // STR_LEN_CP_REQUIRES_STRING_ARGUMENT: 34471,
    // /** string length could not be represented as an int. */
    // STRING_LENGTH_REPRESENTED_34472: 34472,
    // /** $strLenBytes requires a string argument, found: {?} */
    // STR_LEN_BYTES_REQUIRES_STRING_ARGUMENT: 34473,
    // /** $switch requires an object as an argument, found: {?} */
    // SWITCH_REQUIRES_OBJECT_ARGUMENT: 40060,
    // /** $switch expected an array for 'branches', found: {?} */
    // SWITCH_ARRAY_BRANCHES: 40061,
    // /** $switch expected each branch to be an object, found: {?} */
    // SWITCH_BRANCH_OBJECT: 40062,
    // /** $switch found an unknown argument to a branch: {?} */
    // SWITCH_UNKNOWN_ARGUMENT_BRANCH: 40063,
    // /** $switch requires each branch have a 'case' expression */
    // SWITCH_REQUIRES_BRANCH_CASE: 40064,
    // /** $switch requires each branch have a 'then' expression. */
    // SWITCH_REQUIRES_BRANCH_EXPRESSION: 40065,
    // /** $switch could not find a matching branch for an input, and no default was specified. */
    // SWITCH_FIND_MATCHING_BRANCH_INPUT: 40066,
    // /** $switch found an unknown argument: {?} */
    // SWITCH_UNKNOWN_ARGUMENT: 40067,
    // /** $switch requires at least one branch */
    // SWITCH_REQUIRES_BRANCH: 40068,
    // /** cannot delete shardIdentity document while in --shardsvr mode */
    // CANNOT_DELETE_SHARDIDENTITY: 40070,
    // /** collection name has invalid type {?} */
    // INVALID_COLLECTION_NAME: 40073,
    // /** $reduce requires an object as an argument, found: {?} */
    // REDUCE_REQUIRES_OBJECT_ARGUMENT: 40075,
    // /** $reduce found an unknown argument: {?} */
    // REDUCE_UNKNOWN_ARGUMENT: 40076,
    // /** $reduce requires 'input' to be specified */
    // REDUCE_REQUIRES_INPUT: 40077,
    // /** $reduce requires 'initialValue' to be specified */
    // REDUCE_REQUIRES_INITIALVALUE: 40078,
    // /** $reduce requires 'in' to be specified */
    // REDUCE_REQUIRES: 40079,
    // /** $reduce requires that 'input' be an array, found: {?} */
    // REDUCE_REQUIRES_INPUT_ARRAY: 40080,
    // /** $in requires an array as a second argument, found: {?} */
    // IN_REQUIRES_ARRAY_SECOND: 40081,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40085: 40085,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40086: 40086,
    // /** $split requires a non-empty separator */
    // SPLIT_REQUIRES_EMPTY_SEPARATOR: 40087,
    // /** $indexOfArray requires an array as a first argument, found: {?} */
    // INDEX_OF_ARRAY_REQUIRES_ARRAY_FIRST: 40090,
    // /** $indexOfBytes requires a string as the first argument, found: {?} */
    // INDEX_OF_BYTES_REQUIRES_STRING_FIRST: 40091,
    // /** $indexOfBytes requires a string as the second argument, found: {?} */
    // INDEX_OF_BYTES_REQUIRES_STRING_SECOND: 40092,
    // /** $indexOfCP requires a string as the first argument, found: {?} */
    // INDEX_OF_CP_REQUIRES_STRING_FIRST: 40093,
    // /** $indexOfCP requires a string as the second argument, found: {?} */
    // INDEX_OF_CP_REQUIRES_STRING_SECOND: 40094,
    // /** $indexOfCP found bad UTF-8 in the input */
    // INDEX_OF_CP_BAD_INPUT: 40095,
    // /** {?}requires an integral {?}, found a value of type: {?}, with value: {?} */
    // REQUIRES_INTEGRAL_VALUE: 40096,
    // /** {?} requires a nonnegative {?}, found: {?} */
    // REQUIRES_NONNEGATIVE: 40097,
    // /** maxDepth must be numeric, found type: {?} */
    // MAXDEPTH_MUST_NUMERIC_TYPE: 40100,
    // /** maxDepth requires a nonnegative argument, found: {?} */
    // REQUIRES_MAXDEPTH_NONNEGATIVE: 40101,
    // /** maxDepth could not be represented as a long long: {?} */
    // MAXDEPTH_REPRESENTED_LONG: 40102,
    // /** expected string as argument for {?}, found: {?} */
    // STRING_ARGUMENT: 40103,
    // /** Unknown argument to $graphLookup: {?} */
    // GRAPH_LOOKUP_UNKNOWN_ARGUMENT: 40104,
    // /** $graphLookup requires 'from', 'as', 'startWith', 'connectFromField', and 'connectToField' to be specified. */
    // GRAPH_LOOKUP_REQUIRES_STARTWITH_CONNECTFROMFIELD: 40105,
    // /** Illegal attempt to set operation deadline within DBDirectClient */
    // ILLEGAL_ATTEMPT_OPERATION: 40119,
    // /** Illegal attempt to change operation deadline */
    // ILLEGAL_ATTEMPT_CHANGE: 40120,
    // /** {?} */
    // UNKNOWN_ERROR_40147: 40147,
    // /** {?} */
    // UNKNOWN_ERROR_40148: 40148,
    // /** the sortByCount field must be specified as a string or as an object */
    // SORTBYCOUNT_FIELD_MUST_STRING: 40149,
    // /** the count field must be a non-empty string */
    // EMPTY_COUNT_FIELD: 40156,
    // /** the count field must be a non-empty string */
    // EMPTY_COUNT_FIELD_40157: 40157,
    // /** the count field cannot be a $-prefixed path */
    // CANNOT_COUNT_FIELD: 40158,
    // /** the count field cannot contain a null byte */
    // CANNOT_COUNT_FIELD_40159: 40159,
    // /** the count field cannot contain '.' */
    // CANNOT_COUNT_FIELD_40160: 40160,
    // /** $collStats must take a nested object but found: {?} */
    // COLL_STATS_MUST_TAKE_NESTED_OBJECT: 40166,
    // /** the $facet specification must be a non-empty object, but found: {?} */
    // FACET_EMPTY_SPECIFICATION_MUST: 40169,
    // /** arguments to $facet must be arrays, {?} is type {?} */
    // FACET_ARGUMENTS_MUST_ARRAYS_TYPE: 40170,
    // /** elements of arrays in $facet spec must be non-empty objects, {?} argument contained an element of type {?}: {?} */
    // FACET_EMPTY_ELEMENTS_ARRAYS: 40171,
    // /** {?}{?}' and '{?}': {?} */
    // UNKNOWN_ERROR_40176: 40176,
    // /** {?}{?} fields in {?}, while parsing object {?} */
    // FIELDS_PARSING_OBJECT: 40181,
    // /** cannot use dotted field name '{?}' in a sub object: {?} */
    // CANNOT_DOTTED_FIELD: 40183,
    // /** restrictSearchWithMatch must be an object, found {?} */
    // RESTRICTSEARCHWITHMATCH_MUST_OBJECT: 40185,
    // /** {?}{?}. */
    // UNKNOWN_ERROR_40191: 40191,
    // /** The $bucket 'boundaries' field must have at least 2 values, but found {?} value(s). */
    // BUCKET_BOUNDARIES_FIELD_MUST_VALUES: 40192,
    // /** {?}{?} and {?}. */
    // UNKNOWN_ERROR_40193: 40193,
    // /** The 'boundaries' option to $bucket must be sorted, but elements {?}{?} and {?} are not in ascending order ({?} is not less than {?}). */
    // BUCKET_BOUNDARIES_OPTION_MUST_SORTED: 40194,
    // /** The $bucket 'default' field must be a constant expression, but found: {?}. */
    // BUCKET_DEFAULT_FIELD_MUST_CONSTANT: 40195,
    // /** The $bucket 'output' field must be an object, but found type: {?}. */
    // BUCKET_OUTPUT_FIELD_MUST_OBJECT: 40196,
    // /** Unrecognized option to $bucket: {?}. */
    // BUCKET_UNRECOGNIZED_OPTION: 40197,
    // /** $bucket requires 'groupBy' and 'boundaries' to be specified. */
    // BUCKET_REQUIRES_GROUPBY_BOUNDARIES: 40198,
    // /** The $bucket 'boundaries' field must be an array, but found type: {?}. */
    // BUCKET_BOUNDARIES_FIELD_MUST_ARRAY: 40200,
    // /** Argument to $bucket stage must be an object, but found type: {?}. */
    // BUCKET_ARGUMENT_STAGE_MUST_OBJECT: 40201,
    // /** {?}{?}. */
    // UNKNOWN_ERROR_40202: 40202,
    // /** query requires {?} metadata, but it is not available */
    // REQUIRES_QUERY_METADATA: 40218,
    // /** expected an object as specification for {?} stage, got {?} */
    // OBJECT_SPECIFICATION_STAGE: 40229,
    // /** The field '{?}' must be an accumulator object */
    // FIELD_MUST_ACCUMULATOR_OBJECT: 40234,
    // /** The field name '{?}' cannot contain '.' */
    // CANNOT_FIELD_NAME: 40235,
    // /** The field name '{?}' cannot be an operator name */
    // CANNOT_FIELD_NAME_40236: 40236,
    // /** The {?} accumulator is a unary operator */
    // ACCUMULATOR_UNARY_OPERATOR: 40237,
    // /** The field '{?}' must specify one accumulator: {?} */
    // FIELD_MUST_SPECIFY_ACCUMULATOR: 40238,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40239: 40239,
    // /** The argument to $bucketAuto must be an object, but found type: {?} */
    // BUCKET_AUTO_ARGUMENT_MUST_OBJECT_TYPE: 40240,
    // /** The $bucketAuto 'buckets' field must be a numeric value, but found type: {?} */
    // BUCKET_AUTO_BUCKETS_FIELD_MUST_NUMERIC: 40241,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40242: 40242,
    // /** The $bucketAuto 'buckets' field must be greater than 0, but found: {?} */
    // BUCKET_AUTO_BUCKETS_FIELD_MUST_GREATER: 40243,
    // /** The $bucketAuto 'output' field must be an object, but found type: {?} */
    // BUCKET_AUTO_OUTPUT_FIELD_MUST_OBJECT: 40244,
    // /** Unrecognized option to $bucketAuto: {?} */
    // BUCKET_AUTO_UNRECOGNIZED_OPTION: 40245,
    // /** $bucketAuto requires 'groupBy' and 'buckets' to be specified */
    // BUCKET_AUTO_REQUIRES_GROUPBY_BUCKETS: 40246,
    // /** command response expected to have a 'resolvedView' field */
    // COMMAND_RESPONSE_RESOLVEDVIEW_FIELD: 40248,
    // /** resolvedView must be an object */
    // RESOLVEDVIEW_MUST_OBJECT: 40249,
    // /** View definition must have 'ns' field of type string */
    // VIEW_DEFINITION_MUST_FIELD: 40250,
    // /** View definition must have 'pipeline' field of type array */
    // VIEW_DEFINITION_MUST_PIPELINE: 40251,
    // /** Unknown rounding granularity '{?}' */
    // UNKNOWN_ROUNDING_GRANULARITY: 40257,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40258: 40258,
    // /** $bucketAuto can specify a 'granularity' with numeric boundaries only, but found a NaN */
    // BUCKET_AUTO_SPECIFY_GRANULARITY_NUMERIC_BOUNDARIES: 40259,
    // /** The $bucketAuto 'granularity' field must be a string, but found type: {?} */
    // BUCKET_AUTO_GRANULARITY_FIELD_MUST_STRING: 40261,
    // /** A granularity rounder can only round numeric values, but found type: {?} */
    // GRANULARITY_ROUNDER_ROUND_NUMERIC: 40262,
    // /** A granularity rounder cannot round NaN */
    // CANNOT_GRANULARITY_ROUNDER: 40263,
    // /** A granularity rounder can only round numeric values, but found type: {?} */
    // GRANULARITY_ROUNDER_ROUND_NUMERIC_40265: 40265,
    // /** A granularity rounder cannot round NaN */
    // CANNOT_GRANULARITY_ROUNDER_40266: 40266,
    // /** A granularity rounder can only round non-negative numbers */
    // GRANULARITY_ROUNDER_ROUND_NEGATIVE: 40267,
    // /** A granularity rounder can only round non-negative numbers */
    // GRANULARITY_ROUNDER_ROUND_NEGATIVE_40268: 40268,
    // /** Documents in the '{?}' namespace must contain an _id for de-duplication in $graphLookup */
    // GRAPH_LOOKUP_DOCUMENTS_NAMESPACE_MUST_CONTAIN: 40271,
    // /** {?} specification stage must be an object, got {?} */
    // SPECIFICATION_STAGE_MUST_OBJECT: 40272,
    // /** cannot delete config.version document while in --configsvr mode */
    // CANNOT_DELETE_CONFIG: 40302,
    // /** cannot drop config.version document while in --configsvr mode */
    // CANNOT_DROP_CONFIG: 40303,
    // /** need at least one consumer for a TeeBuffer */
    // NEED_CONSUMER_TEEBUFFER: 40309,
    // /** TeeBuffer requires a positive buffer size, was given {?} */
    // REQUIRES_TEEBUFFER_POSITIVE: 40310,
    // /** A pipeline stage specification object must contain exactly one field. */
    // PIPELINE_STAGE_SPECIFICATION_OBJECT_40323: 40323,
    // /** Unrecognized pipeline stage name: '{?}' */
    // UNRECOGNIZED_PIPELINE_STAGE: 40324,
    // /** Existing shard id does not match shard identity shard id */
    // EXISTING_SHARD_MATCH_SHARD: 40371,
    // /** Existing cluster id does not match shard identity cluster id */
    // EXISTING_CLUSTER_MATCH_SHARD: 40372,
    // /** Existing config server connection string is unexpectedly not for a replica set */
    // EXISTING_CONFIG_SERVER_CONNECTION: 40373,
    // /** $arrayToObject requires an array input, found: {?} */
    ARRAY_TO_OBJECT_REQUIRES_ARRAY: 40386,
    // /** $objectToArray requires a document input, found: {?} */
    OBJECT_TO_ARRAY_REQUIRES_DOCUMENT: 40390,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40391: 40391,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40392: 40392,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40393: 40393,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40394: 40394,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40395: 40395,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40396: 40396,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40397: 40397,
    // /** Unrecognised input type format for $arrayToObject: {?} */
    // ARRAY_TO_OBJECT_UNRECOGNISED_INPUT_TYPE_FORMAT: 40398,
    // /** $mergeObjects requires object inputs, but input {?} is of type {?} */
    // MERGE_OBJECTS_REQUIRES_OBJECT_INPUTS: 40400,
    // /** Undefined variable id: {?} */
    // UNDEFINED_VARIABLE_40434: 40434,
    // /** The {?} command does not support document sequences. */
    // COMMAND_SUPPORT_DOCUMENT_SEQUENCES: 40472,
    // /** {?} cannot be advanced beyond the maximum logical time value */
    // CANNOT_ADVANCED_BEYOND: 40482,
    // /** {?} cannot be advanced beyond the maximum logical time value */
    // CANNOT_ADVANCED_BEYOND_40483: 40483,
    // /** {?} cannot be advanced beyond its maximum value */
    // CANNOT_ADVANCED_BEYOND_40484: 40484,
    // /** unrecognized time zone identifier: \"{?}\" */
    // UNRECOGNIZED_TIME_ZONE: 40485,
    // /** $dateFromParts does not allow mixing natural dates with ISO dates */
    // DATE_FROM_PARTS_ALLOW_MIXING_NATURAL_DATES: 40489,
    // /** '{?}' must evaluate to an integer, found {?} with value {?} */
    // MUST_EVALUATE_INTEGER_VALUE: 40515,
    // /** $dateFromParts requires either 'year' or 'isoWeekYear' to be present */
    // DATE_FROM_PARTS_REQUIRES_YEAR_ISOWEEKYEAR: 40516,
    // /** timezone must evaluate to a string, found {?} */
    // TIMEZONE_MUST_EVALUATE_STRING: 40517,
    // /** Unrecognized argument to $dateFromParts: {?} */
    // DATE_FROM_PARTS_UNRECOGNIZED_ARGUMENT: 40518,
    // /** $dateFromParts only supports an object as its argument */
    // DATE_FROM_PARTS_SUPPORTS_OBJECT_ARGUMENT: 40519,
    // /** Unrecognized argument to $dateToParts: {?} */
    // DATE_TO_PARTS_UNRECOGNIZED_ARGUMENT: 40520,
    // /** iso8601 must evaluate to a bool, found {?} */
    // ISO8601_MUST_EVALUATE_BOOL: 40521,
    // /** Missing 'date' parameter to $dateToParts */
    // DATE_TO_PARTS_MISSING_DATE_PARAMETER: 40522,
    // /** 'year' must evaluate to an integer in the range {?} to {?}, found {?} */
    // YEAR_MUST_EVALUATE_INTEGER: 40523,
    // /** $dateToParts only supports an object as its argument */
    // DATE_TO_PARTS_SUPPORTS_OBJECT_ARGUMENT: 40524,
    // /** $dateFromParts does not allow mixing ISO dates with natural dates */
    // DATE_FROM_PARTS_ALLOW_MIXING_DATES_NATURAL: 40525,
    // /** {?}{?} collection has been manually deleted. */
    // COLLECTION_MANUALLY_DELETED: 40527,
    // /** Direct writes against {?} cannot be performed using a transaction or on a session. */
    // CANNOT_DIRECT_WRITES: 40528,
    // /** Entry field \"{?}\" should be {?}, found: {?} */
    // ENTRY_FIELD: 40532,
    // /** unrecognized option to {?}: \"{?}\" */
    // UNRECOGNIZED_OPTION: 40535,
    // /** {?} accepts exactly one argument if given an array, but was given {?} */
    // ACCEPTS_EXACTLY_ARGUMENT_ARRAY: 40536,
    // /** missing 'date' argument to {?}, provided: {?} */
    // MISSING_DATE_ARGUMENT: 40539,
    // /** $dateFromString only supports an object as an argument, found: {?} */
    // DATE_FROM_STRING_SUPPORTS_OBJECT_ARGUMENT: 40540,
    // /** Unrecognized argument to $dateFromString: {?} */
    // DATE_FROM_STRING_UNRECOGNIZED_ARGUMENT: 40541,
    // /** Missing 'dateString' parameter to $dateFromString */
    // DATE_FROM_STRING_MISSING_DATESTRING_PARAMETER: 40542,
    // /** The $changeStream stage is only supported on replica sets or mongos */
    // CHANGE_STREAM_STAGE_SUPPORTED_REPLICA_SETS: 40573,
    // /** failed to look up post image after change: expected \"{?}\" field to have type {?}, instead found type {?}: {?}, full object: {?} */
    // FAILED_LOOK_POST: 40578,
    // /** unexpected namespace during post image lookup: {?}, expected {?} */
    // UNEXPECTED_NAMESPACE_POST: 40579,
    // /** {?} is not allowed to be used within a $facet stage */
    // FACET_ALLOWED_USED_STAGE: 40600,
    // /** {?} can only be the final stage in the pipeline */
    // FINAL_STAGE_PIPELINE: 40601,
    // /** {?} is only valid as the first stage in a pipeline */
    // VALID_FIRST_STAGE_PIPELINE: 40602,
    // /** {?}{?} */
    // UNKNOWN_ERROR_40603: 40603,
    // /** findAndModify retry request: {?} is not compatible with previous write in the transaction of type: {?}, oplogTs: {?}, oplog: {?} */
    // FINDANDMODIFY_RETRY_REQUEST_COMPATIBLE: 40606,
    // /** findAndModify retry request: {?} is not compatible with previous write in the transaction of type: {?}, oplogTs: {?}, oplog: {?} */
    // FINDANDMODIFY_RETRY_REQUEST_COMPATIBLE_40608: 40608,
    // /** findAndModify retry request: {?} is not compatible with previous write in the transaction of type: {?}, oplogTs: {?}, oplog: {?} */
    // FINDANDMODIFY_RETRY_REQUEST_COMPATIBLE_40609: 40609,
    // /** findAndModify retry request: {?}{?}{?}, oplog: {?} */
    // FINDANDMODIFY_RETRY_REQUEST_OPLOG: 40611,
    // /** findAndModify retry request: {?}{?}{?}, oplog: {?} */
    // FINDANDMODIFY_RETRY_REQUEST_OPLOG_40612: 40612,
    // /** Cannot run dbCheck on {?} because it is not replicated */
    // CANNOT_DBCHECK_BECAUSE: 40619,
    // /** Unable to fetch oplog entry with opTime: {?} */
    // UNABLE_FETCH_OPLOG_ENTRY: 40620,
    // /** expected oplog with ts: {?} to not have {?} or {?} */
    // OPLOG: 40628,
    // /** expected oplog with ts: {?}: {?} to have session: {?} */
    // OPLOG_SESSION: 40629,
    // /** expected oplog with ts: {?}: {?} to have txnNumber: {?} */
    // OPLOG_TXNNUMBER: 40630,
    // /** expected oplog with opTime: {?}: {?} to have either {?} or {?} */
    // OPLOG_OPTIME: 40631,
    // /** Can't handle 2 pre/post image oplog in a row. Prevoius oplog {?}, oplog ts: {?}: {?} */
    // HANDLE_POST_IMAGE_OPLOG: 40632,
    // /** Failed to create new oplog entry for oplog with opTime: {?}: {?} */
    // FAILED_CREATE_OPLOG: 40633,
    // /** expected nested oplog entry with ts: {?} to have o2 field: {?} */
    // NESTED_OPLOG_ENTRY_FIELD: 40635,
    // /** {?}{?}, oplogTs: {?}, oplog: {?} */
    // OPLOGTS_OPLOG: 40638,
    // /** View definition 'collation' field must be an object */
    // VIEW_DEFINITION_COLLATION_FIELD: 40639,
    // /** {?} can only be run on router */
    // ROUTER: 40644,
    // /** invalid oversized resume token */
    // INVALID_OVERSIZED_RESUME: 40646,
    // /** Bad resume token: _data of missing or of wrong type. Expected string, got {?} */
    // BAD_MISSING_RESUME_TOKEN: 40647,
    // /** Bad resume token: _typeBits of wrong type {?} */
    // BAD_WRONG_RESUME_TOKEN: 40648,
    // /** invalid empty resume token */
    // INVALID_EMPTY_RESUME_TOKEN: 40649,
    // /** failCollectionUpdates failpoint enabled, namespace: {?}, update: {?} on document with {?} */
    // FAILCOLLECTIONUPDATES_FAILPOINT_ENABLED_NAMESPACE: 40654,
    // /** Invalid name {?} for UUID {?} */
    // INVALID_NAME_UUID: 40655,
    // /** rollback detected, rollbackId was {?} but is now {?} */
    // ROLLBACK_DETECTED_ROLLBACKID: 40656,
    // /** removing FeatureCompatibilityVersion document is not allowed */
    // REMOVING_FEATURECOMPATIBILITYVERSION_DOCUMENT_ALLOWED: 40670,
    // /** Failed to fetch _id index for {?} */
    // FAILED_FETCH_INDEX: 40672,
    // /** Only one type of resume option is allowed, but multiple were found */
    // TYPE_RESUME_OPTION_ALLOWED: 40674,
    // /** $dateFromString requires that 'format' be a string, found: {?} with value {?} */
    // DATE_FROM_STRING_REQUIRES_FORMAT_STRING: 40684,
    // /** autoIndexId:false is not allowed for collection {?} because it can be replicated */
    // AUTOINDEXID_FALSE_ALLOWED_COLLECTION: 50001,
    // /** Mismatch between verbosity passed to serialize() and expression context verbosity */
    // MISMATCH_VERBOSITY_PASSED: 50660,
    // /** credential document {?} failed validation */
    // FAILED_CREDENTIAL_DOCUMENT: 50684,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT_50694: 50694,
    // /** {?} requires an 'input' field */
    // REQUIRES_INPUT_FIELD: 50695,
    // /** {?} only supports an object as an argument, found {?} */
    // SUPPORTS_OBJECT_ARGUMENT: 50696,
    // /** {?} requires its input to be a string, got {?} (of type {?}) instead. */
    // REQUIRES_INPUT_STRING: 50699,
    // /** {?} requires 'chars' to be a string, got {?} (of type {?}) instead. */
    // REQUIRES_CHARS_STRING: 50700,
    // /** dropping the admin database is not allowed. */
    // DROPPING_ADMIN_DATABASE_ALLOWED: 50714,
    // /** dropping the server configuration collection (admin.system.version) is not allowed. */
    // DROPPING_SERVER_CONFIGURATION_COLLECTION: 50715,
    // /** {?} requires a single argument, got {?} */
    // REQUIRES_SINGLE_ARGUMENT: 50723,
    // /** Cannot run getMore on cursor {?}, which was not created in a session, in session {?} */
    // CANNOT_GETMORE_CURSOR_50736: 50736,
    // /** Cannot run getMore on cursor {?}, which was created in session {?}, without an lsid */
    // CANNOT_GETMORE_CURSOR_50737: 50737,
    // /** Cannot run getMore on cursor {?}, which was created in session {?}, in session {?} */
    // CANNOT_GETMORE_CURSOR_50738: 50738,
    // /** Cannot run getMore on cursor {?}, which was not created in a transaction, in transaction {?} */
    // CANNOT_GETMORE_CURSOR_50739: 50739,
    // /** Cannot run getMore on cursor {?}, which was created in transaction {?}, without a txnNumber */
    // CANNOT_GETMORE_CURSOR_50740: 50740,
    // /** Cannot run getMore on cursor {?}, which was created in transaction {?}, in transaction {?} */
    // CANNOT_GETMORE_CURSOR_50741: 50741,
    // /** {?}:  starting index must be non-negative (got: {?}) */
    // STARTING_INDEX_MUST_NEGATIVE: 50752,
    // /** Unexpected resume token with a eventIdentifier but no UUID */
    // UNEXPECTED_RESUME_TOKEN: 50788,
    // /** Cannot write to unreplicated collection {?} within a transaction. */
    // CANNOT_WRITE_UNREPLICATED: 50790,
    // /** Cannot write to system collection {?} within a transaction. */
    // CANNOT_WRITE_SYSTEM: 50791,
    // /** Resume Token does not contain txnOpIndex */
    // RESUME_TOKEN_CONTAIN_TXNOPINDEX: 50793,
    // /** Invalid Resume Token: txnOpIndex should be non-negative */
    // INVALID_RESUME_TOKEN: 50794,
    // /** Invalid Resume Token: only supports version 0, 1 and 2 */
    // INVALID_RESUME_TOKEN_50795: 50795,
    // /** Resume Token does not contain version */
    // RESUME_TOKEN_CONTAIN_VERSION: 50796,
    // /** $changeStream stage expects a document as argument */
    // CHANGE_STREAM_STAGE_EXPECTS_DOCUMENT_ARGUMENT: 50808,
    // /** First operand of $indexOfArray must be an array. First argument is of type: {?} */
    // INDEX_OF_ARRAY_FIRST_OPERAND_MUST_ARRAY: 50809,
    // /** {?}{?} found. */
    // UNKNOWN_ERROR_50847: 50847,
    // /** {?} */
    // UNKNOWN_ERROR_50848: 50848,
    // /** {?}{?} found. */
    // UNKNOWN_ERROR_50849: 50849,
    // /** Simulated network error */
    // SIMULATED_NETWORK_ERROR: 50852,
    // /** Invalid resume token: wrong type for version */
    // INVALID_WRONG_RESUME_TOKEN: 50854,
    // /** Resume Token txnOpIndex is not an integer */
    // RESUME_TOKEN_TXNOPINDEX_INTEGER: 50855,
    // /** $geoNear no longer supports the 'start' argument. */
    // GEO_NEAR_LONGER_SUPPORTS_START_ARGUMENT: 50856,
    // /** $geoNear no longer supports the 'num' parameter. Use a $limit stage instead. */
    // GEO_NEAR_LIMIT_LONGER_SUPPORTS_PARAMETER: 50857,
    // /** $geoNear no longer supports the 'limit' parameter. Use a $limit stage instead. */
    // GEO_NEAR_LIMIT_LONGER_SUPPORTS_PARAMETER_50858: 50858,
    // /** Do not specify both 'resumeAfter' and 'startAfter' in a $changeStream stage */
    // CHANGE_STREAM_SPECIFY_RESUMEAFTER_STARTAFTER_STAGE: 50865,
    // /** Resume Token fromInvalidate is not a boolean. */
    // RESUME_TOKEN_FROMINVALIDATE_BOOLEAN: 50870,
    // /** Resume Token does not contain fromInvalidate */
    // RESUME_TOKEN_CONTAIN_FROMINVALIDATE: 50872,
    // /** Cannot run addShard on a node started without --shardsvr */
    // CANNOT_ADDSHARD_NODE: 50876,
    // /** rollback detected, rollbackId was {?} but is now {?} */
    // ROLLBACK_DETECTED_ROLLBACKID_50881: 50881,
    // /** It is illegal to provide a txnNumber for this command */
    // ILLEGAL_PROVIDE_TXNNUMBER: 50889,
    // /** Invalid to set operation session info in a direct client */
    // INVALID_OPERATION_SESSION: 50891,
    // /** Exchange range boundaries are not in ascending order. */
    // EXCHANGE_RANGE_BOUNDARIES_ASCENDING: 50893,
    // /** Exchange consumers ids are invalid. */
    // INVALID_EXCHANGE_CONSUMERS: 50894,
    // /** Exchange key description is invalid: {?} */
    // INVALID_EXCHANGE_DESCRIPTION: 50895,
    // /** Exchange key description is invalid: {?} */
    // INVALID_EXCHANGE_DESCRIPTION_50896: 50896,
    // /** Exchange key description is invalid: {?} */
    // INVALID_EXCHANGE_DESCRIPTION_50897: 50897,
    // /** Exchange hash and order keys cannot be mixed together: {?} */
    // CANNOT_EXCHANGE_HASH: 50898,
    // /** Exchange boundaries must not be specified. */
    // EXCHANGE_BOUNDARIES_MUST: 50899,
    // /** Exchange boundaries do not match number of consumers. */
    // EXCHANGE_BOUNDARIES_MATCH_NUMBER: 50900,
    // /** Exchange must have at least one consumer */
    // EXCHANGE_MUST_CONSUMER: 50901,
    // /** Cannot start a transaction with session id {?} and transaction number {?} because a transaction with the same transaction number is in state {?} */
    // CANNOT_START_TRANSACTION: 50911,
    // /** collection '{?}' does not exist */
    // COLLECTION_EXIST: 50933,
    // /** Specified number of exchange consumers ({?}) exceeds the maximum allowable amount ({?}). */
    // NUMBER_EXCHANGE_CONSUMERS_EXCEEDS: 50950,
    // /** Specified exchange buffer size ({?}) exceeds the maximum allowable amount ({?}). */
    // EXCHANGE_BUFFER_SIZE_EXCEEDS: 50951,
    // /** Backup cursors are an enterprise only feature. */
    // BACKUP_CURSORS_ENTERPRISE_FEATURE: 50955,
    // /** Backup cursors are an enterprise only feature. */
    // BACKUP_CURSORS_ENTERPRISE_FEATURE_50956: 50956,
    // /** Exchange lower bound must be the minkey. */
    // EXCHANGE_LOWER_BOUND_MUST: 50958,
    // /** Exchange upper bound must be the maxkey. */
    // EXCHANGE_UPPER_BOUND_MUST: 50959,
    // /** Exchange range boundaries are not valid */
    // EXCHANGE_RANGE_BOUNDARIES_VALID: 50960,
    // /** lockTarget is not a valid namespace */
    // LOCKTARGET_VALID_NAMESPACE: 50961,
    // /** lockTarget is not a valid namespace */
    // LOCKTARGET_VALID_NAMESPACE_50962: 50962,
    // /** The key pattern {?} must have at least one key */
    // PATTERN_MUST: 50967,
    // /** trigger rollback after the index update */
    // TRIGGER_ROLLBACK_INDEX_UPDATE: 50970,
    // /** abortTransaction is only used internally by secondaries. */
    // ABORTTRANSACTION_USED_INTERNALLY_SECONDARIES: 50972,
    // /** Chunk has no history entries */
    // CHUNK_HISTORY_ENTRIES: 50978,
    // /** Security key file {?} does not contain any valid keys */
    // SECURITY_FILE_CONTAIN_VALID: 50981,
    // /** could not restore cursor for FETCH stage */
    // RESTORE_CURSOR_FETCH_STAGE: 50982,
    // /** Could not find any shard documents */
    // FIND_SHARD_DOCUMENTS: 50986,
    // /** commitTransaction is only used internally by secondaries. */
    // COMMITTRANSACTION_USED_INTERNALLY_SECONDARIES: 50987,
    // /** cannot apply {?} to {?}, value must be in {?}{?},{?}{?} */
    // CANNOT_APPLY_VALUE: 50989,
    // /** could not restore cursor for MULTI_ITERATOR stage */
    // RESTORE_CURSOR_MULTI_ITERATOR: 50991,
    // /** Unexpected attempt to consult catalog cache on a shard server */
    // UNEXPECTED_ATTEMPT_CONSULT: 50997,
    // /** {?} contains multiple fields named {?} */
    // CONTAINS_MULTIPLE_FIELDS_NAMED: 51001,
    // /** collection info contains duplicate collection name '{?}': {?} */
    // DUPLICATE_COLLECTION_INFO: 51005,
    // /** Backup cursors are an enterprise only feature. */
    // BACKUP_CURSORS_ENTERPRISE_FEATURE_51010: 51010,
    // /** Unexpected check of routing table */
    // UNEXPECTED_CHECK_ROUTING: 51019,
    // /** unexpected request to consult sharding catalog on non-shardsvr */
    // UNEXPECTED_REQUEST_CONSULT: 51020,
    // /** While attempting to write participant list {?} for {?}{?}{?}, found document with a different participant list: {?} */
    // ATTEMPTING_WRITE_PARTICIPANT_LIST: 51025,
    // /** While attempting to write decision {?} for{?}{?}{?}{?}{?} */
    // ATTEMPTING_WRITE_DECISION: 51026,
    // /** While attempting to delete document for {?}{?}{?}{?}{?} */
    // ATTEMPTING_DELETE_DOCUMENT: 51027,
    // /** Cannot extend backup cursor with in-memory mode. */
    // CANNOT_EXTEND_BACKUP: 51033,
    // /** Cannot open backup cursor with in-memory mode. */
    // CANNOT_OPEN_BACKUP_51034: 51034,
    // /** {?} only supports numeric types, not {?} */
    // SUPPORTS_NUMERIC_TYPES_51044: 51044,
    // /** {?} only supports numeric types, not {?} */
    // SUPPORTS_NUMERIC_TYPES_51045: 51045,
    // /** {?} is not allowed within a $lookup's sub-pipeline */
    // LOOKUP_ALLOWED_PIPELINE: 51047,
    // /** Error reading file {?}: {?} */
    // ERROR_READING_FILE_51049: 51049,
    // /** Projections with a positional operator require a matcher */
    // PROJECTIONS_POSITIONAL_OPERATOR_REQUIRE: 51050,
    // /** Resume Token does not contain tokenType */
    // RESUME_TOKEN_CONTAIN_TOKENTYPE: 51055,
    // /** Resume Token tokenType is not an int. */
    // RESUME_TOKEN_TOKENTYPE: 51056,
    // /** Token type {?} not recognized */
    // TOKEN_TYPE_RECOGNIZED: 51057,
    // /** JSONPointer cannot contain unescaped ~ character */
    // CANNOT_JSONPOINTER_CONTAIN: 51063,
    // /** Empty JSONPointers are not supported */
    // EMPTY_JSONPOINTERS_SUPPORTED: 51064,
    // /** JSONPointer must start with a '/' */
    // JSONPOINTER_MUST_START: 51065,
    // /** Modifications to system.views must take an exclusive lock */
    // MODIFICATIONS_SYSTEM_VIEWS_MUST: 51070,
    // /** invalid conversion from Decimal128 result in {?} resulting from arguments: [{?}, {?}] */
    // INVALID_CONVERSION_DECIMAL128: 51080,
    // /** {?} only supports numeric types, not {?} */
    // SUPPORTS_NUMERIC_TYPES_51081: 51081,
    // /** precision argument to  {?} must be a integral value */
    // PRECISION_ARGUMENT_MUST_INTEGRAL: 51082,
    // /** cannot apply {?} with precision value {?} value must be in [-20, 100] */
    // CANNOT_APPLY_PRECISION: 51083,
    // /** Encryption schema 'keyId' array elements must have BinData type UUID, found {?} */
    // ENCRYPTION_SCHEMA_KEYID_ARRAY: 51084,
    // /** Expected either string or array of UUID for EncryptSchemaKeyId, found {?} */
    // STRING_ARRAY_UUID_ENCRYPTSCHEMAKEYID: 51085,
    // /** Encryption schema 'keyId' array elements must have type BinData, found {?} */
    // ENCRYPTION_SCHEMA_KEYID_ARRAY_51088: 51088,
    // /** Regular expression is invalid: {?} */
    // INVALID_REGULAR_EXPRESSION: 51091,
    // /** {?} expects an object of named arguments but found: {?} */
    // EXPECTS_OBJECT_NAMED_ARGUMENTS: 51103,
    // /** {?} needs 'input' to be of type string */
    // NEEDS_INPUT_TYPE_STRING: 51104,
    // /** {?} needs 'regex' to be of type string or regex */
    // NEEDS_REGEX_TYPE_STRING: 51105,
    // /** {?} needs 'options' to be of type string */
    // NEEDS_OPTIONS_TYPE_STRING: 51106,
    // /** {?}: found regex option(s) specified in both 'regex' and 'option' fields */
    // REGEX_OPTION_REGEX_OPTION: 51107,
    // /** {?}: regular expression cannot contain an embedded null byte */
    // CANNOT_REGULAR_EXPRESSION: 51109,
    // /** {?}: regular expression options cannot contain an embedded null byte */
    // CANNOT_REGULAR_EXPRESSION_51110: 51110,
    // /** Invalid Regex in {?}: {?} */
    // INVALID_REGEX: 51111,
    // /** Unexpected target chunk version specified */
    // UNEXPECTED_TARGET_CHUNK: 51123,
    // /** Expected fields to be provided from router */
    // FIELDS_ROUTER: 51124,
    // /** prepare applyOps oplog entry is only used internally by secondaries. */
    // PREPARE_APPLYOPS_OPLOG_ENTRY: 51145,
    // /** {?}: the size of buffer to store output exceeded the 64MB limit */
    // EXCEEDED_SIZE_BUFFER: 51151,
    // /** Only one of 'secs' and 'seconds' may be specified */
    // SECS_SECONDS: 51153,
    // /** 'seconds' must be a number. */
    // SECONDS_MUST_NUMBER: 51154,
    // /** Error occurred while executing the regular expression in {?}. Result code: {?} */
    // ERROR_OCCURRED_EXECUTING_REGULAR: 51156,
    // /** Malformed explain response received from shard {?}: {?} */
    // MALFORMED_EXPLAIN_RESPONSE_RECEIVED: 51157,
    // /** Participant list contains duplicate shard {?} */
    // DUPLICATE_PARTICIPANT_LIST: 51162,
    // /** Walk did not proceed in expected order! */
    // WALK_PROCEED_ORDER: 51163,
    // /** Received unexpected 'targetCollectionPlacementVersion' on mongos */
    // UNEXPECTED_RECEIVED_TARGETCOLLECTIONPLACEMENTVERSION: 51179,
    // /** Cannot find index to verify that join fields will be unique */
    // CANNOT_FIND_INDEX: 51183,
    // /** Cannot find index to verify that join fields will be unique */
    // CANNOT_FIND_INDEX_51190: 51190,
    // /** Constant values may only be specified for pipeline updates */
    // CONSTANT_VALUES_PIPELINE_UPDATES: 51198,
    // /** Metadata to initialize an aggregation pipeline associated with {?} is missing. */
    // MISSING_METADATA_INITIALIZE: 51213,
    // /** positional operator '.$' couldn't find a matching element in the array */
    // POSITIONAL_OPERATOR_COULDN_FIND: 51246,
    // /** positional operator '.$' element mismatch */
    // MISMATCH_POSITIONAL_OPERATOR: 51247,
    // /** Unable to locate chunk {?} from ns: {?} */
    // UNABLE_LOCATE_CHUNK: 51262,
    // /** failed to clear jumbo flag due to {?} not matching any existing chunks */
    // FAILED_CLEAR_JUMBO: 51263,
    // /** Chunk name is not set */
    // CHUNK_NAME: 51264,
    // /** hangAndFailAfterCreateCollectionReservesOpTime fail point enabled */
    // HANGANDFAILAFTERCREATECOLLECTIONRESERVESOPTIME_FAIL_POINT_ENABLED: 51267,
    // /** hangAndFailUnpreparedCommitAfterReservingOplogSlot fail point enabled */
    // HANGANDFAILUNPREPAREDCOMMITAFTERRESERVINGOPLOGSLOT_FAIL_POINT_ENABLED: 51268,
    // /** hangAndFailAfterDocumentInsertsReserveOpTimes fail point enabled */
    // HANGANDFAILAFTERDOCUMENTINSERTSRESERVEOPTIMES_FAIL_POINT_ENABLED: 51269,
    // /** Invalid empty sub-projection: {?} */
    // INVALID_EMPTY_PROJECTION: 51270,
    // /** projection specification must have at least one field */
    // PROJECTION_SPECIFICATION_MUST_FIELD: 51272,
    // /** 'let' may not define a value for the reserved 'new' variable other than '$$ROOT' */
    // ROOT_DEFINE_VALUE_RESERVED_VARIABLE: 51273,
    // /** $binarySize requires a string or BinData argument, found: {?} */
    // BINARY_SIZE_REQUIRES_STRING_BINDATA: 51276,
    // /** '{?}' is not supported on standalone nodes. */
    // SUPPORTED_STANDALONE_NODES: 51300,
    // /** '{?}' is not supported on shard nodes. */
    // SUPPORTED_SHARD_NODES: 51301,
    // /** {?} requires 'replacement' to be specified */
    // REQUIRES_REPLACEMENT: 51747,
    // /** {?} requires 'find' to be specified */
    // REQUIRES_FIND: 51748,
    // /** {?} requires 'input' to be specified */
    // REQUIRES_INPUT: 51749,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT_51750: 51750,
    // /** {?} requires an object as an argument, found: {?} */
    // REQUIRES_OBJECT_ARGUMENT_51751: 51751,
    // /** Fast-path projection mode or fall back to default expected */
    // FAST_PATH_PROJECTION_MODE: 51752,
    // /** Default projection mode expected */
    // DEFAULT_PROJECTION_MODE: 51753,
    // /** An isMaster or hello request with exhaust must specify 'maxAwaitTimeMS' */
    // ISMASTER_HELLO_REQUEST_EXHAUST: 51756,
    // /** Received a topology version with counter: {?} which is greater than the mongos topology version counter: {?} */
    // RECEIVED_TOPOLOGY_VERSION_COUNTER_51761: 51761,
    // /** Failing read/write concern persisted defaults lookup because of fail point */
    // FAILING_READ_WRITE_CONCERN: 51762,
    // /** Received a topology version with counter: {?} which is greater than the server topology version counter: {?} */
    // RECEIVED_TOPOLOGY_VERSION_COUNTER_51764: 51764,
    // /** hello.{?} unknown command: {?} */
    // UNKNOWN_HELLO_COMMAND: 51769,
    // /** Can't extract geo keys: {?} */
    // EXTRACT_KEYS_167551: 167551,
    // /** Unable to generate keys for (likely malformed) geometry */
    // UNABLE_GENERATE_KEYS_LIKELY_167561: 167561,
    // /** Time-series collections '2dsphere' indexes only support point data */
    // TIME_SERIES_COLLECTIONS_2DSPHERE: 183493,
    // /** Can't extract geo keys: {?} */
    // EXTRACT_KEYS_183934: 183934,
    // /** $filter: limit must be represented as a 32-bit integral value: {?} */
    // FILTER_LIMIT_MUST_REPRESENTED_INTEGRAL: 327391,
    // /** $filter: limit must be greater than 0: {?} */
    // FILTER_LIMIT_MUST_GREATER: 327392,
    // /** Subdiffs should be objects, got {?} */
    // SUBDIFFS_OBJECTS: 470510,
    // /** {?}{?} */
    // UNKNOWN_ERROR_605001: 605001,
    // /** SetVariableFromSubPipeline only allows setting $$SEARCH_META variable,  '$${?}' is not allowed. */
    // SEARCH_SETVARIABLEFROMSUBPIPELINE_ALLOWS_SETTING_META: 625290,
    // /** SetVariableFromSubPipeline only allows setting $$SEARCH_META variable,  {?} is not allowed. */
    // SEARCH_SETVARIABLEFROMSUBPIPELINE_ALLOWS_SETTING_META_625291: 625291,
    // /** No document returned from $SetVariableFromSubPipeline subpipeline */
    // SET_VARIABLE_FROM_SUB_PIPELINE_DOCUMENT_SUBPIPELINE: 625296,
    // /** Changed chunk {?} doesn't have version that's greater or equal than that of the collection {?} */
    // CHANGED_CHUNK_DOESN_VERSION: 626840,
    // /** Write errors must not be empty */
    // EMPTY_WRITE_ERRORS: 633310,
    // /** Constant value type is not double */
    // CONSTANT_VALUE_TYPE_DOUBLE: 673180,
    // /** Constant value type is not Decimal128 */
    // CONSTANT_VALUE_TYPE_DECIMAL128: 673181,
    // /** The 'n' argument to $topN must be an integer, but was of type: {?} */
    // TOP_N_ARGUMENT_MUST_INTEGER_TYPE: 721210,
    // /** The input argument to $topN must be an array, but was of type: {?} */
    // TOP_N_INPUT_ARGUMENT_MUST_ARRAY: 721211,
    // /** $topN requires 'n' to be non-negative */
    // TOP_N_REQUIRES_NEGATIVE: 721212,
    // /** The input argument to $top must be an array, but was of type: {?} */
    // TOP_INPUT_ARGUMENT_MUST_ARRAY: 721213,
    // /** The 'n' argument to $bottomN must be an integer, but was of type: {?} */
    // BOTTOM_N_ARGUMENT_MUST_INTEGER_TYPE: 721214,
    // /** The input argument to $bottomN must be an array, but was of type: {?} */
    // BOTTOM_N_INPUT_ARGUMENT_MUST_ARRAY: 721215,
    // /** $bottomN requires 'n' to be non-negative */
    // BOTTOM_N_REQUIRES_NEGATIVE: 721216,
    // /** The input argument to $bottom must be an array, but was of type: {?} */
    // BOTTOM_INPUT_ARGUMENT_MUST_ARRAY: 721217,
    // /** $topN requires an object as an argument, found: {?} */
    // TOP_N_REQUIRES_OBJECT_ARGUMENT: 721218,
    // /** $topN found an unknown argument: {?} */
    // TOP_N_UNKNOWN_ARGUMENT: 721219,
    // /** Invalid shard key for time-series collection: {?}. Shard keys{?} */
    // INVALID_SHARD_TIME: 880031,
    // /** resolvedView must be an object */
    // RESOLVEDVIEW_MUST_OBJECT_936370: 936370,
    // /** {?}{?}' should contain at most one document but it contains {?} documents . */
    // CONTAIN_DOCUMENT_CONTAINS_DOCUMENTS: 1003561,
    // /** {?}{?}' does not have the field 'documentsCopied' set. */
    // FIELD_DOCUMENTSCOPIED: 1003562,
    // /** 'phase' field must be present on shards */
    // PHASE_FIELD_MUST_PRESENT: 1034131,
    // /** setQuerySetting command cannot be used with rawData enabled */
    // CANNOT_SETQUERYSETTING_COMMAND: 1064380,
    // /** Field name too large */
    // FIELD_NAME_LARGE: 1065170,
    // /** $ifNull needs at least two arguments, had: {?} */
    // IF_NULL_NEEDS_ARGUMENTS: 1257300,
    // /** Must not specify 'query' for $geoNear on a time-series collection; use $match instead */
    // GEO_NEAR_MATCH_MUST_SPECIFY_QUERY: 1938439,
    // /** DBDirectClient should not authenticate */
    // DBDIRECTCLIENT_AUTHENTICATE: 2625701,
    // /** $sortArray requires an object as an argument, found: {?} */
    // SORT_ARRAY_REQUIRES_OBJECT_ARGUMENT: 2942500,
    // /** $sortArray found an unknown argument: {?} */
    // SORT_ARRAY_UNKNOWN_ARGUMENT: 2942501,
    // /** $sortArray requires 'input' to be specified */
    // SORT_ARRAY_REQUIRES_INPUT: 2942502,
    // /** $sortArray requires 'sortBy' to be specified */
    // SORT_ARRAY_REQUIRES_SORTBY: 2942503,
    // /** The input argument to $sortArray must be an array, but was of type: {?} */
    // SORT_ARRAY_INPUT_ARGUMENT_MUST_ARRAY: 2942504,
    // /** The $sort element value must be either 1 or -1 */
    // SORT_ELEMENT_VALUE_MUST: 2942506,
    // /** $rand not allowed inside collection validators */
    // RAND_ALLOWED_INSIDE_COLLECTION_VALIDATORS: 3040500,
    // /** $rand does not currently accept arguments */
    // RAND_ACCEPT_ARGUMENTS: 3040501,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT_3041701: 3041701,
    // /** {?} requires 'field' to be specified */
    // REQUIRES_FIELD: 3041702,
    // /** {?} requires 'input' to be specified */
    // REQUIRES_INPUT_3041703: 3041703,
    // /** {?}{?}{?} */
    // UNKNOWN_ERROR_3041704: 3041704,
    // /** In $convert, 'base' argument is not an integer */
    // CONVERT_BASE_ARGUMENT_INTEGER: 3501300,
    // /** In $convert, 'base' argument is not a valid base */
    // CONVERT_BASE_ARGUMENT_VALID_BASE: 3501301,
    // /** Cannot run $lookup with a sharded foreign collection in a transaction */
    // LOOKUP_CANNOT_SHARDED_FOREIGN: 3904800,
    // /** Cannot run $graphLookup with a sharded foreign collection in a transaction */
    // GRAPH_LOOKUP_CANNOT_SHARDED_FOREIGN: 3904801,
    // /** $eq should have 2 children */
    // EQ_CHILDREN: 4125200,
    // /** {?} only supports an object as its argument */
    // SUPPORTS_OBJECT_ARGUMENT_4161100: 4161100,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT_4161101: 4161101,
    // /** {?} requires 'field' to be specified */
    // REQUIRES_FIELD_4161102: 4161102,
    // /** {?} requires 'value' to be specified */
    // REQUIRES_VALUE: 4161103,
    // /** {?} requires 'input' to evaluate to type Object */
    // REQUIRES_INPUT_EVALUATE: 4161105,
    // /** {?}{?} */
    // UNKNOWN_ERROR_4161106: 4161106,
    // /** {?}{?}{?} */
    // UNKNOWN_ERROR_4161107: 4161107,
    // /** '{?}{?}{?}'}? */
    // UNKNOWN_ERROR_4161108: 4161108,
    // /** {?} requires 'input' to be specified */
    // REQUIRES_INPUT_4161109: 4161109,
    // /** In $convert, numeric 'subtype' argument is not an integer */
    // CONVERT_NUMERIC_SUBTYPE_ARGUMENT_INTEGER: 4341106,
    // /** {?}{?} */
    // UNKNOWN_ERROR_4341107: 4341107,
    // /** For BinData, $convert's 'subtype' argument must be a number, but is {?} */
    // CONVERT_BINDATA_SUBTYPE_ARGUMENT_MUST: 4341108,
    // /** $convert requires that 'format' be a string, found: {?} with value {?} */
    // CONVERT_REQUIRES_FORMAT_STRING: 4341114,
    // /** Format must be speficied when converting from '{?}' to '{?}' */
    // FORMAT_MUST_SPEFICIED_CONVERTING: 4341115,
    // /** Only the 'uuid' format is allowed with the UUID subtype */
    // UUID_FORMAT_ALLOWED_UUID: 4341116,
    // /** Invalid format '{?}' */
    // INVALID_FORMAT: 4341117,
    // /** Invalid UTF-8: {?} */
    // INVALID: 4341119,
    // /** Invalid format '{?}' */
    // INVALID_FORMAT_4341120: 4341120,
    // /** BinData does not represent a valid UUID */
    // BINDATA_REPRESENT_VALID_UUID: 4341121,
    // /** BinData does not represent a valid UTF-8 string */
    // BINDATA_REPRESENT_VALID_STRING: 4341122,
    // /** Invalid 'format' argument for $convert: {?} */
    // CONVERT_INVALID_FORMAT_ARGUMENT: 4341125,
    // /** PlanExecutor hit planExecutorAlwaysFails fail point */
    // PLANEXECUTOR_PLANEXECUTORALWAYSFAILS_FAIL_POINT: 4382101,
    // /** scale has to be >= 1 */
    // SCALE: 4390200,
    // /** scale has to be a number >= 1 */
    // SCALE_NUMBER: 4390201,
    // /** $planCacheStats stage supports allHosts parameter only for sharded clusters */
    // PLAN_CACHE_STATS_STAGE_SUPPORTS_ALLHOSTS_PARAMETER: 4503200,
    // /** $accumulator '{?}' must be a constant expression */
    // ACCUMULATOR_MUST_CONSTANT_EXPRESSION: 4544701,
    // /** $accumulator '{?}' must be a String or Code */
    // ACCUMULATOR_MUST_STRING_CODE: 4544702,
    // /** $accumulator expects an object as an argument; found: {?} */
    // ACCUMULATOR_EXPECTS_OBJECT_ARGUMENT: 4544703,
    // /** $accumulator lang must be a string; found: {?} */
    // ACCUMULATOR_LANG_MUST_STRING: 4544704,
    // /** $accumulator only supports lang: 'js' */
    // ACCUMULATOR_SUPPORTS_LANG: 4544705,
    // /** $accumulator got an unexpected field: {?} */
    // ACCUMULATOR_UNEXPECTED_FIELD: 4544706,
    // /** $accumulator missing required argument 'init' */
    // ACCUMULATOR_MISSING_REQUIRED_ARGUMENT_INIT: 4544707,
    // /** $accumulator missing required argument 'accumulate' */
    // ACCUMULATOR_MISSING_REQUIRED_ARGUMENT_ACCUMULATE: 4544708,
    // /** $accumulator missing required argument 'merge' */
    // ACCUMULATOR_MISSING_REQUIRED_ARGUMENT_MERGE: 4544709,
    // /** $accumulator missing required argument 'accumulateArgs' */
    // ACCUMULATOR_MISSING_REQUIRED_ARGUMENT_ACCUMULATEARGS: 4544710,
    // /** $accumulator initArgs must evaluate to an array: {?} */
    // ACCUMULATOR_INITARGS_MUST_EVALUATE_ARRAY: 4544711,
    // /** $accumulator accumulateArgs must evaluate to an array: {?} */
    // ACCUMULATOR_ACCUMULATEARGS_MUST_EVALUATE_ARRAY: 4544712,
    // /** Can't refer to the group key in $bucketAuto */
    // BUCKET_AUTO_REFER_GROUP: 4544714,
    // /** $accumulator arguments exceed max BSON size: {?}{?} */
    // ACCUMULATOR_ARGUMENTS_EXCEED_BSON_SIZE: 4545000,
    // /** failpoint may not be set on foreground indexes */
    // FAILPOINT_FOREGROUND_INDEXES: 4585200,
    // /** $where no longer supports deprecated BSON type CodeWScope */
    // WHERE_DEPRECATED_LONGER_SUPPORTS: 4649201,
    // /** {?} cannot be used inside a validator. */
    // CANNOT_USED_INSIDE: 4660800,
    // /** {?} cannot be used inside a validator. */
    // CANNOT_USED_INSIDE_4660801: 4660801,
    // /** It is illegal to include both 'cacheGeneration' and 'authInfoOpTime' */
    // ILLEGAL_INCLUDE_CACHEGENERATION: 4664500,
    // /** Must include 'authInfoOpTime' */
    // MUST_INCLUDE_AUTHINFOOPTIME: 4664501,
    // /** index build aborted due to failpoint */
    // INDEX_BUILD_ABORTED_FAILPOINT: 4698903,
    // /** Expected field \"{?}{?}{?} */
    // FIELD_4708900: 4708900,
    // /** A replica set ID must be provided to parseForInitiate */
    // REPLICA_MUST_PARSEFORINITIATE: 4709000,
    // /** duplicate field name in diff: {?} */
    // DUPLICATE_FIELD_NAME_4728000: 4728000,
    // /** Attempt to set internal constant: {?} */
    // ATTEMPT_INTERNAL_CONSTANT: 4738901,
    // /** unable to find a controlShard to update during removeShard */
    // UNABLE_FIND_CONTROLSHARD_UPDATE: 4740601,
    // /** Expected diff to be non-empty */
    // EMPTY_DIFF: 4770500,
    // /** expected sub diff at index {?} but got {?} */
    // DIFF_INDEX: 4770501,
    // /** Expected either 'u' (update) or 's' (sub diff) at index {?} but got {?} */
    // UPDATE_DIFF_INDEX: 4770502,
    // /** Unexpected section: {?} in document diff */
    // UNEXPECTED_SECTION_DOCUMENT: 4770503,
    // /** Expected first field to be array header {?} but found {?} */
    // FIRST_FIELD_ARRAY_HEADER: 4770504,
    // /** Expected sections field names in diff to be non-empty */
    // EMPTY_SECTIONS_FIELD: 4770505,
    // /** Expected {?} section to be type {?} */
    // SECTION_TYPE: 4770507,
    // /** Expected integer but got {?} */
    // INTEGER: 4770512,
    // /** Did not expect more sections in diff but found one: {?} */
    // EXPECT_SECTIONS_DIFF: 4770513,
    // /** Did not expect more sections in diff but found one: {?} */
    // EXPECT_SECTIONS_DIFF_4770514: 4770514,
    // /** Expected array header to be bool but got {?} */
    // ARRAY_HEADER_BOOL: 4770519,
    // /** Expected array header to be value true but got {?} */
    // ARRAY_HEADER_VALUE_TRUE: 4770520,
    // /** expected field name to be at least two characters long, but found: {?} */
    // FIELD_NAME_CHARACTERS_LONG: 4770521,
    // /** Expected _id field or $v field missing or $v:1/$v:2, but got: {?} */
    // V_MISSING_FIELD: 4772600,
    // /** Expected 'diff' field to be an object, instead got type: {?} */
    // DIFF_FIELD_OBJECT_INSTEAD: 4772601,
    // /** arrayFilters may not be specified for delta-style updates */
    // ARRAYFILTERS_DELTA_STYLE_UPDATES: 4772603,
    // /** invalid computed geohash error factor: {?} on range [{?}, {?}] with bit precision: {?}.{?} */
    // INVALID_COMPUTED_GEOHASH: 4799400,
    // /** The evaluation stack must hold only a single value */
    // EVALUATION_STACK_MUST_HOLD: 4822801,
    // /** Unsupported key string type: {?} */
    // UNSUPPORTED_STRING_TYPE: 4822802,
    // /** unsupported bson element */
    // UNSUPPORTED_BSON_ELEMENT: 4822804,
    // /** duplicate field name: {?} */
    // DUPLICATE_FIELD_NAME_4822805: 4822805,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822806: 4822806,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822807: 4822807,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822812: 4822812,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822813: 4822813,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822815: 4822815,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822820: 4822820,
    // /** duplicate slot: {?} */
    // DUPLICATE_SLOT: 4822821,
    // /** left and right size do not match */
    // LEFT_RIGHT_SIZE_MATCH: 4822823,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822824: 4822824,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822829: 4822829,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822830: 4822830,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822831: 4822831,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822841: 4822841,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_4822842: 4822842,
    // /** function call: {?} has wrong arity: {?} */
    // WRONG_FUNCTION_CALL: 4822843,
    // /** aggregate function call: {?} occurs in the non-aggregate context. */
    // AGGREGATE_FUNCTION_CALL_OCCURS: 4822844,
    // /** function call: {?} has wrong arity: {?} */
    // WRONG_FUNCTION_CALL_4822845: 4822845,
    // /** aggregate function call: {?} occurs in the non-aggregate context. */
    // AGGREGATE_FUNCTION_CALL_OCCURS_4822846: 4822846,
    // /** unknown function call: {?} */
    // UNKNOWN_FUNCTION_CALL: 4822847,
    // /** seek key is wrong type: {?} */
    // WRONG_SEEK_TYPE: 4822851,
    // /** seek key is wrong type: {?} */
    // WRONG_SEEK_TYPE_4822852: 4822852,
    // /** Query does not have result slot. */
    // QUERY_RESULT_SLOT: 4822865,
    // /** Query does not have recordId slot. */
    // QUERY_RECORDID_SLOT: 4822866,
    // /** WRITE_CONFLICT_RETRY_ONLY yield policy is not supported in SBE */
    // CONFLICT_WRITE_RETRY: 4822879,
    // /** RecordId slot is not defined */
    // RECORDID_SLOT_DEFINED: 4822880,
    // /** Sorting by expression not supported */
    // SORTING_EXPRESSION_SUPPORTED: 4822881,
    // /** Sort key generator in not supported in SBE yet */
    // SORT_GENERATOR_SUPPORTED: 4822883,
    // /** Index not found in durable catalog while attempting to resume index build */
    // INDEX_DURABLE_CATALOG_ATTEMPTING: 4841702,
    // /** No index ident found on disk that matches the index build to resume: {?} */
    // INDEX_IDENT_DISK_MATCHES: 4841703,
    // /** can't $divide by zero */
    // DIVIDE_ZERO: 4848401,
    // /** can't $divide by zero */
    // DIVIDE_ZERO_4848402: 4848402,
    // /** can't $mod by zero */
    // MOD_ZERO: 4848403,
    // /** only one date allowed in an $add expression */
    // ADD_DATE_ALLOWED_EXPRESSION_4848404: 4848404,
    // /** DocumentValidationFailureInfo must have a field 'errInfo' of type object */
    // DOCUMENTVALIDATIONFAILUREINFO_MUST_FIELD_ERRINFO: 4878100,
    // /** Provided apiStrict and/or apiDeprecationErrors without passing apiVersion */
    // APISTRICT_APIDEPRECATIONERRORS_PASSING_APIVERSION: 4886600,
    // /** Response must contain an 'explain' field that is of type 'Object' */
    // RESPONSE_MUST_CONTAIN_EXPLAIN: 4895000,
    // /** Missing _id element when adding new instance of PrimaryOnlyService \"{?}\" */
    // MISSING_ELEMENT_ADDING: 4908702,
    // /** Profile filter is not allowed to depend on metadata */
    // PROFILE_FILTER_ALLOWED_DEPEND: 4910201,
    // /** Migrated  chunk {?} from ns: {?} not owned by donor {?} neither by recipient {?} */
    // MIGRATED_CHUNK_OWNED_DONOR: 4914702,
    // /** {?}. See {?}. */
    // UNKNOWN_ERROR_4926900: 4926900,
    // /** {?} is not supported for a change stream */
    // SUPPORTED_CHANGE_STREAM: 4928900,
    // /** {?} is not supported for a collectionless aggregation */
    // SUPPORTED_COLLECTIONLESS_AGGREGATION: 4928901,
    // /** Missing _id field for document in temporary resharding collection */
    // MISSING_FIELD_DOCUMENT: 4929300,
    // /** Split pipeline provides its own sort already */
    // SPLIT_PIPELINE_PROVIDES_SORT: 4929304,
    // /** could not find index named '{?}' in collection '{?}' */
    // FIND_INDEX_NAMED_COLLECTION: 4938500,
    // /** getSize() called on OplogBufferCollection after seek */
    // GETSIZE_CALLED_OPLOGBUFFERCOLLECTION_SEEK: 4940100,
    // /** Key field cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN_4940400: 4940400,
    // /** Key field cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN_4940401: 4940401,
    // /** docValidationInternalErrorFailPoint is enabled */
    // DOCVALIDATIONINTERNALERRORFAILPOINT_ENABLED: 4944300,
    // /** Index catalog entry not found while attempting to resume index build */
    // INDEX_CATALOG_ENTRY_ATTEMPTING: 4945000,
    // /** Cannot resume a non-hybrid index build */
    // CANNOT_RESUME_HYBRID: 4945001,
    // /** duplicate environment slot: {?} */
    // DUPLICATE_ENVIRONMENT_SLOT: 4946302,
    // /** environment slot is not registered: {?} */
    // ENVIRONMENT_SLOT_REGISTERED: 4946305,
    // /** numInitialChunks should be > 0 */
    // NUMINITIALCHUNKS: 4952602,
    // /** samplesPerChunk should be > 0 */
    // SAMPLESPERCHUNK: 4952603,
    // /** provided zones should not be empty */
    // EMPTY_ZONES: 4952604,
    // /** no shards found for zone: {?}, while creating initial chunks for new resharded collection */
    // SHARDS_ZONE_CREATING_INITIAL: 4952605,
    // /** {?}{?}, it can only make {?} chunks */
    // MAKE_CHUNKS: 4952606,
    // /** no shards found for zone: {?}, while creating initial chunks for new resharded collection */
    // SHARDS_ZONE_CREATING_INITIAL_4952607: 4952607,
    // /** ReturnKey slot is not defined */
    // RETURNKEY_SLOT_DEFINED: 4953600,
    // /** Failed to create new oplog entry: {?} */
    // FAILED_CREATE_OPLOG_4989901: 4989901,
    // /** Missing _id index for collection {?} */
    // MISSING_INDEX_COLLECTION: 4990100,
    // /** Encountered out of order txnNumbers; batch had {?} after {?} */
    // ENCOUNTERED_ORDER_TXNNUMBERS_BATCH: 4990401,
    // /** Expected a no-op oplog entry for pre/post image oplog entry: {?} */
    // OPLOG_ENTRY_POST_IMAGE: 4990408,
    // /** {?}{?}: {?} */
    // UNKNOWN_ERROR_4990409: 4990409,
    // /** Missing txnNumber for oplog entry with lsid: {?} */
    // MISSING_TXNNUMBER_OPLOG: 4990700,
    // /** {?}{?} */
    // UNKNOWN_ERROR_4994600: 4994600,
    // /** $dateFromString first argument must be a timezoneDB object */
    // DATE_FROM_STRING_FIRST_ARGUMENT_MUST_TIMEZONEDB: 4997801,
    // /** $dateFromString requires that 'format' be a string */
    // DATE_FROM_STRING_REQUIRES_FORMAT_STRING_4997802: 4997802,
    // /** $dateFromString parameter 'timezone' must be a string */
    // DATE_FROM_STRING_PARAMETER_TIMEZONE_MUST_STRING: 4997805,
    // /** $dateFromString parameter 'timezone' must be a valid timezone */
    // DATE_FROM_STRING_PARAMETER_TIMEZONE_MUST_VALID: 4997806,
    // /** $dateToString first argument must be a timezoneDB object */
    // DATE_TO_STRING_FIRST_ARGUMENT_MUST_TIMEZONEDB: 4997900,
    // /** $dateToString parameter 'format' must be a string */
    // DATE_TO_STRING_PARAMETER_FORMAT_MUST_STRING: 4997902,
    // /** $dateToString parameter 'timezone' must be a string */
    // DATE_TO_STRING_PARAMETER_TIMEZONE_MUST_STRING: 4997905,
    // /** $dateToString parameter 'timezone' must be a valid timezone */
    // DATE_TO_STRING_PARAMETER_TIMEZONE_MUST_VALID: 4997906,
    // /** Expected to match {?} docs, but only matched {?} for write request {?} */
    // MATCH_DOCS_MATCHED_WRITE: 5030401,
    // /** unknown error in invocation of $where function */
    // WHERE_UNKNOWN_ERROR_INVOCATION: 5038803,
    // /** Pipeline length must be no longer than {?} stages */
    // PIPELINE_LENGTH_MUST_LONGER: 5054701,
    // /** Invalid {?} document in {?}: {?}. See {?}. */
    // INVALID_DOCUMENT: 5070601,
    // /** Invalid Regex: {?} */
    // INVALID_REGEX_5073402: 5073402,
    // /** {?} needs 'regex' to be of type string or regex */
    // NEEDS_REGEX_TYPE_STRING_5073405: 5073405,
    // /** {?}: found regex options specified in both 'regex' and 'options' fields */
    // REGEX_OPTIONS_REGEX_OPTIONS: 5073406,
    // /** {?}: regular expression cannot contain an embedded null byte */
    // CANNOT_REGULAR_EXPRESSION_5073407: 5073407,
    // /** {?}: regular expression options cannot contain an embedded null byte */
    // CANNOT_REGULAR_EXPRESSION_5073408: 5073408,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_5073702: 5073702,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_5073703: 5073703,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_5073704: 5073704,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_5073705: 5073705,
    // /** Could not compare values with type {?} and {?} */
    // COMPARE_VALUES_TYPE: 5073804,
    // /** $indexOfCP found bad UTF-8 in the input */
    // INDEX_OF_CP_BAD_INPUT_5075307: 5075307,
    // /** IDHackStage could not restore cursor */
    // IDHACKSTAGE_RESTORE_CURSOR: 5083800,
    // /** invalid argument to $skip stage: {?} */
    // SKIP_INVALID_ARGUMENT_STAGE: 5107200,
    // /** invalid argument to $limit stage: {?} */
    // LIMIT_INVALID_ARGUMENT_STAGE: 5107201,
    // /** Index key pattern slot is not defined */
    // INDEX_PATTERN_SLOT_DEFINED: 5113713,
    // /** $regexFindAll: the size of buffer to store output exceeded the 64MB limit */
    // REGEX_FIND_ALL_EXCEEDED_SIZE_BUFFER: 5126606,
    // /** {?} needs 'options' to be of type string */
    // NEEDS_OPTIONS_TYPE_STRING_5126607: 5126607,
    // /** Input to $arrayToObject should be either an array or object */
    // ARRAY_TO_OBJECT_INPUT_ARRAY_OBJECT: 5153201,
    // /** $arrayToObject requires a consistent input format. Expected an array */
    // ARRAY_TO_OBJECT_REQUIRES_CONSISTENT_INPUT: 5153202,
    // /** $arrayToObject requires an array of size 2 arrays */
    // ARRAY_TO_OBJECT_REQUIRES_ARRAY_SIZE: 5153203,
    // /** $arrayToObject requires an array of size 2 arrays */
    // ARRAY_TO_OBJECT_REQUIRES_ARRAY_SIZE_5153205: 5153205,
    // /** $arrayToObject requires an array of size 2 arrays */
    // ARRAY_TO_OBJECT_REQUIRES_ARRAY_SIZE_5153206: 5153206,
    // /** Key field cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN_5153207: 5153207,
    // /** $arrayToObject requires a consistent input format. Expected an object */
    // ARRAY_TO_OBJECT_REQUIRES_CONSISTENT_INPUT_5153208: 5153208,
    // /** $arrayToObject requires an object with keys 'k' and 'v'. */
    // ARRAY_TO_OBJECT_REQUIRES_OBJECT_KEYS: 5153212,
    // /** Key field cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN_5153214: 5153214,
    // /** $rand does not currently accept arguments */
    // RAND_ACCEPT_ARGUMENTS_5155201: 5155201,
    // /** Invalid conversion to long during {?}. */
    // INVALID_CONVERSION_LONG: 5155302,
    // /** Invalid range: starting index is a UTF-8 continuation byte */
    // INVALID_RANGE_STARTING_5155604: 5155604,
    // /** Invalid range: ending index is a UTF-8 continuation character */
    // INVALID_RANGE_ENDING_5155605: 5155605,
    // /** string length could not be represented as an int. */
    // STRING_LENGTH_REPRESENTED_5155801: 5155801,
    // /** string length could not be represented as an int. */
    // STRING_LENGTH_REPRESENTED_5155901: 5155901,
    // /** Failed to parse \"chars\" argument to $trim/$ltrim/$rtrim: Detected invalid UTF-8. Missing expected continuation byte at end of string. */
    // TRIM_LTRIM_FAILED_INVALID_PARSE: 5156304,
    // /** Failed to parse \"chars\" argument to $trim/$ltrim/$rtrim{?} */
    // TRIM_LTRIM_FAILED_PARSE_CHARS: 5156305,
    // /** ${?} parameter 'timezone' must be a string */
    // PARAMETER_TIMEZONE_MUST_STRING: 5157900,
    // /** ${?} parameter 'timezone' must be a valid timezone */
    // PARAMETER_TIMEZONE_MUST_VALID: 5157901,
    // /** $_testApiVersion only supports an object as its argument */
    // TESTAPIVERSION_SUPPORTS_OBJECT_ARGUMENT: 5161700,
    // /** $_testApiVersion only accepts an object with a single field. */
    // TESTAPIVERSION_ACCEPTS_OBJECT_SINGLE: 5161701,
    // /** unstable must be a boolean */
    // UNSTABLE_MUST_BOOLEAN: 5161702,
    // /** deprecated must be a boolean */
    // DEPRECATED_MUST_BOOLEAN: 5161703,
    // /** {?} is not a valid argument for $_testApiVersion */
    // VALID_ARGUMENT_TESTAPIVERSION: 5161704,
    // /** $dateDiff only supports an object as its argument */
    // DATE_DIFF_SUPPORTS_OBJECT_ARGUMENT: 5166301,
    // /** Unrecognized argument to $dateDiff: {?} */
    // DATE_DIFF_UNRECOGNIZED_ARGUMENT: 5166302,
    // /** Missing 'startDate' parameter to $dateDiff */
    // DATE_DIFF_MISSING_STARTDATE_PARAMETER: 5166303,
    // /** Missing 'endDate' parameter to $dateDiff */
    // DATE_DIFF_MISSING_ENDDATE_PARAMETER: 5166304,
    // /** Missing 'unit' parameter to $dateDiff */
    // DATE_DIFF_MISSING_UNIT_PARAMETER: 5166305,
    // /** {?} requires '{?}' to be a date, but got {?} */
    // REQUIRES_DATE: 5166307,
    // /** dateDiff overflowed */
    // DATEDIFF_OVERFLOWED: 5166308,
    // /** {?} expects an object as its argument */
    // EXPECTS_OBJECT_ARGUMENT: 5166400,
    // /** Unrecognized argument to {?}: {?}{?} */
    // UNRECOGNIZED_ARGUMENT: 5166401,
    // /** {?} requires startDate, unit, and amount to be present */
    // REQUIRES_STARTDATE_UNIT: 5166402,
    // /** {?} requires startDate to be convertible to a date */
    // REQUIRES_STARTDATE_CONVERTIBLE: 5166403,
    // /** {?} expects integer amount of time units */
    // EXPECTS_INTEGER_AMOUNT_TIME: 5166405,
    // /** dateAdd overflowed */
    // DATEADD_OVERFLOWED: 5166406,
    // /** can't drop live oplog while replicating */
    // DROP_LIVE_OPLOG_REPLICATING: 5255000,
    // /** can't drop oplog on storage engines that support replSetResizeOplog command */
    // DROP_OPLOG_STORAGE_ENGINES: 5255001,
    // /** Have to pass 1 as 'drop' parameter */
    // PASS_DROP_PARAMETER: 5255100,
    // /** Snapshot id slot is not defined */
    // SNAPSHOT_SLOT_DEFINED: 5290701,
    // /** Index key slot is not defined */
    // INDEX_SLOT_DEFINED: 5290711,
    // /** Lower bound must not exceed upper bound: [{?}, {?}] */
    // LOWER_BOUND_MUST_EXCEED: 5339900,
    // /** Document-based bounds require a sortBy */
    // DOCUMENT_BASED_BOUNDS_REQUIRE: 5339901,
    // /** Range-based bounds require sortBy a single field */
    // RANGE_BASED_BOUNDS_REQUIRE: 5339902,
    // /** $_internalUnpackBucket specification must be an object, got: {?} */
    // INTERNALUNPACKBUCKET_SPECIFICATION_MUST_OBJECT: 5346500,
    // /** include or exclude field must be an array, got: {?} */
    // INCLUDE_EXCLUDE_FIELD_MUST: 5346501,
    // /** include or exclude field element must be a string, got: {?} */
    // INCLUDE_EXCLUDE_FIELD_ELEMENT: 5346502,
    // /** include or exclude field element must be a single-element field path */
    // INCLUDE_EXCLUDE_FIELD_ELEMENT_5346503: 5346503,
    // /** timeField field must be a string, got: {?} */
    // TIMEFIELD_FIELD_MUST_STRING: 5346504,
    // /** metaField field must be a string, got: {?} */
    // METAFIELD_FIELD_MUST_STRING: 5346505,
    // /** unrecognized parameter to $_internalUnpackBucket: {?} */
    // UNRECOGNIZED_PARAMETER_INTERNALUNPACKBUCKET: 5346506,
    // /** The $_internalUnpackBucket stage requires a timeField parameter */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE: 5346508,
    // /** A bucket with _id {?} contains an empty data region */
    // EMPTY_BUCKET_CONTAINS: 5346509,
    // /** An empty bucket cannot be unpacked */
    // EMPTY_CANNOT_BUCKET_UNPACKED: 5346510,
    // /** The $_internalUnpackBucket stage requires the data region to have a timeField object */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5346700: 5346700,
    // /** Resharding completed with non-empty stash collections */
    // EMPTY_RESHARDING_COMPLETED: 5356800,
    // /** Rank style window functions take no other arguments */
    // RANK_STYLE_WINDOW_FUNCTIONS: 5371601,
    // /** {?}{?} */
    // UNKNOWN_ERROR_5371602: 5371602,
    // /** {?} must be specified with '{}' as the value */
    // MUST_VALUE: 5371603,
    // /** Projection on field {?} is invalid */
    // INVALID_PROJECTION_FIELD: 5392900,
    // /** collection is not clustered but is described as being TTL */
    // COLLECTION_CLUSTERED_DESCRIBED: 5400701,
    // /** The collection doesn't have a clustered index */
    // COLLECTION_DOESN_CLUSTERED_INDEX: 5401000,
    // /** collatorSlot must be of collator type */
    // COLLATORSLOT_MUST_COLLATOR_TYPE: 5402503,
    // /** collatorSlot must be of collator type */
    // COLLATORSLOT_MUST_COLLATOR_TYPE_5402504: 5402504,
    // /** Exceeded memory limit in DocumentSourceSetWindowFields, used {?} bytes but max allowed is {?} */
    // EXCEEDED_MEMORY_LIMIT: 5414201,
    // /** $integral with 'unit' expects the sortBy field to be a Date */
    // INTEGRAL_UNIT_EXPECTS_SORTBY_FIELD: 5423901,
    // /** $integral (with no 'unit') expects the sortBy field to be numeric */
    // INTEGRAL_UNIT_EXPECTS_SORTBY_FIELD_5423902: 5423902,
    // /** Invalid range: For windows that involve date or time ranges, a unit must be provided. */
    // INVALID_RANGE_WINDOWS: 5429413,
    // /** Invalid range: Expected the sortBy field to be a number, but it was {?} */
    // INVALID_RANGE_SORTBY: 5429414,
    // /** Invalid range: Expected the sortBy field to be a Date, but it was {?} */
    // INVALID_RANGE_SORTBY_5429513: 5429513,
    // /** dateTrunc overflowed */
    // DATETRUNC_OVERFLOWED: 5439000,
    // /** dateTrunc overflowed */
    // DATETRUNC_OVERFLOWED_5439001: 5439001,
    // /** dateTrunc overflowed */
    // DATETRUNC_OVERFLOWED_5439002: 5439002,
    // /** dateTrunc overflowed */
    // DATETRUNC_OVERFLOWED_5439004: 5439004,
    // /** expected binSize > 0 */
    // BINSIZE: 5439005,
    // /** dateTrunc unsupported binSize value */
    // UNSUPPORTED_DATETRUNC_BINSIZE: 5439006,
    // /** $dateTrunc only supports an object as its argument */
    // DATE_TRUNC_SUPPORTS_OBJECT_ARGUMENT: 5439007,
    // /** Unrecognized argument to $dateTrunc: {?}{?} */
    // DATE_TRUNC_UNRECOGNIZED_ARGUMENT: 5439008,
    // /** Missing 'date' parameter to $dateTrunc */
    // DATE_TRUNC_MISSING_DATE_PARAMETER: 5439009,
    // /** Missing 'unit' parameter to $dateTrunc */
    // DATE_TRUNC_MISSING_UNIT_PARAMETER: 5439010,
    // /** {?} requires 'unit' to be a string, but got {?} */
    // REQUIRES_UNIT_STRING: 5439013,
    // /** {?} requires '{?}' to be a string, but got {?} */
    // REQUIRES_STRING: 5439015,
    // /** {?} parameter '{?}' value cannot be recognized as a day of a week: {?} */
    // CANNOT_PARAMETER_VALUE: 5439016,
    // /** $dateTrunc requires 'binSize' to be a 64-bit integer, but got value '{?}' of type {?} */
    // DATE_TRUNC_REQUIRES_BINSIZE_INTEGER: 5439017,
    // /** $dateTrunc requires 'binSize' to be greater than 0, but got value {?} */
    // DATE_TRUNC_REQUIRES_BINSIZE_GREATER: 5439018,
    // /** $collStats must take a nested object but found: {?} */
    // COLL_STATS_MUST_TAKE_NESTED_OBJECT_5447000: 5447000,
    // /** Authorization Session contains more authorization checks than permitted by contract. */
    // AUTHORIZATION_SESSION_CONTAINS_AUTHORIZATION: 5452401,
    // /** Window function {?} is not supported with a removable window */
    // WINDOW_FUNCTION_SUPPORTED_REMOVABLE: 5461500,
    // /** the match filter must be an expression in an object */
    // MATCH_FILTER_MUST_EXPRESSION_5467600: 5467600,
    // /** the '$_internalChangeStreamTransform' object spec must be an object */
    // INTERNALCHANGESTREAMTRANSFORM_OBJECT_SPEC_MUST: 5467601,
    // /** the '{?}' object spec must be an object */
    // OBJECT_SPEC_MUST_OBJECT: 5467602,
    // /** the '{?}' object spec must be an object */
    // OBJECT_SPEC_MUST_OBJECT_5467603: 5467603,
    // /** the '{?}' stage spec must be an object */
    // STAGE_SPEC_MUST_OBJECT: 5467605,
    // /** the '{?}' stage spec must be an object */
    // STAGE_SPEC_MUST_OBJECT_5467608: 5467608,
    // /** the '{?}' stage spec must be an object */
    // STAGE_SPEC_MUST_OBJECT_5467610: 5467610,
    // /** Error flushing file {?}: {?} */
    // ERROR_FLUSHING_FILE: 5479100,
    // /** $_internalConvertBucketIndexStats specification must be an object */
    // INTERNALCONVERTBUCKETINDEXSTATS_SPECIFICATION_MUST_OBJECT: 5480000,
    // /** timeField field must be a string */
    // TIMEFIELD_FIELD_MUST_STRING_5480001: 5480001,
    // /** metaField field must be a string, got: {?} */
    // METAFIELD_FIELD_MUST_STRING_5480002: 5480002,
    // /** unrecognized parameter to $_internalConvertBucketIndexStats: {?} */
    // UNRECOGNIZED_PARAMETER_INTERNALCONVERTBUCKETINDEXSTATS: 5480003,
    // /** The $_internalConvertBucketIndexStats stage requires a timeField parameter */
    // REQUIRES_INTERNALCONVERTBUCKETINDEXSTATS_STAGE: 5480004,
    // /** unit must be 'week' or smaller */
    // UNIT_MUST_WEEK_SMALLER: 5490710,
    // /** {?}' is not allowed in user requests */
    // ALLOWED_USER_REQUESTS: 5491300,
    // /** computedMetaProjFields field must be an array, got: {?} */
    // COMPUTEDMETAPROJFIELDS_FIELD_MUST_ARRAY: 5509900,
    // /** computedMetaProjFields field element must be a string, got: {?} */
    // COMPUTEDMETAPROJFIELDS_FIELD_ELEMENT_MUST: 5509901,
    // /** computedMetaProjFields field element must be a single-element field path */
    // COMPUTEDMETAPROJFIELDS_FIELD_ELEMENT_MUST_5509902: 5509902,
    // /** bucketMaxSpanSeconds field must be an integer, got: {?} */
    // BUCKETMAXSPANSECONDS_FIELD_MUST_INTEGER: 5510600,
    // /** bucketMaxSpanSeconds field must be greater than zero */
    // BUCKETMAXSPANSECONDS_FIELD_MUST_GREATER: 5510601,
    // /** The $_internalUnpackBucket stage requires a bucketMaxSpanSeconds parameter */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5510602: 5510602,
    // /** Expected const expression as argument to _internalFindAllValuesAtPath */
    // CONST_EXPRESSION_ARGUMENT_INTERNALFINDALLVALUESATPATH: 5511201,
    // /** Expected to match {?} docs, but only matched {?} for write request {?} */
    // MATCH_DOCS_MATCHED_WRITE_5511400: 5511400,
    // /** Found more than one 'collections' documents in aggregation response */
    // COLLECTIONS_DOCUMENTS_AGGREGATION_RESPONSE: 5520100,
    // /** 'collections' document not found in aggregation response */
    // COLLECTIONS_DOCUMENT_AGGREGATION_RESPONSE: 5520101,
    // /** {?} could not find a non-duplicate measurement after {?} attempts */
    // DUPLICATE_FIND_MEASUREMENT: 5521504,
    // /** metaField field must be a single-element field path */
    // METAFIELD_FIELD_MUST_SINGLE: 5545700,
    // /** 'phase' field is only valid to be specified on shards */
    // PHASE_FIELD_VALID_SHARDS: 5563600,
    // /** Donor state document still exists after attempted abort */
    // EXISTS_DONOR_STATE: 5563802,
    // /** Recipient state document still exists after attempted abort */
    // EXISTS_RECIPIENT_STATE: 5563803,
    // /** Cannot specify both queryableBackupMode and startupRecoveryForRestore at the same time */
    // CANNOT_SPECIFY_QUERYABLEBACKUPMODE: 5576603,
    // /** Unable to acquire security key[s] */
    // UNABLE_ACQUIRE_SECURITY: 5579201,
    // /** $_unpackBucket specification must be an object, got: {?} */
    // UNPACKBUCKET_SPECIFICATION_MUST_OBJECT: 5612400,
    // /** timeField field must be a string, got: {?} */
    // TIMEFIELD_FIELD_MUST_STRING_5612401: 5612401,
    // /** metaField field must be a string, got: {?} */
    // METAFIELD_FIELD_MUST_STRING_5612402: 5612402,
    // /** metaField field must be a single-element field path */
    // METAFIELD_FIELD_MUST_SINGLE_5612403: 5612403,
    // /** unrecognized parameter to $_unpackBucket: {?} */
    // UNRECOGNIZED_PARAMETER_UNPACKBUCKET: 5612404,
    // /** The $_unpackBucket stage requires a timeField parameter */
    // REQUIRES_UNPACKBUCKET_STAGE: 5612405,
    // /** $derivative with 'unit' expects the sortBy field to be a Date */
    // DERIVATIVE_UNIT_EXPECTS_SORTBY_FIELD: 5624900,
    // /** $derivative where the sortBy is a Date requires an 'unit' */
    // DERIVATIVE_REQUIRES_SORTBY_DATE: 5624901,
    // /** $derivative (with no 'unit') expects the sortBy field to be numeric */
    // DERIVATIVE_UNIT_EXPECTS_SORTBY_FIELD_5624902: 5624902,
    // /** $derivative input must not be null or missing */
    // DERIVATIVE_MISSING_INPUT_MUST: 5624903,
    // /** Each client connection may only be authenticated once. Previously authenticated as: {?} */
    // CLIENT_CONNECTION_AUTHENTICATED_ONCE: 5626701,
    // /** Client has attempted to authenticate on multiple databases.Already authenticated as: {?} */
    // CLIENT_AUTHENTICATE_MULTIPLE_DATABASES: 5626702,
    // /** Each client connection may only be authenticated once */
    // CLIENT_CONNECTION_AUTHENTICATED_ONCE_5626703: 5626703,
    // /** {?}{?} cannot be found */
    // CANNOT: 5637601,
    // /** {?}{?} cannot be found */
    // CANNOT_5637602: 5637602,
    // /** Error writing to file {?}: {?} */
    // ERROR_WRITING_FILE_5642403: 5642403,
    // /** Exceeded max memory. Current memory: {?} bytes. Max allowed memory: {?} bytes. Set 'allowDiskUse: true' to spill to disk */
    // EXCEEDED_MEMORY_CURRENT: 5643011,
    // /** undefined slot: {?} */
    // UNDEFINED_SLOT: 5645901,
    // /** duplicate named slot: {?} */
    // DUPLICATE_NAMED_SLOT: 5645902,
    // /** _configsvrRemoveChunks must be run as a retryable write */
    // CONFIGSVRREMOVECHUNKS_MUST_RETRYABLE_WRITE: 5665000,
    // /** the '{?}' spec must be an object */
    // SPEC_MUST_OBJECT: 5669601,
    // /** Argument to {?} must be a timestamp, but is {?} */
    // ARGUMENT_MUST_TIMESTAMP: 5687301,
    // /** Argument to {?} must be a timestamp, but is {?} */
    // ARGUMENT_MUST_TIMESTAMP_5687302: 5687302,
    // /** 'avgObjSize' provided but not 'count' */
    // AVGOBJSIZE_COUNT: 5688300,
    // /** FieldPath is too long */
    // FIELDPATH_LONG: 5729100,
    // /** the '{?}' spec must be an object */
    // SPEC_MUST_OBJECT_5730300: 5730300,
    // /** {?} cannot be executed from router */
    // CANNOT_EXECUTED_ROUTER: 5730301,
    // /** Sharding a buckets collection is not allowed */
    // SHARDING_BUCKETS_COLLECTION_ALLOWED: 5731501,
    // /** Sharding a buckets collection is not allowed */
    // SHARDING_BUCKETS_COLLECTION_ALLOWED_5731591: 5731591,
    // /** Densify field type must be numeric or a date */
    // DENSIFY_FIELD_TYPE_MUST: 5733201,
    // /** $densify cannot generate fields nested inside arrays */
    // DENSIFY_CANNOT_GENERATE_FIELDS: 5733307,
    // /** $densify cannot overwrite non-object values with objects */
    // DENSIFY_CANNOT_OVERWRITE_OBJECT: 5733308,
    // /** The step parameter in a range statement must be a strictly positive numeric value */
    // STEP_PARAMETER_RANGE_STATEMENT: 5733401,
    // /** A bounding array in a range statement must have exactly two elements */
    // BOUNDING_ARRAY_RANGE_STATEMENT: 5733403,
    // /** A bounding array must contain either both dates or both numeric types */
    // BOUNDING_ARRAY_MUST_CONTAIN: 5733405,
    // /** A bounding array must contain either both dates or both numeric types */
    // BOUNDING_ARRAY_MUST_CONTAIN_5733406: 5733406,
    // /** Numeric bounds may not have unit parameter */
    // NUMERIC_BOUNDS_UNIT_PARAMETER: 5733409,
    // /** A bounding array of dates must specify a unit */
    // BOUNDING_ARRAY_DATES_MUST: 5733410,
    // /** OP_DELETE is no longer supported */
    // DELETE_LONGER_SUPPORTED: 5745700,
    // /** OP_UPDATE is no longer supported */
    // UPDATE_LONGER_SUPPORTED: 5745701,
    // /** OP_INSERT is no longer supported */
    // INSERT_LONGER_SUPPORTED: 5745702,
    // /** OP_KILL_CURSORS is no longer supported */
    // KILL_CURSORS_LONGER_SUPPORTED: 5745703,
    // /** _configsvrRemoveTags must be run as a retryable write */
    // CONFIGSVRREMOVETAGS_MUST_RETRYABLE_WRITE: 5748800,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR: 5754701,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT: 5787801,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_5787900: 5787900,
    // /** Unknown argument for 'n' operator: {?} */
    // UNKNOWN_ARGUMENT_OPERATOR: 5787901,
    // /** Value for 'n' must be of integral type, but found {?} */
    // VALUE_MUST_INTEGRAL_TYPE: 5787902,
    // /** Value for 'n' must be of integral type, but found {?} */
    // VALUE_MUST_INTEGRAL_TYPE_5787903: 5787903,
    // /** Missing value for '{?}' */
    // MISSING_VALUE: 5787906,
    // /** Missing value for '{?}' */
    // MISSING_VALUE_5787907: 5787907,
    // /** 'n' must be greater than 0, found {?} */
    // MUST_GREATER: 5787908,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_5788001: 5788001,
    // /** Unknown argument to {?} '{?}' */
    // UNKNOWN_ARGUMENT_5788002: 5788002,
    // /** Missing value for '{?}' */
    // MISSING_VALUE_5788003: 5788003,
    // /** Missing value for '{?}' */
    // MISSING_VALUE_5788004: 5788004,
    // /** Missing value for '{?}' */
    // MISSING_VALUE_5788005: 5788005,
    // /** Input must be an array */
    // INPUT_MUST_ARRAY: 5788200,
    // /** Donor state document still exists after attempted commit */
    // EXISTS_DONOR_STATE_5795302: 5795302,
    // /** Recipient state document still exists after attempted commit */
    // EXISTS_RECIPIENT_STATE_5795303: 5795303,
    // /** {?} cannot be executed from router */
    // CANNOT_EXECUTED_ROUTER_5806001: 5806001,
    // /** the '{?}' spec must be an object */
    // SPEC_MUST_OBJECT_5806003: 5806003,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT: 5807000,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT_5807001: 5807001,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_5807020: 5807020,
    // /** Target collection {?} UUID does not match the provided UUID. */
    // TARGET_COLLECTION_UUID_MATCH: 5807602,
    // /** config.collection entry not found for {?} */
    // CONFIG_COLLECTION_ENTRY: 5808200,
    // /** collection {?} setting is already set to false */
    // COLLECTION_SETTING_FALSE: 5808201,
    // /** multi update is not supported for transform-style update */
    // MULTI_UPDATE_SUPPORTED_TRANSFORM: 5857811,
    // /** arrayFilters may not be specified for transform-style updates */
    // ARRAYFILTERS_TRANSFORM_STYLE_UPDATES: 5857812,
    // /** Invalid bucket version */
    // INVALID_BUCKET_VERSION: 5857900,
    // /** Invalid bucket version */
    // INVALID_BUCKET_VERSION_5857901: 5857901,
    // /** The $_internalUnpackBucket stage requires 'control' object to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5857902: 5857902,
    // /** The $_internalUnpackBucket stage requires 'control.version' field to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5857903: 5857903,
    // /** The $_internalUnpackBucket stage requires 'control' object to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5857904: 5857904,
    // /** The $_internalUnpackBucket stage requires 'control.version' field to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_5857905: 5857905,
    // /** literal documents specification must be an array */
    // LITERAL_DOCUMENTS_SPECIFICATION_MUST: 5858201,
    // /** literal documents specification must be an array of objects */
    // LITERAL_DOCUMENTS_SPECIFICATION_MUST_5858202: 5858202,
    // /** an array is expected */
    // ARRAY_5858203: 5858203,
    // /** $geoNear distanceField is required for time-series queries */
    // GEO_NEAR_REQUIRED_DISTANCEFIELD_TIME: 5860206,
    // /** Must not specify 'query' for $geoNear on a time-series collection; use $match instead */
    // GEO_NEAR_MATCH_MUST_SPECIFY_QUERY_5860207: 5860207,
    // /** $geoNear 'includeLocs' is not supported on time-series metrics */
    // GEO_NEAR_INCLUDELOCS_SUPPORTED_TIME_SERIES: 5860208,
    // /** Cannot create collection {?} with UUID {?} because it conflicts with the UUID of an existing collection {?} */
    // CANNOT_CREATE_COLLECTION: 5860300,
    // /** $geoNear requires a 'near' argument */
    // GEO_NEAR_REQUIRES_NEAR_ARGUMENT: 5860400,
    // /** $geoNear requires near argument to be a GeoJSON object or a legacy point(array) */
    // GEO_NEAR_REQUIRES_NEAR_ARGUMENT_5860401: 5860401,
    // /** $geoNear requires a constant near argument */
    // GEO_NEAR_REQUIRES_CONSTANT_NEAR: 5860402,
    // /** Failpoint failPreimagesCollectionCreation enabled. Throwing exception */
    // FAILPOINT_FAILPREIMAGESCOLLECTIONCREATION_ENABLED_THROWING: 5868501,
    // /** {?} field is required and must be a string */
    // REQUIRED_FIELD_MUST: 5874500,
    // /** {?} field is required and must be an object or array */
    // REQUIRED_FIELD_MUST_5874501: 5874501,
    // /** {?} field is required and must be a string */
    // REQUIRED_FIELD_MUST_5874502: 5874502,
    // /** {?} field is required and must be a number */
    // REQUIRED_FIELD_MUST_5874503: 5874503,
    // /** {?} expected {?} arguments but got {?} */
    // ARGUMENTS: 5874510,
    // /** Found an oplog entry with an invalid stmtId {?} */
    // INVALID_OPLOG_ENTRY: 5875604,
    // /** Cannot modify the '{?}' field of {?} entries */
    // CANNOT_MODIFY_FIELD: 5875700,
    // /** Upper bound, lower bound, and step must all have the same type */
    // UPPER_BOUND_LOWER_BOUND: 5876900,
    // /** All operands of $setEquals must be arrays. {?}-th argument is of type: {?} */
    // SET_EQUALS_OPERANDS_MUST_ARRAYS_ARGUMENT_5887502: 5887502,
    // /** Must specify 'key' option for $geoNear on a time-series collection */
    // GEO_NEAR_MUST_SPECIFY_OPTION_TIME: 5892921,
    // /** Generated {?} documents in $densify, which is over the limit of {?}{?} */
    // DENSIFY_GENERATED_DOCUMENTS_LIMIT: 5897900,
    // /** the time field '{?}' can be only at the end of the shard key pattern */
    // TIME_FIELD_SHARD_PATTERN: 5914000,
    // /** {?} */
    // UNKNOWN_ERROR_5914001: 5914001,
    // /** Error translating non-metadata time-series predicate to operate on buckets: {?}: {?} */
    // ERROR_TRANSLATING_METADATA_TIME: 5916301,
    // /** Expected retryable internal session to have a transaction, not a retryable write */
    // RETRYABLE_INTERNAL_SESSION_TRANSACTION: 5918601,
    // /** Indexed measurement field contains an array value */
    // INDEXED_MEASUREMENT_FIELD_CONTAINS: 5930501,
    // /** Failed to schedule periodic health check for {?}: {?} */
    // FAILED_SCHEDULE_PERIODIC: 5936101,
    // /** Explicit bounds must be numeric or dates */
    // EXPLICIT_BOUNDS_MUST_NUMERIC: 5946800,
    // /** Bounds string must either be '{?}' or '{?}' */
    // BOUNDS_STRING_MUST: 5946802,
    // /** Cache size must be at least 1KB * number of cores */
    // CACHE_SIZE_MUST_NUMBER: 5968001,
    // /** invalid dateAdd 'amount' parameter value: {?} {?} */
    // INVALID_DATEADD_AMOUNT: 5976500,
    // /** 'clusteredIndex' has to be a boolean or object. */
    // CLUSTEREDINDEX_BOOLEAN_OBJECT: 5979702,
    // /** It is illegal to drop the clusteredIndex */
    // ILLEGAL_DROP_CLUSTEREDINDEX: 5979800,
    // /** Field path exceeds path length limit */
    // FIELD_PATH_EXCEEDS_PATH: 5984700,
    // /** Field path exceeds path length limit */
    // FIELD_PATH_EXCEEDS_PATH_5984701: 5984701,
    // /** $densify exceeded memory limit of {?} */
    // DENSIFY_EXCEEDED_MEMORY_LIMIT: 6007200,
    // /** The evaluation stack must be empty */
    // EMPTY_EVALUATION_STACK: 6040900,
    // /** invalid $dateSubtract 'amount' parameter value: {?} */
    // DATE_SUBTRACT_INVALID_AMOUNT_PARAMETER: 6045000,
    // /** Did not update chunk with estimated size */
    // UPDATE_CHUNK_ESTIMATED_SIZE: 6049401,
    // /** Estimated chunk size cannot be negative */
    // CANNOT_ESTIMATED_CHUNK: 6049442,
    // /** There can be no repeated values in the sort field in the same partition */
    // REPEATED_VALUES_SORT_FIELD: 6050106,
    // /** Each fill output specification must be an object with exactly one field */
    // FILL_OUTPUT_SPECIFICATION_MUST: 6050200,
    // /** Method must be either {?} or {?} */
    // METHOD_MUST: 6050202,
    // /** The output field in '$fill' must contain an object with at least one element */
    // FILL_OUTPUT_FIELD_MUST_CONTAIN: 6050203,
    // /** Maximum one of 'partitionBy' and 'partitionByFields can be specified in '$fill' */
    // FILL_MAXIMUM_PARTITIONBY_PARTITIONBYFIELDS: 6050204,
    // /** {?}{?} */
    // UNKNOWN_ERROR_6054002: 6054002,
    // /** Cannot set pre-image more than once */
    // CANNOT_IMAGE_ONCE: 6054003,
    // /** Cannot set post-image more than once */
    // CANNOT_POST_IMAGE: 6054004,
    // /** This is not a time-series collection */
    // TIME_SERIES_COLLECTION: 6057500,
    // /** While attempting to write migration recipient information for migration , found document with the same migration id. Attempted migration: {?} */
    // ATTEMPTING_WRITE_MIGRATION_RECIPIENT: 6064502,
    // /** expected time-series buckets collection {?} to exist */
    // TIME_SERIES_BUCKETS_COLLECTION: 6067201,
    // /** assumeClean field must be a bool, got: {?} */
    // ASSUMECLEAN_FIELD_MUST_BOOL: 6067202,
    // /** assumeClean field must be a bool, got: {?} */
    // ASSUMECLEAN_FIELD_MUST_BOOL_6067203: 6067203,
    // /** view definition must have {?} of type bool or no such field */
    // VIEW_DEFINITION_MUST_TYPE: 6067204,
    // /** Bucket unexpectedly contained fewer values than count */
    // BUCKET_UNEXPECTEDLY_CONTAINED_FEWER: 6067500,
    // /** Bucket unexpectedly contained fewer values than count */
    // BUCKET_UNEXPECTEDLY_CONTAINED_FEWER_6067600: 6067600,
    // /** Bucket unexpectedly contained fewer values than count */
    // BUCKET_UNEXPECTEDLY_CONTAINED_FEWER_6067601: 6067601,
    // /** {?} must be run as a retryable write */
    // MUST_RETRYABLE_WRITE: 6077300,
    // /** {?} must be run as a retryable write */
    // MUST_RETRYABLE_WRITE_6077301: 6077301,
    // /** {?} must be run as a retryable write */
    // MUST_RETRYABLE_WRITE_6077302: 6077302,
    // /** {?} must be run as a retryable write */
    // MUST_RETRYABLE_WRITE_6077303: 6077303,
    // /** Cannot implicitly create a new collection with createIndex 'clustered' option */
    // CANNOT_IMPLICITLY_CREATE: 6100900,
    // /** Expected to match {?} docs, but only matched {?} for write request {?} */
    // MATCH_DOCS_MATCHED_WRITE_6102800: 6102800,
    // /** collMod unblocking should always be on a time-series collection */
    // COLLMOD_UNBLOCKING_ALWAYS_TIME: 6102802,
    // /** no globalScriptEngine in $where parsing */
    // WHERE_GLOBALSCRIPTENGINE_PARSING: 6108304,
    // /** ns for $where cannot be empty */
    // WHERE_CANNOT_EMPTY: 6108305,
    // /** $where compile error */
    // WHERE_COMPILE_ERROR: 6108306,
    // /** min() / max() are only supported for forward collection scans on clustered collections */
    // SUPPORTED_FORWARD_COLLECTION_SCANS: 6137402,
    // /** Attempt to authorize via security token on connection with established authentication */
    // ATTEMPT_AUTHORIZE_SECURITY_TOKEN: 6161501,
    // /** Attempt to authorize a user other than that present in the security token */
    // ATTEMPT_AUTHORIZE_USER_PRESENT: 6161502,
    // /** Attempted to deauth a security token user while using standard login */
    // DEAUTH_SECURITY_TOKEN_USER: 6161503,
    // /** May not log out while using a security token based authentication */
    // USING_SECURITY_TOKEN_BASED: 6161504,
    // /** Unknown matchType: {?} */
    // UNKNOWN_MATCHTYPE: 6161701,
    // /** {?}{?}': {?} */
    // UNKNOWN_ERROR_6161702: 6161702,
    // /** $changeStream must take a nested object but found: {?} */
    // CHANGE_STREAM_MUST_TAKE_NESTED_OBJECT: 6188500,
    // /** Expected UUID or null */
    // UUID_NULL: 6189500,
    // /** Expected an eventIdentifier for an event resume token */
    // EVENTIDENTIFIER_EVENT_RESUME_TOKEN: 6189501,
    // /** Expected an eventIdentifier for an event resume token */
    // EVENTIDENTIFIER_EVENT_RESUME_TOKEN_6189502: 6189502,
    // /** Resume Token eventIdentifier is not an object */
    // RESUME_TOKEN_EVENTIDENTIFIER_OBJECT: 6189503,
    // /** Invalid high water mark token */
    // INVALID_HIGH_WATER: 6189504,
    // /** Invalid high water mark token */
    // INVALID_HIGH_WATER_6189505: 6189505,
    // /** HashAggStage could not restore cursor */
    // HASHAGGSTAGE_RESTORE_CURSOR: 6196500,
    // /** invalid db name: {?} */
    // INVALID_NAME_6198700: 6198700,
    // /** invalid db name: {?} */
    // INVALID_NAME_6198701: 6198701,
    // /** invalid db name: {?} */
    // INVALID_NAME_6198702: 6198702,
    // /** The $listCatalog stage specification must be an empty object */
    // LIST_CATALOG_EMPTY_STAGE_SPECIFICATION: 6200600,
    // /** Cannot use time-series options for a non-timeseries collection */
    // CANNOT_TIME_SERIES: 6201808,
    // /** Cannot get the transaction participant for the session {?} without having it or its parent checked out */
    // CANNOT_TRANSACTION_PARTICIPANT: 6202000,
    // /** Refresh expected the highest transaction number in the session {?} to be {?} found a {?} entry for an internal transaction for retryable writes with transaction number {?} */
    // REFRESH_HIGHEST_TRANSACTION_NUMBER: 6202001,
    // /** Cannot start transaction with session id {?} and transaction number {?} because a retryable write with the same transaction number is being executed in a retryable internal transaction  with session id {?} and transaction number {?} in state {?} */
    // CANNOT_START_TRANSACTION_6202002: 6202002,
    // /** Invalid number of arguments to fail() */
    // INVALID_NUMBER_ARGUMENTS: 6250200,
    // /** First argument to fail() must be a 32-bit integer constant */
    // FIRST_ARGUMENT_FAIL_MUST: 6250201,
    // /** Second argument to fail() must be a string constant */
    // SECOND_ARGUMENT_FAIL_MUST: 6250202,
    // /** Invalid number of arguments to convert() */
    // INVALID_NUMBER_ARGUMENTS_6250203: 6250203,
    // /** Second argument to convert() must be a 32-bit integer constant */
    // SECOND_ARGUMENT_CONVERT_MUST: 6250204,
    // /** Second argument to convert() must be a numeric type tag */
    // SECOND_ARGUMENT_CONVERT_MUST_6250205: 6250205,
    // /** Invalid number of arguments to typeMatch() */
    // INVALID_NUMBER_ARGUMENTS_6250206: 6250206,
    // /** Second argument to typeMatch() must be a 32-bit integer constant */
    // SECOND_ARGUMENT_TYPEMATCH_MUST: 6250207,
    // /** Cannot have exchange specified in a search pipeline */
    // CANNOT_EXCHANGE_SEARCH: 6253506,
    // /** MultiResponseInitialCursor must have exactly one of 'cursor' or 'cursors' fields */
    // MULTIRESPONSEINITIALCURSOR_MUST_EXACTLY_CURSOR: 6253507,
    // /** Cursors field in response must be an array */
    // CURSORS_FIELD_RESPONSE_MUST: 6253508,
    // /** Cursors field must have exactly two cursors */
    // CURSORS_FIELD_MUST_EXACTLY: 6253509,
    // /** {?}{?} */
    // UNKNOWN_ERROR_6253510: 6253510,
    // /** dropDatabase in an applyOps must be the only entry */
    // DROPDATABASE_APPLYOPS_MUST_ENTRY: 6275900,
    // /** $setWindowFields 'output' specification contains two conflicting paths */
    // SET_WINDOW_FIELDS_OUTPUT_SPECIFICATION_CONTAINS_CONFLICTING: 6307900,
    // /** Argument to {?} stage must be an object, but found type: {?} */
    // ARGUMENT_STAGE_MUST_OBJECT: 6315901,
    // /** Unable to parse geoNear query: {?} */
    // UNABLE_PARSE_GEONEAR_QUERY: 6330900,
    // /** Cannot compare two encrypted constants to each other */
    // CANNOT_COMPARE_ENCRYPTED: 6334100,
    // /** Encrypted fields cannot be used with views or timeseries collections */
    // CANNOT_ENCRYPTED_FIELDS: 6346401,
    // /** Encrypted collections are not supported on standalone */
    // ENCRYPTED_COLLECTIONS_SUPPORTED_STANDALONE: 6346402,
    // /** TTL indexes are not allowed on encrypted collections */
    // INDEXES_ALLOWED_ENCRYPTED_COLLECTIONS: 6346501,
    // /** Index not allowed on, or a prefix of, the encrypted field {?} */
    // INDEX_ALLOWED_PREFIX_ENCRYPTED: 6346502,
    // /** Target namespace is not an encrypted collection */
    // TARGET_NAMESPACE_ENCRYPTED_COLLECTION: 6346807,
    // /** Delete command must have exactly one delete op entry */
    // DELETE_COMMAND_MUST_EXACTLY: 6346808,
    // /** First element field name of delete op entry must be '_id' */
    // FIRST_ELEMENT_FIELD_NAME: 6346809,
    // /** Update command must have exactly one update op entry */
    // UPDATE_COMMAND_MUST_EXACTLY: 6346810,
    // /** First element field name of update op entry must be '_id' */
    // FIRST_ELEMENT_FIELD_NAME_6346811: 6346811,
    // /** First element field name of findAndModify query must be '_id' */
    // FIRST_ELEMENT_FIELD_NAME_6346812: 6346812,
    // /** findAndModify 'new' field must be 'false' */
    // FINDANDMODIFY_FIELD_MUST_FALSE: 6346813,
    // /** Can't access $$SEARCH_META after a stage with a sub-pipeline */
    // SEARCH_ACCESS_META_STAGE_PIPELINE: 6347901,
    // /** Can't access $$SEARCH_META without a $search stage earlier in the pipeline */
    // SEARCH_ACCESS_META_STAGE_EARLIER: 6347902,
    // /** Unknown $lookup strategy type */
    // LOOKUP_UNKNOWN_STRATEGY_TYPE: 6357204,
    // /** GROUP cannot propagate a record id slot, but the record id was requested by the parent */
    // CANNOT_GROUP_PROPAGATE: 6360401,
    // /** Encrypted fields cannot be used with capped collections */
    // CANNOT_ENCRYPTED_FIELDS_6367301: 6367301,
    // /** Cannot convert an encrypted collection to a capped collection */
    // CANNOT_CONVERT_ENCRYPTED: 6367302,
    // /** $_internalBoundedSort sortKey must be an object */
    // INTERNALBOUNDEDSORT_SORTKEY_MUST_OBJECT: 6369904,
    // /** the $_internalBoundedSort key specification must be an object */
    // INTERNALBOUNDEDSORT_SPECIFICATION_MUST_OBJECT: 6369905,
    // /** $_internalBoundedSort only handles BSONType::date values */
    // INTERNALBOUNDEDSORT_HANDLES_BSONTYPE_DATE: 6369909,
    // /** BoundedSorter input is too out-of-order: with bound {?}, did not expect input {?} */
    // BOUNDEDSORTER_INPUT_ORDER_BOUND: 6369910,
    // /** Unexpected to find more then one FLE state collection document */
    // UNEXPECTED_FIND_STATE: 6371201,
    // /** Only single document deletes are permitted */
    // SINGLE_DOCUMENT_DELETES_PERMITTED: 6371302,
    // /** Must specify either update or remove to findAndModify, not both */
    // MUST_SPECIFY_UPDATE_REMOVE: 6371401,
    // /** Missing _id field in pre-image document, the fields document must contain _id */
    // MISSING_FIELD_IMAGE: 6371403,
    // /** findAndModify fields must be empty */
    // EMPTY_FINDANDMODIFY_FIELDS: 6371408,
    // /** Only single document updates are permitted */
    // SINGLE_DOCUMENT_UPDATES_PERMITTED: 6371502,
    // /** FLE only supports single document updates */
    // SUPPORTS_SINGLE_DOCUMENT_UPDATES: 6371503,
    // /** Missing _id field in pre-image document */
    // MISSING_FIELD_IMAGE_6371504: 6371504,
    // /** Could not find pre-image document by _id */
    // FIND_IMAGE_DOCUMENT: 6371505,
    // /** FLE only supports modifier and replacement style updates */
    // SUPPORTS_MODIFIER_REPLACEMENT_STYLE: 6371517,
    // /** Encrypted index operations are only supported on replica sets */
    // ENCRYPTED_INDEX_OPERATIONS_SUPPORTED: 6371602,
    // /** Encrypted index operations are only supported on replica sets */
    // ENCRYPTED_INDEX_OPERATIONS_SUPPORTED_6371701: 6371701,
    // /** Encrypted index operations are only supported on replica sets */
    // ENCRYPTED_INDEX_OPERATIONS_SUPPORTED_6371800: 6371800,
    // /** Encrypted index operations are only supported on replica sets */
    // ENCRYPTED_INDEX_OPERATIONS_SUPPORTED_6371905: 6371905,
    // /** Must have an index compatible with the proposed shard key */
    // MUST_INDEX_COMPATIBLE_PROPOSED: 6373200,
    // /** unrecognized option to {?} stage: {?} */
    // UNRECOGNIZED_OPTION_STAGE: 6387800,
    // /** the '{?}' spec must be an empty object */
    // EMPTY_SPEC_MUST: 6387803,
    // /** {?} cannot be executed from router */
    // CANNOT_EXECUTED_ROUTER_6387804: 6387804,
    // /** expected a boolean for the {?} option to {?} stage, got {?} */
    // BOOLEAN_OPTION_STAGE: 6387805,
    // /** expected a boolean for the {?} option to {?} stage, got {?} */
    // BOOLEAN_OPTION_STAGE_6387808: 6387808,
    // /** unrecognized option to {?} stage: {?} */
    // UNRECOGNIZED_OPTION_STAGE_6387809: 6387809,
    // /** FLE only supports modifier and replacement style updates */
    // SUPPORTS_MODIFIER_REPLACEMENT_STYLE_6439901: 6439901,
    // /** $_internalBoundedSort bound must be an object */
    // INTERNALBOUNDEDSORT_BOUND_MUST_OBJECT: 6460200,
    // /** $_internalBoundedSort bound.base must be a string */
    // INTERNALBOUNDEDSORT_BOUND_BASE_MUST: 6460201,
    // /** $_internalBoundedSort bound.base must be '{?}' or '{?}' */
    // INTERNALBOUNDEDSORT_BOUND_BASE_MUST_6460202: 6460202,
    // /** The $_internalUnpackBucket stage requires '{?}' object to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_6460203: 6460203,
    // /** The $_internalUnpackBucket stage requires '{?}.{?}' to be a date */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_6460204: 6460204,
    // /** The $_internalUnpackBucket stage requires '{?}' object to be present */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_6460205: 6460205,
    // /** The $_internalUnpackBucket stage requires '{?}.{?}' to be a date */
    // REQUIRES_INTERNALUNPACKBUCKET_STAGE_6460206: 6460206,
    // /** {?} field must be a bool, got: {?} */
    // FIELD_MUST_BOOL: 6460208,
    // /** {?} field must be a bool, got: {?} */
    // FIELD_MUST_BOOL_6460209: 6460209,
    // /** Sharding a Queryable Encryption state collection is not allowed */
    // SHARDING_QUERYABLE_ENCRYPTION_STATE: 6464401,
    // /** Cannot drop temporary encrypted compaction collection due to missing collection UUID */
    // CANNOT_MISSING_DROP_TEMPORARY: 6517007,
    // /** Time-series bucket documents must have 'control' object present */
    // TIME_SERIES_BUCKET_DOCUMENTS: 6540600,
    // /** Time-series bucket documents must have 'control.version' field present */
    // TIME_SERIES_BUCKET_DOCUMENTS_6540601: 6540601,
    // /** Invalid bucket version */
    // INVALID_BUCKET_VERSION_6540602: 6540602,
    // /** Attempted to run '{?}' as a retryable write with session id{?} and transaction number {?} but the active transaction number on the session is {?} */
    // RETRYABLE_WRITE_SESSION_TRANSACTION: 6564100,
    // /** {?} must be run through mongos in a sharded cluster */
    // MUST_MONGOS_SHARDED_CLUSTER: 6583201,
    // /** A uuid is required for a search query, but was missing. Got namespace {?} */
    // REQUIRED_MISSING_UUID_SEARCH: 6584801,
    // /** $_internalBoundedSort limit must be a non-negative number if specified */
    // INTERNALBOUNDEDSORT_LIMIT_MUST_NEGATIVE: 6588100,
    // /** Attempted to use the active transaction number {?} in session {?} to run a transaction but it corresponds to a retryable write */
    // ACTIVE_TRANSACTION_NUMBER_SESSION: 6611000,
    // /** Attempted to use the active transaction number {?} in session {?} to run a retryable write but it corresponds to a transaction */
    // ACTIVE_TRANSACTION_NUMBER_SESSION_6611001: 6611001,
    // /** Constant value type is not int64_t */
    // CONSTANT_VALUE_TYPE_INT64: 6624057,
    // /** Unexpected dirty status */
    // UNEXPECTED_DIRTY_STATUS: 6624071,
    // /** Cannot append to scalar */
    // CANNOT_APPEND_SCALAR: 6624072,
    // /** Field name is not set */
    // FIELD_NAME: 6624073,
    // /** Duplicate field name */
    // DUPLICATE_FIELD_NAME_6624075: 6624075,
    // /** Other printer does not contain Object */
    // PRINTER_CONTAIN_OBJECT: 6624349,
    // /** Constant value type is not int32_t */
    // CONSTANT_VALUE_TYPE_INT32: 6624354,
    // /** Constant value type is not bool */
    // CONSTANT_VALUE_TYPE_BOOL: 6624356,
    // /** {?} field must be a bool, got: {?} */
    // FIELD_MUST_BOOL_6646901: 6646901,
    // /** view definition must have {?} of type bool or no such field */
    // VIEW_DEFINITION_MUST_TYPE_6646910: 6646910,
    // /** Cannot specify speculativeAuthenticate with a tenantId */
    // CANNOT_SPECIFY_SPECULATIVEAUTHENTICATE: 6656100,
    // /** Must have bucket boundary on first value */
    // MUST_BUCKET_BOUNDARY_FIRST: 6660504,
    // /** Must have bucket boundary on last value */
    // MUST_BUCKET_BOUNDARY_LAST: 6660505,
    // /** Maximum integer number must be >= the minimum one. */
    // MAXIMUM_INTEGER_NUMBER_MUST: 6660507,
    // /** Too few integers generated. */
    // INTEGERS_GENERATED: 6660508,
    // /** Maximum string size must be >= the minimum one. */
    // MAXIMUM_STRING_SIZE_MUST: 6660509,
    // /** Array specs must be 0 if there is no array data descriptor. */
    // ARRAY_SPECS_MUST_ARRAY: 6660510,
    // /** Nested arrays requires sensible array lengths. */
    // REQUIRES_NESTED_ARRAYS: 6660511,
    // /** reuseScalarsRatio must be in [0, 1]. */
    // REUSESCALARSRATIO_MUST: 6660512,
    // /** There must always be a parent data descriptor. */
    // MUST_ALWAYS_PARENT_DATA: 6660513,
    // /** Random index out of range */
    // RANDOM_INDEX_RANGE: 6660540,
    // /** Random index out of range */
    // RANDOM_INDEX_RANGE_6660541: 6660541,
    // /** NDV must be > 0. */
    // MUST: 6660542,
    // /** nullsRatio must be in [0, 1]. */
    // NULLSRATIO_MUST: 6660543,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT_6660547: 6660547,
    // /** Input is not sorted */
    // INPUT_SORTED: 6660550,
    // /** There can't be duplicate type class bounds. */
    // DUPLICATE_TYPE_CLASS: 6660551,
    // /** String {?} is not convertable to SBE type tag. */
    // STRING_CONVERTABLE_TYPE: 6660600,
    // /** External users cannot have crudProcessed enabled */
    // CANNOT_EXTERNAL_USERS: 6666201,
    // /** Queryable Encryption only supports comparisons between a field path and a constant */
    // QUERYABLE_ENCRYPTION_SUPPORTS_COMPARISONS: 6672413,
    // /** This is not a time-series collection */
    // TIME_SERIES_COLLECTION_6679401: 6679401,
    // /** Invalid equalFreq */
    // INVALID_EQUALFREQ: 6695702,
    // /** Invalid rangeFreq */
    // INVALID_RANGEFREQ: 6695703,
    // /** Invalid ndv */
    // INVALID_6695704: 6695704,
    // /** Invalid cumulative frequency */
    // INVALID_CUMULATIVE_FREQUENCY: 6695705,
    // /** Invalid cumulative ndv */
    // INVALID_CUMULATIVE: 6695706,
    // /** ScalarHistogram buckets and bounds must have equal sizes. */
    // SCALARHISTOGRAM_BUCKETS_BOUNDS_MUST: 6695707,
    // /** applyOps command no longer supports the 'preCondition' option */
    // APPLYOPS_COMMAND_LONGER_SUPPORTS: 6711600,
    // /** applyOps command no longer supports the 'alwaysUpsert' option */
    // APPLYOPS_COMMAND_LONGER_SUPPORTS_6711601: 6711601,
    // /** first argument should be a fieldpath */
    // FIRST_ARGUMENT_FIELDPATH: 6720903,
    // /** second argument should be a constant */
    // SECOND_ARGUMENT_CONSTANT: 6720904,
    // /** Field '{?}' is unexpectedly encrypted */
    // FIELD_UNEXPECTEDLY_ENCRYPTED: 6726300,
    // /** Mismatched keyId for field '{?}' expected {?}, found {?} */
    // MISMATCHED_KEYID_FIELD: 6726301,
    // /** Expected _id field, or $v field missing, or $v equal to {?} (kDeltaV2), but got oplog version $v: {?} */
    // V_MISSING_FIELD_6741200: 6741200,
    // /** No command matched {?} */
    // COMMAND_MATCHED: 6750400,
    // /** No cursor has a command matching {?} */
    // CURSOR_COMMAND_MATCHING: 6750402,
    // /** dbCheck no longer supports snapshotRead:false */
    // DBCHECK_LONGER_SUPPORTS_SNAPSHOTREAD: 6769500,
    // /** dbCheck no longer supports snapshotRead:false */
    // DBCHECK_LONGER_SUPPORTS_SNAPSHOTREAD_6769501: 6769501,
    // /** Time series bucket document is missing 'control' field */
    // MISSING_TIME_SERIES: 6781400,
    // /** Time series bucket document is missing 'control.min' field */
    // MISSING_TIME_SERIES_6781401: 6781401,
    // /** Time series bucket document does not have a valid min time element */
    // TIME_SERIES_BUCKET_DOCUMENT: 6781402,
    // /** The $shardedDataDistribution stage specification must be an empty object */
    // SHARDED_DATA_DISTRIBUTION_EMPTY_STAGE_SPECIFICATION: 6789100,
    // /** The $shardedDataDistribution stage can only be run on router */
    // SHARDED_DATA_DISTRIBUTION_STAGE_ROUTER: 6789101,
    // /** The $shardedDataDistribution stage must be run on the admin database */
    // SHARDED_DATA_DISTRIBUTION_STAGE_MUST_ADMIN_DATABASE: 6789102,
    // /** $_internalAllCollectionStats must take a nested object but found: {?} */
    // INTERNALALLCOLLECTIONSTATS_MUST_TAKE_NESTED: 6789103,
    // /** The $_internalAllCollectionStats stage must be run on the admin database */
    // INTERNALALLCOLLECTIONSTATS_STAGE_MUST_ADMIN: 6789104,
    // /** Executor shut down */
    // EXECUTOR_SHUT_DOWN: 6791600,
    // /** Couldn't find collection {?} */
    // COULDN_FIND_COLLECTION: 6799700,
    // /** Analyze command is not supported on capped collections */
    // ANALYZE_COMMAND_SUPPORTED_CAPPED: 6799701,
    // /** {?} is not a normal or clustered collection */
    // NORMAL_CLUSTERED_COLLECTION: 6799702,
    // /** Key path is empty */
    // EMPTY_PATH: 6799703,
    // /** Key path contains numeric component {?} */
    // PATH_CONTAINS_NUMERIC_COMPONENT: 6799704,
    // /** Only one of sample rate and sample size may be present */
    // SAMPLE_RATE_SAMPLE_SIZE: 6799705,
    // /** It is illegal to pass sampleRate or sampleSize without a key */
    // ILLEGAL_PASS_SAMPLERATE: 6799706,
    // /** Failed to obtain timezone offset */
    // FAILED_OBTAIN_TIMEZONE: 6828900,
    // /** Unexpected value type */
    // UNEXPECTED_VALUE_TYPE: 6844500,
    // /** Index key pattern field ordering must be ascending. Field: {?} is not ascending. */
    // INDEX_PATTERN_FIELD_ORDERING: 6868501,
    // /** Malformed 'collation' document provided. Reason {?} */
    // MALFORMED_COLLATION_DOCUMENT_REASON: 6868502,
    // /** Unsupported index type: {?} */
    // UNSUPPORTED_INDEX_TYPE: 6868503,
    // /** {?} supports an object as its argument */
    // SUPPORTS_OBJECT_ARGUMENT_6868506: 6868506,
    // /** {?} requires 'spec' argument to be an object */
    // REQUIRES_SPEC_ARGUMENT: 6868507,
    // /** Unknown argument: {?}found while parsing{?} */
    // UNKNOWN_ARGUMENT_PARSING: 6868508,
    // /** {?} requires both 'doc' and 'spec' arguments */
    // REQUIRES_SPEC_ARGUMENTS: 6868509,
    // /** {?} is currently not supported on mongos */
    // SUPPORTED_MONGOS: 6868510,
    // /** $_internalOwningShard is currently not supported on mongos */
    // INTERNALOWNINGSHARD_SUPPORTED_MONGOS: 6868600,
    // /** The value should belong to exactly one ShardId */
    // VALUE_BELONG_EXACTLY_SHARDID: 6868601,
    // /** $_internalOwningShard expression only makes sense in sharded environment */
    // INTERNALOWNINGSHARD_EXPRESSION_MAKES_SENSE: 6868602,
    // /** {?} must take a nested object but found: {?} */
    // MUST_TAKE_NESTED_OBJECT: 6875700,
    // /** {?} must take a nested object but found: {?} */
    // MUST_TAKE_NESTED_OBJECT_6875701: 6875701,
    // /** {?} must take a nested object but found: {?} */
    // MUST_TAKE_NESTED_OBJECT_6876000: 6876000,
    // /** {?} must take a nested object but found: {?} */
    // MUST_TAKE_NESTED_OBJECT_6876001: 6876001,
    // /** QuerySolutionNode must be non null */
    // QUERYSOLUTIONNODE_MUST_NULL: 6882300,
    // /** $_internalBoundedSort stage must have at least one sort key */
    // INTERNALBOUNDEDSORT_STAGE_MUST_SORT: 6900501,
    // /** Modifications to system.views must take an exclusive lock */
    // MODIFICATIONS_SYSTEM_VIEWS_MUST_6944500: 6944500,
    // /** Type checking error */
    // TYPE_CHECKING_ERROR: 6950900,
    // /** Storage type must be 'pipe' */
    // STORAGE_TYPE_MUST_PIPE: 6968501,
    // /** File type must be 'bson' */
    // FILE_TYPE_MUST_BSON: 6968502,
    // /** CEHistogram with array data must have at least one array. */
    // CEHISTOGRAM_ARRAY_DATA_MUST: 6979503,
    // /** TenantId must be set */
    // TENANTID_MUST: 7005300,
    // /** TenantId must match that in db prefix */
    // TENANTID_MUST_MATCH_PREFIX: 7005301,
    // /** TenantId must not be set, but it is: */
    // TENANTID_MUST_7005302: 7005302,
    // /** streaming group must specify an array of monotonic id fields {?} */
    // STREAMING_GROUP_MUST_SPECIFY: 7026702,
    // /** if there is no explicit id fields, {?} must contain a single \"_id\" string */
    // EXPLICIT_FIELDS_MUST_CONTAIN: 7026703,
    // /** {?} elements must be strings */
    // ELEMENTS_MUST_STRINGS: 7026704,
    // /** id field not found */
    // FIELD_7026705: 7026705,
    // /** Monotonic value should not be missing, null or an array */
    // MISSING_MONOTONIC_VALUE: 7026708,
    // /** streaming group must have at least one monotonic id expression */
    // STREAMING_GROUP_MUST_MONOTONIC: 7026709,
    // /** streaming group monotonic expression indexes must correspond to id expressions */
    // STREAMING_GROUP_MONOTONIC_EXPRESSION: 7026710,
    // /** Bucket unexpectedly contained fewer values than count */
    // BUCKET_UNEXPECTEDLY_CONTAINED_FEWER_7026803: 7026803,
    // /** {?} field must be an object, got: {?} */
    // FIELD_MUST_OBJECT: 7026902,
    // /** {?} field must be an object, got: {?} */
    // FIELD_MUST_OBJECT_7026903: 7026903,
    // /** Two-sided range predicate must have both lower and upper bounds. */
    // SIDED_RANGE_PREDICATE_MUST: 7030700,
    // /** Two-sided range predicate must have both lower and upper bounds. */
    // SIDED_RANGE_PREDICATE_MUST_7030701: 7030701,
    // /** Both payloads in a two-sided range must be generated together. */
    // PAYLOADS_SIDED_RANGE_MUST: 7030702,
    // /** Both payloads in a two-sided range must be generated together. */
    // PAYLOADS_SIDED_RANGE_MUST_7030703: 7030703,
    // /** Both payloads in a two-sided range must be generated together. */
    // PAYLOADS_SIDED_RANGE_MUST_7030704: 7030704,
    // /** A payload cannot appear under multiple {?} operators. */
    // CANNOT_PAYLOAD_APPEAR: 7030705,
    // /** A payload cannot appear under multiple {?} operators. */
    // CANNOT_PAYLOAD_APPEAR_7030706: 7030706,
    // /** Payload should only appear once in query. */
    // PAYLOAD_APPEAR_ONCE_QUERY: 7030707,
    // /** Stub should only appear once in query. */
    // STUB_APPEAR_ONCE_QUERY: 7030708,
    // /** One-sided range comparison cannot be a stub payload. */
    // CANNOT_SIDED_RANGE: 7030709,
    // /** One-sided range comparison can only have one valid operator. */
    // SIDED_RANGE_COMPARISON_VALID: 7030710,
    // /** Payload generated for {?} but was found under {?} */
    // PAYLOAD_GENERATED: 7030711,
    // /** Payloads must be regenerated every time a query is modified. */
    // PAYLOADS_MUST_REGENERATED_EVERY: 7030715,
    // /** Payload generated for {?} and {?} but was found under {?}. */
    // PAYLOAD_GENERATED_7030716: 7030716,
    // /** Payloads must be regenerated every time a query is modified. */
    // PAYLOADS_MUST_REGENERATED_EVERY_7030718: 7030718,
    // /** Expected one or more urls for an external data source but got 0 */
    // URLS_EXTERNAL_DATA_SOURCE: 7039001,
    // /** Expected one or more external data source but got 0 */
    // EXTERNAL_DATA_SOURCE: 7039002,
    // /** Source namespace must be an external data source */
    // SOURCE_NAMESPACE_MUST_EXTERNAL: 7039003,
    // /** Involved namespace must be an external data source */
    // INVOLVED_NAMESPACE_MUST_EXTERNAL: 7039004,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_7039500: 7039500,
    // /** Should have exactly one path under $not */
    // NOT_EXACTLY_PATH: 7040600,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7070100: 7070100,
    // /** Invalid expiration time specified */
    // INVALID_EXPIRATION_TIME: 7070102,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT_7086700: 7086700,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT_7086702: 7086702,
    // /** Type count frequency {?} of type bracket for {?} did not match histogram frequency {?} */
    // TYPE_COUNT_FREQUENCY_TYPE: 7105700,
    // /** The type counters count {?} values, but the histogram frequency is {?} */
    // TYPE_COUNTERS_COUNT_VALUES: 7105701,
    // /** The histogram cardinalities {?} and {?} did not match. */
    // HISTOGRAM_CARDINALITIES_MATCH: 7105702,
    // /** Histograms had different type-brackets {?} and {?} at the same bound position. */
    // HISTOGRAMS_TYPE_BRACKETS_BOUND: 7105703,
    // /** Histogram frequencies frequencies {?} and {?} of type bracket for {?} did not match. */
    // HISTOGRAM_FREQUENCIES_TYPE: 7105704,
    // /** One histogram had more type-brackets than the other. */
    // HISTOGRAM_TYPE_BRACKETS: 7105705,
    // /** Error committing movePrimary: update of config.databases failed */
    // FAILED_ERROR_COMMITTING: 7120209,
    // /** A histogram must have at least one bucket. */
    // HISTOGRAM_MUST_BUCKET: 7120500,
    // /** A scalar CEHistogram should not have any arrays in its counters. */
    // SCALAR_CEHISTOGRAM_ARRAYS_COUNTERS: 7131000,
    // /** Expected type count of booleans to be {?}, was {?} */
    // TYPE_COUNT_BOOLEANS: 7131001,
    // /** Scalar histogram must have sorted bound values */
    // SCALAR_HISTOGRAM_MUST_SORTED: 7131006,
    // /** Scalar histogram must have unique bound values */
    // SCALAR_HISTOGRAM_MUST_UNIQUE: 7131007,
    // /** Cumulative ndv of bucket {?} is invalid, expecting {?} */
    // INVALID_CUMULATIVE_BUCKET: 7131008,
    // /** Cumulative ndv of bucket {?} is invalid, expecting {?} */
    // INVALID_CUMULATIVE_BUCKET_7131009: 7131009,
    // /** Array histogram must have at least one array. */
    // ARRAY_HISTOGRAM_MUST_ARRAY: 7131010,
    // /** The Array type counter counts {?}{?}{?} */
    // ARRAY_TYPE_COUNTER_COUNTS: 7131011,
    // /** expecting nsOrUUID to contain a UUID */
    // EXPECTING_NSORUUID_CONTAIN_UUID: 7145300,
    // /** count value must not be negative */
    // COUNT_VALUE_MUST_NEGATIVE: 7145301,
    // /** Invalid value */
    // INVALID_VALUE: 7180104,
    // /** Invalid value */
    // INVALID_VALUE_7180105: 7180105,
    // /** Splitting change event failed: fragment size {?} is greater than maximum allowed fragment size {?} */
    // FAILED_SPLITTING_CHANGE: 7182500,
    // /** Resume token 'fragmentNum' must be a non-negative integer. */
    // RESUME_TOKEN_FRAGMENTNUM_MUST: 7182501,
    // /** Cannot split an empty event or an event containing solely '_id' field */
    // CANNOT_EMPTY_SPLIT_EVENT: 7182502,
    // /** Tokens of version {?} cannot have a fragmentNum */
    // CANNOT_TOKENS_VERSION: 7182504,
    // /** $changeStreamSplitLargeEvent spec should be an empty object */
    // CHANGE_STREAM_SPLIT_LARGE_EVENT_EMPTY_SPEC_OBJECT: 7182800,
    // /** {?} must be the last stage in the pipeline */
    // MUST_LAST_STAGE_PIPELINE: 7182802,
    // /** {?} is at the wrong position in the pipeline after optimization */
    // WRONG_POSITION_PIPELINE: 7182803,
    // /** {?} can only be used once in the pipeline */
    // USED_ONCE_PIPELINE: 7183900,
    // /** $topN requires 'n' to be specified */
    // TOP_N_REQUIRES: 7212110,
    // /** $topN requires 'input' to be specified */
    // TOP_N_REQUIRES_INPUT: 7212111,
    // /** $top requires an object as an argument, found: {?} */
    // TOP_REQUIRES_OBJECT_ARGUMENT: 7212113,
    // /** $top found an unknown argument: {?} */
    // TOP_UNKNOWN_ARGUMENT: 7212114,
    // /** $top requires 'input' to be specified */
    // TOP_REQUIRES_INPUT: 7212115,
    // /** $bottomN requires an object as an argument, found: {?} */
    // BOTTOM_N_REQUIRES_OBJECT_ARGUMENT: 7212117,
    // /** $bottomN found an unknown argument: {?} */
    // BOTTOM_N_UNKNOWN_ARGUMENT: 7212118,
    // /** $bottomN requires 'n' to be specified */
    // BOTTOM_N_REQUIRES: 7212119,
    // /** $bottomN requires 'input' to be specified */
    // BOTTOM_N_REQUIRES_INPUT: 7212120,
    // /** $bottom requires an object as an argument, found: {?} */
    // BOTTOM_REQUIRES_OBJECT_ARGUMENT: 7212122,
    // /** $bottom found an unknown argument: {?} */
    // BOTTOM_UNKNOWN_ARGUMENT: 7212123,
    // /** $bottom requires 'input' to be specified */
    // BOTTOM_REQUIRES_INPUT: 7212124,
    // /** The external data source cannot be used for write operations */
    // CANNOT_EXTERNAL_DATA: 7239302,
    // /** the wildcard keyPattern {?} is invalid */
    // INVALID_WILDCARD_KEYPATTERN: 7246102,
    // /** field {?} cannot be indexed as an array (multikey) */
    // CANNOT_FIELD_INDEXED: 7246301,
    // /** The index is not a wildcard index */
    // INDEX_WILDCARD_INDEX: 7246601,
    // /** Expected sum of type counts {?} to equal sample size {?} */
    // TYPE_COUNTS_EQUAL_SAMPLE: 7261500,
    // /** Cannot create a time-series collection from a non time-series collection or view. */
    // CANNOT_CREATE_TIME: 7268700,
    // /** Non numeric tag type is interpreted as NaN */
    // NUMERIC_TYPE_INTERPRETED: 7280701,
    // /** Non numeric tag type {?} is interpreted as NaN */
    // NUMERIC_TYPE_INTERPRETED_7280702: 7280702,
    // /** {?} command requires query knob to be enabled */
    // REQUIRES_COMMAND_QUERY: 7283301,
    // /** Expected sum of numeric type counts {?} to be no less than NaN counts {?} */
    // NUMERIC_TYPE_COUNTS: 7289700,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7292602: 7292602,
    // /** Could not find pre-image document by _id */
    // FIND_IMAGE_DOCUMENT_7293302: 7293302,
    // /** Found a document in ESC with _id of incorrect BinDataType */
    // DOCUMENT_INCORRECT_BINDATATYPE: 7293604,
    // /** Failed due to fleCompactOrCleanupFailBeforeECOCRead fail point */
    // FAILED_FLECOMPACTORCLEANUPFAILBEFOREECOCREAD_FAIL: 7293605,
    // /** Got an invalid cursor while reading the Queryable Encryption ESC {?} */
    // INVALID_CURSOR_READING: 7293607,
    // /** Max number of ESC entries to delete per request cannot be zero */
    // CANNOT_NUMBER_ENTRIES: 7293611,
    // /** getQueryableEncryptionCountInfo for {?} returned non-existent searched counts */
    // GETQUERYABLEENCRYPTIONCOUNTINFO_EXISTENT_SEARCHED_COUNTS: 7295001,
    // /** getQueryableEncryptionCountInfo returned an invalid position for the next anchor */
    // INVALID_GETQUERYABLEENCRYPTIONCOUNTINFO_POSITION: 7295002,
    // /** {?} */
    // UNKNOWN_ERROR_7295003: 7295003,
    // /** the value spread between {?} and {?} is NaN */
    // VALUE_SPREAD: 7299702,
    // /** Retryable findAndModify on a timeseries is not supported */
    // RETRYABLE_FINDANDMODIFY_TIMESERIES_SUPPORTED: 7308305,
    // /** Retryable findAndModify on a timeseries is not supported */
    // RETRYABLE_FINDANDMODIFY_TIMESERIES_SUPPORTED_7314600: 7314600,
    // /** The transition to config shard feature is disabled */
    // TRANSITION_CONFIG_SHARD_FEATURE: 7368401,
    // /** The transition to config shard feature is disabled */
    // TRANSITION_CONFIG_SHARD_FEATURE_7368402: 7368402,
    // /** Invalid server token */
    // INVALID_SERVER_TOKEN: 7399502,
    // /** Invalid ServerDerivedFromDataToken */
    // INVALID_SERVERDERIVEDFROMDATATOKEN: 7399503,
    // /** $out to time-series collections is only supported on FCV greater than or equal to 7.1 */
    // OUT_TIME_SERIES_COLLECTIONS_SUPPORTED: 7406100,
    // /** $out to time-series collections is only supported on FCV greater than or equal to 7.1 */
    // OUT_TIME_SERIES_COLLECTIONS_SUPPORTED_7406101: 7406101,
    // /** {?}{?}Found: {?} */
    // UNKNOWN_ERROR_7406103: 7406103,
    // /** Mismatch in the number of expected tokens */
    // MISMATCH_NUMBER_TOKENS: 7415101,
    // /** Mismatch in the number of expected counts for a token */
    // MISMATCH_NUMBER_COUNTS: 7415104,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_7429703: 7429703,
    // /** Only approximate, discrete, and continuous percentiles are supported */
    // APPROXIMATE_DISCRETE_CONTINUOUS_PERCENTILES: 7435800,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_7436100: 7436100,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_7436200: 7436200,
    // /** specification must be an object; found {?} */
    // SPECIFICATION_MUST_OBJECT_7436201: 7436201,
    // /** Exceeded disk use limit for spool */
    // EXCEEDED_DISK_LIMIT: 7443700,
    // /** Missing or incomplete accumulator specification for {?} */
    // MISSING_INCOMPLETE_ACCUMULATOR: 7455900,
    // /** Expected a cursor to be present in the $collStats results: {?} */
    // COLL_STATS_CURSOR_PRESENT_RESULTS: 7463202,
    // /** Expected cursor ID to be 0: {?} */
    // CURSOR: 7463203,
    // /** $sort key must not contain duplicate keys (duplicate: '{?}') */
    // SORT_DUPLICATE_MUST_CONTAIN: 7472500,
    // /** $sort key must not contain duplicate keys (field: '{?}') */
    // SORT_DUPLICATE_MUST_CONTAIN_7472501: 7472501,
    // /** getQueryableEncryptionCountInfo for {?} returned an invalid number of edge count info */
    // INVALID_GETQUERYABLEENCRYPTIONCOUNTINFO_NUMBER: 7517100,
    // /** Invalid TagQueryType value. */
    // INVALID_TAGQUERYTYPE_VALUE: 7517101,
    // /** Invalid QECountInfoQueryTypeEnum value. */
    // INVALID_QECOUNTINFOQUERYTYPEENUM_VALUE: 7517102,
    // /** getQueryableEncryptionCountInfo for {?} returned non-existent stats */
    // GETQUERYABLEENCRYPTIONCOUNTINFO_EXISTENT_STATS: 7517103,
    // /** The accumulator state should be an array */
    // ACCUMULATOR_STATE_ARRAY: 7548600,
    // /** The accumulator state should have correct number of elements */
    // ACCUMULATOR_STATE_CORRECT_NUMBER: 7548601,
    // /** Internal array component is not of correct type */
    // INTERNAL_ARRAY_COMPONENT_CORRECT: 7548602,
    // /** MaxSize component should be a 64-bit integer */
    // MAXSIZE_COMPONENT_INTEGER: 7548603,
    // /** Two arrays to merge should have the same MaxSize component */
    // ARRAYS_MERGE_MAXSIZE_COMPONENT: 7548604,
    // /** expected an array */
    // ARRAY_7548605: 7548605,
    // /** parameter 'n' must be coercible to a positive 64-bit integer */
    // PARAMETER_MUST_COERCIBLE_POSITIVE: 7548606,
    // /** Expected one input slot for merging $firstN, got: {?} */
    // FIRST_N_INPUT_SLOT_MERGING: 7548608,
    // /** Expected one input slot for finalization of $firstN, got: {?} */
    // FIRST_N_INPUT_SLOT_FINALIZATION: 7548609,
    // /** MemUsage component should be a 32-bit integer */
    // MEMUSAGE_COMPONENT_INTEGER: 7548612,
    // /** MemLimit component should be a 32-bit integer */
    // MEMLIMIT_COMPONENT_INTEGER: 7548613,
    // /** Index component be a 64-bit integer */
    // INDEX_COMPONENT_INTEGER: 7548700,
    // /** Expected one input slot for merging $lastN, got: {?} */
    // LAST_N_INPUT_SLOT_MERGING: 7548701,
    // /** Expected one input slot for finalization of $lastN, got: {?} */
    // LAST_N_INPUT_SLOT_FINALIZATION: 7548702,
    // /** Two arrays to merge should have the same MaxSize component */
    // ARRAYS_MERGE_MAXSIZE_COMPONENT_7548703: 7548703,
    // /** Heap should contain same number of elements as MaxSize */
    // HEAP_CONTAIN_NUMBER_ELEMENTS: 7548800,
    // /** Two arrays to merge should have the same MaxSize component */
    // ARRAYS_MERGE_MAXSIZE_COMPONENT_7548801: 7548801,
    // /** expected a collator argument */
    // COLLATOR_ARGUMENT: 7548802,
    // /** expected a collator argument */
    // COLLATOR_ARGUMENT_7548803: 7548803,
    // /** expected a collator argument */
    // COLLATOR_ARGUMENT_7548804: 7548804,
    // /** Invalid comparison result */
    // INVALID_COMPARISON_RESULT_7548805: 7548805,
    // /** Expected one input slot for merging, got: {?} */
    // INPUT_SLOT_MERGING: 7548808,
    // /** Expected one input slot for finalization, got: {?} */
    // INPUT_SLOT_FINALIZATION: 7548809,
    // /** $geoNear requires $minDistance to evaluate to a constant number */
    // GEO_NEAR_MIN_DISTANCE_REQUIRES_EVALUATE_CONSTANT: 7555701,
    // /** $geoNear requires $maxDistance to evaluate to a constant number */
    // GEO_NEAR_MAX_DISTANCE_REQUIRES_EVALUATE_CONSTANT: 7555702,
    // /** Failed to combine the 'numByRange' metrics from two shards since one has length {?} and the other one has length {?}{?}{?}. Please retry the command again. */
    // FAILED_COMBINE_NUMBYRANGE: 7559401,
    // /** Index ident slot is not defined */
    // INDEX_IDENT_SLOT_DEFINED: 7566701,
    // /** {?}{?}{?}{?} */
    // UNKNOWN_ERROR_7588600: 7588600,
    // /** $_externalDataSources can't be used with the collectionless aggregate */
    // EXTERNALDATASOURCES_USED_COLLECTIONLESS_AGGREGATE: 7604400,
    // /** {?} must be run through mongos in a sharded cluster */
    // MUST_MONGOS_SHARDED_CLUSTER_7618804: 7618804,
    // /** getQueryableEncryptionCountInfo returned an invalid position for the next anchor */
    // INVALID_GETQUERYABLEENCRYPTIONCOUNTINFO_POSITION_7618815: 7618815,
    // /** {?}{?}{?} */
    // UNKNOWN_ERROR_7618816: 7618816,
    // /** Expected refined key {?} but {?} provided */
    // REFINED: 7648607,
    // /** Expected to find collection {?} with timestamp {?} */
    // FIND_COLLECTION_TIMESTAMP: 7648608,
    // /** ShardDistribution should not be empty */
    // EMPTY_SHARDDISTRIBUTION: 7661501,
    // /** Could not find any shard documents */
    // FIND_SHARD_DOCUMENTS_7661502: 7661502,
    // /** Failed due to fleCompactFailAfterTransactionCommit fail point */
    // FAILED_FLECOMPACTFAILAFTERTRANSACTIONCOMMIT_FAIL: 7663001,
    // /** Failed due to fleCleanupFailAfterTransactionCommit fail point */
    // FAILED_FLECLEANUPFAILAFTERTRANSACTIONCOMMIT_FAIL: 7663002,
    // /** getQueryableEncryptionCountInfo returned an invalid position for the next anchor */
    // INVALID_GETQUERYABLEENCRYPTIONCOUNTINFO_POSITION_7666501: 7666501,
    // /** {?}{?}{?} */
    // UNKNOWN_ERROR_7666502: 7666502,
    // /** ShardDistribution without min/max must not use this split policy. */
    // SHARDDISTRIBUTION_MUST_SPLIT_POLICY: 7679102,
    // /** provided availableShardIds should not be empty */
    // EMPTY_AVAILABLESHARDIDS: 7679103,
    // /** Document already has a field named '{?}' */
    // DOCUMENT_FIELD_NAMED: 7693400,
    // /** Unexpected accumulator state ownership */
    // UNEXPECTED_ACCUMULATOR_STATE: 7695200,
    // /** The accumulator state should be an array */
    // ACCUMULATOR_STATE_ARRAY_7695201: 7695201,
    // /** Internal array component is not of correct type */
    // INTERNAL_ARRAY_COMPONENT_CORRECT_7695202: 7695202,
    // /** MaxSize component should be a 64-bit integer */
    // MAXSIZE_COMPONENT_INTEGER_7695203: 7695203,
    // /** aggregate function call: aggState occurs in the non-aggregate context. */
    // AGGREGATE_FUNCTION_CALL_AGGSTATE: 7695204,
    // /** function call: aggState has wrong arity: {?} */
    // WRONG_FUNCTION_CALL_7695205: 7695205,
    // /** BSON field 'querySettings' is an unknown field */
    // UNKNOWN_BSON_FIELD: 7708001,
    // /** Failing due to fleCleanupFailDuringAnchorDeletes failpoint */
    // FAILING_FLECLEANUPFAILDURINGANCHORDELETES_FAILPOINT: 7723800,
    // /** QueryShape can not be computed for command: {?} */
    // QUERYSHAPE_COMPUTED_COMMAND: 7746402,
    // /** Queries with encryption information are not allowed on setQuerySettings commands */
    // QUERIES_ENCRYPTION_INFORMATION_ALLOWED: 7746600,
    // /** setQuerySettings command is not allowed on queryable encryption state collections */
    // SETQUERYSETTINGS_COMMAND_ALLOWED_QUERYABLE: 7746601,
    // /** the resulting settings cannot be empty or contain only default values */
    // CANNOT_EMPTY_RESULTING_SETTINGS: 7746604,
    // /** Collection namespace string must be provided for setQuerySettings command */
    // COLLECTION_NAMESPACE_STRING_MUST: 7746605,
    // /** setQuerySettings command cannot be used on find queries eligible for IDHACK */
    // CANNOT_SETQUERYSETTINGS_COMMAND: 7746606,
    // /** Collection '{?}' has already index hints specified */
    // COLLECTION_INDEX_HINTS: 7746608,
    // /** $querySettings stage expects a document as argument */
    // QUERY_SETTINGS_STAGE_EXPECTS_DOCUMENT_ARGUMENT: 7746800,
    // /** $querySettings stage expects a document as argument */
    // QUERY_SETTINGS_STAGE_EXPECTS_DOCUMENT_ARGUMENT_7746801: 7746801,
    // /** Pipeline length must be no longer than {?} stages. */
    // PIPELINE_LENGTH_MUST_LONGER_7749501: 7749501,
    // /** {?}{?}. */
    // UNKNOWN_ERROR_7750300: 7750300,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7750301: 7750301,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7750302: 7750302,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7750303: 7750303,
    // /** incorrect size of state array */
    // INCORRECT_SIZE_STATE_ARRAY: 7795101,
    // /** sum accumulator elem should be of array type */
    // ACCUMULATOR_ELEM_ARRAY_TYPE: 7795102,
    // /** nanCount elem should be of int64 type */
    // NANCOUNT_ELEM_INT64_TYPE: 7795103,
    // /** posInfinityCount elem should be of int64 type */
    // POSINFINITYCOUNT_ELEM_INT64_TYPE: 7795104,
    // /** negInfinityCount elem should be of int64 type */
    // NEGINFINITYCOUNT_ELEM_INT64_TYPE: 7795105,
    // /** doubleCount elem should be of int64 type */
    // DOUBLECOUNT_ELEM_INT64_TYPE: 7795106,
    // /** decimalCount elem should be of int64 type */
    // DECIMALCOUNT_ELEM_INT64_TYPE: 7795107,
    // /** state should be of array type */
    // STATE_ARRAY_TYPE: 7795108,
    // /** state should be of array type */
    // STATE_ARRAY_TYPE_7795109: 7795109,
    // /** The accumulator state should be an array */
    // ACCUMULATOR_STATE_ARRAY_7795500: 7795500,
    // /** The accumulator state should have correct number of elements */
    // ACCUMULATOR_STATE_CORRECT_NUMBER_7795501: 7795501,
    // /** Last rank component should be a 64-bit integer */
    // LAST_RANK_COMPONENT_INTEGER: 7795502,
    // /** Same rank component should be a 64-bit integer */
    // RANK_COMPONENT_INTEGER: 7795503,
    // /** duplicate slot: {?} */
    // DUPLICATE_SLOT_7816101: 7816101,
    // /** Input delta should be numeric */
    // INPUT_DELTA_NUMERIC: 7821012,
    // /** Expected an array */
    // ARRAY_7821100: 7821100,
    // /** Expected NumberInt64 type */
    // NUMBERINT64_TYPE: 7821101,
    // /** Expected NumberInt64 type */
    // NUMBERINT64_TYPE_7821102: 7821102,
    // /** The accumulator state should be an array */
    // ACCUMULATOR_STATE_ARRAY_7821103: 7821103,
    // /** The accumulator state should have correct number of elements */
    // ACCUMULATOR_STATE_CORRECT_NUMBER_7821104: 7821104,
    // /** InputQueue should be of array type */
    // INPUTQUEUE_ARRAY_TYPE: 7821105,
    // /** Integral should be of array type */
    // INTEGRAL_ARRAY_TYPE: 7821106,
    // /** nanCount should be of NumberInt64 type */
    // NANCOUNT_NUMBERINT64_TYPE: 7821107,
    // /** unitMillis should be of type NumberInt64 */
    // UNITMILLIS_TYPE_NUMBERINT64: 7821108,
    // /** input value should be of numberic type */
    // INPUT_VALUE_NUMBERIC_TYPE: 7821109,
    // /** Sort-by value should be of date type when unitMillis is provided */
    // SORT_VALUE_DATE_TYPE: 7821110,
    // /** Sort-by value should be of numeric type */
    // SORT_VALUE_NUMERIC_TYPE: 7821111,
    // /** Attempted to remove unexpected input value */
    // UNEXPECTED_REMOVE_INPUT: 7821113,
    // /** Invalid startIdx {?} with array size {?} */
    // INVALID_STARTIDX_ARRAY: 7821114,
    // /** Invalid queueSize {?} with array size {?} */
    // INVALID_QUEUESIZE_ARRAY: 7821115,
    // /** Expected non-empty array */
    // EMPTY_ARRAY: 7821116,
    // /** Attempted to remove unexpected sortby value */
    // UNEXPECTED_REMOVE_SORTBY: 7821117,
    // /** Queue sizes should match */
    // QUEUE_SIZES_MATCH: 7821118,
    // /** Queue sizes should match */
    // QUEUE_SIZES_MATCH_7821119: 7821119,
    // /** Queue sizes should match */
    // QUEUE_SIZES_MATCH_7821120: 7821120,
    // /** SortByQueue should be of array type */
    // SORTBYQUEUE_ARRAY_TYPE: 7821121,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_7821200: 7821200,
    // /** Unexpected state array size */
    // UNEXPECTED_STATE_ARRAY: 7821201,
    // /** alpha is not of decimal type */
    // ALPHA_DECIMAL_TYPE: 7821202,
    // /** currentResultTag is not of decimal type */
    // CURRENTRESULTTAG_DECIMAL_TYPE: 7821203,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_7821204: 7821204,
    // /** Unexpected result type */
    // UNEXPECTED_RESULT_TYPE: 7821205,
    // /** Unexpected isDecimal type */
    // UNEXPECTED_ISDECIMAL_TYPE: 7821206,
    // /** {?} field must be a bool, got: {?} */
    // FIELD_MUST_BOOL_7823300: 7823300,
    // /** view definition must have {?} of type bool or no such field */
    // VIEW_DEFINITION_MUST_TYPE_7823304: 7823304,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7826501: 7826501,
    // /** {?}{?} */
    // UNKNOWN_ERROR_7826502: 7826502,
    // /** Cannot analyze the monotonicity because the number of sampled records is zero */
    // CANNOT_ANALYZE_MONOTONICITY: 7826505,
    // /** Cannot analyze the cardinality and frequency of a shard key for an empty collection */
    // CANNOT_EMPTY_ANALYZE_CARDINALITY: 7826506,
    // /** A uuid is required for a vector search query, but was missing. Got namespace {?} */
    // REQUIRED_MISSING_UUID_VECTOR: 7828001,
    // /** collatorSlot must be of collator type */
    // COLLATORSLOT_MUST_COLLATOR_TYPE_7856006: 7856006,
    // /** Cannot have exchange specified in a $search pipeline */
    // SEARCH_CANNOT_EXCHANGE_PIPELINE: 7856009,
    // /** StoredSource field must exist in mongot response. */
    // STOREDSOURCE_FIELD_MUST_EXIST: 7856301,
    // /** Metadata search score must be double. */
    // METADATA_SEARCH_SCORE_MUST: 7856601,
    // /** Metadata search highlights must be bson array. */
    // METADATA_SEARCH_HIGHLIGHTS_MUST: 7856602,
    // /** Metadata search score details must be bson object. */
    // METADATA_SEARCH_SCORE_DETAILS: 7856603,
    // /** Metadata search sort value must be bson object. */
    // METADATA_SEARCH_SORT_VALUE: 7856604,
    // /** collatorSlot must be of collator type */
    // COLLATORSLOT_MUST_COLLATOR_TYPE_7870801: 7870801,
    // /** Expected limit to be positive */
    // LIMIT_POSITIVE: 7912700,
    // /** Unsupported op in SBE window function builder: {?} */
    // UNSUPPORTED_WINDOW_FUNCTION: 7914604,
    // /** Unsupported op in SBE window function builder: {?} */
    // UNSUPPORTED_WINDOW_FUNCTION_7914605: 7914605,
    // /** Unsupported op in SBE window function builder: {?} */
    // UNSUPPORTED_WINDOW_FUNCTION_7914606: 7914606,
    // /** Collection namespace string must be provided for setQuerySettings command */
    // COLLECTION_NAMESPACE_STRING_MUST_7919501: 7919501,
    // /** BSON field 'querySettings' is an unknown field */
    // UNKNOWN_BSON_FIELD_7923000: 7923000,
    // /** Could not find a collection with the requested namespace */
    // FIND_COLLECTION_REQUESTED_NAMESPACE: 7927100,
    // /** Fail because failClassicSearch is enabled */
    // FAIL_BECAUSE_FAILCLASSICSEARCH_ENABLED: 7942401,
    // /** Only top-level cell values are supported */
    // LEVEL_CELL_VALUES_SUPPORTED: 7953901,
    // /** Cannot specify 'mergeType' of 'specificShard' and not have sharding enabled */
    // CANNOT_SPECIFY_MERGETYPE: 7958301,
    // /** Expected input value type to be numeric or null */
    // INPUT_VALUE_TYPE_NUMERIC: 7971203,
    // /** Expected sortBy value type to be numeric or date */
    // SORTBY_VALUE_TYPE_NUMERIC: 7971204,
    // /** There can be no repeated values in the sort field */
    // REPEATED_VALUES_SORT_FIELD_7971205: 7971205,
    // /** Conflicting sort value types, previous and current types don't match */
    // CONFLICTING_SORT_VALUE_TYPES: 7971206,
    // /** dbcheck hashing extra index keys should be successful if we are logging to healthlog */
    // DBCHECK_HASHING_EXTRA_INDEX: 7985000,
    // /** status should be error after failing multiple retries in wait for write concern */
    // STATUS_ERROR_FAILING_MULTIPLE: 7985001,
    // /** status should never be OK if we are debating retrying extra keys check */
    // STATUS_NEVER_DEBATING_RETRYING: 7985002,
    // /** batchStats.batchStartWithRecordId must be empty if we are setting it */
    // EMPTY_BATCHSTATS_BATCHSTARTWITHRECORDID: 7985005,
    // /** status should never be OK if we are debating retrying data consistency check */
    // STATUS_NEVER_DEBATING_RETRYING_7985006: 7985006,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_7993100: 7993100,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_7993101: 7993101,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_7993102: 7993102,
    // /** unitMillis should be of type NumberInt64 */
    // UNITMILLIS_TYPE_NUMBERINT64_7993408: 7993408,
    // /** Unexpected type for sortBy value */
    // UNEXPECTED_TYPE_SORTBY: 7993409,
    // /** Unexpected type for sortBy value */
    // UNEXPECTED_TYPE_SORTBY_7993410: 7993410,
    // /** isNonRemovable should be of boolean type */
    // ISNONREMOVABLE_BOOLEAN_TYPE: 7996800,
    // /** Expected integral window to be removable */
    // INTEGRAL_WINDOW_REMOVABLE: 7996801,
    // /** $_internalShredDocuments specification must be an object */
    // INTERNALSHREDDOCUMENTS_SPECIFICATION_MUST_OBJECT: 7997500,
    // /** $_internalShredDocuments specification must be empty */
    // EMPTY_INTERNALSHREDDOCUMENTS_SPECIFICATION: 7997501,
    // /** Auto bootstrapped replica set not yet initialized */
    // AUTO_BOOTSTRAPPED_REPLICA_INITIALIZED: 8001600,
    // /** Command can only be run on replica sets */
    // COMMAND_REPLICA_SETS: 8002900,
    // /** Command cannot be run on dedicated shards */
    // CANNOT_COMMAND_DEDICATED: 8002901,
    // /** state should be of array type */
    // STATE_ARRAY_TYPE_8019600: 8019600,
    // /** incorrect size of state array */
    // INCORRECT_SIZE_STATE_ARRAY_8019601: 8019601,
    // /** sum elem should be of array type */
    // ELEM_ARRAY_TYPE: 8019602,
    // /** m2 elem should be of array type */
    // ELEM_ARRAY_TYPE_8019603: 8019603,
    // /** count elem should be of int64 type */
    // COUNT_ELEM_INT64_TYPE: 8019604,
    // /** non finite count elem should be of int64 type */
    // FINITE_COUNT_ELEM_INT64: 8019605,
    // /** Missing JWS delimiter */
    // MISSING_DELIMITER: 8039404,
    // /** Missing JWS delimiter */
    // MISSING_DELIMITER_8039405: 8039405,
    // /** Too many delimiters in JWS token */
    // DELIMITERS_TOKEN: 8039406,
    // /** state should be of array type */
    // STATE_ARRAY_TYPE_8070600: 8070600,
    // /** incorrect size of state array */
    // INCORRECT_SIZE_STATE_ARRAY_8070601: 8070601,
    // /** Queue should be of array type */
    // QUEUE_ARRAY_TYPE: 8070602,
    // /** 'n' elem should be of int64 type */
    // ELEM_INT64_TYPE: 8070603,
    // /** Failed to convert to 64-bit integer */
    // FAILED_CONVERT_INTEGER: 8070607,
    // /** Expected 'n' to be positive */
    // POSITIVE: 8070608,
    // /** $firstN init argument should be a constant */
    // FIRST_N_INIT_ARGUMENT_CONSTANT: 8070609,
    // /** $lastN init argument should be a constant */
    // LAST_N_INIT_ARGUMENT_CONSTANT: 8070610,
    // /** IsGroupAccum component should be a boolean */
    // ISGROUPACCUM_COMPONENT_BOOLEAN: 8070611,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_8070614: 8070614,
    // /** Unsupported op in SBE window function builder: {?} */
    // UNSUPPORTED_WINDOW_FUNCTION_8070615: 8070615,
    // /** Metadata search sequence token must be string */
    // METADATA_SEARCH_SEQUENCE_TOKEN: 8104600,
    // /** Field '{?}' is not valid. */
    // FIELD_VALID: 8109800,
    // /** Parsing stmtId, array element '{?}' is not valid. */
    // PARSING_STMTID_ARRAY_ELEMENT: 8109801,
    // /** Array field name is bogus */
    // ARRAY_FIELD_NAME_BOGUS: 8109802,
    // /** chunkMigrationFetcherMaxBufferedSizeBytesPerThread setting of {?} is too small for received batch size of {?} */
    // CHUNKMIGRATIONFETCHERMAXBUFFEREDSIZEBYTESPERTHREAD_SETTING_SMALL_RECEIVED: 8120100,
    // /** Unsupported cmd specified for multi update: {?} */
    // UNSUPPORTED_MULTI_UPDATE: 8126601,
    // /** Encountered a failover while executing multi update/delete operation. */
    // ENCOUNTERED_FAILOVER_EXECUTING_MULTI: 8126701,
    // /** Invalid number of arguments to getParam() */
    // INVALID_NUMBER_ARGUMENTS_8128700: 8128700,
    // /** the '{?}' spec must be an empty object */
    // EMPTY_SPEC_MUST_8131300: 8131300,
    // /** Expected 'n' to be positive */
    // POSITIVE_8155708: 8155708,
    // /** Failed to convert to 64-bit integer */
    // FAILED_CONVERT_INTEGER_8155711: 8155711,
    // /** $topN/$bottomN init argument should be a constant */
    // TOP_N_BOTTOM_N_INIT_ARGUMENT_CONSTANT: 8155720,
    // /** Failed to convert to 64-bit integer */
    // FAILED_CONVERT_INTEGER_8178107: 8178107,
    // /** Expected 'n' to be positive */
    // POSITIVE_8178108: 8178108,
    // /** The size cap must be of type NumberInt32 */
    // SIZE_MUST_TYPE_NUMBERINT32: 8178109,
    // /** $minN/$maxN init argument should be a constant */
    // MIN_N_MAX_N_INIT_ARGUMENT_CONSTANT: 8178113,
    // /** Expected count to have 64-bit integer type */
    // COUNT_INTEGER_TYPE: 8186801,
    // /** Last rank is nothing component should be a boolean */
    // LAST_RANK_NOTHING_COMPONENT: 8188900,
    // /** Sort spec component should be a sort spec object */
    // SORT_SPEC_COMPONENT_SORT: 8216800,
    // /** The tenantId must be passed explicitely {?}.{?} */
    // TENANTID_MUST_PASSED_EXPLICITELY: 8233501,
    // /** Atlas Proxy protocol must be true when there is a tenantId prefix {?} */
    // ATLAS_PROXY_PROTOCOL_MUST: 8233503,
    // /** Failed to open a session */
    // FAILED_OPEN_SESSION: 8268800,
    // /** key size must not be empty */
    // EMPTY_SIZE_MUST: 8273007,
    // /** $_internalKeyStringValue only supports an object as its argument, not {?} */
    // INTERNALKEYSTRINGVALUE_SUPPORTS_OBJECT_ARGUMENT: 8281500,
    // /** Unrecognized argument to $_internalKeyStringValue: {?} */
    // UNRECOGNIZED_ARGUMENT_INTERNALKEYSTRINGVALUE: 8281501,
    // /** $_internalKeyStringValue requires 'input' to be specified */
    // REQUIRES_INTERNALKEYSTRINGVALUE_INPUT: 8281502,
    // /** Collation spec must be an object, not {?} */
    // COLLATION_SPEC_MUST_OBJECT: 8281503,
    // /** AnyCursor must have exactly one of 'firstBatch' or 'nextBatch' */
    // ANYCURSOR_MUST_EXACTLY_FIRSTBATCH: 8362701,
    // /** Unsupported OS for sysprofile command */
    // UNSUPPORTED_SYSPROFILE_COMMAND: 8387207,
    // /** cannot start migration, shard must run as replica sets */
    // CANNOT_START_MIGRATION: 8393800,
    // /** Failed to finalize a DISTINCT_SCAN plan */
    // FAILED_FINALIZE_DISTINCT: 8404000,
    // /** Argument to {?} must be an object */
    // ARGUMENT_MUST_OBJECT: 8423307,
    // /** Failed to create new oplog entry for oplog with opTime: {?}: {?} */
    // FAILED_CREATE_OPLOG_8423339: 8423339,
    // /** no operation context */
    // OPERATION_CONTEXT: 8423367,
    // /** no current client */
    // CURRENT_CLIENT: 8423368,
    // /** Can not merge analyze pipelines */
    // MERGE_ANALYZE_PIPELINES: 8423374,
    // /** Can not merge analyze pipelines */
    // MERGE_ANALYZE_PIPELINES_8423375: 8423375,
    // /** TenantId must be set on nss {?}.{?} */
    // TENANTID_MUST_8423387: 8423387,
    // /** TenantId must be set on {?} */
    // TENANTID_MUST_8423388: 8423388,
    // /** Total size of the output document exceeds {?} bytes. Consider using $unwind to split the output. */
    // UNWIND_TOTAL_SIZE_OUTPUT_DOCUMENT: 8442700,
    // /** The transition to config shard feature is disabled */
    // TRANSITION_CONFIG_SHARD_FEATURE_8454803: 8454803,
    // /** The transition to config shard feature is disabled */
    // TRANSITION_CONFIG_SHARD_FEATURE_8454804: 8454804,
    // /** Expected valid geojson type, got {?} */
    // VALID_GEOJSON_TYPE: 8459800,
    // /** Expected valid geojson of type string, got non-string type of value {?} */
    // VALID_GEOJSON_TYPE_STRING: 8459801,
    // /** Oldest timestamp {?} is ahead of non-zero stable timestamp {?} */
    // OLDEST_TIMESTAMP_AHEAD_ZERO: 8470600,
    // /** Catalog changed during operation, could not find time series buckets collection for write */
    // CATALOG_CHANGED_OPERATION_FIND: 8555700,
    // /** Catalog changed during operation, missing time-series options */
    // MISSING_CATALOG_CHANGED: 8555701,
    // /** Expected limit field to be a number in $vectorSearch */
    // VECTOR_SEARCH_LIMIT_FIELD_NUMBER: 8575100,
    // /** {?} must be run as a retryable write */
    // MUST_RETRYABLE_WRITE_8577201: 8577201,
    // /** The number of requested distinct values must exist within the provided interval */
    // NUMBER_REQUESTED_DISTINCT_VALUES: 8581501,
    // /** setQuerySettings command cannot be used on internal databases */
    // CANNOT_SETQUERYSETTINGS_COMMAND_8584900: 8584900,
    // /** setQuerySettings command cannot be used on system collections */
    // CANNOT_SETQUERYSETTINGS_COMMAND_8584901: 8584901,
    // /** Failed to resize ticket pool */
    // FAILED_RESIZE_TICKET: 8611200,
    // /** batchStats.batchStartWithRecordId must be empty if we are setting it */
    // EMPTY_BATCHSTATS_BATCHSTARTWITHRECORDID_8632300: 8632300,
    // /** Failed to flush XRay logs: {?} */
    // FAILED_FLUSH_XRAY: 8638302,
    // /** Failed to unpatch XRay: {?} */
    // FAILED_UNPATCH_XRAY: 8638303,
    // /** Failed to finalize XRay logging: {?} */
    // FAILED_FINALIZE_XRAY: 8638304,
    // /** XRay logging not running: {?} */
    // XRAY_LOGGING_RUNNING: 8638305,
    // /** Failed to patch XRay: {?} */
    // FAILED_PATCH_XRAY: 8638307,
    // /** Failed to initialize XRay logging '{?}' : {?} */
    // FAILED_INITIALIZE_XRAY: 8638308,
    // /** Failed to register XRay mode '{?}' : {?} */
    // FAILED_REGISTER_XRAY: 8638309,
    // /** XRay already running: {?} */
    // XRAY_RUNNING: 8638310,
    // /** There can't be duplicate type class bounds. */
    // DUPLICATE_TYPE_CLASS_8674800: 8674800,
    // /** maxArea cannot be a negative value. */
    // CANNOT_MAXAREA_NEGATIVE: 8674811,
    // /** maxAreaDiff cannot be a negative value. */
    // CANNOT_MAXAREADIFF_NEGATIVE: 8674812,
    // /** ValFreq contains invalid values */
    // INVALID_VALFREQ_CONTAINS: 8674813,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_8679702: 8679702,
    // /** Casting accumulator input to expected type failed */
    // FAILED_CASTING_ACCUMULATOR: 8679708,
    // /** Setting {reject:true} is forbidden for query containing stage: {?} */
    // FORBIDDEN_SETTING_QUERY: 8705200,
    // /** invalid index hint: 'ns.db' field is missing */
    // INVALID_MISSING_INDEX_HINT: 8727500,
    // /** invalid index hint: 'ns.coll' field is missing */
    // INVALID_MISSING_INDEX_HINT_8727501: 8727501,
    // /** settings field in setQuerySettings command cannot be empty */
    // CANNOT_EMPTY_SETTINGS_FIELD: 8727502,
    // /** $mergeObjects requires object inputs, but input {?} is of type {?} */
    // MERGE_OBJECTS_REQUIRES_OBJECT_INPUTS_8745900: 8745900,
    // /** Unrecognized AccumulatorOp name: {?} */
    // UNRECOGNIZED_ACCUMULATOROP_NAME: 8751302,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_8751303: 8751303,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_8751304: 8751304,
    // /** Cannot call extract on an UnextractableTestBlock */
    // CANNOT_CALL_EXTRACT: 8776400,
    // /** {?} field must be a bool, got: {?} */
    // FIELD_MUST_BOOL_8796100: 8796100,
    // /** Casting window function input to expected type failed */
    // FAILED_CASTING_WINDOW: 8859900,
    // /** Unrecognized WindowOp name: {?} */
    // UNRECOGNIZED_WINDOWOP_NAME: 8859901,
    // /** Unable to compare bounds */
    // UNABLE_COMPARE_BOUNDS: 8870501,
    // /** Random index out of range */
    // RANDOM_INDEX_RANGE_8871801: 8871801,
    // /** Invalid '{?}' field type (expected String) */
    // INVALID_FIELD_TYPE: 8881100,
    // /** Invalid '{?}' field type (expected Object) */
    // INVALID_FIELD_TYPE_8881101: 8881101,
    // /** Failed to parse the oldest oplog entry{?} */
    // FAILED_PARSE_OLDEST: 8881102,
    // /** tried to kill a cursor {?} belonging to txn {?} while in txn {?} of session {?} */
    // TRIED_KILL_CURSOR_BELONGING: 8912321,
    // /** tried to kill a cursor {?} belonging to session {?} while in txn {?} of session {?} */
    // TRIED_KILL_CURSOR_BELONGING_8912345: 8912345,
    // /** Range-based bounds require a non-expression sortBy */
    // RANGE_BASED_BOUNDS_REQUIRE_8947400: 8947400,
    // /** Range-based bounds require an ascending sortBy */
    // RANGE_BASED_BOUNDS_REQUIRE_8947401: 8947401,
    // /** Failed to await ongoing migrations before removing catalog shard */
    // FAILED_AWAIT_ONGOING: 8955101,
    // /** invalid $_internalLimit value: {?} */
    // INVALID_INTERNALLIMIT_VALUE: 9028702,
    // /** the count field cannot be '_id' */
    // CANNOT_COUNT_FIELD_9039800: 9039800,
    // /** Found a user collection to clone: {?} */
    // USER_COLLECTION_CLONE: 9046501,
    // /** Prefetched result slot is not defined */
    // PREFETCHED_RESULT_SLOT_DEFINED: 9081801,
    // /** $convert requires that 'byteOrder' be a string, found: {?} with value {?} */
    // CONVERT_REQUIRES_BYTEORDER_STRING: 9130001,
    // /** Invalid 'byteOrder' argument for $convert: {?} */
    // CONVERT_INVALID_BYTEORDER_ARGUMENT: 9130002,
    // /** Currently only 'approximate', 'discrete', and 'continuous' percentiles are supported */
    // APPROXIMATE_DISCRETE_CONTINUOUS_PERCENTILES_9157900: 9157900,
    // /** Array histograms should contain at least one array */
    // ARRAY_HISTOGRAMS_CONTAIN_ARRAY: 9160701,
    // /** At least one of the values needs to be true. */
    // VALUES_NEEDS_TRUE: 9163901,
    // /** No known arguments - must be an empty object */
    // EMPTY_KNOWN_ARGUMENTS: 9182101,
    // /** Expected to have a transaction resource stash when unyielding, but did not. */
    // TRANSACTION_RESOURCE_STASH_UNYIELDING: 9183900,
    // /** {?} {?} */
    // UNKNOWN_ERROR_9191100: 9191100,
    // /** {?} Only stages that retrieve, limit, or order documents are allowed. */
    // STAGES_RETRIEVE_LIMIT_ORDER: 9191103,
    // /** Cannot define variables with the same name {?} */
    // CANNOT_DEFINE_VARIABLES: 9298401,
    // /** Accumulator is out of memory but expression context does not permit spilling to disk. */
    // ACCUMULATOR_MEMORY_EXPRESSION_CONTEXT: 9299404,
    // /** Resharded collection missing source collection index: {?} */
    // MISSING_RESHARDED_COLLECTION: 9365601,
    // /** Resharded collection created non-matching index. Source spec: {?} Resharded collection spec: {?} */
    // RESHARDED_COLLECTION_CREATED_MATCHING: 9365602,
    // /** Unexpected value type */
    // UNEXPECTED_VALUE_TYPE_9370100: 9370100,
    // /** Unexpected value type */
    // UNEXPECTED_VALUE_TYPE_9370101: 9370101,
    // /** 'as' and 'arrayIndexAs' cannot have the same name */
    // CANNOT_ARRAYINDEXAS_NAME: 9375801,
    // /** 'as' and 'arrayIndexAs' cannot have the same name */
    // CANNOT_ARRAYINDEXAS_NAME_9375802: 9375802,
    // /** $scoreFusion pipeline names must be unique, but found duplicate name '{?}'. */
    // SCORE_FUSION_DUPLICATE_PIPELINE_NAMES: 9402203,
    // /** {?} {?} */
    // UNKNOWN_ERROR_9402500: 9402500,
    // /** {?} Only stages that retrieve, limit, or order documents are allowed. */
    // STAGES_RETRIEVE_LIMIT_ORDER_9402502: 9402502,
    // /** $scoreFusion input pipeline cannot be empty. {?} */
    // SCORE_FUSION_CANNOT_EMPTY_INPUT_PIPELINE: 9402503,
    // /** Margin of error should be larger than 0. */
    // MARGIN_ERROR_LARGER: 9406301,
    // /** $currentDate not allowed inside collection validators */
    // CURRENT_DATE_ALLOWED_INSIDE_COLLECTION_VALIDATORS: 9428200,
    // /** $currentDate does not currently accept arguments */
    // CURRENT_DATE_ACCEPT_ARGUMENTS: 9428201,
    // /** {?}'s pipeline weight must be non-negative, but given {?} for pipeline '{?}'. */
    // PIPELINE_WEIGHT_MUST_NEGATIVE: 9460300,
    // /** State should be of array type */
    // STATE_ARRAY_TYPE_9476007: 9476007,
    // /** NaN Ratio must be in [0, 1]. */
    // RATIO_MUST: 9497300,
    // /** The sum of NaN Ratio and nullsRatio must be in [0, 1]. */
    // RATIO_NULLSRATIO_MUST: 9497301,
    // /** {?} must take a nested empty object but found: {?} */
    // EMPTY_MUST_TAKE: 9525805,
    // /** The {?} stage must be run against a database */
    // STAGE_MUST_AGAINST_DATABASE: 9525806,
    // /** Cannot call prev() on an iterator for an empty ChunkMap. */
    // CANNOT_EMPTY_CALL_PREV: 9526304,
    // /** Cannot advance an end() ChunkMap iterator */
    // CANNOT_ADVANCE_CHUNKMAP: 9526305,
    // /** {?}: 'field' cannot contain an embedded null byte */
    // CANNOT_FIELD_CONTAIN_9534700: 9534700,
    // /** Expected an atClusterTime in find FCV response */
    // ATCLUSTERTIME_FIND_RESPONSE: 9565401,
    // /** {?} supports an object as its argument */
    // SUPPORTS_OBJECT_ARGUMENT_9567000: 9567000,
    // /** {?} requires 'ns' argument to be an string */
    // REQUIRES_ARGUMENT_STRING: 9567001,
    // /** {?} requires 'shardVersion' argument to be an object */
    // REQUIRES_SHARDVERSION_ARGUMENT: 9567002,
    // /** {?} requires 'shardKeyVal' argument to be an object */
    // REQUIRES_SHARDKEYVAL_ARGUMENT: 9567003,
    // /** {?} requires argument to be a string */
    // REQUIRES_ARGUMENT_STRING_9567004: 9567004,
    // /** timeField must not contain an embedded null byte */
    // TIMEFIELD_MUST_CONTAIN_EMBEDDED: 9568701,
    // /** metaField field must not contain an embedded null byte */
    // METAFIELD_FIELD_MUST_CONTAIN: 9568702,
    // /** timeField must not contain an embedded null byte */
    // TIMEFIELD_MUST_CONTAIN_EMBEDDED_9568703: 9568703,
    // /** metaField field must not contain an embedded null byte */
    // METAFIELD_FIELD_MUST_CONTAIN_9568704: 9568704,
    // /** include or exclude field element must not contain an embedded null byte */
    // INCLUDE_EXCLUDE_FIELD_ELEMENT_9568705: 9568705,
    // /** computedMetaProjFields field must not contain an embedded null byte */
    // COMPUTEDMETAPROJFIELDS_FIELD_MUST_CONTAIN: 9568706,
    // /** Missing sessionId for oplog entry: {?} */
    // MISSING_SESSIONID_OPLOG: 9572401,
    // /** dropDatabase is not allowed inside nested applyOps */
    // DROPDATABASE_ALLOWED_INSIDE_NESTED: 9585500,
    // /** expected an object as specification for {?} stage, got {?} */
    // OBJECT_SPECIFICATION_STAGE_9590101: 9590101,
    // /** The $listClusterCatalog stage must run on a database, not a collection. */
    // LIST_CLUSTER_CATALOG_STAGE_MUST_DATABASE_COLLECTION: 9621301,
    // /** {?} must take an object but found: {?} */
    // MUST_TAKE_OBJECT: 9621302,
    // /** Could not restore collection cursor for fetching DISTINCT_SCAN */
    // RESTORE_COLLECTION_CURSOR_FETCHING: 9623400,
    // /** Index is not replicated and queryable within the max timeout */
    // INDEX_REPLICATED_QUERYABLE_TIMEOUT: 9638406,
    // /** key pattern index can't be empty */
    // EMPTY_PATTERN_INDEX: 9646000,
    // /** Value for '{?}' must be a non-empty object */
    // EMPTY_VALUE_MUST: 9657900,
    // /** Number of results processed by the partitions is not equal to the number of results. */
    // NUMBER_RESULTS_PROCESSED_PARTITIONS: 9670400,
    // /** Bucket count is not equal to thread count. */
    // BUCKET_COUNT_EQUAL_THREAD: 9670401,
    // /** {?}Expected first test line of {?} to match the test name, but got {?} */
    // FIRST_TEST_LINE_MATCH: 9670402,
    // /** {?}Expected results but found none for testNum {?} */
    // RESULTS_NONE_TESTNUM: 9670406,
    // /** {?}Expected newline in context '{?}' but got {?} */
    // NEWLINE_CONTEXT: 9670410,
    // /** {?}Expected single database, got multiple in {?}. Databases are {?} */
    // SINGLE_DATABASE_MULTIPLE_DATABASES: 9670411,
    // /** Expected exactly one host/port in the given URI */
    // EXACTLY_HOST_PORT: 9670412,
    // /** Conn is not still connected */
    // CONN_CONNECTED: 9670414,
    // /** {?}Error setting up listener: {?} */
    // ERROR_SETTING_LISTENER: 9670415,
    // /** {?}Failed to execute test number {?}. Expected OK command result but got {?} */
    // FAILED_EXECUTE_TEST: 9670416,
    // /** Expected at least one collection to be required. Has the file been read? */
    // REQUIRED_COLLECTION_FILE: 9670419,
    // /** {?}Expected OK command result from {?} but got {?} */
    // COMMAND_RESULT: 9670420,
    // /** Only valid options for --mode are 'run', 'compare', and 'normalize' */
    // VALID_OPTIONS_MODE_COMPARE: 9670422,
    // /** {?}Expected test line for test #{?} but got {?} */
    // TEST_LINE_TEST: 9670423,
    // /** {?}Expected collection file name to end in .coll, but it is {?} */
    // COLLECTION_FILE_NAME_COLL: 9670429,
    // /** {?}Expected token 'as' after collection name, but got {?} */
    // TOKEN_COLLECTION_NAME: 9670430,
    // /** {?}Unexpected empty line. */
    // UNEXPECTED_EMPTY_LINE: 9670431,
    // /** {?}Expected newline at end of header for file {?} */
    // NEWLINE_HEADER_FILE: 9670432,
    // /** {?}Expected result set to be of type array, but got {?} */
    // RESULT_TYPE_ARRAY: 9670433,
    // /** Writeout is not supported for that --out argument. */
    // WRITEOUT_SUPPORTED_ARGUMENT: 9670436,
    // /** {?}Test file name must end in .test, not {?} */
    // TEST_FILE_NAME_MUST: 9670437,
    // /** {?}Test file does not exist: {?} */
    // TEST_FILE_EXIST: 9670438,
    // /** {?}A corresponding .results file must exist in compare mode for {?} */
    // CORRESPONDING_RESULTS_FILE_MUST: 9670439,
    // /** Must have run query file before writing out result file */
    // MUST_QUERY_FILE_WRITING: 9670450,
    // /** Non-test line should be either a '#' or a '# NAME' */
    // TEST_LINE_NAME: 9670451,
    // /** {?}Unexpected write opt {?} */
    // UNEXPECTED_WRITE: 9670453,
    // /** {?}Error while operating on {?} with error \" {?}\": {?} */
    // ERROR_OPERATING_ERROR: 9670454,
    // /** {?}URI Parsing failed with message {?} */
    // FAILED_PARSING_MESSAGE: 9670455,
    // /** {?}Unexpected test type {?} */
    // UNEXPECTED_TEST_TYPE: 9670456,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9692105: 9692105,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9692106: 9692106,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9692107: 9692107,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9692110: 9692110,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9692111: 9692111,
    // /** Failed to connect to mongod in a connection-using mode. */
    // FAILED_CONNECT_MONGOD: 9699400,
    // /** {?}Failed to extract {?}{?} */
    // FAILED_EXTRACT: 9699501,
    // /** Test {?} does not exist. */
    // TEST_EXIST: 9699600,
    // /** {?}requires an integral {?}, found a value of type: {?}, with value: {?} */
    // REQUIRES_INTEGRAL_VALUE_9711600: 9711600,
    // /** {?} requires a nonnegative {?}, found: {?} */
    // REQUIRES_NONNEGATIVE_9711601: 9711601,
    // /** Misplaced call to 'emit' */
    // MISPLACED_CALL_EMIT: 9712400,
    // /** wiredTigerCursorCacheSize parameter value must be <= 0 */
    // WIREDTIGERCURSORCACHESIZE_PARAMETER_VALUE_MUST: 9728400,
    // /** {?}Unexpected diff style {?} */
    // UNEXPECTED_DIFF_STYLE: 9764301,
    // /** Dereferencing invalid HashRoaringSet Iterator */
    // INVALID_DEREFERENCING_HASHROARINGSET: 9774502,
    // /** Comparing iterators from two different HashRoaringSet */
    // COMPARING_ITERATORS_HASHROARINGSET: 9774503,
    // /** {?}{?} Resharded collection options: {?} */
    // RESHARDED_COLLECTION_OPTIONS: 9799200,
    // /** direct estimation of $elemMatch is currently only supported for heuristicCE */
    // ELEM_MATCH_DIRECT_ESTIMATION_SUPPORTED_HEURISTICCE: 9808601,
    // /** Cannot overwrite an existing namespace with a different value */
    // CANNOT_OVERWRITE_EXISTING: 9825500,
    // /** $rankFusion input pipeline cannot be empty. {?} */
    // RANK_FUSION_CANNOT_EMPTY_INPUT_PIPELINE: 9834300,
    // /** {?}Failed to extract pickle file to json for feature processing for file {?} */
    // FAILED_EXTRACT_PICKLE: 9836400,
    // /** Expected the collection cloner resume data document for the donor {?} to have the number of documents cloned */
    // COLLECTION_CLONER_RESUME_DATA: 9849002,
    // /** Expected the collection cloner resume data document for the donor {?} to have the number of bytes cloned */
    // COLLECTION_CLONER_RESUME_DATA_9849003: 9849003,
    // /** {?}{?}' should contain at most one document but it contains {?} documents . */
    // CONTAIN_DOCUMENT_CONTAINS_DOCUMENTS_9858102: 9858102,
    // /** {?}{?}' does not have the field 'count' set. */
    // FIELD_COUNT: 9858103,
    // /** Could not find the coordinator document for the resharding operation {?} */
    // FIND_COORDINATOR_DOCUMENT_RESHARDING: 9858105,
    // /** No resharding operation in progress with uuid {?} */
    // RESHARDING_OPERATION_PROGRESS_UUID: 9858406,
    // /** No resharding operation in progress with uuid {?} */
    // RESHARDING_OPERATION_PROGRESS_UUID_9858407: 9858407,
    // /** Field name can't contain null bytes */
    // FIELD_NAME_CONTAIN_NULL: 9867600,
    // /** {?}{?} */
    // UNKNOWN_ERROR_9881700: 9881700,
    // /** $rankFusion pipeline names must be unique, but found duplicate name '{?}'. */
    // RANK_FUSION_DUPLICATE_PIPELINE_NAMES: 9921000,
    // /** The number of documents to copy from the donor shard '{?}' is {?} but the number of documents copied is {?} */
    // NUMBER_DOCUMENTS_COPY_DONOR: 9929901,
    // /** {?} documents were copied from the shard '{?}' which is not expected to be a donor shard */
    // DOCUMENTS_COPIED_SHARD_DONOR: 9929902,
    // /** The number of documents in the original collection is {?} but the number of documents in the resharding temporary collection is {?} */
    // NUMBER_DOCUMENTS_ORIGINAL_COLLECTION: 9929906,
    // /** {?}{?}' */
    // UNKNOWN_ERROR_9929907: 9929907,
    // /** {?}{?}' to have the number of documents copied */
    // NUMBER_DOCUMENTS_COPIED: 9929909,
    // /** $currentDate does not currently accept arguments */
    // CURRENT_DATE_ACCEPT_ARGUMENTS_9940500: 9940500,
    // /** Exceeded maximum time {?} while processing namespace {?} */
    // EXCEEDED_MAXIMUM_TIME: 9944001,
    // /** {?}{?}{?}, but got {?} */
    // UNKNOWN_ERROR_9948600: 9948600,
    // /** Unexpected type on the merging pass of the {?}. This likely happened due to a malformed query. */
    // UNEXPECTED_TYPE_MERGING: 9961600,
    // /** A pipeline named '{?}' is specified more than once in the {?}'combinations.weight' object. */
    // PIPELINE_NAMED_ONCE_COMBINATIONS: 9967401,
    // /** Failed to create new oplog entry for createDatabaseMetadata  with opTime: {?}: {?} */
    // FAILED_CREATE_OPLOG_9980400: 9980400,
    // /** Failed to create new oplog entry for dropDatabaseMetadata with opTime: {?}: {?} */
    // FAILED_CREATE_OPLOG_9980401: 9980401,
    // /** Command can only be run on replica sets */
    // COMMAND_REPLICA_SETS_9992000: 9992000,
    // /** both combination.expression and combination.weights cannot be specified */
    // CANNOT_COMBINATION_EXPRESSION: 10017301,
    // /** Duplicate parsers ({?}) registered. */
    // DUPLICATE_PARSERS_REGISTERED: 10021101,
    // /** Invalid request of escNss for unencrypted collection */
    // INVALID_REQUEST_ESCNSS: 10026006,
    // /** Unexpected empty nssEsc for QE schema */
    // UNEXPECTED_EMPTY_NSSESC_SCHEMA: 10026007,
    // /** system variable $$CLUSTER_TIME is not available in standalone mode */
    // CLUSTER_SYSTEM_VARIABLE_TIME_AVAILABLE: 10071200,
    // /** $createUUID not allowed inside collection validators */
    // CREATE_UUID_ALLOWED_INSIDE_COLLECTION_VALIDATORS: 10081900,
    // /** $createUUID does not accept arguments */
    // CREATE_UUID_ACCEPT_ARGUMENTS: 10081901,
    // /** ExpressionEncTextSearch expects a valid field path expression as its input. */
    // EXPRESSIONENCTEXTSEARCH_EXPECTS_VALID_FIELD: 10111800,
    // /** ExpressionEncTextSearch expects a constant literal. */
    // EXPRESSIONENCTEXTSEARCH_EXPECTS_CONSTANT_LITERAL: 10111801,
    // /** Unexpected value type found on encrypted text search on field '{?}'. */
    // UNEXPECTED_VALUE_TYPE_10111802: 10111802,
    // /** ExpressionEncStrStartsWith can't be evaluated without binary payload */
    // EXPRESSIONENCSTRSTARTSWITH_EVALUATED_BINARY_PAYLOAD: 10111803,
    // /** ExpressionEncStrStartsWith can't be evaluated without binary payload */
    // EXPRESSIONENCSTRSTARTSWITH_EVALUATED_BINARY_PAYLOAD_10111808: 10111808,
    // /** Unexpected encrypted bindata type found on encrypted text search on field '{?}'. */
    // UNEXPECTED_ENCRYPTED_BINDATA: 10112803,
    // /** ExpressionEncStrEndsWith can't be evaluated without binary payload */
    // EXPRESSIONENCSTRENDSWITH_EVALUATED_BINARY_PAYLOAD: 10120900,
    // /** ExpressionEncStrEndsWith can't be evaluated without binary payload */
    // EXPRESSIONENCSTRENDSWITH_EVALUATED_BINARY_PAYLOAD_10120901: 10120901,
    // /** _shardsvrFetchCollMetadata can only run when migrations are disabled */
    // SHARDSVRFETCHCOLLMETADATA_MIGRATIONS_DISABLED: 10140200,
    // /** $rankFusion/$scoreFusion can only be the first stage of an aggregation pipeline. */
    // RANK_FUSION_SCORE_FUSION_FIRST_STAGE_AGGREGATION: 10170100,
    // /** Expected '{?}' to be available */
    // AVAILABLE: 10178201,
    // /** Expected '{?}' to be non-empty */
    // EMPTY: 10178202,
    // /** ExpressionEncStrContains can't be evaluated without binary payload */
    // EXPRESSIONENCSTRCONTAINS_EVALUATED_BINARY_PAYLOAD: 10208800,
    // /** ExpressionEncStrContains can't be evaluated without binary payload */
    // EXPRESSIONENCSTRCONTAINS_EVALUATED_BINARY_PAYLOAD_10208801: 10208801,
    // /** Expected the resume token to be non-empty */
    // EMPTY_RESUME_TOKEN: 10220100,
    // /** ExpressionEncStrNormalizedEq can't be evaluated without binary payload */
    // EXPRESSIONENCSTRNORMALIZEDEQ_EVALUATED_BINARY_PAYLOAD: 10255700,
    // /** ExpressionEncStrNormalizedEq can't be evaluated without binary payload */
    // EXPRESSIONENCSTRNORMALIZEDEQ_EVALUATED_BINARY_PAYLOAD_10255705: 10255705,
    // /** {?}{?}: {?} */
    // UNKNOWN_ERROR_10281501: 10281501,
    // /** expected to be called within a retryable write */
    // CALLED_RETRYABLE_WRITE: 10281502,
    // /** bad --replSet seed hostname (could not parse to HostAndPort) */
    // BAD_REPLSET_SEED: 10283301,
    // /** bad --replSet command line config string (has duplicate seeds) */
    // BAD_DUPLICATE_REPLSET_COMMAND: 10283302,
    // /** can't use localhost in replset seed host list */
    // LOCALHOST_REPLSET_SEED_HOST: 10283303,
    // /** bad --replSet command line config string (empty) */
    // BAD_EMPTY_REPLSET_COMMAND: 10283305,
    // /** Attempted to access RoutingContext for undeclared namespace {?} */
    // ACCESS_ROUTINGCONTEXT_UNDECLARED_NAMESPACE: 10292301,
    // /** versionContext is not allowed inside nested applyOps */
    // VERSIONCONTEXT_ALLOWED_INSIDE_NESTED: 10296501,
    // /** _shardsvrFetchCollMetadata expected to be called within a retryable write */
    // SHARDSVRFETCHCOLLMETADATA_CALLED_RETRYABLE_WRITE: 10303100,
    // /** Expected to match {?} docs, but only matched {?} for write request {?} */
    // MATCH_DOCS_MATCHED_WRITE_10323900: 10323900,
    // /** Could not find the coordinator document for the resharding operation {?} */
    // FIND_COORDINATOR_DOCUMENT_RESHARDING_10323901: 10323901,
    // /** SSLPeerInfo is not set when generating user cache key */
    // SSLPEERINFO_GENERATING_USER_CACHE: 10355702,
    // /** First argument to getParam() must be a 32-bit integer constant */
    // FIRST_ARGUMENT_GETPARAM_MUST: 10367400,
    // /** the '{?}' object spec must be an object */
    // OBJECT_SPEC_MUST_OBJECT_10384000: 10384000,
    // /** Invalid override option: {?} */
    // INVALID_OVERRIDE_OPTION: 10387100,
    // /** Unexpected override type */
    // UNEXPECTED_OVERRIDE_TYPE: 10387102,
    // /** {?}{?}{?} */
    // UNKNOWN_ERROR_10387200: 10387200,
    // /** Provided value: {?}, does not have a subtype, but $subtype was used. */
    // SUBTYPE_VALUE_USED: 10389300,
    // /** Field paths cannot contain more than 255 '.' */
    // CANNOT_FIELD_PATHS: 10396001,
    // /** Field paths cannot contain more than 255 '.' */
    // CANNOT_FIELD_PATHS_10396002: 10396002,
    // /** Arguments to {?} must be arrays or binData vectors, but found type: {?} */
    // ARGUMENTS_MUST_ARRAYS_BINDATA: 10413200,
    // /** Arguments to {?} must be the same size, but the first is of size {?} and the second is of size {?} */
    // ARGUMENTS_MUST_SIZE_FIRST: 10413202,
    // /** All elements in the first argument to {?} must be numeric or boolean */
    // ELEMENTS_FIRST_ARGUMENT_MUST: 10413203,
    // /** All elements in the second argument to {?} must be numeric or boolean */
    // ELEMENTS_SECOND_ARGUMENT_MUST: 10413204,
    // /** vectors must be an array of expressions, but found {?} */
    // VECTORS_MUST_ARRAY_EXPRESSIONS: 10413205,
    // /** score must be a boolean, but found {?} */
    // SCORE_MUST_BOOLEAN: 10413206,
    // /** {?} found an unknown argument: {?} */
    // UNKNOWN_ARGUMENT_10413207: 10413207,
    // /** {?} only supports an object or array as an argument, but found{?} */
    // SUPPORTS_OBJECT_ARRAY_ARGUMENT: 10413208,
    // /** {?} requires exactly two vectors */
    // REQUIRES_EXACTLY_VECTORS: 10413209,
    // /** {?} only supported input is the integer 1, but found {?} */
    // SUPPORTED_INPUT_INTEGER: 10445700,
    // /** Invalid capped size in collection options */
    // INVALID_CAPPED_SIZE: 10455500,
    // /** Timeseries options must be a document */
    // TIMESERIES_OPTIONS_MUST_DOCUMENT: 10455501,
    // /** StorageEngine must be a document */
    // STORAGEENGINE_MUST_DOCUMENT: 10455502,
    // /** StorageEngine.{?} must be an embedded document */
    // STORAGEENGINE_MUST_EMBEDDED_DOCUMENT: 10455503,
    // /** $rankFusion input pipeline has a nested hybrid search stage ($rankFusion/$scoreFusion). {?} */
    // RANK_FUSION_INPUT_PIPELINE_NESTED_HYBRID: 10473002,
    // /** {?}{?} */
    // UNKNOWN_ERROR_10473003: 10473003,
    // /** 'input' argument to $minMaxScaler must evaluate to a numeric type, got: {?} */
    // MIN_MAX_SCALER_INPUT_ARGUMENT_MUST_EVALUATE: 10487000,
    // /** 'input' argument to $minMaxScaler must evaluate to a numeric type, got: {?} */
    // MIN_MAX_SCALER_INPUT_ARGUMENT_MUST_EVALUATE_10487001: 10487001,
    // /** 'input' argument to $minMaxScaler must evaluate to a numeric type, got: {?} */
    // MIN_MAX_SCALER_INPUT_ARGUMENT_MUST_EVALUATE_10487004: 10487004,
    // /** Resharding completed with non-empty stash collections */
    // EMPTY_RESHARDING_COMPLETED_10494621: 10494621,
    // /** Expecting valid, unique event names in 'supportedEvents' */
    // EXPECTING_VALID_UNIQUE_EVENT: 10498500,
    // /** {?}{?} */
    // UNKNOWN_ERROR_10503900: 10503900,
    // /** {?} requires that 'find' be a string, found: {?} */
    // REQUIRES_FIND_STRING: 10503901,
    // /** {?} requires that 'replacement' be a string, found: {?} */
    // REQUIRES_REPLACEMENT_STRING: 10503902,
    // /** {?} requires that 'find' be a string or regular expression, found: {?} */
    // REQUIRES_FIND_STRING_10503903: 10503903,
    // /** {?} requires that 'input' be a string, found: {?} */
    // REQUIRES_INPUT_STRING_10503904: 10503904,
    // /** binData length invalid */
    // INVALID_BINDATA_LENGTH: 10506601,
    // /** BinData vector of type FLOAT32 has a length that is not a multiple of 4 */
    // BINDATA_VECTOR_TYPE_FLOAT32: 10506602,
    // /** Padding must be between 0 and 7 for PACKED_BIT vectors, or 0 otherwise */
    // PADDING_MUST_PACKED_VECTORS: 10506606,
    // /** $convert from BinData vector to BSON array is not enabled */
    // CONVERT_BINDATA_VECTOR_BSON_ARRAY: 10506607,
    // /** $convert from BSON array to BinData vector is not enabled */
    // CONVERT_BSON_ARRAY_BINDATA_VECTOR: 10506608,
    // /** Conversion of {?} elements to {?} bindata vector might overflow. */
    // OVERFLOW_CONVERSION_ELEMENTS: 10506610,
    // /** Expected to match 0 or 1 docs, but matched {?} for delete request {?} */
    // MATCH_DOCS_MATCHED_DELETE: 10541700,
    // /** $rankFusion and $scoreFusion are unsupported on timeseries collections */
    // RANK_FUSION_SCORE_FUSION_UNSUPPORTED_TIMESERIES_COLLECTIONS: 10557301,
    // /** {?} is unsupported for timeseries collections */
    // UNSUPPORTED_TIMESERIES_COLLECTIONS: 10557302,
    // /** Failed to parse $transformStage, missing boolean field \"foo\" */
    // TRANSFORM_STAGE_FAILED_MISSING_PARSE_BOOLEAN: 10596407,
    // /** Failed with uassert in $noOpExtension parse. */
    // NO_OP_EXTENSION_FAILED_UASSERT_PARSE: 10596408,
    // /** Failed with uassert in $noOpExtension parse. */
    // NO_OP_EXTENSION_FAILED_UASSERT_PARSE_10596409: 10596409,
    // /** queue should not be empty */
    // EMPTY_QUEUE: 10612400,
    // /** cluster time should be equal to expected cluster time. expected: {?}, actual: {?} */
    // CLUSTER_TIME_EQUAL_CLUSTER: 10612401,
    // /** the '{?}' spec must be an empty object */
    // EMPTY_SPEC_MUST_10612600: 10612600,
    // /** $rankFusion input pipelines must not contain a $score stage. */
    // RANK_FUSION_SCORE_INPUT_PIPELINES_MUST: 10614800,
    // /** Loading extension '{?}' failed: {?} */
    // FAILED_LOADING_EXTENSION: 10615500,
    // /** Loading extension '{?}' failed: {?} */
    // FAILED_LOADING_EXTENSION_10615501: 10615501,
    // /** Failed to load extension '{?}': get_mongodb_extension failed to set an extension */
    // FAILED_LOAD_EXTENSION: 10615503,
    // /** {?}Failed to load extension: Invalid API major version; expected {?} to match one of the host major versions */
    // FAILED_INVALID_LOAD_EXTENSION: 10615504,
    // /** {?}Failed to load extension: Incompatible API minor version; expected {?} to be no greater than the maximum minor version for major version {?} */
    // FAILED_LOAD_EXTENSION_10615505: 10615505,
    // /** {?}{?} is not allowed */
    // ALLOWED: 10623000,
    // /** {?}$match stage can only contain $expr */
    // MATCH_EXPR_STAGE_CONTAIN: 10623001,
    // /** {?}Modifying _id field is not allowed */
    // MODIFYING_FIELD_ALLOWED: 10623002,
    // /** {?}{?} is not allowed */
    // ALLOWED_10623003: 10623003,
    // /** {?}Using variables like $$NOW, $$CLUSTER_TIME, or $$USER_ROLES is not allowed */
    // NOW_CLUSTER_USING_VARIABLES_LIKE: 10623004,
    // /** {?}Overriding the CURRENT variable is not allowed */
    // OVERRIDING_CURRENT_VARIABLE_ALLOWED: 10623005,
    // /** Cannot update the average time to fetch oplog entries for '{?}' since it has not been registered */
    // CANNOT_UPDATE_AVERAGE: 10626502,
    // /** Cannot get the average time to fetch oplog entries for '{?}' since it has not been registered */
    // CANNOT_AVERAGE_TIME: 10626503,
    // /** Cannot update the average time to apply oplog entries for '{?}' since it has not been registered */
    // CANNOT_UPDATE_AVERAGE_10626504: 10626504,
    // /** Cannot get the average time to apply oplog entries for '{?}' since it has not been registered */
    // CANNOT_AVERAGE_TIME_10626505: 10626505,
    // /** Collection {?} must be empty before copying indexes */
    // EMPTY_COLLECTION_MUST: 10659000,
    // /** Failed to write packet in new file */
    // FAILED_WRITE_PACKET: 10670200,
    // /** Min spill engine cache size cannot be greater than max spill engine cache size */
    // CANNOT_SPILL_ENGINE: 10698700,
    // /** container ops must specify a container field */
    // CONTAINER_MUST_SPECIFY_CONTAINER: 10704701,
    // /** delete should not contain value: {?} */
    // DELETE_CONTAIN_VALUE: 10704704,
    // /** sideWritesIdent is not provided */
    // SIDEWRITESIDENT: 10709201,
    // /** skippedRecordsIdent is not provided */
    // SKIPPEDRECORDSIDENT: 10709202,
    // /** constraintViolationsIdent is not provided */
    // CONSTRAINTVIOLATIONSIDENT: 10709203,
    // /** BSON field 'originalQueryShapeHash' is an unknown field */
    // UNKNOWN_BSON_FIELD_10742702: 10742702,
    // /** BSON field 'originalQueryShapeHash' is an unknown field */
    // UNKNOWN_BSON_FIELD_10742706: 10742706,
    // /** $hash requires that 'input' be a valid UTF-8 string or binData, found: {?} with value {?} */
    // HASH_REQUIRES_INPUT_VALID: 10754000,
    // /** $hash requires that 'algorithm' be a string, found: {?} with value {?} */
    // HASH_REQUIRES_ALGORITHM_STRING: 10754001,
    // /** {?}{?} */
    // UNKNOWN_ERROR_10754002: 10754002,
    // /** The md5 algorithm for $hash is disabled while in FIPS mode */
    // HASH_ALGORITHM_DISABLED_FIPS_MODE: 10754003,
    // /** Trying to remove a recordId of size {?} from a hashset of total size {?} */
    // TRYING_REMOVE_RECORDID_SIZE: 10762700,
    // /** $rankFusion and $scoreFusion are unsupported on timeseries collections */
    // RANK_FUSION_SCORE_FUSION_UNSUPPORTED_TIMESERIES_COLLECTIONS_10787900: 10787900,
    // /** $rankFusion and $scoreFusion are unsupported on timeseries collections */
    // RANK_FUSION_SCORE_FUSION_UNSUPPORTED_TIMESERIES_COLLECTIONS_10787901: 10787901,
    // /** Expected to find at least one split point */
    // FIND_SPLIT_POINT: 10828001,
    // /** Exceeded configured WiredTiger session_max={?} while opening a WiredTiger session */
    // EXCEEDED_CONFIGURED_WIREDTIGER: 10828100,
    // /** Exceeded configured maximum WiredTiger user session wiredTigerReservedSessionMax={?} while opening a WiredTiger user session */
    // EXCEEDED_CONFIGURED_MAXIMUM: 10828101,
    // /** $text is unsupported for timeseries collections */
    // TEXT_UNSUPPORTED_TIMESERIES_COLLECTIONS: 10830400,
    // /** search index commands are not allowed on timeseries collections */
    // SEARCH_INDEX_COMMANDS_ALLOWED: 10840700,
    // /** search index commands are not allowed on timeseries collections */
    // SEARCH_INDEX_COMMANDS_ALLOWED_10840701: 10840701,
    // /** Loading extension '{?}' failed: Extension has already been loaded */
    // FAILED_LOADING_EXTENSION_10845400: 10845400,
    // /** Must follow nextWithDeferredValue with getDeferredValue */
    // MUST_FOLLOW_NEXTWITHDEFERREDVALUE_GETDEFERREDVALUE: 10896301,
    // /** Must precede getDeferredValue with nextWithDeferredValue */
    // MUST_PRECEDE_GETDEFERREDVALUE_NEXTWITHDEFERREDVALUE: 10896303,
    // /** Write errors must not be empty */
    // EMPTY_WRITE_ERRORS_10903400: 10903400,
    // /** expected an object as specification for {?} stage, got {?} */
    // OBJECT_SPECIFICATION_STAGE_10983501: 10983501,
    // /** expected an empty object as specification for {?} stage, got {?} */
    // EMPTY_OBJECT_SPECIFICATION: 10983502,
    // /** idLookup is not allowed to run in a merging pipeline but pushdown was blocked */
    // IDLOOKUP_ALLOWED_MERGING_PIPELINE: 11027701,
    // /** Loading extension '{?}' failed: Extension name cannot be empty nor contain path separators */
    // FAILED_CANNOT_LOADING_EXTENSION: 11031700,
    // /** Feature flag document must at least be of form {value: <bool>} */
    // FEATURE_FLAG_DOCUMENT_MUST: 11033800,
    // /** Feature flag document must have 'value' field */
    // FEATURE_FLAG_DOCUMENT_MUST_11033801: 11033801,
    // /** Loading extension '{?}' failed: Expected configuration file not found at '{?}' */
    // FAILED_LOADING_EXTENSION_11042900: 11042900,
    // /** Unexpected error while loading extension config file '{?}': {?} */
    // UNEXPECTED_ERROR_LOADING: 11042901,
    // /** Invalid extension config file '{?}': missing required field 'sharedLibraryPath' */
    // INVALID_MISSING_EXTENSION_CONFIG: 11042902,
    // /** Multikey array length must match length of indexes */
    // MULTIKEY_ARRAY_LENGTH_MUST: 11084600,
    // /** Range with bounds {?} is not contained within a single chunk. */
    // RANGE_BOUNDS_CONTAINED_SINGLE: 11089203,
    // /** Injected failure in expand() during handle transfer */
    // INJECTED_FAILURE_EXPAND_HANDLE: 11113805,
    // /** Exceeded memory limit in record id deduplicator for unique_roaring stage */
    // EXCEEDED_MEMORY_LIMIT_11130300: 11130300,
    // /** Exceeded memory limit in record id deduplicator for unique stage */
    // EXCEEDED_MEMORY_LIMIT_11130301: 11130301,
    // /** Exceeded memory limit in record id deduplicator for OR stage */
    // EXCEEDED_MEMORY_LIMIT_11130302: 11130302,
    // /** Exceeded memory limit in record id deduplicator for SORT_MERGE stage */
    // EXCEEDED_MEMORY_LIMIT_11130303: 11130303,
    // /** Exceeded memory limit in record id deduplicator for IXSCAN stage */
    // EXCEEDED_MEMORY_LIMIT_11130304: 11130304,
    // /** Exceeded memory limit in record id deduplicator for IXSCAN stage */
    // EXCEEDED_MEMORY_LIMIT_11130305: 11130305,
    // /** create_id_lookup requires a well-formed $_internalSearchIdLookup */
    // REQUIRES_CREATE_LOOKUP: 11134200,
    // /** $_internalSearchIdLookup must be run on a collection. */
    // INTERNALSEARCHIDLOOKUP_MUST_COLLECTION: 11140100,
    // /** Expected $_internalSearchIdLookup stage, but got: {?} */
    // INTERNALSEARCHIDLOOKUP_STAGE: 11160700,
    // /** Failed with uassert in $noOpExtension parse. */
    // NO_OP_EXTENSION_FAILED_UASSERT_PARSE_11186311: 11186311,
    // /** Failed with uassert in $noOpExtension parse. */
    // NO_OP_EXTENSION_FAILED_UASSERT_PARSE_11186312: 11186312,
    // /** authenticatedMechanism should only be set when there is exactly one user */
    // AUTHENTICATEDMECHANISM_EXACTLY_USER: 11241506,
    // /** Primary-driven index builds are required with the current persistence provider */
    // REQUIRED_PRIMARY_DRIVEN: 11332800,
    // /** Oplog entry did not have 'ts' field when expected: {?} */
    // OPLOG_ENTRY_FIELD: 11348300,
    // /** Existing commit timestamp {?} does not match container operation timestamp {?} */
    // EXISTING_COMMIT_TIMESTAMP_MATCH: 11348301,
    // /** Injected failure in DPL during handle transfer */
    // INJECTED_FAILURE_HANDLE_TRANSFER: 11365502,
    // /** Can't reclaim a prepared transaction without affected namespaces */
    // RECLAIM_PREPARED_TRANSACTION_AFFECTED: 11372904,
    // /** Can't reclaim a prepared transaction without state */
    // RECLAIM_PREPARED_TRANSACTION_STATE: 11372905,
    // /** Can't reclaim a prepared transaction with state other than prepared */
    // RECLAIM_PREPARED_TRANSACTION_STATE_11372906: 11372906,
    // /** sorterIdent is not provided */
    // SORTERIDENT: 11411100,
    // /** Primary-driven index builds cannot use deferred table creation */
    // CANNOT_PRIMARY_DRIVEN: 11411101,
    // /** Task executor is not initialized */
    // TASK_EXECUTOR_INITIALIZED: 11434200,
    // /** LiteParsedDocumentSource was unable to be initialized from BSONObj */
    // LITEPARSEDDOCUMENTSOURCE_UNABLE_INITIALIZED_BSONOBJ: 11458703,
    // /** cannot create QueryStatsInfo for current operation */
    // CANNOT_CREATE_QUERYSTATSINFO: 11487700,
    // /** $sortKey must be an object or array type.Provided type: {?} */
    // SORT_KEY_MUST_OBJECT_ARRAY_TYPE: 11503701,
    // /** Failed with uassert in $noOpExtension parse. */
    // NO_OP_EXTENSION_FAILED_UASSERT_PARSE_11511001: 11511001,
    // /** BSON field 'ifrFlags' is an unknown field */
    // UNKNOWN_BSON_FIELD_11516201: 11516201,
    // /** Pipeline array element must be an object */
    // PIPELINE_ARRAY_ELEMENT_MUST: 11524601,
    // /** Loading extension '{?}' failed, path:  {?} does not exist. */
    // FAILED_LOADING_EXTENSION_11528800: 11528800,
    // /** Attempted to import more than one key into RnpContext */
    // IMPORT_RNPCONTEXT: 11528928,
    // /** Multi-update operations require all documents to have an '_id' field */
    // MULTI_UPDATE_OPERATIONS_REQUIRE: 11533703,
    // /** Invalid ident supplied to getDirectory: {?} */
    // INVALID_IDENT_SUPPLIED: 11558900,
    // /** Expected 'name' field to be a string */
    // NAME_FIELD_STRING: 11565102,
    // /** Expected 'value' field to be a boolean */
    // VALUE_FIELD_BOOLEAN: 11565103,
    // /** Dummy error. */
    // DUMMY_ERROR: 11569604,
    // /** mapReduce on a timeseries collection is not supported */
    // MAPREDUCE_TIMESERIES_COLLECTION_SUPPORTED: 11574100,
    // /** mapReduce on a timeseries collection is not supported */
    // MAPREDUCE_TIMESERIES_COLLECTION_SUPPORTED_11574101: 11574101,
    // /** storageTier.indexes options are not supported yet */
    // STORAGETIER_INDEXES_OPTIONS_SUPPORTED: 11598800,
    // /** 2dsphere index field must be an array or an object */
    // 2DSPHERE_INDEX_FIELD_MUST: 11617900,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_11618600: 11618600,
    // /** Unsupported Accumulator in SBE accumulator builder: {?} */
    // UNSUPPORTED_ACCUMULATOR_11618700: 11618700,
    // /** left and right size do not match */
    // LEFT_RIGHT_SIZE_MATCH_11704900: 11704900,
    // /** collatorSlot must be of collator type */
    // COLLATORSLOT_MUST_COLLATOR_TYPE_11704902: 11704902,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_11704903: 11704903,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_11704904: 11704904,
    // /** duplicate field: {?} */
    // DUPLICATE_FIELD_11704905: 11704905,
    // /** Received invalid query shape opts pointer */
    // INVALID_RECEIVED_QUERY: 11717600,
    // /** A host parse node can only use host-generated query shape opts */
    // HOST_PARSE_NODE_HOST: 11717601,
    // /** ExpressionContext pointer cannot be null */
    // CANNOT_EXPRESSIONCONTEXT_POINTER: 11717605,
    // /** Cannot get underlying iterator when merge iterator has already been exhausted */
    // CANNOT_UNDERLYING_ITERATOR: 11722000,
    // /** Found a findAndModify oplog entry with an unexpected op type {?} */
    // UNEXPECTED_FINDANDMODIFY_OPLOG: 11730900,
    // /** Expected a findAndModify oplog entry to have an '_id' field {?} */
    // FINDANDMODIFY_OPLOG_ENTRY_FIELD: 11730901,
    // /** Expected oplog entry for a retryable findAndModify operation to have a session id */
    // OPLOG_ENTRY_RETRYABLE_FINDANDMODIFY: 11731000,
    // /** Expected oplog entry for a retryable findAndModify operation to have a txn number */
    // OPLOG_ENTRY_RETRYABLE_FINDANDMODIFY_11731001: 11731001,
    // /** Expected a transaction oplog entry to have a commit timestamp */
    // TRANSACTION_OPLOG_ENTRY_COMMIT: 11732000,
    // /** A granularity rounder can only round finite numbers */
    // GRANULARITY_ROUNDER_ROUND_FINITE: 11785400,
    // /** Extension stage '{?}{?}{?} */
    // EXTENSION_STAGE: 11882000,
    // /** Requested the commit timestamp but this is not a transaction */
    // REQUESTED_COMMIT_TIMESTAMP_TRANSACTION: 11910611,
    // /** Requested the commit timestamp but this is an aborted transaction */
    // REQUESTED_COMMIT_TIMESTAMP_ABORTED: 11910612,
    // /** Requested the commit timestamp but this transaction has not committed */
    // REQUESTED_COMMIT_TIMESTAMP_TRANSACTION_11910613: 11910613,
    // /** Unexpected join method {?} */
    // UNEXPECTED_JOIN_METHOD: 12016300,
    // /** Expected {?} to be of type {?}, found {?} */
    // TYPE: 12016301,
    // /** Unexpected join enumeration mode {?} */
    // UNEXPECTED_JOIN_ENUMERATION: 12016302,
    // /** Unexpected join plan shape {?} */
    // UNEXPECTED_JOIN_PLAN: 12016303,
    // /** Expectected 'node' to be non-negative */
    // EXPECTECTED_NODE_NEGATIVE: 12016305,
    // /** Unexpected field '{?}' for join hint. */
    // UNEXPECTED_FIELD_JOIN: 12016306,
    // /** Provided hint was not valid */
    // HINT_VALID: 12016307,
    // /** Expectected 'level' to be non-negative */
    // EXPECTECTED_LEVEL_NEGATIVE: 12016308,
    // /** Unexpected field '{?}' for subset level mode. */
    // UNEXPECTED_FIELD_SUBSET: 12016309,
    // /** Expected valid enumeration mode */
    // VALID_ENUMERATION_MODE: 12016311,
    // /** Expected field to be set in enumeration strategy */
    // FIELD_ENUMERATION_STRATEGY: 12016312,
    // /** Expected 'enableHJOrderPruning' value to be a boolean */
    // ENABLEHJORDERPRUNING_VALUE_BOOLEAN: 12016313,
    // /** Unexpected field '{?}' for enumeration strategy */
    // UNEXPECTED_FIELD_ENUMERATION: 12016314,
    // /** $_internalJoinHint is not permitted without join optimization */
    // INTERNALJOINHINT_PERMITTED_JOIN_OPTIMIZATION: 12016316,
    // /** Expected 'perSubsetLevelMode' to be an array */
    // PERSUBSETLEVELMODE_ARRAY: 12016317,
    // /** Cannot have hinted & random mode */
    // CANNOT_HINTED_RANDOM: 12016318,
    // /** Merge range end offset must be greater than or equal to start offset */
    // MERGE_RANGE_OFFSET_MUST: 12017000,
    // /** Merge ranges in batch must be adjacent */
    // MERGE_RANGES_BATCH_MUST: 12017001,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12020800: 12020800,
    // /** {?} requires 'chars' to be not greater than {?} bytes, got {?} bytes instead. */
    // REQUIRES_CHARS_GREATER: 12066800,
    // /** $trim/$ltrim/$rtrim requires 'chars' to be not greater than {?} bytes, got {?} bytes instead. */
    // TRIM_LTRIM_REQUIRES_CHARS_GREATER: 12066801,
    // /** {?} is unsupported for timeseries collections */
    // UNSUPPORTED_TIMESERIES_COLLECTIONS_12093200: 12093200,
    // /** $rankFusion input pipeline cannot be empty. {?} */
    // RANK_FUSION_CANNOT_EMPTY_INPUT_PIPELINE_12108700: 12108700,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12108701: 12108701,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12108702: 12108702,
    // /** $rankFusion input pipelines must not contain a $score stage. */
    // RANK_FUSION_SCORE_INPUT_PIPELINES_MUST_12108703: 12108703,
    // /** $scoreFusion input pipeline cannot be empty. {?} */
    // SCORE_FUSION_CANNOT_EMPTY_INPUT_PIPELINE_12108710: 12108710,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12108711: 12108711,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12108712: 12108712,
    // /** $rankFusion pipeline names must be unique, but found duplicate name '{?}'. */
    // RANK_FUSION_DUPLICATE_PIPELINE_NAMES_12108714: 12108714,
    // /** $scoreFusion pipeline names must be unique, but found duplicate name '{?}'. */
    // SCORE_FUSION_DUPLICATE_PIPELINE_NAMES_12108715: 12108715,
    // /** $graphLookup is missing required field(s): {?} */
    // GRAPH_LOOKUP_MISSING_REQUIRED_FIELD: 12109300,
    // /** $graphLookup 'maxDepth' must be numeric, but found type: {?} */
    // GRAPH_LOOKUP_MAXDEPTH_MUST_NUMERIC_TYPE: 12109307,
    // /** $graphLookup 'maxDepth' must be nonnegative, but found: {?} */
    // GRAPH_LOOKUP_MAXDEPTH_MUST_NONNEGATIVE: 12109308,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12109309: 12109309,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12109310: 12109310,
    // /** $graphLookup '{?}' field must be a string, but found {?} */
    // GRAPH_LOOKUP_FIELD_MUST_STRING: 12109311,
    // /** unknown argument to $graphLookup: {?} */
    // GRAPH_LOOKUP_UNKNOWN_ARGUMENT_12109312: 12109312,
    // /** {?} indexes are only supported on time-series collections */
    // INDEXES_SUPPORTED_TIME_SERIES: 12113200,
    // /** The field name '' cannot be an empty string */
    // CANNOT_EMPTY_FIELD_NAME: 12116300,
    // /** query knob not settable via QuerySettings: {?} */
    // QUERY_KNOB_SETTABLE_QUERYSETTINGS: 12194500,
    // /** failed to parse query knob {?}: {?} */
    // FAILED_PARSE_QUERY: 12194501,
    // /** \"op\" field must be a number or an array of numbers */
    // FIELD_MUST_NUMBER_ARRAY: 12212701,
    // /** Each element of the \"op\" array must be a number */
    // ELEMENT_ARRAY_MUST_NUMBER: 12212702,
    // /** invalid op : {?}. Op ID cannot be represented with 32 bits */
    // INVALID_CANNOT_REPRESENTED_BITS_12212703: 12212703,
    // /** \"op\" array must not be empty */
    // EMPTY_ARRAY_MUST: 12212704,
    // /** expected to be called within a retryable write */
    // CALLED_RETRYABLE_WRITE_12220900: 12220900,
    // /** Near stage exceeded memory limit */
    // EXCEEDED_NEAR_STAGE: 12227900,
    // /** CountScan stage exceeded memory limit */
    // EXCEEDED_COUNTSCAN_STAGE: 12227901,
    // /** UpdateStage exceeded memory limit */
    // EXCEEDED_UPDATESTAGE_MEMORY: 12227902,
    // /** Primary-driven index build cannot restart collection scan */
    // CANNOT_PRIMARY_DRIVEN_12232700: 12232700,
    // /** expected to be called within a retryable write */
    // CALLED_RETRYABLE_WRITE_12248600: 12248600,
    // /** Expected binary diff 'd' field to be of binData type */
    // BINARY_DIFF_FIELD_BINDATA: 12262900,
    // /** Binary diff offset must be non-negative */
    // BINARY_DIFF_OFFSET_MUST: 12262901,
    // /** {?}{?} */
    // UNKNOWN_ERROR_12270900: 12270900,
    // /** Injected failure in _doFlush for testing */
    // INJECTED_FAILURE_DOFLUSH_TESTING: 12311500,
    // /** Cannot access collection {?}{?} */
    // CANNOT_ACCESS_COLLECTION: 12319005,
    // /** {?} */
    // UNKNOWN_ERROR_12319006: 12319006,
    // /** Cannot access database {?}{?} */
    // CANNOT_ACCESS_DATABASE: 12319007,
    // /** Exceeded memory limit for merge join */
    // EXCEEDED_MEMORY_LIMIT_12321800: 12321800,
    // /** Exceeded memory limit for and_hash */
    // EXCEEDED_MEMORY_LIMIT_12321801: 12321801,
    // /** Arguments to {?} must be the same size, but the first is of size {?} and the second is of size {?} */
    // ARGUMENTS_MUST_SIZE_FIRST_12325704: 12325704,
    // /** Arguments to {?} must be the same size, but the first is of size {?} and the second is of size {?} */
    // ARGUMENTS_MUST_SIZE_FIRST_12325705: 12325705,
    // /** binData must have vector subtype */
    // BINDATA_MUST_VECTOR_SUBTYPE: 12325706,
    // /** applyContainerOperations requires at least one op */
    // REQUIRES_APPLYCONTAINEROPERATIONS: 12337300,
    // /** applyContainerOperations requires container ops, found {?} */
    // REQUIRES_APPLYCONTAINEROPERATIONS_CONTAINER: 12337301,
    // /** Grouped container ops must share a commit timestamp. Found {?} but expected {?} */
    // GROUPED_CONTAINER_MUST_SHARE: 12337302,
    // /** Resuming a primary-driven index build from the load phase is not yet supported */
    // RESUMING_PRIMARY_DRIVEN_INDEX: 12500802,
    // /** adoptSharedSizeState_forTest requires both record stores to refer to the same URI */
    // REQUIRES_ADOPTSHAREDSIZESTATE_FORTEST: 12509800,
    // /** expected to be called within a retryable write */
    // CALLED_RETRYABLE_WRITE_12591500: 12591500,

    // $arrayToObject requires an array of size 2 arrays, found array of size: {size}
    OBJECT_TO_ARRAY_REQUIRES_SIZE: 40397,
} as const;

const ErrorMessage = {
	[ErrorCode.CONCAT_ARRAYS_UNSUPPORTED_TYPE]: {
		'*': '$concatArrays only supports arrays, not {type}'
	},
	[ErrorCode.ARRAY_TO_OBJECT_REQUIRES_ARRAY]: {
		'*': '$arrayToObject requires an array input, found: {type}'
	},
	[ErrorCode.OBJECT_TO_ARRAY_REQUIRES_DOCUMENT]: {
		'*': '$objectToArray requires a document input, found: {type}'
	},
	[ErrorCode.OBJECT_TO_ARRAY_REQUIRES_SIZE]: {
		'*': '$arrayToObject requires an array of size 2 arrays, found array of size: {size}'
	},
} as const;
export type ErrorCode = keyof typeof ErrorMessage;
export type ErrorCodeValue = typeof ErrorCode[keyof typeof ErrorCode];
export type ErrorContext = {
	phase?: 'expression' | 'execution';
	code?: number;
	value: unknown;
	callsite?: string,
};

function populate(message: string, context: ErrorContext): string {
	return message.replace(/\{([^\}]+)\}/g, (_: unknown, key: string) =>
		String(context?.[key as keyof ErrorContext] || key),
	);
}

export class MongerError extends Error {
	constructor(public code: ErrorCode, public context: Partial<ErrorContext> = {}) {
		const ctx = {
			code,
			type: type(context.value),
			...context,
		} as ErrorContext;
		const message = `MongerError::${code}`;

		super(populate(message, ctx));

		this.name = this.constructor.name;
		Error?.captureStackTrace?.(this, this.constructor);
	}

	static expression(code: ErrorCode, context: Partial<ErrorContext> = {}) {
		return new MongerError(code, { ...context, phase: 'expression' });
	}

	static execution(code: ErrorCode, context: Partial<ErrorContext> = {}) {
			return new MongerError(code, { ...context, phase: 'execution' });
	}
}
