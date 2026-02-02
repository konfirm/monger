/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/is_array.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.350Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        _id: 0,
        x: 0
      },
      expected: [
        {
          _id: 0,
          isArray: false
        },
        {
          _id: 1,
          isArray: false
        },
        {
          _id: 2,
          isArray: false
        },
        {
          _id: 3,
          isArray: false
        },
        {
          _id: 4,
          isArray: false
        },
        {
          _id: 5,
          isArray: false
        },
        {
          _id: 6,
          isArray: false
        },
        {
          _id: 7,
          isArray: false
        },
        {
          _id: 8,
          isArray: true
        },
        {
          _id: 9,
          isArray: true
        },
        {
          _id: 10,
          isArray: true
        }
      ]
    }
  ],



};

export default tests;
