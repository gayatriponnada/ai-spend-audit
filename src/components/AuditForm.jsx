import { useState, useEffect } from "react";
import { TOOLS, USE_CASES } from "../engine/pricingData";

const DEFAULT_FORM = {
  teamSize: "",
  useCase: "",
  tools: {},
};

export default function AuditForm() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("auditForm");
    return saved ? JSON.parse(saved) : DEFAULT_FORM;
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(form));
  }, [form]);

  const handleToolToggle = (toolId) => {
    setForm((prev) => {
      const tools = { ...prev.tools };
      if (tools[toolId]) {
        delete tools[toolId];
      } else {
        tools[toolId] = { planId: "", seats: 1, monthlySpend: "" };
      }
      return { ...prev, tools };
    });
  };

  const handleToolChange = (toolId, field, value) => {
    setForm((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [toolId]: { ...prev.tools[toolId], [field]: value },
      },
    }));
  };

  const handleSubmit = () => {
    console.log("clicked");
    if (!validate()) {
      console.log("required");
      return;
    }
    // if (Object.keys(form.tools).length === 0) {
    //   alert("Please select at least one AI tool");
    //   return;
    // }
  };

  const validate = () => {
    const newError = {};

    if (!form.teamSize) {
      newError.teamSize = "teamSize is required";
    }

    if (!form.useCase) {
      newError.useCase = "Primary useCase is required";
    }
    if (Object.keys(form.tools).length === 0) {
      newError.tools = " Please select at least one AI tool";
    }

    setErrors(newError);

    return Object.keys(newError).length === 0;
  };

  return (
    <div className="flex flex-col items-center   gap-4  ">
      <div className="flex flex-col   gap-4 ">
        <h1 className="text-3xl text-center font-bold text-gray-900">
          AI Spend Audit
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Tell us what AI tools you pay for and we'll show you exactly where
          you're overspending.
        </p>

        {/* Team Info */}
        <div className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-6 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Team
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Size
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={form.teamSize}
                onChange={(e) =>
                  setForm((p) => ({ ...p, teamSize: e.target.value }))
                }
                className="input input-primary"
              />
              {errors.teamSize && (
                <p className="text-red-400 text-xs font-normal">
                  {errors.teamSize}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Use Case
              </label>
              <select
                value={form.useCase}
                onChange={(e) =>
                  setForm((p) => ({ ...p, useCase: e.target.value }))
                }
                className="select select-primary"
              >
                {USE_CASES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tool Selection */}
        <div className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-6 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Which AI tools do you pay for?
          </h2>
          <p className="text-sm text-gray-400 mb-4">Select all that apply</p>

          <div className="grid grid-cols-2 gap-3 ">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolToggle(tool.id)}
                className={`p-3 rounded-lg border text-left text-sm font-medium transition
                ${
                  form.tools[tool.id]
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {tool.name}
              </button>
            ))}

            {errors.tools && (
              <p className="text-red-400 text-xs font-normal">{errors.tools}</p>
            )}
          </div>

          {/* Per Tool Details */}
          {Object.keys(form.tools).map((toolId) => {
            const tool = TOOLS.find((t) => t.id === toolId);
            const toolData = form.tools[toolId];
            if (!tool) return null;
            return (
              <div
                key={toolId}
                className=" flex flex-col gap-2 border border-gray-100 rounded-lg p-4 mb-3 bg-gray-50"
              >
                <h3 className="font-medium text-gray-800 mb-3">{tool.name}</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Plan
                    </label>
                    <select
                      value={toolData.planId}
                      onChange={(e) =>
                        handleToolChange(toolId, "planId", e.target.value)
                      }
                      className="select select-primary"
                    >
                      {tool.plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Number of seats
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={toolData.seats}
                      onChange={(e) =>
                        handleToolChange(toolId, "seats", e.target.value)
                      }
                      className="input input-primary"
                    />
                    {errors?.toolData?.seats && (
                      <p className="text-red-400 text-xs font-normal">
                        {errors?.toolData.seats}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Monthly spend ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 40"
                      value={toolData.monthlySpend}
                      onChange={(e) =>
                        handleToolChange(toolId, "monthlySpend", e.target.value)
                      }
                      className="input input-primary"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 transition cursor-pointer"
        >
          Get My Free Audit →
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          No login required. Results are instant.
        </p>
      </div>
    </div>
  );
}
