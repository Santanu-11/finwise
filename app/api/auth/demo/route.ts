import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import Expense from "@/models/Expense";
import bcrypt from "bcrypt";

export async function POST() {
  await dbConnect();

  // Use a fixed demo email
  const demoEmail = "demo@finwise.ai";
  const demoPassword = "demo123";
  const hashed = await bcrypt.hash(demoPassword, 10);

  // Create demo user if not exists
  let user = await User.findOne({ email: demoEmail });
  if (!user) {
    user = await User.create({
      name: "Demo User",
      email: demoEmail,
      password: hashed,
    });
  }

  // Seed sample expenses if not already there
  const count = await Expense.countDocuments({ userId: user._id });
  if (count === 0) {
    const categories = ["Food", "Transport", "Shopping", "Rent", "Bills", "Entertainment"];
    const expenses = [];

    for (let i = 0; i < 15; i++) {
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const amt = Math.floor(Math.random() * 3000) + 100;
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 25));
      expenses.push({
        userId: user._id,
        category: cat,
        amount: amt,
        note: `Demo expense #${i + 1}`,
        date,
      });
    }
    await Expense.insertMany(expenses);
  }

  return NextResponse.json({
    ok: true,
    demoEmail,
    demoPassword,
  });
}
