import test from 'node:test'
import assert from 'node:assert'
import { Validator } from '../../src/validator.js'
import barSchema from '../../src/schemas/bar.js'
import carSchema from '../../src/schemas/car.js'
import personSchema from '../../src/schemas/person.js'
import addressSchema from '../../src/schemas/address.js'
import companySchema from '../../src/schemas/company.js'
import test1Schema from '../../src/schemas/test1.js'
import Test2 from '../../src/schemas/test2.js'

const test2 = new Test2('me')

const testCases = [
    {
        description: 'A valid test with a custom type',
        input: {
            name: 'test',
            test: test2,
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A valid test with a sub schema',
        input: {
            name: 'test',
            test: test2,
            test3: { example: 'ok' },
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A invalid test with a custom type',
        input: {
            name: 'test',
            test: 'test',
        },
        schema: test1Schema,
        expectedValue: false,
        expectedErrors: [['test', Test2]],
    },
    {
        description: 'A invalid test with a sub schema',
        input: {
            name: 'test',
            test: test2,
            test3: 'test',
        },
        schema: test1Schema,
        expectedValue: false,
        expectedErrors: [['test3?', { example: String }]],
    },
    {
        description: 'A invalid test with a field of the sub scherma',
        input: {
            name: 'test',
            test: test2,
            test3: { example: 42 },
        },
        schema: test1Schema,
        expectedValue: false,
        expectedErrors: [['test3?', { example: String }]],
    },
    {
        description: 'A test with a mixed field',
        input: {
            name: 'test',
            test: test2,
            test4: { example: 42 },
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A test with a mixed field',
        input: {
            name: 'test',
            test: test2,
            test4: 42,
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A test with an async function',
        input: {
            name: 'test',
            test: test2,
            test5: async () => {},
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A test with a function',
        input: {
            name: 'test',
            test: test2,
            test5: () => {},
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'A test with a invalid (async) function',
        input: {
            name: 'test',
            test: test2,
            test5: 42,
        },
        schema: test1Schema,
        expectedValue: false,
        expectedErrors: [['test5?', 'function|async']],
    },
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
            build: () => {},
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
        expectedErrors: [
            ['milage', 'number'],
            ['build', 'function'],
        ],
    },
    {
        description: 'A valid person',
        input: {
            name: 'James',
            age: 25,
            birthDay: new Date('1982-12-24'),
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
            companies: [
                { name: 'Example', website: new URL('https://trojs.org') },
            ],
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
            birthDay: new Date('1982-12-24'),
            siblings: ['Johnnathan'],
            active: false,
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
        description: 'An valid person where metaData is null',
        input: {
            name: 'James',
            age: 25,
            birthDay: new Date('1982-12-24'),
            siblings: ['Johnnathan'],
            metaData: null,
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
        description: 'An valid person where metaData is undefined',
        input: {
            name: 'James',
            age: 25,
            birthDay: new Date('1982-12-24'),
            siblings: ['Johnnathan'],
            metaData: undefined,
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
            birthDay: new Date('1982-12-24'),
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
        input: {
            name: '',
            age: 25,
            birthDay: new Date('1982-12-24'),
            siblings: ['Johnnathan'],
            metaData: undefined,
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
        expectedErrors: [['name', String]],
    },
    {
        description: 'An invalid person 3',
        input: '',
        schema: personSchema,
        expectedValue: false,
        expectedErrors: [
            ['name', String],
            ['age', Number],
            ['birthDay', Date],
            ['siblings', Array],
            ['metaData?', Object],
            ['active', Boolean],
            ['address', addressSchema],
            ['companies', companySchema],
        ],
    },
    {
        description:
            'A valid test with a mixed object or string and a object as value',
        input: {
            name: 'test',
            test: test2,
            test6: { example: 'ok' },
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description:
            'A valid test with a mixed object or string and a object as value',
        input: {
            name: 'test',
            test: test2,
            test6: { example: '' },
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description:
            'A valid test with a mixed object or string and a string as value',
        input: {
            name: 'test',
            test: test2,
            test6: 'test',
        },
        schema: test1Schema,
        expectedValue: true,
        expectedErrors: [],
    },
    {
        description: 'An invalid test with a mixed object or string',
        input: {
            name: 'test',
            test: test2,
            test6: 42,
        },
        schema: test1Schema,
        expectedValue: false,
        expectedErrors: [['test6?', 'object|string']],
    },
]

test('Validator test', async (t) => {
    await Promise.all(
        testCases.map(
            async ({
                description,
                input,
                schema,
                expectedValue,
                expectedErrors,
            }) => {
                await t.test(description, () => {
                    const validator = new Validator(schema)
                    const valid = validator.validate(input)

                    assert.strictEqual(valid, expectedValue)
                    assert.deepEqual(validator.errors, expectedErrors)
                })
            }
        )
    )
})

const testCaseArrays = [
    {
        description: 'Valid persons array',
        input: [
            {
                name: 'James',
                age: 25,
                birthDay: new Date('1982-12-24'),
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
                birthDay: new Date('1982-12-24'),
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
                birthDay: new Date('1982-12-24'),
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
            birthDay: new Date('1982-12-24'),
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
]

test('Validator test with arrays', async (t) => {
    await Promise.all(
        testCaseArrays.map(
            async ({ description, input, schema, expectedValue }) => {
                await t.test(description, () => {
                    const validator = new Validator(schema)

                    assert.deepEqual(
                        validator.validateAll(input),
                        expectedValue
                    )
                })
            }
        )
    )
})
