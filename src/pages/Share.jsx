import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Share() {
  const { auditId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchAudit() {
      const { data: lead, error } = await supabase
        .from("leads")
        .select(
          "total_monthly_savings, total_annual_savings, audit_data, ai_summary, team_size",
        )
        .eq("audit_id", auditId)
        .single();

      if (error || !lead) {
        setNotFound(true);
      } else {
        setData(lead);
      }
      setLoading(false);
    }
    fetchAudit();
  }, [auditId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        Loading audit...
      </div>
    );

  if (notFound)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="text-4xl">🔍</div>
        <div className="font-semibold text-gray-800">Audit not found</div>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm"
        >
          Run Your Own Audit →
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Shared badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 text-center">
          📊 This is a shared AI Spend Audit — personal details are hidden
        </div>

        {/* Hero */}
        <div
          className={`rounded-2xl p-6 text-center
        ${
          data.total_monthly_savings > 0
            ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
        >
          {data.total_monthly_savings > 0 ? (
            <>
              <div className="text-sm opacity-80 mb-1">
                Potential monthly savings
              </div>
              <div className="text-4xl font-bold mb-1">
                ${data.total_monthly_savings}/mo
              </div>
              <div className="text-lg opacity-90">
                ${data.total_annual_savings} saved per year
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl mb-2">🎉</div>
              <div className="text-xl font-bold">Spending efficiently!</div>
            </>
          )}
        </div>

        {/* AI Summary */}
        {data.ai_summary && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span>🤖</span>
              <span className="font-semibold text-gray-800">AI Analysis</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.ai_summary}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 text-center flex flex-col gap-3">
          <div className="font-bold text-gray-900">
            Want to audit your own AI spend?
          </div>
          <p className="text-sm text-gray-500">
            Free, instant, no login required.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            Run My Free Audit →
          </button>
        </div>
      </div>
    </div>
  );
}
