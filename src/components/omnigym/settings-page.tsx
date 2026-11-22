import { useState } from "react";
import { toast } from "sonner";
import { canonicalGym, type RecordRow } from "@/lib/omnigym/data";
import { gymInfo } from "@/lib/mock/public";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { FieldInput } from "./entity-workspace";
import { Button } from "@/components/ui/button";
import type { Field } from "@/lib/omnigym/workspaces";
const fields: Field[] = [
  { key: "name", label: "Tên phòng gym", required: true, max: 150 },
  { key: "slogan", label: "Khẩu hiệu", max: 255 },
  { key: "description", label: "Giới thiệu", type: "textarea" },
  { key: "address", label: "Địa chỉ", required: true, max: 255 },
  { key: "hotline", label: "Hotline", required: true, max: 20 },
  { key: "email", label: "Email", type: "email", required: true, max: 100 },
  { key: "phone", label: "Điện thoại", max: 20 },
  { key: "totalArea", label: "Tổng diện tích", max: 50 },
  { key: "capacity", label: "Sức chứa", type: "number", default: 350 },
  { key: "establishedYear", label: "Năm thành lập", type: "number" },
];
export function SettingsPage() {
  const [data, setData] = useState<RecordRow>(canonicalGym);
  return (
    <>
      <PageHeader title="Cài đặt phòng gym" />
      <Tabs defaultValue="general">
        <div className="overflow-x-auto">
          <TabsList>
            {[
              ["general", "Thông tin chung"],
              ["hours", "Giờ mở cửa"],
              ["amenities", "Tiện ích"],
              ["gallery", "Thư viện ảnh"],
              ["zones", "Khu tập"],
              ["rules", "Nội quy"],
            ].map(
              ([key, label]) =>
                key && (
                  <TabsTrigger key={key} value={key}>
                    {label}
                  </TabsTrigger>
                ),
            )}
          </TabsList>
        </div>
        <TabsContent value="general">
          <form
            className="grid gap-5 py-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Đã lưu thông tin phòng gym");
            }}
          >
            {fields.map((f) => (
              <FormField key={f.key} label={f.label} required={Boolean(f.required)}>
                {() => (
                  <FieldInput
                    field={f}
                    value={data[f.key]}
                    onChange={(v) => setData({ ...data, [f.key]: v })}
                  />
                )}
              </FormField>
            ))}
            <Button type="submit" className="w-fit">
              Lưu thay đổi
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="hours">
          <p className="py-6 text-sm">{gymInfo.hours}</p>
          <Unverified />
        </TabsContent>
        <TabsContent value="amenities">
          <ul className="space-y-3 py-6 text-sm">
            {gymInfo.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <Unverified />
        </TabsContent>
        <TabsContent value="gallery">
          <Unverified />
        </TabsContent>
        <TabsContent value="zones">
          <div className="grid gap-4 py-6 sm:grid-cols-2">
            {gymInfo.zones.map((z) => (
              <div key={z.name}>
                <h2 className="font-semibold">{z.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{z.description}</p>
              </div>
            ))}
          </div>
          <Unverified />
        </TabsContent>
        <TabsContent value="rules">
          <Unverified />
        </TabsContent>
      </Tabs>
    </>
  );
}
function Unverified() {
  return (
    <p className="py-4 text-sm text-warning">
      Cần xác nhận cấu trúc dữ liệu chi tiết trước khi chỉnh sửa.
    </p>
  );
}
