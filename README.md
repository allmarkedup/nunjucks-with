# Nunjucks 'with'

A scoped context block extension for Nunjucks.

## Installation

```
npm i @allmarkedup/nunjucks-with
```

## Usage

`nunjucks-with` works similarly to the `with` statement in JavaScript:

```js
const nunjucks = require('nunjucks');
const WithExtension = require('@allmarkedup/nunjucks-with');

nunjucks.addExtension('WithExtension', new WithExtension());

const tpl = `
{{ level }}
{% with nested %}{{ level }}{% endwith %} <!-- contents of block scoped to 'nested' object -->
`;

const output = nujucks.renderString(tpl, {
  level: 'one',
  nested: {
    level: 'two'
  }
});

// outputs:
// one
// two

```

## Credits:

`nunjucks-with` is based on code by @vinnyrose in a comment on the Nujucks issue tracker: https://github.com/mozilla/nunjucks/issues/722#issuecomment-281722126



