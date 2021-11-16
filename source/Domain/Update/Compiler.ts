import type { Operation as ArrayOperation } from './Operator/Array';
import type { Operation as BitwiseOperation } from './Operator/Bitwise';
import type { Operation as FieldOperation } from './Operator/Field';

export type Target<T = unknown> = { [key: string]: T };
export type Updater<T = Target> = (input: T, ...args: Array<any>) => T;
export type CompileStep = (update: any) => Updater;
export type UpdateCompiler = (update: any) => Updater;
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

export class Compiler<U extends Partial<Update> = Partial<Update>, K extends keyof U = keyof U> {
	private readonly operators: Operators;

	constructor(...operators: Array<Operators>) {
		this.operators = operators.reduce((carry, opers) => Object.assign(carry, opers), {});
	}

	private operation(name: K, query: U): Updater {
		const { [name]: operation } = this.operators;

		return operation(query[name]);
	}

	compile(query: U): Updater {
		const operation = Object.keys(query)
			.map((name) => this.operation(name as K, query));

		return (input: any) => operation.reduce((carry, op) => op(carry), input) as typeof input;
	}
}
