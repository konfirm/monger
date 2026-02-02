/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/floor_ceil.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.344Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 6",
      query: {},
      context: {},
      expected: [
        {
          result: -2
        }
      ]
    },
    {
      description: "Operation 7",
      query: {},
      context: {},
      expected: [
        {
          result: 1
        }
      ]
    },
    {
      description: "Operation 8",
      query: {},
      context: {},
      expected: [
        {
          result: -1
        }
      ]
    },
    {
      description: "Operation 14",
      query: {},
      context: {},
      expected: [
        {
          result: -2
        }
      ]
    },
    {
      description: "Operation 15",
      query: {},
      context: {},
      expected: [
        {
          result: 0
        }
      ]
    },
    {
      description: "Operation 16",
      query: {},
      context: {},
      expected: [
        {
          result: -2
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 2",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 4",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 5",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 10",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 11",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 12",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    },
    {
      description: "Operation 13",
      query: {},
      context: {},
      expected: [
        {
          result: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {},
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$numberLong'"
      }
    },
    {
      description: "Operation 9",
      query: {},
      context: {},
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$numberLong'"
      }
    }
  ],

};

export default tests;
