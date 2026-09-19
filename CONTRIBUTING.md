# Contributing to Nexus Campus (NEXUS)

Thank you for your interest in contributing to Nexus Campus! We welcome contributions to help build the ultimate collegiate opportunity and career operating system.

## Code of Conduct
Please ensure all interactions adhere to professional and inclusive academic standards.

## Development Workflow
1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify type safety:
   ```bash
   npx tsc --noEmit
   ```
4. Run the master test runner:
   ```bash
   npx tsx scratch/run_all_test_suites.ts
   ```
5. Commit your changes with semantic commit messages (`feat:`, `fix:`, `docs:`).
6. Push to your branch and open a Pull Request.

## Coding Standards
- TypeScript strict mode compliance with 0 type errors.
- Component structure using Tailwind CSS and Lucide React icons.
- Preserve institutional anchoring to Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology.
