import L from './index'

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
  isNull: null
  c?: number
  notNull: {
    notNull: {
      oops: number
    }
    maybeNull?: {
      oops: number
    }
    isNull: {
      oops: number
    } | null
  }
}

const inputtest: Input = {
  a: {
    b: [{ test: 'ooga booga tooka', oog: { f: { g: 4 } } }, { test: 'uh oh' }],
    d: {},
  },
  isNull: null,
  notNull: {
    notNull: {
      oops: 3,
    },
    maybeNull: {
      oops: 3,
    },
    isNull: null,
  },
}

const output1 = L(inputtest).a.b[0].test.toUpperCase().substring(0, 4)._res()

const output2 = L(inputtest).a.b[0].test.toUpperCase().concat('  a concat test')._defaults('some default value')._res()

const output3 = L([[1, 2, 3, 4]])[10]
  // ._defaults([])
  .concat(4)
  .find((x) => x > 2)
  .toFixed(4)
  .substring(0, 3)
  // .endsWith(".")
  // ._defaults('test default')
  ._res()

const output4 = L(inputtest)
  .a.b[10].test.toUpperCase()
  .concat('   a concat test')
  // ._defaults('default string')
  .toLowerCase()
  // ._defaults('some default value')
  ._res(4)

const output5 = L(inputtest).a.d.e._defaults(5).toFixed(0)._res()

const output6 = L(inputtest)
  .a.b._raw((x) => x?.[0]?.oog?.f?.g)
  ._res()

const output7 = L(inputtest)
  .c._L(() => {
    console.log('found x')
    return 'test'
  })
  // ._defaults('x not found')
  ._res('x not found')

console.log('output', output1 === 'OOGA', output1)
console.log('output', output2 === 'OOGA BOOGA TOOKA  a concat test', output2)
console.log('output', output3 === '4.0', output3)
console.log('output', output4 === 'default string', output4)
console.log('output', output5 === '5', output5)
console.log('output', output6 === 4, output6)
console.log('output', output7 === 'x not found', output7)

const asdf = inputtest.c
const maybeTest = L(inputtest).c._res()
const maybeTest2 = L(inputtest.c)._res()
const typeTest = L(inputtest).c._defaults(4)._res()
const typeTest2 = L(inputtest.c)._defaults(4)._res()

const nullTest = L(null)._res()
const undefinedTest = L(undefined)._res()

const oogaMaybe = L(inputtest).notNull.maybeNull.oops._res()
const ooga2Type = L(inputtest).notNull.notNull.oops._res()
const ooga3NullMaybe = L(inputtest).notNull.isNull.oops._res()
const ooga3NullMaybe2 = L(inputtest).notNull.isNull.oops._defaults(5)._res()

const moreTest = L(inputtest).a.b[4].test.endsWith('33')._res()
const moreTest1 = L(inputtest).a.b[4].test._defaults('test').endsWith('33')._res()

const nullTest2 = L(inputtest).isNull._res()
