import type { Test } from "tape";
import { accessor } from "../../../../../../source/Domain/Field";

export function resolve(value: any): (input: any) => any {
	if (typeof value === "string") {
		if (value === "$$CURRENT") {
			return (input: any) => input;
		}
		if (value.startsWith("$")) {
			return accessor(value.slice(1));
		}
	}

	return () => value;
}

export function bracket(
	before: () => (() => void) | void,
	fn: (t: Test) => void,
) {
	return (t: Test) => {
		const after = before();
		try {
			fn(t);
		} finally {
			after?.();
		}
	};
}
