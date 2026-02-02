/**
 * Test data for $dateToParts
 * Source: mongo/jstests/aggregation/expressions/date_to_parts.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.320Z
 */

export const operator = "$dateToParts";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 5",
      query: {},
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: []
    }
  ],
  nullCases: [
    {
      description: "Operation 1",
      query: {
        $dateToParts: {
          date: "$date"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 2",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 3",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz",
          iso8601: false
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 4",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz",
          iso8601: true
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 6",
      query: {
        $dateToParts: {
          date: "$date"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 7",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 8",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz",
          iso8601: false
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz",
          iso8601: true
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 11",
      query: {
        $dateToParts: {
          date: "$date",
          timezone: "$tz"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 12",
      query: {
        $dateToParts: {
          date: "$date",
          iso8601: "$iso8601"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 13",
      query: {
        $dateToParts: {
          date: "$date"
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 10",
      query: {
        $dateToParts: {
          date: "$_id",
          timezone: "$tz",
          iso8601: false
        }
      },
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: can't convert from BSON type int to Date"
      }
    },
    {
      description: "Operation 14",
      query: {},
      context: {
        _id: 0,
        tz: "Europe/London"
      },
      expected: {
        error: "Invalid $project :: caused by :: Unrecognized expression '$date'"
      }
    }
  ],

};

export default tests;
