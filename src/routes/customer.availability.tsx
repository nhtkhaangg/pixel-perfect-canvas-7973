import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { defaultAvailability, timeSlots, weekDays, me } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/availability")({
  head: () => seo("Lịch rảnh trong tuần", "Đánh dấu khung giờ bạn có thể tập để huấn luyện viên sắp xếp buổi tập phù hợp."),
  component: Availability,
});

function Availability() {
  const [grid, setGrid] = useState<Record<string, boolean>>(defaultAvailability);
  const count = Object.values(grid).filter(Boolean).length;
  const toggle = (k: string) => setGrid((g) => ({ ...g, [k]: !g[k] }));

  return (
    <>
      <PageHeader
        title="Lịch rảnh trong tuần"
        description="Nhấp vào từng khung giờ để đánh dấu thời gian bạn có thể tập. Huấn luyện viên chỉ đặt lịch trong các khung giờ này."
        actions={<><Button variant="outline" onClick={() => setGrid({})}>Xóa hết</Button><Button onClick={() => toast.success("Đã lưu lịch rảnh", { description: `${count} khung giờ đã được chia sẻ với ${me.trainerName}` })}>Lưu lịch rảnh</Button></>}
      />
      <div className="overflow-x-auto rounded-lg border border-border bg-card p-4">
        <table className="w-full min-w-[640px] border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="w-16" />
              {weekDays.map((d) => (
                <th key={d} className="text-xs font-medium text-muted-foreground">
                  <button type="button" className="hover:text-foreground" onClick={() => setGrid((g) => { const all = timeSlots.every((t) => g[`${d}-${t}`]); const n = { ...g }; timeSlots.forEach((t) => (n[`${d}-${t}`] = !all)); return n; })}>{d}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((t) => (
              <tr key={t}>
                <td className="pr-2 text-right text-xs text-muted-foreground">{t}</td>
                {weekDays.map((d) => {
                  const k = `${d}-${t}`;
                  return (
                    <td key={k}>
                      <button
                        type="button"
                        aria-pressed={!!grid[k]}
                        aria-label={`${d} ${t}`}
                        onClick={() => toggle(k)}
                        className={cn("h-10 w-full rounded-md border text-xs transition-colors", grid[k] ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/40 hover:bg-muted")}
                      >
                        {grid[k] ? "Rảnh" : ""}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-primary" /> Rảnh</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm border border-border bg-muted/40" /> Bận</span>
        <span className="ml-auto font-medium text-foreground">{count} giờ / tuần</span>
      </div>
    </>
  );
}
