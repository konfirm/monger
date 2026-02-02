/**
 * Test data for $toUpper
 * Source: mongo/jstests/aggregation/expressions/upperlower.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.381Z
 */

export const operator = "$toUpper";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $toUpper: []
      },
      context: {},
      expected: {
        error: "Invalid $project :: caused by :: Expression $toUpper takes exactly 1 arguments. 0 were passed in."
      }
    }
  ],

};

export default tests;
