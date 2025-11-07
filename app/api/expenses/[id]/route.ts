import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;
    await dbConnect();
    await Expense.deleteOne({ _id: id, userId: (session as any).userId });
    return NextResponse.json({ ok: true });
}