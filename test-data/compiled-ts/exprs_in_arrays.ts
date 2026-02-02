/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/exprs_in_arrays.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.341Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: [
            "constant",
            1
          ]
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: [
            "foo"
          ]
        }
      ]
    },
    {
      description: "Operation 8",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: []
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 2",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: [
            null
          ]
        }
      ]
    },
    {
      description: "Operation 4",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: [
            null,
            "foo"
          ]
        }
      ]
    },
    {
      description: "Operation 5",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: [
            null,
            "constant",
            [
              1,
              "foo"
            ]
          ]
        }
      ]
    },
    {
      description: "Operation 6",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: null
        }
      ]
    },
    {
      description: "Operation 7",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          d: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {},
      context: {
        _id: 1,
        x: 1,
        z: 2
      },
      expected: [
        {
          coordinate: [
            1,
            null,
            2
          ]
        }
      ]
    }
  ],


};

export default tests;
