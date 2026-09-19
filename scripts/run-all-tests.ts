// Script wrapper to invoke Master Test Runner
import { runMasterTestSuite } from '../src/tests/run_all_test_suites';

runMasterTestSuite().catch((err) => {
  console.error('Error running test suite:', err);
  process.exit(1);
});
