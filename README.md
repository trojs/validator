# Object validator by hckr.news

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Validate the object values by a schema.
I hope you like it.

## Installation

`npm install @hckrnews/validator`
or
`yarn add @hckrnews/validator`

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
    drinks: "object"
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
    metaData: "?object",
    active: "boolean",
    address: {
        street: "string",
        number: "number",
        postalCode: "string",
        city: "string",
        country: "string"
    }
};
```

Available types:
* string
* array
* object,
* number
* boolean

[npm-url]: https://www.npmjs.com/package/@hckrnews/validator
[npm-image]: https://img.shields.io/npm/v/@hckrnews/validator.svg
[travis-url]: https://travis-ci.org/hckrnews/validator
[travis-image]: https://img.shields.io/travis/hckrnews/validator/master.svg
[coveralls-url]: https://coveralls.io/r/hckrnews/validator
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/validator/master.svg
