import type { Evaluator, Builder, Compiler } from './Common';

export type JSONSchema = {
	multipleOf: Parameters<typeof Rules.multipleOf>[0]
	maximum: Parameters<typeof Rules.maximum>[0]
	exclusiveMaximum: Parameters<typeof Rules.exclusiveMaximum>[0]
	minimum: Parameters<typeof Rules.minimum>[0]
	exclusiveMinimum: Parameters<typeof Rules.exclusiveMinimum>[0]
};

function isNumber(value: unknown): boolean {
	return typeof value === 'number';
}

function isBoolean(value: unknown): boolean {
	return typeof value === 'boolean';
}

/*
| Keyword          | Type    | Definition | Behavior                                                                                               |
| ---------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| multipleOf       | numbers | number     | Field must be a multiple of this value                                                                 |
| maximum          | numbers | number     | Indicates the maximum value of the field                                                               |
| exclusiveMaximum | numbers | boolean    | If true and field is a number, maximum is an exclusive maximum. Otherwise, it is an inclusive maximum. |
| minimum          | numbers | number     | Indicates the minimum value of the field                                                               |
| exclusiveMinimum | numbers | boolean    | If true, minimum is an exclusive minimum. Otherwise, it is an inclusive minimum.                       |
*/

export const Rules: { [key: string]: Builder<JSONSchema> } = {
	multipleOf<T>(value: number): Evaluator {
		return (input: unknown) => isNumber(input) && (Number(input) % value) === 0;
	},

	maximum<T extends JSONSchema>(value: number, schematic: Partial<T>, compile: Compiler): Evaluator {
		const { exclusiveMaximum: exclusive } = schematic;

		if (isBoolean(exclusive) && exclusive) {
			return Rules.exclusiveMaximum(value, schematic, compile);
		}

		return (input: unknown) => isNumber(input) && Number(input) <= value;
	},

	exclusiveMaximum<T extends JSONSchema>(value: number | boolean, schematic: Partial<T>, compile: Compiler): Evaluator {
		const { maximum: max } = schematic;

		if (isBoolean(value) && !value) {
			return Rules.maximum(max as number, schematic, compile);
		}

		const compare = isNumber(value) ? value : max;

		return (input: unknown) => isNumber(input) && Number(input) < Number(compare);
	},

	minimum<T extends JSONSchema>(value: number, schematic: Partial<T>, compile: Compiler): Evaluator {
		const { exclusiveMinimum: minimum } = schematic;

		if (isBoolean(minimum) && minimum) {
			return Rules.exclusiveMinimum(value, schematic, compile);
		}

		return (input: unknown) => isNumber(input) && Number(input) >= value;
	},

	exclusiveMinimum<T extends JSONSchema>(value: number | boolean, schematic: Partial<T>, compile: Compiler): Evaluator {
		const { minimum: min } = schematic;

		if (isBoolean(value) && !value) {
			return Rules.minimum(min as number, schematic, compile);
		}

		const compare = isNumber(value) ? value : min;

		return (input: unknown) => isNumber(input) && Number(input) > Number(compare);
	},
};
