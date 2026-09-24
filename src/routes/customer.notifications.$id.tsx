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
  head: () => seo("Notification", "Notification details."),
  component: NotificationDetail,
});

const cta = {
  package: { to: "/customer/packages", label: "View my packages" },
  session: { to: "/customer/reschedule", label: "Open reschedule requests" },
  payment: { to: "/customer/packages", label: "View transactions" },
  system: { to: "/customer/progress", label: "View progress" },
  chat: { to: "/customer/chat", label: "Open chat" },
} as const;

function NotificationDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const n = useNotifications().find((x) => x.id === id);
  useEffect(() => { if (n && !n.read) notificationStore.markRead([n.id]); }, [n]);

  if (!n) return <EmptyState title="Notification not found" description="It may have been deleted." action={<Button asChild><Link to="/customer/notifications">All notifications</Link></Button>} />;
  const action = cta[n.type];

  return (
    <>
      <Link to="/customer/notifications" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Notifications</Link>
      <article className="max-w-2xl rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between"><Badge variant="secondary" className="capitalize">{n.type}</Badge><span className="text-xs text-muted-foreground">{n.date}</span></div>
        <h1 className="mt-4 text-xl font-semibold">{n.title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{n.detail}</p>
        <div className="mt-6 flex gap-2 border-t border-border pt-5">
          <Button asChild><Link to={action.to}>{action.label}</Link></Button>
          <Button variant="outline" onClick={() => { notificationStore.markRead([n.id], false); toast("Marked as unread"); }}>Mark unread</Button>
          <Button variant="ghost" className="ml-auto text-destructive" onClick={() => { notificationStore.remove([n.id]); toast.success("Deleted"); navigate({ to: "/customer/notifications" }); }}><Trash2 className="size-4" /> Delete</Button>
        </div>
      </article>
    </>
  );
}
