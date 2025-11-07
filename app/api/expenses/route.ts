import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Expense from "@/models/Expense";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const ExpenseSchema = z.object({
  category: z.string().min(2),
  amount: z.number().positive(),
  note: z.string().optional(),
  date: z.union([z.string().datetime({ offset: true }).optional(), z.string().regex(/\d{4}-\d{2}-\d{2}/).optional()]),
});


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const expenses = await Expense.find({ userId: (session as any).userId }).sort({ date: -1 }).lean();
  return NextResponse.json({ expenses });
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = ExpenseSchema.safeParse({ ...body, amount: Number(body.amount) });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await dbConnect();
  const created = await Expense.create({ ...parsed.data, userId: (session as any).userId, date: parsed.data.date ? new Date(parsed.data.date) : new Date() });
  return NextResponse.json({ expense: created }, { status: 201 });
}