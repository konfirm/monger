/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/range.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.357Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        city: "San Jose",
        distance: {
          $numberInt: "42"
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$numberInt'"
      }
    }
  ],

};

export default tests;
