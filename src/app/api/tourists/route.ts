import { NextResponse } from "next/server";
import type { Tourist } from "@/types";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateTourists(count = 30): Tourist[] {
  const baseLat = 19.0760; // Mumbai
  const baseLng = 72.8777;
  return Array.from({ length: count }).map((_, i) => ({
    id: `T${i + 1}`,
    name: `Tourist ${i + 1}`,
    passportId: `P${100000 + i}`,
    lastSeen: new Date(Date.now() - randomBetween(0, 60) * 60_000).toISOString(),
    location: [baseLat + randomBetween(-5, 5), baseLng + randomBetween(-5, 5)],
    riskScore: Math.random(),
  }));
}

export async function GET() {
  const data = generateTourists(40);
  return NextResponse.json({ tourists: data });
}


