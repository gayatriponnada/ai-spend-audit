import { useEffect, useState } from "react";
import { runAudit, detectOverlap } from "../engine/auditEngine";
import { generateAISummary } from "../utils/generateSummary";
import { useNavigate } from "react-router-dom";
import EmailCapture from "../components/EmailCapture";

const ACTION_STYLES = {
  optimal: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    label: "✅ Optimal",
  },
  downgrade: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    label: "⬇️ Downgrade",
  },
  upgrade: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    label: "⬆️ Upgrade",
  },
  switch: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    label: "🔄 Switch Tool",
  },
};

export default function Results() {
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [overlaps, setOverlaps] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("auditForm");
    if (!saved) {
      navigate("/audit");
      return;
    }

    const formData = JSON.parse(saved);
    const auditResult = runAudit(formData);
    const overlapResult = detectOverlap(formData.tools);
    setAudit(auditResult);
    setOverlaps(overlapResult);

    // Generate AI summary
    generateAISummary(auditResult).then((summary) => {
      setAiSummary(summary);
      setSummaryLoading(false);
      // Store summary in audit for email capture
      auditResult.aiSummary = summary;
    });

    // Check if already submitted email
    const lastId = localStorage.getItem("lastAuditId");
    if (lastId) {
      setShareUrl(`${window.location.origin}/share/${lastId}`);
      setEmailDone(true);
    }
  }, []);

  const handleEmailSuccess = (auditId) => {
    const url = `${window.location.origin}/share/${auditId}`;
    setShareUrl(url);
    setEmailDone(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!audit) return null;

  const { results, totalMonthlySavings, totalAnnualSavings } = audit;

  return (
    <div className="flex flex-col items-center px-4 py-8">
  <div className="w-full max-w-2xl flex flex-col gap-6">
      {/* Hero savings */}
      <div
        className={`rounded-2xl p-6 sm:p-8 text-center
        ${
          totalMonthlySavings > 0
            ? "bg-linear-to-br from-primary to-purple-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {totalMonthlySavings > 0 ? (
          <>
            <div className="text-sm font-medium opacity-80 mb-1">
              Potential savings found
            </div>
            <div className="text-4xl sm:text-5xl font-bold mb-1">
              ${totalMonthlySavings}/mo
            </div>
            <div className="text-lg opacity-90">
              That's ${totalAnnualSavings} saved per year
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-xl font-bold mb-1">You're spending well!</div>
            <div className="text-gray-500 text-sm">
              No major optimizations found. Your AI stack looks efficient.
            </div>
          </>
        )}
      </div>

      {/* AI Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🤖</span>
          <span className="font-semibold text-gray-800">AI Analysis</span>
        </div>
        {summaryLoading ? (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            Generating your personalized summary...
          </div>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed">{aiSummary}</p>
        )}
      </div>

      {/* Credex CTA */}
      {totalMonthlySavings > 500 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-indigo-900 mb-1">
              💡 Save even more with Credex
            </div>
            <div className="text-sm text-indigo-700">
              Credex offers discounted AI credits for Cursor, Claude, ChatGPT
              and more.
            </div>
          </div>
          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-indigo-700 transition"
          >
            Talk to Credex →
          </a>
        </div>
      )}

      {/* Overlap warnings */}
      {overlaps.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-gray-800">⚠️ Overlapping Tools</h2>
          {overlaps.map((overlap, i) => (
            <div
              key={i}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800"
            >
              {overlap.message}
            </div>
          ))}
        </div>
      )}

      {/* Per tool breakdown */}
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-gray-800 text-lg">
          Per Tool Breakdown
        </h2>
        {results.map((result) => {
          const style =
            ACTION_STYLES[result.recommendation.action] ||
            ACTION_STYLES.optimal;
          return (
            <div
              key={result.toolId}
              className={`flex flex-col gap-4 rounded-xl border p-4 sm:p-5 ${style.bg} ${style.border}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-semibold text-gray-900">
                    {result.toolName}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>
                {result.monthlySavings > 0 && (
                  <span className="text-green-700 font-semibold text-sm whitespace-nowrap">
                    Save ${result.monthlySavings}/mo
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Current plan</div>
                  <div className="font-medium text-gray-800">
                    {result.currentPlan}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Current spend</div>
                  <div className="font-medium text-gray-800">
                    ${result.currentSpend}/mo
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Recommended</div>
                  <div className="font-medium text-gray-800">
                    {result.recommendation.recommendedPlan}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 bg-white/60 rounded-lg p-3">
                {result.recommendation.reason}
              </div>
            </div>
          );
        })}
      </div>

      {/* Email capture OR share URL */}
      {!emailDone ? (
        <EmailCapture
          auditData={{ ...audit, aiSummary }}
          onSuccess={handleEmailSuccess}
        />
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col gap-3">
          <div className="font-semibold text-green-800">
            ✅ Report saved! Share your audit
          </div>
          <p className="text-sm text-green-700">
            Anyone with this link can see your savings summary (personal info is
            hidden).
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 border border-green-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700"
            />
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition whitespace-nowrap cursor-pointer"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row gap-3 pb-6">
        <button
          onClick={() => navigate("/audit")}
          className="btn  flex-1 border bg-secondary border-gray-300 text-white py-3 rounded-xl text-sm font-medium hover:bg-primary  transition"
        >
          ← Edit My Tools
        </button>
        <button
          onClick={() => navigate("/")}
          className=" btn flex-1 border border-gray-300 text-gray-700  py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
        >
          🏠 Home
        </button>
      </div>
    </div>
    </div>
  );
}
