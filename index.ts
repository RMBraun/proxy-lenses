type Nullish = null | undefined

type IsNullish<V> = V extends Nullish ? V : {}

type GetProto<T> = T extends Boolean | boolean
  ? Boolean
  : T extends String | string
  ? String
  : T extends Number | number
  ? Number
  : T extends Symbol
  ? Symbol
  : T

type ProtoWrapper<T, isMaybe extends Nullish | {}> = T extends Nullish
  ? {}
  : T extends Array<any> | any[] | []
  ? {
      [P in keyof Array<T extends (infer ElementType)[] ? ElementType : never>]-?: T[P] extends (...a: infer A) => any
        ? (...a: A) => Lense<NonNullable<ReturnType<T[P]>>, isMaybe>
        : Lense<NonNullable<T[P]>, undefined>
    }
  : {
      [P in keyof GetProto<T>]-?: GetProto<T>[P] extends (...a: infer A) => any
        ? (...a: A) => Lense<NonNullable<ReturnType<GetProto<T>[P]>>, isMaybe>
        : Lense<
            GetProto<T>[P] extends Nullish ? GetProto<T>[P] : NonNullable<GetProto<T>[P]>,
            isMaybe extends Nullish ? isMaybe : IsNullish<GetProto<T>[P]>
          >
    }

type Lense<T, isMaybe extends Nullish | {}> = ProtoWrapper<T, isMaybe> & {
  /**
   * Allows access to the raw value at the current step in the chained calls.
   * This is a non-protected call and will always be called.
   * The raw value may be null or undefined.
   */
  _raw: <V>(callback: (value: T | Nullish) => V) => Lense<V, IsNullish<V>>
  /**
   * Allows access to the value at the current step in the chained call.
   * This is a protected call and will only be called if the previous value is not null and not undefined.
   */
  _: <V>(callback: (value: NonNullable<T>) => V) => Lense<V, IsNullish<V>>
  /**
   * Allows access to the value at the current step in the chained call.
   * This is a protected call and will only be called if the previous value is not null and not undefined.
   * The value will be pre-wrapped in a Lense.
   */
  _L: <V>(callback: (value: Lense<NonNullable<T>, {}>) => V) => Lense<V, IsNullish<V>>
  /**
   * Replaces the current value with the provided default value if it is null or undefined.
   */
  _defaults: <V = T>(defaultValue: V) => Lense<NonNullable<V>, {}>
  /**
   * Returns the raw value and ends the chain. Replaces the raw value with the provided default value if it is null or undefined.
   */
  _res: <V = undefined>(
    defaultValue?: V
  ) => isMaybe extends Nullish
    ? V extends Nullish
      ? T | (V extends null ? null : isMaybe)
      : NonNullable<T> | NonNullable<V>
    : NonNullable<T>
}

const L = <T>(input?: T | null, prevRef?: unknown): Lense<T, IsNullish<T>> => {
  const wrapper = function Monad() {}

  wrapper._raw = ((callback) => L(callback(input))) as Lense<T, IsNullish<T>>['_raw']

  wrapper._ = ((callback) => L(input === null ? null : input === undefined ? undefined : callback(input))) as Lense<
    T,
    IsNullish<T>
  >['_']

  wrapper._L = ((callback) => L(input === null ? null : input === undefined ? undefined : callback(L(input)))) as Lense<
    T,
    IsNullish<T>
  >['_L']

  wrapper._res = ((value) => (input != null ? input : value !== undefined ? value : input)) as Lense<
    T,
    IsNullish<T>
  >['_res']

  wrapper._defaults = ((value) => L(input ?? value)) as Lense<T, IsNullish<T>>['_defaults']

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
  }) as unknown as Lense<T, IsNullish<T>>
}

/**
 * Wraps the input in a Lense and provides protection against null-pointers.
 * Allows for the chaining and piping of multiple functions.
 */
const LWrapper = <T>(input: T): Lense<T, IsNullish<T>> => L(input)

export default LWrapper
