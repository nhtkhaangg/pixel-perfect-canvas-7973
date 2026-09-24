import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { daysOff, weeklyOff } from "@/lib/mock/trainer";
import { weekDays, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormField } from "@/components/shared/form-field";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer/days-off")({
  head: () => seo("Days off", "Register your weekly day off and one-off leave dates."),
  component: DaysOff,
});

function DaysOff() {
  const [weekly, setWeekly] = useState<string[]>(weeklyOff);
  const [list, setList] = useState(daysOff);
  const [f, setF] = useState({ date: "", type: "Full day", reason: "" });
  const [err, setErr] = useState<string>();

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!f.date) return setErr("Pick a date");
    setErr(undefined);
    setList([{ id: `off_${Date.now()}`, ...f, status: "PENDING" }, ...list]);
    toast.success("Day off requested", { description: "Affected clients will be notified once approved." });
    setF({ date: "", type: "Full day", reason: "" });
  }

  return (
    <>
      <PageHeader title="Days off" description="Clients can't book you on these days." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Weekly day off" action={<Button size="sm" onClick={() => toast.success("Weekly day off saved")}>Save</Button>}>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((d) => (
              <button key={d} type="button" onClick={() => setWeekly(weekly.includes(d) ? weekly.filter((x) => x !== d) : [...weekly, d])} className={cn("rounded-md border py-3 text-sm font-medium", weekly.includes(d) ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>{d}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Off every: {weekly.join(", ") || "none"}. Max 2 days per week.</p>
        </Panel>
        <Panel title="Request a specific day off">
          <form onSubmit={add} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Date" required error={err}>{(p) => <Input {...p} type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />}</FormField>
              <div className="space-y-1.5"><Label>Type</Label>
                <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Full day", "Morning", "Afternoon", "Evening"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
              </div>
            </div>
            <FormField label="Reason">{(p) => <Input {...p} value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} />}</FormField>
            <Button type="submit">Submit request</Button>
          </form>
        </Panel>
      </div>
      <Panel title="Upcoming & past leave">
        <ul className="divide-y divide-border">
          {list.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div><p className="font-medium">{d.date} · {d.type}</p><p className="text-sm text-muted-foreground">{d.reason || "—"}</p></div>
              <div className="flex items-center gap-2">
                <StatusBadge status={toStatus(d.status)} label={d.status} />
                {d.status === "PENDING" ? <Button size="sm" variant="ghost" onClick={() => setList(list.filter((x) => x.id !== d.id))}>Withdraw</Button> : null}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
