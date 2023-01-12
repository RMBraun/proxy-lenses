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
  RESET: 'RESET',
}

const COLOR_ANSI = {
  [COLORS.RED]: '\u001b[31;1m',
  [COLORS.GREEN]: '\u001b[32;1m',
  [COLORS.BLUE]: '\u001b[34;1m',
  [COLORS.YELLOW]: '\u001b[33;1m',
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

  private total: number
  private failed: number
  private passed: number

  constructor() {
    this.total = 0
    this.failed = 0
    this.passed = 0
  }

  static getInstance() {
    if (Test.instance == null) {
      Test.instance = new Test()
    }

    return Test.instance
  }

  static runTests(title: string, tests: Array<Function> = []) {
    console.log(
      color(
        COLORS.YELLOW,
        `${TEXT_BREAK}\n${title} : ${tests.length} test${tests.length === 1 ? '' : 's'}\n${TEXT_BREAK}`
      )
    )

    const { failedTests, testResults } = tests.reduce(
      (acc, testFunc) => {
        try {
          testFunc()

          console.log(`${testFunc.name}: ${color(COLORS.GREEN, RESULT_TEXT.PASSED)}`)
          acc.testResults[testFunc.name] = color(COLORS.GREEN, RESULT_TEXT.PASSED)
        } catch (e) {
          console.log(`${testFunc.name}: ${color(COLORS.RED, RESULT_TEXT.FAILED)}`)
          acc.testResults[testFunc.name] = color(COLORS.RED, RESULT_TEXT.FAILED)
          const errorMessage = `${(e as Error)?.stack?.split('\n')[2].trim()}\n${(e as Error)?.message}`
          acc.failedTests.push({ func: testFunc, error: errorMessage })
        }

        return acc
      },
      { testResults: {} as Record<string, string>, failedTests: [] as Array<{ func: Function; error: string }> }
    )

    console.table(testResults)

    console.log('\n')
    if (failedTests.length) {
      console.log(`${TEXT_BREAK}\nTest Failures: ${failedTests.length}/${tests.length}\n`)
      console.log(failedTests.map(({ func, error }) => `${func.name}\n${color(COLORS.RED, error)}\n`).join('\n'))
      console.log(TEXT_BREAK)
    }

    //update global stats
    Test.getInstance().failed = (Test.getInstance().failed || 0) + failedTests.length
    Test.getInstance().total = (Test.getInstance().total || 0) + tests.length
    Test.getInstance().passed = (Test.getInstance().passed || 0) + (tests.length - failedTests.length)
  }

  static printStats() {
    const failed = Test.getInstance().failed
    const passed = Test.getInstance().passed
    const total = Test.getInstance().total

    console.log(color(failed ? COLORS.RED : COLORS.GREEN, `${LONG_TEXT_BREAK}\nTest Results\n${LONG_TEXT_BREAK}`))
    console.log(color(COLORS.GREEN, `PASSED: ${passed}`))
    console.log(color(failed ? COLORS.RED : COLORS.GREEN, `FAILED: ${failed}`))
    console.log(`TOTAL: ${total}`)
    console.log('\n')
  }
}

export const FALSEY_VALUES = [null, undefined, 0, '', false]

export const expect = (a: unknown) => ({
  toEqual: (b: unknown) => {
    if (a !== b) {
      throw new Error(`Expected ${JSON.stringify(a)} (${getType(a)}) to equal ${JSON.stringify(b)} (${getType(b)})`)
    }
  },
  toSoftEqual: (b: unknown) => {
    if (JSON.stringify(a, null, 1) != JSON.stringify(b, null, 1)) {
      throw new Error(`Expected ${JSON.stringify(a)} (${getType(a)}) to equal ${JSON.stringify(b)} (${getType(b)})`)
    }
  },
  toFail: (message?: string) => {
    try {
      //@ts-ignore
      a()
    } catch {
      return
    }
    throw new Error(message ? message : `Expected to fail but passed`)
  },
  toPass: (message?: string) => {
    try {
      //@ts-ignore
      a()
    } catch (e) {
      throw new Error(message ? message : `Expected to pass but failed: ${e}`)
    }
  },
})

export const printStats = Test.printStats

export const runTests = Test.runTests
