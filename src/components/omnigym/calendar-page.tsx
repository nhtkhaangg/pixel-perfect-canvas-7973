import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { canonicalCustomers, type RecordRow } from "@/lib/omnigym/data";
import { PageHeader } from "@/components/shared/page-header";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlanWorkspace } from "./plan-workspace";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export function CalendarPage({ trainer = false }: { trainer?: boolean }) {
  const rows = useEntities("schedule");
  const [monday, setMonday] = useState(new Date(2026, 8, 21));
  const [selected, setSelected] = useState<RecordRow | null>(null);
  const [reschedule, setReschedule] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const days = Array.from(
    { length: 7 },
    (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i),
  );
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const calendar = (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-3">
        <Button
          size="icon"
          variant="ghost"
          aria-label="Tuần trước"
          onClick={() => setMonday(new Date(monday.getTime() - 7 * 86400000))}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="text-sm font-semibold">
          {days[0]?.toLocaleDateString("vi-VN")} – {days[6]?.toLocaleDateString("vi-VN")}
        </span>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Tuần sau"
          onClick={() => setMonday(new Date(monday.getTime() + 7 * 86400000))}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid min-w-[980px] grid-cols-7">
        {days.map((d) => (
          <div key={iso(d)} className="min-h-80 border-r border-border p-3 last:border-0">
            <p className="mb-4 text-xs font-semibold text-muted-foreground">
              {d.toLocaleDateString("vi-VN", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              })}
            </p>
            <div className="space-y-3">
              {rows
                .filter((r) => String(r["startTime"]).startsWith(iso(d)))
                .map((r) => (
                  <Button
                    key={String(r["id"])}
                    variant="ghost"
                    className="block h-auto w-full rounded-lg border border-border bg-primary/10 px-3 py-3 text-left whitespace-normal"
                    onClick={() => {
                      setSelected(r);
                      setReschedule(false);
                    }}
                  >
                    <p className="text-xs text-primary">{String(r["startTime"]).slice(11, 16)}</p>
                    <p className="mt-2 text-sm font-medium">
                      {canonicalCustomers.find((c) => c.id === r["cus_id"])?.fullName ?? "Học viên"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {String(r["session_notes"])}
                    </p>
                    <StatusBadge className="mt-3" status={String(r["status"])} />
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  function request() {
    if (!selected || !date || !time || !reason.trim()) {
      setError("Chọn ngày, giờ mới và nhập lý do");
      return;
    }
    entityStore.save("reschedule", {
      ...selected,
      reschedule_time: `${date} ${time}`,
      reschedule_reason: reason,
      reschedule_count: Number(selected["reschedule_count"] ?? 0) + 1,
    });
    toast.success("Đã gửi yêu cầu đổi lịch");
    setSelected(null);
  }
  return (
    <>
      <PageHeader
        title={trainer ? "Lịch huấn luyện" : "Lịch tập & PT"}
        actions={
          trainer ? (
            <Button variant="outline" asChild>
              <Link to="/trainer/reschedule/requests">Yêu cầu đổi lịch</Link>
            </Button>
          ) : undefined
        }
      />
      {trainer ? (
        calendar
      ) : (
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">Lịch tập</TabsTrigger>
            <TabsTrigger value="roadmap">Giáo án</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">{calendar}</TabsContent>
          <TabsContent value="roadmap">
            <PlanWorkspace />
          </TabsContent>
        </Tabs>
      )}
      <FormModal
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
        title={reschedule ? "Yêu cầu đổi lịch" : "Chi tiết buổi tập"}
        footer={
          reschedule ? (
            <Button onClick={request}>Gửi yêu cầu</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setReschedule(true);
                  setError("");
                }}
              >
                Yêu cầu đổi lịch
              </Button>
              {trainer && selected && (
                <Button asChild>
                  <Link to="/trainer/live-sessions/$id" params={{ id: String(selected["id"]) }}>
                    Bắt đầu buổi tập
                  </Link>
                </Button>
              )}
            </>
          )
        }
      >
        {reschedule ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Ngày mới" required>
                {(p) => (
                  <Input
                    {...p}
                    type="date"
                    name="reschedule_time"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                )}
              </FormField>
              <FormField label="Giờ mới" required>
                {(p) => (
                  <Input
                    {...p}
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                )}
              </FormField>
            </div>
            <FormField label="Lý do" required>
              {(p) => (
                <Textarea
                  {...p}
                  name="reschedule_reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              )}
            </FormField>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">{String(selected?.["startTime"] ?? "")}</p>
            <p className="text-sm">{String(selected?.["session_notes"] ?? "")}</p>
            <StatusBadge status={String(selected?.["status"] ?? "")} />
          </div>
        )}
      </FormModal>
    </>
  );
}
export function RescheduleRequests() {
  const requests = useEntities("reschedule");
  return (
    <>
      <PageHeader title="Yêu cầu đổi lịch" />
      {requests.length ? (
        requests.map((r) => (
          <div
            key={String(r["id"])}
            className="flex flex-wrap items-center gap-4 border-b border-border py-5"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {String(r["startTime"])} → {String(r["reschedule_time"])}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{String(r["reschedule_reason"])}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                entityStore.remove("reschedule", String(r["id"]));
                toast.success("Đã từ chối yêu cầu");
              }}
            >
              Từ chối
            </Button>
            <Button
              onClick={() => {
                const start = String(r["reschedule_time"]);
                const end = new Date(start.replace(" ", "T"));
                end.setHours(end.getHours() + 1);
                entityStore.save("schedule", {
                  ...r,
                  startTime: start,
                  endTime: `${start.slice(0, 10)} ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`,
                  status: "RESCHEDULED",
                });
                entityStore.remove("reschedule", String(r["id"]));
                toast.success("Lịch tập đã cập nhật cho hội viên và HLV");
              }}
            >
              Chấp nhận
            </Button>
          </div>
        ))
      ) : (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Không có yêu cầu đổi lịch đang chờ.
        </p>
      )}
    </>
  );
}
