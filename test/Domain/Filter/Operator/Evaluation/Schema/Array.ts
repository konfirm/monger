import type { JSONSchema } from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';
import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Schema from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';

test('Domain/Filter/Operator/Evaluation/Schema - schema/additionalItems', (t) => {
	const { schema } = Schema;

	each`
		input                                | additional            | matches
		-------------------------------------|-----------------------|-------
		${[]}                                |                       | yes
		${[]}                                | ${true}               | yes
		${[]}                                | ${false}              | yes
		${[]}                                | ${{ type: 'number' }} | yes
		${['one']}                           |                       | yes
		${['one']}                           | ${true}               | yes
		${['one']}                           | ${false}              | yes
		${['one']}                           | ${{ type: 'number' }} | yes
		${['one', 'two']}                    |                       | no
		${['one', 'two']}                    | ${true}               | no
		${['one', 'two']}                    | ${false}              | no
		${['one', 'two']}                    | ${{ type: 'number' }} | no
		${['one', 'two', 3]}                 |                       | no
		${['one', 'two', 3]}                 | ${true}               | no
		${['one', 'two', 3]}                 | ${false}              | no
		${['one', 'two', 3]}                 | ${{ type: 'number' }} | no
		${['one', 2]}                        |                       | no
		${['one', 2]}                        | ${true}               | no
		${['one', 2]}                        | ${false}              | no
		${['one', 2]}                        | ${{ type: 'number' }} | no
		${[{ name: 'one' }]}                 |                       | no
		${[{ name: 'one' }]}                 | ${true}               | no
		${[{ name: 'one' }]}                 | ${false}              | no
		${[{ name: 'one' }]}                 | ${{ type: 'number' }} | no
		${['one', { name: 'two' }]}          |                       | yes
		${['one', { name: 'two' }]}          | ${true}               | yes
		${['one', { name: 'two' }]}          | ${false}              | yes
		${['one', { name: 'two' }]}          | ${{ type: 'number' }} | yes
		${['one', { name: 'two' }, 'three']} |                       | yes
		${['one', { name: 'two' }, 'three']} | ${true}               | yes
		${['one', { name: 'two' }, 'three']} | ${false}              | no
		${['one', { name: 'two' }, 'three']} | ${{ type: 'number' }} | no
		${['one', { name: 'two' }, 'three']} | ${{ type: 'string' }} | yes
		${['one', { name: 'two' }, 3]}       | ${{ type: 'number' }} | yes
		${['one', { name: 'two' }, 3]}       | ${{ type: 'string' }} | no
	`((record) => {
		const { input, additional, matches } = record as { input: any, additional: undefined | boolean | {}, matches: string };
		const schematic = {
			items: [{ type: 'string' }, { type: 'object', required: ['name'] }],
			additionalItems: additional,
		};
		const additionalItems = schema(schematic as JSONSchema);
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';

		t.equal(additionalItems(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(schematic)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/items', (t) => {
	const { schema } = Schema;
	const singleSchematic = { items: { type: 'string' } };
	const multipleSchematic = { items: [{ type: 'string' }, { type: 'object', required: ['name'] }] };
	const singleItem = schema(singleSchematic as JSONSchema);
	const multipleItems = schema(multipleSchematic as JSONSchema);

	each`
		input                                | single | multiple
		-------------------------------------|--------|----------
		${[]}                                | yes    | yes
		${['one']}                           | yes    | yes
		${['one', 'two']}                    | yes    | no
		${['one', 'two', 3]}                 | no     | no
		${['one', 2]}                        | no     | no
		${[{ name: 'one' }]}                 | no     | no
		${['one', { name: 'two' }]}          | no     | yes
		${['one', { name: 'two' }, 'three']} | no     | yes
		${['one', { name: 2 }]}              | no     | yes
		${['one', 'two', { name: 3 }]}       | no     | no
		${[{ name: 1 }, 'two']}              | no     | no
		${[{ name: 1 }, { name: 2 }]}        | no     | no
		${[{ num: 1 }]}                      | no     | no
		${['one', { num: 2 }]}               | no     | no
	`((record) => {
		const { input, single, multiple } = record as { input: any, single: string, multiple: string };
		const isSingleMatch = single === 'yes';
		const isMultipleMatch = multiple === 'yes';
		const singleMessage = isSingleMatch ? 'matches' : 'does not match';
		const multipleMessage = isMultipleMatch ? 'matches' : 'does not match';

		t.equal(singleItem(input), isSingleMatch, `${JSON.stringify(input)} ${singleMessage} ${JSON.stringify(singleSchematic)}`);
		t.equal(multipleItems(input), isMultipleMatch, `${JSON.stringify(input)} ${multipleMessage} ${JSON.stringify(multipleSchematic)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/maxItems', (t) => {
	const { schema } = Schema;
	const maxItems = schema({ maxItems: 3 });
	const input: Array<any> = [];

	for (let i = 1; i < 7; ++i) {
		const isMatch = i <= 3;
		const message = isMatch ? 'matches' : 'does not match';

		input.push(`p${i}`);

		t.equal(maxItems(input), isMatch, `${JSON.stringify(input)} ${message} { maxItems: 3 }`);
	}

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/minItems', (t) => {
	const { schema } = Schema;
	const minItems = schema({ minItems: 3 });
	const input: Array<any> = [];

	for (let i = 1; i < 7; ++i) {
		const isMatch = i >= 3;
		const message = isMatch ? 'matches' : 'does not match';

		input.push(`p${i}`);

		t.equal(minItems(input), isMatch, `${JSON.stringify(input)} ${message} { minItems: 3 }`);
	}

	t.end();
});


test('Domain/Filter/Operator/Evaluation/Schema - schema/uniqueItems', (t) => {
	const { schema } = Schema;

	each`
		input                | unique   | matches
		---------------------|----------|---------
		${[]}                | ${true}  | yes
		${[]}                | ${false} | yes
		${[1]}               | ${true}  | yes
		${[1]}               | ${false} | yes
		${[1, 2]}            | ${true}  | yes
		${[1, 2]}            | ${false} | yes
		${[1, 1]}            | ${true}  | no
		${[1, 1]}            | ${false} | yes
		${['one', 1]}        | ${true} | yes
		${['one', 1]}        | ${false} | yes
		${['one', 'two']}    | ${true} | yes
		${['one', 'two']}    | ${false} | yes
		${['one', 'one']}    | ${true} | no
		${['one', 'one']}    | ${false} | yes
	`((record) => {
		const { input, unique, matches } = record as { input: any, unique: boolean, matches: string };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const schematic = { uniqueItems: unique };
		const uniqueItems = schema(schematic);

		t.equal(uniqueItems(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(schematic)}`);
	});

	t.end();
});
