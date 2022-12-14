import type { Validator } from './validators/validator.js';
import type { Readable } from 'svelte/store';
import type { Field, FieldOptions, FieldsValues } from './types.js';
export declare function combined<S extends Readable<Field<any>>[], T>(name: string, fields: S, reducer: (fields: FieldsValues<S>) => T, validators?: Validator[], options?: Pick<FieldOptions, 'stopAtFirstError'>): Readable<Field<T>> & {
    validate: () => Promise<Field<T>>;
};
