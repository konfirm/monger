import type { Evaluator } from '../Query/Compiler';
import type { TypeAliasAvailable } from '../BSON';
import { is as isBSONType } from '../BSON';
import { $in } from '../Operator/Comparison';

type JSONType
	= 'array'
	| 'boolean'
	| 'null'
	| 'number'
	| 'object'
	| 'string'
	| 'undefined';
type JSONSchemaOptions = {
	bsonType: TypeAliasAvailable | Array<TypeAliasAvailable>;
	enum: Array<any>;
	type: JSONType | Array<JSONType>;
	allOf: Array<JSONSchema>;
	anyOf: Array<JSONSchema>;
	oneOf: Array<JSONSchema>;
	not: JSONSchema;
	multipleOf: number,
	maximum: number,
	exclusiveMaximum: boolean | number,
	minimum: number,
	exclusiveMinimum: boolean | number,
	maxLength: number,
	minLength: number,
	pattern: string | RegExp,
	maxProperties: number,
	minProperties: number,
	required: Array<string>,
	additionalProperties: boolean | { [key: string]: unknown },
	properties: { [key: string]: JSONSchema },
	patternProperties: { [key: string]: JSONSchema },
};
type SimpleObject = { [key: string]: unknown };
export type JSONSchema = Partial<JSONSchemaOptions>;

/*
| Keyword              | Type      | Definition                              | Behavior                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bsonType             | all types | string alias or array of string aliases | Accepts same string aliases used for the $type operator                                                                                                                                                                                                                             |
| enum                 | all types | array of values                         | Enumerates all possible values of the field                                                                                                                                                                                                                                         |
| type                 | all types | string or array of unique strings       | Enumerates the possible JSON types of the field. Available types are "object", "array", "number", "boolean", "string", and "null". MongoDB's implementation of the JSON Schema does not support the "integer" type. Use the bsonType keyword and the "int" or "long" types instead. |
| allOf                | all types | array of JSON Schema objects            | Field must match all specified schemas                                                                                                                                                                                                                                              |
| anyOf                | all types | array of JSON Schema objects            | Field must match at least one of the specified schemas                                                                                                                                                                                                                              |
| oneOf                | all types | array of JSON Schema objects            | Field must match exactly one of the specified schemas                                                                                                                                                                                                                               |
| not                  | all types | a JSON Schema object                    | Field must not match the schema                                                                                                                                                                                                                                                     |
| multipleOf           | numbers   | number                                  | Field must be a multiple of this value                                                                                                                                                                                                                                              |
| maximum              | numbers   | number                                  | Indicates the maximum value of the field                                                                                                                                                                                                                                            |
| exclusiveMaximum     | numbers   | boolean                                 | If true and field is a number, maximum is an exclusive maximum. Otherwise, it is an inclusive maximum.                                                                                                                                                                              |
| minimum              | numbers   | number                                  | Indicates the minimum value of the field                                                                                                                                                                                                                                            |
| exclusiveMinimum     | numbers   | boolean                                 | If true, minimum is an exclusive minimum. Otherwise, it is an inclusive minimum.                                                                                                                                                                                                    |
| maxLength            | strings   | integer                                 | Indicates the maximum length of the field                                                                                                                                                                                                                                           |
| minLength            | strings   | integer                                 | Indicates the minimum length of the field                                                                                                                                                                                                                                           |
| pattern              | strings   | string containing a regex               | Field must match the regular expression                                                                                                                                                                                                                                             |
| maxProperties        | objects   | integer                                 | Indicates the field's maximum number of properties                                                                                                                                                                                                                                  |
| minProperties        | objects   | integer                                 | Indicates the field's minimum number of properties                                                                                                                                                                                                                                  |
| required             | objects   | array of unique strings                 | Object's property set must contain all the specified elements in the array                                                                                                                                                                                                          |
| additionalProperties | objects   | boolean or object                       | If true, additional fields are allowed. If false, they are not. If a valid JSON Schema object is specified, additional fields must validate against the schema. Defaults to true.                                                                                                   |
| properties           | objects   | object                                  | A valid JSON Schema where each value is also a valid JSON Schema object                                                                                                                                                                                                             |
| patternProperties    | objects   | object                                  | In addition to properties requirements, each property name of this object must be a valid regular expression                                                                                                                                                                        |
| dependencies         | objects   | object                                  | Describes field or schema dependencies                                                                                                                                                                                                                                              |
| additionalItems      | arrays    | boolean or object                       | If an object, must be a valid JSON Schema                                                                                                                                                                                                                                           |
| items                | arrays    | object or array                         | Must be either a valid JSON Schema, or an array of valid JSON Schemas                                                                                                                                                                                                               |
| maxItems             | arrays    | integer                                 | Indicates the maximum length of array                                                                                                                                                                                                                                               |
| minItems             | arrays    | integer                                 | Indicates the minimum length of array                                                                                                                                                                                                                                               |
| uniqueItems          | arrays    | boolean                                 | If true, each item in the array must be unique. Otherwise, no uniqueness constraint is enforced.                                                                                                                                                                                    |
| title                | N/A       | string                                  | A descriptive title string with no effect.                                                                                                                                                                                                                                          |
| description          | N/A       | string                                  | A string that describes the schema and has no effect.                                                                                                                                                                                                                               |

*/

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

const isNumber = is('number');
const isString = is('string');
const isBoolean = is('boolean');
const isObject = is('object');
const isUndefined = is('undefined');

