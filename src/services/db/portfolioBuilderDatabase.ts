export interface PortfolioConfig {
  userId: string;
  slug: string;
  theme: 'OBSIDIAN_PRO' | 'CLEAN_LIGHT' | 'CYBER_EMERALD' | 'INDIGO_MINIMAL';
  visibility: 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
  headline: string;
  bio: string;
  featuredProjectIds: string[];
  featuredSkillIds: string[];
  featuredAchievementIds: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    website?: string;
  };
  customDomain?: string;
  allowDirectRecruiterContact: boolean;
  updatedAt: string;
}

const STORAGE_KEY_PORTFOLIO = 'ace_80x_student_portfolio';

export const portfolioBuilderDatabase = {
  getPortfolioConfig(): PortfolioConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: PortfolioConfig = {
      userId: 'usr-student-dileep-veltech',
      slug: 'dileep-kumar',
      theme: 'INDIGO_MINIMAL',
      visibility: 'PUBLIC',
      headline: 'Full-Stack Software Engineer & Distributed Systems Enthusiast',
      bio: '4th Year Computer Science Undergraduate @ Vel Tech Rangarajan Dr. Sagunthala R&D Institute. Architect of high-impact platforms connecting education, verified identity, and career opportunities.',
      featuredProjectIds: ['proj-ace-os', 'proj-dist-queue'],
      featuredSkillIds: ['sk-ts', 'sk-react', 'sk-node', 'sk-python'],
      featuredAchievementIds: ['ach-1', 'ach-2'],
      socialLinks: {
        github: 'https://github.com/DileepKumarPallapu',
        linkedin: 'https://linkedin.com/in/dileep-kumar',
        website: 'https://allcollegeevent.com/u/dileep-kumar'
      },
      allowDirectRecruiterContact: true,
      updatedAt: new Date().toISOString()
    };
    this.savePortfolioConfig(defaults);
    return defaults;
  },

  savePortfolioConfig(config: PortfolioConfig): PortfolioConfig {
    try {
      config.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(config));
    } catch {}
    return config;
  }
};
