/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/expression_cond.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.323Z
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
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "new"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "new"
        },
        {
          _id: 1,
          year: 2021,
          century: "new"
        },
        {
          _id: 2,
          year: 2000,
          century: "new"
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "old"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 4",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "old"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 5",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "old"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 6",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "old"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 9",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "new"
        },
        {
          _id: 2,
          year: 2000,
          century: "old"
        }
      ]
    },
    {
      description: "Operation 10",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: "old"
        },
        {
          _id: 1,
          year: 2021,
          century: "new"
        },
        {
          _id: 2,
          year: 2000,
          century: "2000 was in XX century"
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 7",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: null
        },
        {
          _id: 1,
          year: 2021,
          century: null
        },
        {
          _id: 2,
          year: 2000,
          century: null
        }
      ]
    },
    {
      description: "Operation 8",
      query: {},
      context: {
        _id: 0,
        year: 1999
      },
      expected: [
        {
          _id: 0,
          year: 1999,
          century: null
        },
        {
          _id: 1,
          year: 2021,
          century: null
        },
        {
          _id: 2,
          year: 2000,
          century: null
        }
      ]
    }
  ],


};

export default tests;
