type CustomString<isMaybe extends IsMaybe> = {
    /**
     * Matches a string with a regular expression, and returns an array containing the results of that search.
     * @param regexp A variable name or string literal containing the regular expression pattern and flags.
     */
    match(regexp: string | RegExp): Lense<RegExpMatchArray | null, null>;
    /**
     * Matches a string or an object that supports being matched against, and returns an array
     * containing the results of that search, or null if no matches are found.
     * @param matcher An object that supports being matched against.
     */
    match(matcher: {
        [Symbol.match](string: string): RegExpMatchArray | null;
    }): Lense<RegExpMatchArray | null, null>;
    /**
     * Replaces text in a string, using a regular expression or search string.
     * @param searchValue A string or regular expression to search for.
     * @param replaceValue A string containing the text to replace. When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of {@linkcode searchValue} is replaced.
     */
    replace(searchValue: string | RegExp, replaceValue: string): Lense<string, isMaybe>;
    /**
     * Replaces text in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replacer A function that returns the replacement text.
     */
    replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): Lense<string, isMaybe>;
    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): Lense<string, isMaybe>;
    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): Lense<string, isMaybe>;
    /**
     * Split a string into substrings using the specified separator and return them as an array.
     * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    split(separator: string | RegExp, limit?: number): Lense<string[], isMaybe>;
    /**
     * Split a string into substrings using the specified separator and return them as an array.
     * @param splitter An object that can split a string.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    split(splitter: {
        [Symbol.split](string: string, limit?: number): string[];
    }, limit?: number): Lense<string[], isMaybe>;
};
type CustomArray<T, isMaybe extends IsMaybe> = {
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): Lense<U, isMaybe>;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): Lense<T, isMaybe>;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): Lense<T, isMaybe>;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): Lense<T, isMaybe>;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): Lense<T, isMaybe>;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): Lense<U, isMaybe>;
};
type IsMaybe = Nullish | {};
type Nullish = null | undefined;
type IsNullish<V> = V extends Nullish ? V : {};
type GetProto<T> = T extends Array<infer A> | (infer A)[] | [] ? Omit<Array<A>, 'reduce' | 'reduceRight'> : T extends Boolean | boolean ? Boolean : T extends String | string ? Omit<String, 'replace' | 'replaceAll' | 'match'> : T extends Number | number ? Number : T extends Symbol ? Symbol : T extends RegExp ? RegExp : T;
type GetProtoOverloads<T, isMaybe extends IsMaybe> = T extends Array<infer A> | (infer A)[] | [] ? CustomArray<A, isMaybe> : T extends String ? CustomString<isMaybe> : {};
type GetWrappedProto<T, isMaybe extends IsMaybe> = T extends Nullish ? {} : {
    [P in keyof GetProto<T>]-?: GetProto<T>[P] extends null ? Lense<null, null> : GetProto<T>[P] extends (...a: infer A) => infer R ? (...a: A) => Lense<NonNullable<R>, isMaybe & IsNullish<R>> : Lense<GetProto<T>[P] extends Nullish ? GetProto<T>[P] : NonNullable<GetProto<T>[P]>, isMaybe extends Nullish ? isMaybe : IsNullish<GetProto<T>[P]>>;
};
type Lense<T, isMaybe extends IsMaybe> = GetWrappedProto<T, isMaybe> & GetProtoOverloads<T, isMaybe> & {
    /**
     * Allows access to the raw value at the current step in the chained calls.
     * This is a non-protected call and will always be called.
     * The raw value may be null or undefined.
     */
    _raw: <V>(callback: (value: isMaybe extends Nullish ? T | isMaybe : NonNullable<T>) => V) => Lense<V, IsNullish<V>>;
    /**
     * Allows access to the value at the current step in the chained call.
     * This is a protected call and will only be called if the previous value is not null and not undefined.
     */
    _: <V>(callback: (value: NonNullable<T>) => V) => Lense<V, IsNullish<V>>;
    /**
     * Allows access to the value at the current step in the chained call.
     * This is a protected call and will only be called if the previous value is not null and not undefined.
     * The value will be pre-wrapped in a Lense.
     */
    _L: <V>(callback: (value: Lense<T, IsNullish<T>>) => V) => Lense<V, IsNullish<V>>;
    /**
     * Replaces the current value with the provided default value if it is null or undefined.
     */
    _defaults: <V>(defaultValue: isMaybe extends Nullish ? V : T) => Lense<isMaybe extends Nullish ? V : T, {}>;
    /**
     * Returns the raw value and ends the chain. Replaces the raw value with the provided default value if it is null or undefined.
     */
    _res: <V = undefined>(defaultValue?: V) => isMaybe extends Nullish ? V extends Nullish ? T | (V extends null ? null : isMaybe) : NonNullable<T> | NonNullable<V> : NonNullable<T>;
};
/**
 * Wraps the input in a Lense and provides protection against null-pointers.
 * Allows for the chaining and piping of multiple functions.
 */
declare const LWrapper: <T>(input: T) => Lense<T, IsNullish<T>>;
export default LWrapper;
