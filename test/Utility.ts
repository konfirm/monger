export function json(value: unknown): string {
	return JSON.stringify(value) || 'undefined'
		.replace(/"([^"]*)"(:|$)/g, '\'$1\'$2')
		.replace(/"/g, '\'');
}

export function jsonify(strings: TemplateStringsArray, ...raw: Array<unknown>): string {
	const values = raw.map(json);

	return strings
		.reduce(
			(carry, value, index) => carry.concat(value, values[index] || []),
			[] as Array<unknown>
		)
		.join('');
}

export function preserve(value: unknown): unknown {
	return JSON.parse(JSON.stringify(value));
}
