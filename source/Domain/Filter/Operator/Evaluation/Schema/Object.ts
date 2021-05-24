import type { Evaluator, Builder, Compiler } from './Common';
import { isObject } from '../../../../BSON';

export type JSONSchema = {
	maxProperties: Parameters<typeof Rules.maxProperties>[0],
	minProperties: Parameters<typeof Rules.minProperties>[0],
	required: Parameters<typeof Rules.required>[0],
	additionalProperties: Parameters<typeof Rules.additionalProperties>[0],
	properties: Parameters<typeof Rules.properties>[0],
	patternProperties: Parameters<typeof Rules.patternProperties>[0],
	dependencies: Parameters<typeof Rules.dependencies>[0],
};

type SimpleObject = { [key: string]: unknown };

/*
| Keyword              | Type    | Definition              | Behavior                                                                                                                                                                          |
| -------------------- | ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxProperties        | objects | integer                 | Indicates the field's maximum number of properties                                                                                                                                |
| minProperties        | objects | integer                 | Indicates the field's minimum number of properties                                                                                                                                |
| required             | objects | array of unique strings | Object's property set must contain all the specified elements in the array                                                                                                        |
| additionalProperties | objects | boolean or object       | If true, additional fields are allowed. If false, they are not. If a valid JSON Schema object is specified, additional fields must validate against the schema. Defaults to true. |
| properties           | objects | object                  | A valid JSON Schema where each value is also a valid JSON Schema object                                                                                                           |
| patternProperties    | objects | object                  | In addition to properties requirements, each property name of this object must be a valid regular expression                                                                      |
| dependencies         | objects | object                  | Describes field or schema dependencies                                                                                                                                            |
*/

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	maxProperties: <T>(value: number): Evaluator => {
		return (input: unknown) => isObject(input) && Object.keys(input as object).length <= value;
	},
	minProperties: <T>(value: number): Evaluator => {
		return (input: unknown) => isObject(input) && Object.keys(input as object).length >= value;
	},
	required: <T>(value: Array<string>): Evaluator => {
		return (input: unknown) => {
			if (isObject(input)) {
				const keys = Object.keys(input as object);

				return value.every((key) => keys.includes(key));
			}

			return false;
		}
	},
	additionalProperties: <T extends JSONSchema>(value: boolean | { [key: string]: Partial<T> }, schematic: Partial<T>): Evaluator => {
		const { properties = {}, required = [] } = schematic;
		const known = ([] as Array<string>).concat(Object.keys(properties), required);

		if (isObject(value)) {
			const allowed: Array<string> = Object.keys(value as object);
			return (input: unknown) => isObject(input) &&
				Object.keys(input as object)
					.filter((key) => !known.includes(key))
					.every((key) => allowed.includes(key));
		}

		return (input: unknown) =>
			isObject(input) &&
			(Object.keys(input as object).every((key) => known.includes(key)) || (value as boolean));
	},
	properties: <T extends JSONSchema>(value: { [key: string]: Partial<T> }, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = Object.keys(value)
			.map((key) => {
				const evaluate = compile(value[key]);

				return (input: SimpleObject) => !(key in input) || evaluate(input[key]);
			})

		return (input: unknown) =>
			isObject(input) &&
			evaluators.every((evaluate) => evaluate(input as SimpleObject));
	},
	patternProperties: <T>(value: { [key: string]: Partial<T> }, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = Object.keys(value)
			.map((key) => {
				const pattern = new RegExp(key);
				const evaluate = compile(value[key]);

				return (key: string, value: unknown) => !pattern.test(key) || evaluate(value);
			});

		return (input: unknown) =>
			isObject(input) &&
			Object.keys(input as object)
				.every((key) => evaluators
					.every((evaluate) => evaluate(key, (input as SimpleObject)[key]))
				);
	},
	dependencies: <T extends JSONSchema>(value: { [key: string]: Array<string> | Partial<T> }, schematic: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = Object.keys(value)
			.map((key) => {
				const evaluate =
					isObject(value[key])
						? compile(value[key] as JSONSchema)
						: Rules.required(value[key] as Array<string>, schematic, compile);

				return (input: SimpleObject) => !(key in input) || evaluate(input);
			});

		return (input: unknown) => isObject(input) && evaluators.every((evaluate) => evaluate(input as SimpleObject))
	},
};
