import { digitalPassportDatabase } from './digitalPassportDatabase';

export interface ResumeProfile {
  id: string;
  name: string;
  targetRole: string;
  summary: string;
  template: 'ATS_STANDARD' | 'MODERN_CLEAN' | 'TECHNICAL_LEAD' | 'ACADEMIC';
  selectedSkillIds: string[];
  selectedProjectIds: string[];
  selectedAchievementIds: string[];
  showGpa: boolean;
  showQrCode: boolean;
  updatedAt: string;
}

const STORAGE_KEY_RESUMES = 'ace_80x_student_resumes';

export const resumeBuilderDatabase = {
  getAllResumes(): ResumeProfile[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RESUMES);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: ResumeProfile[] = [
      {
        id: 'res-general-swe',
        name: 'Full Stack & Cloud Engineer Resume',
        targetRole: 'Software Engineer',
        summary: 'Final-year Computer Science student at Vel Tech with hands-on experience architecting scalable distributed systems, high-concurrency microservices, and modern TypeScript/React applications.',
        template: 'ATS_STANDARD',
        selectedSkillIds: ['sk-ts', 'sk-react', 'sk-node', 'sk-python', 'sk-k8s'],
        selectedProjectIds: ['proj-ace-os', 'proj-dist-queue'],
        selectedAchievementIds: ['ach-1', 'ach-2'],
        showGpa: true,
        showQrCode: true,
        updatedAt: '2026-09-06T12:00:00Z'
      },
      {
        id: 'res-ai-ml',
        name: 'AI & Machine Learning Specialist',
        targetRole: 'AI / ML Engineer',
        summary: 'Engineering student passionate about applied AI, LLM fine-tuning, and semantic retrieval systems with verified hackathon credentials.',
        template: 'MODERN_CLEAN',
        selectedSkillIds: ['sk-python', 'sk-ts', 'sk-node'],
        selectedProjectIds: ['proj-ace-os'],
        selectedAchievementIds: ['ach-1'],
        showGpa: true,
        showQrCode: true,
        updatedAt: '2026-09-07T15:30:00Z'
      }
    ];
    this.saveResumes(defaults);
    return defaults;
  },

  saveResumes(resumes: ResumeProfile[]) {
    try {
      localStorage.setItem(STORAGE_KEY_RESUMES, JSON.stringify(resumes));
    } catch {}
  },

  getResumeById(id: string): ResumeProfile | undefined {
    return this.getAllResumes().find(r => r.id === id);
  },

  saveResume(resume: ResumeProfile): ResumeProfile {
    const resumes = this.getAllResumes();
    const idx = resumes.findIndex(r => r.id === resume.id);
    resume.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      resumes[idx] = resume;
    } else {
      resumes.push(resume);
    }
    this.saveResumes(resumes);
    return resume;
  }
};
