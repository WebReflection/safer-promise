var SaferPromise = (function (exports) {
  'use strict';

  var call = Function.call;
  var bind = call.bind(call.bind);
  var apply = bind(call, call.apply);
  call = bind(call, call);

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
  const convert = value => setPrototypeOf(value, prototype);

  freeze(SaferPromise);
  freeze(prototype);

  
  
  
  

  return SaferPromise;

}({}));
