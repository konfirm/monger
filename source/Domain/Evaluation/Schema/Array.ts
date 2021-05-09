import type { Evaluator, Builder, Compiler } from './Common';

export type JSONSchema = {
	additionalItems: Parameters<typeof Rules.additionalItems>[0];
	items: Parameters<typeof Rules.items>[0];
};

function isObject(input: unknown): boolean {
	return typeof input === 'object' && !(Array.isArray(input) || input === null);
}

function isArray(input: unknown): boolean {
	return Array.isArray(input);
}

/*
| Keyword         | Type   | Definition        | Behavior                                                                                         |
| --------------- | ------ | ----------------- | ------------------------------------------------------------------------------------------------ |
| additionalItems | arrays | boolean or object | If an object, must be a valid JSON Schema                                                        |
| items           | arrays | object or array   | Must be either a valid JSON Schema, or an array of valid JSON Schemas                            |
| maxItems        | arrays | integer           | Indicates the maximum length of array                                                            |
| minItems        | arrays | integer           | Indicates the minimum length of array                                                            |
| uniqueItems     | arrays | boolean           | If true, each item in the array must be unique. Otherwise, no uniqueness constraint is enforced. |
*/

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	additionalItems: <T extends JSONSchema>(value: boolean | Partial<T>): Evaluator => {
		return (input: unknown) => true;
	},
	items: <T extends JSONSchema>(value: Partial<T> | Array<Partial<T>>, schematic: Partial<T>, compile: Compiler): Evaluator => {
		if (isObject(value)) {
			const evaluate = compile(value as JSONSchema);

			return (input: unknown) => isArray(input) && (input as Array<any>).every(evaluate);
		}

		const evaluators = (value as Array<JSONSchema>).map(compile);
		const { additionalItems = true } = schematic;
		const additional =
			isObject(additionalItems)
				? compile(additionalItems)
				: () => additionalItems;

		return (input: unknown) =>
			isArray(input) &&
			(input as Array<any>)
				.every((item, index) => index < evaluators.length ? evaluators[index](item) : additional(item));
	},
};
