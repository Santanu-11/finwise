"use client";

import Papa from "papaparse";

export default function FileCsvImport({ onImported }: { onImported: (rows: any[]) => void }) {
    function handleFile(e: React.ChangeEvent<HTMLInputElement>){ 
        const file=e.target.files?.[0]; 
        if(!file) return; 
        Papa.parse(file,{ 
            header:true, skipEmptyLines:true, complete:(results)=>{ 
                const rows=(results.data as any[]).map(r=>({ 
                    category:r.category||r.Category||"Other", amount:Number(r.amount||r.Amount||0), note:r.note||r.Note||"", date:r.date||r.Date||new Date().toISOString().slice(0,10)
                })); 
            onImported(rows); 
        } 
    }); 
}
    return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="csvUpload"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
            >
                <input id="csvUpload" type="file" accept=".csv" onChange={handleFile} className="hidden"/>
                📁 Upload CSV
            </label>
            
            <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">Expected columns:</span>{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700">
                category
            </code>
            ,{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700">
                amount
            </code>
            ,{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700">
                note
            </code>
            ,{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700">
                date
            </code>
            </p>            
        </div>
    </div>
);
}