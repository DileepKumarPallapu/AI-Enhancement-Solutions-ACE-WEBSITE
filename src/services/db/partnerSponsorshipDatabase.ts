export interface PartnerOrganization {
  id: string;
  name: string;
  tier: 'PLATINUM' | 'GOLD' | 'ACADEMIC_AFFILIATE';
  industry: string;
  activeCampaignsCount: number;
  totalSponsoredINR: string;
  isVerified: boolean;
}

export const partnerSponsorshipDatabase = {
  getPartners(): PartnerOrganization[] {
    return [
      {
        id: 'partner-aws',
        name: 'Amazon Web Services (AWS Educate)',
        tier: 'PLATINUM',
        industry: 'Cloud Infrastructure',
        activeCampaignsCount: 3,
        totalSponsoredINR: '₹12,00,000',
        isVerified: true
      },
      {
        id: 'partner-zoho',
        name: 'Zoho Corporation',
        tier: 'GOLD',
        industry: 'Enterprise Software',
        activeCampaignsCount: 2,
        totalSponsoredINR: '₹8,50,000',
        isVerified: true
      }
    ];
  }
};
