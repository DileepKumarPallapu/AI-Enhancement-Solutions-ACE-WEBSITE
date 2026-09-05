# AI Architecture & Intelligence Layer

## 1. Provider Abstraction Interface
All AI capabilities in AllCollegeEvent are decoupled through the `AIProvider` interface:

```typescript
export interface AIProvider {
  parseQuery(query: string): Promise<ParsedSearchQuery>;
  scoreRecommendation(event: EventItem, profile: StudentProfile): number;
  verifyEvent(event: Partial<EventItem>): QualityAssessment;
  generateContent(input: ContentPrompt): Promise<GeneratedCopy>;
  chat(message: string, contextEvents: EventItem[]): Promise<string>;
}
```

## 2. The 6 Core AI Modules
1. **Recommendation Engine**: Combines content-based filtering (department + skills + location) with collaborative social signals (saves, views, registrations).
2. **Semantic Search**: Extracts implicit intents (e.g. "free", "weekend", "under ₹500", "certificates", "Chennai") and translates them into structured SQL/API filters.
3. **ACE AI Assistant ("Ask Zuzu")**: Conversational interface using retrieval-augmented generation over active loaded events to guarantee zero hallucinations.
4. **Event Quality Scorer**: 0–100 heuristic and structural evaluation verifying completeness, ticket clarity, valid dates, and poster resolution.
5. **Organizer Content Studio**: Automated generation of student-centric copy, SEO metadata, tags, and FAQ accordions.
6. **Engagement Intelligence**: Proactive alerts before registration closing deadlines.
