import type { JSONSchema } from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';
import * as test from 'tape';
import each from 'template-literal-each';
import * as Schema from '../../../../../../source/Domain/Filter/Operator/Evaluation/Schema';

test('Domain/Filter/Operator/Evaluation/Schema - schema/multipleOf', (t) => {
	const { schema } = Schema;
	const value = 4;
	const multipleOf = schema({ multipleOf: value as JSONSchema['multipleOf'] });

	t.true(multipleOf(0), '0 matches { multipleOf: 4 }');
	t.false(multipleOf(2), '2 does not match { multipleOf: 4 }');
	t.true(multipleOf(4), '4 matches { multipleOf: 4 }');
	t.true(multipleOf(8), '8 matches { multipleOf: 4 }');
	t.true(multipleOf(308), '308 matches { multipleOf: 4 }');
	t.false(multipleOf(42), '42 does not match { multipleOf: 4 }');

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/maximum', (t) => {
	const { schema } = Schema;

	each`
		maximum      | exclusive | input        | matches
		-------------|-----------|--------------|---------
		${4}         |           | ${2}         | yes
		${4}         |           | ${4}         | yes
		${4}         |           | ${8}         | no
		${4}         | ${false}  | ${2}         | yes
		${4}         | ${false}  | ${4}         | yes
		${4}         | ${false}  | ${8}         | no
		${4}         | ${true}   | ${2}         | yes
		${4}         | ${true}   | ${4}         | no
		${4}         | ${true}   | ${8}         | no
		${4}         | ${5}      | ${2}         | yes
		${4}         | ${5}      | ${4}         | yes
		${4}         | ${5}      | ${8}         | no
		${4}         | ${4}      | ${2}         | yes
		${4}         | ${4}      | ${4}         | no
		${4}         | ${4}      | ${8}         | no
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { maximum, exclusive, input, matches } = record as { maximum: JSONSchema['maximum'], exclusive: JSONSchema['exclusiveMaximum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ maximum: maximum as JSONSchema['maximum'], exclusiveMaximum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { maximum: ${maximum}, exclusiveMaximum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/exclusiveMaximum', (t) => {
	const { schema } = Schema;

	each`
		exclusive    | maximum |input         | matches
		-------------|---------|--------------|---------
		${5}         |         | ${2}         | yes
		${5}         |         | ${4}         | yes
		${5}         |         | ${8}         | no
		${4}         |         | ${2}         | yes
		${4}         |         | ${4}         | no
		${4}         |         | ${8}         | no
		${5}         | ${4}    | ${2}         | yes
		${5}         | ${4}    | ${4}         | yes
		${5}         | ${4}    | ${8}         | no
		${4}         | ${4}    | ${2}         | yes
		${4}         | ${4}    | ${4}         | no
		${4}         | ${4}    | ${8}         | no
		${false}     | ${4}    | ${2}         | yes
		${false}     | ${4}    | ${4}         | yes
		${false}     | ${4}    | ${8}         | no
		${true}      | ${4}    | ${2}         | yes
		${true}      | ${4}    | ${4}         | no
		${true}      | ${4}    | ${8}         | no
		${undefined} |         | ${0}         | yes
		${undefined} |         | ${Infinity}  | yes
		${undefined} |         | ${-Infinity} | yes
	`((record) => {
		const { exclusive, maximum, input, matches } = record as { maximum: JSONSchema['maximum'], exclusive: JSONSchema['exclusiveMaximum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ maximum: maximum as JSONSchema['maximum'], exclusiveMaximum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { maximum: ${maximum}, exclusiveMaximum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/minimum', (t) => {
	const { schema } = Schema;

	each`
		minimum      | exclusive | input        | matches
		-------------|-----------|--------------|---------
		${4}         |           | ${2}         | no
		${4}         |           | ${4}         | yes
		${4}         |           | ${8}         | yes
		${4}         | ${false}  | ${2}         | no
		${4}         | ${false}  | ${4}         | yes
		${4}         | ${false}  | ${8}         | yes
		${4}         | ${true}   | ${2}         | no
		${4}         | ${true}   | ${4}         | no
		${4}         | ${true}   | ${8}         | yes
		${4}         | ${5}      | ${2}         | no
		${4}         | ${5}      | ${4}         | no
		${4}         | ${5}      | ${8}         | yes
		${4}         | ${4}      | ${2}         | no
		${4}         | ${4}      | ${4}         | no
		${4}         | ${4}      | ${8}         | yes
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { minimum, exclusive, input, matches } = record as { minimum: JSONSchema['minimum'], exclusive: JSONSchema['exclusiveMinimum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ minimum: minimum as JSONSchema['minimum'], exclusiveMinimum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { minimum: ${minimum}, exclusiveMinimum: ${exclusive} }`);
	});

	t.end();
});

test('Domain/Filter/Operator/Evaluation/Schema - schema/exclusiveMinimum', (t) => {
	const { schema } = Schema;

	each`
		exclusive    | minimum   |input | matches
		-------------|-----------|------|---------
		${5}         |           |${2}  | no
		${5}         |           |${4}  | no
		${5}         |           |${8}  | yes
		${4}         |           |${2}  | no
		${4}         |           |${4}  | no
		${4}         |           |${8}  | yes
		${5}         | ${4}      |${2}  | no
		${5}         | ${4}      |${4}  | no
		${5}         | ${4}      |${8}  | yes
		${4}         | ${4}      |${2}  | no
		${4}         | ${4}      |${4}  | no
		${4}         | ${4}      |${8}  | yes
		${false}     | ${4}      |${2}  | no
		${false}     | ${4}      |${4}  | yes
		${false}     | ${4}      |${8}  | yes
		${true}      | ${4}      |${2}  | no
		${true}      | ${4}      |${4}  | no
		${true}      | ${4}      |${8}  | yes
		${undefined} |           | ${0}         | yes
		${undefined} |           | ${Infinity}  | yes
		${undefined} |           | ${-Infinity} | yes
	`((record) => {
		const { exclusive, minimum, input, matches } = record as { minimum: JSONSchema['minimum'], exclusive: JSONSchema['exclusiveMinimum'], input: any, matches: 'yes' | 'no' };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const evaluate = schema({ minimum: minimum as JSONSchema['minimum'], exclusiveMinimum: exclusive });

		t.equal(evaluate(input), isMatch, `${input} ${message} { minimum: ${minimum}, exclusiveMinimum: ${exclusive} }`);
	});

	t.end();
});
