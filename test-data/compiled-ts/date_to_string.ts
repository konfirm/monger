/**
 * Test data for $dateToString
 * Source: mongo/jstests/aggregation/expressions/date_to_string.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.321Z
 */

export const operator = "$dateToString";

export const description = 'Test from MongoDB jstests';

export const tests = {

  nullCases: [
    {
      description: "Operation 1",
      query: {
        $dateToString: {
          format: "%Y-%m-%d %H:%M:%S %z (%Z minutes)",
          date: "$date",
          timezone: "$tz"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          format: "%Y-%m-%d %H:%M:%S %z (%Z minutes)",
          date: "$date",
          timezone: "America/New_York"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          format: "%Y-%m-%d %H:%M:%S %z (%Z minutes)",
          date: "$date"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          format: "Natural: %Y-W%w-%U, ISO: %G-W%u-%V",
          date: "$date"
        }
      },
      context: {
        _id: 0
      },
      expected: [
        {
          _id: 0,
          date: null
        }
      ]
    },
    {
      description: "Operation 5",
      query: {
        $dateToString: {
          format: "%b (%B) %d, %Y",
          date: "$date"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          format: "%Y-%m-%d %H:%M:%S %z (%Z minutes)",
          date: "$date",
          timezone: "$timezone"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          date: "$date"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          date: "$date",
          timezone: "UTC"
        }
      },
      context: {
        _id: 0
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
        $dateToString: {
          date: "$date",
          timezone: "America/New_York"
        }
      },
      context: {
        _id: 0
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
      query: {},
      context: {
        _id: 0
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    },
    {
      description: "Operation 11",
      query: {},
      context: {
        _id: 0
      },
      expected: {
        error: "Argument \"pipeline\" must be an array of aggregation stages"
      }
    },
    {
      description: "Operation 12",
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
