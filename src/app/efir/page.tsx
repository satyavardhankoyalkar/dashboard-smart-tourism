"use client";

import { useState } from "react";
import type { TouristProfile } from "@/types";

export default function EfirPage() {
  const [profile, setProfile] = useState<TouristProfile | null>(null);
  const [details, setDetails] = useState("");
  const [caseNo, setCaseNo] = useState<string | null>(null);

  async function onPrefill() {
    const res = await fetch("/api/profile?id=demo", { cache: "no-store" });
    const json = await res.json();
    setProfile(json.profile);
    setDetails(`Auto-generated report for ${json.profile.name}, last seen at ${json.profile.lastLocation[0]}, ${json.profile.lastLocation[1]}.`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/efir", { method: "POST", body: JSON.stringify({ profile, details }) });
    const json = await res.json();
    if (json.caseNumber) setCaseNo(json.caseNumber);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-3">Auto E-FIR</h1>
      <div className="flex items-center gap-3 mb-4">
        <button className="px-3 py-2 rounded border text-sm" onClick={onPrefill}>Prefill with last profile</button>
        {caseNo && <div className="text-sm">Submitted: <span className="font-medium">{caseNo}</span></div>}
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full border rounded px-3 py-2 bg-transparent" value={profile?.name ?? ""} readOnly />
          </div>
          <div>
            <label className="block text-sm">Passport</label>
            <input className="w-full border rounded px-3 py-2 bg-transparent" value={profile?.passportId ?? ""} readOnly />
          </div>
        </div>
        <div>
          <label className="block text-sm">Details</label>
          <textarea className="w-full border rounded px-3 py-2 bg-transparent min-h-[120px]" value={details} onChange={(e) => setDetails(e.target.value)} />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-foreground text-background text-sm">Submit E-FIR</button>
      </form>
    </div>
  );
}


