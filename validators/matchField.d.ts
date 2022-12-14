import type { Field } from '../types';
import type { Readable } from 'svelte/store';
export declare function matchField(store: Readable<Field<any>>): (value: any) => {
    valid: boolean;
    name: string;
};
