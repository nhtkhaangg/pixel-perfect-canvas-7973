import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { trainerMe } from "@/lib/mock/trainer";
import { reviewStore } from "@/lib/trainer-stores";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, Stars } from "@/components/public/cards";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/trainer/reviews/$id")({
  head: () => seo("Đánh giá", "Chi tiết đánh giá và trả lời."),
  component: ReviewDetail,
});

function ReviewDetail() {
  const { id } = Route.useParams();
  const r = reviewStore.use().find((x) => x.id === id);
  const [text, setText] = useState(r?.reply ?? "");
  const [editing, setEditing] = useState(!r?.reply);
  if (!r) return <EmptyState title="Không tìm thấy đánh giá" action={<Button asChild><Link to="/trainer/reviews">Quay lại</Link></Button>} />;
  return (
    <>
      <Link to="/trainer/reviews" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Đánh giá của tôi</Link>
      <article className="max-w-2xl rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3"><Avatar name={r.client} /><div><p className="font-semibold">{r.client}</p><p className="text-xs text-muted-foreground">{r.date}</p></div><Stars rating={r.rating} className="ml-auto" /></div>
        <h1 className="mt-5 text-xl font-semibold">{r.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{r.body}</p>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm font-semibold">Phản hồi của bạn</p>
          {editing ? (
            <div className="mt-3 space-y-3">
              <Textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Cảm ơn hội viên, giải quyết các thắc mắc…" maxLength={400} />
              <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{text.length}/400</span>
                <Button disabled={text.trim().length < 5} onClick={() => { reviewStore.upsert({ ...r, reply: text }); setEditing(false); toast.success("Đã đăng phản hồi"); }}>Đăng phản hồi</Button>
              </div>
            </div>
          ) : (
            <div className="mt-3 rounded-md bg-muted p-4 text-sm">
              <p className="text-xs font-medium text-primary">{trainerMe.name} đã phản hồi</p>
              <p className="mt-1">{r.reply}</p>
              <Button size="sm" variant="ghost" className="mt-2" onClick={() => setEditing(true)}>Chỉnh sửa phản hồi</Button>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
