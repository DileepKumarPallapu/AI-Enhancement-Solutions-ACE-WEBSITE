# ACE Coding & Gamified Learning Platform Specification

## 1. Overview
The **ACE Coding Hub** (`/coding`) is an interactive development environment and arcade where students learn programming, practice algorithmic challenges, play browser coding mini-games, and compete on college leaderboards.

## 2. Core Modules
1. **Interactive Problem Solver (`/coding/practice/:id`)**:
   - Multi-language support (Python, JavaScript, Java, C++).
   - Instant local test case runner with execution metrics (Runtime in ms, memory usage in MB).
   - "Ask Coding AI" tutor mode providing conceptual hints without immediately spoiling solutions.
2. **8 Browser Coding Mini-Games (`/coding/games`)**:
   - *Code Builder*: Drag/click functional code blocks in order.
   - *Debug The Code*: Spot index/syntax errors.
   - *Output Guess*: Predict complex language evaluation outputs.
   - *Code Quiz*: Timed multiple choice on DSA time complexities.
   - *Algorithm Race*: Pick optimal Big-O algorithm for scenarios.
   - *SQL Challenge*: Run live queries against sample tables.
   - *Fix The Bug*: Live HTML/CSS/JS patch engine.
   - *Memory Match*: Match DSA data structures with real-world definitions.
3. **Structured Learning Hub (`/learn`)**:
   - Multi-module learning paths for *Python*, *Full-Stack Web Development*, and *DSA*.
