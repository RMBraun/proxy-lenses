import { runTests, printStats, expect } from './utils/test-utils'

import L from './index'

const GEN = {
  obj: {},
  arr: [],
}

type TestObject = {
  maybeMissing?: {
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
    expect(L(0)._res()).toEqual(0)
    expect(L(10)._res()).toEqual(10)
  },
  function Array() {
    ;[[], ['a'], [1], [[]], [{}]].forEach((input) => expect(L(input)._res()).toEqual(input))
  },
  function Object() {
    ;[{}, { a: 'b' }, { a: { b: 'c' } }].forEach((input) => expect(L(input)._res()).toEqual(input))
  },
])

runTests('_res', [
  function Null() {
    expect(L(null)._res(null)).toEqual(null)
    expect(L(null)._res(1)).toEqual(1)
    expect(L(null)._res('1')).toEqual('1')
    expect(L(null)._res({})).toSoftEqual({})
    expect(L(null)._res([])).toSoftEqual([])

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
  },
  function Undefined() {
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
])

printStats()
