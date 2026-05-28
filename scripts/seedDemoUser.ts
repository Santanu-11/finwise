import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User";
import Expense from "../models/Expense";
import { dbConnect } from "../lib/db";

const CATEGORIES = [
  "Food", "Transport", "Bills", "Rent", "Shopping", "Health",
  "Entertainment", "Education", "Groceries", "Travel", "Other"
];

function randomAmount() {
  return Math.floor(Math.random() * 5000) + 100; // 100–5100
}

function randomDateWithinLastMonths(months = 6) {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - months);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

async function seed() {
  await dbConnect();

  console.log("🌱 Checking demo user...");
  const email = "demo@finwise.com";
  const password = "demo123";
  let user = await User.findOne({ email });

  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({
      name: "Demo User",
      email,
      password: hash,
    });
    console.log("✅ Created demo user:", email);
  } else {
    console.log("⚠️ Demo user already exists");
  }

  const existingExpenses = await Expense.find({ userId: user._id });
  if (existingExpenses.length >= 100) {
    console.log(`✅ Demo user already has ${existingExpenses.length} expenses`);
    process.exit(0);
  }

  console.log("🧾 Inserting demo expenses...");

  const expenses = [];
  for (let i = 0; i < 150; i++) {
    expenses.push({
      userId: user._id,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      amount: randomAmount(),
      note: `Expense ${i + 1}`,
      date: randomDateWithinLastMonths(),
    });
  }

  await Expense.insertMany(expenses);
  console.log(`✅ Inserted ${expenses.length} demo expenses`);

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
 