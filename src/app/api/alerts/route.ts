import { NextResponse } from "next/server";
import type { Alert } from "@/types";

const TYPES: Alert["type"][] = ["panic", "anomaly", "geofence"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateAlerts(count = 8): Alert[] {
  const baseLat = 28.6139; // Delhi
  const baseLng = 77.2090;
  return Array.from({ length: count }).map((_, i) => {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const name = `Tourist ${Math.floor(Math.random() * 40) + 1}`;
    return {
      id: `A${i + 1}`,
      type,
      touristId: `T${i + 1}`,
      touristName: name,
      location: [baseLat + randomBetween(-3, 3), baseLng + randomBetween(-3, 3)],
      createdAt: new Date(Date.now() - randomBetween(0, 30) * 60_000).toISOString(),
    } satisfies Alert;
  });
}

export async function GET() {
  const data = generateAlerts(12);
  return NextResponse.json({ alerts: data });
}


