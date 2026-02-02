/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/sqrt.js
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
        _id: 0
      },
      expected: [
        {
          result: 10
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        _id: 0
      },
      expected: [
        {
          result: 0
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 5",
      query: {},
      context: {
        _id: 0
      },
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 6",
      query: {},
      context: {
        _id: 0
      },
      expected: [
        {
          result: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 3",
      query: {},
      context: {
        _id: 0
      },
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$numberLong'"
      }
    },
    {
      description: "Operation 4",
      query: {},
      context: {
        _id: 0
      },
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$numberLong'"
      }
    }
  ],

};

export default tests;
