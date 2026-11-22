import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Dumbbell, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { gymImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/form-field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { OAuthButtons } from "@/components/public/auth-card";
import { passwordStrength, validOtp, safeRedirect } from "@/lib/omnigym/contracts";
import { useDemoSession } from "./demo-session";
export function AuthPage({
  kind,
  redirect,
}: {
  kind: "login" | "internal" | "register" | "forgot";
  redirect?: string;
}) {
  const navigate = useNavigate();
  const session = useDemoSession();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [stage, setStage] = useState<"EMAIL" | "OTP" | "RESET" | "SUCCESS">("EMAIL");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);
  const title =
    kind === "register"
      ? "Tạo tài khoản"
      : kind === "forgot"
        ? "Khôi phục mật khẩu"
        : kind === "internal"
          ? "Đăng nhập nội bộ"
          : "Chào mừng trở lại";
  const input = (key: keyof typeof values, label: string, type = "text") => (
    <FormField label={label} required error={errors[key]}>
      {(p) => (
        <Input
          {...p}
          name={key}
          type={type}
          value={values[key]}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
        />
      )}
    </FormField>
  );
  const otp = (
    <div className="space-y-2">
      <p className="text-sm font-medium">Mã xác nhận 6 số</p>
      <InputOTP
        maxLength={6}
        value={values.otp}
        onChange={(v) => setValues({ ...values, otp: v.replace(/\D/g, "") })}
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {errors["otp"] && <p className="text-xs text-destructive">{errors["otp"]}</p>}
      <Button
        variant="ghost"
        type="button"
        disabled={cooldown > 0}
        className="px-0 text-primary"
        onClick={() => {
          setCooldown(60);
          toast.info("Đã gửi lại mã xác nhận mô phỏng");
        }}
      >
        {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại mã"}
      </Button>
    </div>
  );
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (stage === "EMAIL") {
      if (
        !values.email.trim() ||
        (kind !== "internal" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      )
        err["email"] = "Vui lòng nhập email hợp lệ";
      if (kind !== "forgot" && values.password.length < 6)
        err["password"] = "Mật khẩu tối thiểu 6 ký tự";
      if (kind === "register") {
        if (!values.fullName.trim()) err["fullName"] = "Vui lòng nhập họ tên";
        if (!values.phoneNumber.trim()) err["phoneNumber"] = "Vui lòng nhập số điện thoại";
        if (!agree) err["terms"] = "Vui lòng đồng ý điều khoản";
      }
    } else {
      if (!validOtp(values.otp)) err["otp"] = "Mã xác nhận gồm đúng 6 chữ số";
      if (stage === "RESET") {
        if (values.newPassword.length < 6) err["newPassword"] = "Mật khẩu tối thiểu 6 ký tự";
        if (values.newPassword !== values.confirmPassword)
          err["confirmPassword"] = "Mật khẩu chưa khớp";
      }
    }
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    setLoading(false);
    if (stage === "EMAIL" && kind === "register") {
      setStage("OTP");
      setCooldown(60);
      toast.info("Mã xác nhận được mô phỏng trong bản mẫu");
      return;
    }
    if (stage === "EMAIL" && kind === "forgot") {
      setStage("RESET");
      setCooldown(60);
      return;
    }
    if (kind === "forgot") {
      setStage("SUCCESS");
      return;
    }
    if (kind === "register") {
      toast.success("Đã hoàn tất đăng ký mẫu");
      navigate({ to: "/login" });
      return;
    }
    const role =
      kind === "internal"
        ? values.email.toUpperCase().startsWith("TRN")
          ? "trainer"
          : values.email.toUpperCase().startsWith("STF")
            ? "staff"
            : values.email.toUpperCase().startsWith("MGR")
              ? "manager"
              : "admin"
        : "customer";
    session.setRole(role);
    toast.info("Đã mở tài khoản mẫu — chưa kết nối đăng nhập thật");
    const target = safeRedirect(redirect);
    if (target) {
      navigate({ to: target });
      return;
    }
    navigate({
      to:
        role === "customer" ? "/" : role === "trainer" ? "/trainer/dashboard" : "/admin/dashboard",
    });
  }
  return (
    <div className="relative -m-4 flex min-h-[calc(100dvh-4rem)] overflow-hidden bg-auth-background lg:-m-8">
      <img
        src={gymImages.hero}
        alt="Không gian tập luyện OmniGym"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-overlay/70" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:px-12">
        <div className="hidden lg:block">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
            <Dumbbell className="size-8 text-primary" />
            OMNIGYM
          </Link>
          <h2 className="mt-12 text-4xl font-bold leading-tight">
            Hành trình của bạn.
            <br />
            <span className="text-primary">Sức mạnh của bạn.</span>
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Tập luyện, phục hồi và tiến bộ cùng đội ngũ huấn luyện viên OmniGym.
          </p>
          <blockquote className="mt-12 max-w-sm border-l-2 border-primary pl-5 text-sm leading-6">
            “Từng buổi tập đều có mục tiêu rõ ràng. Tôi cảm nhận được sự thay đổi mỗi tuần.”
            <p className="mt-3 text-muted-foreground">Nguyễn Minh Anh · Hội viên</p>
          </blockquote>
        </div>
        <section className="w-full max-w-[450px] justify-self-center rounded-3xl border border-foreground/12 bg-auth-card/85 p-6 shadow-2xl backdrop-blur-xl sm:p-9">
          <p className="mb-6 flex items-center gap-2 text-sm font-bold text-primary">
            <Dumbbell className="size-5" />
            OMNIGYM
          </p>
          {stage === "SUCCESS" ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-12 text-primary" />
              <h1 className="mt-4 text-xl font-semibold">Đã đặt lại mật khẩu</h1>
              <Button asChild className="mt-6 w-full">
                <Link to="/login">Đăng nhập</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">
                {stage === "OTP"
                  ? "Xác nhận tài khoản"
                  : stage === "RESET"
                    ? "Đặt mật khẩu mới"
                    : title}
              </h1>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                {stage !== "EMAIL"
                  ? values.email
                  : kind === "internal"
                    ? "Dành cho nhân viên, quản lý và huấn luyện viên."
                    : "Tiếp tục hành trình tập luyện cùng OmniGym."}
              </p>
              {(kind === "login" || kind === "register") && stage === "EMAIL" && <OAuthButtons />}
              <form onSubmit={submit} className="space-y-4" noValidate>
                {stage === "EMAIL" ? (
                  <>
                    {kind === "register" && input("fullName", "Họ và tên")}
                    {input(
                      "email",
                      kind === "internal" ? "Email hoặc mã nhân viên / quản lý" : "Email",
                      kind === "internal" ? "text" : "email",
                    )}
                    {kind === "register" && input("phoneNumber", "Số điện thoại", "tel")}
                    {kind !== "forgot" && input("password", "Mật khẩu", "password")}
                    {kind === "register" ? (
                      <>
                        <label className="flex items-start gap-2 text-sm">
                          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
                          Tôi đồng ý điều khoản sử dụng và chính sách bảo mật.
                        </label>
                        {errors["terms"] && (
                          <p className="text-xs text-destructive">{errors["terms"]}</p>
                        )}
                      </>
                    ) : (
                      kind !== "forgot" && (
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <label className="flex items-center gap-2">
                            <Checkbox />
                            Ghi nhớ đăng nhập
                          </label>
                          <Link to="/forgot-password" className="text-primary">
                            Quên mật khẩu?
                          </Link>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    {otp}
                    {stage === "RESET" && (
                      <>
                        {input("newPassword", "Mật khẩu mới", "password")}
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${passwordStrength(values.newPassword)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {passwordStrength(values.newPassword) === 25
                            ? "Yếu"
                            : passwordStrength(values.newPassword) === 65
                              ? "Trung bình"
                              : "Rất mạnh"}
                        </p>
                        {input("confirmPassword", "Xác nhận mật khẩu mới", "password")}
                      </>
                    )}
                  </>
                )}
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowRight className="size-4" />
                  )}
                  {stage === "OTP"
                    ? "Xác nhận"
                    : stage === "RESET"
                      ? "Đặt lại mật khẩu"
                      : kind === "forgot"
                        ? "Gửi mã xác nhận"
                        : kind === "register"
                          ? "Tạo tài khoản"
                          : "Đăng nhập"}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {kind === "login" ? (
                  <>
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-primary">
                      Đăng ký
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="text-primary">
                    Quay lại đăng nhập
                  </Link>
                )}
              </div>
              {kind === "login" && (
                <Link
                  to="/portal/login"
                  className="mt-4 block text-center text-xs text-muted-foreground hover:text-primary"
                >
                  Đăng nhập nhân viên
                </Link>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
