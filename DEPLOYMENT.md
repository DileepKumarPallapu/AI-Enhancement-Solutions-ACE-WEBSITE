# ACE Deployment, CI/CD & Production Infrastructure

## 1. Build & Runtime
- **Frontend**: Vite SPA, React 18, TypeScript, Tailwind CSS.
- **Target Environments**: Vercel / Netlify / AWS CloudFront + S3 / Docker Nginx container.
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`

## 2. Environment Configurations
- `VITE_API_URL`: Backend API base endpoint.
- `VITE_APP_ENV`: `production` | `staging` | `development`.
