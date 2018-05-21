# Happiness - ESLint Shareable Config
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/wesleytodd/eslint-config-happiness/master.svg
[travis-url]: https://travis-ci.org/wesleytodd/eslint-config-happiness
[npm-image]: https://img.shields.io/npm/v/eslint-config-happiness.svg
[npm-url]: https://npmjs.org/package/eslint-config-happiness
[downloads-image]: https://img.shields.io/npm/dm/eslint-config-happiness.svg
[downloads-url]: https://npmjs.org/package/eslint-config-happiness

#### An ESLint [Shareable Config](http://eslint.org/docs/developer-guide/shareable-configs) for [JavaScript Happiness Style](https://github.com/JedWatson/happiness)

[![js-happiness-style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

## Install

This module is for advanced users. You probably want to use [`standard`](http://standardjs.com) instead :)

```bash
npm install eslint-config-happiness
```

## Usage

Shareable configs are designed to work with the `extends` feature of `.eslintrc` files.
You can learn more about
[Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs) on the
official ESLint website.

To use the JavaScript Happiness Style shareable config, first run this:

```bash
npm install --save-dev eslint-config-happiness eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

Then, add this to your .eslintrc file:

```
{
  "extends": "happiness"
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

MIT. Copyright (c) [Wes todd](http://wesleytodd.com).
