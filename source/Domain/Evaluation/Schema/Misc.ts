import type { Evaluator, Builder } from './Common';

export type JSONSchema = {
	title: string,
	description: string,
};

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	title: <T>(value: JSONSchema['title']): Evaluator => {
		return (input: unknown) => true;
	},
	description: <T>(value: JSONSchema['description']): Evaluator => {
		return (input: unknown) => true;
	},
};
