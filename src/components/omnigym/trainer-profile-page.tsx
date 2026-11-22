import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FieldInput } from "./entity-workspace";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { canonicalTrainers, type RecordRow } from "@/lib/omnigym/data";
import { useDemoSession } from "./demo-session";
import { validTrainerPhone } from "@/lib/omnigym/contracts";
import type { Field } from "@/lib/omnigym/workspaces";
const fields: Field[] = [
  { key: "fullName", label: "Họ và tên", required: true, max: 100 },
  { key: "email", label: "Email", required: true, type: "email" },
  { key: "phone", label: "Số điện thoại", required: true },
  { key: "specialization", label: "Chuyên môn", max: 100 },
  {
    key: "trainer_tier",
    label: "Cấp bậc",
    type: "select",
    options: ["JUNIOR", "SENIOR", "MASTER"],
    default: "JUNIOR",
  },
  { key: "experience_years", label: "Năm kinh nghiệm", type: "number" },
  { key: "bio", label: "Giới thiệu", type: "textarea" },
  { key: "avatarUrl", label: "Đường dẫn ảnh đại diện" },
  { key: "identity_number", label: "Số giấy tờ tùy thân", max: 20 },
  { key: "identity_card_front", label: "Ảnh giấy tờ mặt trước" },
  { key: "identity_card_back", label: "Ảnh giấy tờ mặt sau" },
];
const certFields: Field[] = [
  { key: "certificate_name", label: "Tên chứng chỉ", required: true },
  { key: "issuingOrg", label: "Đơn vị cấp", required: true },
  { key: "certificate_url", label: "Đường dẫn chứng chỉ" },
  { key: "issueDate", label: "Ngày cấp", required: true, type: "date" },
  { key: "expiryDate", label: "Ngày hết hạn", type: "date" },
];
export function TrainerProfilePage({
  edit = false,
  registration = false,
}: {
  edit?: boolean;
  registration?: boolean;
}) {
  const session = useDemoSession();
  const rows = useEntities("trainers");
  const current: RecordRow | undefined =
    rows.find((r) => r["id"] === session.trainerId) ?? canonicalTrainers[0];
  const [draft, setDraft] = useState<RecordRow>(
    registration ? {} : { ...current, trainer_tier: current?.["trainerTier"] ?? "JUNIOR" },
  );
  const [certs, setCerts] = useState<RecordRow[]>([{}]);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  function save(e: React.FormEvent) {
    e.preventDefault();
    const error: Record<string, string> = {};
    for (const f of fields) {
      if (f.required && !String(draft[f.key] ?? "").trim())
        error[f.key] = "Vui lòng nhập thông tin";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(draft["email"] ?? "")))
      error["email"] = "Email không hợp lệ";
    if (!validTrainerPhone(String(draft["phone"] ?? "")))
      error["phone"] = "Nhập số điện thoại Việt Nam hợp lệ";
    if (registration && String(draft["password"] ?? "").length < 6)
      error["password"] = "Mật khẩu tối thiểu 6 ký tự";
    if (
      registration &&
      (!certs.length ||
        certs.some((c) => !c["certificate_name"] || !c["issuingOrg"] || !c["issueDate"]))
    )
      error["certificates"] = "Cần ít nhất một chứng chỉ đầy đủ tên, đơn vị và ngày cấp";
    if (registration && !terms) error["terms"] = "Đồng ý điều khoản trước khi gửi";
    setErrors(error);
    if (Object.keys(error).length) return;
    const id = registration ? crypto.randomUUID() : String(current?.["id"] ?? session.trainerId);
    const next: RecordRow = {
      ...draft,
      id,
      trainerTier: String(draft["trainer_tier"] ?? "JUNIOR"),
      approval_status: registration ? "PENDING" : String(current?.["approval_status"] ?? "PENDING"),
    };
    delete next["password"];
    entityStore.save("trainers", next);
    if (registration) {
      for (const c of certs)
        entityStore.save("certificates", {
          ...c,
          id: crypto.randomUUID(),
          trainerId: id,
          status: "PENDING",
        });
      session.setTrainerId(id);
      session.setRole("trainer");
      session.setApproval("PENDING");
    }
    toast.success(registration ? "Đã nộp hồ sơ chờ phê duyệt" : "Đã cập nhật hồ sơ");
    navigate({ to: "/trainer/profile" });
  }
  if (!edit && !registration)
    return (
      <>
        <PageHeader
          title={String(current?.["fullName"] ?? "Hồ sơ huấn luyện viên")}
          description={String(current?.["specialization"] ?? "")}
          actions={
            <Button asChild>
              <Link to="/trainer/profile/edit">Chỉnh sửa hồ sơ</Link>
            </Button>
          }
        />
        <StatusBadge status={String(current?.["approval_status"] ?? session.approval)} />
        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
          {fields
            .filter((f) => f.key !== "password")
            .map((f) => (
              <div key={f.key}>
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="mt-1 break-words text-sm">{String(current?.[f.key] ?? "—")}</p>
              </div>
            ))}
        </div>
        <Button variant="outline" asChild>
          <Link to="/trainer/certificates">Chứng chỉ của tôi</Link>
        </Button>
      </>
    );
  return (
    <>
      <PageHeader
        title={registration ? "Ứng tuyển huấn luyện viên" : "Chỉnh sửa hồ sơ huấn luyện viên"}
      />
      <form className="space-y-7" onSubmit={save} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <FormField
              key={f.key}
              label={f.label}
              required={Boolean(f.required)}
              error={errors[f.key]}
            >
              {() => (
                <FieldInput
                  field={f}
                  value={draft[f.key]}
                  onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                />
              )}
            </FormField>
          ))}
          {registration && (
            <FormField label="Mật khẩu" required error={errors["password"]}>
              {(p) => (
                <Input
                  {...p}
                  name="password"
                  type="password"
                  value={String(draft["password"] ?? "")}
                  onChange={(e) => setDraft({ ...draft, password: e.target.value })}
                />
              )}
            </FormField>
          )}
        </div>
        {registration && (
          <section className="space-y-5 border-t border-border pt-6">
            <h2 className="text-lg font-semibold">Chứng chỉ</h2>
            {certs.map((c, index) => (
              <div key={index} className="grid gap-4 sm:grid-cols-2">
                {certFields.map((f) => (
                  <FormField key={f.key} label={f.label} required={Boolean(f.required)}>
                    {() => (
                      <FieldInput
                        field={f}
                        value={c[f.key]}
                        onChange={(v) =>
                          setCerts(certs.map((x, i) => (i === index ? { ...x, [f.key]: v } : x)))
                        }
                      />
                    )}
                  </FormField>
                ))}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Xóa chứng chỉ"
                  onClick={() => setCerts(certs.filter((_, i) => i !== index))}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => setCerts([...certs, {}])}>
              <Plus className="size-4" />
              Thêm chứng chỉ
            </Button>
            {errors["certificates"] && (
              <p className="text-sm text-destructive">{errors["certificates"]}</p>
            )}
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={terms} onCheckedChange={(v) => setTerms(v === true)} />
              Tôi đồng ý điều khoản đăng ký huấn luyện viên.
            </label>
            {errors["terms"] && <p className="text-sm text-destructive">{errors["terms"]}</p>}
          </section>
        )}
        <Button type="submit">{registration ? "Gửi hồ sơ" : "Lưu thay đổi"}</Button>
      </form>
    </>
  );
}
