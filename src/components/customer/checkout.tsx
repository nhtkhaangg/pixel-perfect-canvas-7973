import { Link } from "@tanstack/react-router";
import { Banknote, Check, CheckCircle2, CreditCard, QrCode, XCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { formatCurrency, packages, type PackageType } from "@/lib/mock/public";
import type { PaymentMethod } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const methods: { key: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
  { key: "VNPAY", label: "VNPAY", desc: "Thẻ hoặc ứng dụng ngân hàng qua cổng VNPAY", icon: CreditCard },
  { key: "PAYOS", label: "PayOS", desc: "Quét mã QR chuyển khoản qua PayOS", icon: QrCode },
  { key: "CASH", label: "Tiền mặt tại quầy", desc: "Gói giữ trạng thái CHỜ XỬ LÝ đến khi lễ tân xác nhận thanh toán", icon: Banknote },
];

/** Multi-step purchase flow shared by membership and PT booking. */
export function CheckoutFlow({
  type,
  title,
  description,
  extraStep,
}: {
  type: PackageType;
  title: string;
  description: string;
  /** Optional middle step (e.g. choose trainer) with its own validity. */
  extraStep?: { label: string; valid: boolean; render: () => ReactNode; summary: ReactNode };
}) {
  const list = packages.filter((p) => p.type === type);
  const [pkgId, setPkgId] = useState(list.find((p) => p.featured)?.id ?? list[0]!.id);
  const [method, setMethod] = useState<PaymentMethod>("VNPAY");
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<"PAID" | "FAILED" | "PENDING" | null>(null);
  const pkg = list.find((p) => p.id === pkgId)!;
  const steps = ["Gói tập", ...(extraStep ? [extraStep.label] : []), "Thanh toán", "Xác nhận"];
  const last = steps.length - 1;
  const current = steps[step];

  function pay(simulateFail = false) {
    if (!agree) { toast.error("Vui lòng đồng ý với điều khoản"); return; }
    const r = method === "CASH" ? "PENDING" : simulateFail ? "FAILED" : "PAID";
    setResult(r);
    if (r === "PAID") toast.success("Thanh toán thành công");
  }

  if (result)
    return (
      <>
        <PageHeader title={title} />
        <div className="mx-auto max-w-lg rounded-lg border border-border bg-card p-8 text-center">
          {result === "FAILED" ? <XCircle className="mx-auto size-12 text-destructive" /> : <CheckCircle2 className="mx-auto size-12 text-primary" />}
          <p className="mt-4 text-xl font-semibold">
            {result === "PAID" ? "Hoàn tất!" : result === "PENDING" ? "Đã giữ chỗ — thanh toán tại quầy" : "Thanh toán thất bại"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {result === "PAID" && `${pkg.name} hiện đã ACTIVE. Hóa đơn đã được gửi vào email của bạn.`}
            {result === "PENDING" && `Xuất trình mã QR tại quầy lễ tân và thanh toán ${formatCurrency(pkg.price)} tiền mặt trong vòng 48 giờ.`}
            {result === "FAILED" && `${method} đã từ chối giao dịch. Không có khoản tiền nào bị trừ.`}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <StatusBadge status={result === "PAID" ? "paid" : result === "FAILED" ? "failed" : "pending"} />
            <StatusBadge status="neutral" label={method} />
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {result === "FAILED" ? <Button onClick={() => setResult(null)}>Thử lại</Button> : <Button asChild><Link to="/customer/packages">Xem gói của tôi</Link></Button>}
            <Button variant="outline" asChild><Link to="/customer">Trang tổng quan</Link></Button>
          </div>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title={title} description={description} />
      <ol className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li key={s} className={cn("flex items-center gap-2 rounded-full border px-3 py-1 text-sm", i === step ? "border-primary bg-accent text-accent-foreground" : i < step ? "border-border text-foreground" : "border-border text-muted-foreground")}>
            <span className={cn("flex size-5 items-center justify-center rounded-full text-xs", i < step ? "bg-primary text-primary-foreground" : "bg-muted")}>{i < step ? <Check className="size-3" /> : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card p-6">
          {current === "Gói tập" && (
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((p) => (
                <button key={p.id} type="button" onClick={() => setPkgId(p.id)} className={cn("rounded-lg border p-4 text-left transition-colors", p.id === pkgId ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50")}>
                  <div className="flex items-center justify-between"><p className="font-semibold">{p.name}</p>{p.featured ? <span className="text-xs text-primary">Phổ biến</span> : null}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-3 text-xl font-semibold">{formatCurrency(p.price)} <span className="text-sm font-normal text-muted-foreground">/ {p.durationDays} ngày{p.totalSessions ? ` · ${p.totalSessions} buổi` : ""}</span></p>
                </button>
              ))}
            </div>
          )}
          {extraStep && current === extraStep.label && extraStep.render()}
          {current === "Thanh toán" && (
            <div className="space-y-3">
              {methods.map((m) => (
                <button key={m.key} type="button" onClick={() => setMethod(m.key)} className={cn("flex w-full items-center gap-4 rounded-lg border p-4 text-left", method === m.key ? "border-primary ring-1 ring-primary" : "border-border")}>
                  <span className="flex size-10 items-center justify-center rounded-md bg-muted"><m.icon className="size-5" /></span>
                  <span className="flex-1"><span className="block font-medium">{m.label}</span><span className="text-sm text-muted-foreground">{m.desc}</span></span>
                  <span className={cn("size-4 rounded-full border-2", method === m.key ? "border-primary bg-primary" : "border-border")} />
                </button>
              ))}
            </div>
          )}
          {current === "Xác nhận" && (
            <div className="space-y-4">
              <p className="font-semibold">Xem lại đơn hàng</p>
              <dl className="divide-y divide-border rounded-md border border-border text-sm">
                <div className="flex justify-between p-3"><dt className="text-muted-foreground">Gói tập</dt><dd>{pkg.name}</dd></div>
                {extraStep ? <div className="flex justify-between p-3"><dt className="text-muted-foreground">{extraStep.label}</dt><dd>{extraStep.summary}</dd></div> : null}
                <div className="flex justify-between p-3"><dt className="text-muted-foreground">Thời hạn</dt><dd>{pkg.durationDays} ngày</dd></div>
                <div className="flex justify-between p-3"><dt className="text-muted-foreground">Thanh toán</dt><dd>{method}</dd></div>
              </dl>
              <label className="flex items-start gap-2 text-sm"><Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" /> Tôi đồng ý với điều khoản gói tập và chính sách hoàn tiền.</label>
            </div>
          )}
          <div className="mt-6 flex justify-between border-t border-border pt-5">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Quay lại</Button>
            {step < last ? (
              <Button disabled={!!extraStep && current === extraStep.label && !extraStep.valid} onClick={() => setStep(step + 1)}>Tiếp tục</Button>
            ) : (
              <div className="flex gap-2">
                {method !== "CASH" ? <Button variant="ghost" onClick={() => pay(true)}>Giả lập thất bại</Button> : null}
                <Button onClick={() => pay()}>{method === "CASH" ? "Giữ chỗ gói tập" : `Thanh toán ${formatCurrency(pkg.price)}`}</Button>
              </div>
            )}
          </div>
        </div>
        <aside className="h-fit rounded-lg bg-surface p-6 text-surface-foreground">
          <p className="text-xs tracking-wider text-surface-foreground/60 uppercase">Tóm tắt đơn hàng</p>
          <p className="mt-3 font-semibold">{pkg.name}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-surface-foreground/70">
            {pkg.perks.map((p) => <li key={p} className="flex gap-2"><Check className="size-4 text-primary" /> {p}</li>)}
          </ul>
          <div className="mt-5 flex items-end justify-between border-t border-surface-foreground/10 pt-4">
            <span className="text-sm text-surface-foreground/60">Tổng cộng</span>
            <span className="text-2xl font-semibold">{formatCurrency(pkg.price)}</span>
          </div>
        </aside>
      </div>
    </>
  );
}
