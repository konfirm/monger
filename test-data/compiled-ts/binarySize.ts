/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/binarySize.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.303Z
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
        x: ""
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $binarySize requires a string or BinData argument, found: object"
      }
    }
  ],

};

export default tests;
