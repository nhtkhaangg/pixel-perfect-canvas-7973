import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/review")({
  head: () => seo("Đánh giá phòng gym", "Chấm điểm GymFit và chia sẻ nhận xét với các hội viên khác."),
  component: ReviewGym,
});

const aspects = ["Vệ sinh", "Trang thiết bị", "Nhân viên", "Lớp học", "Giá trị nhận được"];

function StarInput({ value, onChange, size = "size-7" }: { value: number; onChange: (n: number) => void; size?: string }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" aria-label={`${n} sao`} onMouseEnter={() => setHover(n)} onClick={() => onChange(n)}>
          <Star className={cn(size, n <= (hover || value) ? "fill-primary text-primary" : "text-muted-foreground/40")} />
        </button>
      ))}
    </div>
  );
}

function ReviewGym() {
  const [rating, setRating] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!rating) errs["rating"] = "Vui lòng chọn đánh giá tổng thể";
    if (title.trim().length < 4) errs["title"] = "Vui lòng nhập tiêu đề ngắn";
    if (body.trim().length < 20) errs["body"] = "Vui lòng viết ít nhất 20 ký tự";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    toast.success("Đã gửi đánh giá để kiểm duyệt");
  }

  if (sent)
    return (
      <>
        <PageHeader title="Đánh giá phòng gym" />
        <div className="max-w-xl rounded-lg border border-border bg-card p-6 shadow-sm">
          <StatusBadge status="pending" label="Đang chờ kiểm duyệt" />
          <p className="mt-3 font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          <Button className="mt-5" variant="outline" onClick={() => setSent(false)}>Chỉnh sửa đánh giá</Button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title="Đánh giá phòng gym" description="Đánh giá của bạn sẽ hiển thị ở trang đánh giá công khai sau khi được kiểm duyệt." />
      <form onSubmit={submit} noValidate className="max-w-2xl space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1.5">
          <Label>Đánh giá tổng thể<span className="text-destructive">*</span></Label>
          <StarInput value={rating} onChange={setRating} />
          {errors["rating"] ? <p className="text-xs text-destructive">{errors["rating"]}</p> : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {aspects.map((a) => (
            <div key={a} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <span className="text-sm">{a}</span>
              <StarInput size="size-4" value={scores[a] ?? 0} onChange={(n) => setScores({ ...scores, [a]: n })} />
            </div>
          ))}
        </div>
        <FormField label="Tiêu đề" required error={errors["title"]}>{(p) => <Input {...p} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ví dụ: Huấn luyện viên nhiệt tình, sàn tập rất sạch" />}</FormField>
        <FormField label="Nội dung đánh giá" required error={errors["body"]} hint={`${body.length}/500`}>{(p) => <Textarea {...p} rows={5} maxLength={500} value={body} onChange={(e) => setBody(e.target.value)} />}</FormField>
        <Button type="submit">Gửi đánh giá</Button>
      </form>
    </>
  );
}
