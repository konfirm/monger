import type { Query, Evaluator } from './Filter/Compiler';
import { Compiler as FilterCompiler } from './Filter/Compiler';
import * as ArrayOp from './Filter/Operator/Array';
import * as Bitwise from './Filter/Operator/Bitwise';
import * as Comparison from './Filter/Operator/Comparison';
import * as Element from './Filter/Operator/Element';
import * as Logical from './Filter/Operator/Logical';
import * as Evaluation from './Filter/Operator/Evaluation';

export type Operation
	= ArrayOp.Operation
	& Bitwise.Operation
	& Comparison.Operation
	& Element.Operation
	& Evaluation.Operation
	& Logical.Operation;

export const Compiler = FilterCompiler;
export const Operator = {
	Array: ArrayOp,
	Bitwise,
	Comparison,
	Element,
	Logical,
	Evaluation,
};

export function filter<T extends Partial<Query> = Partial<Query>>(query: T): Evaluator {
	const instance = new FilterCompiler<T>(ArrayOp, Bitwise, Comparison, Element, Evaluation, Logical);

	return instance.compile(query);
}
