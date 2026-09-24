import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Plus, ShieldCheck, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { sessions, toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Panel } from "@/components/customer/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/sessions/$id")({
  loader: ({ params }) => {
    const session = sessions.find((s) => s.id === params.id);
    if (!session) throw notFound();
    return { session };
  },
  head: ({ loaderData }) => (loaderData ? seo(`Buổi tập — ${loaderData.session.focus}`, "Ghi lại dữ liệu tập luyện, gửi phản hồi và hoàn tất buổi tập.") : { meta: [{ title: "Không tìm thấy buổi tập — GymFit" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <EmptyState title="Không tìm thấy buổi tập" action={<Button asChild><Link to="/customer/sessions">Tất cả buổi tập</Link></Button>} />,
  component: SessionDetail,
});

type SetRow = { exercise: string; set: number; reps: string; weight: string; done: boolean };

function SessionDetail() {
  const { session } = Route.useLoaderData();
  const [rows, setRows] = useState<SetRow[]>(() =>
    session.exercises.flatMap((e) => Array.from({ length: e.sets }, (_, i) => ({ exercise: e.name, set: i + 1, reps: e.reps, weight: String(e.weight), done: session.status === "COMPLETED" }))),
  );
  const [rpe, setRpe] = useState([7]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(session.status === "COMPLETED");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(session.status);
  const done = rows.filter((r) => r.done).length;
  const volume = rows.filter((r) => r.done).reduce((s, r) => s + Number(r.weight) * (parseInt(r.reps) || 0), 0);
  const locked = status === "COMPLETED";
  const update = (i: number, patch: Partial<SetRow>) => setRows((r) => r.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  function finish() {
    if (otp !== "4821") { toast.error("Mã không hợp lệ", { description: "Hỏi huấn luyện viên mã 4 số của buổi tập (demo: 4821)." }); return; }
    setStatus("COMPLETED");
    toast.success("Đã xác nhận & hoàn tất buổi tập", { description: "Đã trừ 1 buổi trong gói PT Transform 24." });
  }

  return (
    <>
      <Link to="/customer/sessions" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Buổi tập</Link>
      <PageHeader title={session.focus} description={`${session.date} · ${session.start}–${session.end} · ${session.trainer} · ${session.room}`} actions={<StatusBadge status={toStatus(status)} label={status.replace("_", " ")} />} />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Panel title="Nhật ký tập luyện" action={<span className="text-xs text-muted-foreground">{done}/{rows.length} set · {volume.toLocaleString("vi-VN")} kg tổng khối lượng</span>}>
          {rows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground"><tr><th className="pb-2">Bài tập</th><th className="pb-2">Set</th><th className="pb-2">Reps</th><th className="pb-2">Kg</th><th className="pb-2 text-right">Hoàn thành</th><th /></tr></thead>
                <tbody className="divide-y divide-border">
                  {rows.map((r, i) => (
                    <tr key={i} className={cn(r.done && "text-muted-foreground")}>
                      <td className="py-2 pr-2 font-medium">{r.set === 1 || rows[i - 1]?.exercise !== r.exercise ? r.exercise : ""}</td>
                      <td className="py-2">{r.set}</td>
                      <td className="py-2"><Input disabled={locked} className="h-8 w-16" value={r.reps} onChange={(e) => update(i, { reps: e.target.value })} /></td>
                      <td className="py-2"><Input disabled={locked} className="h-8 w-20" type="number" value={r.weight} onChange={(e) => update(i, { weight: e.target.value })} /></td>
                      <td className="py-2 text-right"><button type="button" disabled={locked} onClick={() => update(i, { done: !r.done })} aria-label="Đánh dấu hoàn thành set"><CheckCircle2 className={cn("size-5", r.done ? "text-primary" : "text-muted-foreground/40")} /></button></td>
                      <td className="py-2 pl-2">{!locked ? <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} aria-label="Xóa set"><Trash2 className="size-4 text-muted-foreground" /></button> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <EmptyState title="Chưa có bài tập nào" />}
          {!locked && rows.length ? (
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { const l = rows[rows.length - 1]!; setRows([...rows, { ...l, set: l.set + 1, done: false }]); }}><Plus className="size-4" /> Thêm set</Button>
              <Button size="sm" onClick={() => toast.success("Đã lưu dữ liệu tập luyện")}>Lưu nhật ký</Button>
            </div>
          ) : null}
        </Panel>

        <div className="space-y-6">
          <Panel title="Phản hồi buổi tập">
            {feedbackSent ? (
              <p className="text-sm text-muted-foreground">Đã gửi phản hồi cho {session.trainer}. Cảm ơn bạn!</p>
            ) : (
              <div className="space-y-4">
                <div><Label>Mức độ gắng sức (RPE): <span className="text-primary">{rpe[0]}</span>/10</Label><Slider className="mt-3" min={1} max={10} value={rpe} onValueChange={setRpe} /></div>
                <div>
                  <Label>Buổi tập hôm nay thế nào?</Label>
                  <div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" onClick={() => setRating(n)}><Star className={cn("size-6", n <= rating ? "fill-primary text-primary" : "text-muted-foreground/40")} /></button>)}</div>
                </div>
                <Textarea placeholder="Đau nhức, năng lượng, hoặc điều gì huấn luyện viên cần biết…" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <Button size="sm" className="w-full" disabled={!rating} onClick={() => { setFeedbackSent(true); toast.success("Đã gửi phản hồi"); }}>Gửi phản hồi</Button>
              </div>
            )}
          </Panel>
          <Panel title="Xác nhận & hoàn tất">
            {locked ? (
              <div className="flex items-center gap-3 text-sm"><ShieldCheck className="size-8 text-primary" /><div><p className="font-medium">Buổi tập đã được xác nhận</p><p className="text-muted-foreground">Đã tính vào gói PT của bạn.</p></div></div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Nhập mã 4 số hiển thị trên ứng dụng của huấn luyện viên để xác nhận buổi tập đã diễn ra.</p>
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
                </InputOTP>
                <Button className="w-full" disabled={otp.length < 4} onClick={finish}>Xác nhận & hoàn tất buổi tập</Button>
                <p className="text-xs text-muted-foreground">Mã demo: 4821</p>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
