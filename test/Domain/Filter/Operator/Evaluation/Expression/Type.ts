import type { TestRecord } from '../Expression';
import * as test from 'tape';
import * as Type from '../../../../../../source/Domain/Filter/Operator/Evaluation/Expression/Type';
import { resolve } from './Helper';

export const data: Array<TestRecord> = [
];

const operators = [...new Set(data.map(({ operator }) => operator))] as Array<keyof typeof Type>;


operators.forEach((op) => {
    test(`Domain/Filter/Operator/Evaluation/Expression/Type - ${op}`, (t) => {
        t.equal(typeof Type[op], 'function', `${op} is an exported function`);

        data.filter(({ operator }) => operator === op).forEach(({ query, tests }: any) => {
            const compiled = Type[op](query, resolve);

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
