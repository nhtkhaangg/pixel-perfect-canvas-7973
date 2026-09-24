import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, DollarSign, Star, Users } from "lucide-react";
import { seo } from "@/lib/seo";
import { bookings, clients, trainerKpis, trainerMe, trainerNotifications } from "@/lib/mock/trainer";
import { toStatus } from "@/lib/mock/customer";
import { formatCurrency } from "@/lib/mock/public";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SimpleChart } from "@/components/shared/simple-chart";
import { Panel } from "@/components/customer/alerts";
import { TrainerPlateauAlert } from "@/components/trainer/plateau";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trainer/")({
  head: () => seo("Bảng điều khiển huấn luyện viên", "Buổi tập hôm nay, cảnh báo hội viên và các chỉ số huấn luyện."),
  component: Dashboard,
});

function Dashboard() {
  const today = bookings.filter((b) => b.date === "2026-09-24");
  const upcoming = bookings.filter((b) => b.status === "UPCOMING").slice(0, 5);
  const awaiting = bookings.filter((b) => b.status === "AWAITING").length;
  const last = trainerKpis[trainerKpis.length - 1]!;
  return (
    <>
      <PageHeader title={`Chào mừng trở lại, ${trainerMe.name.split(" ").slice(-1)[0]}`} description={`${today.length} buổi tập hôm nay · ${awaiting} buổi chờ xác nhận`} actions={<><Button variant="outline" asChild><Link to="/trainer/verify">Xác nhận buổi tập</Link></Button><Button asChild><Link to="/trainer/live">Bắt đầu buổi tập trực tiếp</Link></Button></>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Hội viên đang hoạt động" value={clients.filter((c) => c.status === "ACTIVE").length} hint="+1 đang chờ" icon={Users} />
        <StatCard label="Buổi tập trong tháng" value={last.sessions} delta={-8} hint="so với tháng trước" icon={CalendarDays} />
        <StatCard label="Thu nhập (T9)" value={formatCurrency(last.revenue)} delta={-8} icon={DollarSign} />
        <StatCard label="Đánh giá" value={trainerMe.ratingAvg} hint="128 lượt đánh giá" icon={Star} />
      </div>
      <TrainerPlateauAlert />
      <div className="grid gap-6 lg:grid-cols-3">
        <SimpleChart className="lg:col-span-2" type="bar" title="Buổi tập đã thực hiện" description="6 tháng gần nhất" data={trainerKpis} xKey="month" series={[{ key: "sessions", label: "Buổi tập" }]} />
        <Panel title="Hôm nay">
          <ul className="space-y-3">
            {today.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-2">
                <div><p className="text-sm font-medium">{b.start} · {b.client}</p><p className="text-xs text-muted-foreground">{b.focus}</p></div>
                <StatusBadge status={toStatus(b.status)} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Lịch tập sắp tới" action={<Button size="sm" variant="ghost" asChild><Link to="/trainer/schedule">Lịch</Link></Button>}>
          <ul className="divide-y divide-border">
            {upcoming.map((b) => <li key={b.id} className="flex justify-between py-2.5 text-sm first:pt-0"><span>{vnDateShort(b.date)} {b.start} · <span className="font-medium">{b.client}</span></span><span className="text-muted-foreground">{b.focus}</span></li>)}
          </ul>
        </Panel>
        <Panel title="Thông báo" action={<Button size="sm" variant="ghost" asChild><Link to="/trainer/notifications">Xem tất cả</Link></Button>}>
          <ul className="space-y-3">
            {trainerNotifications.slice(0, 4).map((n) => <li key={n.id} className="text-sm">{!n.read ? <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" /> : null}<span className="font-medium">{n.title}</span><p className="text-xs text-muted-foreground">{n.body}</p></li>)}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function vnDateShort(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}`;
}
