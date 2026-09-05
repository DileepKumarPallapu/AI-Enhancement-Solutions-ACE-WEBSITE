import { ArcadeQuestion } from '../types/arcade';

export const ARCADE_QUESTIONS: Record<string, ArcadeQuestion[]> = {
  // 1. Code Builder
  'code-builder': [
    {
      id: 'cb-1',
      gameMode: 'code-builder',
      round: 1,
      questionNumber: 1,
      title: 'Assemble Function Return Statement',
      prompt: 'Arrange the code blocks into a valid JavaScript addition function statement.',
      blocks: ['return', 'a + b;', 'function add(a, b) {', '}'],
      correctBlockOrder: ['function add(a, b) {', 'return', 'a + b;', '}'],
      explanation: 'In JavaScript, functions declare parameters in parentheses and return evaluation results within the body braces.',
      hints: ['Start with the function declaration block.'],
      xpReward: 15,
      difficulty: 'Easy'
    },
    {
      id: 'cb-2',
      gameMode: 'code-builder',
      round: 1,
      questionNumber: 2,
      title: 'Assemble For Loop Iteration',
      prompt: 'Arrange the blocks to create a standard 0 to n-1 array traversal loop.',
      blocks: ['i < n;', 'for (let i = 0;', 'i++) {', '}'],
      correctBlockOrder: ['for (let i = 0;', 'i < n;', 'i++) {', '}'],
      explanation: 'Standard for loops require initialization (let i=0), condition (i < n), and increment (i++).',
      hints: ['Initialize i before defining the termination bound.'],
      xpReward: 15,
      difficulty: 'Easy'
    },
    {
      id: 'cb-3',
      gameMode: 'code-builder',
      round: 1,
      questionNumber: 3,
      title: 'Assemble Arrow Function With Filter',
      prompt: 'Arrange blocks to filter even numbers from an array.',
      blocks: ['numbers.filter(', 'n =>', 'n % 2 === 0', ');'],
      correctBlockOrder: ['numbers.filter(', 'n =>', 'n % 2 === 0', ');'],
      explanation: 'Array.filter takes a predicate callback returning true for matching elements.',
      hints: ['Call .filter() on the array and pass the arrow predicate.'],
      xpReward: 20,
      difficulty: 'Medium'
    }
  ],

  // 2. Debug The Code
  'debug': [
    {
      id: 'dbg-1',
      gameMode: 'debug',
      round: 1,
      questionNumber: 1,
      title: 'Fix The Off-By-One Array Bound',
      prompt: 'The function calculateSum causes an undefined addition on the last iteration. Fix the loop boundary condition.',
      initialCode: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i] || 0;
  }
  return sum;
}`,
      testCases: [
        { input: JSON.stringify([1, 2, 3, 4]), expectedOutput: '10' },
        { input: JSON.stringify([5, 10, 15]), expectedOutput: '30' }
      ],
      explanation: 'In zero-indexed arrays of length N, elements are indexed 0 to N-1. Using i <= length accesses out-of-bounds undefined.',
      hints: ['Change <= to < in the loop header.'],
      xpReward: 20,
      difficulty: 'Easy'
    },
    {
      id: 'dbg-2',
      gameMode: 'debug',
      round: 1,
      questionNumber: 2,
      title: 'Fix Case-Insensitive Palindrome Check',
      prompt: 'Fix the isPalindrome function so that it correctly ignores casing and returns a boolean.',
      initialCode: `function isPalindrome(str) {
  const clean = str.toLowerCase();
  return clean === clean.split('').reverse().join('');
}`,
      testCases: [
        { input: JSON.stringify('Racecar'), expectedOutput: 'true' },
        { input: JSON.stringify('hello'), expectedOutput: 'false' },
        { input: JSON.stringify('Madam'), expectedOutput: 'true' }
      ],
      explanation: 'Converting to lowercase before comparing with the reversed string ensures case-insensitivity.',
      hints: ['Use .toLowerCase() before reversing.'],
      xpReward: 25,
      difficulty: 'Medium'
    }
  ],

  // 3. Output Guess
  'output-guess': [
    {
      id: 'og-1',
      gameMode: 'output-guess',
      round: 1,
      questionNumber: 1,
      title: 'JavaScript Type Coercion with Plus Operator',
      prompt: 'What will be printed to the console?',
      snippet: `let a = "5";
