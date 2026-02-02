/**
 * Test data for $add
 * Source: mongo/jstests/aggregation/expressions/add.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.292Z
 */

export const operator = "$add";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {
        $add: []
      },
      context: {
        x: 1
      },
      expected: [
        {
          _id: "697fafc5b7b138f1b0dc64d9",
          y: 0
        }
      ]
    }
  ],



};

export default tests;
