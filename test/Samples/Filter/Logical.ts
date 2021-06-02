import * as test from 'tape';
import each from 'template-literal-each';
import { filter } from '../../../source/main';

test('Samples/Filter/Logical - $and', (t) => {
	const query = {
		$and: [
			{ name: { $exists: true } },
			{ age: { $gte: 21 } },
		]
	};
	const and = filter(query);

	each`
		name     | age   | matches
		---------|-------|---------
		         |       | no
		         | ${20} | no
		         | ${21} | no
		Foo      |       | no
		Foo      | ${20} | no
		Foo      | ${21} | yes
		${true}  | ${21} | yes
		${false} | ${21} | yes
		${null}  | ${21} | no
		${1}     | ${21} | yes
	`((record) => {
		const { name, age, matches } = record as { name: any, age?: number, matches: string };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const input = { name, age };

		t.equal(and(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`)
	});

	t.end();
});

test('Samples/Logical - $not', (t) => {
	const query = {
		$not: {
			name: { $exists: true },
			age: { $gte: 21 },
		}
	};
	const not = filter(query);

	each`
		name     | age   | matches
		---------|-------|---------
		         |       | yes
		         | ${20} | yes
		         | ${21} | yes
		Foo      |       | yes
		Foo      | ${20} | yes
		Foo      | ${21} | no
		${true}  | ${21} | no
		${false} | ${21} | no
		${null}  | ${21} | yes
		${1}     | ${21} | no
	`((record) => {
		const { name, age, matches } = record as { name: any, age?: number, matches: string };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const input = { name, age };

		t.equal(not(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`)
	});

	t.end();
});

test('Samples/Logical - $nor', (t) => {
	const query = {
		$nor: [
			{ name: { $exists: true } },
			{ age: { $gte: 21 } },
		]
	};
	const nor = filter(query);

	each`
		name     | age   | matches
		---------|-------|---------
		         |       | yes
		         | ${20} | yes
		         | ${21} | no
		Foo      |       | no
		Foo      | ${20} | no
		Foo      | ${21} | no
		${true}  | ${21} | no
		${false} | ${21} | no
		${null}  | ${21} | no
		${1}     | ${21} | no
	`((record) => {
		const { name, age, matches } = record as { name: any, age?: number, matches: string };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const input = { name, age };

		t.equal(nor(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`)
	});

	t.end();
});

test('Samples/Logical - $or', (t) => {
	const query = {
		$or: [
			{ name: { $exists: true } },
			{ age: { $gte: 21 } },
		]
	};
	const or = filter(query);

	each`
		name     | age   | matches
		---------|-------|---------
		         |       | no
		         | ${20} | no
		         | ${21} | yes
		Foo      |       | yes
		Foo      | ${20} | yes
		Foo      | ${21} | yes
		${true}  | ${21} | yes
		${false} | ${21} | yes
		${null}  | ${21} | yes
		${1}     | ${21} | yes
	`((record) => {
		const { name, age, matches } = record as { name: any, age?: number, matches: string };
		const isMatch = matches === 'yes';
		const message = isMatch ? 'matches' : 'does not match';
		const input = { name, age };

		t.equal(or(input), isMatch, `${JSON.stringify(input)} ${message} ${JSON.stringify(query)}`)
	});

	t.end();
});
