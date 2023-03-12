import type { TestRecord } from '../Expression';
import * as test from 'tape';
import * as Literal from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Literal';
import { resolve } from './Helper';

export const data: Array<TestRecord> = [
    {
        operator: '$literal',
        query: '$value',
        tests: [
            { output: '$value', value: 1 },
            { output: '$value', value: true },
            { output: '$value', value: 'foo' },
            { output: '$value', value: new Date('2023-03-12T12:00:00Z') },
            { output: '$value', value: ['a', 'b', 'c'] },
            { output: '$value', value: { a: 1, b: 2, c: 3 } },
        ],
    },
    {
        operator: '$literal',
        query: { $add: [2, 3] },
        tests: [
            { output: { $add: [2, 3] }, value: 1 },
            { output: { $add: [2, 3] }, value: true },
            { output: { $add: [2, 3] }, value: 'foo' },
            { output: { $add: [2, 3] }, value: new Date('2023-03-12T12:00:00Z') },
            { output: { $add: [2, 3] }, value: ['a', 'b', 'c'] },
            { output: { $add: [2, 3] }, value: { a: 1, b: 2, c: 3 } },
        ],
    },
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<keyof typeof Literal>;


operators.forEach((op) => {
    test(`Domain/Filter/Operator/Evaluation/Expression/Literal - ${op}`, (t) => {
        t.equal(typeof Literal[op], 'function', `${op} is an exported function`);

        data.filter(({ operator }) => operator === op).forEach(({ query, tests }: any) => {
            const compiled = Literal[op](query, resolve);

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
