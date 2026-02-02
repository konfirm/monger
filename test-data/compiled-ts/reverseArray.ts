/**
 * Test data for $reverseArray
 * Source: mongo/jstests/aggregation/expressions/reverseArray.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.373Z
 */

export const operator = "$reverseArray";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {
        $reverseArray: {
          $literal: [
            1,
            2
          ]
        }
      },
      context: {
        nullField: null,
        embedded: [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ],
        singleElem: [
          1
        ],
        normal: [
          1,
          2,
          3
        ],
        num: 1,
        empty: []
      },
      expected: [
        {
          _id: "697faff63fed258d0e1fb160",
          reversed: [
            2,
            1
          ]
        }
      ]
    }
  ],



};

export default tests;
