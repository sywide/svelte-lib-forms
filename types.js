export const defaultFieldOptions = {
    valid: true,
    required: false,
    checkOnInit: false,
    validateOnChange: true,
    stopAtFirstError: false
};
export function isField(field) {
    const keys = Object.keys(field);
    return ['name', 'value', 'valid', 'invalid', 'required', 'errors'].every((key) => keys.includes(key));
}
