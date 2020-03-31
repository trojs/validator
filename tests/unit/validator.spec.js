import { Validator } from '../../src/validator';
import barSchema from '../../src/schemas/bar';
import carSchema from '../../src/schemas/car';
import personSchema from '../../src/schemas/person';
import addressSchema from '../../src/schemas/address';
import companySchema from '../../src/schemas/company';

const testCases = [
    {
        description: 'A valid bar',
        input: {
            name: 'Jimmys drinks',
            address: 'Somewhere over the rainbow',
            drinks: {
                beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
            },
        },
        schema: barSchema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'An invalid bar',
        input: {
            name: 'Sjonnies',
            address: 'Centrum 001',
            drinks: [
                // < No object
                'Heineken',
            ],
        },
        schema: barSchema,
        expectedValue: false,
        expectedErrors: [['drinks', 'object']],
    },
    {
        description: 'A valid car',
        input: {
            brand: 'Mazda',
            type: 'MX5 NB 1.8',
            milage: 199999.99,
            extras: ['2001 Special Edition'],
        },
        schema: carSchema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'An invalid car',
        input: {
            brand: 'BMW',
            type: '335',
            // No number
            milage: '100000',
            extras: ['LCI', 'KW Coilovers'],
        },
        schema: carSchema,
        expectedValue: false,
        expectedErrors: [['milage', 'number']],
    },
    {
        description: 'A valid person',
        input: {
            name: 'James',
            age: 25,
            siblings: ['Johnnathan'],
            metaData: {},
            active: true,
            address: {
                street: 'Streetname',
                number: 1,
                postalCode: '1234AB',
                city: 'City',
                country: 'Somewehere',
            },
            companies: [{ name: 'Example', website: 'https://hckr.news' }],
        },
        schema: personSchema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'An valid person without metaData',
        input: {
            name: 'James',
            age: 25,
            siblings: ['Johnnathan'],
            active: true,
            address: {
                street: 'Streetname',
                number: 1,
                postalCode: '1234AB',
                city: 'City',
                country: 'Somewehere',
            },
            companies: [{ name: 'Example 1' }, { name: 'Example 2' }],
        },
        schema: personSchema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'An invalid person',
        input: {
            name: 'James',
            age: 25,
            active: true,
        },
        schema: personSchema,
        expectedValue: false,
        expectedErrors: [
            ['siblings', Array],
            ['address', addressSchema],
            ['companies', companySchema],
        ],
    },
    {
        description: 'An invalid person 2',
        input: '',
        schema: personSchema,
        expectedValue: false,
        expectedErrors: [
            ['name', String],
            ['age', Number],
            ['siblings', Array],
            ['?metaData', Object],
            ['active', Boolean],
            ['address', addressSchema],
            ['companies', companySchema],
        ],
    },
];

describe.each(testCases)(
    'Validator test',
    ({ description, input, schema, expectedValue, expectedErrors }) => {
        it(description, () => {
            const validator = new Validator(schema);

            expect(validator.validate(input)).toEqual(expectedValue);
            expect(validator.errors).toEqual(expectedErrors);
        });
    }
);

const testCaseArrays = [
    {
        description: 'Valid persons array',
        input: [
            {
                name: 'James',
                age: 25,
                siblings: ['Johnnathan'],
                active: true,
                address: {
                    street: 'Streetname',
                    number: 1,
                    postalCode: '1234AB',
                    city: 'City',
                    country: 'Somewehere',
                },
                companies: [{ name: 'Example 1' }, { name: 'Example 2' }],
            },
        ],
        schema: personSchema,
        expectedValue: true,
    },
    {
        description: 'An invalid person',
        input: [
            {
                name: 'James',
                age: 25,
                active: true,
            },
        ],
        schema: personSchema,
        expectedValue: false,
    },
    {
        description: 'Not all persons are valid',
        input: [
            {
                name: 'James',
                age: 25,
                siblings: ['Johnnathan'],
                active: true,
                address: {
                    street: 'Streetname',
                    number: 1,
                    postalCode: '1234AB',
                    city: 'City',
                    country: 'Somewehere',
                },
                companies: [{ name: 'Example 1' }, { name: 'Example 2' }],
            },
            {
                name: 'James',
                age: 25,
                active: true,
            },
        ],
        schema: personSchema,
        expectedValue: false,
    },
    {
        description: 'Input isnt an array',
        input: {
            name: 'James',
            age: 25,
            siblings: ['Johnnathan'],
            active: true,
            address: {
                street: 'Streetname',
                number: 1,
                postalCode: '1234AB',
                city: 'City',
                country: 'Somewehere',
            },
            companies: [{ name: 'Example 1' }, { name: 'Example 2' }],
        },
        schema: personSchema,
        expectedValue: false,
    },
    {
        description: 'Input is an empty array',
        input: [],
        schema: personSchema,
        expectedValue: false,
    },
];

describe.each(testCaseArrays)(
    'Validator test with arrays',
    ({ description, input, schema, expectedValue }) => {
        it(description, () => {
            const validator = new Validator(schema);

            expect(validator.validateAll(input)).toEqual(expectedValue);
        });
    }
);
