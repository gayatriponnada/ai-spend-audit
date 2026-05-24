export async function generateAISummary(auditData) {
 
  return fallbackSummary(auditData)
}

function fallbackSummary({ 
  totalMonthlySavings, totalAnnualSavings, teamSize, results 
}) {
  if (!results || results.length === 0) {
    return `Based on your audit, no significant optimizations were found for your current AI stack.`
  }

  if (totalMonthlySavings === 0) {
    return `Based on your audit, your team of ${teamSize} is spending efficiently on AI tools. No major optimizations were found — you've made smart choices with your current stack. Keep reviewing quarterly as new plans and tools emerge that may offer better value.`
  }

  const top = results.reduce((max, r) =>
    r.monthlySavings > max.monthlySavings ? r : max, results[0]
  )

  return `Based on your audit, your team of ${teamSize} could save $${totalMonthlySavings} per month — that's $${totalAnnualSavings} per year — by optimizing your AI tool subscriptions. The biggest opportunity is with ${top?.toolName}, where a simple plan adjustment could reduce costs immediately with no workflow disruption.`
}