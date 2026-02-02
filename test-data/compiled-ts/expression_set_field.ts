/**
 * Test data for $setField
 * Source: mongo/jstests/aggregation/expressions/expression_set_field.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.333Z
 */

export const operator = "$setField";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 39",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            a: 24
          }
        }
      ]
    },
    {
      description: "Operation 40",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            b: "b",
            a: 24
          }
        }
      ]
    },
    {
      description: "Operation 41",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            a: 24
          }
        }
      ]
    },
    {
      description: "Operation 42",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {}
        }
      ]
    },
    {
      description: "Operation 43",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            b: "b"
          }
        }
      ]
    },
    {
      description: "Operation 44",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {}
        }
      ]
    },
    {
      description: "Operation 45",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {}
        }
      ]
    },
    {
      description: "Operation 46",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            b: "b"
          }
        }
      ]
    },
    {
      description: "Operation 47",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {}
        }
      ]
    },
    {
      description: "Operation 51",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "0": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 52",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "0": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 53",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "0": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 54",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 55",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 57",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "1": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 58",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "1": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 59",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "1": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 60",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 61",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 63",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "2": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 64",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "2": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 65",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "2": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 66",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 67",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 69",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "3": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 70",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "3": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 71",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "3": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 72",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 73",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 75",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "4": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 76",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "4": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 77",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "4": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 78",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 79",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 81",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "5": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 82",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "5": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 83",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "5": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 84",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 85",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 87",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "6": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 88",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "6": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 89",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "6": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 90",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 91",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 93",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "7": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 94",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "7": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 95",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "7": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 96",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 97",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 99",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "8": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 100",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "8": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 101",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "8": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 102",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 103",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 105",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "9": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 106",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "9": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 107",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "9": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 108",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 109",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 111",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "10": 12345,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 112",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "10": "foo",
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 113",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "10": {
              a: 23,
              xy: {
                a: 1,
                b: 2
              }
            },
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 114",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 115",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 116",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "a.b": 12345
          }
        }
      ]
    },
    {
      description: "Operation 117",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            ".ab": 12345
          }
        }
      ]
    },
    {
      description: "Operation 118",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "ab.": 12345
          }
        }
      ]
    },
    {
      description: "Operation 119",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "a.b.c": 12345
          }
        }
      ]
    },
    {
      description: "Operation 120",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            a: {
              b: {
                c: 5
              }
            },
            "a.b.c": 12345
          }
        }
      ]
    },
    {
      description: "Operation 121",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            a$b: 12345
          }
        }
      ]
    },
    {
      description: "Operation 122",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "a$b.b": 12345
          }
        }
      ]
    },
    {
      description: "Operation 123",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "a$b.b": 12345
          }
        }
      ]
    },
    {
      description: "Operation 124",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "$b.b": 12345
          }
        }
      ]
    },
    {
      description: "Operation 125",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            $b: 12345
          }
        }
      ]
    },
    {
      description: "Operation 126",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "$.ab": 12345
          }
        }
      ]
    },
    {
      description: "Operation 127",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            $$xz: 12345
          }
        }
      ]
    },
    {
      description: "Operation 128",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "b.c": "something"
          }
        }
      ]
    },
    {
      description: "Operation 129",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "b.c": "forget-me-not",
            x: "something"
          }
        }
      ]
    },
    {
      description: "Operation 130",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "b.c": {
              a: 5
            },
            "b.d": "forget-me-not",
            a: 0
          }
        }
      ]
    },
    {
      description: "Operation 132",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          result: true
        }
      ]
    },
    {
      description: "Operation 133",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "$x..$y": {
              $a: "forget-me-not",
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 134",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          x: 1,
          a$b: "foo",
          "$x..$y": {
            $a: "forget-me-not",
            "$b..$c": 2
          }
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 48",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: null
        }
      ]
    },
    {
      description: "Operation 49",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: null
        }
      ]
    },
    {
      description: "Operation 50",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "0": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 56",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "1": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 62",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "2": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 68",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "3": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 74",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "4": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 80",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "5": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 86",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "6": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 92",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "7": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 98",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "8": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 104",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "9": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 110",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: {
            "10": null,
            _id: 0,
            x: 1,
            a$b: "foo",
            "$x..$y": {
              $a: 1,
              "$b..$c": 2
            }
          }
        }
      ]
    },
    {
      description: "Operation 131",
      query: {},
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: [
        {
          _id: 0,
          test: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 1",
      query: {
        $setField: {
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 2",
      query: {
        $setField: {}
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 3",
      query: {
        $unsetField: {
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 4",
      query: {
        $unsetField: {}
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 5",
      query: {
        $setField: {
          value: "a"
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 6",
      query: {
        $setField: {
          value: "a",
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 7",
      query: {
        $setField: {
          field: "a"
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'value' to be specified"
      }
    },
    {
      description: "Operation 8",
      query: {
        $setField: {
          field: "a",
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'value' to be specified"
      }
    },
    {
      description: "Operation 9",
      query: {
        $unsetField: {
          field: "a",
          value: "foo"
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField found an unknown argument: value"
      }
    },
    {
      description: "Operation 10",
      query: {
        $unsetField: {
          field: "a",
          value: null,
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField found an unknown argument: value"
      }
    },
    {
      description: "Operation 11",
      query: {
        $setField: {
          field: null,
          value: 0
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'input' to be specified"
      }
    },
    {
      description: "Operation 12",
      query: {
        $setField: {
          field: "foo",
          value: 0
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'input' to be specified"
      }
    },
    {
      description: "Operation 13",
      query: {
        $unsetField: {
          field: null
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'input' to be specified"
      }
    },
    {
      description: "Operation 14",
      query: {
        $unsetField: {
          field: "foo"
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'input' to be specified"
      }
    },
    {
      description: "Operation 15",
      query: {
        $setField: {
          field: true,
          input: {
            a: "b"
          },
          value: 24
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to evaluate to type String, but got bool"
      }
    },
    {
      description: "Operation 16",
      query: {
        $setField: {
          field: {
            a: 1
          },
          input: {
            a: 1
          },
          value: 24
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 17",
      query: {
        $setField: {
          field: 33,
          input: 33,
          value: 24
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to evaluate to type String, but got int"
      }
    },
    {
      description: "Operation 18",
      query: {
        $setField: {
          field: "a",
          input: true,
          value: 24
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $setField requires 'input' to evaluate to type Object"
      }
    },
    {
      description: "Operation 19",
      query: {
        $unsetField: {
          field: true,
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to evaluate to type String, but got bool"
      }
    },
    {
      description: "Operation 20",
      query: {
        $unsetField: {
          field: {
            a: 1
          },
          input: {
            a: 1
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 21",
      query: {
        $unsetField: {
          field: 33,
          input: 33
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to evaluate to type String, but got int"
      }
    },
    {
      description: "Operation 22",
      query: {
        $unsetField: {
          field: "a",
          input: true
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "PlanExecutor error during aggregation :: caused by :: $setField requires 'input' to evaluate to type Object"
      }
    },
    {
      description: "Operation 23",
      query: {
        $setField: {
          field: null,
          input: {},
          value: 0
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to evaluate to type String, but got null"
      }
    },
    {
      description: "Operation 24",
      query: {
        $setField: {
          field: "$field_path",
          input: {},
          value: 0
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.field_path' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.field_path'}?"
      }
    },
    {
      description: "Operation 25",
      query: {
        $setField: {
          field: {
            $concat: [
              "a.b",
              ".",
              "c"
            ]
          },
          input: {
            $const: {
              "a.b.c": 5
            }
          },
          value: 12345
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 26",
      query: {
        $unsetField: {
          field: null,
          input: {}
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to evaluate to type String, but got null"
      }
    },
    {
      description: "Operation 27",
      query: {
        $unsetField: {
          field: "$field_path",
          input: {}
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.field_path' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.field_path'}?"
      }
    },
    {
      description: "Operation 28",
      query: {
        $unsetField: {
          field: {
            $concat: [
              "a.b",
              ".",
              "c"
            ]
          },
          input: {
            $const: {
              "a.b.c": 5
            }
          }
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 29",
      query: {
        $setField: 5
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField only supports an object as its argument"
      }
    },
    {
      description: "Operation 30",
      query: {
        $setField: true
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField only supports an object as its argument"
      }
    },
    {
      description: "Operation 31",
      query: {
        $setField: {
          $add: [
            2,
            3
          ]
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField found an unknown argument: $add"
      }
    },
    {
      description: "Operation 32",
      query: {
        $setField: "foo"
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField only supports an object as its argument"
      }
    },
    {
      description: "Operation 33",
      query: {
        $unsetField: 5
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField only supports an object as its argument"
      }
    },
    {
      description: "Operation 34",
      query: {
        $unsetField: true
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField only supports an object as its argument"
      }
    },
    {
      description: "Operation 35",
      query: {
        $unsetField: {
          $add: [
            2,
            3
          ]
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField found an unknown argument: $add"
      }
    },
    {
      description: "Operation 36",
      query: {
        $unsetField: "foo"
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $unsetField only supports an object as its argument"
      }
    },
    {
      description: "Operation 37",
      query: {
        $setField: {
          field: "a",
          input: {
            a: "b"
          },
          unknown: true
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField found an unknown argument: unknown"
      }
    },
    {
      description: "Operation 38",
      query: {
        $setField: {
          field: "a",
          input: {
            a: "b"
          },
          value: 24,
          unknown: true
        }
      },
      context: {
        _id: 0,
        x: 1,
        a$b: "foo",
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        }
      },
      expected: {
        error: "Invalid $project :: caused by :: $setField found an unknown argument: unknown"
      }
    }
  ],

};

export default tests;
