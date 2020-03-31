import addressSchema from './address';
import companySchema from './company';

export default {
    name: 'string',
    age: 'number',
    siblings: 'array',
    '?metaData': 'object',
    active: 'boolean',
    address: addressSchema,
    companies: companySchema,
};
