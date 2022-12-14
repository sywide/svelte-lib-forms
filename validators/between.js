export function between(min, max) {
    return (value) => {
        const val = isNaN(value) ? value.length : parseFloat(value);
        return { valid: val >= min && val <= max, name: 'between' };
    };
}
