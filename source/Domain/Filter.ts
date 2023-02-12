import type { Query, Evaluator } from './Filter/Compiler';
import { Compiler as FilterCompiler } from './Filter/Compiler';
import * as ArrayOps from './Filter/Operator/Array';
import * as Bitwise from './Filter/Operator/Bitwise';
import * as Comparison from './Filter/Operator/Comparison';
import * as Element from './Filter/Operator/Element';
import * as Evaluation from './Filter/Operator/Evaluation';
import * as Geospatial from './Filter/Operator/Geospatial';
import * as Logical from './Filter/Operator/Logical';

export type Operation
	= ArrayOps.Operation
	& Bitwise.Operation
	& Comparison.Operation
	& Element.Operation
	& Evaluation.Operation
	& Geospatial.Operation
	& Logical.Operation;

export const Compiler = FilterCompiler;
export const Operator = {
	Array: ArrayOps,
	Bitwise,
	Comparison,
	Element,
	Evaluation,
	Geospatial,
	Logical,
};

export function filter<T extends Partial<Query> = Partial<Query>>(query: T): Evaluator {
	const instance = new FilterCompiler<T>(ArrayOps, Bitwise, Comparison, Element, Evaluation, Geospatial, Logical);

	return instance.compile(query);
}
