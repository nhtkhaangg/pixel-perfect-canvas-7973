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
  head: () => seo("Ngày nghỉ", "Đăng ký ngày nghỉ cố định hàng tuần và các ngày nghỉ riêng lẻ."),
  component: DaysOff,
});

const typeLabels: Record<string, string> = { "Full day": "Cả ngày", "Morning": "Buổi sáng", "Afternoon": "Buổi chiều", "Evening": "Buổi tối" };

function DaysOff() {
  const [weekly, setWeekly] = useState<string[]>(weeklyOff);
  const [list, setList] = useState(daysOff);
  const [f, setF] = useState({ date: "", type: "Full day", reason: "" });
  const [err, setErr] = useState<string>();

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!f.date) return setErr("Chọn ngày");
    setErr(undefined);
    setList([{ id: `off_${Date.now()}`, ...f, status: "PENDING" }, ...list]);
    toast.success("Đã gửi yêu cầu nghỉ", { description: "Hội viên bị ảnh hưởng sẽ được thông báo sau khi được duyệt." });
    setF({ date: "", type: "Full day", reason: "" });
  }

  return (
    <>
      <PageHeader title="Ngày nghỉ" description="Hội viên không thể đặt lịch với bạn vào những ngày này." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Ngày nghỉ cố định hàng tuần" action={<Button size="sm" onClick={() => toast.success("Đã lưu ngày nghỉ cố định")}>Lưu thay đổi</Button>}>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((d) => (
              <button key={d} type="button" onClick={() => setWeekly(weekly.includes(d) ? weekly.filter((x) => x !== d) : [...weekly, d])} className={cn("rounded-md border py-3 text-sm font-medium", weekly.includes(d) ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>{d}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Nghỉ vào: {weekly.join(", ") || "không có"}. Tối đa 2 ngày/tuần.</p>
        </Panel>
        <Panel title="Đề xuất một ngày nghỉ cụ thể">
          <form onSubmit={add} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Ngày" required error={err}>{(p) => <Input {...p} type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />}</FormField>
              <div className="space-y-1.5"><Label>Loại</Label>
                <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Full day", "Morning", "Afternoon", "Evening"].map((x) => <SelectItem key={x} value={x}>{typeLabels[x]}</SelectItem>)}</SelectContent></Select>
              </div>
            </div>
            <FormField label="Lý do">{(p) => <Input {...p} value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} />}</FormField>
            <Button type="submit">Gửi yêu cầu</Button>
          </form>
        </Panel>
      </div>
      <Panel title="Ngày nghỉ sắp tới & đã qua">
        <ul className="divide-y divide-border">
          {list.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div><p className="font-medium">{d.date} · {typeLabels[d.type] ?? d.type}</p><p className="text-sm text-muted-foreground">{d.reason || "—"}</p></div>
              <div className="flex items-center gap-2">
                <StatusBadge status={toStatus(d.status)} label={d.status} />
                {d.status === "PENDING" ? <Button size="sm" variant="ghost" onClick={() => setList(list.filter((x) => x.id !== d.id))}>Rút lại</Button> : null}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
