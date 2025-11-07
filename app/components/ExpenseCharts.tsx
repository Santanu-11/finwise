"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import { useMemo } from "react";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function ExpenseCharts({ expenses }: { expenses: any[] }) {
  // ---- Data Memos ----
  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of expenses)
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    return { labels: Object.keys(map), data: Object.values(map) };
  }, [expenses]);

  const byMonth = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of expenses) {
      const d = new Date(e.date);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map[k] = (map[k] || 0) + Number(e.amount);
    }
    const labels = Object.keys(map).sort();
    return { labels, data: labels.map((k) => map[k]) };
  }, [expenses]);

  // ---- Chart Configs ----
  const pieData = useMemo(
    () => ({
      labels: byCategory.labels,
      datasets: [
        {
          data: byCategory.data,
          backgroundColor: [
            "#6366F1",
            "#22C55E",
            "#F59E0B",
            "#EF4444",
            "#14B8A6",
            "#8B5CF6",
            "#EC4899",
            "#3B82F6",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    }),
    [byCategory]
  );

  const pieOptions: ChartOptions<"pie"> = {
    plugins: {
      legend: { position: "right" }, // 👈 "as const" fixes the type error
    },
    maintainAspectRatio: false,
  };

  const lineData = useMemo(
    () => ({
      labels: byMonth.labels,
      datasets: [
        {
          label: "Total Expenses",
          data: byMonth.data,
          borderColor: "#6366F1",
          backgroundColor: "rgba(99,102,241,0.15)",
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [byMonth]
  );

  const lineOptions = useMemo(
    () => ({
      plugins: { legend: { display: false } },
      maintainAspectRatio: false,
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels: byCategory.labels,
      datasets: [
        {
          label: "Expenses",
          data: byCategory.data,
          backgroundColor: "#3B82F6",
          borderRadius: 6,
        },
      ],
    }),
    [byCategory]
  );

  const barOptions: ChartOptions<"bar"> = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
    maintainAspectRatio: false,
  };

  // ---- Layout ----
  return (
    <section className="grid w-full gap-6 md:grid-cols-2">
      {/* Category Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Category Breakdown
        </h3>
        <div className="h-[300px] w-full">
          
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Monthly Trend
        </h3>
        <div className="h-[300px] w-full">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Top Categories */}
      <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Top Categories
        </h3>
        <div className="h-[300px] w-full">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </section>
  );
}
