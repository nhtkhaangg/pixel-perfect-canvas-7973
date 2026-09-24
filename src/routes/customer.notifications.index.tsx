import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarClock, CreditCard, MessageSquare, Package, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { notificationStore, useNotifications } from "@/lib/notifications-store";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/notifications/")({
  head: () => seo("Notifications", "Package, session, payment and chat notifications."),
  component: NotificationsPage,
});

const typeIcon = { package: Package, session: CalendarClock, payment: CreditCard, system: Bell, chat: MessageSquare };

function NotificationsPage() {
  const all = useNotifications();
  const [tab, setTab] = useState("all");
  const [sel, setSel] = useState<string[]>([]);
  const list = all.filter((n) => tab === "all" || (tab === "unread" ? !n.read : n.type === tab));

  return (
    <>
      <PageHeader title="Notifications" description={`${all.filter((n) => !n.read).length} unread`} actions={<Button variant="outline" onClick={() => notificationStore.markRead(all.map((n) => n.id))}>Mark all read</Button>} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="package">Packages</TabsTrigger>
            <TabsTrigger value="session">Sessions</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
          </TabsList>
        </Tabs>
        {sel.length ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => { notificationStore.markRead(sel); setSel([]); }}>Mark read ({sel.length})</Button>
            <Button size="sm" variant="destructive" onClick={() => { notificationStore.remove(sel); toast.success(`${sel.length} deleted`); setSel([]); }}><Trash2 className="size-4" /> Delete</Button>
          </div>
        ) : null}
      </div>
      {list.length ? (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {list.map((n) => {
            const Icon = typeIcon[n.type];
            return (
              <li key={n.id} className={cn("flex items-start gap-4 px-4 py-4", !n.read && "bg-accent/40")}>
                <Checkbox className="mt-2" checked={sel.includes(n.id)} onCheckedChange={(v) => setSel(v ? [...sel, n.id] : sel.filter((x) => x !== n.id))} />
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted"><Icon className="size-4" /></span>
                <Link to="/customer/notifications/$id" params={{ id: n.id }} className="min-w-0 flex-1" onClick={() => notificationStore.markRead([n.id])}>
                  <p className={cn("text-sm", !n.read && "font-semibold")}>{n.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
                </Link>
                {!n.read ? <span className="mt-2 size-2 rounded-full bg-primary" /> : null}
                <Button size="icon" variant="ghost" className="size-8" aria-label="Delete" onClick={() => { notificationStore.remove([n.id]); toast("Notification deleted"); }}><Trash2 className="size-4" /></Button>
              </li>
            );
          })}
        </ul>
      ) : <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />}
    </>
  );
}
