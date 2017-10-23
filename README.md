# Nunjucks 'with'

A scoped context block extension for Nunjucks.

## Installation

```
npm i @allmarkedup/nunjucks-with
```

## Usage

`nunjucks-with` works similarly to the `with` statement in JavaScript

```js
const nunjucks = require('nunjucks');
const WithExtension = require('@allmarkedup/nunjucks-with');
const env = new nunjucks.Environment(/* loaders etc... */);

env.addExtension('WithExtension', new WithExtension());

const tpl = `
{{ level }}
{% with nested %}
{{ level }}
{% endwith %}
`;

const output = env.renderString(tpl, {
  level: 'one',
  nested: {
    level: 'two'
  }
});

console.log(output);
/* 
one
two
*/

```

You can also pass in objects defined on the fly:

```nunjucks
{% set myScope = 'global' %}
{{ scope }} <!-- outputs 'global' -->

{% with {myScope: 'block'} %}
{{ myScope }} <!-- outputs 'block' -->
{% endwith %}
```

Nunjucks doesn't let you pass in scope when `include`-ing templates, so `nunjucks-with` is pretty handy for isolating scope for your includes to avoid variable name clashes:

```nunjucks
<!-- views/main.tpl -->
<p>{{ text }}<p>
{% with button %}{% include 'button.tpl' %}{% endwith %}

<!-- views/button.tpl -->
<button>{{ text }}</button>
```

```js
const output = env.render('main.tpl', {
  text: 'you should to this',
  button: {
    text: 'click here'
  }
});

/*
<p>you should to this</p>
<button>click here</button>
 */
```

## Credits:

`nunjucks-with` is based on code by @vinnyrose in a comment on the Nujucks issue tracker: https://github.com/mozilla/nunjucks/issues/722#issuecomment-281722126



