import type { Operation as ArrayOperation } from './Operator/Array';
import type { Operation as BitwiseOperation } from './Operator/Bitwise';
import type { Operation as FieldOperation } from './Operator/Field';

export type Target<T = unknown> = { [key: string]: T };
export type Updater = (input: Target, ...args: Array<any>) => Target;
export type CompileStep = (update: any) => Updater;
export type UpdateCompiler = (update: any, compile: CompileStep, context: Partial<Update>) => Updater;
type Operation
	= ArrayOperation
	& BitwiseOperation
	& FieldOperation;
type Preparation<T> = (key: keyof T, value: T[keyof T]) => Updater;

export type Update = Operation | Target;
export type Operators = {
	[key: string]: UpdateCompiler;
};

export function prepare<T extends Target>(update: T, prepare: Preparation<T>) {
	return Object.keys(update).map((key) => prepare(key as keyof T, update[key] as T[keyof T]));
}

export class Compiler<T extends Partial<Update> = Partial<Update>, K extends keyof T = keyof T> {
	private readonly operators: Operators;

	constructor(...operators: Array<Operators>) {
		this.operators = operators.reduce((carry, opers) => Object.assign(carry, opers), {});
	}

	private operation(name: K, query: T): Updater {
		const { [name]: operation } = this.operators;

		return operation(query[name], (query) => this.compile(query), query);
	}

	compile(query: T): Updater {
		const operation = Object.keys(query)
			.map((name) => this.operation(name as K, query));

		return (input: any) => operation.reduce((carry, op) => op(carry), input);
	}
}
