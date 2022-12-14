import type { FieldOptions } from './types.js';
import type { Validator } from './validators/validator.js';
export declare function field<T>(name: string, value: T, validators?: Validator[], options?: Partial<FieldOptions>): Omit<import("svelte/store").Writable<import("./types.js").Field<T>>, "set"> & {
    validate: () => Promise<import("./types.js").Field<T>>;
    reset: () => void;
    clear: () => void;
    set(this: void, value: T | import("./types.js").Field<T>): void;
};
