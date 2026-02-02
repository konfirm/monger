/**
 * Test data for $arrayToObject
 * Source: mongo/jstests/aggregation/expressions/arrayToObject.js
 * Validated against: MongoDB 7.0.8
 * Generated: 2026-02-01T20:34:23.299Z
 */

export const operator = "$arrayToObject";

export const description = 'Test from MongoDB jstests';

export const tests = {
  happyPath: [
    {
      description: "Operation 1",
      query: {
        $arrayToObject: "$expanded"
      },
      context: {
        expanded: [
          [
            "price",
            24
          ],
          [
            "item",
            "apple"
          ]
        ]
      },
      expected: [
        {
          _id: "697fafc8e6ccfd5814568cf1",
          collapsed: {
            price: 24,
            item: "apple"
          }
        }
      ]
    }
  ],



};

export default tests;
