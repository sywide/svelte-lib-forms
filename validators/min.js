export function min(n) {
    return (value) => {
        const val = isNaN(value) ? value.length : parseFloat(value);
        return { valid: val >= n, name: 'min' };
    };
}
