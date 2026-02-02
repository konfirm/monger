/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/ifnull.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.346Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        my_false: false,
        my_str: "",
        my_null: null,
        my_obj: {},
        my_list: [],
        my_list_of_docs: [
          {
            z: 1
          },
          {
            z: 2
          }
        ]
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
