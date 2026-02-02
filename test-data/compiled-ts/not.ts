/**
 * Test data for $not
 * Source: mongo/jstests/aggregation/expressions/not.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.355Z
 */

export const operator = "$not";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {
        $not: "$x"
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: false
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 2",
      query: {
        $not: "$x.y"
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: true
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 3",
      query: {
        $not: "$x.y"
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: true
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 4",
      query: {
        $not: {
          $not: "$x"
        }
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: true
        },
        {
          _id: 1,
          x: false
        }
      ]
    },
    {
      description: "Operation 5",
      query: {
        $not: {
          $not: {
            $not: "$x"
          }
        }
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: false
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 6",
      query: {
        $not: {
          $and: [
            "$x",
            "$y"
          ]
        }
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: true
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 7",
      query: {
        $not: {
          $or: [
            "$x",
            "$y"
          ]
        }
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: false
        },
        {
          _id: 1,
          x: false
        }
      ]
    },
    {
      description: "Operation 8",
      query: {
        $and: [
          {
            $not: "$x"
          },
          "$y"
        ]
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: false
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 9",
      query: {
        $or: [
          {
            $not: "$x"
          },
          "$y"
        ]
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: false
        },
        {
          _id: 1,
          x: true
        }
      ]
    },
    {
      description: "Operation 10",
      query: {
        $switch: {
          branches: [
            {
              case: {
                $not: {
                  $gt: [
                    "$x",
                    "$y"
                  ]
                }
              },
              then: "x"
            },
            {
              case: {
                $not: {
                  $lte: [
                    "$x",
                    "$y"
                  ]
                }
              },
              then: "y"
            }
          ]
        }
      },
      context: {
        _id: 0,
        x: true,
        y: false
      },
      expected: [
        {
          _id: 0,
          x: "y"
        },
        {
          _id: 1,
          x: "x"
        }
      ]
    }
  ],



};

export default tests;
