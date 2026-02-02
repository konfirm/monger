/**
 * Test data for unknown
 * Source: mongo/jstests/aggregation/expressions/date_expressions_with_timezones.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.317Z
 */

export const operator = "unknown";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {},
      context: {
        date: {
          $date: "2017-01-16T01:02:03.456Z"
        },
        timezone: "America/Sao_Paulo"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: year parameter 'date' must be coercible to date"
      }
    },
    {
      description: "Operation 2",
      query: {},
      context: {
        date: {
          $date: "2017-01-16T01:02:03.456Z"
        },
        timezone: "America/Sao_Paulo"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: year parameter 'date' must be coercible to date"
      }
    },
    {
      description: "Operation 3",
      query: {},
      context: {
        date: {
          $date: "2017-01-16T01:02:03.456Z"
        },
        timezone: "America/Sao_Paulo"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: year parameter 'date' must be coercible to date"
      }
    }
  ],

};

export default tests;
