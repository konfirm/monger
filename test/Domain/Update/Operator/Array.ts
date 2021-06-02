import * as test from 'tape';
import each from 'template-literal-each';
import { json, jsonify, preserve } from '../../../Utility';
import * as ArrayOperator from '../../../../source/Domain/Update/Operator/Array';

test('Domain/Update/Operator/Array - exports', (t) => {
	const expected = ['$addToSet', '$pop', '$pull', '$push', '$pullAll'];
	const actual = Object.keys(ArrayOperator);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof ArrayOperator[<keyof typeof ArrayOperator>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $addToSet', (t) => {
	const { $addToSet } = ArrayOperator;
	const values = [2, 'two', [2], { two: 2 }];

	values.forEach((v) => {
		const query = { 'foo.bar': v };
		const addToSet = $addToSet(query);

		each`
			input                              | output
			-----------------------------------|--------
			${{}}                              | ${{ foo: { bar: [v] } }}
			${{ foo: { bar: [] } }}            | ${{ foo: { bar: [v] } }}
			${{ foo: { bar: [v] } }}           | ${{ foo: { bar: [v] } }}
			${{ foo: { bar: [1, 3] } }}        | ${{ foo: { bar: [1, 3, v] } }}
			${{ foo: { bar: [1, v] } }}        | ${{ foo: { bar: [1, v] } }}
			${{ foo: { bar: [[1], [3]] } }}    | ${{ foo: { bar: [[1], [3], v] } }}
			${{ foo: { bar: [[1], [3], v] } }} | ${{ foo: { bar: [[1], [3], v] } }}
			${{ foo: { bar: [{ two: 1 }] } }}  | ${{ foo: { bar: [{ two: 1 }, v] } }}
		`((record) => {
			const { input, output } = record as { [key: string]: unknown };
			const result = addToSet(preserve(input) as Parameters<typeof addToSet>[0])

			t.equal(
				json(result),
				json(output),
				jsonify`${query} on ${input} updates to ${result}`
			);
		});
	});

	t.end();
});

test('Domain/Update/Operator/Array - $addToSet with $each', (t) => {
	const { $addToSet } = ArrayOperator;
	const queryWithEach = { 'foo.bar': { $each: ['one', 'three'] } };
	const addToSetWithEach = $addToSet(queryWithEach);

	each`
		input                               | output
		------------------------------------|--------
		${{}}                               | ${{ foo: { bar: ['one', 'three'] } }}
		${{ foo: { bar: [] } }}             | ${{ foo: { bar: ['one', 'three'] } }}
		${{ foo: { bar: ['one'] } }}        | ${{ foo: { bar: ['one', 'three'] } }}
		${{ foo: { bar: ['one', 'two'] } }} | ${{ foo: { bar: ['one', 'two', 'three'] } }}
	`((record) => {
		const { input, output } = record as { [key: string]: unknown };
		const result = addToSetWithEach(preserve(input) as Parameters<typeof addToSetWithEach>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${queryWithEach} on ${input} updates to ${result}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $addToSet errors', (t) => {
	const { $addToSet } = ArrayOperator;
	each`
		query                               | input             | error
		------------------------------------|-------------------|-------
		${{ 'foo': 1 }}                     | ${1}              | Cannot create field 'foo' in element 1
		${{ 'foo.bar': 2 }}                 | ${{ foo: 1 }}     | Cannot create field 'bar' in element {foo:1}
		${{ 'foo': 1 }}                     | ${{ foo: 1 }}     | Cannot apply $addToSet to non-array field. Field named 'foo' has non-array type int
		${{ 'foo': 1 }}                     | ${{ foo: true }}  | Cannot apply $addToSet to non-array field. Field named 'foo' has non-array type bool
		${{ 'foo': 1 }}                     | ${{ foo: false }} | Cannot apply $addToSet to non-array field. Field named 'foo' has non-array type bool
		${{ 'foo': 1 }}                     | ${{ foo: null }}  | Cannot apply $addToSet to non-array field. Field named 'foo' has non-array type null
		${{ 'foo': 1 }}                     | ${{ foo: 'no' }}  | Cannot apply $addToSet to non-array field. Field named 'foo' has non-array type string
		${{ 'foo': { $each: 1 } }}          | ${{ foo: 'no' }}  | The argument to $each in $addToSet must be an array but it was of type int
		${{ 'foo': { $each: 'one' } }}      | ${{ foo: 'no' }}  | The argument to $each in $addToSet must be an array but it was of type string
		${{ 'foo': { $each: true } }}       | ${{ foo: 'no' }}  | The argument to $each in $addToSet must be an array but it was of type bool
		${{ 'foo': { $each: { foo: 1 } } }} | ${{ foo: 'no' }}  | The argument to $each in $addToSet must be an array but it was of type object
	`((record) => {
		const { query, input, error } = record as { error: string, [key: string]: unknown };
		const match = new RegExp(error.replace(/([\$\[\]\{\}])/g, '\\$1'));

		t.throws(
			() => {
				const addToSet = $addToSet(query as Parameters<typeof $addToSet>[0]);
				addToSet(preserve(input) as Parameters<typeof addToSet>[0])
			},
			match,
			jsonify`${query} on ${input} throws: ${error}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pop', (t) => {
	const { $pop } = ArrayOperator;

	each`
		query          | input                      | output
		---------------|----------------------------|--------
		${{ foo: 1 }}  | ${{}}                      | ${{}}
		${{ foo: -1 }} | ${{}}                      | ${{}}
		${{ foo: 1 }}  | ${{ foo: [] }}             | ${{ foo: [] }}
		${{ foo: -1 }} | ${{ foo: [] }}             | ${{ foo: [] }}
		${{ foo: 1 }}  | ${{ foo: [1] }}            | ${{ foo: [] }}
		${{ foo: -1 }} | ${{ foo: [1] }}            | ${{ foo: [] }}
		${{ foo: 1 }}  | ${{ foo: ['one', 'two'] }} | ${{ foo: ['one'] }}
		${{ foo: -1 }} | ${{ foo: ['one', 'two'] }} | ${{ foo: ['two'] }}
	`((record) => {
		const { query, input, output } = record as { [key: string]: unknown };
		const pop = $pop(query as Parameters<typeof $pop>[0]);
		const result = pop(preserve(input) as Parameters<typeof pop>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${result}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pop errors', (t) => {
	const { $pop } = ArrayOperator;
	each`
		query         | input                  | error
		--------------|------------------------|--------
		${{ foo: 1 }} | ${{ foo: null }}       | Cannot apply $pop to non-array field. Field named 'foo' has non-array type null
		${{ foo: 1 }} | ${{ foo: 1 }}          | Cannot apply $pop to non-array field. Field named 'foo' has non-array type int
		${{ foo: 1 }} | ${{ foo: 'one' }}      | Cannot apply $pop to non-array field. Field named 'foo' has non-array type string
		${{ foo: 1 }} | ${{ foo: { bar: 1 } }} | Cannot apply $pop to non-array field. Field named 'foo' has non-array type object
	`((record) => {
		const { query, input, error } = record as { error: string, [key: string]: unknown };
		const match = new RegExp((error || '').replace(/([\$\[\]\{\}])/g, '\\$1'));

		t.throws(
			() => {
				const pop = $pop(query as Parameters<typeof $pop>[0]);
				pop(preserve(input) as Parameters<typeof pop>[0]);
			},
			match,
			jsonify`${query} on ${input} throws: ${error}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pull', (t) => {
	const { $pull } = ArrayOperator;
	each`
		query                           | input                                | output
		--------------------------------|--------------------------------------|--------
		${{ foo: 1 }}                   | ${{}}                                | ${{}}
		${{ foo: 1 }}                   | ${{ foo: [1, 2, 3] }}                | ${{ foo: [2, 3] }}
		${{ foo: 'bar' }}               | ${{ foo: ['bar', 'baz'] }}           | ${{ foo: ['baz'] }}
		${{ foo: [1, 'bar'] }}          | ${{ foo: [1, 2, 3] }}                | ${{ foo: [1, 2, 3] }}
		${{ foo: [1, 'bar'] }}          | ${{ foo: ['bar', 'baz'] }}           | ${{ foo: ['bar', 'baz'] }}
		${{ foo: { bar: 1 } }}          | ${{ foo: [{ bar: 1 }, { baz: 2 }] }} | ${{ foo: [{ baz: 2 }] }}
		${{ foo: { $gt: 1 } }}          | ${{ foo: [1, 2, 3] }}                | ${{ foo: [1] }}
		${{ foo: { $in: [1, 'bar'] } }} | ${{ foo: [1, 2, 3] }}                | ${{ foo: [2, 3] }}
		${{ foo: { $in: [1, 'bar'] } }} | ${{ foo: ['bar', 'baz'] }}           | ${{ foo: ['baz'] }}
	`((record) => {
		const { query, input, output } = record as { [key: string]: unknown };
		const pull = $pull(query as Parameters<typeof $pull>[0]);
		const result = pull(preserve(input) as Parameters<typeof pull>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${result}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pull errors', (t) => {
	const { $pull } = ArrayOperator;
	each`
		query                          | input                  | error
		-------------------------------|------------------------|--------
		${{ foo: { $gt: 1, bar: 3 } }} | ${{}}                  | unknown operator: bar
		${{ foo: 1 }}                  | ${{ foo: null }}       | Cannot apply $pull to non-array field. Field named 'foo' has non-array type null
		${{ foo: 1 }}                  | ${{ foo: 1 }}          | Cannot apply $pull to non-array field. Field named 'foo' has non-array type int
		${{ foo: 1 }}                  | ${{ foo: 'one' }}      | Cannot apply $pull to non-array field. Field named 'foo' has non-array type string
		${{ foo: 1 }}                  | ${{ foo: { bar: 1 } }} | Cannot apply $pull to non-array field. Field named 'foo' has non-array type object
	`((record) => {
		const { query, input, error } = record as { error: string, [key: string]: unknown };
		const match = new RegExp((error || '').replace(/([\$\[\]\{\}])/g, '\\$1'));

		t.throws(
			() => {
				const pull = $pull(query as Parameters<typeof $pull>[0]);
				pull(preserve(input) as Parameters<typeof pull>[0]);
			},
			match,
			jsonify`${query} on ${input} throws: ${error}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $push', (t) => {
	const { $push } = ArrayOperator;

	each`
		field | value    | input | output
		------|----------|-------|--------
		foo   | ${1}     | ${{}} | ${{ foo: [1] }}
		foo   | ${'one'} | ${{}} | ${{ foo: ['one'] }}
	`(({ field, value, input, output }: any) => {
		const query = { [field]: value };
		const push = $push(query as Parameters<typeof $push>[0]);
		const result = push(preserve(input) as Parameters<typeof push>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${result}`
		);
	});

	const vo1 = { name: 'foo' };
	const vo2 = { name: 'bar' };
	each`
		field | $each        | $sort           | $position | $slice | input                 | output
		------|--------------|-----------------|-----------|--------|-----------------------|--------
		one   | ${[1]}       |                 |           |        | ${{}}                 | ${{ one: [1] }}
		one   | ${[1]}       |                 |           |        | ${{ one: [1] }}       | ${{ one: [1, 1] }}
		one   | ${[7]}       |                 |           |        | ${{ one: [1] }}       | ${{ one: [1, 7] }}
		one   | ${[7]}       |                 | ${1}      |        | ${{ one: [1] }}       | ${{ one: [1, 7] }}
		one   | ${[7]}       |                 | ${-1}     |        | ${{ one: [1] }}       | ${{ one: [7, 1] }}
		one   | ${[1, 3, 4]} |                 |           |        | ${{ one: [2] }}       | ${{ one: [2, 1, 3, 4] }}
		one   | ${[1, 3, 4]} |                 | ${1}      |        | ${{ one: [2] }}       | ${{ one: [2, 1, 3, 4] }}
		one   | ${[1, 3, 4]} |                 | ${-1}     |        | ${{ one: [2] }}       | ${{ one: [1, 3, 4, 2] }}
		one   | ${[1, 3, 4]} | ${1}            |           |        | ${{ one: [2] }}       | ${{ one: [1, 2, 3, 4] }}
		one   | ${[1, 3, 4]} | ${-1}           |           |        | ${{ one: [2] }}       | ${{ one: [4, 3, 2, 1] }}
		one   | ${[1, 3, 4]} | ${1}            | ${1}      |        | ${{ one: [2] }}       | ${{ one: [1, 2, 3, 4] }}
		one   | ${[1, 3, 4]} | ${-1}           | ${1}      |        | ${{ one: [2] }}       | ${{ one: [4, 3, 2, 1] }}
		one   | ${[1, 3, 4]} | ${1}            | ${-1}     |        | ${{ one: [2] }}       | ${{ one: [1, 2, 3, 4] }}
		one   | ${[1, 3, 4]} | ${-1}           | ${-1}     |        | ${{ one: [2] }}       | ${{ one: [4, 3, 2, 1] }}
		one   | ${[1, 3, 4]} |                 |           | ${2}   | ${{ one: [2] }}       | ${{ one: [2, 1] }}
		one   | ${[1, 3, 4]} |                 | ${1}      | ${2}   | ${{ one: [2] }}       | ${{ one: [2, 1] }}
		one   | ${[1, 3, 4]} |                 | ${-1}     | ${2}   | ${{ one: [2] }}       | ${{ one: [1, 3] }}
		one   | ${[1, 3, 4]} | ${1}            |           | ${2}   | ${{ one: [2] }}       | ${{ one: [1, 2] }}
		one   | ${[1, 3, 4]} | ${-1}           |           | ${2}   | ${{ one: [2] }}       | ${{ one: [4, 3] }}
		one   | ${[1, 3, 4]} | ${1}            | ${1}      | ${2}   | ${{ one: [2] }}       | ${{ one: [1, 2] }}
		one   | ${[1, 3, 4]} | ${-1}           | ${1}      | ${2}   | ${{ one: [2] }}       | ${{ one: [4, 3] }}
		one   | ${[1, 3, 4]} | ${1}            | ${-1}     | ${2}   | ${{ one: [2] }}       | ${{ one: [1, 2] }}
		one   | ${[1, 3, 4]} | ${-1}           | ${-1}     | ${2}   | ${{ one: [2] }}       | ${{ one: [4, 3] }}
		obj   | ${[vo2]}     |                 |           |        | ${{}}                 | ${{ obj: [vo2] }}
		obj   | ${[vo2]}     |                 |           |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
		obj   | ${[vo2]}     |                 | ${1}      |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
		obj   | ${[vo2]}     |                 | ${-1}     |        | ${{ obj: [vo1] }}     | ${{ obj: [vo2, vo1] }}
		obj   | ${[vo2]}     | ${1}            |           |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
		obj   | ${[vo2]}     | ${1}            | ${1}      |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
		obj   | ${[vo2]}     | ${-1}           | ${-1}     |        | ${{ obj: [vo1] }}     | ${{ obj: [vo2, vo1] }}
		obj   | ${[vo2]}     | ${{ name: 1 }}  |           |        | ${{ obj: [vo1] }}     | ${{ obj: [vo2, vo1] }}
		obj   | ${[vo2]}     | ${{ name: 1 }}  | ${1}      |        | ${{ obj: [vo1] }}     | ${{ obj: [vo2, vo1] }}
		obj   | ${[vo2]}     | ${{ name: 1 }}  | ${-1}     |        | ${{ obj: [vo1] }}     | ${{ obj: [vo2, vo1] }}
		obj   | ${[vo2]}     | ${{ name: -1 }} | ${1}      |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
		obj   | ${[vo2]}     | ${{ name: -1 }} | ${-1}     |        | ${{ obj: [vo1] }}     | ${{ obj: [vo1, vo2] }}
	`(({ field, input, output, $each, ...rest }: any) => {
		const query = { [field]: { $each, ...rest } };
		const push = $push(query as Parameters<typeof $push>[0]);
		const result = push(preserve(input) as Parameters<typeof push>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${result}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $push errors', (t) => {
	const { $push } = ArrayOperator;
	each`
		query         | input                  | error
		--------------|------------------------|--------
		${{ foo: 1 }} | ${{ foo: null }}       | Cannot apply $push to non-array field. Field named 'foo' has non-array type null
		${{ foo: 1 }} | ${{ foo: 1 }}          | Cannot apply $push to non-array field. Field named 'foo' has non-array type int
		${{ foo: 1 }} | ${{ foo: 'one' }}      | Cannot apply $push to non-array field. Field named 'foo' has non-array type string
		${{ foo: 1 }} | ${{ foo: { bar: 1 } }} | Cannot apply $push to non-array field. Field named 'foo' has non-array type object
	`((record) => {
		const { query, input, error } = record as { error: string, [key: string]: unknown };
		const match = new RegExp((error || '').replace(/([\$\[\]\{\}])/g, '\\$1'));

		t.throws(
			() => {
				const push = $push(query as Parameters<typeof $push>[0]);
				push(preserve(input) as Parameters<typeof push>[0]);
			},
			match,
			jsonify`${query} on ${input} throws: ${error}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pullAll', (t) => {
	const { $pullAll } = ArrayOperator;
	each`
		query                  | input                      | output
		-----------------------|----------------------------|--------
		${{ foo: [1, 'bar'] }} | ${{}}                      | ${{}}
		${{ foo: [1, 'bar'] }} | ${{ foo: [1, 2, 3] }}      | ${{ foo: [2, 3] }}
		${{ foo: [1, 'bar'] }} | ${{ foo: ['bar', 'baz'] }} | ${{ foo: ['baz'] }}
	`((record) => {
		const { query, input, output } = record as { [key: string]: unknown };
		const pullAll = $pullAll(query as Parameters<typeof $pullAll>[0]);
		const result = pullAll(preserve(input) as Parameters<typeof pullAll>[0])

		t.equal(
			json(result),
			json(output),
			jsonify`${query} on ${input} updates to ${result}`
		);
	});

	t.end();
});

test('Domain/Update/Operator/Array - $pullAll errors', (t) => {
	const { $pullAll } = ArrayOperator;
	each`
		query                  | input                  | error
		-----------------------|------------------------|--------
		${{ foo: 1 }}          | ${{ foo: null }}       | $pullAll requires an array argument but was given non-array type int
		${{ foo: 'one' }}      | ${{ foo: null }}       | $pullAll requires an array argument but was given non-array type string
		${{ foo: true }}       | ${{ foo: null }}       | $pullAll requires an array argument but was given non-array type bool
		${{ foo: null }}       | ${{ foo: null }}       | $pullAll requires an array argument but was given non-array type null
		${{ foo: { bar: 1 } }} | ${{ foo: null }}       | $pullAll requires an array argument but was given non-array type object
		${{ foo: [1] }}        | ${{ foo: null }}       | Cannot apply $pullAll to non-array field. Field named 'foo' has non-array type null
		${{ foo: [1] }}        | ${{ foo: 1 }}          | Cannot apply $pullAll to non-array field. Field named 'foo' has non-array type int
		${{ foo: [1] }}        | ${{ foo: 'one' }}      | Cannot apply $pullAll to non-array field. Field named 'foo' has non-array type string
		${{ foo: [1] }}        | ${{ foo: { bar: 1 } }} | Cannot apply $pullAll to non-array field. Field named 'foo' has non-array type object
	`((record) => {
		const { query, input, error } = record as { error: string, [key: string]: unknown };
		const match = new RegExp((error || '').replace(/([\$\[\]\{\}])/g, '\\$1'));

		t.throws(
			() => {
				const pullAll = $pullAll(query as Parameters<typeof $pullAll>[0]);
				pullAll(preserve(input) as Parameters<typeof pullAll>[0]);
			},
			match,
			jsonify`${query} on ${input} throws: ${error}`
		);
	});

	t.end();
});
