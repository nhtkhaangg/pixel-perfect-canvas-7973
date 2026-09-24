import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { seo } from "@/lib/seo";
import { checkIns, me, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/check-in")({
  head: () => seo("My check-in QR", "Show your personal QR code at any GymFit branch and review your check-in history."),
  component: CheckIn,
});

function CheckIn() {
  const [token, setToken] = useState(() => "GF-1042-A7K9");
  const [left, setLeft] = useState(60);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l <= 1 ? (setToken(`GF-1042-${Math.random().toString(36).slice(2, 6).toUpperCase()}`), 60) : l - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <PageHeader title="Check-in" description="Scan this code at the turnstile or front desk. It refreshes every 60 seconds." />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="rounded-lg bg-surface p-6 text-center text-surface-foreground">
          <p className="text-xs tracking-wider text-surface-foreground/60 uppercase">Member pass</p>
          <p className="mt-1 font-semibold">{me.name}</p>
          <div className="mx-auto mt-5 w-fit rounded-lg bg-card p-4">
            <QRCodeSVG value={`gymfit://checkin/${me.id}/${token}`} size={200} fgColor="currentColor" className="text-foreground" />
          </div>
          <p className="mt-4 font-mono text-sm tracking-widest">{token}</p>
          <p className="mt-1 text-xs text-surface-foreground/60">Refreshes in {left}s</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => setLeft(1)}><RefreshCw className="size-4" /> Refresh now</Button>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="This month" value={checkIns.filter((c) => c.status === "CHECKED_IN").length} delta={16} hint="vs August" />
            <StatCard label="Current streak" value="3 weeks" hint="3+ visits each week" />
            <StatCard label="Favourite time" value="18:00" hint="Downtown" />
          </div>
          <DataTable
            data={checkIns}
            rowKey={(r) => r.id}
            pageSize={6}
            searchPlaceholder="Search branch…"
            filters={[{ key: "branch", label: "Branch", options: ["Downtown", "Riverside", "Northgate"].map((b) => ({ label: b, value: b })) }]}
            filterValue={(r) => r.branch}
            columns={[
              { key: "date", header: "Date", sortable: true },
              { key: "time", header: "Time" },
              { key: "branch", header: "Branch", sortable: true },
              { key: "method", header: "Method" },
              { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status === "CHECKED_IN" ? "Checked in" : "Rejected"} /> },
            ]}
          />
        </div>
      </div>
    </>
  );
}
