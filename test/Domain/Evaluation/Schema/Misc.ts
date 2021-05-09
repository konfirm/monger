import * as test from 'tape';
import * as Schema from '../../../../source/Domain/Evaluation/Schema';

test('Domain/Evaluation/Schema - schema/title', (t) => {
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

