import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, OAuthButtons, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/login")({
  head: () => seo("Đăng nhập", "Đăng nhập vào tài khoản GymFit để đặt lịch tập, quản lý gói hội viên và theo dõi tiến độ."),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isEmail(email)) errs["email"] = "Email không hợp lệ";
    if (password.length < 6) errs["password"] = "Mật khẩu phải có ít nhất 6 ký tự";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Chào mừng bạn trở lại!");
    navigate({ to: "/customer" });
  }

  return (
    <AuthCard
      title="Đăng nhập"
      description="Chào mừng trở lại — tiếp tục hành trình tập luyện của bạn."
      aside={<AuthAside quote="Đặt lịch tập chỉ mất năm giây. Suốt một năm nay tôi chưa bỏ lỡ buổi tập thứ Ba nào." author="Bình T., hội viên" />}
      footer={<>Chưa có tài khoản? <Link to="/register" className="font-medium text-primary">Tạo tài khoản</Link></>}
    >
      <OAuthButtons />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Email" required error={errors["email"]}>
          {(p) => <Input {...p} type="email" autoComplete="email" placeholder="ban@vidu.com" value={email} onChange={(e) => setEmail(e.target.value)} />}
        </FormField>
        <FormField label="Mật khẩu" required error={errors["password"]}>
          {(p) => <Input {...p} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        </FormField>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><Checkbox /> Ghi nhớ đăng nhập</label>
          <Link to="/forgot-password" className="text-primary">Quên mật khẩu?</Link>
        </div>
        <Button type="submit" className="w-full">Đăng nhập</Button>
      </form>
    </AuthCard>
  );
}
