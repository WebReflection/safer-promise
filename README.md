# safer-promise

<sup>**Social Media Photo by [freestocks.org](https://unsplash.com/@freestocks) on [Unsplash](https://unsplash.com/)**</sup>

[![Build Status](https://travis-ci.com/WebReflection/safer-promise.svg?branch=master)](https://travis-ci.com/WebReflection/safer-promise) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/safer-promise/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/safer-promise?branch=master) ![WebReflection status](https://offline.report/status/webreflection.svg)


A Promise that cannot be observed, with `resolve` and `reject` methods able to secure other promises too.

```js
// once imported
import SaferPromise, {resolve, reject} from 'safer-function';

// even nasty operations like this would not interfere
const {then} = Promise.prototype;
Object.defineProperties(Promise.prototype, {
  then: {
    value(fn) {
      return typeof fn === 'function' ?
        then.call(this, result => {
          console.log('BUSTED', result);
          return fn(result);
        }) :
        then.call(this, fn, result => {
          console.log('BUSTED', result);
          return result;
        });
    }
  }
});
Object.freeze(Promise);
Object.freeze(Promise.prototype);

// try it to believe it
resolve(123).then(console.log).then(console.log).catch(console.log);

// or even with native promises, i.e.
resolve(fetch('file')).then(...);

```

## Compatibility

The compatibility bar here is defined by a native `Symbol.species` entity, meaning that every ES2015 engine should work as expected.

This module is specially handy to secure advanced modern features so that old browsers will never be a target goal.
