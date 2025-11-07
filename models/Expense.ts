
import { Schema, models, model } from "mongoose";


const ExpenseSchema = new Schema(
    {
        userId: { type: String, required: true },
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        note: { type: String },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
export default models.Expense || model("Expense", ExpenseSchema);