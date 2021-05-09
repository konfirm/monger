import type { Evaluator as QCEvaluator } from '../../Query/Compiler';

export type Evaluator = QCEvaluator;
export type JSONSchema = { [key: string]: unknown };
export type Compiler = (input: any) => Evaluator;
export type Builder<S> = <T extends S>(input: any, schematic: Partial<T>, compile: Compiler) => Evaluator;
