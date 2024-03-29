import { runTests, printStats, expect, shouldNeverRun } from './utils/test-utils'

import L from './index'

const GEN = {
  obj: {},
  arr: [],
}

const NON_NULLISH = [
  '',
  'test',
  0,
  -1,
  -0,
  +0,
  1,
  {},
  { a: 'a' },
  { a: { b: 'b' } },
  { 1: 'test' },
  { a: null },
  { a: undefined },
  [],
  [''],
  [undefined],
  [null],
  [1, 2, 3],
  [{}, {}],
]

//@TODO add boolean testing

type TestObject = {
  maybeMissing?: {
    maybe?: {
      valueString?: string
      valueNumber?: number
      valueObj?: {}
      valueArr?: Array<string>
      valueStringNull: string | null
      valueNumberNull: number | null
      valueObjNull: {} | null
      valueArrNull: Array<string> | null
    }
    notNull: {
      valueString: string
      valueNumber: number
      valueObj: {}
      valueArr: Array<string>
    }
    isUndefined: undefined
    isNull: null
  }
  maybeNotNull?: {
    maybe?: {
      valueString: string
      valueNumber: number
      valueObj: {}
      valueArr: Array<string>
    }
    notNull: {
      valueString: string
      valueNumber: number
      valueObj: {}
      valueArr: Array<string>
    }
    isNull: null
  }
  notNull: {
    valueString: string
    valueNumber: number
    valueObj: {}
    valueArr: Array<string>
    maybe?: {
      valueString: string
      valueNumber: number
      valueObj: {}
      valueArr: Array<string>
    }
    maybeNull: {
      valueStringNull: string | null
      valueNumberNull: number | null
      valueObjNull: {} | null
      valueArrNull: Array<string> | null
    }
    notNull: {
      valueString: string
      valueNumber: number
      valueObj: {}
      valueArr: Array<string>
    }
    isUndefined: undefined
    isNull: null
  }
  isNull: null
  isUndefined: undefined
}

const testObject: TestObject = {
  notNull: {
    valueString: 'testString',
    valueNumber: 1143,
    valueObj: {},
    valueArr: ['1', '2', '3'],
    maybeNull: {
      valueStringNull: null,
      valueNumberNull: null,
      valueObjNull: null,
      valueArrNull: null,
    },
    notNull: {
      valueString: 'testString',
      valueNumber: 1143,
      valueObj: {},
      valueArr: ['1', '2', '3'],
    },
    isUndefined: undefined,
    isNull: null,
  },
  maybeNotNull: {
    maybe: {
      valueString: 'testString',
      valueNumber: 1143,
      valueObj: {},
      valueArr: ['1', '2', '3'],
    },
    notNull: {
      valueString: 'testString',
      valueNumber: 1143,
      valueObj: {},
      valueArr: ['1', '2', '3'],
    },
    isNull: null,
  },
  isNull: null,
  isUndefined: undefined,
}

runTests('Wrapping and unwrapping', [
  function Null() {
    expect(L(null)._res()).toEqual(null)

    expect(L(null)._res(undefined)).toEqual(null)
    expect(L(null)._res(null)).toEqual(null)
    expect(L(null)._res('')).toEqual('')
    expect(L(null)._res(0)).toEqual(0)
    expect(L(null)._res(GEN.obj)).toEqual(GEN.obj)
    expect(L(null)._res(GEN.arr)).toEqual(GEN.arr)
  },
  function Undefined() {
    expect(L(undefined)._res()).toEqual(undefined)

    expect(L(undefined)._res(undefined)).toEqual(undefined)
    expect(L(undefined)._res(null)).toEqual(null)
    expect(L(undefined)._res('')).toEqual('')
    expect(L(undefined)._res(0)).toEqual(0)
    expect(L(undefined)._res(GEN.obj)).toEqual(GEN.obj)
    expect(L(undefined)._res(GEN.arr)).toEqual(GEN.arr)
  },
  function String() {
    expect(L('')._res()).toEqual('')
    expect(L('a')._res()).toEqual('a')
    expect(L('a long string with spaces')._res()).toEqual('a long string with spaces')
  },
  function Number() {
    expect(L(-1)._res()).toEqual(-1)
    expect(L(0)._res()).toEqual(0)
    expect(L(-0)._res()).toEqual(-0)
    expect(L(10)._res()).toEqual(10)
  },
  function Array() {
    expect(L([])._res()).toSoftEqual([])
    expect(L(['a'])._res()).toSoftEqual(['a'])
    expect(L([1])._res()).toSoftEqual([1])
    expect(L([[]])._res()).toSoftEqual([[]])
    expect(L([{}])._res()).toSoftEqual([{}])
  },
  function Object() {
    expect(L({})._res()).toSoftEqual({})
    expect(L({ a: 'b' })._res()).toSoftEqual({ a: 'b' })
    expect(L({ a: { b: 'c' } })._res()).toSoftEqual({ a: { b: 'c' } })
  },
])

