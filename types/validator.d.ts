export type Schema = Record<string, unknown>;
export type Item = Record<string, unknown>;
/**
 * Object validator.
 * @type {import('../types/validator.d.ts').Validator}
 */
export class Validator {
    /**
     * Set the schema for the validator.
     * @param {Schema} schema
     */
    constructor(schema: Schema);
    /** @type {Schema} */
    schema: Schema;
    /** @type {Array<[string, unknown]>} */
    errors: Array<[string, unknown]>;
    /**
     * Validate an array of items.
     * @param {{[key: string]: string}[]} input
     * @returns {boolean}
     */
    validateAll(input: {
        [key: string]: string;
    }[]): boolean;
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
    /**
     * Find the field type.
     * @param {string|unknown} fieldType
     * @param {unknown} value
     * @returns {string|unknown}
     */
    findFieldType(fieldType: string | unknown, value: unknown): string | unknown;
    /**
     * Filter the items.
     * @param {string} fieldNameRaw
     * @param {unknown} fieldType
     * @param {Record<string, unknown>} item
     * @returns {boolean}
     */
    filterItems(fieldNameRaw: string, fieldType: unknown, item: Record<string, unknown>): boolean;
    /**
     * Validate an array
     * @param {Array<unknown>} value
     * @param {unknown} fieldType
     * @returns {boolean}
     */
    validateArray(value: Array<unknown>, fieldType: unknown): boolean;
    /**
     * Validate an object
     * @param {object} value
     * @param {object} fieldType
     * @returns {boolean}
     */
    validateObject(value: object, fieldType: object): boolean;
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
