# ACE Testing & Quality Assurance Suite

## 1. Verification Strategy
- **Unit & Domain Tests**: Validate domain databases, event buses, calculations, and currency conversions.
- **Integration Tests**: Verify multi-stage student workflows (Discovery -> Application -> Interview -> Passport -> Shortlist).
- **Static Analysis**: TypeScript strict type-checking (`tsc --noEmit`).
- **Build Verification**: Vite production bundle compilation (`npm run build`).
