import * as test from 'tape';
import * as Terms from '../../../source/Domain/Search/Term';

test('Domain/Search/Term - exports', (t) => {
	const expected = ['Term'];
	const actual = Object.keys(Terms);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Terms[<keyof typeof Terms>key], 'function', `contains function ${key}`);
	});

	t.end();
});

const { Term } = Terms;

test('Domain/Search/Term - constructor', (t) => {
	const term = new Term('foo');

	t.true(term.match('foo'), 'matches "foo"');
	t.true(term.match('FOO'), 'matches "FOO"');
	t.true(term.match('föö'), 'matches "föö"');
	t.true(term.match('FÖÖ'), 'matches "FÖÖ"');

	t.end();
});

test('Domain/Search/Term - createTerms', (t) => {
	const terms = Term.createTerms('a foo');

	t.true(terms.every((t) => t.match('a foo')), 'matches "a foo"');
	t.true(terms.every((t) => t.match('A FOO')), 'matches "A FOO"');
	t.true(terms.every((t) => t.match('ä föö')), 'matches "ä föö"');
	t.true(terms.every((t) => t.match('Ä FÖÖ')), 'matches "Ä FÖÖ"');

	t.end();
});
