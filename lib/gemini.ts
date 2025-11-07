import { GoogleGenerativeAI } from "@google/generative-ai";
const key = process.env.GEMINI_API_KEY;
if (!key) throw new Error("GEMINI_API_KEY not set");
const genAI = new GoogleGenerativeAI(key);
export const geminiText = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });