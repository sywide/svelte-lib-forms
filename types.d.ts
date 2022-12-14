import type { Readable } from 'svelte/store';
export declare type FieldOptions = {
    valid: boolean;
    required: boolean;
    checkOnInit: boolean;
    validateOnChange: boolean;
    stopAtFirstError: boolean;
};
export declare type Field<T> = {
    name: string;
    value: T;
    valid: boolean;
    invalid: boolean;
    required: boolean;
    dirty: boolean;
    errors: string[];
};
export declare const defaultFieldOptions: FieldOptions;
export declare type FieldsValues<T> = T extends Readable<infer U> ? U : {
    [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
};
export declare type Fields = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;
export declare type Form = {
    valid: boolean;
    dirty: boolean;
    errors: string[];
};
export declare function isField<T>(field: any): field is Field<T>;
