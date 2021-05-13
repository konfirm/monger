import type { Evaluator } from '../../../Filter/Compiler';

export type TextSearchOptions = {
	$search: string;
	$language?: string;
	$caseSensitive?: boolean;
	$diacriticSensitive?: boolean;
};

type TermOptions = {
	$negate?: boolean;
	$caseSensitive?: boolean;
	$diacriticSensitive?: boolean;
};

function normalize(input: string): string {
	return input.normalize('NFD');
}

function stripDiacritics(input: string): string {
	return normalize(input)
		.replace(/(.)[\u0300-\u036f]/g, '$1');
}

function optionalDiacritics(input: string): string {
	return normalize(input)
		.replace(/([^\u0300-\u036f])[\u0300-\u036f]?/g, '$1[\\u0300-\\u036f]?');
}

export class Term {
	private conditions: Array<Evaluator> = [];

	constructor(public search: string, private readonly options: Partial<TermOptions> = {}) {
		const { $caseSensitive = false, $diacriticSensitive = false } = options;
		const normal = search.normalize('NFD');
		const flags = `u${$caseSensitive ? '' : 'i'}`;
		const exact = new RegExp($diacriticSensitive ? normal : optionalDiacritics(normal), flags);
		const bound = new RegExp(`(?:\\b|^)${stripDiacritics(normal)}(?:\\b|$)`, flags);

		this.conditions.push(
			(input: string) => exact.test(input),
			(input: string) => bound.test(stripDiacritics(input)),
		);
	}

	get negated(): boolean {
		const { options: { $negate = false } } = this;

		return $negate;
	}

	match(input: unknown): boolean {
		const { conditions, negated } = this;
		const normal = String(input).normalize('NFD');

		// every will return true if all conditions match
		// if the term is negated, we should check for the outcome to be false
		// and true otherwise (hence the not equal)
		return conditions.every((c) => c(normal)) !== negated;
	}

	static createTerms(search: string, options: Partial<TextSearchOptions> = {}): Array<Term> {
		const quoted: Array<Term> = [];
		const remainder = search
			.normalize('NFD')
			.replace(/(-*)(")([^\2]*)\2/g, (_, neg, _quote, search) => {
				quoted.push(new Term(search, { ...options, $negate: Boolean(neg) }));

				return '';
			})
			.split(/\s+/)
			.filter(Boolean)
			.map((search) => search.match(/^(-+)(.*)$/) || ['', '', search])
			.map(([, neg, search]) => new Term(search, { ...options, $negate: Boolean(neg) }));

		return quoted.concat(remainder);
	}
}

