/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/any_element_true.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.297Z
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
        allTrue: [
          true,
          true
        ],
        someTrue: [
          true,
          false
        ],
        noneTrue: [
          0,
          false
        ],
        nonArray: 1,
        nullInput: [
          null
        ],
        undefinedInput: [
          null
        ],
        undefinedTrue: [
          null,
          true
        ],
        nullTrue: [
          null,
          true
        ],
        empty: []
      },
      expected: [
        {
          result: true
        }
      ]
    }
  ],



};

export default tests;
