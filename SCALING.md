# ACE Scaling & Performance Architecture

## 1. High-Concurrency Strategy
- **Edge Caching**: Static assets, public event directories, and college directory pages cached at CDN edge.
- **Event Bus Decoupling**: Domain event ingestion operates asynchronously without blocking web requests.
- **Client-Side Memoization & Lazy Loading**: Critical routes lazy loaded with React Suspense.
