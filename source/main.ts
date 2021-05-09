import type { Query, Evaluator } from './Domain/Query/Compiler';
import { QueryCompiler } from './Domain/Query/Compiler';
import * as Bitwise from './Domain/Operator/Bitwise';
import * as Comparison from './Domain/Operator/Comparison';
import * as Element from './Domain/Operator/Element';
import * as Logical from './Domain/Operator/Logical';
import * as Evaluation from './Domain/Operator/Evaluation';

export type Operation
	= Bitwise.Operation
	& Comparison.Operation
	& Element.Operation
	& Logical.Operation
	& Evaluation.Operation;

export const Operator = {
	Bitwise,
	Comparison,
	Element,
	Logical,
	Evaluation,
};

export const Compiler = {
	Query: QueryCompiler,
};

export function compile<T extends Query = Query>(query: T): Evaluator {
	const instance = new QueryCompiler<T>(Bitwise, Comparison, Element, Logical, Evaluation);

	return instance.compile(query);
}
