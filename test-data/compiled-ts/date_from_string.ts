/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/date_from_string.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.318Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        _id: 0
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
