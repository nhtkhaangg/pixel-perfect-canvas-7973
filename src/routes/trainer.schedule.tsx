import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { bookings, daysOff, type Booking } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormModal } from "@/components/shared/form-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer/schedule")({
  head: () => seo("Lịch đặt buổi tập", "Lịch tuần các buổi tập của hội viên."),
  component: Calendar,
});

const hours = Array.from({ length: 15 }, (_, i) => i + 6);
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function Calendar() {
  const [monday, setMonday] = useState(new Date(2026, 8, 21));
  const [sel, setSel] = useState<Booking | null>(null);
  const days = Array.from({ length: 7 }, (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  const shift = (n: number) => setMonday(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + n));

  return (
    <>
      <PageHeader title="Lịch đặt buổi tập" description="Các buổi tập của hội viên theo tuần. Chủ nhật là ngày nghỉ cố định của bạn." actions={<><Button variant="outline" asChild><Link to="/trainer/days-off">Ngày nghỉ</Link></Button><Button variant="outline" asChild><Link to="/trainer/reschedule">Đổi lịch</Link></Button></>} />
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => shift(-7)}><ChevronLeft className="size-4" /></Button>
          <p className="font-semibold">{days[0]!.toLocaleDateString("vi-VN", { month: "short", day: "numeric" })} – {days[6]!.toLocaleDateString("vi-VN", { month: "short", day: "numeric", year: "numeric" })}</p>
          <Button variant="ghost" size="icon" onClick={() => shift(7)}><ChevronRight className="size-4" /></Button>
        </div>
        <div className="grid min-w-[760px] grid-cols-[56px_repeat(7,1fr)]">
          <div />
          {days.map((d) => {
            const off = d.getDay() === 0 || daysOff.some((o) => o.date === iso(d) && o.type === "Full day");
            return <div key={d.toISOString()} className={cn("border-b border-l border-border py-2 text-center text-xs", off && "bg-muted/60")}><p className="text-muted-foreground">{d.toLocaleDateString("vi-VN", { weekday: "short" })}</p><p className={cn("font-semibold", iso(d) === "2026-09-24" && "text-primary")}>{d.getDate()}</p>{off ? <p className="text-[10px] text-muted-foreground">Ngày nghỉ</p> : null}</div>;
          })}
          {hours.map((h) => (
            <div key={h} className="contents">
              <div className="border-b border-border pr-2 pt-1 text-right text-[11px] text-muted-foreground">{pad(h)}:00</div>
              {days.map((d) => {
                const b = bookings.find((x) => x.date === iso(d) && Number(x.start.slice(0, 2)) === h);
                const off = d.getDay() === 0;
                return (
                  <div key={d.toISOString() + h} className={cn("h-12 border-b border-l border-border p-0.5", off && "bg-muted/60")}>
                    {b ? (
                      <button type="button" onClick={() => setSel(b)} className={cn("h-full w-full truncate rounded px-1.5 text-left text-xs", b.status === "COMPLETED" ? "bg-muted text-muted-foreground" : b.status === "MISSED" ? "bg-destructive/10 text-destructive" : b.status === "AWAITING" ? "bg-warning/20" : "bg-primary text-primary-foreground")}>
                        <span className="font-medium">{b.client}</span><br />{b.focus}
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <FormModal open={!!sel} onOpenChange={(o) => !o && setSel(null)} title={sel ? `${sel.client} — ${sel.focus}` : ""} description={sel ? `${sel.date} · ${sel.start}–${sel.end}` : ""} footer={sel && (
        <>
          <Button variant="outline" asChild><Link to="/trainer/customers/$id" params={{ id: sel.clientId }}>Hồ sơ hội viên</Link></Button>
          {sel.status === "AWAITING" ? <Button asChild><Link to="/trainer/verify">Xác nhận</Link></Button> : sel.status !== "COMPLETED" ? <Button asChild><Link to="/trainer/live">Bắt đầu buổi tập</Link></Button> : null}
        </>
      )}>
        {sel ? <StatusBadge status={toStatus(sel.status)} label={sel.status.replace("_", " ")} /> : null}
      </FormModal>
    </>
  );
}
