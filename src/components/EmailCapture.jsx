import { useState } from "react";
import { supabase } from "../utils/supabase";
import { generateAuditId } from "../utils/generateAuditId";

export default function EmailCapture({ auditData, onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    companyName: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!form.email || !form.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const auditId = generateAuditId();

      // Save to Supabase
      const { error: dbError } = await supabase.from("leads").insert({
        email: form.email,
        company_name: form.companyName,
        role: form.role,
        team_size: String(auditData.teamSize),
        total_monthly_savings: auditData.totalMonthlySavings,
        total_annual_savings: auditData.totalAnnualSavings,
        audit_id: auditId,
        audit_data: auditData,
        ai_summary: auditData.aiSummary || "",
      });

      if (dbError) throw dbError;

      // Save audit ID locally for shareable URL
      localStorage.setItem("lastAuditId", auditId);

      onSuccess(auditId);

    } catch (err) {
      console.error("Save failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">
          📬 Get your full report
        </h3>
        <p className="text-sm text-gray-500">
          We'll send a detailed breakdown to your inbox. Free, no spam.
        </p>
      </div>

      {/* Honeypot field — hidden from users, catches bots */}
      <input
      className="input input-primary"
        type="text"
        name="website"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Work email *
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="input input-primary w-[96%]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Company name
            </label>
            <input
              type="text"
              placeholder="Acme Inc."
              value={form.companyName}
              onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
              className="input input-primary "
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your role
            </label>
            <input
              type="text"
              placeholder="CTO / Engineering Manager"
              value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="input input-primary "
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Saving..." : "Send My Report →"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}