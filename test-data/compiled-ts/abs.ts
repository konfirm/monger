/**
 * Test data for $abs
 * Source: mongo/jstests/aggregation/expressions/abs.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.291Z
 */

export const operator = "$abs";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $abs: "$a"
      },
      context: {
        _id: 0,
        a: {
          $numberLong: "-9223372036854775808"
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $abs only supports numeric types, not object"
      }
    }
  ],

};

export default tests;
