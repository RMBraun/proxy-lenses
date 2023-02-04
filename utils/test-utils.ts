const TEXT_BREAK = '-----------------'
const LONG_TEXT_BREAK = '---------------------------------------------------'

const RESULT_TEXT = {
  PASSED: 'PASSED',
  FAILED: 'FAILED',
}

const COLORS = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  CYAN: 'CYAN',
  RESET: 'RESET',
}

const COLOR_ANSI = {
  [COLORS.RED]: '\u001b[31;1m',
  [COLORS.GREEN]: '\u001b[32;1m',
  [COLORS.BLUE]: '\u001b[34;1m',
  [COLORS.YELLOW]: '\u001b[33;1m',
  [COLORS.CYAN]: '\u001b[36m',
  [COLORS.RESET]: '\u001b[0m',
}

const getType = (input: any): string =>
  input === null ? 'null' : input === undefined ? 'undefined' : input?.constructor?.name ?? typeof input

const color = (colorId: string, text: string) => {
  if (colorId && COLOR_ANSI[colorId]) {
    return `${COLOR_ANSI[colorId]}${text}${COLOR_ANSI.RESET}`
  } else {
    return text
  }
}

class Test {
  static instance: Test | null

  private totalTests: number

  private totalSuites: number
  private failedSuites: number
  private passedSuites: number

  constructor() {
    this.totalTests = 0
    this.totalSuites = 0
    this.failedSuites = 0
    this.passedSuites = 0
  }

  static getInstance() {
    if (Test.instance == null) {
      Test.instance = new Test()
    }

    return Test.instance
  }

  static incTotalTests() {
    Test.getInstance().totalTests = Test.getInstance().totalTests + 1
  }

  static runTests(title: string, tests: Array<Function> = []) {
    console.log(color(COLORS.YELLOW, `${LONG_TEXT_BREAK}\n${title}\n${LONG_TEXT_BREAK}`))

    const { failedTests } = tests.reduce(
      (acc, testFunc) => {
        try {
          const startUnitTestCount = Test.getInstance().totalTests
          testFunc()
          const endUnitTestCount = Test.getInstance().totalTests
          const totalUnitTests = endUnitTestCount - startUnitTestCount

          console.log(
            `${color(COLORS.CYAN, testFunc.name)}${''.padEnd(30 - testFunc.name.length, '.')}${color(
              COLORS.GREEN,
              RESULT_TEXT.PASSED
            )} (${color(COLORS.BLUE, totalUnitTests.toFixed(0).padStart(3, ' '))} unit test${
              totalUnitTests === 1 ? '' : 's'
            })`
          )
        } catch (e) {
          console.log(`${testFunc.name}: ${color(COLORS.RED, RESULT_TEXT.FAILED)}`)
          const errorMessage = `${(e as Error)?.stack?.split('\n')[2].trim()}\n${(e as Error)?.message}`
          acc.failedTests.push({ func: testFunc, error: errorMessage })
        }

        return acc
      },
      { failedTests: [] as Array<{ func: Function; error: string }> }
    )

    console.log('\n')
    if (failedTests.length) {
      console.log(`${TEXT_BREAK}\nTest Failures: ${failedTests.length}/${tests.length}\n`)
      console.log(failedTests.map(({ func, error }) => `${func.name}\n${color(COLORS.RED, error)}\n`).join('\n'))
      console.log(TEXT_BREAK)
    }

    //update global stats
    Test.getInstance().failedSuites = (Test.getInstance().failedSuites || 0) + failedTests.length
    Test.getInstance().totalSuites = (Test.getInstance().totalSuites || 0) + tests.length
    Test.getInstance().passedSuites = (Test.getInstance().passedSuites || 0) + (tests.length - failedTests.length)
  }

  static printStats() {
    const failed = Test.getInstance().failedSuites
    const passed = Test.getInstance().passedSuites
    const total = Test.getInstance().totalSuites

    console.log(
      color(
        failed ? COLORS.RED : COLORS.GREEN,
        `${LONG_TEXT_BREAK}\nTest Results (${Test.getInstance().totalTests} unit tests)\n${LONG_TEXT_BREAK}`
      )
    )
    console.log(color(COLORS.GREEN, `PASSED: ${passed}`))
    console.log(color(failed ? COLORS.RED : COLORS.GREEN, `FAILED: ${failed}`))
    console.log(`TOTAL: ${total}`)
    console.log('\n')
  }
}

//instantiate
Test.getInstance()

export const FALSEY_VALUES = [null, undefined, 0, '', false]

export const expect = <T>(a: unknown) => ({
  toEqual: (b: unknown) => {
    Test.incTotalTests()
    if ((a === null && b === null) || (a === undefined && b === undefined) || (Number.isNaN(a) && Number.isNaN(b))) {
      return
    } else if (a !== b) {
      throw new Error(`Expected ${JSON.stringify(a)} (${getType(a)}) to equal ${JSON.stringify(b)} (${getType(b)})`)
    }
  },
  toSoftEqual: (b: unknown) => {
    Test.incTotalTests()
    if (JSON.stringify(a, null, 1) != JSON.stringify(b, null, 1)) {
      throw new Error(`Expected ${JSON.stringify(a)} (${getType(a)}) to equal ${JSON.stringify(b)} (${getType(b)})`)
    }
  },
  toFail: (message?: string) => {
    Test.incTotalTests()
    try {
      //@ts-ignore
      a()
    } catch {
      return
    }
    throw new Error(message ? message : `Expected to fail but passed`)
  },
  toPass: (message?: string) => {
    Test.incTotalTests()
    try {
      //@ts-ignore
      a()
    } catch (e) {
      throw new Error(message ? message : `Expected to pass but failed: ${e}`)
    }
  },
})

export const shouldNeverRun = (message?: string) => {
  Test.incTotalTests()
  return () => {
    throw new Error(message ? message : `Expected to never run but did`)
  }
}

export const printStats = Test.printStats

export const runTests = Test.runTests
