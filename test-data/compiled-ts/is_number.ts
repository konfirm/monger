/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/is_number.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.350Z
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
        integerFieldPath: {
          $numberInt: "56072"
        }
      },
      expected: [
        {
          isNum: false
        }
      ]
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        _id: 1,
        integerFieldPath: {
          $numberInt: "56072"
        }
      },
      expected: [
        {
          isNum: false
        }
      ]
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        _id: 1,
        integerFieldPath: {
          $numberInt: "56072"
        }
      },
      expected: [
        {
          isNum: true
        }
      ]
    },
    {
      description: "Operation 4",
      query: {},
      context: {
        _id: 1,
        integerFieldPath: {
          $numberInt: "56072"
        }
      },
      expected: [
        {
          isNum: true
        }
      ]
    }
  ],



};

export default tests;
