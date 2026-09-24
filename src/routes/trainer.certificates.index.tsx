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
  head: () => seo("Chứng chỉ", "Tải lên và quản lý chứng chỉ huấn luyện của bạn."),
  component: Certs,
});

const statusLabel: Record<string, string> = { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Bị từ chối" };

function UploadCertModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [f, setF] = useState({ name: "", issuer: "", issuedAt: "", expiresAt: "" });
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  function save() {
    const e: Record<string, string> = {};
    if (!f.name) e["name"] = "Bắt buộc";
    if (!f.issuer) e["issuer"] = "Bắt buộc";
    if (!f.issuedAt) e["issuedAt"] = "Bắt buộc";
    if (!file) e["file"] = "Đính kèm file PDF hoặc hình ảnh";
    else if (file.size > 5 * 1024 * 1024) e["file"] = "Tối đa 5 MB";
    setErr(e);
    if (Object.keys(e).length) return;
    certStore.upsert({ id: `cert_${Date.now()}`, ...f, expiresAt: f.expiresAt || null, fileName: file!.name, status: "PENDING" });
    toast.success("Đã tải lên chứng chỉ", { description: "Quản lý sẽ xét duyệt trong vòng 2 ngày làm việc." });
    setF({ name: "", issuer: "", issuedAt: "", expiresAt: "" }); setFile(null); onOpenChange(false);
  }
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title="Tải lên chứng chỉ" description="Chấp nhận: PDF, JPG, PNG tối đa 5 MB." footer={<Button onClick={save}>Tải lên</Button>}>
      <FormField label="Tên chứng chỉ" required error={err["name"]}>{(p) => <Input {...p} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="VD: NASM-CPT" />}</FormField>
      <FormField label="Đơn vị cấp" required error={err["issuer"]}>{(p) => <Input {...p} value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} />}</FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Ngày cấp" required error={err["issuedAt"]}>{(p) => <Input {...p} type="date" value={f.issuedAt} onChange={(e) => setF({ ...f, issuedAt: e.target.value })} />}</FormField>
        <FormField label="Ngày hết hạn" hint="Để trống nếu không có">{(p) => <Input {...p} type="date" value={f.expiresAt} onChange={(e) => setF({ ...f, expiresAt: e.target.value })} />}</FormField>
      </div>
      <FormField label="Tệp" required error={err["file"]}>{(p) => <Input {...p} type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />}</FormField>
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
      <PageHeader title="Chứng chỉ" description="Chứng chỉ đã được duyệt sẽ hiển thị trên hồ sơ công khai của bạn." actions={<Button onClick={() => setOpen(true)}><Upload className="size-4" /> Tải lên</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Đã duyệt" value={count("APPROVED")} />
        <StatCard label="Chờ duyệt" value={count("PENDING")} />
        <StatCard label="Bị từ chối" value={count("REJECTED")} hint="Cần tải lại" />
      </div>
      <DataTable
        data={list}
        rowKey={(r) => r.id}
        searchPlaceholder="Tìm chứng chỉ…"
        filters={[{ key: "status", label: "Trạng thái", options: ["PENDING", "APPROVED", "REJECTED"].map((s) => ({ label: statusLabel[s] ?? s, value: s })) }]}
        filterValue={(r) => r.status}
        columns={[
          { key: "name", header: "Chứng chỉ", sortable: true, cell: (r) => <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.fileName}</p></div> },
          { key: "issuer", header: "Đơn vị cấp" },
          { key: "issuedAt", header: "Ngày cấp", sortable: true },
          { key: "expiresAt", header: "Hết hạn", cell: (r) => r.expiresAt ?? "—" },
          { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={toStatus(r.status)} label={statusLabel[r.status] ?? r.status} /> },
        ]}
        rowActions={[
          { label: "Xem chi tiết", onSelect: (r) => navigate({ to: "/trainer/certificates/$id", params: { id: r.id } }) },
          { label: "Xóa", destructive: true, onSelect: (r) => { certStore.remove(r.id); toast.success(`Đã xóa ${r.name}`); } },
        ]}
      />
      <UploadCertModal open={open} onOpenChange={setOpen} />
    </>
  );
}
