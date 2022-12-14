import { get } from 'svelte/store';
import { derived } from 'svelte/store';
import { createFieldOject, getErrors } from './createFieldStore.js';
import { defaultFieldOptions } from './types.js';
export function combined(name, fields, reducer, validators = [], options = defaultFieldOptions) {
    let resolve;
    const { subscribe } = derived(fields, (values, set) => {
        const value = reducer(values);
        const createValidations = () => {
            let errors = [];
            values.forEach((value) => {
                errors = [
                    ...errors,
                    ...value.errors
                        .map((e) => {
                        return { valid: false, name: `${value.name}.${e}` };
                    })
                        .flat()
                ];
            });
            return errors;
        };
        const validations = createValidations();
        resolve = getErrors(value, validators, options.stopAtFirstError).then((combinedValidations) => {
            const obj = createFieldOject(name, value, [...combinedValidations, ...validations], {
                dirty: values.some((v) => v.dirty)
            });
            set(obj);
            return obj;
        });
        set(createFieldOject(name, value, validations, {
            dirty: values.some((v) => v.dirty)
        }));
    }, createFieldOject(name, reducer(fields.map((f) => get(f))), []));
    return {
        subscribe,
        validate: async () => {
            return resolve;
        }
    };
}
