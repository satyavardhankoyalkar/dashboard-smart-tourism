"use client";

type Alert = {
  id: string;
  type: "panic" | "anomaly" | "geofence";
  touristName: string;
  location: [number, number];
  createdAt: string;
};

export default function AlertsTable({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="w-full overflow-x-auto border border-black/10 dark:border-white/15 rounded-md">
      {alerts.length === 0 ? (
        <div className="p-4 text-sm opacity-70">No alerts match the current filter.</div>
      ) : (
      <table className="w-full text-sm">
        <thead className="bg-black/[.04] dark:bg-white/[.06] text-left">
          <tr>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Tourist</th>
            <th className="px-3 py-2">Location</th>
            <th className="px-3 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id} className="border-t border-black/5 dark:border-white/10">
              <td className="px-3 py-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  a.type === "panic" ? "bg-red-500/10 text-red-600" : a.type === "anomaly" ? "bg-yellow-500/10 text-yellow-600" : "bg-blue-500/10 text-blue-600"
                }`}>
                  {a.type}
                </span>
              </td>
              <td className="px-3 py-2">{a.touristName}</td>
              <td className="px-3 py-2">{a.location[0].toFixed(4)}, {a.location[1].toFixed(4)}</td>
              <td className="px-3 py-2">{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}


