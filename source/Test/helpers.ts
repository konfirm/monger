import * as assert from "node:assert/strict";
import { it } from "node:test";

export function pretty(value: unknown): string {
	if (value instanceof RegExp) return value.toString();
	if (value instanceof Date) return `Date(${value.toISOString()})`;
	if (Array.isArray(value)) return `[${value.map(pretty).join(', ')}]`;
	if (value !== null && typeof value === 'object') {
		const entries = Object.entries(value).map(([key, v]) => `${JSON.stringify(key)}:${pretty(v)}`);
		return `{${entries.join(',')}}`;
	}

	return JSON.stringify(value);
}

export function format(templates: TemplateStringsArray, ...values: Array<unknown>): string {
	const prettified = values.map(pretty).concat('');

	return templates.reduce((carry, template, index) => carry + template + prettified[index], '');
}

export function compare(
	fun: (query: never) => (input: unknown) => boolean,
): (record: Record<string, unknown>) => void {
	return ({ query: syntax, input, matches }: Record<string, unknown>): void => {
		const query = { [fun.name]: syntax };
		// as never: fun's declared parameter is intentionally never, so any
		// operator's real (narrower) parameter type is assignable to it —
		// sidesteps the union-of-all-operators typing problem entirely.
		const compiled = fun(syntax as never);
		const isMatch = matches === "yes";
		const message = isMatch
			? format`${input} matches ${query}`
			: format`${input} doesn't match ${query}`;

		it(message, () => {
			assert.equal(compiled(input), isMatch, format`${input}: ${isMatch}`);
		});
	};
}

export function exported(scope: Record<string, unknown>, expected: Array<keyof typeof scope>): () => void {
	return () => {
		const actual = Object.keys(scope);

		assert.equal(
			actual.length,
			expected.length,
			`contains ${expected.length} keys`,
		);
		expected.forEach((key) => {
			assert.equal(
				typeof scope[key],
				"function",
				`contains function ${key}`,
			);
		});
	}
}
