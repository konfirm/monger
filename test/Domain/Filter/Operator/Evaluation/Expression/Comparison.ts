import type { TestRecord } from '../Expression';
import * as test from 'tape';
import * as Comparison from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Comparison';
import { resolve } from './Helper';

export const data: Array<TestRecord> = [
    {
        operator: '$cmp',
        query: ['$value', 10],
        tests: [
            { output: -1, value: 1 },
            { output: 0, value: 10 },
            { output: 1, value: 100 },
        ],
    },
    {
        operator: '$cmp',
        query: [10, '$value'],
        tests: [
            { output: 1, value: 1 },
            { output: 0, value: 10 },
            { output: -1, value: 100 },
        ],
    },
    {
        operator: '$eq',
        query: ['$value', 7],
        tests: [
            { output: false, value: 3 },
            { output: true, value: 7 },
            { output: false, value: 14 },
        ],
    },
    {
        operator: '$eq',
        query: ['bar', '$value'],
        tests: [
            { output: false, value: 'foo' },
            { output: true, value: 'bar' },
            { output: false, value: 'baz' },
        ],
    },
    {
        operator: '$gt',
        query: ['$value', 10],
        tests: [
            { output: false, value: 5 },
            { output: false, value: 10 },
            { output: true, value: 15 },
        ],
    },
    {
        operator: '$gt',
        query: ['$a', '$b'],
        tests: [
            { output: true, a: 10, b: 5 },
            { output: false, a: 10, b: 10 },
            { output: false, a: 5, b: 10 },
            { output: false, a: 5, b: 5 },
        ],
    },
    {
        operator: '$gte',
        query: ['$value', 10],
        tests: [
            { output: false, value: 5 },
            { output: true, value: 10 },
            { output: true, value: 15 },
        ],
    },
    {
        operator: '$gte',
        query: ['$a', '$b'],
        tests: [
            { output: true, a: 10, b: 5 },
            { output: true, a: 10, b: 10 },
            { output: false, a: 5, b: 10 },
            { output: true, a: 5, b: 5 },
        ],
    },
    {
        operator: '$lt',
        query: ['$value', 10],
        tests: [
            { output: true, value: 5 },
            { output: false, value: 10 },
            { output: false, value: 15 },
        ],
    },
    {
        operator: '$lt',
        query: ['$a', '$b'],
        tests: [
            { output: false, a: 10, b: 5 },
            { output: false, a: 10, b: 10 },
            { output: true, a: 5, b: 10 },
            { output: false, a: 5, b: 5 },
        ],
    },
    {
        operator: '$lte',
        query: ['$value', 10],
        tests: [
            { output: true, value: 5 },
            { output: true, value: 10 },
            { output: false, value: 15 },
        ],
    },
    {
        operator: '$lte',
        query: ['$a', '$b'],
        tests: [
            { output: false, a: 10, b: 5 },
            { output: true, a: 10, b: 10 },
            { output: true, a: 5, b: 10 },
            { output: true, a: 5, b: 5 },
        ],
    },
    {
        operator: '$ne',
        query: ['$value', 10],
        tests: [
            { output: true, value: 5 },
            { output: true, value: '5' },
            { output: false, value: 10 },
            { output: false, value: '10' },
        ],
    },
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<keyof typeof Comparison>;

operators.forEach((op) => {
    test(`Domain/Filter/Operator/Evaluation/Expression/Comparison - ${op}`, (t) => {
        t.equal(typeof Comparison[op], 'function', `${op} is an exported function`);

        data.filter(({ operator }) => operator === op).forEach(({ query, tests }: any) => {

            const compiled = Comparison[op](query, resolve);

            tests.forEach(({ output, ...input }: any) => {
                t.equal(compiled(input), output, `${JSON.stringify(query)} on ${JSON.stringify(input)} equals ${JSON.stringify(output)}`);
            });
        });

        t.end();
    });
});
