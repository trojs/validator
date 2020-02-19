const types = {
    string: String,
    array: Array,
    object: Object,
    number: Number,
    boolean: Boolean
};

/**
 * Object validator.
 */
export class Validator {
    /**
     * Set the schema for the validator.
     *
     * @param {object} schema
     */
    constructor(schema) {
        this.schema = schema;
    }

    /**
     * Validate the an array of items.
     *
     * @param {array} input
     *
     * @return {boolean}
     */
    validateAll(input) {
        if (input.constructor != Array || input.length < 1) {
            return false;
        }

        return input.every(item => this.validate(item));
    }

    /**
     * Validate the input.
     *
     * @param {object} input
     *
     * @return {boolean}
     */
    validate(input) {
        return Object.entries(this.schema).every(
            ([fieldName, fieldTypeRaw]) => {
                if (!input) {
                    return false;
                }

                let fieldType = fieldTypeRaw;

                if (
                    fieldTypeRaw.constructor == String &&
                    fieldTypeRaw.substr(0, 1) == "?"
                ) {
                    fieldType = fieldTypeRaw.substr(1);

                    if (!input.hasOwnProperty(fieldName)) {
                        return true;
                    }
                }

                const value = input[fieldName];

                if (!value) {
                    return false;
                }

                if (!types.hasOwnProperty(fieldType)) {
                    const validationMethod =
                        "validate" + value.constructor.name;

                    return this[validationMethod](value, fieldType);
                }

                const type = types[fieldType];

                return value.constructor === type;
            }
        );
    }

    /**
     * Validate an array
     *
     * @param {mixed} value
     * @param {string} fieldType
     *
     * @return {boolean}
     */
    validateArray(value, fieldType) {
        return value.every(item => {
            return this.validateObject(item, fieldType);
        });
    }

    /**
     * Validate an object
     *
     * @param {mixed} value
     * @param {string} fieldType
     *
     * @return {boolean}
     */
    validateObject(value, fieldType) {
        const validator = new Validator(fieldType);

        return validator.validate(value);
    }
}
