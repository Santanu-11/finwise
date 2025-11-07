import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { geminiText } from "@/lib/gemini";
import Analysis from "@/models/Analysis";
import { dbConnect } from "@/lib/db";
import crypto from "crypto";


function monthKeyOf(d: Date) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; }


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { expenses } = await req.json();
  if (!Array.isArray(expenses) || expenses.length === 0) return NextResponse.json({ error: "No expenses" }, { status: 400 });


  await dbConnect();


  // Compute month key from the latest expense
  const dates = expenses.map((e: any) => new Date(e.date)).filter((d: any) => !isNaN(d));
  const mk = dates.length ? monthKeyOf(dates.sort((a: any,b: any)=>b.getTime()-a.getTime())[0]) : monthKeyOf(new Date());


  // Simple checksum: sha1 of normalized items for this month only
  const monthExpenses = expenses.filter((e: any) => monthKeyOf(new Date(e.date)) === mk);
  const norm = monthExpenses.map((e: any) => ({ c: e.category, a: Number(e.amount), d: new Date(e.date).toISOString().slice(0,10) }));
  const checksum = crypto.createHash("sha1").update(JSON.stringify(norm)).digest("hex");


  // Cache hit?
  const userId = (session as any).userId;
  
  const cached: any = await Analysis.findOne({ userId, monthKey: mk, checksum }).lean();

if (cached && cached.result) {
  return NextResponse.json({ analysis: cached.result, cached: true });
}



  const prompt = `You are a personal finance coach. Analyze this month's spending JSON and return a strict JSON object with fields: summary, observations (string[]), savingsSuggestions (string[]), budgetAdvice (string[]). Data: ${JSON.stringify(monthExpenses)}`;
  const result = await geminiText.generateContent(prompt);
const text = result.response.text();

console.log("🧠 Gemini Raw Response:");
console.log(text); // 👈 log full AI response for debugging

let parsed: any = null;
try {
  parsed = JSON.parse(text);
} catch {
  const m = text.match(/\{[\s\S]*\}/);
  parsed = m ? JSON.parse(m[0]) : {
    summary: text,
    observations: ["Gemini did not return proper JSON"],
    savingsSuggestions: [],
    budgetAdvice: []
  };
}


  await Analysis.create({ userId, monthKey: mk, checksum, result: parsed });
  return NextResponse.json({ analysis: parsed, cached: false });
}