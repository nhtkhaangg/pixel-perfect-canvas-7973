import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { AuthCard, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_public/register-trainer")({
  head: () => seo("Trở thành huấn luyện viên GymFit", "Ứng tuyển làm huấn luyện viên tại GymFit. Chia sẻ chuyên môn, kinh nghiệm và chứng chỉ của bạn."),
  component: RegisterTrainerPage,
});

const specs = ["Sức mạnh & Powerlifting", "Giảm mỡ & Thể lực", "Vận động & Phục hồi", "Tăng cơ & Bodybuilding", "Sức bền & Chạy bộ", "Functional & Người lớn tuổi"];

function RegisterTrainerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", experienceYears: "", certificates: "", bio: "" });
  const [spec, setSpec] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs["name"] = "Vui lòng nhập họ tên đầy đủ";
    if (!isEmail(form.email)) errs["email"] = "Email không hợp lệ";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) errs["phone"] = "Số điện thoại không hợp lệ";
    if (!spec) errs["spec"] = "Vui lòng chọn chuyên môn";
    const y = Number(form.experienceYears);
    if (!(y >= 0 && y <= 50) || form.experienceYears === "") errs["experienceYears"] = "Từ 0–50 năm";
    if (!form.certificates.trim()) errs["certificates"] = "Liệt kê ít nhất một chứng chỉ";
    if (form.bio.trim().length < 40) errs["bio"] = "Vui lòng viết chi tiết hơn (từ 40 ký tự)";
    setErrors(errs);
    if (!Object.keys(errs).length) setDone(true);
  }

  const aside = (
    <>
      <p className="text-xs font-semibold tracking-wider text-primary uppercase">Huấn luyện cùng chúng tôi</p>
      <p className="mt-4 text-2xl font-semibold">Vì sao huấn luyện viên chọn GymFit</p>
      <ul className="mt-5 space-y-3 text-sm text-surface-foreground/80">
        {["Giữ lại đến 70% doanh thu gói PT", "Khách hàng được đặt lịch thẳng vào lịch của bạn", "Hỗ trợ đào tạo và chứng chỉ có trả phí", "Môi trường làm việc chuyên nghiệp, cơ sở vật chất hiện đại"].map((b) => (
          <li key={b} className="flex gap-2"><BadgeCheck className="size-4 shrink-0 text-primary" /> {b}</li>
        ))}
      </ul>
    </>
  );

  if (done) {
    return (
      <AuthCard title="Đã nhận đơn ứng tuyển" description="Bộ phận phụ trách huấn luyện viên sẽ xem xét đơn của bạn trong vòng 3 ngày làm việc." aside={aside}>
        <div className="space-y-4 rounded-md border border-border p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Trạng thái</span><StatusBadge status="pending" label="Đang xem xét" /></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Họ tên</span><span>{form.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Chuyên môn</span><span>{spec}</span></div>
        </div>
        <Button className="mt-6 w-full" asChild><Link to="/trainers">Xem đội ngũ huấn luyện viên</Link></Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Ứng tuyển làm huấn luyện viên"
      description="Chia sẻ về kinh nghiệm huấn luyện của bạn. Đơn ứng tuyển sẽ được quản lý phòng gym xem xét."
      aside={aside}
      footer={<>Muốn đăng ký làm hội viên? <Link to="/register" className="font-medium text-primary">Tạo tài khoản hội viên</Link></>}
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Họ và tên" required error={errors["name"]}>{(p) => <Input {...p} value={form.name} onChange={set("name")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email" required error={errors["email"]}>{(p) => <Input {...p} type="email" value={form.email} onChange={set("email")} />}</FormField>
          <FormField label="Số điện thoại" required error={errors["phone"]}>{(p) => <Input {...p} type="tel" value={form.phone} onChange={set("phone")} />}</FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Chuyên môn<span className="text-destructive">*</span></Label>
            <Select value={spec} onValueChange={setSpec}>
              <SelectTrigger aria-invalid={!!errors["spec"]}><SelectValue placeholder="Chọn…" /></SelectTrigger>
              <SelectContent>{specs.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            {errors["spec"] ? <p className="text-xs text-destructive">{errors["spec"]}</p> : null}
          </div>
          <FormField label="Số năm kinh nghiệm" required error={errors["experienceYears"]}>
            {(p) => <Input {...p} type="number" min={0} value={form.experienceYears} onChange={set("experienceYears")} />}
          </FormField>
        </div>
        <FormField label="Chứng chỉ" required error={errors["certificates"]} hint="Cách nhau bằng dấu phẩy, ví dụ: NASM-CPT, CPR/AED">
          {(p) => <Input {...p} value={form.certificates} onChange={set("certificates")} />}
        </FormField>
        <FormField label="Giới thiệu ngắn" required error={errors["bio"]}>
          {(p) => <Textarea {...p} rows={4} value={form.bio} onChange={set("bio")} placeholder="Phong cách huấn luyện của bạn, đối tượng bạn phù hợp nhất…" />}
        </FormField>
        <Button type="submit" className="w-full">Gửi đơn ứng tuyển</Button>
      </form>
    </AuthCard>
  );
}
