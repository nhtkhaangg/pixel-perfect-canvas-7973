import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { gymInfo } from "@/lib/mock/public";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/review")({
  head: () => seo("Review the gym", "Rate your GymFit branch and share feedback with other members."),
  component: ReviewGym,
});

const aspects = ["Cleanliness", "Equipment", "Staff", "Classes", "Value"];

function StarInput({ value, onChange, size = "size-7" }: { value: number; onChange: (n: number) => void; size?: string }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" aria-label={`${n} stars`} onMouseEnter={() => setHover(n)} onClick={() => onChange(n)}>
          <Star className={cn(size, n <= (hover || value) ? "fill-primary text-primary" : "text-muted-foreground/40")} />
        </button>
      ))}
    </div>
  );
}

function ReviewGym() {
  const [rating, setRating] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [branch, setBranch] = useState("Downtown");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!rating) errs["rating"] = "Choose an overall rating";
    if (title.trim().length < 4) errs["title"] = "Add a short title";
    if (body.trim().length < 20) errs["body"] = "Write at least 20 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    toast.success("Review submitted for moderation");
  }

  if (sent)
    return (
      <>
        <PageHeader title="Review the gym" />
        <div className="max-w-xl rounded-lg border border-border bg-card p-6">
          <StatusBadge status="pending" label="Pending moderation" />
          <p className="mt-3 font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          <Button className="mt-5" variant="outline" onClick={() => setSent(false)}>Edit review</Button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title="Review the gym" description="Your review appears on the public reviews page after moderation." />
      <form onSubmit={submit} noValidate className="max-w-2xl space-y-5 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label>Branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>{gymInfo.branches.map((b) => <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Overall rating<span className="text-destructive">*</span></Label>
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
        <FormField label="Title" required error={errors["title"]}>{(p) => <Input {...p} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Great coaches, spotless floor" />}</FormField>
        <FormField label="Your review" required error={errors["body"]} hint={`${body.length}/500`}>{(p) => <Textarea {...p} rows={5} maxLength={500} value={body} onChange={(e) => setBody(e.target.value)} />}</FormField>
        <Button type="submit">Submit review</Button>
      </form>
    </>
  );
}
