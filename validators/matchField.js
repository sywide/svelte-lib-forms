import { get } from 'svelte/store';
export function matchField(store) {
    return (value) => {
        return { valid: get(store).value === value, name: 'match_field' };
    };
}
