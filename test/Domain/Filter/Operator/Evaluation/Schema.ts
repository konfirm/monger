import * as test from 'tape';
import * as Schema from '../../../../../source/Domain/Filter/Operator/Evaluation/Schema';

test('Domain/Filter/Operator/Evaluation/Schema - exports', (t) => {
	const expected = ['schema'];
	const actual = Object.keys(Schema);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Schema[<keyof typeof Schema>key], 'function', `contains function ${key}`);
	});

	t.end();
});
