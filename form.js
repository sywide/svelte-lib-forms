import { derived, get } from 'svelte/store';
export function form(...fields) {
    let names = [];
    let doubles = [];
    fields.forEach((field) => {
        const obj = get(field);
        if (names.includes(obj.name)) {
            doubles = doubles.includes(obj.name) ? doubles : [...doubles, obj.name];
        }
        else {
            names = [...names, obj.name];
        }
    });
    if (doubles.length) {
        throw new Error(`Cannot have the fields with the same name: ${doubles.join(', ')}`);
    }
    const store = derived(fields, (values) => {
        return {
            valid: values.every((value) => value.valid),
            dirty: values.some((value) => value.dirty),
            // Summary as a getter to avoid useless computation of data
            // if no one wants it
            get summary() {
                return values.reduce((carry, f) => {
                    carry[f.name] = f.value;
                    return carry;
                }, {});
            },
            errors: values
                .map((value) => {
                return value.errors.map((e) => {
                    if (e.includes('.')) {
                        return e;
                    }
                    return `${value.name}.${e}`;
                });
            })
                .flat()
                .filter((value, index, self) => self.indexOf(value) === index),
            hasError(name) {
                return this.errors.findIndex((e) => e === name) !== -1;
            }
        };
    });
    const { subscribe } = store;
    function reset() {
        fields.forEach((field) => field.reset && field.reset());
    }
    function clear() {
        fields.forEach((field) => field.clear && field.clear());
    }
    async function validate() {
        for (const field of fields) {
            if (field.validate)
                await field.validate();
        }
    }
    function getField(name) {
        return fields.find((f) => get(f).name === name);
    }
    function summary() {
        return get(store).summary;
    }
    return { subscribe, reset, validate, getField, summary, clear };
}
