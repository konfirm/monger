import type { Evaluator, Builder, Compiler } from './Common';
import type { TypeAliasAvailable } from '../../BSON';
import { is as isBSONType } from '../../BSON';
import { $in } from '../../Operator/Comparison';

type JSONType
	= 'array'
	| 'boolean'
	| 'null'
	| 'number'
	| 'object'
	| 'string'
	| 'undefined';

export type JSONSchema = {
	bsonType: Parameters<typeof Rules.bsonType>[0];
	enum: Parameters<typeof Rules.enum>[0];
	type: Parameters<typeof Rules.type>[0];
	allOf: Parameters<typeof Rules.allOf>[0];
	anyOf: Parameters<typeof Rules.anyOf>[0];
	oneOf: Parameters<typeof Rules.oneOf>[0];
	not: Parameters<typeof Rules.not>[0];
};

function getJSONType(input: unknown): JSONType {
	const type = input === null
		? 'null'
		: Array.isArray(input)
			? 'array'
			: typeof input;

	return type as JSONType;
}

function is(...types: Array<JSONType>): Evaluator {
	return (input: unknown) => types.includes(getJSONType(input));
}

/*
| Keyword  | Type      | Definition                              | Behavior                                                                                                                                                                                                                                                                            |
| ---------| --------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bsonType | all types | string alias or array of string aliases | Accepts same string aliases used for the $type operator                                                                                                                                                                                                                             |
| enum     | all types | array of values                         | Enumerates all possible values of the field                                                                                                                                                                                                                                         |
| type     | all types | string or array of unique strings       | Enumerates the possible JSON types of the field. Available types are "object", "array", "number", "boolean", "string", and "null". MongoDB's implementation of the JSON Schema does not support the "integer" type. Use the bsonType keyword and the "int" or "long" types instead. |
| allOf    | all types | array of JSON Schema objects            | Field must match all specified schemas                                                                                                                                                                                                                                              |
| anyOf    | all types | array of JSON Schema objects            | Field must match at least one of the specified schemas                                                                                                                                                                                                                              |
| oneOf    | all types | array of JSON Schema objects            | Field must match exactly one of the specified schemas                                                                                                                                                                                                                               |
| not      | all types | a JSON Schema object                    | Field must not match the schema                                                                                                                                                                                                                                                     |
*/

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	bsonType: <T>(bsonType: TypeAliasAvailable | Array<TypeAliasAvailable>): Evaluator => isBSONType(bsonType),
	enum: <T>(values: Array<any>): Evaluator => $in(values),
	type: <T>(type: JSONType | Array<JSONType>): Evaluator => {
		const list = ([] as Array<JSONType>).concat(type);

		return is(...list);
	},
	allOf: <T>(list: Array<Partial<T>>, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = list.map(compile);

		return (input: unknown) => evaluators.every((evaluate) => evaluate(input));
	},
	anyOf: <T>(list: Array<Partial<T>>, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = list.map(compile);

		return (input: unknown) => evaluators.some((evaluate) => evaluate(input));
	},
	oneOf: <T>(list: Array<Partial<T>>, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluators = list.map(compile);

		return (input: unknown) => evaluators.filter((evaluate) => evaluate(input)).length === 1;
	},
	not: <T>(struct: Partial<T>, _: Partial<T>, compile: Compiler): Evaluator => {
		const evaluate = compile(struct);

		return (input: unknown) => !evaluate(input);
	},
};
