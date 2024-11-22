const exampleAsyncFunction = async () => {}
const AsyncFunction = exampleAsyncFunction.constructor
const types = {
    string: String,
    array: Array,
    object: Object,
    number: Number,
    boolean: Boolean,
    url: URL,
    date: Date,
    function: Function,
    async: AsyncFunction
}

/**
 * Object validator.
 */
class Validator {
    /**
     * Set the schema for the validator.
     * @param {object} schema
     */
    constructor(schema) {
        this.schema = schema
        this.errors = []
    }

    /**
     * Validate the an array of items.
     * @param {Array} input
     * @returns {boolean}
     */
    validateAll(input) {
        this.errors = []
        if (input.constructor !== Array || input.length < 1) {
            return false
        }

        return input.every(item => this.validateItem(item))
    }

    /**
     * Validate the input.
     * @param {object} input
     * @returns {boolean}
     */
    validate(input) {
        this.errors = []
        return this.validateItem(input)
    }

    /**
     * Validate an item.
     * @param {object} item
     * @returns {boolean}
     */
    validateItem(item) {
        this.errors = Object.entries(this.schema).filter(
            ([fieldNameRaw, fieldType]) =>
                !this.filterItems(fieldNameRaw, fieldType, item)
        )

        return Object.entries(this.schema).every(([fieldNameRaw, fieldType]) =>
            this.filterItems(fieldNameRaw, fieldType, item)
        )
    }

    findFieldType(fieldType, value) {
        if (typeof fieldType === 'string') {
            const fieldTypes = fieldType.split('|')
            if (fieldTypes.length > 1) {
                return fieldTypes.find(
                    (fieldValue) => types[fieldValue] === value.constructor
                )
            }
            return fieldTypes[0]
        }
        return fieldType
    }

    /**
     * Filter the items.
     * @param {string} fieldNameRaw
     * @param {any} fieldType
     * @param {object} item
     * @returns {boolean}
     */
    filterItems(fieldNameRaw, fieldType, item) {
        if (!item) {
            return false
        }

        let fieldName = fieldNameRaw

        if (fieldNameRaw.startsWith('?')) {
            fieldName = fieldNameRaw.slice(1)
        }

        if (fieldNameRaw.endsWith('?')) {
            fieldName = fieldNameRaw.slice(0, -1)
        }

        if (
            fieldName !== fieldNameRaw &&
            (!(fieldName in item) ||
                item[fieldName] === null ||
                item[fieldName] === undefined ||
                item[fieldName] === '')
        ) {
            return true
        }

        const value = item[fieldName]

        if (value === null || value === undefined || value === '') {
            return false
        }

        if (
            (typeof fieldType !== 'string' &&
                value.constructor === fieldType) ||
                fieldType === 'mixed'
        ) {
            return true
        }

        const fieldTypeX = this.findFieldType(fieldType, value)
        if (!(fieldTypeX in types)) {
            const validationMethod = `validate${value.constructor.name}`

            return this[validationMethod]
                ? this[validationMethod](value, fieldType)
                : false
        }

        const type = types[fieldTypeX]

        return value.constructor === type
    }

    /**
     * Validate an array
     * @param {any} value
     * @param {string} fieldType
     * @returns {boolean}
     */
    validateArray(value, fieldType) {
        return value.every(item => this.validateObject(item, fieldType))
    }

    /**
     * Validate an object
     * @param {any} value
     * @param {string} fieldType
     * @returns {boolean}
     */
    validateObject(value, fieldType) {
        const validator = new Validator(fieldType)

        return validator.validate(value)
    }
}

export { Validator, types }
