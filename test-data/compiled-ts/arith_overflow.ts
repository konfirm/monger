/**
 * Test data for $add
 * Source: mongo/jstests/aggregation/expressions/arith_overflow.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.298Z
 */

export const operator = "$add";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $add: [
          "$lhs",
          "$rhs"
        ]
      },
      context: {
        _id: 0,
        lhs: {
          $numberInt: "2000000000"
        },
        rhs: {
          $numberInt: "-2000000000"
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $add only supports numeric or date types, not object"
      }
    },
    {
      description: "Operation 2",
      query: {
        $subtract: [
          "$lhs",
          "$rhs"
        ]
      },
      context: {
        _id: 0,
        lhs: {
          $numberInt: "2000000000"
        },
        rhs: {
          $numberInt: "-2000000000"
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: can't $subtract object from object"
      }
    },
    {
      description: "Operation 3",
      query: {
        $multiply: [
          "$lhs",
          "$rhs"
        ]
      },
      context: {
        _id: 0,
        lhs: {
          $numberInt: "2000000000"
        },
        rhs: {
          $numberInt: "-2000000000"
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $multiply only supports numeric types, not object"
      }
    }
  ],

};

export default tests;
