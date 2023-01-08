import L from './lenses'

type Input = {
  a?: {
    b?: Array<{
      test: string
      oog?: {
        f?: {
          g?: number
        }
      }
    }>
    d?: {
      e?: number
    }
  }
  c?: number
}

const inputtest: Input = {
  a: {
    b: [{ test: 'ooga booga tooka', oog: { f: { g: 4 } } }, { test: 'uh oh' }],
    d: {},
  },
}

const output1 = L(inputtest).a.b[0].test.toUpperCase().substring(0, 4)._res()

const output2 = L(inputtest).a.b[0].test.toUpperCase().concat('  a concat test')._res('some default value')

const output3 = L([[1, 2, 3, 4]])[10]
  ._defaults([])
  .concat(4)
  .find((x) => x > 2)
  .toFixed(4)
  .substring(0, 3)
  // .endsWith(".")
  ._res('test default')

const output4 = L(inputtest)
  .a.b[10].test.toUpperCase()
  // ._L((input) => input.a.b[10].test._res())
  .toUpperCase()
  .concat('   a concat test')
  ._defaults('default string')
  .toLowerCase()
  ._res('some default value')

const output5 = L(inputtest).a.d.e._defaults(5).toFixed(0)._res()

const output6 = L(inputtest)
  .a.b._raw((x) => x?.[0]?.oog?.f?.g)
  ._res()

const output7 = L(inputtest)
  .c._L(() => {
    console.log('found x')
    return 'test'
  })
  ._res('x not found')

console.log('output', output1 === 'OOGA', output1)
console.log('output', output2 === 'OOGA BOOGA TOOKA  a concat test', output2)
console.log('output', output3 === '4.0', output3)
console.log('output', output4 === 'default string', output4)
console.log('output', output5 === '5', output5)
console.log('output', output6 === 4, output6)
console.log('output', output7 === 'x not found', output7)