const rules: { [key: string]: (input: any, schame: JSONSchema) => Evaluator } = {
	bsonType: (bsonType: JSONSchemaOptions['bsonType']): Evaluator => isBSONType(bsonType),
	enum: (values: JSONSchemaOptions['enum']): Evaluator => $in(values),
	type: (type: JSONSchemaOptions['type']): Evaluator => {
		const list = ([] as Array<JSONType>).concat(type);

		return is(...list);
	},
	allOf: (list: JSONSchemaOptions['allOf']): Evaluator => {
		const evaluators = list.map(schema);

		return (input: unknown) => evaluators.every((evaluate) => evaluate(input));
	},
	anyOf: (list: JSONSchemaOptions['anyOf']): Evaluator => {
		const evaluators = list.map(schema);

		return (input: unknown) => evaluators.some((evaluate) => evaluate(input));
	},
	oneOf: (list: JSONSchemaOptions['oneOf']): Evaluator => {
		const evaluators = list.map(schema);

		return (input: unknown) => evaluators.filter((evaluate) => evaluate(input)).length === 1;
	},
	not: (struct: JSONSchemaOptions['not']): Evaluator => {
		const evaluate = schema(struct);

		return (input: unknown) => !evaluate(input);
	},

	// Numbers
	multipleOf: (value: JSONSchemaOptions['multipleOf']): Evaluator => {
		return (input: unknown) => isNumber(input) && (Number(input) % value) === 0;
	},
	maximum: (value: JSONSchemaOptions['maximum'], schema: JSONSchema): Evaluator => {
		const { exclusiveMaximum } = schema;

		if (isBoolean(exclusiveMaximum) && exclusiveMaximum) {
			return rules.exclusiveMaximum(value, schema);
		}

		return (input: unknown) => isNumber(input) && Number(input) <= value;
	},
	exclusiveMaximum: (value: JSONSchemaOptions['exclusiveMaximum'], schema: JSONSchema): Evaluator => {
		const { maximum } = schema;

		if (isBoolean(value) && !value) {
			return rules.maximum(maximum, schema);
		}

		const compare = isNumber(value) ? value : maximum || Infinity;

		return (input: unknown) => isNumber(input) && Number(input) < compare;
	},
	minimum: (value: JSONSchemaOptions['minimum'], schema: JSONSchema): Evaluator => {
		const { exclusiveMinimum } = schema;

		if (isBoolean(exclusiveMinimum) && exclusiveMinimum) {
			return rules.exclusiveMinimum(value, schema);
		}

		return (input: unknown) => isNumber(input) && Number(input) >= value;
	},
	exclusiveMinimum: (value: JSONSchemaOptions['exclusiveMinimum'], schema: JSONSchema): Evaluator => {
		const { minimum } = schema;

		if (isBoolean(value) && !value) {
			return rules.minimum(minimum, schema);
		}

		const compare = isNumber(value) ? value : minimum || -Infinity;

		return (input: unknown) => isNumber(input) && Number(input) > compare;
	},

	// Strings
	maxLength: (value: JSONSchemaOptions['maxLength']): Evaluator => {
		return (input: unknown) => isString(input) && (input as string).length <= value;
	},
	minLength: (value: JSONSchemaOptions['minLength']): Evaluator => {
		return (input: unknown) => isString(input) && (input as string).length >= value;
	},
	pattern: (value: JSONSchemaOptions['pattern']): Evaluator => {
		const pattern: RegExp = isString(value) ? new RegExp(value) : value as RegExp;

		return (input: unknown) => isString(input) && pattern.test(String(input));
	},

	// Objects
	maxProperties: (value: JSONSchemaOptions['maxProperties']): Evaluator => {
		return (input: unknown) => isObject(input) && Object.keys(input as object).length <= value;
	},
	minProperties: (value: JSONSchemaOptions['minProperties']): Evaluator => {
		return (input: unknown) => isObject(input) && Object.keys(input as object).length >= value;
	},
	required: (value: JSONSchemaOptions['required']): Evaluator => {
		return (input: unknown) => {
			if (isObject(input)) {
				const keys = Object.keys(input as object);

				return value.every((key) => keys.includes(key));
			}

			return false;
		}
	},
	additionalProperties: (value: JSONSchemaOptions['additionalProperties'], schema: JSONSchema): Evaluator => {
		const { properties = {}, required = [] } = schema;
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
	properties: (value: JSONSchemaOptions['properties']): Evaluator => {
		const evaluators = Object.keys(value)
			.map((key) => {
				const evaluate = schema(value[key]);

				return (input: SimpleObject) => !(key in input) || evaluate(input[key]);
			})

		return (input: unknown) =>
			isObject(input) &&
			evaluators.every((evaluate) => evaluate(input as SimpleObject));
	},
	patternProperties: (value: JSONSchemaOptions['patternProperties']): Evaluator => {
		const evaluators = Object.keys(value)
			.map((key) => {
				const pattern = new RegExp(key);
				const evaluate = schema(value[key]);

				return (key: string, value: unknown) => !pattern.test(key) || evaluate(value);
			});

		return (input: unknown) =>
			isObject(input) &&
			Object.keys(input as object)
				.every((key) => evaluators
					.every((evaluate) => evaluate(key, (input as SimpleObject)[key]))
				);
	},
};


export function schema(schema: Partial<JSONSchema>): Evaluator {
	const evaluators = (Object.keys(schema) as Array<keyof typeof schema>)
		.filter((key) => !isUndefined(schema[key]))
		.map((key) => rules[key](schema[key], schema));

	return (input: unknown) => evaluators.every((evaluate) => evaluate(input));
}
