import {apply, call} from 'safer-function';

const {freeze, setPrototypeOf} = Object;
const {prototype: _prototype, reject: _reject, resolve: _resolve} = Promise;
const {catch: _catch, then: _then} = _prototype;

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
  catch() {
    return apply(_catch, this, arguments);
  }
  then() {
    return apply(_then, this, arguments);
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

freeze(SaferPromise);
freeze(prototype);

export default SaferPromise;
export {
  SaferPromise as Promise,
  reject,
  resolve
};
