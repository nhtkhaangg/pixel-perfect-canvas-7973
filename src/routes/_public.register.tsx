import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, OAuthButtons, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/register")({
  head: () => seo("Tạo tài khoản", "Đăng ký GymFit chưa đầy một phút và nhận ngay một ngày tập miễn phí."),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs["name"] = "Vui lòng nhập họ tên đầy đủ";
    if (!isEmail(form.email)) errs["email"] = "Email không hợp lệ";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) errs["phone"] = "Số điện thoại không hợp lệ";
    if (form.password.length < 8) errs["password"] = "Dùng ít nhất 8 ký tự";
    if (form.confirm !== form.password) errs["confirm"] = "Mật khẩu xác nhận không khớp";
    if (!agree) errs["agree"] = "Bạn cần đồng ý với điều khoản";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Tạo tài khoản thành công", { description: "Ngày tập miễn phí của bạn đã có trong khu vực hội viên." });
    navigate({ to: "/customer" });
  }

  return (
    <AuthCard
      title="Tạo tài khoản"
      description="Miễn phí đăng ký — chọn gói tập bất cứ khi nào bạn sẵn sàng."
      aside={<AuthAside quote="Đăng ký thứ Hai, thứ Tư đã có buổi PT đầu tiên. Sau ba tháng tôi giảm được 7 kg." author="Nam K., hội viên" />}
      footer={<>Đã là hội viên? <Link to="/login" className="font-medium text-primary">Đăng nhập</Link> · <Link to="/register-trainer" className="font-medium text-primary">Ứng tuyển làm huấn luyện viên</Link></>}
    >
      <OAuthButtons />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Họ và tên" required error={errors["name"]}>
          {(p) => <Input {...p} value={form.name} onChange={set("name")} placeholder="Nguyễn Văn A" />}
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email" required error={errors["email"]}>
            {(p) => <Input {...p} type="email" value={form.email} onChange={set("email")} placeholder="ban@vidu.com" />}
          </FormField>
          <FormField label="Số điện thoại" required error={errors["phone"]}>
            {(p) => <Input {...p} type="tel" value={form.phone} onChange={set("phone")} placeholder="0901 234 567" />}
          </FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Mật khẩu" required error={errors["password"]} hint="Ít nhất 8 ký tự">
            {(p) => <Input {...p} type="password" value={form.password} onChange={set("password")} />}
          </FormField>
          <FormField label="Xác nhận mật khẩu" required error={errors["confirm"]}>
            {(p) => <Input {...p} type="password" value={form.confirm} onChange={set("confirm")} />}
          </FormField>
        </div>
        <div>
          <label className="flex items-start gap-2 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
            Tôi đồng ý với điều khoản hội viên và chính sách bảo mật
          </label>
          {errors["agree"] ? <p className="mt-1 text-xs text-destructive">{errors["agree"]}</p> : null}
        </div>
        <Button type="submit" className="w-full">Tạo tài khoản</Button>
      </form>
    </AuthCard>
  );
}
