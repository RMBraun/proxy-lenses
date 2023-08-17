const L = (input, prevRef) => {
    const wrapper = function Monad() { };
    wrapper._raw = ((callback) => L(callback(input)));
    wrapper._ = ((callback) => L(input == null ? input : callback(input)));
    wrapper._L = ((callback) => L(input == null ? input : callback(L(input))));
    wrapper._res = ((value) => (input != null ? input : value !== undefined ? value : input));
    wrapper._defaults = ((value) => L(input ?? value));
    return new Proxy(wrapper, {
        apply(target, thisArg, argumentList) {
            return input == null ? L(prevRef) : L(Reflect.apply(input, prevRef ?? thisArg, argumentList));
        },
        get(target, key) {
            if (key === '_res' || key === '_defaults' || key === '_raw' || key === '_' || key === '_L') {
                return wrapper[key];
            }
            const returnTarget = input == null ? input : input[key];
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
const LWrapper = (input) => L(input);
export default LWrapper;
//# sourceMappingURL=index.js.map