import { useState } from "react";
import { toast } from "sonner";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { demoCustomer, type RecordRow } from "@/lib/omnigym/data";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/shared/status-badge";
export function NutritionEditor({
  customerId = demoCustomer.id,
  readOnly = false,
}: {
  customerId?: string;
  readOnly?: boolean;
}) {
  const rows = useEntities("nutrition");
  const plan = rows.find((r) => r["customerId"] === customerId && r["status"] === "ACTIVE");
  const [name, setName] = useState(String(plan?.["planName"] ?? "Dinh dưỡng giảm mỡ"));
  const [calories, setCalories] = useState(Number(plan?.["dailyCalories"] ?? 2250));
  const [notes, setNotes] = useState(String(plan?.["notes"] ?? ""));
  return (
    <>
      <PageHeader title={readOnly ? "Chế độ dinh dưỡng" : "Kế hoạch dinh dưỡng"} />
      {readOnly ? (
        <>
          <StatusBadge status={String(plan?.["status"] ?? "DRAFT")} />
          <h2 className="text-xl font-semibold">
            {String(plan?.["planName"] ?? "Chưa có kế hoạch đang áp dụng")}
          </h2>
          {plan && (
            <>
              <p className="text-3xl font-bold text-primary">
                {String(plan["dailyCalories"])} kcal
              </p>
              <p className="text-sm text-muted-foreground">{String(plan["notes"] ?? "")}</p>
            </>
          )}
        </>
      ) : (
        <form
          className="max-w-2xl space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || name.length > 150 || !Number.isInteger(calories)) {
              toast.error("Kiểm tra tên kế hoạch và calo dạng số nguyên");
              return;
            }
            entityStore.save("nutrition", {
              id: crypto.randomUUID(),
              customerId,
              trainerId: "maya-nguyen",
              planName: name,
              dailyCalories: calories,
              notes,
              status: "ACTIVE",
              createdAt: new Date().toISOString(),
            });
            toast.success("Đã gửi kế hoạch dinh dưỡng");
          }}
        >
          <FormField label="Tên kế hoạch" required>
            {(p) => (
              <Input
                {...p}
                name="planName"
                value={name}
                maxLength={150}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </FormField>
          <FormField label="Calo hàng ngày" required>
            {(p) => (
              <Input
                {...p}
                name="dailyCalories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
              />
            )}
          </FormField>
          <FormField label="Ghi chú">
            {(p) => (
              <Textarea
                {...p}
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            )}
          </FormField>
          <p className="text-xs text-warning">Cần xác nhận cấu trúc bữa ăn chi tiết.</p>
          <Button type="submit">Gửi cho hội viên</Button>
        </form>
      )}
    </>
  );
}
