// Master test suite runner with browser environment polyfill for CLI / CI execution
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = String(val); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    key: (i: number) => Object.keys(store)[i] || null,
    length: Object.keys(store).length
  } as any;
}

import { runPhaseDemoModeTests } from '../services/db/__tests__/runPhaseDemoModeTests';
import { runPhase160XTests } from '../services/db/__tests__/runPhase160XTests';
import { runPhase150XTests } from '../services/db/__tests__/runPhase150XTests';
import { runPhase120XTests } from '../services/db/__tests__/runPhase120XTests';
import { runPhase110XTests } from '../services/db/__tests__/runPhase110XTests';
import { runPhase100XTests } from '../services/db/__tests__/runPhase100XTests';
import { runPhase90XTests } from '../services/db/__tests__/runPhase90XTests';
import { runPhase80XTests } from '../services/db/__tests__/runPhase80XTests';
import { runPhase70XCoverageTests } from '../services/db/__tests__/runPhase70XCoverageTests';
import { runPhase70XTests } from '../services/db/__tests__/runPhase70XTests';
import { runPhase60XTests } from '../services/db/__tests__/runPhase60XTests';
import { runAllPhase50XTests } from '../services/db/__tests__/runPhase50XTests';
import { runAllPhase30XTests } from '../services/db/__tests__/runPhase30XTests';
import { runAllPhase25XTests } from '../services/db/__tests__/runPhase25XTests';
import { runAllPhase20XTests } from '../services/db/__tests__/runPhase20XTests';
import { runAllPhase10XTests } from '../services/db/__tests__/runPhase10XTests';
import { runAllPhase3Tests } from '../services/db/__tests__/runPhase3Tests';
import { runAllPhase2Tests } from '../services/db/__tests__/runPhase2Tests';
import { runAllProductionTests } from '../services/db/__tests__/runProductionHardeningTests';
import { runAllMentorshipTests } from '../services/db/__tests__/runMentorshipTests';
import { executeTestSuite, results as persistenceResults } from '../services/db/__tests__/runPersistenceTests';

export async function runMasterTestSuite() {
  console.log('\n>>> EXECUTING MASTER NEXUS CAMPUS AUTOMATED VERIFICATION SUITE <<<\n');

  console.log('====================================================');
  console.log(' NEXUS HACKATHON DEMO MODE — ALL DASHBOARDS ACCESS HUB');
  console.log('====================================================\n');
  const demoPassed = runPhaseDemoModeTests();
  const demoRes = [{
    name: 'Hackathon Demo Mode Suite (Isolated State, 13 Workspaces, Tour & Reset)',
    passed: demoPassed,
    error: demoPassed ? undefined : 'Demo Mode Tests Encountered Failures'
  }];

  console.log('\n====================================================');
  console.log(' NEXUS 160X — UNIVERSAL DASHBOARD HUB & MULTI-WORKSPACE OS');
  console.log('====================================================\n');
  const phase160xRaw = runPhase160XTests();
  const phase160xRes = phase160xRaw.details.map(d => ({
    name: d.replace(/^\[(PASS|FAIL)\]\s*/, ''),
    passed: d.startsWith('[PASS]'),
    error: d.startsWith('[FAIL]') ? d : undefined
  }));
  phase160xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 150X — THE ULTIMATE NEXUS SUPER PLATFORM');
  console.log('====================================================\n');
  const phase150xRaw = runPhase150XTests();
  const phase150xRes = phase150xRaw.details.map(d => ({
    name: d.replace(/^\[(PASS|FAIL)\]\s*/, ''),
    passed: d.startsWith('[PASS]'),
    error: d.startsWith('[FAIL]') ? d : undefined
  }));
  phase150xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 120X — AUTONOMOUS WORKFLOW OS & AGENTS');
  console.log('====================================================\n');
  const phase120xRes = await runPhase120XTests();
  phase120xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 110X — GLOBAL OPPORTUNITY EXCHANGE & MULTI-CURRENCY');
  console.log('====================================================\n');
  const phase110xRes = await runPhase110XTests();
  phase110xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 100X — AI-NATIVE STUDENT SUCCESS ENGINE');
  console.log('====================================================\n');
  const phase100xRes = await runPhase100XTests();
  phase100xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 90X — CAMPUS SOCIAL & COLLABORATION OS');
  console.log('====================================================\n');
  const phase90xRes = await runPhase90XTests();
  phase90xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  console.log('\n====================================================');
  console.log(' NEXUS 80X — DIGITAL STUDENT PASSPORT & CREDENTIALS');
  console.log('====================================================\n');
  const phase80xRes = await runPhase80XTests();
  phase80xRes.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
    if (r.error) console.log(`     Error: ${r.error}`);
  });

  const coverageRes = await runPhase70XCoverageTests();
  const phase70xRes = await runPhase70XTests();
  const phase60xRes = await runPhase60XTests();
  const phase50xRes = runAllPhase50XTests();
  const phase30xRes = runAllPhase30XTests();
  const phase25xRes = runAllPhase25XTests();
  const phase20xRes = runAllPhase20XTests();
  const phase10xRes = runAllPhase10XTests();
  const phase3Res = runAllPhase3Tests();
  const phase2Res = runAllPhase2Tests();
  const hardeningRes = runAllProductionTests();
  const mentorshipRes = runAllMentorshipTests();
  await executeTestSuite();

  const allTests = [
    ...demoRes,
    ...phase160xRes,
    ...phase150xRes,
    ...phase120xRes,
    ...phase110xRes,
    ...phase100xRes,
    ...phase90xRes,
    ...phase80xRes,
    ...coverageRes,
    ...phase70xRes,
    ...phase60xRes,
    ...phase50xRes,
    ...phase30xRes,
    ...phase25xRes,
    ...phase20xRes,
    ...phase10xRes,
    ...phase3Res,
    ...phase2Res, 
    ...hardeningRes, 
    ...mentorshipRes, 
    ...persistenceResults
  ];
  const totalPassed = allTests.filter(t => t.passed).length;
  const totalFailed = allTests.filter(t => !t.passed).length;

  console.log('\n=============================================================');
  console.log(` MASTER SUITE TOTAL: ${totalPassed}/${allTests.length} PASSED (Failures: ${totalFailed})`);
  console.log('=============================================================\n');

  if (totalFailed > 0) {
    console.log('FAILED TESTS:');
    allTests.filter(t => !t.passed).forEach(t => {
      console.log(`  ✗ ${t.name}: ${t.error || 'Unknown error'}`);
    });
    process.exit(1);
  } else {
    console.log('ALL NEXUS CAMPUS ECOSYSTEM TEST SUITES (100%) PASSED WITH ZERO REGRESSIONS.');
  }
}

if (typeof process !== 'undefined') {
  runMasterTestSuite().catch((err) => {
    console.error('Master Test Suite encountered an unhandled exception:', err);
    process.exit(1);
  });
}
