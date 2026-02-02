/**
 * Test data for $function
 * Source: mongo/jstests/aggregation/expressions/expression_function.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.323Z
 */

export const operator = "$function";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $function: {
          args: [
            "$value",
            -1
          ],
          lang: "js"
        }
      },
      context: {
        value: 0
      },
      expected: {
        error: "Invalid $project :: caused by :: The body function must be specified."
      }
    }
  ],

};

export default tests;
