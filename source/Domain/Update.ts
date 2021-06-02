import type { Update, Updater } from './Update/Compiler';
import { Compiler as UpdateCompiler } from './Update/Compiler';
import * as ArrayOps from './Update/Operator/Array';
import * as Bitwise from './Update/Operator/Bitwise';
import * as Field from './Update/Operator/Field';

export type Operation
	= ArrayOps.Operation
	& Bitwise.Operation
	& Field.Operation

export const Compiler = UpdateCompiler;
export const Operator = {
	Array: ArrayOps,
	Bitwise,
	Field,
};

export function update<T extends Partial<Update> = Partial<Update>>(update: T): Updater {
	const instance = new UpdateCompiler<T>(ArrayOps, Bitwise, Field);

	return instance.compile(update);
}
