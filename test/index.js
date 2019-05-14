const {Promise: SaferPromise, reject, resolve} = require('../cjs');

console.assert(Object.isFrozen(SaferPromise), 'SaferPromise is frozen');
console.assert(Object.isFrozen(SaferPromise.prototype), 'SaferPromise.prototype is frozen');

// nasty pollution + freeze
let busted = 0;
const {then} = Promise.prototype;
Object.defineProperties(Promise.prototype, {
  then: {
    value(fn) {
      return typeof fn === 'function' ?
        then.call(this, result => {
          busted++;
          return fn(result);
        }) :
        then.call(this, fn, result => {
          busted++;
          return result;
        });
    }
  }
});
Object.freeze(Promise);
Object.freeze(Promise.prototype);

const solved = resolve('OK');
console.assert(Object.isFrozen(solved), 'resolved are frozen');
solved.then(Object).then(Object).then(Object).then(() => {
  console.assert(!busted, 'never busted on resolved');
});

const failed = reject('NO').catch(() => {
  console.assert(!busted, 'never busted on rejection');
});
console.assert(Object.isFrozen(failed), 'rejected are frozen');

resolve(new Promise($ => $('Yeah!'))).then(value => {
  console.assert(!busted, 'never busted on resolved Promise');
  return value;
}).then(console.log);
