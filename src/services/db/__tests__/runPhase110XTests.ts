// ACE 110X Global Opportunity Exchange, Multi-Currency, Partner Marketplace & AI Assistant Tests

import { globalOpportunityExchangeDatabase } from '../globalOpportunityExchangeDatabase';
import { marketplaceBillingDatabase } from '../marketplaceBillingDatabase';
import { aiGlobalOpportunityAssistantDatabase } from '../aiGlobalOpportunityAssistantDatabase';
import { globalizationService } from '../../global/globalizationService';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function test(suite: string, name: string, fn: () => void) {
  try {
    fn();
    results.push({ suite, name, passed: true });
    console.log(`  ✓ [${suite}] ${name}`);
  } catch (err: any) {
    results.push({ suite, name, passed: false, error: err?.message || String(err) });
    console.error(`  ✗ [${suite}] ${name}: ${err?.message || err}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

export function runPhase110XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 110X — GLOBAL OPPORTUNITY EXCHANGE TEST SUITE");
  console.log("====================================================");

  // 1. Global User Preferences & Location Hierarchy
  test("GlobalPreferences", "Persists country, city, timezone and language preferences", () => {
    const prefs = globalOpportunityExchangeDatabase.getUserPreferences('usr_student_dileep');
    assert(prefs.country === 'India', "Default country must be India");
    assert(prefs.city === 'Chennai', "Default city must be Chennai (Vel Tech)");
    assert(prefs.timezone === 'Asia/Kolkata', "Default timezone must be Asia/Kolkata");

    const updated = globalOpportunityExchangeDatabase.updateUserPreferences('usr_student_dileep', {
      relocationInterest: true,
      language: 'en'
    });
    assert(updated.relocationInterest === true, "Relocation interest should be persisted");
  });

  // 2. Multi-Currency Engine & Rate Source Metadata
  test("MultiCurrencyEngine", "Supports 9 currencies with rate source and dual-pricing", () => {
    const currencies = globalizationService.getSupportedCurrencies();
    assert(currencies.length === 9, `Must support 9 currencies (found ${currencies.length})`);

    const usdRate = globalizationService.getExchangeRate('USD');
    assert(usdRate !== null, "USD rate must exist");
    assert(Boolean(usdRate?.rateSource.includes('Federal Reserve') || usdRate?.rateSource.includes('FX')), "Must cite authoritative rate source");

    const dualPrice = globalizationService.formatDualPrice(150000, 'USD');
    assert(dualPrice.formattedOriginal.includes('₹'), "Dual price must retain original ₹ reference");
    assert(Boolean(dualPrice.formattedApprox?.includes('$')), "Dual price must format approx USD");
  });

  // 3. Natural Language Query Parser
  test("NaturalLanguageSearch", "Parses natural language queries into structured opportunity filters", () => {
    const parsed1 = globalOpportunityExchangeDatabase.parseNaturalLanguageQuery("Find AI fellowships in Canada");
    assert(parsed1.category === 'FELLOWSHIP', "Should extract FELLOWSHIP category");
    assert(parsed1.country === 'Canada', "Should extract Canada as country");
    assert(Boolean(parsed1.requiredSkills?.includes('Autonomous AI Agents')), "Should extract AI skill");

    const parsed2 = globalOpportunityExchangeDatabase.parseNaturalLanguageQuery("Show remote robotics hackathons in India");
    assert(parsed2.category === 'HACKATHON', "Should extract HACKATHON category");
    assert(parsed2.country === 'India', "Should extract India as country");
    assert(parsed2.isRemote === true, "Should extract isRemote=true");
  });

  // 4. Duplicate Ingestion Detection Pipeline
  test("DuplicateDetection", "Detects and prevents duplicate opportunity listings across providers", () => {
    const all = globalOpportunityExchangeDatabase.getAllOpportunities();
    const existing = all[0];

    // Attempt to ingest identical opportunity
    const result = globalOpportunityExchangeDatabase.ingestOpportunity({
      title: existing.title,
      slug: 'duplicate-test',
      category: existing.category,
      providerName: existing.providerName,
      providerType: existing.providerType,
      providerLogoUrl: existing.providerLogoUrl,
      location: existing.location,
      isRemote: existing.isRemote,
      eligibility: existing.eligibility,
      requiredSkills: existing.requiredSkills,
      targetDepartments: existing.targetDepartments,
      minExperienceLevel: existing.minExperienceLevel,
      deadline: existing.deadline,
      stipendOrPrizeINR: existing.stipendOrPrizeINR,
      stipendOrPrizeDisplay: existing.stipendOrPrizeDisplay,
      isPaid: existing.isPaid,
      sourceType: existing.sourceType,
      sourceUrl: existing.sourceUrl,
      verificationStatus: existing.verificationStatus,
      trustScore: existing.trustScore,
      lastVerifiedAt: existing.lastVerifiedAt
    });

    assert(result.isDuplicate === true, "Pipeline must flag duplicate ingestion");
    assert(result.success === false, "Duplicate ingestion must be rejected");
  });

  // 5. Time-Bucketed Deadline Categorization
  test("GlobalDeadlineBuckets", "Groups opportunities into time-bucketed urgency buckets", () => {
    const buckets = globalOpportunityExchangeDatabase.getDeadlinesByBucket();
    assert(Array.isArray(buckets.TODAY), "Must have TODAY bucket");
    assert(Array.isArray(buckets.THIS_WEEK), "Must have THIS_WEEK bucket");
    assert(Array.isArray(buckets.LATER), "Must have LATER bucket");
  });

  // 6. Side-by-Side Opportunity Comparison
  test("OpportunityComparison", "Loads and aligns comparison criteria across multiple opportunities", () => {
    const all = globalOpportunityExchangeDatabase.getAllOpportunities();
    const ids = [all[0].id, all[1].id];
    const compared = globalOpportunityExchangeDatabase.compareOpportunities(ids);
    assert(compared.length === 2, "Must return selected items for side-by-side comparison");
    assert(compared[0].trustScore >= 90, "First compared item must retain verified trust score");
  });

  // 7. Fraud & Scam Reporting Workflow
  test("ScamReportWorkflow", "Submits and tracks opportunity fraud and scam investigation tickets", () => {
    const all = globalOpportunityExchangeDatabase.getAllOpportunities();
    const report = globalOpportunityExchangeDatabase.submitScamReport(
      all[0].id,
      'MISLEADING',
      'Eligibility requires external verification fee clarification.'
    );
    assert(report.status === 'NEW', "Initial report state must be NEW");
    assert(report.reporterUserId === 'usr_student_dileep', "Reporter must be authenticated student");

    const allReports = globalOpportunityExchangeDatabase.getAllScamReports();
    assert(allReports.some(r => r.id === report.id), "Report must be persisted in moderation queue");
  });

  // 8. Saved Searches & Alert Subscriptions
  test("SavedSearches", "Creates and manages saved search queries with notification preferences", () => {
    const s = globalOpportunityExchangeDatabase.saveSearch(
      'usr_student_dileep',
      'AI Internships Canada',
      { country: 'Canada', isRemote: true }
    );
    assert(s.alertsEnabled === true, "Alerts must be enabled by default");

    const userSearches = globalOpportunityExchangeDatabase.getSavedSearches('usr_student_dileep');
    assert(userSearches.length > 0, "Must retrieve saved searches");

    const deleted = globalOpportunityExchangeDatabase.deleteSavedSearch(s.id);
    assert(deleted === true, "Must support saved search deletion");
  });

  // 9. Marketplace Billing, Invoices & Auditable Refunds
  test("MarketplaceBilling", "Creates multi-currency orders, generates invoices and handles refund tickets", () => {
    const order = marketplaceBillingDatabase.createOrder({
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      itemTitle: 'Autonomous AI Agents Specialized Certification Voucher',
      itemType: 'ASSESSMENT_VOUCHER',
      baseAmountINR: 1999,
      currency: 'USD',
      paymentGateway: 'STRIPE_INTERNATIONAL'
    });

    assert(order.status === 'PAID', "Order should be created with PAID status");
    assert(order.totalAmountINR > order.baseAmountINR, "Total must include jurisdiction tax");
    assert(order.invoiceNumber.startsWith('INV-'), "Must generate invoice number");

    const refund = marketplaceBillingDatabase.requestRefund(order.id, 'Accidental duplicate voucher purchase');
    assert(refund !== null, "Refund record must be created");
    assert(refund?.status === 'REQUESTED', "Initial refund state must be REQUESTED");
  });

  // 10. AI Global Opportunity Assistant & Grounded Eligibility
  test("AIGlobalOpportunityAssistant", "Answers queries grounded in Vel Tech student passport records", () => {
    const res = aiGlobalOpportunityAssistantDatabase.answerGroundedQuery("Find AI fellowships in Canada");
    assert(res.confidenceScore >= 0.95, "Confidence score must be high");
    assert(res.matchedOpportunities.length > 0, "Must return matched verified opportunities");
    assert(res.eligibilityExplanation.includes('Vel Tech'), "Must cite authentic Vel Tech student record");
  });

  return results;
}
