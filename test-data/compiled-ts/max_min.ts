/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/max_min.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.352Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        int1: 5,
        int2: 10,
        str1: "hello",
        str2: "hello world",
        NaN: null,
        arr1: [
          5
        ],
        arr2: [
          1,
          2,
          3
        ],
        arr3: [
          1,
          2,
          "string",
          null
        ],
        arr4: [],
        arrNest1: [
          [
            1,
            2
          ]
        ],
        arrNest2: [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ],
        arrNest3: [
          [
            [
              1,
              2,
              3
            ]
          ]
        ],
        arrNest4: [
          [
            [
              1,
              2,
              3
            ]
          ],
          1
        ],
        arrMixed1: [
          [],
          "hello",
          [
            "c"
          ]
        ],
        arrMixed2: [
          [],
          "hello",
          [
            "c"
          ],
          null
        ],
        null: null,
        undefined1: [
          null
        ],
        undefined2: [
          null,
          2,
          "string"
        ]
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
