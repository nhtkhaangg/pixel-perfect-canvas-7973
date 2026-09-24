import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Flame, Scale, Target } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/public/cards";
import { FormField } from "@/components/shared/form-field";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_public/tools/fitness-calculator")({
  head: () => seo("Công cụ tính BMI, BMR & TDEE", "Công cụ miễn phí tính chỉ số khối cơ thể, tỷ lệ trao đổi chất cơ bản và tổng năng lượng tiêu hao hàng ngày, kèm mục tiêu calo."),
  component: CalculatorPage,
});

const activity = [
  { value: "1.2", label: "Ít vận động (gần như không tập)" },
  { value: "1.375", label: "Nhẹ (1–3 buổi/tuần)" },
  { value: "1.55", label: "Vừa phải (3–5 buổi/tuần)" },
  { value: "1.725", label: "Năng động (6–7 buổi/tuần)" },
  { value: "1.9", label: "Rất năng động (vận động viên / lao động chân tay)" },
];

type Result = { bmi: number; bmr: number; tdee: number };

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Thiếu cân", status: "pending" };
  if (bmi < 25) return { label: "Cân nặng khỏe mạnh", status: "active" };
  if (bmi < 30) return { label: "Thừa cân", status: "pending" };
  return { label: "Béo phì", status: "overdue" };
}

function CalculatorPage() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("72");
  const [level, setLevel] = useState("1.55");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(age), h = Number(height), w = Number(weight);
    const errs: Record<string, string> = {};
    if (!(a >= 15 && a <= 90)) errs["age"] = "Nhập độ tuổi từ 15 đến 90";
    if (!(h >= 120 && h <= 230)) errs["height"] = "Nhập chiều cao từ 120 đến 230 cm";
    if (!(w >= 30 && w <= 250)) errs["weight"] = "Nhập cân nặng từ 30 đến 250 kg";
    setErrors(errs);
    if (Object.keys(errs).length) return setResult(null);
    const bmi = w / (h / 100) ** 2;
    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
    setResult({ bmi, bmr, tdee: bmr * Number(level) });
  }

  const cat = result ? bmiCategory(result.bmi) : null;

  return (
    <>
      <PageHero eyebrow="Công cụ" title="Công cụ tính BMI, BMR & TDEE" description="Ước tính chỉ số khối cơ thể, tỷ lệ trao đổi chất khi nghỉ và nhu cầu calo hàng ngày chỉ trong vài giây." />
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[380px_1fr] lg:px-6">
        <form onSubmit={calculate} className="h-fit space-y-5 rounded-lg border border-border bg-card p-6">
          <div className="space-y-1.5">
            <Label>Giới tính</Label>
            <RadioGroup value={sex} onValueChange={setSex} className="flex gap-6">
              <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="male" /> Nam</label>
              <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="female" /> Nữ</label>
            </RadioGroup>
          </div>
          <FormField label="Tuổi" required error={errors["age"]}>
            {(p) => <Input {...p} type="number" value={age} onChange={(e) => setAge(e.target.value)} />}
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Chiều cao (cm)" required error={errors["height"]}>
              {(p) => <Input {...p} type="number" value={height} onChange={(e) => setHeight(e.target.value)} />}
            </FormField>
            <FormField label="Cân nặng (kg)" required error={errors["weight"]}>
              {(p) => <Input {...p} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />}
            </FormField>
          </div>
          <div className="space-y-1.5">
            <Label>Mức độ vận động</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {activity.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Tính toán</Button>
          <p className="text-xs text-muted-foreground">Sử dụng công thức Mifflin–St Jeor. Chỉ mang tính ước tính, không phải tư vấn y tế.</p>
        </form>

        <div>
          {result && cat ? (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard label="BMI" value={result.bmi.toFixed(1)} hint="kg/m²" icon={Scale} />
                <StatCard label="BMR" value={`${Math.round(result.bmr)} kcal`} hint="Calo tiêu hao khi nghỉ" icon={Activity} />
                <StatCard label="TDEE" value={`${Math.round(result.tdee)} kcal`} hint="Calo duy trì mỗi ngày" icon={Flame} />
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Phân loại BMI</p>
                  <StatusBadge status={cat.status} label={cat.label} />
                </div>
                <div className="relative mt-5 h-2 rounded-full bg-gradient-to-r from-chart-2 via-primary to-destructive">
                  <span
                    className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-foreground"
                    style={{ left: `${Math.min(100, Math.max(0, ((result.bmi - 15) / 25) * 100))}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="flex items-center gap-2 font-semibold"><Target className="size-4 text-primary" /> Mục tiêu calo hàng ngày</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Giảm cân", value: result.tdee - 500, note: "≈ 0,5 kg / tuần" },
                    { label: "Duy trì", value: result.tdee, note: "Giữ nguyên vóc dáng" },
                    { label: "Tăng cơ", value: result.tdee + 300, note: "Thặng dư calo nhẹ" },
                  ].map((t) => (
                    <div key={t.label} className="rounded-md bg-muted p-4">
                      <p className="text-sm text-muted-foreground">{t.label}</p>
                      <p className="mt-1 text-xl font-semibold">{Math.round(t.value)} kcal</p>
                      <p className="text-xs text-muted-foreground">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-surface p-6 text-surface-foreground">
                <p>Muốn có giáo án tập luyện dựa trên các chỉ số này?</p>
                <Button asChild><Link to="/trainers">Tìm huấn luyện viên</Link></Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-border p-10 text-center">
              <Scale className="size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">Kết quả của bạn sẽ hiển thị ở đây</p>
              <p className="mt-1 text-sm text-muted-foreground">Điền thông tin và nhấn Tính toán.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
