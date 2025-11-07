"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InsightsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [ai, setAi] = useState<any>(null);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") load();
  }, [status, router]);

  async function load() {
    const r = await fetch("/api/expenses");
    const j = await r.json();
    setExpenses(j.expenses || []);
  }

  async function analyze() {
    setRunning(true);
    const r = await fetch("/api/ai-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenses }),
    });
    const j = await r.json();
    setAi(j.analysis);
    setRunning(false);
  }

  async function exportPDF() {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const scale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgW = canvas.width * scale;
    const imgH = canvas.height * scale;
    const x = (pageWidth - imgW) / 2;
    pdf.addImage(imgData, "PNG", x, 20, imgW, imgH);
    pdf.save("finwise-insights.pdf");
  }

 return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Insights
            </h1>
            <p className="text-sm text-slate-500">
              Get intelligent summaries and savings suggestions based on your expenses.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={analyze}
              disabled={running || expenses.length === 0}
              className={`rounded-xl px-5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 ${
                running || expenses.length === 0
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {running ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Analyzing…
                </span>
              ) : (
                "Analyze My Spending"
              )}
            </button>

            <button
              onClick={exportPDF}
              disabled={!ai}
              className={`rounded-xl px-5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 ${
                !ai
                  ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Empty State */}
        {expenses.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-10 text-center shadow-sm backdrop-blur-sm">
            <p className="mb-2 text-lg font-medium text-slate-800">
              No expenses yet 💸
            </p>
            <p className="mb-4 text-sm text-slate-500">
              Add some expenses in your dashboard to unlock personalized AI insights.
            </p>
            <a
              href="/dashboard"
              className="inline-block rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
            >
              Go to Dashboard
            </a>
          </div>
        )}

        {/* Insights Section */}
        {ai && (
          <div ref={ref} className="grid gap-6 md:grid-cols-2">
            {/* Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Summary
              </h3>
              <p className="whitespace-pre-wrap text-sm text-slate-600">
                {ai.summary}
              </p>
            </div>

            {/* Observations */}
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Observations
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-sm text-slate-600">
                {(ai.observations || []).map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            {/* Savings Suggestions */}
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Savings Suggestions
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-sm text-slate-600">
                {(ai.savingsSuggestions || []).map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            {/* Budget Advice */}
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Budget Advice
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-sm text-slate-600">
                {(ai.budgetAdvice || []).map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
