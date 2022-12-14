export function pattern(pattern) {
    return (value) => {
        if (value === null || value === undefined) {
            return { valid: false, name: 'pattern' };
        }
        return { valid: pattern.test(value), name: 'pattern' };
    };
}
