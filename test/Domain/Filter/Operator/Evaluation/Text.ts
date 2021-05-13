import * as test from 'tape';
import * as Text from '../../../../../source/Domain/Filter/Operator/Evaluation/Text';

test('Domain/Filter/Operator/Evaluation/Text - exports', (t) => {
	const expected = ['Term'];
	const actual = Object.keys(Text);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Text[<keyof typeof Text>key], 'function', `contains function ${key}`);
	});

	t.end();
});

const { Term } = Text;

test('Domain/Filter/Operator/Evaluation/Text - constructor', (t) => {
	const term = new Term('foo');

	t.true(term.match('foo'), 'matches "foo"');
	t.true(term.match('FOO'), 'matches "FOO"');
	t.true(term.match('föö'), 'matches "föö"');
	t.true(term.match('FÖÖ'), 'matches "FÖÖ"');

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Text - createTerms', (t) => {
	const terms = Term.createTerms('a foo');

	t.true(terms.every((t) => t.match('a foo')), 'matches "a foo"');
	t.true(terms.every((t) => t.match('A FOO')), 'matches "A FOO"');
	t.true(terms.every((t) => t.match('ä föö')), 'matches "ä föö"');
	t.true(terms.every((t) => t.match('Ä FÖÖ')), 'matches "Ä FÖÖ"');

	t.end();
});
