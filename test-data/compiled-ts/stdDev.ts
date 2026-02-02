/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/stdDev.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.377Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        num: 1,
        decimal: 1.23,
        null: null,
        arrSimple: [
          1,
          2,
          3,
          4
        ],
        arrEmpty: [],
        arrMixed: [
          1,
          2,
          3,
          4,
          "hello",
          null
        ],
        arrMixed2: [
          [],
          7,
          19,
          21,
          {}
        ],
        arrDecimal: [
          5.6,
          3.4,
          5.6,
          8.23
        ],
        arrNested: [
          [
            1
          ]
        ],
        arrNested2: [
          [
            [],
            7,
            19,
            21,
            {}
          ]
        ]
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
