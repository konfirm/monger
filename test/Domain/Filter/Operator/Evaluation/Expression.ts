import * as test from 'tape';
import * as Expression from '../../../../../source/Domain/Filter/Operator/Evaluation/Expression';
import { data as comparison } from './Expression/Comparison';


type TestOutput = { output: unknown, [key: string]: unknown };
type TestError = { error: RegExp | string, [key: string]: unknown };
export type TestRecord = {
    operator: `$${string}`;
    query: any;
    tests: Array<TestOutput | TestError>;
}

export const data: Array<TestRecord> = [
    {
        operator: '$nope',
        query: 10,
        tests: [
            { error: /Invalid expression/ },
        ],
    },
    ...comparison,
]


test('Domain/Filter/Operator/Evaluation/Expression - exports', (t) => {
    const expected = ['expression'];
    const actual = Object.keys(Expression);

    t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
    expected.forEach((key) => {
        t.equal(typeof Expression[<keyof typeof Expression>key], 'function', `contains function ${key}`);
    });

    t.end();
});

const { expression } = Expression;

test('Domain/Filter/Operator/Evaluation/Expression - expression', (t) => {
    data.forEach(({ operator, query, tests }) => {
        const q = { [operator]: query };

        tests.forEach(({ output, error, ...input }: any) => {
            if (error) {
                t.throws(() => {
                    const compiled = expression(q);

                    return compiled(input)
                }, error, `${JSON.stringify(q)} on ${JSON.stringify(input)} throws ${error}`);
            }
            else {
                const compiled = expression(q);
                t.deepEqual(compiled(input), output, `${JSON.stringify(q)} on ${JSON.stringify(input)} equals ${JSON.stringify(output)}`);
            }
        });
    });

    t.end();
});
