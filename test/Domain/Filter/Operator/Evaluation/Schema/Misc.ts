import * as test from 'tape';
import * as Schema from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';

test('Domain/Filter/Operator/Evaluation/Schema - schema/title', (t) => {
	const { schema } = Schema;
	const title = schema({ title: 'some title' });

	t.true(title(0), '0 matches { title: "some title" }');
	t.true(title('one'), '"one" matches { title: "some title" }');
	t.true(title(true), 'true matches { title: "some title" }');
	t.true(title(null), 'null matches { title: "some title" }');
	t.true(title([]), '[] matches { title: "some title" }');
	t.true(title({}), '{} matches { title: "some title" }');

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/description', (t) => {
	const { schema } = Schema;
	const description = schema({ description: 'some description' });

	t.true(description(0), '0 matches { description: "some description" }');
	t.true(description('one'), '"one" matches { description: "some description" }');
	t.true(description(true), 'true matches { description: "some description" }');
	t.true(description(null), 'null matches { description: "some description" }');
	t.true(description([]), '[] matches { description: "some description" }');
	t.true(description({}), '{} matches { description: "some description" }');

	t.end();
});
