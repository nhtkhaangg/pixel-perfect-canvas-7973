import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, History, Rocket, Sparkles, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { toStatus } from "@/lib/mock/customer";
import type { WorkoutPlan } from "@/lib/mock/trainer";
import { planStore } from "@/lib/trainer-stores";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { Panel } from "@/components/customer/alerts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/trainer/plans/$id")({
  head: () => seo("Giáo án tập luyện", "Chi tiết giáo án, cột mốc và lịch sử phiên bản."),
  component: PlanDetail,
});

type Milestone = WorkoutPlan["milestones"][number];

function PlanDetail() {
  const { id } = Route.useParams();
  const all = planStore.use();
  const p = all.find((x) => x.id === id);
  const [review, setReview] = useState<Milestone | null>(null);
  const [note, setNote] = useState("");
  if (!p) return <EmptyState title="Không tìm thấy giáo án" action={<Button asChild><Link to="/trainer/plans">Quay lại</Link></Button>} />;

  function publish() {
    all.filter((x) => x.clientId === p!.clientId && x.status === "ACTIVE" && x.id !== p!.id).forEach((x) => planStore.upsert({ ...x, status: "ARCHIVED" }));
    const version = p!.status === "DRAFT" ? p!.version : p!.version + 1;
    planStore.upsert({ ...p!, status: "ACTIVE", version, updatedAt: "2026-09-24", versions: [{ version, date: "2026-09-24", author: "Maya Nguyen", change: "Đã xuất bản & kích hoạt", status: "ACTIVE" as const }, ...p!.versions.filter((v) => v.version !== version).map((v) => ({ ...v, status: "ARCHIVED" as const }))] });
    toast.success(`Đã xuất bản & kích hoạt giáo án v${version}`, { description: `${p!.client} giờ có thể xem trong lộ trình của mình.` });
  }
  function saveReview(status: Milestone["status"]) {
    planStore.upsert({ ...p!, milestones: p!.milestones.map((m) => (m.week === review!.week ? { ...m, status, review: note } : m)) });
    setReview(null); toast.success("Đã đánh giá cột mốc");
  }

  return (
    <>
      <Link to="/trainer/plans" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Giáo án tập luyện</Link>
      <PageHeader
        title={p.title}
        description={`${p.client} · ${p.goal} · ${p.durationWeeks} tuần`}
        actions={
          <>
            <StatusBadge status={p.status === "ARCHIVED" ? "expired" : toStatus(p.status)} label={`${p.status} · v${p.version}`} />
            {p.isAiGenerated ? <Badge variant="secondary"><Sparkles className="size-3" /> Tạo bởi AI</Badge> : null}
            {p.status !== "ACTIVE" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild><Button><Rocket className="size-4" /> Xuất bản & kích hoạt</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Xuất bản giáo án này?</AlertDialogTitle><AlertDialogDescription>Giáo án đang hoạt động hiện tại của {p.client} sẽ được lưu trữ và giáo án này trở thành ACTIVE ngay lập tức.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Hủy</AlertDialogCancel><AlertDialogAction onClick={publish}>Xuất bản</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : <Button variant="outline" onClick={() => { planStore.upsert({ ...p, status: "DRAFT", version: p.version + 1, versions: [{ version: p.version + 1, date: "2026-09-24", author: "Maya Nguyen", change: "Bản nháp mới từ v" + p.version, status: "DRAFT" }, ...p.versions] }); toast("Đã tạo phiên bản nháp mới"); }}>Tạo phiên bản mới</Button>}
          </>
        }
      />
      <Tabs defaultValue="plan">
        <TabsList><TabsTrigger value="plan">Giáo án</TabsTrigger><TabsTrigger value="milestones">Cột mốc</TabsTrigger><TabsTrigger value="history">Lịch sử phiên bản</TabsTrigger></TabsList>
        <TabsContent value="plan" className="mt-4 grid gap-4 md:grid-cols-2">
          {p.weeks.map((w) => (
            <div key={w.week} className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">Từ tuần {w.week}</p>
              <p className="font-semibold">{w.focus}</p>
              <ul className="mt-3 flex flex-wrap gap-2">{w.sessions.map((s) => <li key={s} className="rounded-md bg-muted px-2.5 py-1 text-sm">{s}</li>)}</ul>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="milestones" className="mt-4">
          <Panel title="Đánh giá cột mốc">
            <ul className="divide-y divide-border">
              {p.milestones.map((m) => {
                const Icon = m.status === "COMPLETED" ? CheckCircle2 : m.status === "MISSED" ? XCircle : Circle;
                return (
                  <li key={m.week} className="flex flex-wrap items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <Icon className={`mt-0.5 size-5 ${m.status === "COMPLETED" ? "text-primary" : m.status === "MISSED" ? "text-destructive" : "text-muted-foreground"}`} />
                    <div className="flex-1"><p className="font-medium">Tuần {m.week}: {m.title}</p><p className="text-sm text-muted-foreground">Mục tiêu: {m.target}</p>{m.review ? <p className="mt-1 text-sm">Nhận xét: {m.review}</p> : null}</div>
                    <StatusBadge status={m.status === "MISSED" ? "missed" : toStatus(m.status)} label={m.status} />
                    <Button size="sm" variant="outline" onClick={() => { setReview(m); setNote(m.review ?? ""); }}>Đánh giá</Button>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <ol className="space-y-3">
            {p.versions.map((v) => (
              <li key={v.version} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex size-9 items-center justify-center rounded-md bg-muted"><History className="size-4" /></span>
                <div className="flex-1"><p className="font-medium">v{v.version} · {v.change}</p><p className="text-xs text-muted-foreground">{v.date} · {v.author}</p></div>
                <StatusBadge status={v.status === "ARCHIVED" ? "expired" : toStatus(v.status)} label={v.status} />
                {v.status === "ARCHIVED" ? <Button size="sm" variant="ghost" onClick={() => toast(`Đã khôi phục v${v.version} thành bản nháp mới`)}>Khôi phục</Button> : null}
              </li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>
      <FormModal open={!!review} onOpenChange={(o) => !o && setReview(null)} title={review ? `Đánh giá: ${review.title}` : ""} description={review ? `Tuần ${review.week} · mục tiêu ${review.target}` : ""} footer={<><Button variant="outline" onClick={() => saveReview("MISSED")}>Đánh dấu chưa đạt</Button><Button onClick={() => saveReview("COMPLETED")}>Đánh dấu đã đạt</Button></>}>
        <Textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Đã diễn ra như thế nào? Có điều chỉnh gì cho giáo án không?" />
      </FormModal>
    </>
  );
}
