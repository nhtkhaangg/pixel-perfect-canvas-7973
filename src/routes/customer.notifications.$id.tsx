import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { notificationStore, useNotifications } from "@/lib/notifications-store";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/notifications/$id")({
  head: () => seo("Thông báo", "Chi tiết thông báo."),
  component: NotificationDetail,
});

const typeLabel = { package: "Gói tập", session: "Buổi tập", payment: "Thanh toán", system: "Hệ thống", chat: "Trò chuyện" } as const;

const cta = {
  package: { to: "/customer/packages", label: "Xem gói tập của tôi" },
  session: { to: "/customer/reschedule", label: "Xem yêu cầu đổi lịch" },
  payment: { to: "/customer/packages", label: "Xem giao dịch" },
  system: { to: "/customer/progress", label: "Xem tiến độ" },
  chat: { to: "/customer/chat", label: "Mở trò chuyện" },
} as const;

function NotificationDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const n = useNotifications().find((x) => x.id === id);
  useEffect(() => { if (n && !n.read) notificationStore.markRead([n.id]); }, [n]);

  if (!n) return <EmptyState title="Không tìm thấy thông báo" description="Thông báo có thể đã bị xóa." action={<Button asChild><Link to="/customer/notifications">Tất cả thông báo</Link></Button>} />;
  const action = cta[n.type];

  return (
    <>
      <Link to="/customer/notifications" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Thông báo</Link>
      <article className="max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between"><Badge variant="secondary">{typeLabel[n.type]}</Badge><span className="text-xs text-muted-foreground">{n.date}</span></div>
        <h1 className="mt-4 text-xl font-semibold">{n.title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{n.detail}</p>
        <div className="mt-6 flex gap-2 border-t border-border pt-5">
          <Button asChild><Link to={action.to}>{action.label}</Link></Button>
          <Button variant="outline" onClick={() => { notificationStore.markRead([n.id], false); toast("Đã đánh dấu chưa đọc"); }}>Đánh dấu chưa đọc</Button>
          <Button variant="ghost" className="ml-auto text-destructive" onClick={() => { notificationStore.remove([n.id]); toast.success("Đã xóa"); navigate({ to: "/customer/notifications" }); }}><Trash2 className="size-4" /> Xóa</Button>
        </div>
      </article>
    </>
  );
}
