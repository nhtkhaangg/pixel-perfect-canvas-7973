import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { clients, trainerKpis } from "@/lib/mock/trainer";
import { formatCurrency } from "@/lib/mock/public";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SimpleChart } from "@/components/shared/simple-chart";
import { Panel } from "@/components/customer/alerts";
import { TrainerPlateauAlert } from "@/components/trainer/plateau";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/trainer/progress")({
  head: () => seo("Tiến độ & chỉ số huấn luyện", "Kết quả của hội viên và các chỉ số huấn luyện của bạn."),
  component: ProgressPage,
});

function ProgressPage() {
  const active = clients.filter((c) => c.status === "ACTIVE");
  const gains = active.map((c) => {
    const f = c.metrics[0]!, l = c.metrics[c.metrics.length - 1]!;
    return { name: c.name.split(" ")[0]!, bench: +(((l.bench - f.bench) / f.bench) * 100).toFixed(1), weight: +(l.weight - f.weight).toFixed(1) };
  });
  const avgAdh = Math.round(active.reduce((s, c) => s + c.adherence, 0) / active.length);
  return (
    <>
      <PageHeader title="Tiến độ & chỉ số huấn luyện" description="Mức độ tiến bộ của hội viên và tình hình kinh doanh huấn luyện của bạn." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tuân thủ trung bình" value={`${avgAdh}%`} delta={3} />
        <StatCard label="Tăng đẩy ngực TB" value={`${(gains.reduce((s, g) => s + g.bench, 0) / gains.length).toFixed(1)}%`} hint="kể từ tháng 7" />
        <StatCard label="Số buổi (6 tháng)" value={trainerKpis.reduce((s, k) => s + k.sessions, 0)} />
        <StatCard label="Doanh thu (6 tháng)" value={formatCurrency(trainerKpis.reduce((s, k) => s + k.revenue, 0))} />
      </div>
      <TrainerPlateauAlert />
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleChart type="bar" title="Tăng đẩy ngực theo hội viên" description="% kể từ lần đo đầu tiên" data={gains} xKey="name" series={[{ key: "bench", label: "Đẩy ngực %" }]} />
        <SimpleChart type="bar" title="Thay đổi cân nặng theo hội viên" description="kg" data={gains} xKey="name" series={[{ key: "weight", label: "kg", color: "var(--chart-2)" }]} />
        <SimpleChart title="Doanh thu theo tháng" data={trainerKpis} xKey="month" series={[{ key: "revenue", label: "Doanh thu (₫)" }]} />
        <Panel title="Tuân thủ theo hội viên">
          <ul className="space-y-3">{active.map((c) => <li key={c.id}><div className="flex justify-between text-sm"><Link to="/trainer/customers/$id" params={{ id: c.id }} className="hover:text-primary">{c.name}</Link><span className="text-muted-foreground">{c.adherence}%</span></div><Progress value={c.adherence} className="mt-1.5 h-1.5" /></li>)}</ul>
        </Panel>
      </div>
    </>
  );
}
