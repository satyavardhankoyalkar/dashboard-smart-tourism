"use client";

import Link from "next/link";

export default function PoliceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1220] text-white/90">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-blue-500/20 border border-blue-400/30" />
          <div className="font-semibold tracking-tight">TourSafe Command</div>
          <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-400/30">POLICE ACCESS</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/profile" className="hover:underline">Profiles</Link>
          <Link href="/efir" className="hover:underline">E-FIR</Link>
        </nav>
      </div>
    </header>
  );
}


