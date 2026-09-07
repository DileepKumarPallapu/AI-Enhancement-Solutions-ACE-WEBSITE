export interface TrainingCourse {
  id: string;
  title: string;
  providerName: string;
  category: 'CLOUD' | 'AI_ML' | 'CYBERSECURITY' | 'FULLSTACK' | 'DATA_ENGINEERING';
  durationWeeks: number;
  totalEnrolled: number;
  completionRate: number;
  accreditedCertificate: boolean;
  priceINR: number;
}

export const trainingProviderDatabase = {
  getCourses(): TrainingCourse[] {
    return [
      {
        id: 'tc-1',
        title: 'Kubernetes Cloud Native Architecture & CKA Preparation',
        providerName: 'Linux Foundation Academy & ACE Labs',
        category: 'CLOUD',
        durationWeeks: 6,
        totalEnrolled: 340,
        completionRate: 92,
        accreditedCertificate: true,
        priceINR: 0 // Free for accredited Vel Tech students
      },
      {
        id: 'tc-2',
        title: 'Production Generative AI & Autonomous Agent Engineering',
        providerName: 'DeepLearning.AI Industry Consortium',
        category: 'AI_ML',
        durationWeeks: 8,
        totalEnrolled: 512,
        completionRate: 88,
        accreditedCertificate: true,
        priceINR: 0
      }
    ];
  }
};
