import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  // pretend to persist and return a case number
  const caseNumber = `EFIR-${Math.floor(Math.random() * 1_000_000)}`;
  return NextResponse.json({ success: true, caseNumber });
}


