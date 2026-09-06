type Operation =
    | string
    | number
    | boolean
    | null
    | RegExp
    | Date
    | Array<Operation>
    | { [key: string]: Operation };

const pattern = /^@([a-zA-Z]+)(?::([^\/]+))?\/([^\/]+)(?:\/([^\/]+))?/;
const UNDEFINED_SENTINEL = Symbol('undefined');
const replacer = [
	{ type: 'Date', cast: (value: string): Date => new Date(value) },
	{ type: 'RegExp', cast: (value: string, options: string): RegExp => new RegExp(value, options) },
	{ type: 'Number', cast: (value:string):number => Number(value)},
	{ type: 'Undefined', cast: (): typeof UNDEFINED_SENTINEL => UNDEFINED_SENTINEL },
];

function isReplacer(input: unknown): boolean {
    return typeof input === 'string' && pattern.test(input);
}

function reviver(_key: string | number, input: Operation): Operation {
    if (isReplacer(input)) {
		const [, type, , value, options] = pattern.exec(String(input)) as RegExpExecArray;
		const repl = replacer.find((repl) => repl.type === type);

		if (repl) return repl.cast(value, options) as Operation;
    }

    return input;
}

function restoreUndefined(value: unknown): unknown {
	if (Array.isArray(value)) {
		value.forEach((v, i) => {
			if (v === UNDEFINED_SENTINEL) value[i] = undefined;
			else restoreUndefined(v);
		});
	} else if (value && typeof value === 'object') {
		for (const key of Object.keys(value)) {
			const record = value as Record<string, unknown>;

			if (record[key] === UNDEFINED_SENTINEL) record[key] = undefined;
			else restoreUndefined(record[key]);
		}
	}

	return value;
}

export function deserialize<T = unknown>(serialized: string): T {
	return restoreUndefined(JSON.parse(serialized, reviver)) as T;
}
