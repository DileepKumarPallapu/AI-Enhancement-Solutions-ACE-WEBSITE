export interface CreatorPost {
  id: string;
  title: string;
  authorName: string;
  authorInstitution: string;
  topic: string;
  viewsCount: number;
  likesCount: number;
  publishedDate: string;
  rewardEarnedCoins: number;
}

export const creatorEcosystemDatabase = {
  getCreatorPosts(): CreatorPost[] {
    return [
      {
        id: 'post-1',
        title: 'Building a High-Concurrency Queue in TypeScript for Campus Events',
        authorName: 'Dileep Kumar',
        authorInstitution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute',
        topic: 'Distributed Systems',
        viewsCount: 1420,
        likesCount: 198,
        publishedDate: '2026-09-04',
        rewardEarnedCoins: 2500 // ₹25 INR reward
      }
    ];
  }
};
