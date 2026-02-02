/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/avg_and_sum.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.302Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        null: null,
        string: "hello world",
        num: -1,
        num2: 13.4,
        arrayEmpty: [],
        array1: [
          1,
          2,
          3
        ],
        array2: [
          1,
          2,
          3,
          "string"
        ],
        array3: [
          12.4,
          5.6,
          9.805
        ],
        arrayNested1: [
          [
            1,
            2,
            3
          ],
          {}
        ],
        arrayNested2: [
          [
            1,
            2,
            3
          ],
          4,
          null
        ]
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
