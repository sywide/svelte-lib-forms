export declare function style(node: HTMLElement, { field, valid, invalid, dirty }?: {
    field?: null | undefined;
    valid?: string | undefined;
    invalid?: string | undefined;
    dirty?: string | undefined;
}): {
    destroy: () => any;
};
