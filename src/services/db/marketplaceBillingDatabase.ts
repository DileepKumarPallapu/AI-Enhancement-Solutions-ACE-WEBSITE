// ACE 110X Marketplace Billing, Subscriptions, Invoices & Auditable Refunds
import { globalizationService, CurrencyCode } from '../global/globalizationService';

export type OrderStatus = 'CREATED' | 'PENDING_PAYMENT' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type SubscriptionTier = 'STUDENT_PRO' | 'COLLEGE_ENTERPRISE' | 'COMPANY_RADAR' | 'PROVIDER_CATALOG';
export type RefundStatus = 'REQUESTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface MarketplaceProduct {
  id: string;
  title: string;
  category: string;
  provider: string;
  rating: number;
  reviewsCount: number;
  priceINR: number;
  priceCoins: number;
}

export interface LegacySubscriptionPlan {
  id: string;
  name: string;
  targetAudience: string;
  priceMonthlyINR: number;
  features: string[];
}

export interface MarketplaceOrder {
  id: string;
  orderNumber: string;
  userId: string;
  institutionId: string;
  itemTitle: string;
  itemType: 'COURSE' | 'ASSESSMENT_VOUCHER' | 'MENTOR_SESSION' | 'RECRUITER_SUBSCRIPTION' | 'CONFERENCE_PASS';
  baseAmountINR: number;
  taxAmountINR: number;
  totalAmountINR: number;
  billedCurrency: CurrencyCode;
  billedAmountConverted: number;
  status: OrderStatus;
  invoiceNumber: string;
  paymentGateway: 'STRIPE_INTERNATIONAL' | 'RAZORPAY_INDIA' | 'ACE_COIN_WALLET';
  createdAt: string;
  paidAt?: string;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  targetRole: 'STUDENT' | 'COLLEGE' | 'RECRUITER' | 'PROVIDER';
  monthlyINR: number;
  features: string[];
  isPopular?: boolean;
}

export interface RefundRecord {
  id: string;
  orderId: string;
  userId: string;
  reason: string;
  refundAmountINR: number;
  status: RefundStatus;
  auditNotes: string;
  requestedAt: string;
  resolvedAt?: string;
}

class MarketplaceBillingDatabase {
  private orders: Map<string, MarketplaceOrder> = new Map();
  private refunds: Map<string, RefundRecord> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedInitial();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const orders: MarketplaceOrder[] = [
      {
        id: 'ord_110x_001',
        orderNumber: 'ACE-INV-2026-0891',
        userId: 'usr_student_dileep',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        itemTitle: 'Distributed Systems & Vector Databases Certification Pass',
        itemType: 'ASSESSMENT_VOUCHER',
        baseAmountINR: 1999,
        taxAmountINR: 360, // 18% GST reference
        totalAmountINR: 2359,
        billedCurrency: 'INR',
        billedAmountConverted: 2359,
        status: 'PAID',
        invoiceNumber: 'INV-2026-0891',
        paymentGateway: 'RAZORPAY_INDIA',
        createdAt: '2026-03-05T14:30:00Z',
        paidAt: '2026-03-05T14:32:00Z'
      },
      {
        id: 'ord_110x_002',
        orderNumber: 'ACE-INV-2026-0892',
        userId: 'usr_student_dileep',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        itemTitle: 'International Research Paper Fast-Track Review Voucher',
        itemType: 'CONFERENCE_PASS',
        baseAmountINR: 4500,
        taxAmountINR: 810,
        totalAmountINR: 5310,
        billedCurrency: 'USD',
        billedAmountConverted: 61.38,
        status: 'PAID',
        invoiceNumber: 'INV-2026-0892',
        paymentGateway: 'STRIPE_INTERNATIONAL',
        createdAt: '2026-03-07T10:15:00Z',
        paidAt: '2026-03-07T10:16:00Z'
      }
    ];

