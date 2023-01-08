type ReplaceValue<Value> = Value extends (...a: infer A) => any
  ? (...a: A) => Lense<{} & ReturnType<Value>>
  : Lense<Value>

type ProtoWrapper<T> = T extends Boolean | boolean
  ? {
      [P in keyof Boolean]-?: ReplaceValue<T[P]>
    }
  : T extends String | string
  ? {
      [P in keyof String]-?: ReplaceValue<T[P]>
    }
  : T extends Number | number
  ? {
      [P in keyof Number]-?: ReplaceValue<T[P]>
    }
  : T extends Symbol
  ? {
      [P in keyof Symbol]-?: ReplaceValue<T[P]>
    }
  : T extends Array<any> | any[] | []
  ? {
      [P in keyof Array<T extends (infer ElementType)[] ? ElementType : never>]-?: ReplaceValue<T[P]>
    }
  : {
      [P in keyof T]-?: ReplaceValue<T[P]>
    }

type Lense<T> = ProtoWrapper<T> & {
  /**
   * Allows access to the raw value at the current step in the chained calls.
   * This is a non-protected call and will always be called.
   * The raw value may be null or undefined.
   */
  _raw: <V>(callback: (value: T | null | undefined) => V) => Lense<V>
  /**
   * Allows access to the value at the current step in the chained call.
   * This is a protected call and will only be called if the previous value is not null and not undefined.
   */
  _: <V>(callback: (value: NonNullable<T>) => V) => Lense<V>
  /**
   * Allows access to the value at the current step in the chained call.
   * This is a protected call and will only be called if the previous value is not null and not undefined.
   * The value will be pre-wrapped in a Lense.
   */
  _L: <V>(callback: (value: Lense<NonNullable<T>>) => V) => Lense<V>
  /**
   * Replaces the current value with the provided default value if it is null or undefined.
   */
  _defaults: (defaultValue: NonNullable<T>) => Lense<T>
  /**
   * Returns the raw value and ends the chain. Replaces the raw value with the provided default value if it is null or undefined.
   */
  _res: <V = undefined>(defaultValue?: V) => NonNullable<T> | V
}
