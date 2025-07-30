/* @ts-self-types="../types/validator.d.ts" */

/**
 * @typedef {Record<string, unknown>} Schema
 * @typedef {Record<string, unknown>} Item
 */

const exampleAsyncFunction = async () => {}
/**
 * Represents the constructor for async functions.
 * @type {new (...args: unknown[]) => (...args: unknown[]) => unknown}
 */
const AsyncFunction = /** @type {new (...args: unknown[]) => (...args: unknown[]) => unknown} */ (exampleAsyncFunction.constructor)
const types = /** @type {const} */ ({
  string: String,
  array: Array,
  object: Object,
  number: Number,
  boolean: Boolean,
  url: URL,
  date: Date,
  function: Function,
  async: AsyncFunction
})

/**
 * Object validator.
 * @type {import('../types/validator.d.ts').Validator}
 */
class Validator {
  /**
   * Set the schema for the validator.
   * @param {Schema} schema
   */
  constructor (schema) {
    /** @type {Schema} */
    this.schema = schema
    /** @type {Array<[string, unknown]>} */
    this.errors = []
  }

  /**
   * Validate an array of items.
   * @param {{[key: string]: string}[]} input
   * @returns {boolean}
   */
  validateAll (input) {
    this.errors = []
    if (!Array.isArray(input) || input.length < 1) {
      return false
    }
    return input.every((item) => this.validateItem(item))
  }

  /**
   * Validate the input.
   * @param {object} input
   * @returns {boolean}
   */
  validate (input) {
    this.errors = []
    return this.validateItem(input)
  }

  /**
   * Validate an item.
   * @param {object} item
   * @returns {boolean}
   */
  validateItem (item) {
    this.errors = Object.entries(this.schema).filter(
      ([fieldNameRaw, fieldType]) =>
        !this.filterItems(fieldNameRaw, fieldType, item)
    )
    return Object.entries(this.schema).every(([fieldNameRaw, fieldType]) =>
      this.filterItems(fieldNameRaw, fieldType, item)
    )
  }

  /**
   * Find the field type.
   * @param {string|unknown} fieldType
   * @param {unknown} value
   * @returns {string|unknown}
   */
  findFieldType (fieldType, value) {
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
   * @param {unknown} fieldType
   * @param {Record<string, unknown>} item
   * @returns {boolean}
   */
  filterItems (fieldNameRaw, fieldType, item) {
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
      fieldName !== fieldNameRaw
      && (!(fieldName in item)
        || item[fieldName] === null
        || item[fieldName] === undefined
        || item[fieldName] === '')
    ) {
      return true
    }

    const value = item[fieldName]

    if (value === null || value === undefined || value === '') {
      return false
    }

    if (
      (typeof fieldType !== 'string' && value.constructor === fieldType)
      || fieldType === 'mixed'
    ) {
      return true
    }

    const fieldTypeX = this.findFieldType(fieldType, value)
    if (typeof fieldTypeX !== 'string' || !(fieldTypeX in types)) {
      const validationMethod = /** @type {keyof Validator} */ (`validate${value.constructor.name}`)
      const method = this[validationMethod]
      if (typeof method === 'function') {
        // Always call with 3 arguments, as expected by your validation methods
        const result = method.call(this, value, fieldType, item)
        return typeof result === 'boolean' ? result : false
      }
      return false
    }

    const type = types[fieldTypeX]

    return value.constructor === type
  }

  /**
   * Validate an array
   * @param {Array<unknown>} value
   * @param {unknown} fieldType
   * @returns {boolean}
   */
  validateArray (value, fieldType) {
    return value.every((item) => this.validateObject(item, fieldType))
  }

  /**
   * Validate an object
   * @param {object} value
   * @param {object} fieldType
   * @returns {boolean}
   */
  validateObject (value, fieldType) {
    const validator = new Validator(fieldType)
    return validator.validate(value)
  }
}

export { Validator, types }