    orders.forEach(o => this.orders.set(o.id, o));
  }

  public getProducts(): MarketplaceProduct[] {
    return [
      {
        id: 'prod-mentor-1on1',
        title: '1-on-1 Faculty System Design Architecture Review',
        category: 'MENTORSHIP',
        provider: 'Dr. Aravind Swaminathan (Vel Tech)',
        rating: 4.9,
        reviewsCount: 38,
        priceINR: 499,
        priceCoins: 49900
      },
      {
        id: 'prod-cert-voucher',
        title: 'Autonomous Multi-Agent Systems Certification Exam Voucher',
        category: 'ASSESSMENT',
        provider: 'Google Cloud Labs Partner',
        rating: 5.0,
        reviewsCount: 52,
        priceINR: 1999,
        priceCoins: 199900
      }
    ];
  }

  public getPlans(): LegacySubscriptionPlan[] {
    return [
      {
        id: 'plan-student-free',
        name: 'Student Basic Explorer',
        targetAudience: 'Undergraduates',
        priceMonthlyINR: 0,
        features: ['Digital Student Passport', 'Campus Hackathon Discovery', 'Public Portfolio Link']
      },
      {
        id: 'plan-college-enterprise',
        name: 'Campus OS Institutional License',
        targetAudience: 'Universities & Colleges',
        priceMonthlyINR: 25000,
        features: ['Full Department Placement Radar', 'NBA / NAAC Compliance Reports', 'Automated Verified Digital Passport Issuance']
      }
    ];
  }

  public getAvailablePlans(): SubscriptionPlan[] {
    return [
      {
        id: 'STUDENT_PRO',
        name: 'ACE Student Pro Explorer',
        targetRole: 'STUDENT',
        monthlyINR: 299,
        features: [
          'Unlimited AI Mock Interview Evaluations',
          'International Opportunity Auto-Match',
          'Priority Verified Skill Badges',
          'Direct Faculty Mentor Collaboration Channels'
        ],
        isPopular: true
      },
      {
        id: 'COLLEGE_ENTERPRISE',
        name: 'Campus OS Institutional License',
        targetRole: 'COLLEGE',
        monthlyINR: 25000,
        features: [
          'Unified Department Placement Radar',
          'Direct NBA/NAAC Accredited Analytics Export',
          'Automated Verifiable Digital Student Passport Issuance',
          'Dedicated Campus Hackathon Portal'
        ]
      },
      {
        id: 'COMPANY_RADAR',
        name: 'Recruiter Talent Radar Global',
        targetRole: 'RECRUITER',
        monthlyINR: 9999,
        features: [
          'Verifiable Proof-of-Work Candidate Search',
          'Multi-Tier Skill Filter with Real GitHub Audit',
          'Direct Interview Scheduler & Panel Scoring',
          'ATS Automated Webhook Stream'
        ]
      }
    ];
  }

  public getAllOrders(userId: string = 'usr_student_dileep'): MarketplaceOrder[] {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  public createOrder(params: {
    userId: string;
    institutionId: string;
    itemTitle: string;
    itemType: MarketplaceOrder['itemType'];
    baseAmountINR: number;
    currency: CurrencyCode;
    paymentGateway: MarketplaceOrder['paymentGateway'];
  }): MarketplaceOrder {
    const tax = Math.round(params.baseAmountINR * 0.18);
    const total = params.baseAmountINR + tax;
    const ex = globalizationService.getExchangeRate(params.currency);
    const converted = ex ? total * ex.rate : total;

    const order: MarketplaceOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `ACE-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: params.userId,
      institutionId: params.institutionId,
      itemTitle: params.itemTitle,
      itemType: params.itemType,
      baseAmountINR: params.baseAmountINR,
      taxAmountINR: tax,
      totalAmountINR: total,
      billedCurrency: params.currency,
      billedAmountConverted: Number(converted.toFixed(2)),
      status: 'PAID',
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      paymentGateway: params.paymentGateway,
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString()
    };

    this.orders.set(order.id, order);
    this.notify();
    return order;
  }

  public requestRefund(orderId: string, reason: string, userId: string = 'usr_student_dileep'): RefundRecord | null {
    const order = this.orders.get(orderId);
    if (!order) return null;

    const refund: RefundRecord = {
      id: `ref_${Date.now()}`,
      orderId,
      userId,
      reason,
      refundAmountINR: order.totalAmountINR,
      status: 'REQUESTED',
      auditNotes: 'Refund requested by user. Submitted to ACE Trust & Finance desk.',
      requestedAt: new Date().toISOString()
    };

    this.refunds.set(refund.id, refund);
    this.notify();
    return refund;
  }

  public getAllRefunds(): RefundRecord[] {
    return Array.from(this.refunds.values());
  }
}

export const marketplaceBillingDatabase = new MarketplaceBillingDatabase();
