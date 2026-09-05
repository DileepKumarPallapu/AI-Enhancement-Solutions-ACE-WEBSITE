import { TestCase } from '../../types/learnPlay';

export interface ExecutionResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR';
  passedCount: number;
  totalCount: number;
  output: string;
  failedCase?: {
    input: string;
    expected: string;
    received: string;
    errorNote?: string;
  };
  executionTimeMs: number;
}

export function evaluateJavaScriptCode(userCode: string, testCases: TestCase[]): ExecutionResult {
  const startTime = performance.now();
  let passedCount = 0;

  try {
    // Wrap student function in isolated function constructor
    const runner = new Function(`
      ${userCode}
      if (typeof solution === 'function') return solution;
      if (typeof add === 'function') return add;
      if (typeof reverseString === 'function') return reverseString;
      if (typeof isPalindrome === 'function') return isPalindrome;
      if (typeof findMax === 'function') return findMax;
      return null;
    `)();

    if (!runner) {
      return {
        status: 'COMPILATION_ERROR',
        passedCount: 0,
        totalCount: testCases.length,
        output: 'Compilation Error: No executable function (e.g. solution, add, reverseString) found.',
        executionTimeMs: 12
      };
    }

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      let parsedInput;
      try {
        parsedInput = JSON.parse(tc.input);
      } catch {
        parsedInput = tc.input;
      }

      let result;
      if (Array.isArray(parsedInput)) {
        result = runner(...parsedInput);
      } else {
        result = runner(parsedInput);
      }

      const receivedStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
      const expectedStr = tc.expectedOutput.trim();

      if (receivedStr.trim() === expectedStr) {
        passedCount++;
      } else {
        return {
          status: 'WRONG_ANSWER',
          passedCount,
          totalCount: testCases.length,
          output: `Test case ${i + 1} failed.`,
          failedCase: {
            input: tc.input,
            expected: tc.expectedOutput,
            received: receivedStr,
            errorNote: `Expected ${tc.expectedOutput}, but received ${receivedStr}`
          },
          executionTimeMs: Math.round(performance.now() - startTime)
        };
      }
    }

    return {
      status: 'ACCEPTED',
      passedCount,
      totalCount: testCases.length,
      output: `All ${testCases.length}/${testCases.length} test cases passed successfully!`,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  } catch (err: any) {
    return {
      status: 'RUNTIME_ERROR',
      passedCount,
      totalCount: testCases.length,
      output: `Runtime Error: ${err.message || 'Error executing code'}`,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }
}

// Simulated SQL evaluation engine
export function evaluateSqlQuery(query: string, expectedPattern: RegExp): boolean {
  const clean = query.trim().toUpperCase().replace(/\s+/g, ' ');
  return expectedPattern.test(clean);
}
