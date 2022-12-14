import isPromise from 'is-promise';
import { writable, get } from 'svelte/store';
import { isField } from './types.js';
export function createFieldOject(name, value, errors = [], partialField = {}) {
    const field = {
        name,
        value,
        valid: true,
        invalid: false,
        required: false,
        errors: [],
        dirty: false
    };
    return processField(field, errors, partialField);
}
export function getValue(value) {
    const isStore = function (v) {
        return value.subscribe !== undefined;
    };
    const isField = function (v) {
        return !!value.name && value.valid !== undefined;
    };
    if (isStore(value)) {
        return get(value).value;
    }
    else if (isField(value)) {
        return value.value;
    }
    return value;
}
export async function getErrors(value, validators, stopAtFirstError = false) {
    const v = getValue(value);
    let errors = [];
    for (const validator of validators) {
        let result = validator(v);
        if (isPromise(result)) {
            result = await result;
        }
        if (stopAtFirstError && !result.valid) {
            errors = [result];
            break;
        }
        errors = [...errors, result];
    }
    return errors;
}
export function processField(field, validations, partialField = {}) {
    if (validations) {
        const errors = validations.filter((v) => !v.valid).map((v) => v.name);
        const valid = !errors.length;
        return { ...field, valid: valid, invalid: !valid, errors, ...partialField };
        // return { ...field, dirty: field.dirty || !!validations.length, valid, invalid: !valid, errors, ...partialField };
    }
    return field;
}
export function createFieldStore(name, v, validators = [], options) {
    const value = {
        name,
        value: v,
        valid: options.valid,
        invalid: !options.valid,
        required: options.required,
        dirty: false,
        errors: []
    };
    const store = writable(value);
    const { subscribe, update, set: _set } = store;
    async function set(field, forceValidation = false) {
        if (!isField(field)) {
            field = processField(get(store), [], { value: field });
        }
        if (forceValidation || options.validateOnChange) {
            let validations = await getErrors(field, validators, options.stopAtFirstError);
            _set(processField(field, validations, { dirty: true }));
        }
        else {
            _set(processField(field, [], { dirty: true }));
        }
    }
    async function validate() {
        const errors = await getErrors(store, validators, options.stopAtFirstError);
        let obj;
        update((field) => {
            obj = processField(field, errors, { dirty: false });
            return obj;
        });
        return obj;
    }
    function reset() {
        _set(processField({
            dirty: false,
            errors: [],
            name,
            valid: options.valid,
            invalid: !options.valid,
            required: options.required,
            value: v
        }));
    }
    if (options.checkOnInit) {
        set(value);
    }
    function clear() {
        _set(processField({
            dirty: false,
            errors: [],
            name,
            valid: options.valid,
            invalid: !options.valid,
            required: options.required,
            value: v
        }));
    }
    return { subscribe, update, set, validate, reset, clear };
}
