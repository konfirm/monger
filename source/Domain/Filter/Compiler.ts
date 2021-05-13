import type { Operation as BitwiseOperation } from './Operator/Bitwise';
import type { Operation as ComparisonOperation } from './Operator/Comparison';
import type { Operation as ElementOperation } from './Operator/Element';
import type { Operation as LogicalOperation } from './Operator/Logical';
import type { Operation as EvaluationOperation } from './Operator/Evaluation';

export type Evaluator = (input: any) => boolean;
export type CompileStep = (query: any) => Evaluator;
export type FilterCompiler = (query: any, compile: CompileStep, context: Partial<Query>) => Evaluator;

export type Operators = {
	[key: string]: FilterCompiler;
}

type Operation
	= BitwiseOperation
	& ComparisonOperation
	& ElementOperation
	& EvaluationOperation;

export type Query = LogicalOperation | { [key: string]: Partial<Query | Operation> }

export class Compiler<T extends Partial<Query> = Partial<Query>, K extends keyof T = keyof T> {
	private readonly operators: Operators;

	constructor(...operators: Array<Operators>) {
		this.operators = operators.reduce((carry, opers) => Object.assign(carry, opers), {});
	}

	private delegate(name: K, query: T): Evaluator {
		const compiled = this.compile(query[name] as unknown as T);

		return (input: any) => compiled(name in input ? input[name] : undefined);
	}

	private operation(name: K, query: T): Evaluator {
		const { [name]: operation } = this.operators;

		return operation
			? operation(query[name], (query) => this.compile(query), query)
			: this.delegate(name, query);
	}

	compile(query: T): Evaluator {
		const operation = Object.keys(query)
			.map((name) => this.operation(name as K, query));

		return (input: any) => operation.every((op) => op(input));
	}
}
