import { EventItem } from '../../types';
import { COURSES_CATALOG, CourseItem } from '../../data/courseData';
import { COMPETITIONS_DATA } from '../../data/competitionsData';
import { coinsToINR, formatCoinsToRupees } from '../../config/coinConfig';

export interface AiChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  cards?: Array<{
    type: 'course' | 'quiz' | 'roadmap' | 'event';
    title: string;
    subtitle?: string;
    actionLabel: string;
    actionUrl: string;
    badge?: string;
  }>;
}

export class AceAiTutorEngine {
  private activeTopic: string = 'general';
  private quizState: { active: boolean; questionIndex: number; topic: string; score: number } = {
    active: false,
    questionIndex: 0,
    topic: '',
    score: 0
  };

  public resetContext() {
    this.activeTopic = 'general';
    this.quizState = { active: false, questionIndex: 0, topic: '', score: 0 };
  }

  public processUserQuery(
    query: string,
    context: {
      studentName: string;
      coins: number;
      xp: number;
      events: EventItem[];
      verifiedSkills?: string[];
    }
  ): { text: string; cards?: AiChatMessage['cards'] } {
    const q = query.toLowerCase().trim();

    // 1. BINARY SEARCH EXPLANATION
    if (q.includes('binary search')) {
      this.activeTopic = 'binary_search';
      return {
        text: `### 🌲 Binary Search — Conceptual & Intuitive Explanation

Binary search is an optimal logarithmic searching algorithm designed exclusively for **sorted data**.

#### 💡 The Intuition Scaffold
Imagine opening a 1,000-page physical dictionary to find the word *"Network"*. You would never start at page 1, 2, 3 (Linear Search, **O(N)**). Instead, you open directly to the middle (page 500):
• If *"Network"* comes before the middle word, you eliminate pages 501–1,000.
• If *"Network"* comes after, you eliminate pages 1–499.

With just **1 single comparison**, you cut the problem size strictly in half.

#### ⚙️ Mathematical Efficiency
• **Linear Search**: Up to 1,000,000 comparisons for 1M items.
• **Binary Search**: At most **20 comparisons** (since 2^20 ≈ 1,048,576).
• **Time Complexity**: **O(log N)** | **Space Complexity**: **O(1)**

#### 💻 Clean Implementation (JavaScript / Python)
\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid; // Found target index!
    if (arr[mid] < target) left = mid + 1; // Search right half
    else right = mid - 1; // Search left half
  }
  return -1; // Target not found
}
\`\`\`

**Question for you:** If an array has 64 sorted elements, what is the maximum number of comparisons Binary Search needs? (Reply with a number!)`
      };
    }

    if (this.activeTopic === 'binary_search' && (q === '6' || q.includes('6') || q.includes('six'))) {
      return {
        text: `### ✓ Exactly Right! 6 comparisons 🎉

Because 2^6 = 64, Binary Search cuts 64 → 32 → 16 → 8 → 4 → 2 → 1 in at most **6 steps**.

Would you like to practice a coding problem on Binary Search in the Coding Arcade or explore another algorithm?`
      };
    }

    // 2. TEACH ME PYTHON / PYTHON ROADMAP
    if (q.includes('teach me python') || q.includes('learn python') || (q.includes('python') && (q.includes('start') || q.includes('roadmap') || q.includes('basics')))) {
      this.activeTopic = 'python';
      return {
        text: `### 🐍 Lesson 1: Python Essentials & Core Syntax

Python is celebrated for its clean, human-readable syntax. Let's start with foundational concepts:

#### 1. Dynamic Variables & Types
In Python, you do not need to declare variable types explicitly:
\`\`\`python
student_name = "Dileep"       # String (str)
age = 20                     # Integer (int)
gpa = 8.85                   # Floating point (float)
is_enrolled = True           # Boolean (bool)

print(f"Student {student_name} is {age} years old with GPA {gpa}")
\`\`\`

#### 2. Lists & Iteration
\`\`\`python
skills = ["Python", "SQL", "React"]
for skill in skills:
    print(f"Verified skill: {skill}")
\`\`\`

#### 🎯 Micro Practice Challenge:
How would you define a function in Python that takes two numbers \`a\` and \`b\` and returns their sum?
(Try typing your answer or asking for a hint!)`,
        cards: [
          {
            type: 'course',
            title: 'Python for AI, ML & Data Science',
            subtitle: '10 Weeks · 14 Modules · Beginner to Advanced',
            actionLabel: 'Open Python Course',
            actionUrl: '/ai/recommendations',
            badge: 'Top Path'
          }
        ]
      };
    }

    if (this.activeTopic === 'python' && (q.includes('def') || q.includes('return') || q.includes('sum'))) {
      return {
        text: `### ✓ Excellent Python Syntax!

\`\`\`python
def add_numbers(a, b):
    return a + b

result = add_numbers(10, 25)
print(result) # Output: 35
\`\`\`

Key takeaway: In Python, functions are declared with the \`def\` keyword, and code blocks are defined using **4-space indentation** rather than curly braces \`{ }\`.

Would you like to continue to **Lesson 2: Lists, Dictionaries & List Comprehensions** or take a quick quiz?`
      };
    }

    // 3. WHAT SHOULD I LEARN AFTER JAVASCRIPT?
    if (q.includes('after javascript') || q.includes('after js') || (this.activeTopic === 'javascript' && q.includes('next'))) {
      this.activeTopic = 'web_next';
      return {
        text: `### ⚡ What to Learn After JavaScript: The Full Stack Roadmap

Since you have JavaScript foundations in place, here is the industry-standard progression to become a Full Stack Engineer:

#### 1. Modern Frontend Framework (React.js)
• **Why**: React is the most widely adopted library for building interactive component-driven user interfaces.
• **Core Topics**: JSX, Components, State Hooks (\`useState\`, \`useEffect\`), Props, and Context API.

#### 2. TypeScript
• **Why**: Adds static type safety over JavaScript, eliminating runtime null/undefined crashes in production.

#### 3. Backend & APIs (Node.js + Express)
• **Why**: Leverage your existing JavaScript syntax on the server to build RESTful APIs, handle JWT authentication, and interact with databases.

#### 4. Relational Databases (PostgreSQL / SQL)
• **Why**: Crucial for persisting structured user data, transactions, and multi-table queries with \`JOIN\`s.

#### 5. Full Stack Capstone Project
• Build a complete application (e.g., Student Opportunity Portal or E-Commerce Store) and deploy to cloud platforms.`,
        cards: [
          {
            type: 'course',
            title: 'Modern React & Full Stack Architecture',
            subtitle: '8 Weeks · React, TypeScript & Node.js',
            actionLabel: 'View Full Roadmap',
            actionUrl: '/ai/recommendations',
            badge: 'Recommended Next'
          }
        ]
      };
    }

    // 4. EXPLAIN SQL JOINS
    if (q.includes('sql join') || q.includes('joins') || (q.includes('sql') && q.includes('join'))) {
      this.activeTopic = 'sql';
      return {
        text: `### 🗄️ Understanding SQL Joins with Real Examples

A **JOIN** clause in SQL combines rows from two or more tables based on a related column between them.

Imagine two tables: \`Students\` and \`Enrollments\`:

#### 1. INNER JOIN (Matches in Both Tables)
Returns only rows where there is a match in **both** tables:
\`\`\`sql
SELECT Students.name, Enrollments.course_name
FROM Students
INNER JOIN Enrollments ON Students.id = Enrollments.student_id;
\`\`\`

#### 2. LEFT JOIN (All Left Table Rows + Matched Right)
Returns all students, even if they haven't enrolled in any course yet (unmatched courses will be \`NULL\`):
\`\`\`sql
SELECT Students.name, Enrollments.course_name
FROM Students
LEFT JOIN Enrollments ON Students.id = Enrollments.student_id;
\`\`\`

#### 3. RIGHT JOIN & FULL OUTER JOIN
• **RIGHT JOIN**: Returns all records from the right table and matched records from the left.
• **FULL OUTER JOIN**: Returns all records when there is a match in either left or right table.

**Quick question:** If you want a list of ALL registered students and any competitions they won (including students who haven't won yet), which JOIN would you use?`
      };
    }

    if (this.activeTopic === 'sql' && (q.includes('left') || q.includes('left join'))) {
      return {
        text: `### ✓ Spot on! A LEFT JOIN is correct 🎉

Using \`Students LEFT JOIN Wins ON Students.id = Wins.student_id\` guarantees that every student is included in the output, while un-awarded students simply show \`NULL\` for the prize columns.

Would you like to solve an interactive SQL query in our database practice hub?`
      };
    }

    // 5. I DON'T UNDERSTAND RECURSION
    if (q.includes('recursion') || q.includes('recursive')) {
      this.activeTopic = 'recursion';
      return {
        text: `### 🔁 Mastering Recursion: The Two Golden Rules

Recursion simply means a function that **calls itself** to solve a smaller subproblem of the original problem.

Every valid recursive function **MUST** have two components:
1. **The Base Case**: The stopping condition that prevents infinite looping.
2. **The Recursive Step**: Calling the function with a smaller or simpler input.

#### 💡 Countdown Example:
\`\`\`javascript
function countdown(n) {
  // 1. BASE CASE
  if (n <= 0) {
    console.log("Blast off! 🚀");
    return;
  }

  // 2. WORK
  console.log(n);

  // 3. RECURSIVE STEP (Smaller input: n - 1)
  countdown(n - 1);
}

countdown(3);
// Output:
// 3
// 2
// 1
// Blast off! 🚀
\`\`\`

#### 🧠 Mental Trace:
• \`countdown(3)\` prints 3 and calls \`countdown(2)\`
• \`countdown(2)\` prints 2 and calls \`countdown(1)\`
• \`countdown(1)\` prints 1 and calls \`countdown(0)\`
• \`countdown(0)\` hits base case \`n <= 0\` and returns.

**Check understanding:** What happens if we forget to include the base case in a recursive function?`
      };
    }

    if (this.activeTopic === 'recursion' && (q.includes('infinite') || q.includes('stack overflow') || q.includes('crash') || q.includes('loop') || q.includes('memory'))) {
      return {
        text: `### ✓ Exactly! You get a Stack Overflow (Infinite Recursion) 💥

Without a base case, the function continues pushing call frames onto the runtime call stack until memory is exhausted and the program crashes.

Would you like to see how recursion is used in real algorithms like **Merge Sort** or **Tree Traversals**?`
      };
    }

    // 6. QUIZ ME
    if (q.includes('quiz') || q.includes('test my knowledge') || q.includes('practice question')) {
      this.quizState = { active: true, questionIndex: 1, topic: 'python', score: 0 };
      return {
        text: `### 🎯 Interactive Python Knowledge Check

**Question 1/3:**
Which built-in Python data structure is **mutable** and ordered, defined using square brackets \`[ ]\`?

**A)** \`tuple\`
**B)** \`list\`
**C)** \`set\`
**D)** \`dict\`

*(Reply with your choice A, B, C, or D to check your understanding!)*`
      };
    }

    if (this.quizState.active) {
      if (this.quizState.questionIndex === 1) {
        if (q === 'b' || q === 'list' || q.includes('b')) {
          this.quizState.score += 1;
          this.quizState.questionIndex = 2;
          return {
            text: `### ✓ Correct! A \`list\` is mutable and ordered 🎉

• Lists (\`[1, 2, 3]\`) allow item reassignment, appending, and slicing.
• Tuples (\`(1, 2, 3)\`) are **immutable**.

---

**Question 2/3:**
What is the output of the following Python expression?
\`\`\`python
print(type(5 / 2))
\`\`\`

**A)** \`<class 'int'>\`
**B)** \`<class 'float'>\`
**C)** \`<class 'double'>\`
**D)** \`<class 'number'>\`

*(Reply with your choice A, B, C, or D!)*`
          };
        } else {
          return {
            text: `### ✗ Not quite!

**Hint:** Think about square brackets \`[ ]\`. Tuples use parentheses \`( )\`, sets use curly braces \`{ }\`.
Try choosing again between A, B, C, or D!`
          };
        }
      } else if (this.quizState.questionIndex === 2) {
        if (q === 'b' || q === 'float' || q.includes('b')) {
          this.quizState.score += 1;
          this.quizState.active = false;
          return {
            text: `### ✓ Correct! \`<class 'float'>\` 🎉

In Python 3, the single slash \`/\` operator always performs **float division** (e.g. \`5 / 2 = 2.5\`). For integer floor division, you use double slashes \`//\` (\`5 // 2 = 2\`).

**Great job! Score: 2/2 on Python Fundamentals.**
Would you like to explore another topic or practice a real challenge in the Coding Arcade?`
          };
        }
      }
    }

    // 7. REAL PLATFORM DATA: WALLET & COINS
    if (q.includes('coin') || q.includes('wallet') || q.includes('balance') || q.includes('worth') || q.includes('rupee')) {
      return {
        text: `### 🪙 Your Verified ACE Coin Wallet

• **Current Available Coins**: **🪙 ${context.coins.toLocaleString()} Coins**
• **Equivalent Value**: **${formatCoinsToRupees(context.coins)} equivalent** (calculated strictly at **100 Coins = ₹1.00 INR**).

#### 💡 How You Can Use Your Coins:
1. **Redeem Physical Educational Gifts**: Exchange coins for hardcover notebooks (11,000 Coins), programming books (49,900 Coins), or ergonomic wireless mice (49,900 Coins) in the Student Rewards Store.
2. **Earn More Coins**: Earn coins by solving problems in the Coding Arcade (+20 to +100 Coins) and placing in National Championships (🥇 5,000 Coins = ₹50.00).`,
        cards: [
          {
            type: 'course',
            title: 'Educational Rewards Store',
            subtitle: 'Redeem verified textbooks, stationery & tech tools',
            actionLabel: 'Open Rewards',
            actionUrl: '/student/rewards',
            badge: '100 Coins = ₹1'
          }
        ]
      };
    }

    // 8. REAL PLATFORM DATA: EVENTS & HACKATHONS
    if (q.includes('hackathon') || q.includes('event') || q.includes('competition') || q.includes('symposium')) {
      const liveComps = COMPETITIONS_DATA.slice(0, 2);
      const list = liveComps.map(c => `• **${c.title}** (${c.mode} · ${c.college}) — 🥇 **5,000 Coins (₹50.00)**`).join('\n');

      return {
        text: `### 🏆 Upcoming Verified Hackathons & Competitions

Here are verified collegiate opportunities open for student registration:

${list}

All competitions feature anti-cheat sandboxed code execution, official timers, and coin rewards credited directly to your wallet upon winning.`,
        cards: [
          {
            type: 'event',
            title: 'ACE Competitions Hub',
            subtitle: 'Browse all national coding challenges and hackathons',
            actionLabel: 'Explore Competitions',
            actionUrl: '/competitions',
            badge: 'Live Contests'
          }
        ]
      };
    }

    // 9. GENERAL EDUCATIONAL TUTORING FALLBACK
    return {
      text: `### 🎓 ACE AI 2.0 Socratic Educational Tutor

Hello **${context.studentName}**! I'm here to assist your technical learning, coding practice, and career milestones.

#### 🚀 Topics You Can Ask Me:
• **Concept Clarifications**: *"What is binary search?"*, *"Explain recursion with an example"*, or *"How do SQL JOINs work?"*
• **Learning Roadmaps**: *"Teach me Python"*, *"What should I learn after JavaScript?"*, or *"How do I prepare for SDE interviews?"*
• **Interactive Knowledge Checks**: *"Quiz me on Python"* or *"Give me a coding challenge"*.
• **Code Diagnosis**: Paste your code and error message for guided, step-by-step debugging.
• **Platform Opportunities**: *"How many coins do I have?"* or *"Show upcoming hackathons"*.

What specific concept or programming language would you like to explore?`
    };
  }
}

export const aceAiTutor = new AceAiTutorEngine();
