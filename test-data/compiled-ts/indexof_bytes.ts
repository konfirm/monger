/**
 * Test data for $indexOfBytes
 * Source: mongo/jstests/aggregation/expressions/indexof_bytes.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.348Z
 */

export const operator = "$indexOfBytes";

export const description = 'Test from MongoDB jstests';

export const tests = {


  errors: [
    {
      description: "Operation 1",
      query: {
        $indexOfBytes: [
          4,
          "$item"
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a string as the first argument, found: int"
      }
    },
    {
      description: "Operation 2",
      query: {
        $indexOfBytes: [
          "$item",
          4
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a string as the second argument, found: int"
      }
    },
    {
      description: "Operation 3",
      query: {
        $indexOfBytes: [
          "$item",
          null
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a string as the second argument, found: null"
      }
    },
    {
      description: "Operation 4",
      query: {
        $indexOfBytes: [
          "$item",
          "$missing"
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a string as the second argument, found: missing"
      }
    },
    {
      description: "Operation 5",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          "hello"
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytesrequires an integral starting index, found a value of type: string, with value: \"hello\""
      }
    },
    {
      description: "Operation 6",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          -2
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a nonnegative starting index, found: -2"
      }
    },
    {
      description: "Operation 7",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          1,
          "hello"
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytesrequires an integral ending index, found a value of type: string, with value: \"hello\""
      }
    },
    {
      description: "Operation 8",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          1,
          -2
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytes requires a nonnegative ending index, found: -2"
      }
    },
    {
      description: "Operation 9",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          1.4
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytesrequires an integral starting index, found a value of type: double, with value: 1.4"
      }
    },
    {
      description: "Operation 10",
      query: {
        $indexOfBytes: [
          "$item",
          "bar",
          1,
          5.2
        ]
      },
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $indexOfBytesrequires an integral ending index, found a value of type: double, with value: 5.2"
      }
    },
    {
      description: "Operation 11",
      query: {},
      context: {
        item: "foobar foobar"
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    }
  ],

};

export default tests;
