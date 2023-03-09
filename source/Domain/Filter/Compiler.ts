import type { Operation as ArrayOperation } from './Operator/Array';
import type { Operation as BitwiseOperation } from './Operator/Bitwise';
import type { Operation as ComparisonOperation } from './Operator/Comparison';
import type { Operation as ElementOperation } from './Operator/Element';
import type { Operation as EvaluationOperation } from './Operator/Evaluation';
import type { Operation as LogicalOperation } from './Operator/Logical';
import type { Operation as GeospatialOperation } from './Operator/Geospatial';
import { accessor } from '../Field';
import { isObject, isRegex } from '../BSON';


export type Evaluator<T = boolean> = (input: any) => T;
export type CompileStep = (query: any) => Evaluator;
export type FilterCompiler = (query: any, compile: CompileStep, context: Partial<Query>) => Evaluator;

export type Operators = {
	[key: string]: FilterCompiler;
}

type Operation
	= ArrayOperation
	& BitwiseOperation
	& ComparisonOperation
	& ElementOperation
	& EvaluationOperation
	& GeospatialOperation;
type ImplicitEqual = ComparisonOperation['$eq'];

export type Query = LogicalOperation | { [key: string]: ImplicitEqual | Partial<Query | Operation> }

export class Compiler<T extends Partial<Query> = Partial<Query>, K extends keyof T = keyof T> {
	private readonly operators: Operators;

	constructor(...operators: Array<Operators>) {
		this.operators = operators.reduce((carry, opers) => Object.assign(carry, opers), {});
	}

	private condition(name: K, query: T): Evaluator {
		const { [name]: value } = query;
		const condition = !isObject(value)
			? isRegex(value) ? { $regex: value } : { $eq: value }
			: value;

		return this.compile(condition as unknown as T);
	}

	private delegate(name: K, query: T): Evaluator {
		const compiled = this.condition(name, query);
		const access = accessor(name as string);

		return (input: any) => compiled(access(input));
	}

	private operation(name: K, query: T): Evaluator {
		const { [name]: operation } = this.operators;

		return operation
			? operation(query[name], (query) => this.compile(query), query)
			: this.delegate(name, query);
	}

	compile(query: T): Evaluator {
		const operation = Object.keys(query)
			// legacy $near supports sibling $min-/$maxDistance keys, which in turn should not be taken into consideration
			// TODO: determine how to deal with these exceptions
			.filter((key) => !['$minDistance', '$maxDistance'].includes(key) || !('$near' in query || '$nearSphere'))
			.map((name) => this.operation(name as K, query));

		return (input: any) => operation.every((op) => op(input));
	}
}
