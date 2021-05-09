import type { Evaluator, Builder } from './Common';

export type JSONSchema = {
	title: string,
};

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	title: <T>(value: JSONSchema['title']): Evaluator => {
		return (input: unknown) => true;
	},
};
