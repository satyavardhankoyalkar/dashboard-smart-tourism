"use client";

import { useCallback, useMemo, useState } from "react";
import MapView from "@/components/MapView";
import AlertsTable from "@/components/AlertsTable";
import StatCards from "@/components/StatCards";
import { usePolling } from "@/lib/hooks/usePolling";
import type { Alert, Tourist } from "@/types";

async function fetchTourists(): Promise<Tourist[]> {
  const res = await fetch("/api/tourists", { cache: "no-store" });
  const json = await res.json();
  return json.tourists as Tourist[];
}

async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch("/api/alerts", { cache: "no-store" });
  const json = await res.json();
  return json.alerts as Alert[];
}

export default function DashboardPage() {
  const [alertFilter, setAlertFilter] = useState<"all" | "panic" | "anomaly" | "geofence">("all");
  const touristsFetcher = useCallback(() => fetchTourists(), []);
  const alertsFetcher = useCallback(() => fetchAlerts(), []);

  const { data: tourists } = usePolling<Tourist[]>(touristsFetcher, 10_000);
  const { data: alerts } = usePolling<Alert[]>(alertsFetcher, 7_000);

  const center = useMemo(() => {
    if (!tourists || tourists.length === 0) return undefined;
    return tourists[0].location;
  }, [tourists]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Operational Dashboard</h1>
        <div className="text-sm opacity-70">Auto-refresh active</div>
      </div>
      <StatCards
        totalTourists={(tourists ?? []).length}
        highRiskCount={(tourists ?? []).filter((t) => t.riskScore > 0.7).length}
        activeAlerts={(alerts ?? []).length}
      />
      <MapView tourists={tourists ?? []} center={center} />
      <div>
        <h2 className="text-lg font-medium mb-2">Active Alerts</h2>
        <div className="mb-3 flex gap-2 text-xs">
          {(["all", "panic", "anomaly", "geofence"] as const).map((t) => (
            <button
              key={t}
              className={`px-2 py-1 rounded border ${alertFilter === t ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"}`}
              onClick={() => setAlertFilter(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <AlertsTable alerts={(alerts ?? []).filter((a) => alertFilter === "all" ? true : a.type === alertFilter)} />
      </div>
    </div>
  );
}


