const types = {
    string: String,
    array: Array,
    object: Object,
    number: Number,
    boolean: Boolean,
};

/**
 * Object validator.
 */
class Validator {
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
        if (input.constructor !== Array || input.length < 1) {
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
            ([fieldNameRaw, fieldType]) => {
                if (!input) {
                    return false;
                }

                let fieldName = fieldNameRaw;

                if (fieldNameRaw.substr(0, 1) === '?') {
                    fieldName = fieldNameRaw.substr(1);

                    if (
                        !Object.prototype.hasOwnProperty.call(input, fieldName)
                    ) {
                        return true;
                    }
                }

                const value = input[fieldName];

                if (!value) {
                    return false;
                }

                if (
                    typeof fieldType !== 'string' &&
                    value.constructor === fieldType
                ) {
                    return true;
                }

                if (!types.hasOwnProperty(fieldType)) {
                    const validationMethod = `validate${value.constructor.name}`;

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
        return value.every(item => this.validateObject(item, fieldType));
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

module.exports = {
    Validator,
    types,
};
