import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { each } from "template-literal-each";
import { exported, pretty } from "../Test/helpers";
import * as Field from "./Field";

describe("Domain/Field", () => {
	it("exports", exported(Field, [
		"accessor",
	]));

	describe("dotted read", () => {
		each`
			path            | target                                        | expect
			----------------|-----------------------------------------------|--------
			foo             | ${undefined}                                  | ${undefined}
			foo             | ${'null'}                                     | ${undefined}
			foo             | ${true}                                       | ${undefined}
			foo             | ${false}                                      | ${undefined}
			foo             | ${'one'}                                      | ${undefined}
			foo             | ${1}                                          | ${undefined}
			foo             | ${[1]}                                        | ${undefined}
			foo             | ${{}}                                         | ${undefined}
			foo             | ${{ foo: 1 }}                                 | ${1}
			foo             | ${{ foo: 'one' }}                             | ${'one'}
			foo.bar         | ${1}                                          | ${undefined}
			foo.bar         | ${{}}                                         | ${undefined}
			foo.bar         | ${{ foo: 1 }}                                 | ${undefined}
			foo.bar         | ${{ foo: 'one' }}                             | ${undefined}
			foo.bar         | ${{ foo: { bar: 2 } }}                        | ${2}
			foo.bar         | ${{ foo: { bar: 'two' } }}                    | ${'two'}
			foo.bar.baz     | ${1}                                          | ${undefined}
			foo.bar.baz     | ${{}}                                         | ${undefined}
			foo.bar.baz     | ${{ foo: 1 }}                                 | ${undefined}
			foo.bar.baz     | ${{ foo: 'one' }}                             | ${undefined}
			foo.bar.baz     | ${{ foo: { bar: 2 } }}                        | ${undefined}
			foo.bar.baz     | ${{ foo: { bar: 'two' } }}                    | ${undefined}
			foo.bar.baz     | ${{ foo: { bar: { baz: 3 } } }}               | ${3}
			foo.bar.baz     | ${{ foo: { bar: { baz: 'three' } } }}         | ${'three'}
			foo.bar.baz.qux | ${1}                                          | ${undefined}
			foo.bar.baz.qux | ${{}}                                         | ${undefined}
			foo.bar.baz.qux | ${{ foo: 1 }}                                 | ${undefined}
			foo.bar.baz.qux | ${{ foo: 'one' }}                             | ${undefined}
			foo.bar.baz.qux | ${{ foo: { bar: 2 } }}                        | ${undefined}
			foo.bar.baz.qux | ${{ foo: { bar: 'two' } }}                    | ${undefined}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: 3 } } }}               | ${undefined}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: 'three' } } }}         | ${undefined}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: { qux: 4 } } } }}      | ${4}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: { qux: 'four' } } } }} | ${'four'}
			foo.0.bar       | ${{}}                                         | ${undefined}
			foo.0.bar       | ${{ foo: 1 }}                                 | ${undefined}
			foo.0.bar       | ${{ foo: { bar: 1 } }}                        | ${undefined}
			foo.0.bar       | ${{ foo: [{ bar: 1 }, { bar: 2 }] }}          | ${1}
			foo.1.bar       | ${{ foo: [{ bar: 1 }, { bar: 2 }] }}          | ${2}
		`(({ path, target, expect: expected }: Record<string, unknown>) => {
			const peek = Field.accessor(path as string);

			it(`'${path}' of ${pretty(target)} is ${pretty(expected)}`, () => {
				assert.equal(peek(target), expected);
			});
		});
	});

	describe("dotted write", () => {
		each`
			path            | target                                        | error
			----------------|-----------------------------------------------|-------
			foo             | ${undefined}                                  | Cannot create field 'foo' in element undefined
			foo             | ${null}                                       | Cannot create field 'foo' in element null
			foo             | ${true}                                       | Cannot create field 'foo' in element true
			foo             | ${false}                                      | Cannot create field 'foo' in element false
			foo             | ${'one'}                                      | Cannot create field 'foo' in element "one"
			foo             | ${1}                                          | Cannot create field 'foo' in element 1
			foo             | ${[1]}                                        | Cannot create field 'foo' in element [1]
			foo             | ${{}}                                         |
			foo             | ${{ foo: 1 }}                                 |
			foo             | ${{ foo: 'one' }}                             |
			foo.bar         | ${1}                                          | Cannot create field 'foo' in element 1
			foo.bar         | ${{}}                                         |
			foo.bar         | ${{ foo: 1 }}                                 | Cannot create field 'bar' in element {foo:1}
			foo.bar         | ${{ foo: 'one' }}                             | Cannot create field 'bar' in element {foo:"one"}
			foo.bar         | ${{ foo: { bar: 2 } }}                        |
			foo.bar         | ${{ foo: { bar: 'two' } }}                    |
			foo.bar.baz     | ${1}                                          | Cannot create field 'foo' in element 1
			foo.bar.baz     | ${{}}                                         |
			foo.bar.baz     | ${{ foo: 1 }}                                 | Cannot create field 'bar' in element {foo:1}
			foo.bar.baz     | ${{ foo: 'one' }}                             | Cannot create field 'bar' in element {foo:"one"}
			foo.bar.baz     | ${{ foo: { bar: 2 } }}                        | Cannot create field 'baz' in element {bar:2}
			foo.bar.baz     | ${{ foo: { bar: 'two' } }}                    | Cannot create field 'baz' in element {bar:"two"}
			foo.bar.baz     | ${{ foo: { bar: { baz: 3 } } }}               |
			foo.bar.baz     | ${{ foo: { bar: { baz: 'three' } } }}         |
			foo.bar.baz.qux | ${1}                                          | Cannot create field 'foo' in element 1
			foo.bar.baz.qux | ${{}}                                         |
			foo.bar.baz.qux | ${{ foo: 1 }}                                 | Cannot create field 'bar' in element {foo:1}
			foo.bar.baz.qux | ${{ foo: 'one' }}                             | Cannot create field 'bar' in element {foo:"one"}
			foo.bar.baz.qux | ${{ foo: { bar: 2 } }}                        | Cannot create field 'baz' in element {bar:2}
			foo.bar.baz.qux | ${{ foo: { bar: 'two' } }}                    | Cannot create field 'baz' in element {bar:"two"}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: 3 } } }}               | Cannot create field 'qux' in element {baz:3}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: 'three' } } }}         | Cannot create field 'qux' in element {baz:"three"}
			foo.bar.baz.qux | ${{ foo: { bar: { baz: { qux: 4 } } } }}      |
			foo.bar.baz.qux | ${{ foo: { bar: { baz: { qux: 'four' } } } }} |
			foo.0.bar       | ${1}                                          | Cannot create field 'foo' in element 1
			foo.0.bar       | ${{}}                                         |
			foo.0.bar       | ${{ foo: 1 }}                                 | Cannot create field 0 in element {foo:1}
			foo.0.bar       | ${{ foo: { bar: 1 } }}                        | Cannot create field 0 in element {foo:{bar:1}}
			foo.0.bar       | ${{ foo: [{ bar: 1 }, { bar: 2 }] }}          |
			foo.1.bar       | ${{ foo: [{ bar: 1 }, { bar: 2 }] }}          |
		`(({ path, target, error }: Record<string, unknown>) => {
			const poke = Field.accessor(path as string);

			if (error) {
				const match = new RegExp((error as string).replace(/([{}[\]])/g, '\\$1'));

				it(`writing '${path}' of ${pretty(target)} throws '${error}'`, () => {
					assert.throws(() => poke(target, 'written'), match);
				});
			}
			else {
				it(`written '${path}' of ${pretty(target)}`, () => {
					poke(target, 'written');
					assert.equal(poke(target), 'written');
				});
			}
		});
	});
});
