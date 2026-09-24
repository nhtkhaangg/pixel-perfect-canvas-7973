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
  head: () => seo("Chỉ số cơ thể", "Ghi lại chỉ số cơ thể và theo dõi tiến độ cân nặng, tỷ lệ mỡ theo thời gian."),
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
    if (!(w > 30 && w < 250) || !(bf > 3 && bf < 60)) return setErr("Nhập cân nặng và tỷ lệ mỡ hợp lý");
    setRows([...rows, { date: "24/09", weight: w, bodyFat: bf, muscle: Number(f.muscle), waist: Number(f.waist) }]);
    setOpen(false);
    setErr(undefined);
    toast.success("Đã ghi nhận chỉ số");
  }

  return (
    <>
      <PageHeader title="Chỉ số cơ thể" description="Cân đo mỗi hai tuần, cùng một khung giờ trong ngày để có xu hướng chính xác." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" /> Cập nhật chỉ số</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Cân nặng" value={`${last.weight} kg`} delta={-((first.weight - last.weight) / first.weight) * 100} hint="so với lần đo đầu" />
        <StatCard label="Tỷ lệ mỡ" value={`${last.bodyFat}%`} delta={-(first.bodyFat - last.bodyFat)} />
        <StatCard label="Khối lượng cơ" value={`${last.muscle} kg`} delta={((last.muscle - first.muscle) / first.muscle) * 100} />
        <StatCard label="Vòng eo" value={`${last.waist} cm`} delta={-((first.waist - last.waist) / first.waist) * 100} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart title="Cân nặng theo thời gian" description="kg" data={rows} xKey="date" series={[{ key: "weight", label: "Cân nặng" }]} />
        <SimpleChart title="Tỷ lệ mỡ theo thời gian" description="%" data={rows} xKey="date" series={[{ key: "bodyFat", label: "Tỷ lệ mỡ", color: "var(--chart-2)" }]} />
      </div>
      <DataTable
        data={[...rows].reverse()}
        rowKey={(r) => r.date}
        searchPlaceholder="Tìm theo ngày…"
        columns={[
          { key: "date", header: "Ngày" },
          { key: "weight", header: "Cân nặng (kg)", sortable: true },
          { key: "bodyFat", header: "Tỷ lệ mỡ (%)", sortable: true },
          { key: "muscle", header: "Khối lượng cơ (kg)", sortable: true },
          { key: "waist", header: "Vòng eo (cm)", sortable: true },
        ]}
      />
      <FormModal open={open} onOpenChange={setOpen} title="Cập nhật chỉ số cơ thể" description="Số đo hôm nay" footer={<Button onClick={save}>Lưu chỉ số</Button>}>
        <div className="grid grid-cols-2 gap-4">
          {(["weight", "bodyFat", "muscle", "waist"] as const).map((k) => (
            <FormField key={k} label={{ weight: "Cân nặng (kg)", bodyFat: "Tỷ lệ mỡ (%)", muscle: "Khối lượng cơ (kg)", waist: "Vòng eo (cm)" }[k]} error={k === "weight" ? err : undefined}>
              {(p) => <Input {...p} type="number" step="0.1" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
            </FormField>
          ))}
        </div>
      </FormModal>
    </>
  );
}