runTests('_res', [
  function Null() {
    expect(L(null)._res(null)).toEqual(null)
    expect(L(null)._res(1)).toEqual(1)
    expect(L(null)._res('1')).toEqual('1')
    expect(L(null)._res({})).toSoftEqual({})
    expect(L(null)._res([])).toSoftEqual([])

    expect(L(testObject).isNull._res()).toEqual(null)
    expect(L(testObject).isNull._res(null)).toEqual(null)
    expect(L(testObject).isNull._res(1)).toEqual(1)
    expect(L(testObject).isNull._res('1')).toEqual('1')
    expect(L(testObject).isNull._res({})).toSoftEqual({})
    expect(L(testObject).isNull._res([])).toSoftEqual([])

    expect(L(testObject).notNull.isNull._res(null)).toEqual(null)
    expect(L(testObject).notNull.isNull._res(1)).toEqual(1)
    expect(L(testObject).notNull.isNull._res('1')).toEqual('1')
    expect(L(testObject).notNull.isNull._res({})).toSoftEqual({})
    expect(L(testObject).notNull.isNull._res([])).toSoftEqual([])

    expect(L(testObject).notNull.maybeNull.valueArrNull._res(null)).toEqual(null)
    expect(L(testObject).notNull.maybeNull.valueArrNull._res(1)).toEqual(1)
    expect(L(testObject).notNull.maybeNull.valueArrNull._res('1')).toEqual('1')
    expect(L(testObject).notNull.maybeNull.valueArrNull._res({})).toSoftEqual({})
    expect(L(testObject).notNull.maybeNull.valueArrNull._res([])).toSoftEqual([])

    expect(L(testObject).notNull.maybeNull.valueNumberNull._res(null)).toEqual(null)
    expect(L(testObject).notNull.maybeNull.valueNumberNull._res(1)).toEqual(1)
    expect(L(testObject).notNull.maybeNull.valueNumberNull._res('1')).toEqual('1')
    expect(L(testObject).notNull.maybeNull.valueNumberNull._res({})).toSoftEqual({})
    expect(L(testObject).notNull.maybeNull.valueNumberNull._res([])).toSoftEqual([])

    expect(L(testObject).notNull.maybeNull.valueObjNull._res(null)).toEqual(null)
    expect(L(testObject).notNull.maybeNull.valueObjNull._res(1)).toEqual(1)
    expect(L(testObject).notNull.maybeNull.valueObjNull._res('1')).toEqual('1')
    expect(L(testObject).notNull.maybeNull.valueObjNull._res({})).toSoftEqual({})
    expect(L(testObject).notNull.maybeNull.valueObjNull._res([])).toSoftEqual([])

    expect(L(testObject).notNull.maybeNull.valueStringNull._res(null)).toEqual(null)
    expect(L(testObject).notNull.maybeNull.valueStringNull._res(1)).toEqual(1)
    expect(L(testObject).notNull.maybeNull.valueStringNull._res('1')).toEqual('1')
    expect(L(testObject).notNull.maybeNull.valueStringNull._res({})).toSoftEqual({})
    expect(L(testObject).notNull.maybeNull.valueStringNull._res([])).toSoftEqual([])
  },
  function Undefined() {
    expect(L(undefined)._res()).toEqual(undefined)
    expect(L(undefined)._res(null)).toEqual(null)
    expect(L(undefined)._res(1)).toEqual(1)
    expect(L(undefined)._res('1')).toEqual('1')
    expect(L(undefined)._res({})).toSoftEqual({})
    expect(L(undefined)._res([])).toSoftEqual([])

    expect(L(testObject).isUndefined._res(null)).toEqual(null)
    expect(L(testObject).isUndefined._res(1)).toEqual(1)
    expect(L(testObject).isUndefined._res('1')).toEqual('1')
    expect(L(testObject).isUndefined._res({})).toSoftEqual({})
    expect(L(testObject).isUndefined._res([])).toSoftEqual([])

    expect(L(testObject).notNull.isUndefined._res(null)).toEqual(null)
    expect(L(testObject).notNull.isUndefined._res(1)).toEqual(1)
    expect(L(testObject).notNull.isUndefined._res('1')).toEqual('1')
    expect(L(testObject).notNull.isUndefined._res({})).toSoftEqual({})
    expect(L(testObject).notNull.isUndefined._res([])).toSoftEqual([])
  },
  function Missing() {
    expect(L(testObject).maybeMissing.maybe.valueArr._res(null)).toEqual(null)
    expect(L(testObject).maybeMissing.maybe.valueArr._res(1)).toEqual(1)
    expect(L(testObject).maybeMissing.maybe.valueArr._res('1')).toEqual('1')
    expect(L(testObject).maybeMissing.maybe.valueArr._res({})).toSoftEqual({})
    expect(L(testObject).maybeMissing.maybe.valueArr._res([])).toSoftEqual([])

    expect(L(testObject).maybeMissing.maybe.valueNumber._res(null)).toEqual(null)
    expect(L(testObject).maybeMissing.maybe.valueNumber._res(1)).toEqual(1)
    expect(L(testObject).maybeMissing.maybe.valueNumber._res('1')).toEqual('1')
    expect(L(testObject).maybeMissing.maybe.valueNumber._res({})).toSoftEqual({})
    expect(L(testObject).maybeMissing.maybe.valueNumber._res([])).toSoftEqual([])

    expect(L(testObject).maybeMissing.maybe.valueObj._res(null)).toEqual(null)
    expect(L(testObject).maybeMissing.maybe.valueObj._res(1)).toEqual(1)
    expect(L(testObject).maybeMissing.maybe.valueObj._res('1')).toEqual('1')
    expect(L(testObject).maybeMissing.maybe.valueObj._res({})).toSoftEqual({})
    expect(L(testObject).maybeMissing.maybe.valueObj._res([])).toSoftEqual([])

    expect(L(testObject).maybeMissing.maybe.valueString._res(null)).toEqual(null)
    expect(L(testObject).maybeMissing.maybe.valueString._res(1)).toEqual(1)
    expect(L(testObject).maybeMissing.maybe.valueString._res('1')).toEqual('1')
    expect(L(testObject).maybeMissing.maybe.valueString._res({})).toSoftEqual({})
    expect(L(testObject).maybeMissing.maybe.valueString._res([])).toSoftEqual([])
  },
  function NotMissing() {
    expect(L(testObject).notNull.notNull.valueArr._res()).toEqual(testObject.notNull.notNull.valueArr)
    expect(L(testObject).notNull.notNull.valueArr._res(null)).toEqual(testObject.notNull.notNull.valueArr)
    expect(L(testObject).notNull.notNull.valueArr._res(1)).toEqual(testObject.notNull.notNull.valueArr)
    expect(L(testObject).notNull.notNull.valueArr._res('1')).toEqual(testObject.notNull.notNull.valueArr)
    expect(L(testObject).notNull.notNull.valueArr._res({})).toEqual(testObject.notNull.notNull.valueArr)
    expect(L(testObject).notNull.notNull.valueArr._res([])).toEqual(testObject.notNull.notNull.valueArr)

    expect(L(testObject).notNull.notNull.valueNumber._res()).toEqual(testObject.notNull.notNull.valueNumber)
    expect(L(testObject).notNull.notNull.valueNumber._res(null)).toEqual(testObject.notNull.notNull.valueNumber)
    expect(L(testObject).notNull.notNull.valueNumber._res(1)).toEqual(testObject.notNull.notNull.valueNumber)
    expect(L(testObject).notNull.notNull.valueNumber._res('1')).toEqual(testObject.notNull.notNull.valueNumber)
    expect(L(testObject).notNull.notNull.valueNumber._res({})).toEqual(testObject.notNull.notNull.valueNumber)
    expect(L(testObject).notNull.notNull.valueNumber._res([])).toEqual(testObject.notNull.notNull.valueNumber)

    expect(L(testObject).notNull.notNull.valueObj._res()).toEqual(testObject.notNull.notNull.valueObj)
    expect(L(testObject).notNull.notNull.valueObj._res(null)).toEqual(testObject.notNull.notNull.valueObj)
    expect(L(testObject).notNull.notNull.valueObj._res(1)).toEqual(testObject.notNull.notNull.valueObj)
    expect(L(testObject).notNull.notNull.valueObj._res('1')).toEqual(testObject.notNull.notNull.valueObj)
    expect(L(testObject).notNull.notNull.valueObj._res({})).toEqual(testObject.notNull.notNull.valueObj)
    expect(L(testObject).notNull.notNull.valueObj._res([])).toEqual(testObject.notNull.notNull.valueObj)

    expect(L(testObject).notNull.notNull.valueString._res()).toEqual(testObject.notNull.notNull.valueString)
    expect(L(testObject).notNull.notNull.valueString._res(null)).toEqual(testObject.notNull.notNull.valueString)
    expect(L(testObject).notNull.notNull.valueString._res(1)).toEqual(testObject.notNull.notNull.valueString)
    expect(L(testObject).notNull.notNull.valueString._res('1')).toEqual(testObject.notNull.notNull.valueString)
    expect(L(testObject).notNull.notNull.valueString._res({})).toEqual(testObject.notNull.notNull.valueString)
    expect(L(testObject).notNull.notNull.valueString._res([])).toEqual(testObject.notNull.notNull.valueString)
  },
])

