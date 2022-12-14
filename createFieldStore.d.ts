import type { Writable, Readable } from 'svelte/store';
import type { Field, FieldOptions } from './types.js';
import type { FieldValidation, Validator } from './validators/validator.js';
export declare function createFieldOject<T>(name: string, value: T, errors?: FieldValidation[], partialField?: Partial<Field<T>>): Field<T>;
export declare function getValue<T>(value: T | Field<T> | Readable<Field<T>>): T;
export declare function getErrors<T>(value: T | Field<T> | Readable<Field<T>>, validators: Validator[], stopAtFirstError?: boolean): Promise<FieldValidation[]>;
export declare function processField<T>(field: Field<T>, validations?: FieldValidation[], partialField?: Partial<Field<T>>): Field<T>;
export declare function createFieldStore<T>(name: string, v: T, validators: Validator[] | undefined, options: FieldOptions): Omit<Writable<Field<T>>, 'set'> & {
    validate: () => Promise<Field<T>>;
    reset: () => void;
    clear: () => void;
    set(this: void, value: Field<T> | T): void;
};
