import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { formatCurrency } from "@/lib/mock/public";
import { customerPackages, transactions } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { DetailPanel } from "@/components/shared/detail-panel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/customer/refund")({
  head: () => seo("Yêu cầu hoàn tiền", "Gửi yêu cầu hoàn tiền cho một gói tập GymFit đủ điều kiện."),
  component: Refund,
});

const reasons = ["Chuyển chỗ ở", "Lý do sức khỏe", "Thanh toán trùng", "Không hài lòng dịch vụ", "Lý do khác"];

function Refund() {
  const eligible = customerPackages.filter((p) => p.status === "ACTIVE" || p.status === "PENDING");
  const [pkgId, setPkgId] = useState(eligible.find((p) => p.status === "PENDING")?.id ?? "");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const pkg = eligible.find((p) => p.id === pkgId);
  const tx = transactions.find((t) => t.customerPackageId === pkgId && t.status === "PAID");
  const usedRatio = pkg?.totalSessions ? pkg.usedSessions / pkg.totalSessions : pkg?.status === "PENDING" ? 0 : 0.5;
  const refundable = pkg ? Math.round(pkg.price * (1 - usedRatio) * 0.9) : 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!pkg) errs["pkg"] = "Vui lòng chọn một gói tập";
    if (!reason) errs["reason"] = "Vui lòng chọn lý do";
    if (details.trim().length < 15) errs["details"] = "Vui lòng nhập ít nhất 15 ký tự";
    if (!agree) errs["agree"] = "Vui lòng xác nhận";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    toast.success("Đã gửi yêu cầu hoàn tiền");
  }

  if (sent && pkg)
    return (
      <>
        <PageHeader title="Yêu cầu hoàn tiền" />
        <DetailPanel className="max-w-xl" title="Yêu cầu RF-2031" description="Quản lý sẽ xem xét yêu cầu hoàn tiền trong vòng 5 ngày làm việc." fields={[
          { label: "Trạng thái", value: <StatusBadge status="processing" label="Đang xử lý" /> },
          { label: "Gói tập", value: pkg.name },
          { label: "Số tiền dự kiến hoàn", value: formatCurrency(refundable) },
          { label: "Hoàn về", value: tx ? `${tx.method} · ${tx.reference}` : "Tiền mặt tại quầy" },
          { label: "Lý do", value: reason },
        ]} footer={<Button variant="outline" onClick={() => setSent(false)}>Gửi yêu cầu mới</Button>} />
      </>
    );

  return (
    <>
      <PageHeader title="Yêu cầu hoàn tiền" description="Các buổi PT chưa dùng và gói đang chờ xử lý có thể được hoàn tiền, trừ 10% phí xử lý." />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <form onSubmit={submit} noValidate className="space-y-5 rounded-lg border border-border bg-card p-6">
          <div className="space-y-1.5">
            <Label>Gói tập<span className="text-destructive">*</span></Label>
            <Select value={pkgId} onValueChange={setPkgId}>
              <SelectTrigger><SelectValue placeholder="Chọn một gói tập" /></SelectTrigger>
              <SelectContent>{eligible.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} · {p.status} · {formatCurrency(p.price)}</SelectItem>)}</SelectContent>
            </Select>
            {errors["pkg"] ? <p className="text-xs text-destructive">{errors["pkg"]}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Lý do<span className="text-destructive">*</span></Label>
            <RadioGroup value={reason} onValueChange={setReason} className="grid gap-2 sm:grid-cols-2">
              {reasons.map((r) => <label key={r} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm"><RadioGroupItem value={r} /> {r}</label>)}
            </RadioGroup>
            {errors["reason"] ? <p className="text-xs text-destructive">{errors["reason"]}</p> : null}
          </div>
          <FormField label="Chi tiết" required error={errors["details"]}>{(p) => <Textarea {...p} rows={4} value={details} onChange={(e) => setDetails(e.target.value)} />}</FormField>
          <div>
            <label className="flex items-start gap-2 text-sm"><Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" /> Tôi hiểu rằng gói tập sẽ bị hủy sau khi yêu cầu hoàn tiền được phê duyệt.</label>
            {errors["agree"] ? <p className="mt-1 text-xs text-destructive">{errors["agree"]}</p> : null}
          </div>
          <Button type="submit">Gửi yêu cầu</Button>
        </form>
        <aside className="h-fit rounded-lg bg-surface p-6 text-surface-foreground">
          <p className="text-xs tracking-wider text-surface-foreground/60 uppercase">Ước tính hoàn tiền</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatCurrency(refundable)}</p>
          <p className="mt-2 text-sm text-surface-foreground/70">{pkg ? `${pkg.name} đã thanh toán ${formatCurrency(pkg.price)}. ${pkg.totalSessions ? `Đã dùng ${pkg.usedSessions}/${pkg.totalSessions} buổi.` : ""}` : "Chọn một gói tập để xem ước tính."}</p>
        </aside>
      </div>
    </>
  );
}
