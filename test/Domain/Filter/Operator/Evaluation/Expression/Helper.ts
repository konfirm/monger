import { accessor } from "../../../../../../source/Domain/Field";

export function resolve(value: any): (input: any) => any {
    if (typeof value === 'string') {
        if (value === '$$CURRENT') {
            return (input: any) => input;
        }
        if (value.startsWith('$')) {
            return accessor(value.slice(1));
        }
    }

    return () => value;
}