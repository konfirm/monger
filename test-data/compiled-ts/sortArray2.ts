/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/sortArray2.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.376Z
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
        b: {
          c: 1
        }
      },
      expected: [
        {
          _id: 0,
          b: {
            c: 1
          }
        },
        {
          _id: 1,
          b: {
            c: 2
          }
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        _id: 0,
        b: {
          c: 1
        }
      },
      expected: [
        {
          sorted: [
            {
              _id: 0,
              b: {
                c: 1
              }
            },
            {
              _id: 1,
              b: {
                c: 2
              }
            }
          ]
        }
      ]
    }
  ],



};

export default tests;
