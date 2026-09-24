import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { certStore } from "@/lib/trainer-stores";
import { toStatus } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatCard } from "@/components/shared/stat-card";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/trainer/certificates/")({
  head: () => seo("Certificates", "Upload and manage your coaching certificates."),
  component: Certs,
});

export function UploadCertModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [f, setF] = useState({ name: "", issuer: "", issuedAt: "", expiresAt: "" });
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  function save() {
    const e: Record<string, string> = {};
    if (!f.name) e["name"] = "Required";
    if (!f.issuer) e["issuer"] = "Required";
    if (!f.issuedAt) e["issuedAt"] = "Required";
    if (!file) e["file"] = "Attach a PDF or image";
    else if (file.size > 5 * 1024 * 1024) e["file"] = "Max 5 MB";
    setErr(e);
    if (Object.keys(e).length) return;
    certStore.upsert({ id: `cert_${Date.now()}`, ...f, expiresAt: f.expiresAt || null, fileName: file!.name, status: "PENDING" });
    toast.success("Certificate uploaded", { description: "A manager will review it within 2 working days." });
    setF({ name: "", issuer: "", issuedAt: "", expiresAt: "" }); setFile(null); onOpenChange(false);
  }
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title="Upload certificate" description="Accepted: PDF, JPG, PNG up to 5 MB." footer={<Button onClick={save}>Upload</Button>}>
      <FormField label="Certificate name" required error={err["name"]}>{(p) => <Input {...p} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="e.g. NASM-CPT" />}</FormField>
      <FormField label="Issuer" required error={err["issuer"]}>{(p) => <Input {...p} value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} />}</FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Issued" required error={err["issuedAt"]}>{(p) => <Input {...p} type="date" value={f.issuedAt} onChange={(e) => setF({ ...f, issuedAt: e.target.value })} />}</FormField>
        <FormField label="Expires" hint="Leave empty if none">{(p) => <Input {...p} type="date" value={f.expiresAt} onChange={(e) => setF({ ...f, expiresAt: e.target.value })} />}</FormField>
      </div>
      <FormField label="File" required error={err["file"]}>{(p) => <Input {...p} type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />}</FormField>
    </FormModal>
  );
}

function Certs() {
  const list = certStore.use();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const count = (s: string) => list.filter((c) => c.status === s).length;
  return (
    <>
      <PageHeader title="Certificates" description="Approved certificates are shown on your public profile." actions={<Button onClick={() => setOpen(true)}><Upload className="size-4" /> Upload</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Approved" value={count("APPROVED")} />
        <StatCard label="Pending review" value={count("PENDING")} />
        <StatCard label="Rejected" value={count("REJECTED")} hint="Re-upload required" />
      </div>
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Search certificates…"
        filters={[{ key: "status", label: "Status", options: ["PENDING", "APPROVED", "REJECTED"].map((s) => ({ label: s, value: s })) }]}
        filterValue={(r) => r.status}
        columns={[
          { key: "name", header: "Certificate", sortable: true, cell: (r) => <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.fileName}</p></div> },
          { key: "issuer", header: "Issuer" },
          { key: "issuedAt", header: "Issued", sortable: true },
          { key: "expiresAt", header: "Expires", cell: (r) => r.expiresAt ?? "—" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={toStatus(r.status)} label={r.status} /> },
        ]}
        rowActions={[
          { label: "View details", onSelect: (r) => navigate({ to: "/trainer/certificates/$id", params: { id: r.id } }) },
          { label: "Delete", destructive: true, onSelect: (r) => { certStore.remove(r.id); toast.success(`${r.name} deleted`); } },
        ]}
      />
      <UploadCertModal open={open} onOpenChange={setOpen} />
    </>
  );
}
