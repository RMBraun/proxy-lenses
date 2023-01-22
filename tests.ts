import { runTests, printStats, expect } from './utils/test-utils'

import L from './index'

const GEN = {
  obj: {},
  arr: [],
}

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
    L('test')._raw((x) => expect(x).toEqual('test'))
    L(5)._raw((x) => expect(x).toEqual(5))
    L({})._raw((x) => expect(x).toSoftEqual({}))
    L([])._raw((x) => expect(x).toSoftEqual([]))
  },
])

printStats()
