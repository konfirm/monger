export type Target<T = unknown> = { [key: string]: T };
export type Updater = (input: Target, ...args: Array<any>) => Target;

type Preparation<T> = (key: keyof T, value: T[keyof T]) => Updater;

export function prepare<T extends Target>(query: T, prepare: Preparation<T>) {
	return Object.keys(query).map((key) => prepare(key as keyof T, query[key] as T[keyof T]));
}
