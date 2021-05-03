import type { Query, Evaluator } from '../Query/Compiler';
import { TextSearchOptions } from '../Search/Term';
import { Term } from '../Search/Term';

export type Operation = {
	$expr: Parameters<typeof $expr>[0];
	$jsonSchema: Parameters<typeof $jsonSchema>[0];
	$mod: Parameters<typeof $mod>[0];
	$regex: Parameters<typeof $regex>[0];
	$text: Parameters<typeof $text>[0];
	$where: Parameters<typeof $where>[0];
};

/**
 * $expr
 * Allows use of aggregation expressions within the query language.
 * @syntax  { $expr: { <expression> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/expr/
 */
export function $expr(todo: any): Evaluator {
	return (input: unknown): boolean => {
		throw new Error('$expr not implemented');
	}
}

/**
 * $jsonSchema
 * Validate documents against the given JSON Schema.
 * @syntax
 * @see     https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/
 */
export function $jsonSchema(todo: any): Evaluator {
	return (input: unknown): boolean => {
		throw new Error('$jsonSchema not implemented');
	}
}

/**
 * $mod
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 * @syntax  { field: { $mod: [ divisor, remainder ] } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/mod/
 */
export function $mod(query: [number, number]): Evaluator {
	const [divisor, remainder] = query;

	return (input: unknown): boolean => Number(input) % divisor === remainder;
}

/**
 * $regex
 * Selects documents where values match a specified regular expression.
 * @syntax  { <field>: { $regex: /pattern/, $options: '<options>' } }
 *          { <field>: { $regex: 'pattern', $options: '<options>' } }
 *          { <field>: { $regex: /pattern/<options> } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/regex/
 */
export function $regex(query: RegExp | string, _: any = undefined, context: Query = {}): Evaluator {
	const { $options: flags } = context;
	const regex = flags || typeof query === 'string' ? new RegExp(String(query), flags && String(flags)) : query;

	return (input: unknown): boolean => regex.test(String(input));
}

/**
 * $text
 * Performs text search.
 * @syntax  { <field>: {
 *              $text: {
 *                $search: <string>,
 *                $language?: <string 'none'>,
 *                $caseSensitive?: <boolean false>,
 *                $diacriticSensitive?: <boolean false>,
 *              }
 *          } }
 * @see     https://docs.mongodb.com/manual/reference/operator/query/text/
 */
export function $text(query: TextSearchOptions): Evaluator {
	const terms = Term.createTerms(query.$search, query);
	const { length } = terms.filter(({ negated }) => negated);
	const evalulate = length && terms.length === length
		// text queries consisting of only negated searches always return false
		? () => false
		: (input: unknown): boolean => terms.every((term) => term.match(input));

	return evalulate;
}

/**
 * $where
 * Matches documents that satisfy a JavaScript expression.
 * @syntax
 * @see     https://docs.mongodb.com/manual/reference/operator/query/where/
 */
export function $where(todo: any): Evaluator {
	return (input: unknown): boolean => {
		throw new Error('$where not implemented');
	}
}
