function logger(fn: (...args: Array<any>) => any): typeof fn {
    return (...args: Array<any>): ReturnType<typeof fn> => {
        const result = fn(...args);
        console.log({ fn, args, result });

        return result;
    }
}

const opers = {
    $gt: (a: number, b: number): boolean => a > b,
    $mod: (a: number, b: number): number => a % b,
    $round: Math.round,
    $ceil: Math.ceil,
    $floor: Math.floor,
}

function compile<T = any>(query: any): (input: any) => T {
    const type = typeof query;

    if (type === 'object') {
        const keys = Object.keys(query);
        const ops = keys.filter((key) => key in opers).map((key) => {
            const op = opers[key as keyof typeof opers];
            const { [key]: value } = query;
            const args = Array.isArray(value)
                ? value.map((val) => compile(val))
                : [compile(value)];

            return (input: any): any => {
                const params = args.map((f) => (<any>f)(input)) as Parameters<typeof op>;

                return (<(...args: Array<any>) => any>op)(...params);
            };
        });
        return (input: any): T => ops.reduce((carry, op) => op(carry), input) as T;
    }
    if (type === 'string' && query.startsWith('$')) {
        const key = query.slice(1);

        return (input: any): T => input?.[key];
    }

    return (): T => query;
}

const query = { $gt: [{ $floor: { $round: { $ceil: '$a' } } }, { $floor: { $round: { $ceil: '$b' } } }] };
// const query = { $gt: [{ $mod: [{ $round: '$a' }, { $ceil: '$b' }] }, 0] };
const foo = { a: 1.4, b: 1.5 };
const bar = { a: 0.5, b: 1.5 };
const baz = { a: 1.5, b: 0.5 };
const compiled = compile(query);

console.dir({
    query,
    compiled,
    foo: { foo, output: compiled(foo), trace: (<any>compiled).trace },
    bar: { bar, output: compiled(bar), trace: (<any>compiled).trace },
    baz: { baz, output: compiled(baz), trace: (<any>compiled).trace },
}, { depth: null });
