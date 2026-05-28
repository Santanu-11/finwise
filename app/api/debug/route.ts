import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    uri: process.env.MONGODB_URI,
    deployId: process.env.VERCEL_DEPLOYMENT_ID,
  });
}