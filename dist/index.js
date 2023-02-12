"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var L = function (input, prevRef) {
    var wrapper = function Monad() { };
    wrapper._raw = (function (callback) {
        return L(callback(input));
    });
    wrapper._ = (function (callback) { return L(input == null ? input : callback(input)); });
    wrapper._L = (function (callback) { return L(input == null ? input : callback(L(input))); });
    wrapper._res = (function (value) { return (input != null ? input : value !== undefined ? value : input); });
    wrapper._defaults = (function (value) { return L(input !== null && input !== void 0 ? input : value); });
    return new Proxy(wrapper, {
        apply: function (target, thisArg, argumentList) {
            return input == null ? L(prevRef) : L(Reflect.apply(input, prevRef !== null && prevRef !== void 0 ? prevRef : thisArg, argumentList));
        },
        get: function (target, key) {
            if (key === '_res' || key === '_defaults' || key === '_raw' || key === '_' || key === '_L') {
                return wrapper[key];
            }
            var returnTarget = input == null ? input : input[key];
            if (typeof returnTarget === 'function') {
                return L(function FuncMonad() {
                    return Reflect.apply(returnTarget, input, arguments);
                });
            }
            else {
                return L(returnTarget, input);
            }
        },
    });
};
/**
 * Wraps the input in a Lense and provides protection against null-pointers.
 * Allows for the chaining and piping of multiple functions.
 */
var LWrapper = function (input) { return L(input); };
exports.default = LWrapper;
//# sourceMappingURL=index.js.map