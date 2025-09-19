import { NextRequest, NextResponse } from "next/server";
import type { TouristProfile } from "@/types";

function sign(id: string) {
  return Buffer.from(`${id}|demo-signature`).toString("base64url");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const profile: TouristProfile = {
    id,
    name: `Tourist ${id.replace(/\D/g, "") || "X"}`,
    passportId: `P${id.replace(/\D/g, "") || "000"}`,
    nationality: "IN",
    signedId: sign(id),
    isValid: true,
    lastLocation: [12.9716, 77.5946],
  };

  return NextResponse.json({ profile });
}


