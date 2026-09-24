import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Dumbbell, Flame, Scale } from "lucide-react";
import { seo } from "@/lib/seo";
import { vnDate } from "@/lib/utils";
import { bodyMetrics, customerPackages, me, notifications, sessions, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SimpleChart } from "@/components/shared/simple-chart";
import { ExpiringPackageBanner, Panel, PlateauAlertCard } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/")({
  head: () => seo("Trang tổng quan hội viên", "Tổng quan GymFit của bạn: gói tập, lịch tập sắp tới, tiến độ cơ thể và cảnh báo."),
  component: Dashboard,
});

function Dashboard() {
  const pt = customerPackages.find((p) => p.type === "PT" && p.status === "ACTIVE")!;
  const upcoming = sessions.filter((s) => s.status === "UPCOMING" || s.status === "IN_PROGRESS").slice(0, 4);
  const recent = sessions.filter((s) => s.status === "COMPLETED" || s.status === "MISSED").slice(0, 3);
  const first = bodyMetrics[0]!, last = bodyMetrics[bodyMetrics.length - 1]!;
  return (
    <>
      <PageHeader
        title={`Chào buổi tối, ${me.name.split(" ").pop()}`}
        description={`Mục tiêu: ${me.goal}`}
        actions={<><Button variant="outline" asChild><Link to="/customer/check-in">Mã QR của tôi</Link></Button><Button asChild><Link to="/customer/sessions/$id" params={{ id: "s_18" }}>Buổi tập hôm nay</Link></Button></>}
      />
      <ExpiringPackageBanner />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Cân nặng" value={`${last.weight} kg`} delta={-(((first.weight - last.weight) / first.weight) * 100)} hint="từ tháng 6" icon={Scale} />
        <StatCard label="Tỷ lệ mỡ" value={`${last.bodyFat}%`} delta={-(first.bodyFat - last.bodyFat)} hint="điểm % từ tháng 6" icon={Flame} />
        <StatCard label="Buổi PT còn lại" value={(pt.totalSessions ?? 0) - pt.usedSessions} hint={`trên ${pt.totalSessions} · ${pt.name}`} icon={Dumbbell} />
        <StatCard label="Lượt tập tháng này" value={14} delta={16} hint="so với tháng 8" icon={CalendarDays} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SimpleChart className="lg:col-span-2" title="Tiến độ cơ thể" description="Cân nặng (kg) và tỷ lệ mỡ (%)" data={bodyMetrics} xKey="date" series={[{ key: "weight", label: "Cân nặng" }, { key: "bodyFat", label: "Tỷ lệ mỡ" }]} />
        <PlateauAlertCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Lịch tập sắp tới" className="lg:col-span-2" action={<Button size="sm" variant="ghost" asChild><Link to="/customer/schedule">Lịch</Link></Button>}>
          <ul className="divide-y divide-border">
            {upcoming.map((s) => (
              <li key={s.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="w-16 text-center">
                  <p className="text-xs text-muted-foreground">{vnDate(s.date)}</p>
                  <p className="font-semibold">{s.start}</p>
                </div>
                <div className="flex-1">
                  <Link to="/customer/sessions/$id" params={{ id: s.id }} className="font-medium hover:text-primary">{s.focus}</Link>
                  <p className="text-xs text-muted-foreground">{s.trainer} · {s.room}</p>
                </div>
                <StatusBadge status={toStatus(s.status)} />
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-6">
          <Panel title="Gói PT">
            <p className="font-medium">{pt.name}</p>
            <p className="text-xs text-muted-foreground">cùng {pt.trainer} · kết thúc {vnDate(pt.endDate)}</p>
            <Progress value={(pt.usedSessions / (pt.totalSessions ?? 1)) * 100} className="mt-4 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">Đã dùng {pt.usedSessions}/{pt.totalSessions} buổi</p>
          </Panel>
          <Panel title="Thông báo mới nhất" action={<Button size="sm" variant="ghost" asChild><Link to="/customer/notifications">Tất cả</Link></Button>}>
            <ul className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <li key={n.id}>
                  <Link to="/customer/notifications/$id" params={{ id: n.id }} className="block text-sm hover:text-primary">
                    {!n.read ? <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" /> : null}
                    {n.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{n.date}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Hoạt động gần đây">
          <ul className="divide-y divide-border">
            {recent.map((s) => (
              <li key={s.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="w-16 text-center">
                  <p className="text-xs text-muted-foreground">{vnDate(s.date)}</p>
                  <p className="font-semibold">{s.start}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{s.focus}</p>
                  <p className="text-xs text-muted-foreground">{s.trainer} · {s.room}</p>
                </div>
                <StatusBadge status={toStatus(s.status)} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Thao tác nhanh">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start" asChild><Link to="/customer/metrics">Cập nhật số đo</Link></Button>
            <Button variant="outline" className="justify-start" asChild><Link to="/customer/book-pt">Đặt lịch PT</Link></Button>
            <Button variant="outline" className="justify-start" asChild><Link to="/customer/reschedule">Đổi lịch tập</Link></Button>
            <Button variant="outline" className="justify-start" asChild><Link to="/customer/workouts">Bài tập mẫu</Link></Button>
          </div>
        </Panel>
      </div>
    </>
  );
}
