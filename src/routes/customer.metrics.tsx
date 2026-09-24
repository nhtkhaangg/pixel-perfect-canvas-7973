import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { bodyMetrics } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart } from "@/components/shared/simple-chart";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/metrics")({
  head: () => seo("Body metrics", "Log body metrics and see weight and body-fat progress over time."),
  component: Metrics,
});

type Row = (typeof bodyMetrics)[number];

function Metrics() {
  const [rows, setRows] = useState<Row[]>(bodyMetrics);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ weight: "79.6", bodyFat: "20.4", muscle: "36.7", waist: "86" });
  const [err, setErr] = useState<string>();
  const first = rows[0]!, last = rows[rows.length - 1]!;

  function save() {
    const w = Number(f.weight), bf = Number(f.bodyFat);
    if (!(w > 30 && w < 250) || !(bf > 3 && bf < 60)) return setErr("Enter realistic weight and body-fat values");
    setRows([...rows, { date: "Sep 24", weight: w, bodyFat: bf, muscle: Number(f.muscle), waist: Number(f.waist) }]);
    setOpen(false);
    setErr(undefined);
    toast.success("Metrics logged");
  }

  return (
    <>
      <PageHeader title="Body metrics" description="Weigh in every two weeks, same time of day, for reliable trends." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" /> Update metrics</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Weight" value={`${last.weight} kg`} delta={-((first.weight - last.weight) / first.weight) * 100} hint="since first entry" />
        <StatCard label="Body fat" value={`${last.bodyFat}%`} delta={-(first.bodyFat - last.bodyFat)} />
        <StatCard label="Muscle mass" value={`${last.muscle} kg`} delta={((last.muscle - first.muscle) / first.muscle) * 100} />
        <StatCard label="Waist" value={`${last.waist} cm`} delta={-((first.waist - last.waist) / first.waist) * 100} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart title="Weight over time" description="kg" data={rows} xKey="date" series={[{ key: "weight", label: "Weight" }]} />
        <SimpleChart title="Body fat over time" description="%" data={rows} xKey="date" series={[{ key: "bodyFat", label: "Body fat", color: "var(--chart-2)" }]} />
      </div>
      <DataTable
        data={[...rows].reverse()}
        rowKey={(r) => r.date}
        searchPlaceholder="Search date…"
        columns={[
          { key: "date", header: "Date" },
          { key: "weight", header: "Weight (kg)", sortable: true },
          { key: "bodyFat", header: "Body fat (%)", sortable: true },
          { key: "muscle", header: "Muscle (kg)", sortable: true },
          { key: "waist", header: "Waist (cm)", sortable: true },
        ]}
      />
      <FormModal open={open} onOpenChange={setOpen} title="Update body metrics" description="Today's measurements" footer={<Button onClick={save}>Save entry</Button>}>
        <div className="grid grid-cols-2 gap-4">
          {(["weight", "bodyFat", "muscle", "waist"] as const).map((k) => (
            <FormField key={k} label={{ weight: "Weight (kg)", bodyFat: "Body fat (%)", muscle: "Muscle (kg)", waist: "Waist (cm)" }[k]} error={k === "weight" ? err : undefined}>
              {(p) => <Input {...p} type="number" step="0.1" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
            </FormField>
          ))}
        </div>
      </FormModal>
    </>
  );
}
