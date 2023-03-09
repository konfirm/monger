import { accessor } from "../../../../../../source/Domain/Field";

export function resolve(value: any): (input: any) => any {
    return typeof value === 'string' && value.startsWith('$')
        ? accessor(value.slice(1))
        : () => value;
}