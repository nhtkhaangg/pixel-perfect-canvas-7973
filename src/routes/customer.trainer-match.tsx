import { createFileRoute, Link } from "@tanstack/react-router";
import { RefreshCw, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { trainers } from "@/lib/mock/public";
import { me, trainerSuggestions } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { Avatar } from "@/components/public/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/trainer-match")({
  head: () => seo("Huấn luyện viên phù hợp", "Danh sách huấn luyện viên được AI gợi ý dựa trên mục tiêu và lịch trống của bạn."),
  component: TrainerMatch,
});

function TrainerMatch() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(trainerSuggestions);
  return (
    <>
      <PageHeader
        title="Huấn luyện viên phù hợp"
        description={`Dựa trên mục tiêu của bạn ("${me.goal}"), lịch trống và kết quả đánh giá thể lực.`}
        actions={<Button variant="outline" disabled={loading} onClick={() => { setLoading(true); setTimeout(() => { setOrder([...order]); setLoading(false); }, 1200); }}><RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} /> Gợi ý lại</Button>}
      />
      <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-accent px-4 py-3 text-sm text-accent-foreground">
        <Sparkles className="size-4" /> Gợi ý AI — điểm phù hợp kết hợp chuyên môn, lịch trống, đánh giá và khu vực tập.
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {order.map((s, i) => {
          const t = trainers.find((x) => x.id === s.trainerId)!;
          return (
            <div key={s.trainerId} className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${i === 0 ? "border-primary ring-1 ring-primary" : "border-border"} ${loading ? "animate-pulse" : ""}`}>
              <div className="flex items-start justify-between">
                <Avatar name={t.name} size="lg" />
                <div className="text-right"><p className="text-3xl font-semibold text-primary">{s.match}%</p><p className="text-xs text-muted-foreground">độ phù hợp</p></div>
              </div>
              <p className="mt-4 text-lg font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.specialization}</p>
              <div className="mt-2 flex items-center gap-3 text-sm"><span className="flex items-center gap-1"><Star className="size-3.5 fill-primary text-primary" />{t.ratingAvg}</span><span className="text-muted-foreground">{t.experienceYears} năm kinh nghiệm · {t.branch}</span></div>
              <ul className="mt-4 flex-1 space-y-2 text-sm">{s.reasons.map((r) => <li key={r} className="flex gap-2"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />{r}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-1">{t.tags.map((x) => <Badge key={x} variant="secondary">{x}</Badge>)}</div>
              <div className="mt-5 flex gap-2">
                <Button className="flex-1" asChild><Link to="/customer/book-pt">Đặt lịch</Link></Button>
                <Button variant="outline" asChild><Link to="/trainers/$id" params={{ id: t.id }}>Xem hồ sơ</Link></Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
