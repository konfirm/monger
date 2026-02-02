/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/merge_objects.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.354Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 4",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 5",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 6",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 7",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 8",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 10",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 11",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 12",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 13",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 14",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    },
    {
      description: "Operation 15",
      query: {},
      context: {
        obj: {}
      },
      expected: []
    }
  ],
  nullCases: [
    {
      description: "Operation 16",
      query: {},
      context: {
        obj: {}
      },
      expected: [
        {
          _id: {
            min: null,
            max: null
          },
          result: {
            a: 3,
            b: 4,
            subobj: {
              y: 2
            }
          }
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 9",
      query: {},
      context: {
        obj: {}
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
