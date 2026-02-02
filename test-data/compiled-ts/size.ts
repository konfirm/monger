/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/size.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.375Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        _id: 0,
        arr: []
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: The argument to $size must be an array, but was of type: int"
      }
    }
  ],

};

export default tests;
