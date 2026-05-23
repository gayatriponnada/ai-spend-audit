import { TOOLS } from "./pricingData";

// Main function — takes form data, returns audit results
export function runAudit(formData) {
  const { teamSize, useCase, tools } = formData;
  const team = parseInt(teamSize);
  const results = [];

  for (const toolId in tools) {
    const userTool = tools[toolId];
    const toolInfo = TOOLS.find((t) => t.id === toolId);
    if (!toolInfo) continue;

    const currentPlan = toolInfo.plans.find((p) => p.id === userTool.planId);
    if (!currentPlan) continue;

    const seats = parseInt(userTool.seats) || 1;
    const currentSpend = parseFloat(userTool.monthlySpend) || 
                         currentPlan.pricePerSeat * seats;

    const recommendation = getRecommendation(
      toolId, toolInfo, currentPlan, 
      seats, team, useCase, currentSpend
    );

    results.push({
      toolId,
      toolName: toolInfo.name,
      currentPlan: currentPlan.name,
      currentSpend,
      seats,
      recommendation,
      monthlySavings: Math.max(0, currentSpend - recommendation.recommendedSpend),
    });
  }

  const totalMonthlySavings = results.reduce(
    (sum, r) => sum + r.monthlySavings, 0
  );

  return {
    results,
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalAnnualSavings: Math.round(totalMonthlySavings * 12),
    teamSize: team,
    useCase,
  };
}

function getRecommendation(
  toolId, toolInfo, currentPlan, 
  seats, teamSize, useCase, currentSpend
) {
  // Check each tool specifically
  switch (toolId) {
    case "cursor":
      return auditCursor(currentPlan, seats, teamSize, useCase, currentSpend);
    case "github_copilot":
      return auditCopilot(currentPlan, seats, teamSize, useCase, currentSpend);
    case "claude":
      return auditClaude(currentPlan, seats, teamSize, useCase, currentSpend);
    case "chatgpt":
      return auditChatGPT(currentPlan, seats, teamSize, useCase, currentSpend);
    case "gemini":
      return auditGemini(currentPlan, seats, teamSize, useCase, currentSpend);
    case "windsurf":
      return auditWindsurf(currentPlan, seats, teamSize, useCase, currentSpend);
    default:
      return {
        action: "keep",
        reason: "No specific recommendation available.",
        recommendedPlan: currentPlan.name,
        recommendedSpend: currentSpend,
      };
  }
}

// ─── Individual tool audit functions ───────────────────────────

