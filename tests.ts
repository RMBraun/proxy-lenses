import { runTests, printStats, expect } from './utils/test-utils'

import L from './index'

runTests('Wrapping and unwrapping', [
  function Null() {
    expect(L(null)._res()).toEqual(null)
  },
  function Undefined() {
    expect(L(undefined)._res()).toEqual(undefined)
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
    const inputs = [[], ['a'], [1], [[]], [{}]]
    inputs.forEach((input) => expect(L(input)._res()).toEqual(input))
  },
  function Object() {
    const inputs = [{}, { a: 'b' }, { a: { b: 'c' } }]
    inputs.forEach((input) => expect(L(input)._res()).toEqual(input))

    expect(L({})._res()).toSoftEqual({})
    expect(L(['a'])._res()).toSoftEqual(['a'])
    expect(L([1])._res()).toSoftEqual([1])
  },
])

printStats()
