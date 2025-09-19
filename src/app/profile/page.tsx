"use client";

import { useCallback, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import type { TouristProfile } from "@/types";

async function fetchProfile(id: string): Promise<TouristProfile> {
  const res = await fetch(`/api/profile?id=${encodeURIComponent(id)}`, { cache: "no-store" });
  const json = await res.json();
  return json.profile as TouristProfile;
}

export default function ProfileLookupPage() {
  const [id, setId] = useState("");
  const [profile, setProfile] = useState<TouristProfile | null>(null);
  const [scanning, setScanning] = useState(false);

  const onScan = useCallback(async (result: { rawValue: string } | null) => {
    if (!result) return;
    setScanning(false);
    setId(result.rawValue);
    const p = await fetchProfile(result.rawValue);
    setProfile(p);
  }, []);

  async function onLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    const p = await fetchProfile(id);
    setProfile(p);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-xl font-semibold mb-3">Tourist Profile Lookup</h1>
        <form onSubmit={onLookup} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm">Scan QR or enter ID</label>
            <input className="w-full border rounded px-3 py-2 bg-transparent" placeholder="Tourist ID" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-3 py-2 rounded bg-foreground text-background text-sm">Lookup</button>
            <button type="button" className="px-3 py-2 rounded border text-sm" onClick={() => setScanning((s) => !s)}>
              {scanning ? "Stop Scan" : "Scan QR"}
            </button>
          </div>
        </form>
        {scanning && (
          <div className="mt-4 border rounded overflow-hidden">
            <Scanner onScan={onScan} components={{ audio: false }} />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-medium mb-2">Profile</h2>
        {profile ? (
          <div className="border rounded p-3 space-y-1">
            <div className="font-medium">{profile.name}</div>
            <div className="text-sm opacity-70">ID: {profile.id}</div>
            <div className="text-sm opacity-70">Passport: {profile.passportId}</div>
            <div className="text-sm opacity-70">Nationality: {profile.nationality}</div>
            <div className="text-sm opacity-70">Signed ID: {profile.signedId.slice(0, 16)}...</div>
            <div className="text-sm opacity-70">Valid: {profile.isValid ? "Yes" : "No"}</div>
            <div className="text-sm opacity-70">Last Location: {profile.lastLocation[0]}, {profile.lastLocation[1]}</div>
          </div>
        ) : (
          <div className="text-sm opacity-70">No profile loaded.</div>
        )}
      </div>
    </div>
  );
}