function auditCursor(currentPlan, seats, teamSize, useCase, currentSpend) {
  // Business plan for less than 5 users is overkill
  if (currentPlan.id === "business" && seats < 5) {
    const recommended = 20 * seats;
    return {
      action: "downgrade",
      reason: `You have ${seats} seats on Business ($40/seat). For teams under 5, Pro ($20/seat) covers all core features and saves you $${currentSpend - recommended}/mo.`,
      recommendedPlan: "Pro",
      recommendedSpend: recommended,
    };
  }

  // If use case is not coding, suggest switching
  if (useCase !== "coding" && useCase !== "mixed") {
    return {
      action: "switch",
      reason: `Cursor is a coding tool but your primary use case is ${useCase}. Consider Claude Pro ($20/mo) which is better suited for your needs.`,
      recommendedPlan: "Switch to Claude Pro",
      recommendedSpend: 20,
    };
  }

  // Hobby plan — already free
  if (currentPlan.id === "hobby") {
    return {
      action: "optimal",
      reason: "You're on the free Hobby plan. Nothing to optimize here.",
      recommendedPlan: "Hobby",
      recommendedSpend: 0,
    };
  }

  return {
    action: "optimal",
    reason: `Cursor ${currentPlan.name} is well-suited for a coding team of ${seats}. You're spending efficiently.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

function auditCopilot(currentPlan, seats, teamSize, useCase, currentSpend) {
  // If they also use Cursor — overlap!
  // We handle overlap separately in the overlap check

  // Enterprise for small team is overkill
  if (currentPlan.id === "enterprise" && seats < 20) {
    const recommended = 19 * seats;
    return {
      action: "downgrade",
      reason: `GitHub Copilot Enterprise ($39/seat) is designed for large orgs. With ${seats} seats, Business ($19/seat) gives the same coding assistance and saves $${currentSpend - recommended}/mo.`,
      recommendedPlan: "Business",
      recommendedSpend: recommended,
    };
  }

  // Not a coding team
  if (useCase !== "coding" && useCase !== "mixed") {
    return {
      action: "switch",
      reason: `GitHub Copilot is built for coding but your use case is ${useCase}. ChatGPT Plus ($20/mo) would be more versatile for your needs.`,
      recommendedPlan: "Switch to ChatGPT Plus",
      recommendedSpend: 20,
    };
  }

  return {
    action: "optimal",
    reason: `GitHub Copilot ${currentPlan.name} is a solid choice for your coding team of ${seats}.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

function auditClaude(currentPlan, seats, teamSize, useCase, currentSpend) {
  // Max plan — very expensive, check if justified
  if (currentPlan.id === "max" && seats > 1) {
    const recommended = 30 * seats;
    return {
      action: "downgrade",
      reason: `Claude Max ($100/seat) is for power users with very high usage. For most teams, Claude Team ($30/seat) provides ample limits and saves $${currentSpend - recommended}/mo.`,
      recommendedPlan: "Team",
      recommendedSpend: recommended,
    };
  }

  // Pro for multiple people — should be on Team
  if (currentPlan.id === "pro" && seats >= 3) {
    const recommended = 30 * seats;
    if (recommended < currentSpend) {
      return {
        action: "upgrade",
        reason: `With ${seats} users on Pro ($20/seat), switching to Team ($30/seat) gives you a shared workspace, admin controls, and better collaboration features worth the small increase.`,
        recommendedPlan: "Team",
        recommendedSpend: recommended,
      };
    }
  }

  // Free plan
  if (currentPlan.id === "free") {
    return {
      action: "optimal",
      reason: "You're on the free plan. Upgrade to Pro only if you hit usage limits.",
      recommendedPlan: "Free",
      recommendedSpend: 0,
    };
  }

  return {
    action: "optimal",
    reason: `Claude ${currentPlan.name} is a good fit for your ${useCase} use case.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

function auditChatGPT(currentPlan, seats, teamSize, useCase, currentSpend) {
  // Enterprise for small team
  if (currentPlan.id === "enterprise" && seats < 15) {
    const recommended = 30 * seats;
    return {
      action: "downgrade",
      reason: `ChatGPT Enterprise is designed for large companies. With ${seats} seats, Team ($30/seat) covers all features your team needs and saves $${currentSpend - recommended}/mo.`,
      recommendedPlan: "Team",
      recommendedSpend: recommended,
    };
  }

  // Plus for multiple users — should be Team
  if (currentPlan.id === "plus" && seats >= 3) {
    return {
      action: "upgrade",
      reason: `With ${seats} people on Plus ($20/seat), ChatGPT Team ($30/seat) adds shared workspace and admin controls — better value for a team.`,
      recommendedPlan: "Team",
      recommendedSpend: 30 * seats,
    };
  }

  return {
    action: "optimal",
    reason: `ChatGPT ${currentPlan.name} is appropriate for your team size and ${useCase} use case.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

function auditGemini(currentPlan, seats, teamSize, useCase, currentSpend) {
  // Ultra for small team or non-research use
  if (currentPlan.id === "ultra" && useCase !== "research" && seats < 5) {
    const recommended = 20 * seats;
    return {
      action: "downgrade",
      reason: `Gemini Ultra ($30/seat) is overkill for ${useCase} with ${seats} seats. Gemini Pro ($20/seat) handles most tasks and saves $${currentSpend - recommended}/mo.`,
      recommendedPlan: "Pro",
      recommendedSpend: recommended,
    };
  }

  if (currentPlan.id === "free") {
    return {
      action: "optimal",
      reason: "You're on the free Gemini plan. Well optimized.",
      recommendedPlan: "Free",
      recommendedSpend: 0,
    };
  }

  return {
    action: "optimal",
    reason: `Gemini ${currentPlan.name} is a reasonable choice for ${useCase}.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

function auditWindsurf(currentPlan, seats, teamSize, useCase, currentSpend) {
  // Not a coding team
  if (useCase !== "coding" && useCase !== "mixed") {
    return {
      action: "switch",
      reason: `Windsurf is a coding tool but your use case is ${useCase}. You'd get more value from Claude Pro ($20/mo).`,
      recommendedPlan: "Switch to Claude Pro",
      recommendedSpend: 20,
    };
  }

  if (currentPlan.id === "free") {
    return {
      action: "optimal",
      reason: "You're on the free Windsurf plan. Well optimized.",
      recommendedPlan: "Free",
      recommendedSpend: 0,
    };
  }

  return {
    action: "optimal",
    reason: `Windsurf ${currentPlan.name} is a cost-effective coding assistant for your team.`,
    recommendedPlan: currentPlan.name,
    recommendedSpend: currentSpend,
  };
}

// ─── Overlap detection ─────────────────────────────────────────
export function detectOverlap(tools) {
  const overlaps = [];
  const toolIds = Object.keys(tools);

  const codingTools = ["cursor", "github_copilot", "windsurf"];
  const chatTools = ["claude", "chatgpt", "gemini"];

  const userCodingTools = toolIds.filter((id) => codingTools.includes(id));
  const userChatTools = toolIds.filter((id) => chatTools.includes(id));

  if (userCodingTools.length >= 2) {
    overlaps.push({
      type: "coding_overlap",
      tools: userCodingTools,
      message: `You're paying for ${userCodingTools.length} coding assistants (${userCodingTools.join(", ")}). Most developers only need one. Consider keeping your favorite and cancelling the rest.`,
    });
  }

  if (userChatTools.length >= 3) {
    overlaps.push({
      type: "chat_overlap",
      tools: userChatTools,
      message: `You're subscribed to ${userChatTools.length} AI chat tools. Pick your primary one and use free tiers for the others.`,
    });
  }

  return overlaps;
}