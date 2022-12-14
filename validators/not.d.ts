import type { Validator } from '$lib';
export declare function not(validation: Validator): (value: any) => Promise<{
    valid: boolean;
    name: string;
}>;
