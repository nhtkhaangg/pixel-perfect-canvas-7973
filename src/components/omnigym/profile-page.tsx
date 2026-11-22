import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FieldInput } from "./entity-workspace";
import type { Field } from "@/lib/omnigym/workspaces";
import { demoCustomer, type RecordRow } from "@/lib/omnigym/data";
import { TransactionsPage, CheckInHistoryPage } from "./misc-pages";
import { NutritionEditor } from "./nutrition-editor";
import { NotificationsPage } from "./notifications-page";
import { AssessmentPage } from "./assessment-page";
import { Input } from "@/components/ui/input";
import { FormModal } from "@/components/shared/form-modal";
const fields: Field[] = [
  { key: "fullName", label: "Họ và tên", required: true, max: 100 },
  { key: "phone", label: "Điện thoại", max: 20 },
  {
    key: "gender",
    label: "Giới tính",
    required: true,
    type: "select",
    options: ["MALE", "FEMALE"],
  },
  { key: "dob", label: "Ngày sinh", type: "date" },
  { key: "address", label: "Địa chỉ", max: 255 },
  { key: "health_notes", label: "Ghi chú sức khỏe", type: "textarea" },
];
export function CustomerProfile() {
  const [draft, setDraft] = useState<RecordRow>(demoCustomer);
  const [tab, setTab] = useState("personal");
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <>
      <PageHeader
        title="Nguyễn Minh Anh"
        description={`${demoCustomer.customerCode} · ${demoCustomer.email}`}
      />
      <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-x-auto">
          <TabsList>
            {[
              ["personal", "Cá nhân"],
              ["membership", "Gói tập"],
              ["availability", "Lịch rảnh"],
              ["security", "Bảo mật"],
              ["notifications", "Thông báo"],
              ["transactions", "Giao dịch"],
              ["checkin", "Check-in"],
              ["assessment", "Thể trạng"],
            ].map(
              ([value, label]) =>
                value && (
                  <TabsTrigger key={value} value={value}>
                    {label}
                  </TabsTrigger>
                ),
            )}
          </TabsList>
        </div>
        <TabsContent value="personal">
          <form
            className="grid max-w-3xl gap-5 py-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const err: Record<string, string> = {};
              if (!String(draft["fullName"]).trim()) err["fullName"] = "Nhập họ tên";
              setErrors(err);
              if (!Object.keys(err).length) toast.success("Đã cập nhật hồ sơ mẫu");
            }}
          >
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
            <Button type="submit" className="w-fit">
              Lưu thay đổi
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="membership">
          <TransactionsPage />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsPage />
        </TabsContent>
        <TabsContent value="availability">
          <Availability />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsPage />
        </TabsContent>
        <TabsContent value="checkin">
          <CheckInHistoryPage />
        </TabsContent>
        <TabsContent value="assessment">
          <AssessmentPage />
        </TabsContent>
      </Tabs>
    </>
  );
}
function Availability() {
  const [slots, setSlots] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-5 py-5">
      <div className="overflow-x-auto">
        <div className="grid min-w-[700px] grid-cols-7 gap-2">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <div key={day}>
              <p className="mb-3 text-center text-sm font-semibold">{day}</p>
              {["06:00", "07:00", "12:00", "17:00", "18:00", "19:00"].map((time) => (
                <Button
                  key={time}
                  variant={slots[day + time] ? "default" : "outline"}
                  size="sm"
                  className="mb-2 w-full"
                  onClick={() => setSlots({ ...slots, [day + time]: !slots[day + time] })}
                >
                  {time}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => toast.success("Đã lưu lịch rảnh")}>Lưu lịch rảnh</Button>
    </div>
  );
}
function Security() {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  return (
    <form
      className="max-w-md space-y-4 py-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !values.currentPassword ||
          values.newPassword.length < 6 ||
          values.newPassword !== values.confirmPassword
        ) {
          setErr("Nhập mật khẩu hiện tại, mật khẩu mới ít nhất 6 ký tự và xác nhận khớp.");
          return;
        }
        setErr("");
        toast.info("Đã cập nhật mật khẩu mẫu — chưa kết nối tài khoản thật");
      }}
    >
      {(
        [
          ["currentPassword", "Mật khẩu hiện tại"],
          ["newPassword", "Mật khẩu mới"],
          ["confirmPassword", "Xác nhận mật khẩu mới"],
        ] as const
      ).map(([key, label]) => (
        <FormField key={key} label={label} required>
          {(p) => (
            <Input
              {...p}
              name={key}
              type="password"
              value={values[key]}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            />
          )}
        </FormField>
      ))}
      {err && <p className="text-sm text-destructive">{err}</p>}
      <Button type="submit">Đổi mật khẩu</Button>
    </form>
  );
}
