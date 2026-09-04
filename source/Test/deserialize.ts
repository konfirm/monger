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
const replacer = [
	{ type: 'Date', cast: (value: string): Date => new Date(value) },
	{ type: 'RegExp', cast: (value: string, options: string): RegExp => new RegExp(value, options) },
	{ type: 'Number', cast: (value:string):number => Number(value)},
];

function isReplacer(input: unknown): boolean {
    return typeof input === 'string' && pattern.test(input);
}

function reviver(_key: string | number, input: Operation): Operation {
    if (isReplacer(input)) {
		const [, type, , value, options] = pattern.exec(String(input)) as RegExpExecArray;
		const repl = replacer.find((repl) => repl.type === type);

		if (repl) return repl.cast(value, options);
    }

    return input;
}

export function deserialize<T = unknown>(serialized: string): T {
	return JSON.parse(serialized, reviver);
}
