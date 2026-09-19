export interface BrandConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
  logoLight: string;
  logoDark: string;
  logoIcon: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
    whatsapp?: string;
  };
  contactEmail: string;
  supportEmail: string;
  currentYear: number;
}

export const BRAND: BrandConfig = {
  brandName: "Nexus Campus",
  shortName: "NEXUS",
  tagline: "The Global Collegiate Opportunity & Career Operating System",
  description: "AI-Native Collegiate Operating System connecting students with verified hackathons, symposiums, research conferences, talent radars, and career opportunities.",
  logo: "/brand/logo.svg",
  logoLight: "/brand/logo-light.svg",
  logoDark: "/brand/logo-dark.svg",
  logoIcon: "/brand/logo-icon.svg",
  favicon: "/favicon.svg",
  primaryColor: "#6366F1",
  accentColor: "#8B5CF6",
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/nexuscampus",
    instagram: "https://www.instagram.com/nexuscampus",
    youtube: "https://www.youtube.com/@nexuscampus",
    twitter: "https://twitter.com/nexuscampus",
    github: "https://github.com/nexuscampus",
    whatsapp: "https://chat.whatsapp.com/nexuscampus"
  },
  contactEmail: "support@nexuscampus.io",
  supportEmail: "support@nexuscampus.io",
  currentYear: 2026
};
