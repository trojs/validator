const types = {
    string: String,
    array: Array,
    object: Object,
    number: Number,
    boolean: Boolean,
    url: URL,
    date: Date,
    function: Function,
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
        this.errors = [];
    }

    /**
     * Validate the an array of items.
     *
     * @param {array} input
     *
     * @return {boolean}
     */
    validateAll(input) {
        this.errors = [];
        if (input.constructor !== Array || input.length < 1) {
            return false;
        }

        return input.every((item) => this.validateItem(item));
    }

    /**
     * Validate the input.
     *
     * @param {object} input
     *
     * @return {boolean}
     */
    validate(input) {
        this.errors = [];
        return this.validateItem(input);
    }

    /**
     * Validate an item.
     *
     * @param {object} item
     *
     * @return {boolean}
     */
    validateItem(item) {
        this.errors = Object.entries(this.schema).filter(
            ([fieldNameRaw, fieldType]) =>
                !this.filterItems(fieldNameRaw, fieldType, item)
        );

        return Object.entries(this.schema).every(([fieldNameRaw, fieldType]) =>
            this.filterItems(fieldNameRaw, fieldType, item)
        );
    }

    filterItems(fieldNameRaw, fieldType, item) {
        if (!item) {
            return false;
        }

        let fieldName = fieldNameRaw;

        if (fieldNameRaw.substr(0, 1) === '?') {
            fieldName = fieldNameRaw.substr(1);

            if (
                !Object.prototype.hasOwnProperty.call(item, fieldName) ||
                item[fieldName] === null ||
                item[fieldName] === undefined
            ) {
                return true;
            }
        }

        if (fieldNameRaw.substr(-1, 1) === '?') {
            fieldName = fieldNameRaw.substr(0, fieldNameRaw.length - 1);

            if (
                !Object.prototype.hasOwnProperty.call(item, fieldName) ||
                item[fieldName] === null ||
                item[fieldName] === undefined
            ) {
                return true;
            }
        }

        const value = item[fieldName];

        if (value === null || value === undefined) {
            return false;
        }

        if (typeof fieldType !== 'string' && value.constructor === fieldType) {
            return true;
        }

        if (!types.hasOwnProperty(fieldType)) {
            const validationMethod = `validate${value.constructor.name}`;

            return this[validationMethod](value, fieldType);
        }

        const type = types[fieldType];

        return value.constructor === type;
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
        return value.every((item) => this.validateObject(item, fieldType));
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
