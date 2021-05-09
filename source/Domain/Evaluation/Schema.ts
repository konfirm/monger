import type { Evaluator, Builder } from './Schema/Common';
import * as GenericSchema from './Schema/Generic';
import * as NumberSchema from './Schema/Number';
import * as StringSchema from './Schema/String';
import * as ObjectSchema from './Schema/Object';
import * as ArraySchema from './Schema/Array';

export type JSONSchema
	= GenericSchema.JSONSchema
	& NumberSchema.JSONSchema
	& StringSchema.JSONSchema
	& ObjectSchema.JSONSchema
	& ArraySchema.JSONSchema

function isUndefined(input: unknown): boolean {
	return typeof input === 'undefined';
}

const rules: { [key: string]: Builder<JSONSchema> } = {
	...GenericSchema.Rules,
	...NumberSchema.Rules,
	...StringSchema.Rules,
	...ObjectSchema.Rules,
	...ArraySchema.Rules,
};

export function schema(schematic: Partial<JSONSchema>): Evaluator {
	const evaluators = (Object.keys(schematic) as Array<keyof typeof schematic>)
		.filter((key) => !isUndefined(schematic[key]))
		.map((key) => rules[key]<JSONSchema>(schematic[key], schematic, schema));

	return (input: unknown) => evaluators.every((evaluate) => evaluate(input));
}
