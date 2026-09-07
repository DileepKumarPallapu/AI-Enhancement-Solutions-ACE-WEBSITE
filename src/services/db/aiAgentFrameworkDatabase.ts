// ACE 25X AI Agent Framework & Persistent Memory Database
// User controls: View, Edit, Delete persistent agent memory preferences

export interface AgentMemoryItem {
  id: string;
  userId: string;
  category: 'CAREER_GOAL' | 'TECH_STACK' | 'LOCATION_PREFERENCE' | 'INTERVIEW_FOCUS';
  key: string;
  value: string;
  lastUpdated: string;
}

class AiAgentFrameworkDatabase {
  private memories: Map<string, AgentMemoryItem> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initial: AgentMemoryItem[] = [
      {
        id: 'mem_01',
        userId: 'usr_student_dileep',
        category: 'CAREER_GOAL',
        key: 'Target Career Role',
        value: 'AI & Distributed Systems Engineer',
        lastUpdated: '2026-03-01T00:00:00Z'
      },
      {
        id: 'mem_02',
        userId: 'usr_student_dileep',
        category: 'TECH_STACK',
        key: 'Primary Technologies',
        value: 'React, TypeScript, Python, ROS2, PyTorch',
        lastUpdated: '2026-03-01T00:00:00Z'
      },
      {
        id: 'mem_03',
        userId: 'usr_student_dileep',
        category: 'LOCATION_PREFERENCE',
        key: 'Preferred Locations',
        value: 'Chennai, Bengaluru, Hybrid Remote',
        lastUpdated: '2026-03-01T00:00:00Z'
      }
    ];

    initial.forEach(m => this.memories.set(m.id, m));
  }

  public getMemories(userId: string): AgentMemoryItem[] {
    return Array.from(this.memories.values()).filter(m => m.userId === userId);
  }

  public updateMemory(id: string, value: string): boolean {
    const item = this.memories.get(id);
    if (!item) return false;
    item.value = value;
    item.lastUpdated = new Date().toISOString();
    this.memories.set(id, item);
    return true;
  }

  public deleteMemory(id: string): boolean {
    return this.memories.delete(id);
  }
}

export const aiAgentFrameworkDb = new AiAgentFrameworkDatabase();
