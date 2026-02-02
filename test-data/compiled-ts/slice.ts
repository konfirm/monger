/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/slice.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.375Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1
          ]
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1
          ]
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            3,
            4
          ]
        }
      ]
    },
    {
      description: "Operation 4",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            3,
            4
          ]
        }
      ]
    },
    {
      description: "Operation 5",
      query: {},
      context: {},
      expected: [
        {
          slice: []
        }
      ]
    },
    {
      description: "Operation 6",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      description: "Operation 7",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      description: "Operation 10",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            1,
            2
          ]
        }
      ]
    },
    {
      description: "Operation 11",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            1,
            2
          ]
        }
      ]
    },
    {
      description: "Operation 12",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            2,
            3
          ]
        }
      ]
    },
    {
      description: "Operation 13",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1
          ]
        }
      ]
    },
    {
      description: "Operation 14",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            0,
            1
          ]
        }
      ]
    },
    {
      description: "Operation 15",
      query: {},
      context: {},
      expected: [
        {
          slice: []
        }
      ]
    },
    {
      description: "Operation 16",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            4
          ]
        }
      ]
    },
    {
      description: "Operation 17",
      query: {},
      context: {},
      expected: [
        {
          slice: [
            4
          ]
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 8",
      query: {},
      context: {},
      expected: [
        {
          slice: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {},
      context: {},
      expected: [
        {
          slice: null
        }
      ]
    },
    {
      description: "Operation 18",
      query: {},
      context: {},
      expected: [
        {
          slice: null
        }
      ]
    }
  ],


};

export default tests;
