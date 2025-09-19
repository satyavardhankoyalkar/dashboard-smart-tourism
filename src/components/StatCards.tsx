"use client";

type Props = {
  totalTourists: number;
  highRiskCount: number;
  activeAlerts: number;
};

export default function StatCards({ totalTourists, highRiskCount, activeAlerts }: Props) {
  const cards = [
    { label: "Active Tourists", value: totalTourists, color: "bg-blue-500/10 text-blue-600" },
    { label: "High Risk", value: highRiskCount, color: "bg-red-500/10 text-red-600" },
    { label: "Active Alerts", value: activeAlerts, color: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-md border border-black/10 dark:border-white/15 p-4">
          <div className="text-xs opacity-70">{c.label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{c.value}</div>
          <div className={`mt-2 inline-flex px-2 py-0.5 rounded text-xs ${c.color}`}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}


