import { runAudit, detectOverlap } from "./auditEngine";

// Test 1 — Cursor Business with 2 seats should recommend downgrade
function test1() {
  const form = {
    teamSize: "2",
    useCase: "coding",
    tools: {
      cursor: { planId: "business", seats: 2, monthlySpend: "80" },
    },
  };
  const result = runAudit(form);
  const cursorResult = result.results[0];
  console.assert(
    cursorResult.recommendation.action === "downgrade",
    "❌ Test 1 Failed: Cursor Business with 2 seats should downgrade"
  );
  console.log("✅ Test 1 Passed: Cursor Business downgrade detected");
}

// Test 2 — Total savings calculated correctly
function test2() {
  const form = {
    teamSize: "3",
    useCase: "coding",
    tools: {
      cursor: { planId: "business", seats: 3, monthlySpend: "120" },
    },
  };
  const result = runAudit(form);
  console.assert(
    result.totalMonthlySavings === 60,
    `❌ Test 2 Failed: Expected $60 savings, got $${result.totalMonthlySavings}`
  );
  console.log("✅ Test 2 Passed: Monthly savings calculated correctly");
}

// Test 3 — Annual savings = monthly * 12
function test3() {
  const form = {
    teamSize: "2",
    useCase: "coding",
    tools: {
      cursor: { planId: "business", seats: 2, monthlySpend: "80" },
    },
  };
  const result = runAudit(form);
  console.assert(
    result.totalAnnualSavings === result.totalMonthlySavings * 12,
    "❌ Test 3 Failed: Annual savings should be monthly * 12"
  );
  console.log("✅ Test 3 Passed: Annual savings calculation correct");
}

// Test 4 — Overlap detected for 2 coding tools
function test4() {
  const tools = {
    cursor: { planId: "pro", seats: 2, monthlySpend: "40" },
    github_copilot: { planId: "individual", seats: 2, monthlySpend: "20" },
  };
  const overlaps = detectOverlap(tools);
  console.assert(
    overlaps.length > 0,
    "❌ Test 4 Failed: Should detect coding tool overlap"
  );
  console.log("✅ Test 4 Passed: Coding tool overlap detected");
}

// Test 5 — Optimal plan returns no savings
function test5() {
  const form = {
    teamSize: "1",
    useCase: "coding",
    tools: {
      cursor: { planId: "pro", seats: 1, monthlySpend: "20" },
    },
  };
  const result = runAudit(form);
  console.assert(
    result.totalMonthlySavings === 0,
    "❌ Test 5 Failed: Optimal plan should have 0 savings"
  );
  console.log("✅ Test 5 Passed: Optimal plan returns zero savings");
}

// Run all tests
console.log("Running audit engine tests...\n");
test1();
test2();
test3();
test4();
test5();
console.log("\nAll tests complete.");