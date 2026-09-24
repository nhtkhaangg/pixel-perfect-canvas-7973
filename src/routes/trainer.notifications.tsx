import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Bell, CalendarClock, Star, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { trainerNotifications } from "@/lib/mock/trainer";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { TrainerPlateauAlert } from "@/components/trainer/plateau";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer/notifications")({
  head: () => seo("Thông báo huấn luyện viên", "Cảnh báo về hội viên, buổi tập, chứng chỉ và đánh giá."),
  component: Notifications,
});

const icons = { alert: AlertTriangle, session: CalendarClock, system: Bell, client: UserPlus, review: Star } as const;

function Notifications() {
  const [list, setList] = useState(trainerNotifications);
  const [tab, setTab] = useState("all");
  const shown = list.filter((n) => tab === "all" || (tab === "unread" ? !n.read : n.type === tab));
  return (
    <>
      <PageHeader title="Thông báo" description={`${list.filter((n) => !n.read).length} chưa đọc`} actions={<Button variant="outline" onClick={() => setList(list.map((n) => ({ ...n, read: true })))}>Đánh dấu đã đọc tất cả</Button>} />
      <TrainerPlateauAlert />
      <Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="all">Tất cả</TabsTrigger><TabsTrigger value="unread">Chưa đọc</TabsTrigger><TabsTrigger value="alert">Cảnh báo</TabsTrigger><TabsTrigger value="session">Buổi tập</TabsTrigger></TabsList></Tabs>
      {shown.length ? (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {shown.map((n) => {
            const Icon = icons[n.type as keyof typeof icons] ?? Bell;
            return (
              <li key={n.id} className={cn("flex items-start gap-4 px-4 py-4", !n.read && "bg-accent/40")}>
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-md", n.type === "alert" ? "bg-destructive/10 text-destructive" : "bg-muted")}><Icon className="size-4" /></span>
                <button type="button" className="flex-1 text-left" onClick={() => setList(list.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}>
                  <p className={cn("text-sm", !n.read && "font-semibold")}>{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
                </button>
                <Button size="icon" variant="ghost" className="size-8" aria-label="Xóa" onClick={() => { setList(list.filter((x) => x.id !== n.id)); toast("Đã xóa"); }}><Trash2 className="size-4" /></Button>
              </li>
            );
          })}
        </ul>
      ) : <EmptyState icon={Bell} title="Không có thông báo" />}
    </>
  );
}
