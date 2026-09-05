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
  brandName: "AllCollegeEvent",
  shortName: "ACE",
  tagline: "Discover. Engage. Trust. Return. Advocate.",
  description: "AI-Powered Student Opportunity Ecosystem connecting students with verified hackathons, symposiums, workshops, research conferences, cultural fests, and career opportunities.",
  logo: "/brand/logo.png",
  logoLight: "/brand/logo-light.png",
  logoDark: "/brand/logo-dark.png",
  logoIcon: "/brand/logo-icon.png",
  favicon: "/favicon.png",
  primaryColor: "#7F00FF",
  accentColor: "#9333EA",
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/allcollegeevent",
    instagram: "https://www.instagram.com/allcollegeevent",
    youtube: "https://www.youtube.com/@allcollegeevent",
    twitter: "https://twitter.com/allcollegeevent",
    github: "https://github.com/allcollegeevent",
    whatsapp: "https://chat.whatsapp.com/I7WpyVCSy7nIenuJTduwig"
  },
  contactEmail: "support@allcollegeevent.com",
  supportEmail: "support@allcollegeevent.com",
  currentYear: 2026
};
