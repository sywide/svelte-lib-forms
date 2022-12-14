import isPromise from 'is-promise';
export function not(validation) {
    return async (value) => {
        const validator = validation(value);
        if (isPromise(validator)) {
            const result = await validator;
            return { valid: !result.valid, name: result.name };
        }
        return { valid: !validator.valid, name: validator.name };
    };
}
