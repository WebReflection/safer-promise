'use strict';
const {call} = require('safer-function');
const saferClass = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('safer-class'));

const {freeze, setPrototypeOf} = Object;
const {reject: _reject, resolve: _resolve} = Promise;

class SaferPromise extends Promise {
  static reject(value) {
    return call(_reject, SaferPromise, convert(value));
  }
  static resolve(value) {
    return call(_resolve, SaferPromise, convert(value));
  }
  constructor(fn) {
    freeze(super(fn));
  }
}

const {prototype, reject, resolve} = SaferPromise;
const convert = value => (
  typeof value === 'object' &&
  value !== null &&
  'then' in value &&
  !(value instanceof SaferPromise) ?
    setPrototypeOf(value, prototype) :
    value
);

saferClass(SaferPromise);
freeze(SaferPromise);
freeze(prototype);

Object.defineProperty(exports, '__esModule', {value: true}).default = SaferPromise;
exports.Promise = SaferPromise;
exports.reject = reject;
exports.resolve = resolve;
