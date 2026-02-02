/**
 * Test data for $_internalJsEmit
 * Source: mongo/jstests/aggregation/expressions/internal_js_emit.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.349Z
 */

export const operator = "$_internalJsEmit";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $_internalJsEmit: {
          this: "$$ROOT"
        }
      },
      context: {
        text: "hello world"
      },
      expected: {
        error: "Invalid $project :: caused by :: The map function must be specified."
      }
    }
  ],

};

export default tests;
