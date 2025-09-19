"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profiles" },
  { href: "/efir", label: "E-FIR" },
];

export default function PoliceSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-60 shrink-0 h-[calc(100dvh-56px)] sticky top-[56px] border-r border-white/10 bg-[#0f172a] text-white/80">
      <div className="p-3 text-xs tracking-wide uppercase opacity-70">Navigation</div>
      <nav className="px-2 space-y-1">
        {items.map((it) => {
          const active = pathname.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={`block rounded px-3 py-2 text-sm border border-transparent hover:bg-white/5 ${active ? "bg-white/10 border-white/10" : ""}`}>
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


