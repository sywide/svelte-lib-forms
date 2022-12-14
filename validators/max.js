export function max(n) {
    return (value) => {
        const val = typeof value === 'string' ? value.length : isNaN(value) ? 0 : parseFloat(value);
        return { valid: val <= n, name: 'max' };
    };
}
