# System Architecture: AllCollegeEvent (ACE) 2026/2027

```mermaid
graph TD
    subgraph Experience Layer
        Web[Web App - React 19 / Vite / Tailwind]
        PWA[PWA Mobile Shell]
        ChatWidget[Ask Zuzu AI Drawer]
    end

    subgraph AI Intelligence Layer
        RecEngine[AI Recommendation Engine]
        SmartSearch[AI Semantic Search Parser]
        QualityScorer[AI Event Verification 0-100]
        ContentGen[AI Content Studio & OCR]
        ChatbotCore[ACE AI Assistant Engine]
    end

    subgraph Backend & APIs
        ProxyAPI[/api/proxy Gateway]
        LiveAPI[Node/Express Backend API]
        AuthModule[JWT Auth & RBAC]
        ReferralEngine[Referral & Points Ledger]
    end

    subgraph Data & Storage Layer
        Postgres[(PostgreSQL Database)]
        AWSS3[(AWS S3 Asset Bucket)]
        LocalCache[(Client Offline Cache)]
    end

    Web --> ProxyAPI
    PWA --> ProxyAPI
    ChatWidget --> ChatbotCore
    
    ProxyAPI --> LiveAPI
    LiveAPI --> Postgres
    LiveAPI --> AWSS3
    
    LiveAPI --> RecEngine
    LiveAPI --> SmartSearch
    LiveAPI --> QualityScorer
    LiveAPI --> ContentGen
    
    ProxyAPI -.-> LocalCache
```
