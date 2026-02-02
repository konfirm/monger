/**
 * Test data for $concatArrays
 * Source: mongo/jstests/aggregation/expressions/concat_arrays.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.306Z
 */

export const operator = "$concatArrays";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 17",
      query: {
        $concatArrays: []
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: []
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 1",
      query: {
        $concatArrays: [
          "$int_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 2",
      query: {
        $concatArrays: [
          [
            0
          ],
          "$int_arr",
          [
            5,
            6,
            7
          ]
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 3",
      query: {
        $concatArrays: [
          "$int_arr",
          "$str_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 4",
      query: {
        $concatArrays: [
          "$obj_arr",
          "$obj_arr",
          "$null_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 5",
      query: {
        $concatArrays: [
          "$int_arr",
          "$str_arr",
          "$nested_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 6",
      query: {
        $concatArrays: [
          "$int_arr",
          "$obj_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 7",
      query: {
        $concatArrays: [
          "$obj_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 8",
      query: {
        $concatArrays: [
          "$obj_arr",
          [
            {
              o: 123,
              b: 1
            },
            {
              y: "o",
              d: "a"
            }
          ]
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {
        $concatArrays: [
          "$null_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 10",
      query: {
        $concatArrays: [
          [
            null
          ],
          "$null_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 11",
      query: {
        $concatArrays: "$one_null_arr"
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 12",
      query: {
        $concatArrays: [
          "$null_arr",
          "$one_null_arr",
          "$int_arr",
          "$null_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 13",
      query: {
        $concatArrays: [
          {
            $concatArrays: "$int_arr"
          }
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 14",
      query: {
        $concatArrays: [
          {
            $concatArrays: "$int_arr"
          },
          {
            $concatArrays: {
              $concatArrays: "$str_arr"
            }
          }
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 15",
      query: {
        $concatArrays: [
          "$str_arr",
          {
            $filter: {
              input: "$int_arr",
              as: "num",
              cond: {
                $and: [
                  {
                    $gte: [
                      "$$num",
                      2
                    ]
                  },
                  {
                    $lte: [
                      "$$num",
                      3
                    ]
                  }
                ]
              }
            }
          },
          "$int_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 16",
      query: {
        $concatArrays: [
          "$str_arr",
          {
            $filter: {
              input: [],
              cond: {
                $isArray: [
                  {
                    $concatArrays: [
                      [],
                      "$$this"
                    ]
                  }
                ]
              }
            }
          }
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 18",
      query: {
        $concatArrays: [
          "$int_arr",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 19",
      query: {
        $concatArrays: [
          "$int_arr",
          null
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 20",
      query: {
        $concatArrays: [
          null,
          "$int_arr",
          "$str_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 21",
      query: {
        $concatArrays: [
          "$int_arr",
          null,
          "$str_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 22",
      query: {
        $concatArrays: [
          "$null_val",
          "$str_arr",
          "$int_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 23",
      query: {
        $concatArrays: [
          "$str_arr",
          "$null_val",
          "$int_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 24",
      query: {
        $concatArrays: [
          "$int_arr",
          "$not_a_field"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 25",
      query: {
        $concatArrays: [
          "$not_a_field",
          "$str_arr",
          "$int_arr"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 26",
      query: {
        $concatArrays: [
          "$not_a_field"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 27",
      query: {
        $concatArrays: [
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 28",
      query: {
        $concatArrays: [
          "$not_a_field",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 29",
      query: {
        $concatArrays: [
          "$null_val",
          "$not_a_field"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 30",
      query: {
        $concatArrays: [
          {
            $concatArrays: "$int_arr"
          },
          null,
          {
            $concatArrays: {
              $concatArrays: [
                "$obj_arr",
                "$str_arr"
              ]
            }
          }
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 31",
      query: {
        $concatArrays: [
          "$int_arr",
          "$null_val",
          "$int_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 32",
      query: {
        $concatArrays: [
          "$null_val",
          null,
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 33",
      query: {
        $concatArrays: [
          "$dbl_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 34",
      query: {
        $concatArrays: [
          "$str_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 35",
      query: {
        $concatArrays: [
          "$int_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 38",
      query: {
        $concatArrays: [
          "$obj_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 39",
      query: {
        $concatArrays: [
          "$int_arr",
          "$int_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 40",
      query: {
        $concatArrays: [
          "$dbl_arr",
          "$dbl_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 41",
      query: {
        $concatArrays: [
          "$int_arr",
          "$dbl_val",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 42",
      query: {
        $concatArrays: [
          "$int_arr",
          "some_string_value",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 43",
      query: {
        $concatArrays: [
          "$dbl_val",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 44",
      query: {
        $concatArrays: [
          "$int_arr",
          "$int_val",
          "$not_a_field"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 45",
      query: {
        $concatArrays: [
          "$int_val",
          "$not_a_field"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 46",
      query: {
        $concatArrays: [
          "$int_val",
          "$not_a_field",
          "$null_val"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 47",
      query: {
        $concatArrays: [
          "$int_arr",
          32
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 48",
      query: {
        $concatArrays: [
          "$arr1",
          "$arr2"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: [
            42,
            35,
            197865432,
            "albatross",
            "abbacus",
            "alien"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: [
            1,
            "albatross",
            "abbacus",
            "alien"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: [
            1,
            2,
            3,
            4,
            5,
            6,
            11,
            12,
            23
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: [
            "foo",
            "bar"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: []
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    },
    {
      description: "Operation 49",
      query: {
        $concatArrays: [
          "$arr1",
          [
            1,
            2,
            3
          ],
          "$arr2"
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: [
        {
          _id: "697fafcecd26d6a8c4f80b76",
          f: [
            42,
            35,
            197865432,
            1,
            2,
            3,
            "albatross",
            "abbacus",
            "alien"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b77",
          f: [
            1,
            1,
            2,
            3,
            "albatross",
            "abbacus",
            "alien"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b78",
          f: [
            1,
            2,
            3,
            4,
            5,
            6,
            11,
            12,
            23,
            1,
            2,
            3
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b79",
          f: [
            1,
            2,
            3,
            "foo",
            "bar"
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b7a",
          f: [
            1,
            2,
            3
          ]
        },
        {
          _id: "697fafcecd26d6a8c4f80b7b",
          f: null
        },
        {
          _id: "697fafcecd26d6a8c4f80b7c",
          f: null
        }
      ]
    }
  ],
  errors: [
    {
      description: "Operation 36",
      query: {
        $concatArrays: [
          123
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: {
        error: "Failed to optimize pipeline :: caused by :: $concatArrays only supports arrays, not int"
      }
    },
    {
      description: "Operation 37",
      query: {
        $concatArrays: [
          "some_val",
          [
            1,
            2,
            3
          ]
        ]
      },
      context: {
        arr1: [
          42,
          35,
          197865432
        ],
        arr2: [
          "albatross",
          "abbacus",
          "alien"
        ]
      },
      expected: {
        error: "Failed to optimize pipeline :: caused by :: $concatArrays only supports arrays, not string"
      }
    }
  ],

};

export default tests;
