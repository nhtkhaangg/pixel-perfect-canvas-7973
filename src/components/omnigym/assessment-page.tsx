import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import { FieldInput } from "./entity-workspace";
import type { RecordRow } from "@/lib/omnigym/data";
import type { Field } from "@/lib/omnigym/workspaces";
const groups: Field[][] = [
  [
    { key: "hasCardiovascularIssues", label: "Vấn đề tim mạch", type: "boolean" },
    { key: "hasAsthmaOrRespiratory", label: "Hen suyễn / hô hấp", type: "boolean" },
    {
      key: "bloodPressure",
      label: "Huyết áp",
      type: "select",
      options: ["NORMAL", "HIGH", "LOW"],
      required: true,
    },
    { key: "hasSpineOrJointInjuries", label: "Chấn thương cột sống / khớp", type: "boolean" },
    { key: "injuryDetails", label: "Chi tiết chấn thương", type: "textarea" },
    { key: "hasSevereInjury", label: "Chấn thương nghiêm trọng", type: "boolean" },
    { key: "digestiveConditions", label: "Tình trạng tiêu hóa", type: "list", required: true },
    { key: "digestiveDetails", label: "Chi tiết tiêu hóa", type: "textarea" },
  ],
  [
    { key: "primaryGoal", label: "Mục tiêu chính", required: true },
    { key: "targetWeightKg", label: "Cân nặng mục tiêu (kg)", type: "number" },
  ],
  [
    {
      key: "activityLevel",
      label: "Mức vận động",
      type: "select",
      options: ["SEDENTARY", "LIGHT", "MODERATE", "VERY_ACTIVE"],
      required: true,
    },
    { key: "sleepHoursPerNight", label: "Giấc ngủ (giờ/đêm)", type: "number", required: true },
    { key: "mealsPerDay", label: "Số bữa/ngày", type: "number", required: true },
    { key: "dailyBudget", label: "Ngân sách/ngày", required: true },
    { key: "allergies", label: "Dị ứng", type: "list", required: true },
    { key: "allergiesOther", label: "Dị ứng khác", type: "textarea" },
    { key: "dietaryHabit", label: "Thói quen ăn uống", required: true },
    { key: "dietaryNotes", label: "Ghi chú chế độ ăn", type: "textarea" },
  ],
  [
    { key: "heightCm", label: "Chiều cao (cm)", type: "number" },
    { key: "weightKg", label: "Cân nặng (kg)", type: "number" },
  ],
];
export function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RecordRow>({
    hasCardiovascularIssues: false,
    hasAsthmaOrRespiratory: false,
    bloodPressure: "NORMAL",
    hasSpineOrJointInjuries: false,
    hasSevereInjury: false,
    digestiveConditions: ["Không có"],
    primaryGoal: "WEIGHT_LOSS",
    activityLevel: "MODERATE",
    sleepHoursPerNight: 7,
    mealsPerDay: 3,
    dailyBudget: "100.000 VNĐ",
    allergies: ["Không có"],
    dietaryHabit: "Ăn cân bằng",
    heightCm: 172.5,
    weightKg: 68,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const steps = ["Tiền sử sức khỏe", "Mục tiêu tập luyện", "Lối sống", "Chỉ số cơ thể", "Tổng kết"];
  function next() {
    const e: Record<string, string> = {};
    for (const f of groups[step] ?? []) {
      if (f.required && !String(data[f.key] ?? "").trim()) e[f.key] = "Vui lòng nhập thông tin";
    }
    const bounds: Record<string, [number, number]> = {
      targetWeightKg: [20, 300],
      sleepHoursPerNight: [1, 24],
      mealsPerDay: [1, 10],
      heightCm: [50, 250],
      weightKg: [20, 300],
    };
    for (const f of groups[step] ?? []) {
      const bound = bounds[f.key];
      if (
        bound &&
        data[f.key] !== "" &&
        data[f.key] !== undefined &&
        (Number(data[f.key]) < bound[0] || Number(data[f.key]) > bound[1])
      )
        e[f.key] = `Giá trị từ ${bound[0]}–${bound[1]}`;
    }
    if (step === 3 && Boolean(data["heightCm"]) !== Boolean(data["weightKg"]))
      e["heightCm"] = "Nhập cả chiều cao và cân nặng, hoặc bỏ qua cả hai";
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step === 4) {
      setDone(true);
      toast.success("Đã gửi đánh giá thể trạng");
    } else setStep(step + 1);
  }
  return (
    <>
      <PageHeader title="Đánh giá thể trạng" />
      {done ? (
        <div className="py-12">
          <h2 className="text-xl font-semibold text-primary">Đã gửi đánh giá</h2>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
          >
            Chỉnh sửa câu trả lời
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-2">
            {steps.map((s, i) => (
              <div key={s}>
                <div className={`h-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {i + 1}. {s}
                </p>
              </div>
            ))}
          </div>
          <h2 className="text-lg font-semibold">{steps[step]}</h2>
          <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
            {step < 4
              ? (groups[step] ?? []).map((f) => (
                  <FormField
                    key={f.key}
                    label={f.label}
                    required={Boolean(f.required)}
                    error={errors[f.key]}
                  >
                    {() => (
                      <FieldInput
                        field={f}
                        value={data[f.key]}
                        onChange={(v) => setData({ ...data, [f.key]: v })}
                      />
                    )}
                  </FormField>
                ))
              : groups
                  .flat()
                  .filter((f) => data[f.key] !== undefined)
                  .map((f) => (
                    <div key={f.key}>
                      <p className="text-xs text-muted-foreground">{f.label}</p>
                      <p className="mt-1 text-sm">
                        {typeof data[f.key] === "boolean"
                          ? data[f.key]
                            ? "Có"
                            : "Không"
                          : String(data[f.key] ?? "")}
                      </p>
                    </div>
                  ))}
          </div>
          <div className="flex max-w-3xl justify-between border-t border-border pt-5">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Quay lại
            </Button>
            <Button onClick={next}>{step === 4 ? "Gửi đánh giá" : "Tiếp tục"}</Button>
          </div>
        </>
      )}
    </>
  );
}
