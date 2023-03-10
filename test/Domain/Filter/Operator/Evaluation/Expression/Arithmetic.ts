import type { TestRecord } from '../Expression';
import * as test from 'tape';
import * as Arithmetic from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Arithmetic';
import { resolve } from './Helper';

export const data: Array<TestRecord> = [
    {
        operator: '$abs',
        query: '$value',
        tests: [
            { output: null },
            { output: null, value: null },
            { output: null, value: undefined },
            { output: NaN, value: NaN },
            { output: 1, value: 1 },
            { output: NaN, value: '1' },
            { output: 1, value: -1 },
            { output: NaN, value: '-1' },
            { output: Math.PI, value: Math.PI },
            { output: Math.PI, value: -Math.PI },
        ],
    },
    {
        operator: '$abs',
        query: -7.7,
        tests: [
            { output: 7.7 },
        ],
    },
    {
        operator: '$abs',
        query: 7.7,
        tests: [
            { output: 7.7 },
        ],
    },
    {
        operator: '$add',
        query: [1000, '$value'],
        tests: [
            { output: 900, value: -100 },
            { output: 1000, value: 0 },
            { output: 1001, value: 1 },
            { output: 1010, value: 10 },
            { output: 1100, value: 100 },
            { output: 2000, value: 1000 },
            { output: new Date('2000-01-01T00:00:01Z'), value: new Date('2000-01-01T00:00:00Z') },
            { output: null },
        ],
    },
    {
        operator: '$add',
        query: ['$a', '$b', 10, '$d'],
        tests: [
            { output: null },
            { output: null, a: 1 },
            { output: null, a: 1, b: 2 },
            { output: null, a: 1, b: 2, c: 3 },
            { output: 17, a: 1, b: 2, c: 3, d: 4 },
            { output: 31, a: 9, b: 5, d: 7 },
            { output: null, a: new Date('2020-02-02T02:02:02.000Z'), b: 5 },
            { output: new Date('2020-02-02T02:02:02.020Z'), a: new Date('2020-02-02T02:02:02.000Z'), b: 5, d: 5 },
            { output: new Date('2020-02-02T02:02:02.020Z'), a: 5, b: new Date('2020-02-02T02:02:02.000Z'), d: 5 },
            { output: new Date('2020-02-02T02:02:02.020Z'), a: 5, b: 5, d: new Date('2020-02-02T02:02:02.000Z') },
            { error: /only one date allowed in an \$add expression/, a: new Date('2020-02-02T02:02:02.000Z'), b: new Date('2020-02-02T02:02:02.000Z'), d: 0 },
        ],
    },
    {
        operator: '$ceil',
        query: '$value',
        tests: [
            { output: null },
            { output: null, value: null },
            { output: null, value: undefined },
            { output: NaN, value: NaN },
            { output: -7, value: -7.7 },
            { output: NaN, value: '-7.7' },
            { output: 8, value: 7.7 },
            { output: NaN, value: '7.7' },
        ],
    },
    {
        operator: '$divide',
        query: ['$value', 2],
        tests: [
            { output: 2, value: 4 },
            { output: 1, value: 2 },
            { output: NaN },
            { output: 0.5, value: 1 },
        ],
    },
    {
        operator: '$exp',
        query: '$value',
        tests: [
            { output: 1, value: 0 },
            { output: 7.38905609893065, value: 2 },
            { output: 0.1353352832366127, value: -2 },
        ],
    },
    {
        operator: '$floor',
        query: '$value',
        tests: [
            { output: null },
            { output: null, value: null },
            { output: null, value: undefined },
            { output: NaN, value: NaN },
            { output: -8, value: -7.7 },
            { output: NaN, value: '-7.7' },
            { output: 7, value: 7.7 },
            { output: NaN, value: '7.7' },
        ],
    },
    {
        operator: '$ln',
        query: '$value',
        tests: [
            { output: NaN },
            { output: NaN, value: null },
            { output: NaN, value: 'string' },
            { output: 0, value: 1 },
            { output: 1, value: Math.E },
            { output: 2.302585092994046, value: 10 },
        ],
    },
    {
        operator: '$log',
        query: ['$a', '$b'],
        tests: [
            { output: NaN },
            { output: NaN, a: null, b: 10 },
            { output: NaN, a: 'string', b: 10 },
            { output: NaN, a: 100 },
            { output: NaN, a: 100, b: null },
            { output: NaN, a: 100, b: 'string' },
            { output: NaN, b: 10 },
            { output: 2, a: 100, b: 10 },
            { output: 4.605170185988092, a: 100, b: Math.E },
        ],
    },
    {
        operator: '$log10',
        query: '$value',
        tests: [
            { output: NaN },
            { output: NaN, value: null },
            { output: NaN, value: 'string' },
            { output: 0, value: 1 },
            { output: 1, value: 10 },
            { output: 2, value: 100 },
            { output: 3, value: 1000 },
        ],
    },
    {
        operator: '$mod',
        query: ['$a', '$b'],
        tests: [
            { output: null },
            { output: null, a: 10 },
            { output: null, b: 2 },
            { output: 0, a: 10, b: 2 },
            { output: 1, a: 9, b: 2 },
            { output: 0, a: 9, b: 3 },
        ],
    },
    {
        operator: '$multiply',
        query: ['$a', '$b', 10],
        tests: [
            { output: null },
            { output: null, a: 10 },
            { output: null, b: 2 },
            { output: 200, a: 10, b: 2 },
            { output: 150, a: 3, b: 5 },
            { output: -150, a: -3, b: 5 },
        ],
    },
    {
        operator: '$pow',
        query: ['$a', '$b'],
        tests: [
            { output: null },
            { output: null, a: 10 },
            { output: null, b: 2 },
            { output: 100, a: 10, b: 2 },
            { output: 81, a: 9, b: 2 },
            { output: 729, a: 9, b: 3 },
        ],
    },
    {
        operator: '$round',
        query: ['$a', '$b'],
        tests: [
            { output: null },
            { output: null, b: 2 },
            { output: null, a: 12345, b: null },
            { output: NaN, a: 'string' },
            { output: NaN, a: 12345, b: 'string' },
            { output: 12346, a: 12345.7890123456789 },
            { output: 12345.8, a: 12345.7890123456789, b: 1 },
            { output: 12345.79, a: 12345.7890123456789, b: 2 },
            { output: 12345.7890123457, a: 12345.7890123456789, b: 10 },
            { output: 12350, a: 12345.7890123456789, b: -1 },
            { output: 12300, a: 12345.7890123456789, b: -2 },
            { output: 10000, a: 12345.7890123456789, b: -4 },
            { output: -12346, a: -12345.7890123456789 },
            { output: -12345.8, a: -12345.7890123456789, b: 1 },
            { output: -12345.79, a: -12345.7890123456789, b: 2 },
            { output: -12345.7890123457, a: -12345.7890123456789, b: 10 },
            { output: -12350, a: -12345.7890123456789, b: -1 },
            { output: -12300, a: -12345.7890123456789, b: -2 },
            { output: -10000, a: -12345.7890123456789, b: -4 },
        ],
    },
    {
        operator: '$sqrt',
        query: '$value',
        tests: [
            { output: null },
            { output: null, value: null },
            { output: NaN, value: 'string' },
            { output: 5, value: 25 },
            { output: 7, value: 49 },
            { output: 5.477225575051661, value: 30 },
            { error: /requires a positive value/, value: -49 },
        ],
    },
    {
        operator: '$subtract',
        query: ['$a', '$b'],
        tests: [
            { output: null },
            { output: null, a: 10 },
            { output: null, a: 10, b: null },
            { output: null, a: new Date('2023-03-10T12:00:00Z') },
            { output: null, b: 10 },
            { output: null, a: null, b: 10 },
            { output: null, b: new Date('2023-03-10T12:00:00Z') },
            { output: NaN, a: 10, b: 'string' },
            { output: NaN, a: new Date('2023-03-10T12:00:00Z'), b: 'string' },
            { output: 10, a: 100, b: 90 },
            { output: 10, a: new Date('2023-03-10T12:00:00.01Z'), b: new Date('2023-03-10T12:00:00Z') },
            { output: new Date('2023-03-10T10:00:00Z'), a: new Date('2023-03-10T12:00:00Z'), b: 1000 * 60 * 60 * 2 },
        ],
    },
    {
        operator: '$trunc',
        query: ['$a', '$b'],
        tests: [
            { output: null },
            { output: null, b: 2 },
            { output: null, a: 12345, b: null },
            { output: NaN, a: 'string' },
            { output: NaN, a: 12345, b: 'string' },
            { output: 12345, a: 12345.7890123456789 },
            { output: 12345, a: 12345 },
            { output: 12345.7, a: 12345.7890123456789, b: 1 },
            { output: 12345, a: 12345, b: 1 },
            { output: 12345.78, a: 12345.7890123456789, b: 2 },
            { output: 12345, a: 12345, b: 2 },
            { output: 12345.7890123456, a: 12345.7890123456789, b: 10 },
            { output: 12340, a: 12345.7890123456789, b: -1 },
            { output: 12300, a: 12345.7890123456789, b: -2 },
            { output: 10000, a: 12345.7890123456789, b: -4 },
            { output: -12345, a: -12345.7890123456789 },
            { output: -12345, a: -12345 },
            { output: -12345.7, a: -12345.7890123456789, b: 1 },
            { output: -12345, a: -12345, b: 1 },
            { output: -12345.78, a: -12345.7890123456789, b: 2 },
            { output: -12345, a: -12345, b: 2 },
            { output: -12345.7890123456, a: -12345.7890123456789, b: 10 },
            { output: -12340, a: -12345.7890123456789, b: -1 },
            { output: -12300, a: -12345.7890123456789, b: -2 },
            { output: -10000, a: -12345.7890123456789, b: -4 },
        ],
    },
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<keyof typeof Arithmetic>;


operators.forEach((op) => {
    test(`Domain/Filter/Operator/Evaluation/Expression/Arithmetic - ${op}`, (t) => {
        t.equal(typeof Arithmetic[op], 'function', `${op} is an exported function`);

        data.filter(({ operator }) => operator === op).forEach(({ query, tests }: any) => {
            const compiled = Arithmetic[op](query, resolve);

            tests.forEach(({ output, error, ...input }: any) => {
                if (error) {
                    t.throws(() => compiled(input), error, `{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} throws ${error}`);
                }
                else {
                    t.deepEqual(compiled(input), output, `{ ${op}: ${JSON.stringify(query)} } on ${JSON.stringify(input)} equals ${JSON.stringify(output)}`);
                }
            });
        });

        t.end();
    });
});
