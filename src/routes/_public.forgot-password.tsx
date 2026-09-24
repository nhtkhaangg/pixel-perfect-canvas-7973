import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/forgot-password")({
  head: () => seo("Đặt lại mật khẩu", "Yêu cầu liên kết đặt lại mật khẩu cho tài khoản GymFit của bạn."),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  return (
    <AuthCard
      title={sent ? "Kiểm tra hộp thư" : "Quên mật khẩu"}
      description={sent ? `Chúng tôi đã gửi liên kết đặt lại mật khẩu tới ${email}. Liên kết hết hạn sau 30 phút.` : "Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu."}
      aside={<AuthAside quote="Nhân viên xử lý tài khoản của tôi chỉ trong vài phút. Đúng là phòng gym thân thiện nhất tôi từng đến." author="Chi R., hội viên" />}
      footer={<>Đã nhớ ra mật khẩu? <Link to="/login" className="font-medium text-primary">Quay lại đăng nhập</Link></>}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground"><MailCheck className="size-6" /></span>
          <Button variant="outline" onClick={() => setSent(false)}>Dùng email khác</Button>
        </div>
      ) : (
        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isEmail(email)) return setError("Email không hợp lệ");
            setError(undefined);
            setSent(true);
          }}
        >
          <FormField label="Email" required error={error}>
            {(p) => <Input {...p} type="email" placeholder="ban@vidu.com" value={email} onChange={(e) => setEmail(e.target.value)} />}
          </FormField>
          <Button type="submit" className="w-full">Gửi liên kết đặt lại</Button>
        </form>
      )}
    </AuthCard>
  );
}