let b = 2;
console.log(a + b);`,
      options: ['7', '52', 'NaN', 'TypeError'],
      correctOptionIndex: 1,
      explanation: 'When the + operator is used with a string operand, JavaScript performs string concatenation, resulting in "52".',
      hints: ['The + operator concatenates when one operand is a string.'],
      xpReward: 15,
      difficulty: 'Easy'
    },
    {
      id: 'og-2',
      gameMode: 'output-guess',
      round: 1,
      questionNumber: 2,
      title: 'Array Coercion Comparison',
      prompt: 'What is the boolean evaluation of the following expression?',
      snippet: `console.log([] == ![]);`,
      options: ['true', 'false', 'undefined', 'TypeError'],
      correctOptionIndex: 0,
      explanation: '![] evaluates to false. Then [] == false triggers coercion: [].toString() is "", and "" == 0 and false == 0, resulting in true.',
      hints: ['![] is a boolean false. Then abstract equality triggers coercion.'],
      xpReward: 20,
      difficulty: 'Hard'
    },
    {
      id: 'og-3',
      gameMode: 'output-guess',
      round: 1,
      questionNumber: 3,
      title: 'Variable Hoisting with var',
      prompt: 'What will be logged by this function call?',
      snippet: `function test() {
  console.log(x);
  var x = 10;
}
test();`,
      options: ['10', 'undefined', 'ReferenceError', 'null'],
      correctOptionIndex: 1,
      explanation: 'Variables declared with "var" are hoisted with an initial value of undefined.',
      hints: ['var declarations are hoisted to the top of their functional scope.'],
      xpReward: 15,
      difficulty: 'Medium'
    }
  ],

  // 4. Code Quiz
  'code-quiz': [
    {
      id: 'cq-1',
      gameMode: 'code-quiz',
      round: 1,
      questionNumber: 1,
      title: 'Time Complexity of Binary Search',
      prompt: 'What is the worst-case time complexity of Binary Search on a sorted array of N elements?',
      options: ['O(N)', 'O(N log N)', 'O(log N)', 'O(1)'],
      correctOptionIndex: 2,
      explanation: 'Binary Search halves the search space in each step, resulting in O(log N) logarithmic time complexity.',
      hints: ['Think of how many times you can divide N by 2 until you reach 1.'],
      xpReward: 15,
      difficulty: 'Easy'
    },
    {
      id: 'cq-2',
      gameMode: 'code-quiz',
      round: 1,
      questionNumber: 2,
      title: 'Primary Key Uniqueness in Relational SQL',
      prompt: 'Which constraint guarantees both uniqueness and non-null values for a table column?',
      options: ['FOREIGN KEY', 'PRIMARY KEY', 'UNIQUE', 'CHECK'],
      correctOptionIndex: 1,
      explanation: 'A PRIMARY KEY uniquely identifies each record and cannot contain NULL values.',
      hints: ['Unique constraints allow NULL; primary keys forbid NULL.'],
      xpReward: 15,
      difficulty: 'Easy'
    },
    {
      id: 'cq-3',
      gameMode: 'code-quiz',
      round: 1,
      questionNumber: 3,
      title: 'HTTP Status Code for Forbidden Access',
      prompt: 'Which standard HTTP status code signifies that the server understands the request but refuses to authorize it?',
      options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Error'],
      correctOptionIndex: 1,
      explanation: 'HTTP 403 Forbidden indicates that the client does not have access rights to the content.',
      hints: ['401 is unauthenticated; 403 is authenticated but unauthorized.'],
      xpReward: 15,
      difficulty: 'Easy'
    }
  ],

  // 5. Algorithm Race
  'algorithm-race': [
    {
      id: 'algo-1',
      gameMode: 'algorithm-race',
      round: 1,
      questionNumber: 1,
      title: 'Find Maximum Element in Array',
      prompt: 'Implement findMax(numbers) to return the highest numerical value in the list.',
      initialCode: `function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) max = numbers[i];
  }
  return max;
}`,
      testCases: [
        { input: JSON.stringify([4, 12, 8, 99, 3]), expectedOutput: '99' },
        { input: JSON.stringify([-5, -1, -20]), expectedOutput: '-1' }
      ],
      explanation: 'Iterating through the array and updating the maximum element runs in O(N) linear time.',
      hints: ['Initialize max with numbers[0] to handle negative numbers.'],
      xpReward: 20,
      difficulty: 'Easy'
    }
  ],

  // 6. SQL Challenge
  'sql': [
    {
      id: 'sql-1',
      gameMode: 'sql',
      round: 1,
      questionNumber: 1,
      title: 'Filter High-Scoring Students',
      prompt: 'Write an ANSI SQL query to select all columns from the "students" table where score is greater than 80.',
      sqlExpectedPattern: 'SELECT \* FROM STUDENTS WHERE SCORE > 80',
      explanation: 'SELECT * FROM students WHERE score > 80 filters table rows satisfying the predicate.',
      hints: ['Use the WHERE clause with the > comparison operator.'],
      xpReward: 20,
      difficulty: 'Easy'
    },
    {
      id: 'sql-2',
      gameMode: 'sql',
      round: 1,
      questionNumber: 2,
      title: 'Count Events by College',
      prompt: 'Write an SQL query to count total events grouped by college_name from the "events" table.',
      sqlExpectedPattern: 'SELECT COLLEGE_NAME, COUNT\(\*\) FROM EVENTS GROUP BY COLLEGE_NAME',
      explanation: 'Aggregating by column requires SELECT college_name, COUNT(*) FROM events GROUP BY college_name.',
      hints: ['Combine GROUP BY with COUNT(*).'],
      xpReward: 25,
      difficulty: 'Medium'
    }
  ],

  // 7. Fix The Bug
  'fix-bug': [
    {
      id: 'fb-1',
      gameMode: 'fix-bug',
      round: 1,
      questionNumber: 1,
      title: 'Fix Subtraction Bug in Addition Helper',
      prompt: 'The function "add" is returning the difference instead of the sum. Fix the operator.',
      initialCode: `function add(a, b) {
  return a + b;
}`,
      testCases: [
        { input: JSON.stringify([5, 3]), expectedOutput: '8' },
        { input: JSON.stringify([10, 20]), expectedOutput: '30' }
      ],
      explanation: 'Changing the operator from subtraction (-) to addition (+) computes the correct arithmetic sum.',
      hints: ['Replace - with +.'],
      xpReward: 15,
      difficulty: 'Easy'
    }
  ],

  // 8. Memory Match
  'memory-match': [
    {
      id: 'mm-1',
      gameMode: 'memory-match',
      round: 1,
      questionNumber: 1,
      title: 'Data Structure Concept Matching',
      prompt: 'Match fundamental computer science data structures with their operating characteristics.',
      blocks: [
        'Stack', 'LIFO (Last In First Out)',
        'Queue', 'FIFO (First In First Out)',
        'Binary Search Tree', 'Left child < Parent < Right child',
        'Hash Map', 'O(1) Average key-value lookup'
      ],
      explanation: 'Stacks operate via LIFO, Queues via FIFO, BSTs maintain sorted subtree invariants, and Hash Maps offer O(1) constant average access.',
      hints: ['Stack pushes and pops from the same end (LIFO).'],
      xpReward: 20,
      difficulty: 'Easy'
    }
  ]
};