runTests('_defaults', [
  function Null() {
    expect(L(null)._defaults(0)._res()).toEqual(0)
    expect(L(null)._defaults('')._res()).toEqual('')
    expect(L(null)._defaults({})._res()).toSoftEqual({})
    expect(L(null)._defaults([])._res()).toSoftEqual([])
    expect(L(null)._defaults(false)._res()).toEqual(false)
    expect(L(null)._defaults(true)._res()).toEqual(true)

    expect(L(testObject.isNull)._defaults(0)._res()).toEqual(0)
    expect(L(testObject.isNull)._defaults('')._res()).toEqual('')
    expect(L(testObject.isNull)._defaults({})._res()).toSoftEqual({})
    expect(L(testObject.isNull)._defaults([])._res()).toSoftEqual([])
    expect(L(testObject.isNull)._defaults(false)._res()).toEqual(false)
    expect(L(testObject.isNull)._defaults(true)._res()).toEqual(true)

    expect(L(testObject).isNull._defaults(0)._res()).toEqual(0)
    expect(L(testObject).isNull._defaults('')._res()).toEqual('')
    expect(L(testObject).isNull._defaults({})._res()).toSoftEqual({})
    expect(L(testObject).isNull._defaults([])._res()).toSoftEqual([])
    expect(L(testObject).isNull._defaults(false)._res()).toEqual(false)
    expect(L(testObject).isNull._defaults(true)._res()).toEqual(true)
  },
  function Undefined() {
    expect(L(undefined)._defaults(0)._res()).toEqual(0)
    expect(L(undefined)._defaults('')._res()).toEqual('')
    expect(L(undefined)._defaults({})._res()).toSoftEqual({})
    expect(L(undefined)._defaults([])._res()).toSoftEqual([])
    expect(L(undefined)._defaults(false)._res()).toEqual(false)
    expect(L(undefined)._defaults(true)._res()).toEqual(true)

    expect(L(testObject.isUndefined)._defaults(0)._res()).toEqual(0)
    expect(L(testObject.isUndefined)._defaults('')._res()).toEqual('')
    expect(L(testObject.isUndefined)._defaults({})._res()).toSoftEqual({})
    expect(L(testObject.isUndefined)._defaults([])._res()).toSoftEqual([])
    expect(L(testObject.isUndefined)._defaults(false)._res()).toEqual(false)
    expect(L(testObject.isUndefined)._defaults(true)._res()).toEqual(true)

    expect(L(testObject).isUndefined._defaults(0)._res()).toEqual(0)
    expect(L(testObject).isUndefined._defaults('')._res()).toEqual('')
    expect(L(testObject).isUndefined._defaults({})._res()).toSoftEqual({})
    expect(L(testObject).isUndefined._defaults([])._res()).toSoftEqual([])
    expect(L(testObject).isUndefined._defaults(false)._res()).toEqual(false)
    expect(L(testObject).isUndefined._defaults(true)._res()).toEqual(true)

    expect(L(testObject.maybeMissing?.isUndefined)._defaults(0)._res()).toEqual(0)
    expect(L(testObject.maybeMissing?.isUndefined)._defaults('')._res()).toEqual('')
    expect(L(testObject.maybeMissing?.isUndefined)._defaults({})._res()).toSoftEqual({})
    expect(L(testObject.maybeMissing?.isUndefined)._defaults([])._res()).toSoftEqual([])
    expect(L(testObject.maybeMissing?.isUndefined)._defaults(false)._res()).toEqual(false)
    expect(L(testObject.maybeMissing?.isUndefined)._defaults(true)._res()).toEqual(true)

    expect(L(testObject).maybeMissing.isUndefined._defaults(0)._res()).toEqual(0)
    expect(L(testObject).maybeMissing.isUndefined._defaults('')._res()).toEqual('')
    expect(L(testObject).maybeMissing.isUndefined._defaults({})._res()).toSoftEqual({})
    expect(L(testObject).maybeMissing.isUndefined._defaults([])._res()).toSoftEqual([])
    expect(L(testObject).maybeMissing.isUndefined._defaults(false)._res()).toEqual(false)
    expect(L(testObject).maybeMissing.isUndefined._defaults(true)._res()).toEqual(true)
  },
  function NonNullish() {
    expect(L('')._defaults('test')._res()).toEqual('')
    expect(L(1)._defaults(10)._res()).toEqual(1)
    expect(L({})._defaults({ a: 'b' })._res()).toSoftEqual({})
    expect(
      L([] as Array<number>)
        ._defaults([1, 2, 3])
        ._res()
    ).toSoftEqual([])
  },
  function Missing() {
    expect(L(testObject).maybeMissing.maybe.valueString._defaults('')._res()).toEqual('')
    expect(L(testObject).maybeMissing.maybe.valueNumber._defaults(3)._res()).toEqual(3)
    expect(L(testObject).maybeMissing.maybe.valueObj._defaults({})._res()).toSoftEqual({})
    expect(L(testObject).maybeMissing.maybe.valueArr._defaults([])._res()).toSoftEqual([])

    expect(L(testObject).notNull.maybeNull.valueStringNull._defaults('a')._res()).toEqual('a')
    expect(L(testObject).notNull.maybeNull.valueNumberNull._defaults(3)._res()).toEqual(3)
    expect(L(testObject).notNull.maybeNull.valueObjNull._defaults({})._res()).toSoftEqual({})
    expect(L(testObject).notNull.maybeNull.valueArrNull._defaults(['a'])._res()).toSoftEqual(['a'])
  },
])

