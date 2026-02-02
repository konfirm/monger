/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/let.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.351Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        nested: {
          four: 4
        }
      },
      expected: [
        {
          _id: "697fafe7078caf5955cd30e3",
          output: 2
        }
      ]
    }
  ],



};

export default tests;
