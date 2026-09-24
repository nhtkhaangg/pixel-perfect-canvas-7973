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
  head: () => seo("Request a refund", "Request a refund for an eligible GymFit package."),
  component: Refund,
});

const reasons = ["Moving away", "Medical reason", "Duplicate payment", "Unhappy with service", "Other"];

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
    if (!pkg) errs["pkg"] = "Choose a package";
    if (!reason) errs["reason"] = "Choose a reason";
    if (details.trim().length < 15) errs["details"] = "Please add at least 15 characters";
    if (!agree) errs["agree"] = "Please confirm";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    toast.success("Refund request submitted");
  }

  if (sent && pkg)
    return (
      <>
        <PageHeader title="Refund request" />
        <DetailPanel className="max-w-xl" title="Request RF-2031" description="A manager reviews refunds within 5 working days." fields={[
          { label: "Status", value: <StatusBadge status="processing" label="PROCESSING" /> },
          { label: "Package", value: pkg.name },
          { label: "Estimated refund", value: formatCurrency(refundable) },
          { label: "Refund to", value: tx ? `${tx.method} · ${tx.reference}` : "Cash at front desk" },
          { label: "Reason", value: reason },
        ]} footer={<Button variant="outline" onClick={() => setSent(false)}>New request</Button>} />
      </>
    );

  return (
    <>
      <PageHeader title="Request a refund" description="Unused PT sessions and pending packages can be refunded minus a 10% admin fee." />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <form onSubmit={submit} noValidate className="space-y-5 rounded-lg border border-border bg-card p-6">
          <div className="space-y-1.5">
            <Label>Package<span className="text-destructive">*</span></Label>
            <Select value={pkgId} onValueChange={setPkgId}>
              <SelectTrigger><SelectValue placeholder="Select a package" /></SelectTrigger>
              <SelectContent>{eligible.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} · {p.status} · {formatCurrency(p.price)}</SelectItem>)}</SelectContent>
            </Select>
            {errors["pkg"] ? <p className="text-xs text-destructive">{errors["pkg"]}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Reason<span className="text-destructive">*</span></Label>
            <RadioGroup value={reason} onValueChange={setReason} className="grid gap-2 sm:grid-cols-2">
              {reasons.map((r) => <label key={r} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm"><RadioGroupItem value={r} /> {r}</label>)}
            </RadioGroup>
            {errors["reason"] ? <p className="text-xs text-destructive">{errors["reason"]}</p> : null}
          </div>
          <FormField label="Details" required error={errors["details"]}>{(p) => <Textarea {...p} rows={4} value={details} onChange={(e) => setDetails(e.target.value)} />}</FormField>
          <div>
            <label className="flex items-start gap-2 text-sm"><Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" /> I understand the package will be cancelled once the refund is approved.</label>
            {errors["agree"] ? <p className="mt-1 text-xs text-destructive">{errors["agree"]}</p> : null}
          </div>
          <Button type="submit">Submit request</Button>
        </form>
        <aside className="h-fit rounded-lg bg-surface p-6 text-surface-foreground">
          <p className="text-xs tracking-wider text-surface-foreground/60 uppercase">Estimate</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatCurrency(refundable)}</p>
          <p className="mt-2 text-sm text-surface-foreground/70">{pkg ? `${pkg.name} paid ${formatCurrency(pkg.price)}. ${pkg.totalSessions ? `${pkg.usedSessions}/${pkg.totalSessions} sessions used.` : ""}` : "Choose a package to see an estimate."}</p>
        </aside>
      </div>
    </>
  );
}
