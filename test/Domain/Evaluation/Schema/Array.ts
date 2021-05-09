import type { JSONSchema } from '../../../../source/Domain/Evaluation/Schema';
import * as test from 'tape';
import each from 'template-literal-each';
import * as Schema from '../../../../source/Domain/Evaluation/Schema';

test('Domain/Evaluation/Schema - schema/items', (t) => {
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
		${['one', { name: 2 }]}              | no     | yes
		${['one', 'two', { name: 'three' }]} | no     | no
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
