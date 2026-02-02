/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/array_elem_at.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.300Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          x: 3
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          x: 2
        }
      ]
    }
  ],



};

export default tests;
