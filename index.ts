const L = <T>(input: T, prevRef?: unknown): Lense<T> => {
  const wrapper = function Monad() {}
  wrapper._raw = ((callback) => L(callback(input))) as Lense<T>['_raw']
  wrapper._ = ((callback) => L(input == null ? input : callback(input))) as Lense<T>['_']
  wrapper._L = ((callback) => L(input == null ? input : callback(L(input)))) as Lense<T>['_L']
  wrapper._res = ((value) => input ?? value) as Lense<T>['_res']
  wrapper._defaults = ((value) => L(input ?? value)) as Lense<T>['_defaults']

  return new Proxy(wrapper, {
    apply(target, thisArg, argumentList) {
      return input == null ? L(prevRef) : L(Reflect.apply(input as any, prevRef ?? thisArg, argumentList))
    },
    get(target, key) {
      if (key === '_res' || key === '_defaults' || key === '_raw' || key === '_' || key === '_L') {
        return wrapper[key]
      }

      const returnTarget = input?.[key as keyof T]

      if (typeof returnTarget === 'function') {
        return L(function FuncMonad() {
          return Reflect.apply(returnTarget, input, arguments)
        })
      } else {
        return L(returnTarget, input)
      }
    },
  }) as unknown as Lense<T>
}

/**
 * Wraps the input in a Lense and provides protection against null-pointers.
 * Allows for the chaining and piping of multiple functions.
 */
const LWrapper = <T>(input: T): Lense<T> => L(input)

export default LWrapper
