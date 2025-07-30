/**
 * Object validator.
 */
export class Validator {
    /**
     * Set the schema for the validator.
     * @param {object} schema
     */
    constructor(schema: object);
    schema: any;
    errors: any[];
    /**
     * Validate the an array of items.
     * @param {Array} input
     * @returns {boolean}
     */
    validateAll(input: any[]): boolean;
    /**
     * Validate the input.
     * @param {object} input
     * @returns {boolean}
     */
    validate(input: object): boolean;
    /**
     * Validate an item.
     * @param {object} item
     * @returns {boolean}
     */
    validateItem(item: object): boolean;
    findFieldType(fieldType: any, value: any): any;
    /**
     * Filter the items.
     * @param {string} fieldNameRaw
     * @param {any} fieldType
     * @param {object} item
     * @returns {boolean}
     */
    filterItems(fieldNameRaw: string, fieldType: any, item: object): boolean;
    /**
     * Validate an array
     * @param {any} value
     * @param {string} fieldType
     * @returns {boolean}
     */
    validateArray(value: any, fieldType: string): boolean;
    /**
     * Validate an object
     * @param {any} value
     * @param {string} fieldType
     * @returns {boolean}
     */
    validateObject(value: any, fieldType: string): boolean;
}
export namespace types {
    export let string: StringConstructor;
    export let array: ArrayConstructor;
    export let object: ObjectConstructor;
    export let number: NumberConstructor;
    export let boolean: BooleanConstructor;
    export let url: {
        new (url: string | URL, base?: string | URL): URL;
        prototype: URL;
        canParse(url: string | URL, base?: string | URL): boolean;
        createObjectURL(obj: Blob | MediaSource): string;
        parse(url: string | URL, base?: string | URL): URL | null;
        revokeObjectURL(url: string): void;
    };
    export let date: DateConstructor;
    let _function: FunctionConstructor;
    export { _function as function };
    export { AsyncFunction as async };
}
declare const AsyncFunction: Function;
export {};
