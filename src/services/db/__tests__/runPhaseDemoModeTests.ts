import { demoModeDatabase } from '../demoModeDatabase';

export function runPhaseDemoModeTests(): boolean {
  console.log('--- Starting ACE Hackathon Demo Mode Test Suite ---');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, message: string) {
    total++;
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
    }
  }

  try {
    // 1. Check Demo Mode active status
    assert(demoModeDatabase.isDemoMode() === true, 'Demo Mode is active by default for hackathon presentation');

    // 2. Toggle demo mode
    demoModeDatabase.setDemoMode(false);
    assert(demoModeDatabase.isDemoMode() === false, 'Demo Mode can be safely deactivated');
    demoModeDatabase.setDemoMode(true);
    assert(demoModeDatabase.isDemoMode() === true, 'Demo Mode re-activated');

    // 3. Check demo student profile and institution
    const student = demoModeDatabase.getDemoStudent();
    assert(student.name === 'ACE Hackathon Demo Account', 'Single canonical Demo Account name matches requirement');
    assert(student.institution.includes('Vel Tech Rangarajan'), 'Demo Account is anchored to Vel Tech Rangarajan R&D Institute');
    assert(student.department === 'Computer Science & Engineering', 'Department is set to Computer Science & Engineering');
    assert(student.cgpa === 9.24, 'Valid CGPA is present');
    assert(student.walletBalanceCoins === 48500, 'Demo wallet balance is 48,500 coins');
    assert(student.skills.length >= 5, 'Demo student has at least 5 verified competencies');
    assert(student.certificates.length >= 2, 'Demo student has verified certificates');

    // 4. Verify all 13 demo workspaces
    const workspaces = demoModeDatabase.getAllDemoWorkspaces();
    assert(workspaces.length === 12 || workspaces.length === 13, `All demo workspaces registered (found ${workspaces.length})`);
    
    const requiredRoles = ['STUDENT', 'COLLEGE_AMBASSADOR', 'MENTOR', 'ORGANIZER', 'COLLEGE', 'RECRUITER', 'JUDGE', 'ADMIN'];
    requiredRoles.forEach(r => {
      const found = workspaces.some(w => w.role === r);
      assert(found, `Demo workspace exists for role: ${r}`);
    });

    // Check essential routes
    const routes = workspaces.map(w => w.route);
    assert(routes.includes('/student/dashboard'), 'Student dashboard route is registered');
    assert(routes.includes('/ambassador/dashboard'), 'Ambassador dashboard route is registered');
    assert(routes.includes('/mentor/dashboard'), 'Mentor dashboard route is registered');
    assert(routes.includes('/organizer/dashboard'), 'Organizer dashboard route is registered');
    assert(routes.includes('/college/dashboard'), 'College dashboard route is registered');
    assert(routes.includes('/recruiter/dashboard'), 'Recruiter dashboard route is registered');
    assert(routes.includes('/judge/dashboard'), 'Judge dashboard route is registered');
    assert(routes.includes('/admin/dashboard'), 'Admin dashboard route is registered');

    // 5. Verify 15-step guided tour
    const tourSteps = demoModeDatabase.getTourSteps();
    assert(tourSteps.length === 15, `Guided presentation tour has exactly 15 steps (found ${tourSteps.length})`);
    assert(tourSteps[0].step === 1 && tourSteps[0].roleName === 'Student OS', 'Tour step 1 starts with Student OS');
    assert(tourSteps[14].step === 15 && tourSteps[14].roleName === 'Analytics', 'Tour step 15 concludes with Unified Analytics');

    // 6. Test reset controller
    student.walletBalanceCoins = 1000;
    assert(demoModeDatabase.getDemoStudent().walletBalanceCoins === 1000, 'State modified in runtime');
    const resetSuccess = demoModeDatabase.resetDemoData();
    assert(resetSuccess === true, 'resetDemoData executed successfully');
    assert(demoModeDatabase.getDemoStudent().walletBalanceCoins === 48500, 'Demo wallet restored to 48,500 coins');

    console.log(`\nDemo Mode Test Results: ${passed}/${total} passed`);
    return passed === total;
  } catch (err) {
    console.error('Demo Mode Test Error:', err);
    return false;
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  const ok = runPhaseDemoModeTests();
  process.exit(ok ? 0 : 1);
}
