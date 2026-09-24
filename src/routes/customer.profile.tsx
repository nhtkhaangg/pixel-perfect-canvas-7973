import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { me } from "@/lib/mock/customer";
import { vnDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { DetailPanel } from "@/components/shared/detail-panel";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/profile")({
  head: () => seo("Hồ sơ của tôi", "Xem và chỉnh sửa hồ sơ hội viên GymFit của bạn."),
  component: ProfilePage,
});

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function ProfilePage() {
  const [profile, setProfile] = useState(me);
  const [draft, setDraft] = useState(me);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  function save() {
    if (draft.name.trim().length < 2) return setError("Vui lòng nhập họ tên");
    setProfile(draft);
    setOpen(false);
    toast.success("Đã cập nhật hồ sơ");
  }

  const field = (k: "name" | "phone" | "address" | "emergencyContact" | "goal", label: string) => (
    <FormField label={label} error={k === "name" ? error : undefined}>
      {(p) => <Input {...p} value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />}
    </FormField>
  );

  return (
    <>
      <PageHeader
        title="Hồ sơ của tôi"
        description="Thông tin cá nhân được huấn luyện viên và lễ tân sử dụng."
        actions={<><Button variant="outline" asChild><Link to="/customer/change-password">Đổi mật khẩu</Link></Button><Button onClick={() => { setDraft(profile); setError(undefined); setOpen(true); }}>Chỉnh sửa hồ sơ</Button></>}
      />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="h-fit rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <Avatar className="mx-auto size-20 ring-2 ring-primary/20"><AvatarFallback className="bg-accent text-xl font-semibold text-accent-foreground">{initials(profile.name)}</AvatarFallback></Avatar>
          <p className="mt-4 text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-3 flex justify-center"><StatusBadge status="active" label="Hội viên đang hoạt động" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-left text-sm">
            <div><p className="text-xs text-muted-foreground">Mã hội viên</p><p className="font-medium">{profile.id}</p></div>
            <div><p className="text-xs text-muted-foreground">Ngày gia nhập</p><p className="font-medium">{vnDate(profile.memberSince)}</p></div>
            <div><p className="text-xs text-muted-foreground">Khu vực quen</p><p className="font-medium">{profile.homeZone}</p></div>
            <div><p className="text-xs text-muted-foreground">Huấn luyện viên</p><p className="font-medium">{profile.trainerName}</p></div>
          </div>
        </div>
        <div className="space-y-6">
          <DetailPanel title="Thông tin cá nhân" fields={[
            { label: "Họ và tên", value: profile.name },
            { label: "Email", value: profile.email },
            { label: "Số điện thoại", value: profile.phone },
            { label: "Ngày sinh", value: vnDate(profile.dob) },
            { label: "Giới tính", value: profile.gender },
            { label: "Địa chỉ", value: profile.address },
          ]} />
          <DetailPanel title="Tập luyện" fields={[
            { label: "Mục tiêu", value: profile.goal },
            { label: "Liên hệ khẩn cấp", value: profile.emergencyContact },
          ]} />
        </div>
      </div>
      <FormModal open={open} onOpenChange={setOpen} variant="drawer" title="Chỉnh sửa hồ sơ" description="Đổi email vui lòng liên hệ trực tiếp quầy lễ tân." footer={<Button onClick={save} className="w-full">Lưu thay đổi</Button>}>
        <div className="space-y-4">
          {field("name", "Họ và tên")}
          {field("phone", "Số điện thoại")}
          {field("address", "Địa chỉ")}
          {field("goal", "Mục tiêu tập luyện")}
          {field("emergencyContact", "Liên hệ khẩn cấp")}
        </div>
      </FormModal>
    </>
  );
}
