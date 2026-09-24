import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/change-password")({
  head: () => seo("Đổi mật khẩu", "Cập nhật mật khẩu cho tài khoản GymFit của bạn."),
  component: ChangePassword,
});

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function ChangePassword() {
  const [f, setF] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const s = strength(f.next);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!f.current) errs["current"] = "Nhập mật khẩu hiện tại";
    if (s < 3) errs["next"] = "Dùng tối thiểu 8 ký tự, có chữ hoa và số";
    if (f.next === f.current && f.next) errs["next"] = "Mật khẩu mới phải khác mật khẩu hiện tại";
    if (f.confirm !== f.next) errs["confirm"] = "Mật khẩu xác nhận không khớp";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Đổi mật khẩu thành công", { description: "Các thiết bị khác đã được đăng xuất." });
    setF({ current: "", next: "", confirm: "" });
  }

  return (
    <>
      <PageHeader title="Đổi mật khẩu" description="Chọn một mật khẩu mạnh mà bạn không dùng ở nơi khác." />
      <form onSubmit={submit} noValidate className="max-w-md space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
        <FormField label="Mật khẩu hiện tại" required error={errors["current"]}>
          {(p) => <Input {...p} type="password" value={f.current} onChange={(e) => setF({ ...f, current: e.target.value })} />}
        </FormField>
        <FormField label="Mật khẩu mới" required error={errors["next"]}>
          {(p) => <Input {...p} type="password" value={f.next} onChange={(e) => setF({ ...f, next: e.target.value })} />}
        </FormField>
        <div>
          <Progress value={(s / 4) * 100} className="h-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Độ mạnh: {["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"][s]}</p>
        </div>
        <FormField label="Xác nhận mật khẩu mới" required error={errors["confirm"]}>
          {(p) => <Input {...p} type="password" value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} />}
        </FormField>
        <Button type="submit" className="w-full">Cập nhật mật khẩu</Button>
      </form>
    </>
  );
}
