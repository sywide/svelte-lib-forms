import { createFieldStore } from './createFieldStore.js';
import { defaultFieldOptions } from './types.js';
export function field(name, value, validators = [], options = {}) {
    return createFieldStore(name, value, validators, { ...defaultFieldOptions, ...options });
}
