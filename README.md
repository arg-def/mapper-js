# @args-def/mapper-js

> Fast, reliable and intuitive object mapping.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![GitHub stars][stars-image]][stars-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![GitHub issues][issues-image]][issues-url]
[![Awesome][awesome-image]][awesome-url]


![](mapper-js.png)

## Installation

```sh
npm install @arg-def/mapper-js --save
#or
yarn add @arg-def/mapper-js
```

## How to use

### 1) Know the structure from your source data

Before we start, it is essential that we know your data structure
so we can map it accordingly.

For this demo case, let's assume that we have the following object:

```js
const source = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe'
    },
    age: 32,
    drinks: ['beer', 'whiskey'],
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States'
      },
      {
        street: '1600 Amphitheatre',
        city: 'Mountain View',
        state: 'CA',
        postalCode: 94043,
        country: 'United States',
      },
    ]
  }
}
```


### 2) Create your mapping using dot notation

At this step, we need to create our `mapping` against our data `source`.

We will be using `dot notation` to create our `final structure`.

> For more info about `dot notation` API, check out the [documentation](https://github.com/arg-def/dot-notation)

With `mapper`, it is possible to `get` _one_ or _several_ values from our `source`
and even `transform` it in the way we need.

For that, `map.get()` accepts `single dot notation` path or
`an array of dot notation paths`. E.g.: `map.get('person.name.firstName')`, `map.get([person.name.firstName, person.name.lastName]);`'

Those values can be _transformed_ by using the `.transform()` method, which expects a `function` as argument and provides
the selected values as array in the `parameter`. 

> For more information about the usage, check the [API Documentation](#api-documentation).


Now let's create our `mapping`!

```js
import mapper from '@arg-def/mapper-js'

...

const mapping = mapper.mapping((map) => ({
  'person.name': map
                .get('person.name')
                .transform(([{ firstName, lastName }]) => `${firstName} ${lastName}`)
                .value,
  'person.lastName': map.get('person.lastName').value,
  'person.isAllowedToDrive': map.get(['person.age', 'person.drinks'])
  				.transform(([age, drinks]) => age > 18 && drinks.includes('soft-drink'))
  				.value,
  address: map.get('person.address').value,
  defaultAddress: map.get('person.address[0]').value,
}));
```


### 3) Create your mapped object

```js
import mapper from '@arg-def/mapper-js'
...

const result = mapper(source, mapping);
/* outputs 
{
  person: {
    name: 'John Doe',
    isAllowedToDrive: false,
  },
  address: [
    {
      street: 'Infinite Loop',
      city: 'Cupertino',
      state: 'CA',
      postalCode: 95014,
      country: 'United States'
    },
    ...
  ],
  defaultAddress: {
    street: 'Infinite Loop',
    city: 'Cupertino',
    state: 'CA',
    postalCode: 95014,
    country: 'United States'
  }
}
*/

```

# API Documentation


## mapper

**Type:** `function()`
**Parameter:** `source, mapping`
**Signature:** `(callback: (map: IMap) => IMapping): Function => callback`

**Description:** 

  `mapper()` mappes your _source data_ against your _mapping_.

Example:
```js
mapper(source, mapping);

/* outputs 
{
  employee: {
    name: 'John',
    age: 32,
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States'
      },
      ...
    ],
  },
}
*/
```
___

## mapper.mapping

**Type**: `function()`
**Parameter**: `map`
**Signature:** `(callback: (map: IMap) => IMapping): Function => callback`

**Description:** 

  `mapper.mapping()` is the method responsible for mapping the _values_ from your _source data_ against your _object shape_.
  It accepts `dot notation` path as `key`.

Example:
```js
// raw definition
const mapping = mapper.mapping((map) => {
    ...
});

// with map() query
const mapping = mapper.mapping((map) => {
  'employee.name': map.get('person.name.firstName').value,
  'employee.age': map.get('person.name.age').value,
  'employee.address': map.get('person.address').value,
});


```
___


## map
**Type:** `object`

### Properties

#### `get`

**Type:** `function`
**Parameter:** `string|string[]` 
**Signature:** `<T>(key: string | string[]) => IMap;`

**Description:** 

  `.get` method retrieves values from your _source data_ using `dot notation` path, it accepts a string or array of string.

Example:
```js
map.get('person.name.firstName');
map.get(['person.name.firstName', 'person.name.lastName']);
```


#### `transform`

**Type:** `function`
**Parameter:** `any[]`
**Signature:** `<T, V>(callback: (values: T[]) => V) => IMap`

**Description:** 

  `.transform` method provides you the ability to _transform_ the retrieved values from `.get()` according to your needs, and for that, it expects a return value.

  `.transform` provides you as parameter, an `array` with the retrieved values in the **same order** as defined in the `get` method.

Example:
```js
// single value
map.get('person.name.firstName')
   .transform(([firstName]) => firstName.toLoweCase());

// multiple values
map.get(['person.name.firstName', 'person.name.lastName'])
   .transform(([firstName, lastName]) => `${firstName} ${lastName]`);
```


#### `value`

**Type:** `readonly`
**Returns:** `any | any[] | undefined | null`
**Description:** 

  `.value` returns the value of your `dot notation` query. If transformed, returns the transformed value.


Example:
```js
// single value
map.get('person.name.firstName')
   .transform(([firstName]) => firstName.toLoweCase())
   .value;

// multiple values
map.get(['person.name.firstName', 'person.name.lastName'])
   .transform(([firstName, lastName]) => `${firstName} ${lastName]`)
   .value;
```


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@arg-def/mapper-js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@arg-def/mapper-js
[npm-downloads]: https://img.shields.io/npm/dm/@arg-def/mapper-js.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[stars-image]: https://img.shields.io/github/stars/args-def/dot-notation.svg
[stars-url]: https://github.com/args-def/dot-notation/stargazers
[vulnerabilities-image]: https://snyk.io/test/github/args-def/dot-notation/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/args-def/dot-notation
[issues-image]: https://img.shields.io/github/issues/args-def/dot-notation.svg
[issues-url]: https://github.com/args-def/dot-notation/issues
[awesome-image]: https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg
[awesome-url]: https://github.com/themgoncalves/react-loadable-ssr-addon