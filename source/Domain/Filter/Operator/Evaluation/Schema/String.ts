import type { Evaluator, Builder } from './Common';

export type JSONSchema = {
	maxLength: Parameters<typeof Rules.maxLength>[0],
	minLength: Parameters<typeof Rules.minLength>[0],
	pattern: Parameters<typeof Rules.pattern>[0],
};

function isString(value: unknown): boolean {
	return typeof value === 'string';
}

/*
| Keyword   | Type      | Definition                | Behavior                                  |
| ----------| --------- | ------------------------- | ----------------------------------------- |
| maxLength | strings   | integer                   | Indicates the maximum length of the field |
| minLength | strings   | integer                   | Indicates the minimum length of the field |
| pattern   | strings   | string containing a regex | Field must match the regular expression   |
*/

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	maxLength: <T>(value: number): Evaluator => {
		return (input: unknown) => isString(input) && (input as string).length <= value;
	},
	minLength: <T>(value: number): Evaluator => {
		return (input: unknown) => isString(input) && (input as string).length >= value;
	},
	pattern: <T>(value: string | RegExp): Evaluator => {
		const pattern: RegExp = isString(value) ? new RegExp(value) : value as RegExp;

		return (input: unknown) => isString(input) && pattern.test(String(input));
	},
};
