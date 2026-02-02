/**
 * Test data for $objectToArray
 * Source: mongo/jstests/aggregation/expressions/objectToArray.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.356Z
 */

export const operator = "$objectToArray";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 5",
      query: {
        $objectToArray: "$$ROOT"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          document: [
            {
              k: "_id",
              v: 16
            }
          ]
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 1",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 2",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 3",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 4",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 6",
      query: {
        $objectToArray: {
          dayOfWeek: {
            $dayOfWeek: "$date"
          }
        }
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          document: [
            {
              k: "dayOfWeek",
              v: null
            }
          ]
        }
      ]
    },
    {
      description: "Operation 7",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 8",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {
        $objectToArray: "$subDoc"
      },
      context: {
        _id: 16
      },
      expected: [
        {
          _id: 16,
          expanded: null
        }
      ]
    }
  ],


};

export default tests;
