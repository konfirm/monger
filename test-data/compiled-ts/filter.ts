/**
 * Test data for $filter
 * Source: mongo/jstests/aggregation/expressions/filter.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.343Z
 */

export const operator = "$filter";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 7",
      query: {
        $or: [
          {
            $and: [
              {
                $filter: {
                  input: "$a",
                  cond: {
                    $or: [
                      {
                        $and: [
                          {
                            $gt: [
                              "$$this",
                              1
                            ]
                          },
                          {
                            $lt: [
                              "$$this",
                              3
                            ]
                          }
                        ]
                      },
                      {
                        $eq: [
                          "$$this",
                          5
                        ]
                      }
                    ]
                  }
                }
              },
              "$d"
            ]
          },
          {
            $filter: {
              input: "$a",
              cond: {
                $eq: [
                  "$$this",
                  1
                ]
              }
            }
          }
        ]
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: true
        },
        {
          _id: 1,
          b: true
        },
        {
          _id: 2,
          b: true
        },
        {
          _id: 3,
          b: true
        },
        {
          _id: 4,
          b: false
        },
        {
          _id: 5,
          b: false
        },
        {
          _id: 6,
          b: false
        }
      ]
    }
  ],
  nullCases: [
    {
      description: "Operation 1",
      query: {
        $filter: {
          input: "$a",
          as: "x",
          cond: {
            $gt: [
              "$$x",
              2
            ]
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            3,
            4,
            5
          ]
        },
        {
          _id: 1,
          b: []
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: [
            4
          ]
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 2",
      query: {
        $filter: {
          input: "$a",
          as: "x",
          cond: {
            $gt: [
              "$$x",
              1
            ]
          },
          limit: {
            $literal: 3
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2,
            3,
            4
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: [
            4
          ]
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 3",
      query: {
        $filter: {
          input: "$a",
          as: "x",
          cond: {
            $gt: [
              "$$x",
              2
            ]
          },
          limit: null
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            3,
            4,
            5
          ]
        },
        {
          _id: 1,
          b: []
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: [
            4
          ]
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 4",
      query: {
        $filter: {
          input: "$a",
          cond: {
            $eq: [
              2,
              "$$this"
            ]
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: []
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 5",
      query: {
        $let: {
          vars: {
            value: "$d"
          },
          in: {
            $filter: {
              input: "$a",
              cond: {
                $gte: [
                  {
                    $add: [
                      "$c",
                      "$$this"
                    ]
                  },
                  "$$value"
                ]
              }
            }
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2,
            3,
            4,
            5
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: [
            4
          ]
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 6",
      query: {
        $filter: {
          input: "$a",
          cond: {
            $or: [
              {
                $and: [
                  {
                    $gt: [
                      "$$this",
                      1
                    ]
                  },
                  {
                    $lt: [
                      "$$this",
                      3
                    ]
                  }
                ]
              },
              {
                $eq: [
                  "$$this",
                  5
                ]
              }
            ]
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2,
            5
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: []
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 8",
      query: {
        $cond: {
          if: {
            $filter: {
              input: "$a",
              cond: {
                $eq: [
                  "$$this",
                  1
                ]
              }
            }
          },
          then: {
            $filter: {
              input: "$a",
              cond: {
                $eq: [
                  "$$this",
                  2
                ]
              }
            }
          },
          else: {
            $filter: {
              input: "$a",
              cond: {
                $eq: [
                  "$$this",
                  3
                ]
              }
            }
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: []
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    },
    {
      description: "Operation 9",
      query: {
        $switch: {
          branches: [
            {
              case: {
                $filter: {
                  input: "$a",
                  cond: {
                    $eq: [
                      "$$this",
                      1
                    ]
                  }
                }
              },
              then: {
                $filter: {
                  input: "$a",
                  cond: {
                    $eq: [
                      "$$this",
                      2
                    ]
                  }
                }
              }
            },
            {
              case: {
                $filter: {
                  input: "$a",
                  cond: {
                    $eq: [
                      "$$this",
                      3
                    ]
                  }
                }
              },
              then: {
                $filter: {
                  input: "$a",
                  cond: {
                    $eq: [
                      "$$this",
                      4
                    ]
                  }
                }
              }
            }
          ],
          default: {
            $filter: {
              input: "$a",
              cond: {
                $eq: [
                  "$$this",
                  5
                ]
              }
            }
          }
        }
      },
      context: {
        _id: 0,
        c: 1,
        d: 3,
        a: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      expected: [
        {
          _id: 0,
          b: [
            2
          ]
        },
        {
          _id: 1,
          b: [
            2
          ]
        },
        {
          _id: 2,
          b: []
        },
        {
          _id: 3,
          b: []
        },
        {
          _id: 4,
          b: null
        },
        {
          _id: 5,
          b: null
        },
        {
          _id: 6,
          b: null
        }
      ]
    }
  ],


};

export default tests;
