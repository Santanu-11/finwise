"use client";

import { useEffect,  useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseCharts from "../components/ExpenseCharts";
import FileCsvImport from "../components/FileCsvImport";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated") load();
  }, [status]);


  async function load() {
    setLoading(true);
    const r = await fetch("/api/expenses");
    const j = await r.json();
    setExpenses(j.expenses || []);
    setLoading(false);
  }


  async function onDelete(id: string) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    load();
  }


  async function importRows(rows: any[]) {
    for (const row of rows) {
    await fetch("/api/expenses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(row) });
    }
    load();
  }


  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Track, visualize, and manage your expenses in one place.
            </p>
          </div>
          <FileCsvImport onImported={importRows} />
        </div>

        {/* Expense Form */}
        <ExpenseForm onCreated={load} />

        {/* Charts */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500 shadow-sm backdrop-blur-sm">
            Loading analytics…
          </div>
        ) : (
          <ExpenseCharts expenses={expenses} />
        )}

        {/* Table */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-800">
            Recent Expenses
          </h2>
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500 shadow-sm backdrop-blur-sm">
              Loading data…
            </div>
          ) : (
            <ExpenseTable expenses={expenses} onDelete={onDelete} />
          )}
        </div>
      </section>
    </main> 
  );
}