export declare type FieldValidation = {
    valid: boolean;
    name: string;
};
export declare type Validator = (value: any) => FieldValidation | Promise<FieldValidation>;
