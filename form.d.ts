import type { Readable, Writable } from 'svelte/store';
import type { Field } from './types.js';
export declare type Form = {
    valid: boolean;
    dirty: boolean;
    errors: string[];
};
export declare function form(...fields: (Writable<Field<any>> | Readable<Field<any>>)[]): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<{
        valid: boolean;
        dirty: boolean;
        readonly summary: {};
        errors: string[];
        hasError(this: Form, name: string): boolean;
    }>, invalidate?: ((value?: {
        valid: boolean;
        dirty: boolean;
        readonly summary: {};
        errors: string[];
        hasError(this: Form, name: string): boolean;
    } | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
    reset: () => void;
    validate: () => Promise<void>;
    getField: (name: string) => Writable<Field<any>> | Readable<Field<any>>;
    summary: () => Record<string, any>;
    clear: () => void;
};
