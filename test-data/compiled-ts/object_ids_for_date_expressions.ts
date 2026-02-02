/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/object_ids_for_date_expressions.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.356Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {},
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$oid'"
      }
    },
    {
      description: "Operation 2",
      query: {},
      context: {},
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$oid'"
      }
    }
  ],

};

export default tests;
