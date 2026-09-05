import { inrToCoins } from '../config/coinConfig';

export interface RewardProduct {
  id: string;
  productName: string;
  category: 'Stationery' | 'Books' | 'Technology' | 'Study' | 'College Essentials';
  referenceINRPrice: number;
  coinPrice: number;
  stock: number;
  description: string;
  useCase: string;
  icon: string;
  lastVerifiedAt: string;
  priceSource: string;
  enabled: boolean;
}

export const REWARD_PRODUCTS_CATALOG: RewardProduct[] = [
  // STATIONERY
  {
    id: 'prod-basic-pen',
    productName: 'Basic Examination Pen Set',
    category: 'Stationery',
    referenceINRPrice: 10,
    coinPrice: inrToCoins(10), // 1,000 Coins
    stock: 150,
    description: 'Pack of smooth-flow blue & black ballpoint pens for exams and note-taking.',
    useCase: 'Daily college classes and semester examinations',
    icon: '🖊️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Direct Wholesale Procurement',
    enabled: true
  },
  {
    id: 'prod-premium-pen',
    productName: 'Premium Student Metal Pen',
    category: 'Stationery',
    referenceINRPrice: 50,
    coinPrice: inrToCoins(50), // 5,000 Coins
    stock: 85,
    description: 'Matte-finish metallic rollerball pen with refillable archival ink cartridge.',
    useCase: 'Classes, project signatures, and daily coursework',
    icon: '✒️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Direct Wholesale Procurement',
    enabled: true
  },
  {
    id: 'prod-notebook',
    productName: 'College Spiral Notebook (200 Pgs)',
    category: 'Stationery',
    referenceINRPrice: 110,
    coinPrice: inrToCoins(110), // 11,000 Coins
    stock: 90,
    description: 'High GSM single-line ruled spiral journal with waterproof poly cover.',
    useCase: 'Engineering lecture notes and lab diagrams',
    icon: '📓',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Direct Wholesale Procurement',
    enabled: true
  },
  {
    id: 'prod-premium-notebook',
    productName: 'Hardbound Engineering Journal',
    category: 'Stationery',
    referenceINRPrice: 170,
    coinPrice: inrToCoins(170), // 17,000 Coins
    stock: 65,
    description: 'Premium faux-leather hardcover dot-grid engineering journal with ribbon marker.',
    useCase: 'Project planning, system architecture diagrams & algorithms',
    icon: '📕',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Direct Wholesale Procurement',
    enabled: true
  },
  {
    id: 'prod-study-planner',
    productName: 'Academic Semester Study Planner',
    category: 'Study',
    referenceINRPrice: 150,
    coinPrice: inrToCoins(150), // 15,000 Coins
    stock: 75,
    description: 'Weekly schedule tracker, exam roadmap, and milestone checklist.',
    useCase: 'Managing semester deadlines and placement prep goals',
    icon: '📅',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Publishing Chapter',
    enabled: true
  },
  {
    id: 'prod-study-kit',
    productName: 'Pen + Notebook All-in-One Study Kit',
    category: 'Stationery',
    referenceINRPrice: 200,
    coinPrice: inrToCoins(200), // 20,000 Coins
    stock: 40,
    description: 'Complete kit containing hardcover notebook, 3 pens, highlighter, and sticky notes.',
    useCase: 'All-in-one exam prep pack',
    icon: '📦',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Wholesale Kit',
    enabled: true
  },

  // BOOKS
  {
    id: 'prod-prog-book',
    productName: 'Clean Code: Handbook of Agile Craftsmanship',
    category: 'Books',
    referenceINRPrice: 499,
    coinPrice: inrToCoins(499), // 49,900 Coins
    stock: 35,
    description: 'Classic software engineering textbook on writing maintainable, readable code.',
    useCase: 'Essential for aspiring professional developers',
    icon: '📚',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'Pearson Academic Distribution',
    enabled: true
  },
  {
    id: 'prod-dsa-book',
    productName: 'Data Structures & Algorithms Made Easy',
    category: 'Books',
    referenceINRPrice: 746,
    coinPrice: inrToCoins(746), // 74,600 Coins
    stock: 25,
    description: 'Comprehensive guide covering recursion, trees, dynamic programming, and graphs.',
    useCase: 'Technical coding interview & competitive programming prep',
    icon: '📖',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'Narasimha Karumanchi Authorized Edition',
    enabled: true
  },
  {
    id: 'prod-python-book',
    productName: 'Automate the Boring Stuff with Python',
    category: 'Books',
    referenceINRPrice: 514,
    coinPrice: inrToCoins(514), // 51,400 Coins
    stock: 30,
    description: 'Practical Python programming guide for scripting, web scraping, and automation.',
    useCase: 'Rapid real-world Python development',
    icon: '🐍',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'No Starch Press Academic Edition',
    enabled: true
  },

  // TECHNOLOGY
  {
    id: 'prod-wired-mouse',
    productName: 'Basic Wired Optical Mouse',
    category: 'Technology',
    referenceINRPrice: 199,
    coinPrice: inrToCoins(199), // 19,900 Coins
    stock: 50,
    description: 'Reliable USB wired optical mouse with 1000 DPI sensor for lab computers.',
    useCase: 'College lab work and everyday computing',
    icon: '🖱️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  },
  {
    id: 'prod-wireless-mouse',
    productName: 'Student Wireless Mouse (Silent Click)',
    category: 'Technology',
    referenceINRPrice: 499,
    coinPrice: inrToCoins(499), // 49,900 Coins
    stock: 30,
    description: '2.4GHz wireless mouse with silent mechanical switches for library study.',
    useCase: 'Coding, projects, and quiet study sessions',
    icon: '🖱️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  },
  {
    id: 'prod-better-mouse',
    productName: 'Ergonomic Precision Wireless Mouse',
    category: 'Technology',
    referenceINRPrice: 699,
    coinPrice: inrToCoins(699), // 69,900 Coins
    stock: 20,
    description: 'Ergonomic contoured design with dual DPI switch (1600 DPI) and thumb grip.',
    useCase: 'Long programming and design sessions',
    icon: '🖱️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  },
  {
    id: 'prod-kb-mouse-724',
    productName: 'Wireless Keyboard & Mouse Combo',
    category: 'Technology',
    referenceINRPrice: 724,
    coinPrice: inrToCoins(724), // 72,400 Coins
    stock: 18,
    description: 'Full-size wireless keyboard with numeric keypad plus precision optical mouse.',
    useCase: 'Complete hostel desk development setup',
    icon: '⌨️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  },
  {
    id: 'prod-kb-mouse-930',
    productName: 'Slim Desktop Wireless Combo Kit',
    category: 'Technology',
    referenceINRPrice: 930,
    coinPrice: inrToCoins(930), // 93,000 Coins
    stock: 15,
    description: 'Ultra-slim low profile chiclet keyboard with whisper-quiet keys.',
    useCase: 'Fast typing and clean desk setup',
    icon: '⌨️',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  },
  {
    id: 'prod-laptop-stand',
    productName: 'Ergonomic Aluminum Laptop Riser Stand',
    category: 'Technology',
    referenceINRPrice: 800,
    coinPrice: inrToCoins(800), // 80,000 Coins
    stock: 22,
    description: 'Foldable ventilated aluminum riser supporting laptops up to 17.3 inches.',
    useCase: 'Neck posture comfort during hackathons and long study hours',
    icon: '💻',
    lastVerifiedAt: '2026-09-02',
    priceSource: 'ACE Verified Tech Vendor',
    enabled: true
  }
];
