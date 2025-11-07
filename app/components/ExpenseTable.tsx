"use client";
export default function ExpenseTable({ 
  expenses,
  onDelete 
}: { 
  expenses: any[]; 
  onDelete: (id: string) => void 
}) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
      <table className="w-full border-collapse text-sm text-slate-700">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50 text-left font-semibold text-slate-600">
          <th className="py-3 px-4">Date</th>
          <th className="py-3 px-4">Category</th>
          <th className="py-3 px-4">Note</th>
          <th className="py-3 px-4 text-right">Amount</th>
          <th className="py-3 px-4 text-right"></th><th/>
        </tr>
      </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-slate-500 italic"
              >
                No expenses recorded yet.
              </td>
            </tr>
          ) : (
            expenses.map((e) => (
              <tr
                key={e._id}
                className="border-b border-slate-200/70 transition hover:bg-slate-50"
              >
                <td className="py-3 px-4 text-slate-600">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="px-4 capitalize text-slate-700">{e.category}</td>
                <td className="max-w-[220px] truncate px-4 text-slate-500">
                  {e.note || "—"}
                </td>
                <td className="px-4 text-right font-medium text-slate-800">
                  ₹{Number(e.amount).toFixed(2)}
                </td>
                <td className="px-4 text-right">
                  <button
                    onClick={() => onDelete(e._id)}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 active:scale-95"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
           
      </table>
    </div>
  );
}