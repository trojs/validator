import addressSchema from './address.js'
import companySchema from './company.js'

/**
 * Person schema definition
 * @type {Record<string, any>}
 */
export default {
  name: String,
  age: Number,
  birthDay: Date,
  siblings: Array,
  'metaData?': Object,
  active: Boolean,
  address: addressSchema,
  companies: companySchema
}
