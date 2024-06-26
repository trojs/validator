# Object validator by TroJS

[![NPM version][npm-image]][npm-url]

Validate the object values by a schema.
I hope you like it.

## Sponsors :tada:

If it has saved you development time, please consider [sponsoring the project](https://github.com/sponsors/w3nl)
with GitHub sponsors!

Or on patreon: https://patreon.com/w3news

## Installation

`npm install @trojs/validator`
or
`yarn add @trojs/validator`

## Test the package

If you would test the validator, you can just run:

```
npm install
npm run test
```
or
```
yarn
yarn test
```

## Usage

Example schema:
```javascript
const barSchema = {
    name: "string",
    address: "string",
    drinks: "object",
    "building?": "function|async",
};
```

Example input:
```javascript
const barObj = {
    name: 'Jimmys drinks',
    address: 'Somewhere over the rainbow',
    drinks: {
        beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
    },
};
```

Example usage:
```javascript
const validator = new Validator(barSchema);

validator.validate(barObj);
```

Example multi level schema:
```javascript
const personSchema = {
    name: "string",
    age: "number",
    siblings: "array",
    "?metaData": "object",
    active: "boolean",
    address: {
        street: "string",
        number: "number",
        postalCode: "string",
        city: "string",
        country: "string"
    },
    companies:  {
        name: "string",
        "?website": "string"
    }
};
```

Example valid data for the person schema:
```javascript
const personObj = {
    name: "James",
    age: 25,
    siblings: ["Johnnathan"],
    metaData: {},
    active: true,
    address: {
        street: "Streetname",
        number: 1,
        postalCode: "1234AB",
        city: "City",
        country: "Somewehere"
    },
    companies: [
        { name: "Example company 1", website: "https://trojs.org" }
        { name: "Example company 2" }
    ]
}
```

You can also validate an array of items:
```javascript
const persons = [
    {
        name: "James",
        age: 25,
        siblings: ["Johnnathan"],
        metaData: {},
        active: true,
        address: {
            street: "Streetname",
            number: 1,
            postalCode: "1234AB",
            city: "City",
            country: "Somewehere"
        },
        companies: [
            { name: "Example company 1", website: "https://trojs.org" }
            { name: "Example company 2" }
        ]
    }
];

validator.validateAll(persons);
```

And you can also compare to the objects:
```javascript
const personSchema = {
    name: String,
    age: Number,
    siblings: Array,
    "?metaData": Object,
    active: Boolean,
    address: {
        street: String,
        number: Number,
        postalCode: String,
        city: String,
        country: String
    },
    companies:  {
        name: String,
        "?website": String
    }
};

const persons = [
    {
        name: "James",
        age: 25,
        siblings: ["Johnnathan"],
        metaData: {},
        active: true,
        address: {
            street: "Streetname",
            number: 1,
            postalCode: "1234AB",
            city: "City",
            country: "Somewehere"
        },
        companies: [
            { name: "Example company 1", website: "https://trojs.org" }
            { name: "Example company 2" }
        ]
    }
];

validator.validateAll(persons);
```

## Invalid fields

If there are invalid fields, you can field the fields with `.errors`.
It returns an array with the field name and the expected type.

```javascript
validator.errors

[
    ['name', String],
    ['age', Number],
    ['siblings', Array],
    ['?metaData', Object],
    ['active', Boolean],
    ['address', addressSchema],
    ['companies', companySchema],
]
```

Available types:
* string
* array
* object
* number
* boolean
* url
* date
* function
* async

You can check for multiple types.
e.g. `function|async` so it can receive a normal function and also a sync function

[npm-url]: https://www.npmjs.com/package/@trojs/validator
[npm-image]: https://img.shields.io/npm/v/@trojs/validator.svg
