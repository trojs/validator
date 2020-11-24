import addressSchema from './address';
import companySchema from './company';

export default {
    name: String,
    age: Number,
    birthDay: Date,
    siblings: Array,
    '?metaData': Object,
    active: Boolean,
    address: addressSchema,
    companies: companySchema,
};
