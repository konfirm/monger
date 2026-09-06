import type { Operation as ArrayOperation } from './Operator/Array';
import type { Operation as BitwiseOperation } from './Operator/Bitwise';
import type { Operation as ComparisonOperation } from './Operator/Comparison';
import type { Operation as ElementOperation } from './Operator/Element';
import type { Operation as EvaluationOperation } from './Operator/Evaluation';
import type { Operation as LogicalOperation } from './Operator/Logical';
import type { Operation as GeospatialOperation } from './Operator/Geospatial';
import { accessor } from '../Field';
import { isObject, isRegex } from '../BSON';


// This shape is a pure per-document predicate: it can decide match/no-match
// for one document, but structurally cannot know anything about its
// surroundings — other documents, its position among them, or the scope it
// was reached through. That's fine for the vast majority of operators, but
// at least three known cases need exactly that and aren't implemented:
// - $near/$nearSphere sort by distance as an intrinsic part of the query
//   (confirmed via mongo-catalog ground truth, 2026-09) — needs a
//   comparator/ranking alongside the boolean, not just true/false.
// - $setWindowFields operators ($shift, $denseRank, $linearFill, ...) need
//   access to *other documents* in a partition/window, not just the
//   current one — Window.ts is still an unimplemented doc-comment stub.
// - $let/$$ROOT/$$CURRENT need the outer document's scope to survive into
//   a nested sub-expression's evaluation — Variable.ts is likewise still
//   an unimplemented doc-comment stub.
// All three are the same underlying limitation wearing different clothes.
// Whichever gets tackled first will likely force a real change to this
// type, not just a new Operator implementation.
export type Evaluator<T = boolean> = (input: any) => T;
export type CompileStep = (query: any) => Evaluator;
// query: the sibling object this operator's key was found on (e.g. $regex
// reads its sibling $options off it) — always the same shape previously
// passed as the bare "context" 3rd argument.
// path: the chain of operator/field names this query was reached through,
// closest ancestor last — [] at the root document. Lets an operator tell
// "compiled as a nested field condition" from "compiled directly under
// $elemMatch's operator-form" without a bespoke flag per case (see e.g.
// Compiler's own $ref/$id/$db handling, or Comparison.ts's elementwise
// unwrap, both of which read this instead of inventing their own signal).
export type CompileContext = {
	query: Partial<Query>;
	path: Array<string>;
};
export type FilterCompiler = (query: any, compile: CompileStep, context: CompileContext) => Evaluator;

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

// MongoDB's legacy DBRef convention: $ref/$id/$db are never operators, but
// the exact carve-out is position-dependent (confirmed via docker against
// live MongoDB) — standalone at the root document, but nested (inside a
// field, or under $elemMatch) they only stop being treated as operators
// once $ref and $id co-occur ($db is optional; $ref or $id alone still
// throw "unknown operator" when nested).
const dbRefKeys = ['$ref', '$id', '$db'];

function isLiteralDBRefKey(name: string, query: Partial<Query>, path: Array<string>): boolean {
	if (!dbRefKeys.includes(name)) {
		return false;
	}

	return path.length === 0 || ('$ref' in query && '$id' in query);
}

export class Compiler<T extends Partial<Query> = Partial<Query>, K extends keyof T = keyof T> {
	private readonly operators: Operators;

	constructor(...operators: Array<Operators>) {
		this.operators = operators.reduce((carry, opers) => Object.assign(carry, opers), {});
	}

	private condition(name: K, query: T, path: Array<string>): Evaluator {
		const { [name]: value } = query;
		// DBRef keys' own values are always compared literally, never
		// recursed into as a nested condition set — confirmed via docker:
		// {$id: {$bogus: 1}} doesn't throw "unrecognized operator", it's a
		// deep-equality check against the literal object {$bogus: 1}.
		const asLiteral = !isObject(value) || dbRefKeys.includes(String(name));
		const condition = asLiteral
			? isRegex(value) ? { $regex: value } : { $eq: value }
			: value;

		return this.compile(condition as unknown as T, [...path, String(name)]);
	}

	private delegate(name: K, query: T, path: Array<string>): Evaluator {
		const compiled = this.condition(name, query, path);
		const access = accessor(name as string);

		return (input: any) => compiled(access(input));
	}

	private operation(name: K, query: T, path: Array<string>): Evaluator {
		const { [name]: operation } = this.operators;

		if (!operation && String(name).startsWith('$')) {
			if (isLiteralDBRefKey(String(name), query, path)) {
				return this.delegate(name, query, path);
			}

			throw new Error(`Unrecognized operator: '${String(name)}'`);
		}

		return operation
			? operation(query[name], (query) => this.compile(query, [...path, String(name)]), { query, path })
			: this.delegate(name, query, path);
	}

	compile(query: T, path: Array<string> = []): Evaluator {
		const operation = Object.keys(query)
			// legacy $near supports sibling $min-/$maxDistance keys, which in turn should not be taken into consideration
			// TODO: determine how to deal with these exceptions
			.filter((key) => !['$minDistance', '$maxDistance'].includes(key) || !('$near' in query || '$nearSphere'))
			.map((name) => this.operation(name as K, query, path));

		return (input: any) => operation.every((op) => op(input));
	}
}
