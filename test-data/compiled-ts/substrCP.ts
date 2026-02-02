/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/substrCP.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.378Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        t: "寿司sushi",
        u: "éclair",
        v: "Å",
        w: "◢◢◢",
        x: "a",
        y: "abc",
        z: "abcde",
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        neg: -4,
        invalidStr: {},
        bigNum: {
          $numberLong: "4294967297"
        }
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
