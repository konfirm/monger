// $concat
// Concatenates any number of strings.
// $dateFromString
// Converts a date/time string to a date object.
// $dateToString
// Returns the date as a formatted string.
// $indexOfBytes
// Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns -1.
// $indexOfCP
// Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns -1
// $ltrim
// Removes whitespace or the specified characters from the beginning of a string.

// New in version 4.0.

// $regexFind
// Applies a regular expression (regex) to a string and returns information on the first matched substring.

// New in version 4.2.

// $regexFindAll
// Applies a regular expression (regex) to a string and returns information on the all matched substrings.

// New in version 4.2.

// $regexMatch
// Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.

// New in version 4.2.

// $replaceOne
// Replaces the first instance of a matched string in a given input.

// New in version 4.4.

// $replaceAll
// Replaces all instances of a matched string in a given input.

// New in version 4.4.

// $rtrim
// Removes whitespace or the specified characters from the end of a string.

// New in version 4.0.

// $split
// Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string.
// $strLenBytes
// Returns the number of UTF-8 encoded bytes in a string.
// $strLenCP
// Returns the number of UTF-8 
// code points
//  in a string.
// $strcasecmp
// Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
// $substr
// Deprecated. Use $substrBytes or $substrCP.
// $substrBytes
// Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes.
// $substrCP
// Returns the substring of a string. Starts with the character at the specified UTF-8 
// code point (CP)
//  index (zero-based) in the string and continues for the number of code points specified.
// $toLower
// Converts a string to lowercase. Accepts a single argument expression.
// $toString
// Converts value to a string.

// New in version 4.0.

// $trim
// Removes whitespace or the specified characters from the beginning and end of a string.

// New in version 4.0.

// $toUpper
// Converts a string to uppercase. Accepts a single argument expression.