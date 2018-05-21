# Happiness JSX - ESLint Shareable Config
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/wesleytodd/eslint-config-happiness-jsx/master.svg
[travis-url]: https://travis-ci.org/wesleytodd/eslint-config-happiness-jsx
[npm-image]: https://img.shields.io/npm/v/eslint-config-happiness-jsx.svg
[npm-url]: https://npmjs.org/package/eslint-config-happiness-jsx
[downloads-image]: https://img.shields.io/npm/dm/eslint-config-happiness-jsx.svg
[downloads-url]: https://npmjs.org/package/eslint-config-happiness-jsx

#### An ESLint [Shareable Config](http://eslint.org/docs/developer-guide/shareable-configs) for JSX support in [JavaScript Happiness Style](https://github.com/JedWatson/happiness)

[![js-happiness-style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

## Install

This module is for advanced users. You probably want to use [`standard`](http://standardjs.com) instead :)

```bash
npm install eslint-config-happiness-jsx
```

## Usage

Shareable configs are designed to work with the `extends` feature of `.eslintrc` files.
You can learn more about
[Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs) on the
official ESLint website.

This Shareable Config adds extra JSX style rules to the baseline JavaScript Happiness Style
rules provided in
[`eslint-config-happiness`](https://www.npmjs.com/package/eslint-config-happiness).
It doesn't assume that you're using React, so other virtual DOM libraries like
`virtual-dom` and `deku` are supported.

Even though this config is JSX only (no React), it makes use of
[`eslint-plugin-react`](https://npmjs.com/package/eslint-plugin-react) for its generic
JSX rules.

(If you want React-specific rules too, consider using
[`eslint-config-happiness-react`](https://www.npmjs.com/package/eslint-config-happiness-react)
instead.)

Here's how to install everything you need:

```bash
npm install --save-dev eslint-config-happiness eslint-config-happiness-jsx eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react
```

Then, add this to your .eslintrc file:

```
{
  "extends": ["happiness", "happiness-jsx"]
}
```

*Note: We omitted the `eslint-config-` prefix since it is automatically assumed by ESLint.*

You can override settings from the shareable config by adding them directly into your
`.eslintrc` file.

### Looking for something easier than this?

The easiest way to use JavaScript Happiness Style to check your code is to use the
[`happiness`](https://github.com/JedWatson/happiness) package. This comes with a global
Node command line program (`happiness`) that you can run or add to your `npm test` script
to quickly check your style.

## Badge

Use this in one of your projects? Include one of these badges in your readme to
let people know that your code is using the happiness style.

[![js-happiness-style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

```markdown
[![js-happiness-style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)
```

[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

```markdown
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)
```

## Learn more

For the full listing of rules, editor plugins, FAQs, and more, visit the main
[JavaScript Happiness Style repo](https://github.com/JedWatson/happiness).

## License

MIT. Copyright (c) [Wes Todd](http://wesleytodd.com).
