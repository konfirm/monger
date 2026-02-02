/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/array_expression.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.300Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: [
        "$a",
        "$b"
      ],
      context: {
        a: 1,
        b: 2
      },
      expected: [
        {
          _id: "697fafc9a04af159e5ac17bc",
          out: [
            1,
            2
          ]
        }
      ]
    }
  ],



};

export default tests;
