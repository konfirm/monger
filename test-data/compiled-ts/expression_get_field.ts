/**
 * Test data for $getField
 * Source: mongo/jstests/aggregation/expressions/expression_get_field.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.326Z
 */

export const operator = "$getField";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 13",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "b"
        },
        {
          _id: 1,
          test: "b"
        }
      ]
    },
    {
      description: "Operation 17",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 18",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "foo"
        },
        {
          _id: 1,
          test: "foo"
        }
      ]
    },
    {
      description: "Operation 19",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "bar"
        },
        {
          _id: 1,
          test: "bar"
        }
      ]
    },
    {
      description: "Operation 20",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 0
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 21",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 22",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 0
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 23",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 0
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 24",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 0
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 25",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 10
        },
        {
          _id: 1,
          test: 10
        }
      ]
    },
    {
      description: "Operation 26",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 20
        },
        {
          _id: 1,
          test: 20
        }
      ]
    },
    {
      description: "Operation 27",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: {
            $a: 1,
            "$b..$c": 2
          }
        },
        {
          _id: 1,
          test: {
            $a: 1,
            "$b..$c": 2
          }
        }
      ]
    },
    {
      description: "Operation 28",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 30
        },
        {
          _id: 1,
          test: 30
        }
      ]
    },
    {
      description: "Operation 62",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "b"
        },
        {
          _id: 1,
          test: "b"
        }
      ]
    },
    {
      description: "Operation 63",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "b"
        },
        {
          _id: 1,
          test: "b"
        }
      ]
    },
    {
      description: "Operation 64",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "b"
        },
        {
          _id: 1,
          test: "b"
        }
      ]
    },
    {
      description: "Operation 65",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 66",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 67",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "x"
        },
        {
          _id: 1,
          test: "x"
        }
      ]
    },
    {
      description: "Operation 68",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: "b"
        },
        {
          _id: 1,
          test: "b"
        }
      ]
    },
    {
      description: "Operation 69",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 70",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 71",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 72",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 73",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 74",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 76",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 79",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 81",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 82",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 83",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 84",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 85",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 5
        },
        {
          _id: 1,
          test: 5
        }
      ]
    },
    {
      description: "Operation 86",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 87",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0
        },
        {
          _id: 1
        }
      ]
    },
    {
      description: "Operation 88",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 1
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 89",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 2
        },
        {
          _id: 1,
          test: 2
        }
      ]
    },
    {
      description: "Operation 90",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 1
        },
        {
          _id: 1,
          test: 1
        }
      ]
    },
    {
      description: "Operation 91",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 2
        },
        {
          _id: 1,
          test: 2
        }
      ]
    },
    {
      description: "Operation 92",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 41
        },
        {
          _id: 1,
          test: 41
        }
      ]
    },
    {
      description: "Operation 93",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: 42
        },
        {
          _id: 1,
          test: 42
        }
      ]
    },
    {
      description: "Operation 94",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          aa: 0
        },
        {
          _id: 1,
          aa: 1
        }
      ]
    },
    {
      description: "Operation 95",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: []
    },
    {
      description: "Operation 96",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          a: 0,
          b: "bar"
        },
        {
          _id: 1,
          a: 1,
          b: "bar"
        }
      ]
    },
    {
      description: "Operation 97",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          aa: "bar"
        },
        {
          _id: 1,
          aa: "bar"
        }
      ]
    },
    {
      description: "Operation 98",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: "bar",
          count: 2
        }
      ]
    },
    {
      description: "Operation 99",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          count: 1
        },
        {
          _id: 1,
          count: 1
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 75",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: null
        },
        {
          _id: 1,
          test: null
        }
      ]
    },
    {
      description: "Operation 77",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: null
        },
        {
          _id: 1,
          test: null
        }
      ]
    },
    {
      description: "Operation 78",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: null
        },
        {
          _id: 1,
          test: null
        }
      ]
    },
    {
      description: "Operation 80",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: [
        {
          _id: 0,
          test: null
        },
        {
          _id: 1,
          test: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 1",
      query: {
        $getField: {
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to be specified"
      }
    },
    {
      description: "Operation 2",
      query: {
        $getField: {
          field: "a"
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'input' to be specified"
      }
    },
    {
      description: "Operation 3",
      query: {
        $getField: {
          field: true,
          input: {
            a: "b"
          }
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got bool"
      }
    },
    {
      description: "Operation 4",
      query: {
        $getField: {
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
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 5",
      query: {
        $getField: 5
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got int"
      }
    },
    {
      description: "Operation 6",
      query: {
        $getField: true
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got bool"
      }
    },
    {
      description: "Operation 7",
      query: {
        $getField: {
          field: null,
          input: {
            a: 1
          }
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got null"
      }
    },
    {
      description: "Operation 8",
      query: {
        $getField: {
          field: "a",
          input: {
            a: "b"
          },
          unknown: true
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField found an unknown argument: unknown"
      }
    },
    {
      description: "Operation 9",
      query: {
        $getField: {
          $add: [
            2,
            3
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 10",
      query: {
        $getField: {
          $const: true
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got bool"
      }
    },
    {
      description: "Operation 11",
      query: {
        $getField: {
          $const: {
            a: 1
          }
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got object"
      }
    },
    {
      description: "Operation 12",
      query: {
        $getField: {
          field: {
            $const: []
          },
          input: {
            a: 1
          }
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to type String, but got array"
      }
    },
    {
      description: "Operation 14",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 15",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 16",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 29",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.foo' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.foo'}?"
      }
    },
    {
      description: "Operation 30",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 31",
      query: {
        $getField: "$maybeStr"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.maybeStr' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.maybeStr'}?"
      }
    },
    {
      description: "Operation 32",
      query: {
        $getField: "$a"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.a' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.a'}?"
      }
    },
    {
      description: "Operation 33",
      query: {
        $getField: "$a.b"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.a.b' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.a.b'}?"
      }
    },
    {
      description: "Operation 34",
      query: {
        $getField: "$$CURRENT.a"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.a' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.a'}?"
      }
    },
    {
      description: "Operation 35",
      query: {
        $getField: "$x"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.x' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.x'}?"
      }
    },
    {
      description: "Operation 36",
      query: {
        $getField: "$missing"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.missing' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.missing'}?"
      }
    },
    {
      description: "Operation 37",
      query: {
        $getField: "$arr.0.1.2.x"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.arr.0.1.2.x' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.arr.0.1.2.x'}?"
      }
    },
    {
      description: "Operation 38",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 39",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 40",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 41",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.c.d' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.c.d'}?"
      }
    },
    {
      description: "Operation 42",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.arr.0.0.0.b' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.arr.0.0.0.b'}?"
      }
    },
    {
      description: "Operation 43",
      query: {
        $getField: {
          $add: [
            1,
            2
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 44",
      query: {
        $getField: {
          $mod: [
            5,
            10
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 45",
      query: {
        $getField: {
          $month: "$$NOW"
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 46",
      query: {
        $getField: {
          $ne: [
            "$x",
            1
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 47",
      query: {
        $getField: {
          $toDouble: "2.5"
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 48",
      query: {
        $getField: {
          $reverseArray: "$items"
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 49",
      query: {
        $getField: {
          $mergeObjects: [
            "$c",
            "$e"
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 50",
      query: {
        $getField: {
          $mergeObjects: [
            null,
            null
          ]
        }
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 51",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CURRENT.c.d' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CURRENT.c.d'}?"
      }
    },
    {
      description: "Operation 52",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$ROOT.c.d' is a field path reference which is not allowed in this context. Did you mean {$literal: '$ROOT.c.d'}?"
      }
    },
    {
      description: "Operation 53",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: $getField requires 'field' to evaluate to a constant, but got a non-constant argument"
      }
    },
    {
      description: "Operation 54",
      query: {
        $getField: "$$NOW"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$NOW' is a field path reference which is not allowed in this context. Did you mean {$literal: '$NOW'}?"
      }
    },
    {
      description: "Operation 55",
      query: {
        $getField: "$$REMOVE"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$REMOVE' is a field path reference which is not allowed in this context. Did you mean {$literal: '$REMOVE'}?"
      }
    },
    {
      description: "Operation 56",
      query: {
        $getField: "$$DESCEND"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: Use of undefined variable: DESCEND"
      }
    },
    {
      description: "Operation 57",
      query: {
        $getField: "$$PRUNE"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: Use of undefined variable: PRUNE"
      }
    },
    {
      description: "Operation 58",
      query: {
        $getField: "$$KEEP"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: Use of undefined variable: KEEP"
      }
    },
    {
      description: "Operation 59",
      query: {
        $getField: "$$USER_ROLES"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$USER_ROLES' is a field path reference which is not allowed in this context. Did you mean {$literal: '$USER_ROLES'}?"
      }
    },
    {
      description: "Operation 60",
      query: {
        $getField: "$$SEARCH_META"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$SEARCH_META' is a field path reference which is not allowed in this context. Did you mean {$literal: '$SEARCH_META'}?"
      }
    },
    {
      description: "Operation 61",
      query: {
        $getField: "$$CLUSTER_TIME"
      },
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$CLUSTER_TIME' is a field path reference which is not allowed in this context. Did you mean {$literal: '$CLUSTER_TIME'}?"
      }
    },
    {
      description: "Operation 100",
      query: {},
      context: {
        _id: 0,
        x: 0,
        y: "c",
        a$b: "foo",
        "a.b": "bar",
        "a.$b": 5,
        ".xy": 0,
        ".$xz": 0,
        "..zz": 0,
        $a: 10,
        "$x.$y": 20,
        "$x..$y": {
          $a: 1,
          "$b..$c": 2
        },
        c: {
          d: "x"
        },
        e: {
          $f: 30
        },
        f: [
          {
            $a: 41
          },
          {
            "$b..": 42
          }
        ],
        "$v..": null,
        foo: "bar",
        bar: "baz",
        letterB: "b",
        $b: "b",
        arr: {
          "0": {
            "0": {
              "0": {
                b: "bar"
              }
            }
          }
        },
        maybeStr: "2",
        "$.1": "$.2",
        "$.2": "bar",
        items: [
          0,
          1,
          2,
          3,
          4
        ],
        lookupField: "field0"
      },
      expected: {
        error: "Invalid $project :: caused by :: '$field' is a field path reference which is not allowed in this context. Did you mean {$literal: '$field'}?"
      }
    }
  ],

};

export default tests;
