import addressSchema from './address';
import companySchema from './company';

export default {
    name: String,
    age: Number,
    siblings: Array,
    '?metaData': Object,
    active: Boolean,
    address: addressSchema,
    companies: companySchema,
};
