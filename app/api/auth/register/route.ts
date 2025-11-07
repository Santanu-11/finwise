import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { z } from "zod";


const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});


export async function POST(req: Request) {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const { name, email, password } = parsed.data;
    await dbConnect();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    return NextResponse.json({ ok: true });
}