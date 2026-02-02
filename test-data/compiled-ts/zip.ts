/**
 * Test data for $zip
 * Source: mongo/jstests/aggregation/expressions/zip.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.382Z
 */

export const operator = "$zip";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {
        $zip: {
          inputs: [
            [
              1,
              2,
              3
            ],
            [
              "A",
              "B",
              "C"
            ]
          ]
        }
      },
      context: {
        long: [
          1,
          2,
          3
        ],
        short: [
          "x",
          "y"
        ]
      },
      expected: [
        {
          _id: "697fb0038db0edd5ff18cd7d",
          zipped: [
            [
              1,
              "A"
            ],
            [
              2,
              "B"
            ],
            [
              3,
              "C"
            ]
          ]
        }
      ]
    }
  ],



};

export default tests;
