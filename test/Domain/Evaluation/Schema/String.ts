import * as test from 'tape';
import * as Schema from '../../../../source/Domain/Evaluation/Schema';

test('Domain/Evaluation/Schema - schema/maxLength', (t) => {
	const { schema } = Schema;
	const maxLength = schema({ maxLength: 7 });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i <= 7;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);

		t.equal(maxLength(input), isMatch, `${input} ${message} { maxLength: 7 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/minLength', (t) => {
	const { schema } = Schema;
	const minLength = schema({ minLength: 7 });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i >= 7;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);

		t.equal(minLength(input), isMatch, `${input} ${message} { minLength: 7 }`);
	}

	t.end();
});

test('Domain/Evaluation/Schema - schema/pattern', (t) => {
	const { schema } = Schema;
	const pattern = schema({ pattern: '^[a-z]{2,}$' });
	const regex = schema({ pattern: /^[a-z]{2,}$/i });
	const string = 'abcdefghijklm';

	for (let i = 1; i < string.length; ++i) {
		const isMatch = i >= 2;
		const message = isMatch ? 'matches' : 'does not match';
		const input = string.slice(0, i);
		const upper = input.toUpperCase();

		t.equal(pattern(input), isMatch, `${input} ${message} { pattern: "^[a-z]{2,}$" }`);
		t.equal(pattern(upper), false, `${upper} does not match { pattern: "^[a-z]{2,}$" }`);
		t.equal(regex(input), isMatch, `${input} ${message} { pattern: /^[a-z]{2,}$/i }`);
		t.equal(regex(upper), isMatch, `${upper} ${message} { pattern: /^[a-z]{2,}$/i }`);
	}

	t.end();
});
