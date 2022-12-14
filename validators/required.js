export function required() {
    return (val) => {
        let valid = true;
        if (val === undefined || val === null)
            valid = false;
        if (typeof val === 'string') {
            const tmp = val.replace(/\s/g, '');
            valid = tmp.length > 0;
        }
        return { valid, name: 'required' };
    };
}
