/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/first_last.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.344Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {

  nullCases: [
    {
      description: "Operation 1",
      query: {},
      context: {
        _id: 0,
        a: []
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1,
          f: "A",
          l: "A"
        },
        {
          _id: 2,
          f: "A",
          l: "B"
        },
        {
          _id: 3,
          f: "A",
          l: "C"
        },
        {
          _id: 4,
          f: null,
          l: null
        },
        {
          _id: 5,
          f: null,
          l: null
        },
        {
          _id: 6,
          f: null,
          l: null
        }
      ]
    }
  ],


};

export default tests;
