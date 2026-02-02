/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/switch_errors.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.380Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        x: 1
      },
      expected: [
        {
          _id: 2,
          count: 1
        }
      ]
    }
  ],



};

export default tests;
