import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { filter as f } from "../source/Domain/Filter";

let stream: ReturnType<typeof createWriteStream> | undefined;
let timeout: ReturnType<typeof setTimeout>;

function record(data: any): void {
    clearTimeout(timeout);
    if (!stream) {
        stream = createWriteStream(resolve(process.cwd(), 'recorder.ndjson'));
    }

    stream.write(JSON.stringify(data) + '\n');

    timeout = setTimeout(() => {
        stream && stream.close();
        stream = undefined;
    }, 100);
}

export function filter(...[query]: Parameters<typeof f>): ReturnType<typeof f> {
    const compiled = f(query);

    return (...[input]: Parameters<typeof compiled>): ReturnType<typeof compiled> => {
        let output: boolean = false;
        let error = undefined;

        try {
            output = compiled(input);
        }
        catch (e) {
            error = e;
        }

        return output as ReturnType<typeof compiled>;
    }
}