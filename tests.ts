import { runTests, printStats, expect } from './utils/test-utils'

import L from './index'

const GEN = {
  obj: {},
  arr: [],
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

printStats()
