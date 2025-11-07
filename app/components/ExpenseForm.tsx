"use client";

import { useState } from "react";

const CATEGORIES = ["Food","Transport","Bills","Rent","Shopping","Health","Entertainment","Other"];

export default function ExpenseForm({ 
  onCreated 
}: { 
  onCreated: () => void 
}) {

  const [form, setForm] = useState({ category: "Food", amount: "", note: "", date: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const r = await fetch("/api/expenses", { 
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amount: Number(form.amount) }) });
    setLoading(false); 
    if (r.ok) { 
      setForm({ category: "Food", amount: "", note: "", date: "" }); 
      onCreated(); 
    }
  }

  return (
    <form 
      onSubmit={submit} 
      className="w-full grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm sm:grid-cols-2 md:grid-cols-5">
        {/* Category */ }
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">
          Category
        </label>
        <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
          {CATEGORIES.map(c=> 
            <option key={c}>{c}</option>
          )}
        </select>
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">
          Amount
        </label>
        <input className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300" 
          type="number" 
          required 
          value={form.amount} 
          onChange={e=>setForm({...form, amount:e.target.value})}/>
      </div>

      {/* Date */}
      <div  className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">Date</label>
        <input 
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300" 
          type="date" 
          value={form.date} 
          onChange={e=>setForm({...form, date:e.target.value})}/>
      </div>

      {/* Note */}
      <div className="flex flex-col md:col-span-1">
        <label className="mb-1 text-sm font-medium text-slate-700">Note</label>
        <input 
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300" 
          value={form.note} 
          onChange={e=>setForm({...form, note:e.target.value})}/>
      </div>

      {/*Submit */}
      <div className="flex items-end justify-end">
        <button 
          type="submit"
          disabled={loading}
          className={`rounded-xl px-5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 ${
            loading
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`} 
          >{loading? 'Adding…':'Add Expense'}
          </button>
        </div>
    </form>
  );
}