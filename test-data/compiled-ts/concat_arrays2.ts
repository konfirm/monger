/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/concat_arrays2.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.308Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {},
      context: {
        a: [
          1,
          2
        ],
        b: [
          "three"
        ],
        c: [],
        d: [
          [
            3
          ],
          4
        ],
        e: null,
        str: "x"
      },
      expected: [
        {
          all: [
            1,
            2,
            "three"
          ]
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        a: [
          1,
          2
        ],
        b: [
          "three"
        ],
        c: [],
        d: [
          [
            3
          ],
          4
        ],
        e: null,
        str: "x"
      },
      expected: [
        {
          all: [
            1,
            2,
            [
              3
            ],
            4
          ]
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        a: [
          1,
          2
        ],
        b: [
          "three"
        ],
        c: [],
        d: [
          [
            3
          ],
          4
        ],
        e: null,
        str: "x"
      },
      expected: [
        {
          all: [
            1,
            2
          ]
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 4",
      query: {},
      context: {
        a: [
          1,
          2
        ],
        b: [
          "three"
        ],
        c: [],
        d: [
          [
            3
          ],
          4
        ],
        e: null,
        str: "x"
      },
      expected: [
        {
          all: null
        }
      ]
    },
    {
      description: "Operation 5",
      query: {},
      context: {
        a: [
          1,
          2
        ],
        b: [
          "three"
        ],
        c: [],
        d: [
          [
            3
          ],
          4
        ],
        e: null,
        str: "x"
      },
      expected: [
        {
          all: null
        }
      ]
    }
  ],


};

export default tests;
