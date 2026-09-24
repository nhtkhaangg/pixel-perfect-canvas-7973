import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { certificates, trainerMe } from "@/lib/mock/trainer";
import { formatCurrency } from "@/lib/mock/public";
import { PageHeader } from "@/components/shared/page-header";
import { DetailPanel } from "@/components/shared/detail-panel";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar } from "@/components/public/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/trainer/profile")({
  head: () => seo("Hồ sơ huấn luyện viên", "Xem và chỉnh sửa hồ sơ công khai của bạn."),
  component: Profile,
});

function Profile() {
  const [p, setP] = useState(trainerMe);
  const [d, setD] = useState(trainerMe);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});

  function save() {
    const e: Record<string, string> = {};
    if (d.bio.length < 40) e["bio"] = "Giới thiệu cần ít nhất 40 ký tự";
    if (!(d.experienceYears >= 0 && d.experienceYears <= 50)) e["exp"] = "0–50 năm";
    setErr(e);
    if (Object.keys(e).length) return;
    setP(d); setOpen(false); toast.success("Đã cập nhật hồ sơ");
  }

  return (
    <>
      <PageHeader title="Hồ sơ của tôi" description="Thông tin này hiển thị trên trang huấn luyện viên công khai của bạn." actions={<><Button variant="outline" asChild><Link to="/trainers/$id" params={{ id: p.id }}>Xem trang công khai</Link></Button><Button onClick={() => { setD(p); setOpen(true); }}>Chỉnh sửa hồ sơ</Button></>} />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="h-fit rounded-lg border border-border bg-card p-6 text-center">
          <div className="flex justify-center"><Avatar name={p.name} size="xl" /></div>
          <p className="mt-4 text-lg font-semibold">{p.name}</p>
          <p className="text-sm text-primary">{p.specialization}</p>
          <div className="mt-3 flex justify-center"><StatusBadge status="active" label="Đã xác minh" /></div>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-sm">
            <div><p className="font-semibold">{p.experienceYears}</p><p className="text-xs text-muted-foreground">năm kinh nghiệm</p></div>
            <div><p className="font-semibold">{p.ratingAvg}</p><p className="text-xs text-muted-foreground">đánh giá</p></div>
            <div><p className="font-semibold">{certificates.filter((c) => c.status === "APPROVED").length}</p><p className="text-xs text-muted-foreground">chứng chỉ</p></div>
          </div>
        </div>
        <div className="space-y-6">
          <DetailPanel title="Chuyên môn" fields={[
            { label: "Chuyên môn", value: p.specialization },
            { label: "Kinh nghiệm", value: `${p.experienceYears} năm` },
            { label: "Đơn giá theo giờ", value: formatCurrency(p.hourlyRate) },
            { label: "Khu vực phụ trách", value: p.branch },
            { label: "Ngôn ngữ", value: p.languages },
            { label: "Giới thiệu", value: p.bio },
          ]} />
          <DetailPanel title="Liên hệ" fields={[{ label: "Email", value: p.email }, { label: "Số điện thoại", value: p.phone }]} />
        </div>
      </div>
      <FormModal open={open} onOpenChange={setOpen} variant="drawer" title="Chỉnh sửa hồ sơ" footer={<Button className="w-full" onClick={save}>Lưu thay đổi</Button>}>
        <div className="space-y-4">
          <FormField label="Chuyên môn">{(f) => <Input {...f} value={d.specialization} onChange={(e) => setD({ ...d, specialization: e.target.value })} />}</FormField>
          <FormField label="Kinh nghiệm (năm)" error={err["exp"]}>{(f) => <Input {...f} type="number" value={d.experienceYears} onChange={(e) => setD({ ...d, experienceYears: Number(e.target.value) })} />}</FormField>
          <FormField label="Số điện thoại">{(f) => <Input {...f} value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} />}</FormField>
          <FormField label="Ngôn ngữ">{(f) => <Input {...f} value={d.languages} onChange={(e) => setD({ ...d, languages: e.target.value })} />}</FormField>
          <FormField label="Giới thiệu" error={err["bio"]}>{(f) => <Textarea {...f} rows={5} value={d.bio} onChange={(e) => setD({ ...d, bio: e.target.value })} />}</FormField>
        </div>
      </FormModal>
    </>
  );
}