runTests('_raw', [
  function Null() {
    L(null)._raw((x) => expect(x).toEqual(null))
  },
  function Undefined() {
    L(undefined)._raw((x) => expect(x).toEqual(undefined))
  },
  function Missing() {
    L(testObject).maybeMissing.maybe.valueArr._raw((x) => expect(x).toEqual(testObject.maybeMissing?.maybe?.valueArr))
  },
  function NonNullish() {
    NON_NULLISH.forEach((value) => {
      L(value)._raw((x) => expect(x).toEqual(value))
    })
  },
])

runTests('_', [
  function Null() {
    L(null)._(shouldNeverRun())
  },
  function Undefined() {
    L(undefined)._(shouldNeverRun())
  },
  function Missing() {
    L(testObject).maybeMissing.maybe.valueArr._(shouldNeverRun())
  },
  function NonNullish() {
    NON_NULLISH.forEach((value) => {
      L(value)._((x) => expect(x).toEqual(value))
    })
  },
])

runTests('Protos', [
  function String() {
    const rawInput = 'test'
    const input = L(rawInput)
    const nullishInputs = [null, undefined]

    expect(input.charAt(0)._res()).toEqual(rawInput.charAt(0))
    expect(input.charAt(15)._res()).toEqual(rawInput.charAt(15))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .charAt(15)
          ._res()
      ).toEqual(input)
    })

    expect(input.charCodeAt(0)._res()).toEqual(rawInput.charCodeAt(0))
    expect(input.charCodeAt(15)._res()).toEqual(rawInput.charCodeAt(15))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .charCodeAt(15)
          ._res()
      ).toEqual(input)
    })

    expect(input.codePointAt(0)._res()).toEqual(rawInput.codePointAt(0))
    expect(input.codePointAt(15)._res()).toEqual(rawInput.codePointAt(15))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .codePointAt(15)
          ._res()
      ).toEqual(input)
    })

    expect(input.concat('a')._res()).toEqual(rawInput.concat('a'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .concat('a')
          ._res()
      ).toEqual(input)
    })

    expect(input.endsWith('t')._res()).toEqual(rawInput.endsWith('t'))
    expect(input.endsWith('k')._res()).toEqual(rawInput.endsWith('k'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .endsWith('k')
          ._res()
      ).toEqual(input)
    })

    expect(input.includes('est')._res()).toEqual(rawInput.includes('est'))
    expect(input.includes('oo')._res()).toEqual(rawInput.includes('oo'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .includes('est')
          ._res()
      ).toEqual(input)
    })

    expect(input.indexOf('tes')._res()).toEqual(rawInput.indexOf('tes'))
    expect(input.indexOf('oo')._res()).toEqual(rawInput.indexOf('oo'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .indexOf('tes')
          ._res()
      ).toEqual(input)
    })

    expect(input.lastIndexOf('est')._res()).toEqual(rawInput.lastIndexOf('est'))
    expect(input.lastIndexOf('oo')._res()).toEqual(rawInput.lastIndexOf('oo'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .lastIndexOf('est')
          ._res()
      ).toEqual(input)
    })

    expect(input.length._res()).toEqual(rawInput.length)
    nullishInputs.forEach((input) => {
      expect(L(input as unknown as string).length._res()).toEqual(input)
    })

    expect(input.localeCompare('boog')._res()).toEqual(rawInput.localeCompare('boog'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .localeCompare('boog')
          ._res()
      ).toEqual(input)
    })

    expect(input.match('tes')._res()).toSoftEqual(rawInput.match('tes'))
    expect(input.match(/te/)._res()).toSoftEqual(rawInput.match(/te/))
    expect(input.match(/kk/)._res()).toSoftEqual(rawInput.match(/kk/))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .match('est')
          ._res()
      ).toEqual(input)
      expect(
        L(input as unknown as string)
          .match(/te/)
          ._res()
      ).toEqual(input)
    })

    expect(input.matchAll(/te/g)._res()).toSoftEqual(rawInput.matchAll(/te/g))
    expect(input.matchAll(/kk/g)._res()).toSoftEqual(rawInput.matchAll(/kk/g))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .matchAll(/te/g)
          ._res()
      ).toEqual(input)
    })

    expect(input.normalize('NFC')._res()).toEqual(rawInput.normalize('NFC'))
    expect(input.normalize('NFD')._res()).toEqual(rawInput.normalize('NFD'))
    expect(input.normalize('NFKC')._res()).toEqual(rawInput.normalize('NFKC'))
    expect(input.normalize('NFKD')._res()).toEqual(rawInput.normalize('NFKD'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .normalize('NFC')
          ._res()
      ).toEqual(input)
    })

    expect(input.padEnd(4, '00')._res()).toEqual(rawInput.padEnd(4, '00'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .padEnd(4, '00')
          ._res()
      ).toEqual(input)
    })

    expect(input.padStart(4, '00')._res()).toEqual(rawInput.padStart(4, '00'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .padStart(4, '00')
          ._res()
      ).toEqual(input)
    })

    expect(input.repeat(4)._res()).toEqual(rawInput.repeat(4))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .repeat(4)
          ._res()
      ).toEqual(input)
    })

    expect(input.replace(/tes/, 'boop')._res()).toEqual(rawInput.replace(/tes/, 'boop'))
    expect(input.replace('tes', 'boop')._res()).toEqual(rawInput.replace('tes', 'boop'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .replace(/tes/, 'boop')
          ._res()
      ).toEqual(input)
      expect(
        L(input as unknown as string)
          .replace('tes', 'boop')
          ._res()
      ).toEqual(input)
    })

    expect(input.replaceAll(/tes/g, 'boop')._res()).toEqual(rawInput.replaceAll(/tes/g, 'boop'))
    expect(input.replaceAll('tes', 'boop')._res()).toEqual(rawInput.replaceAll('tes', 'boop'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .replaceAll(/tes/g, 'boop')
          ._res()
      ).toEqual(input)
      expect(
        L(input as unknown as string)
          .replaceAll('tes', 'boop')
          ._res()
      ).toEqual(input)
    })

    expect(input.slice(0, 3)._res()).toEqual(rawInput.slice(0, 3))
    expect(input.slice(-3, 3)._res()).toEqual(rawInput.slice(-3, 3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .slice(0, 3)
          ._res()
      ).toEqual(input)
    })

    expect(input.split('t')._res()).toSoftEqual(rawInput.split('t'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .split('t')
          ._res()
      ).toEqual(input)
    })

    expect(input.startsWith('t', 0)._res()).toEqual(rawInput.startsWith('t', 0))
    expect(input.startsWith('t', 1)._res()).toEqual(rawInput.startsWith('t', 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .startsWith('t', 0)
          ._res()
      ).toEqual(input)
    })

    expect(input.toLowerCase()._res()).toEqual(rawInput.toLowerCase())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .toLowerCase()
          ._res()
      ).toEqual(input)
    })

    expect(input.toLocaleUpperCase('en-US')._res()).toEqual(rawInput.toLocaleUpperCase('en-US'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .toLocaleUpperCase('en-US')
          ._res()
      ).toEqual(input)
    })

    expect(input.toLocaleLowerCase('en-US')._res()).toEqual(rawInput.toLocaleLowerCase('en-US'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .toLocaleLowerCase('en-US')
          ._res()
      ).toEqual(input)
    })

    expect(input.toUpperCase()._res()).toEqual(rawInput.toUpperCase())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .toUpperCase()
          ._res()
      ).toEqual(input)
    })

    expect(input.trim()._res()).toEqual(rawInput.trim())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .trim()
          ._res()
      ).toEqual(input)
    })

    expect(input.trimEnd()._res()).toEqual(rawInput.trimEnd())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .trimEnd()
          ._res()
      ).toEqual(input)
    })

    expect(input.trimStart()._res()).toEqual(rawInput.trimStart())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as string)
          .trimStart()
          ._res()
      ).toEqual(input)
    })
  },
  function Number() {
    const rawInput = 123
    const input = L(rawInput)
    const nullishInputs = [null, undefined]

    expect(input.toExponential()._res()).toEqual(rawInput.toExponential())
    expect(input.toExponential(4)._res()).toEqual(rawInput.toExponential(4))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .toExponential(4)
          ._res()
      ).toEqual(input)
    })

    expect(input.toFixed()._res()).toEqual(rawInput.toFixed())
    expect(input.toFixed(3)._res()).toEqual(rawInput.toFixed(3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .toFixed(4)
          ._res()
      ).toEqual(input)
    })

    expect(input.toLocaleString()._res()).toEqual(rawInput.toLocaleString())
    expect(input.toLocaleString('en-US')._res()).toEqual(rawInput.toLocaleString('en-US'))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .toLocaleString('en-US')
          ._res()
      ).toEqual(input)
    })

    expect(input.toPrecision()._res()).toEqual(rawInput.toPrecision())
    expect(input.toPrecision(3)._res()).toEqual(rawInput.toPrecision(3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .toPrecision(4)
          ._res()
      ).toEqual(input)
    })

    expect(input.toString()._res()).toEqual(rawInput.toString())
    expect(input.toString(2)._res()).toEqual(rawInput.toString(2))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .toString(4)
          ._res()
      ).toEqual(input)
    })

    expect(input.valueOf()._res()).toEqual(rawInput.valueOf())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as number)
          .valueOf()
          ._res()
      ).toEqual(input)
    })
  },
  function Array() {
    const rawInput = [1, 2, 3]
    const input = L(rawInput.slice(0))
    const nullishInputs = [null, undefined]

    expect(input.at(0)._res()).toEqual(rawInput.at(0))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .at(0)
          ._res()
      ).toEqual(input)
    })

    expect(input.concat(0)._res()).toSoftEqual(rawInput.concat(0))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .concat(0)
          ._res()
      ).toEqual(input)
    })

    expect(input.copyWithin(0, 1)._res()).toSoftEqual(rawInput.copyWithin(0, 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .copyWithin(0, 1)
          ._res()
      ).toEqual(input)
    })

    expect(input.entries()._res()).toSoftEqual(rawInput.entries())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .entries()
          ._res()
      ).toEqual(input)
    })

    expect(input.every((val) => val > 0)._res()).toEqual(rawInput.every((val) => val > 0))
    expect(input.every((val) => val > 5)._res()).toEqual(rawInput.every((val) => val > 5))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .every((val) => val > 0)
          ._res()
      ).toEqual(input)
    })

    expect(L([0, 1]).fill(99)._res()).toSoftEqual([0, 1].fill(99))
    expect(L([0, 1]).fill(99, 1)._res()).toSoftEqual([0, 1].fill(99, 1))
    expect(L([0, 1]).fill(99, 1, 2)._res()).toSoftEqual([0, 1].fill(99, 1, 2))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .fill(44)
          ._res()
      ).toEqual(input)
    })

    expect(input.filter((val) => val > 1)._res()).toSoftEqual(rawInput.filter((val) => val > 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .filter((val) => val > 1)
          ._res()
      ).toEqual(input)
    })

    expect(input.find((val) => val > 1)._res()).toEqual(rawInput.find((val) => val > 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .find((val) => val > 1)
          ._res()
      ).toEqual(input)
    })

    expect(input.findIndex((val) => val > 1)._res()).toEqual(rawInput.findIndex((val) => val > 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .findIndex((val) => val > 1)
          ._res()
      ).toEqual(input)
    })

    const unFlatRaw = [[1, [2, [3, [4], [5]], [6]], [7]], [8]]
    const unFlatInput = L(unFlatRaw)
    expect(unFlatInput.flat()._res()).toSoftEqual(unFlatRaw.flat())
    expect(unFlatInput.flat(0)._res()).toSoftEqual(unFlatRaw.flat(0))
    expect(unFlatInput.flat(1)._res()).toSoftEqual(unFlatRaw.flat(1))
    expect(unFlatInput.flat(2)._res()).toSoftEqual(unFlatRaw.flat(2))
    expect(unFlatInput.flat(3)._res()).toSoftEqual(unFlatRaw.flat(3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .flat()
          ._res()
      ).toEqual(input)
    })

    expect(input.flatMap((val) => val * 2)._res()).toSoftEqual(rawInput.flatMap((val) => val * 2))
    expect(input.flatMap((val) => val * 2, 0)._res()).toSoftEqual(rawInput.flatMap((val) => val * 2, 0))
    expect(input.flatMap((val) => val * 2, 1)._res()).toSoftEqual(rawInput.flatMap((val) => val * 2, 1))
    expect(input.flatMap((val) => val * 2, 2)._res()).toSoftEqual(rawInput.flatMap((val) => val * 2, 2))
    expect(input.flatMap((val) => val * 2, 3)._res()).toSoftEqual(rawInput.flatMap((val) => val * 2, 3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .flatMap((val) => val * 2)
          ._res()
      ).toEqual(input)
    })

    input.forEach((val, i) => expect(val).toEqual(rawInput[i]))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .forEach((val) => {
            throw new Error('should not run')
          })
          ._res()
      ).toEqual(input)
    })

    expect(input.includes(2)._res()).toEqual(rawInput.includes(2))
    expect(input.includes(20)._res()).toEqual(rawInput.includes(20))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .includes(2)
          ._res()
      ).toEqual(input)
    })

    expect(input.indexOf(2)._res()).toEqual(rawInput.indexOf(2))
    expect(input.indexOf(20)._res()).toEqual(rawInput.indexOf(20))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .indexOf(2)
          ._res()
      ).toEqual(input)
    })

    expect(input.join(',')._res()).toEqual(rawInput.join(','))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .join(',')
          ._res()
      ).toEqual(input)
    })

    expect(input.keys()._res()).toSoftEqual(rawInput.keys())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .keys()
          ._res()
      ).toEqual(input)
    })

    expect(input.lastIndexOf(2)._res()).toEqual(rawInput.lastIndexOf(2))
    expect(input.lastIndexOf(20)._res()).toEqual(rawInput.lastIndexOf(20))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .lastIndexOf(2)
          ._res()
      ).toEqual(input)
    })

    expect(input.length._res()).toEqual(rawInput.length)
    nullishInputs.forEach((input) => {
      expect(L(input as unknown as typeof rawInput).length._res()).toEqual(input)
    })

    expect(input.map((val) => val * 2)._res()).toSoftEqual(rawInput.map((val) => val * 2))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .map((val) => val * 2)
          ._res()
      ).toEqual(input)
    })

    expect(L([0, 1]).pop()._res()).toSoftEqual([0, 1].pop())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .pop()
          ._res()
      ).toEqual(input)
    })

    expect(input.push()._res()).toSoftEqual(rawInput.push())
    expect(input.push(3)._res()).toSoftEqual(rawInput.push(3))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .push(3)
          ._res()
      ).toEqual(input)
    })

    expect(input.reduce((acc, curr) => acc + curr, 0)._res()).toSoftEqual(rawInput.reduce((acc, curr) => acc + curr, 0))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .reduce((acc, curr) => acc + curr, 0)
          ._res()
      ).toEqual(input)
    })

    expect(input.reduceRight((acc, curr) => acc + curr, 0)._res()).toSoftEqual(
      rawInput.reduceRight((acc, curr) => acc + curr, 0)
    )
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .reduceRight((acc, curr) => acc + curr, 0)
          ._res()
      ).toEqual(input)
    })

    expect(input.reverse()._res()).toSoftEqual(rawInput.reverse())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .reverse()
          ._res()
      ).toEqual(input)
    })

    expect(L([0, 1]).shift()._res()).toEqual([0, 1].shift())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .shift()
          ._res()
      ).toEqual(input)
    })

    expect(input.slice()._res()).toSoftEqual(rawInput.slice())
    expect(input.slice(1)._res()).toSoftEqual(rawInput.slice(1))
    expect(input.slice(1, 2)._res()).toSoftEqual(rawInput.slice(1, 2))
    expect(input.slice(-1, 2)._res()).toSoftEqual(rawInput.slice(-1, 2))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .slice()
          ._res()
      ).toEqual(input)
    })

    expect(input.some((val) => val > 1)._res()).toSoftEqual(rawInput.some((val) => val > 1))
    expect(input.some((val) => val > 10)._res()).toSoftEqual(rawInput.some((val) => val > 10))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .some((val) => val > 1)
          ._res()
      ).toEqual(input)
    })

    expect(input.sort((a, b) => a - b)._res()).toSoftEqual(rawInput.sort((a, b) => a - b))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .sort((a, b) => a - b)
          ._res()
      ).toEqual(input)
    })

    expect(input.splice(0, 1)._res()).toSoftEqual(rawInput.splice(0, 1))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .splice(0, 1)
          ._res()
      ).toEqual(input)
    })

    expect(input.toLocaleString()._res()).toEqual(rawInput.toLocaleString())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .toLocaleString()
          ._res()
      ).toEqual(input)
    })

    expect(input.toString()._res()).toEqual(rawInput.toString())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .toString()
          ._res()
      ).toEqual(input)
    })

    expect(L([0, 1]).unshift()._res()).toSoftEqual([0, 1].unshift())
    expect(L([0, 1]).unshift(4)._res()).toSoftEqual([0, 1].unshift(4))
    expect(L([0, 1]).unshift(1, 2)._res()).toSoftEqual([0, 1].unshift(1, 2))
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .unshift(1, 2)
          ._res()
      ).toEqual(input)
    })

    expect(input.values()._res()).toSoftEqual(rawInput.values())
    nullishInputs.forEach((input) => {
      expect(
        L(input as unknown as typeof rawInput)
          .values()
          ._res()
      ).toEqual(input)
    })
  },
])

runTests('misc', [
  function random() {
    expect(
      L([1, 2, 3, 4])
        .map((val) => val * 2)
        .filter((val) => val < 8)
        .slice(0, 2)
        .map((val) => `0-${val}`)
        .sort((a, b) => a.localeCompare(b))
        .join(', ')
        ._res()
    ).toEqual('0-2, 0-4')
  },
])

printStats()
