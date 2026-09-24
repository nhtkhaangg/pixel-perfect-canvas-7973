import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/customer/assessment")({
  head: () => seo("Đánh giá thể trạng ban đầu", "Hoàn thành đánh giá thể trạng ban đầu để huấn luyện viên xây dựng giáo án cho bạn."),
  component: Assessment,
});

const goals = ["Giảm mỡ", "Tăng cơ", "Tăng sức mạnh", "Cải thiện sức bền", "Linh hoạt / giảm đau", "Nâng cao thể thao"];
const conditions = ["Đau lưng", "Chấn thương gối", "Chấn thương vai", "Huyết áp cao", "Hen suyễn", "Không có"];

function Assessment() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string[]>(["Giảm mỡ", "Tăng sức mạnh"]);
  const [cond, setCond] = useState<string[]>(["Không có"]);
  const [exp, setExp] = useState("intermediate");
  const [days, setDays] = useState([3]);
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const steps = ["Mục tiêu", "Sức khỏe", "Chỉ số nền", "Lối sống"];

  if (done)
    return (
      <>
        <PageHeader title="Đánh giá thể trạng ban đầu" description="Đã gửi tới huấn luyện viên Maya Nguyễn." />
        <div className="max-w-xl rounded-lg border border-border bg-card p-6">
          <StatusBadge status="pending" label="Đang chờ huấn luyện viên xem xét" />
          <p className="mt-3 text-sm text-muted-foreground">Maya sẽ xem xét câu trả lời của bạn và lên lịch kiểm tra vận động trong vòng 48 giờ.</p>
          <Button className="mt-5" variant="outline" onClick={() => { setDone(false); setStep(0); }}>Chỉnh sửa câu trả lời</Button>
        </div>
      </>
    );

  return (
    <>
      <PageHeader title="Đánh giá thể trạng ban đầu" description="Khoảng 5 phút. Giúp huấn luyện viên xây dựng giáo án phù hợp và an toàn." />
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <p className={`mt-2 text-xs ${i === step ? "font-medium" : "text-muted-foreground"}`}>{i + 1}. {s}</p>
          </div>
        ))}
      </div>
      <div className="max-w-3xl space-y-5 rounded-lg border border-border bg-card p-6">
        {step === 0 && (
          <>
            <Label>Mục tiêu chính</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {goals.map((g) => (
                <label key={g} className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm ${sel.includes(g) ? "border-primary bg-accent" : "border-border"}`}>
                  <Checkbox checked={sel.includes(g)} onCheckedChange={() => toggle(sel, setSel, g)} /> {g}
                </label>
              ))}
            </div>
            <FormField label="Mô tả mục tiêu của bạn bằng lời của chính bạn">{(p) => <Textarea {...p} defaultValue="Giảm 6 kg mỡ và đẩy ngực 100 kg trước tháng 12." />}</FormField>
          </>
        )}
        {step === 1 && (
          <>
            <Label>Chấn thương hoặc bệnh lý</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {conditions.map((g) => (
                <label key={g} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm">
                  <Checkbox checked={cond.includes(g)} onCheckedChange={() => toggle(cond, setCond, g)} /> {g}
                </label>
              ))}
            </div>
            <FormField label="Thuốc đang dùng / ghi chú" hint="Không bắt buộc. Chỉ chia sẻ với huấn luyện viên.">{(p) => <Textarea {...p} />}</FormField>
          </>
        )}
        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Chiều cao (cm)">{(p) => <Input {...p} type="number" defaultValue={178} />}</FormField>
            <FormField label="Cân nặng (kg)">{(p) => <Input {...p} type="number" defaultValue={80} />}</FormField>
            <FormField label="Nhịp tim nghỉ">{(p) => <Input {...p} type="number" defaultValue={62} />}</FormField>
            <FormField label="Số chống đẩy tối đa">{(p) => <Input {...p} type="number" defaultValue={28} />}</FormField>
            <FormField label="Thời gian giữ plank (giây)">{(p) => <Input {...p} type="number" defaultValue={90} />}</FormField>
            <FormField label="Ước tính 1RM đẩy ngực (kg)">{(p) => <Input {...p} type="number" defaultValue={85} />}</FormField>
            <div className="space-y-2 sm:col-span-3">
              <Label>Kinh nghiệm tập luyện</Label>
              <RadioGroup value={exp} onValueChange={setExp} className="flex flex-wrap gap-6">
                {["Mới bắt đầu", "Trung cấp", "Nâng cao"].map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm capitalize"><RadioGroupItem value={v} /> {v}</label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <Label>Số ngày mỗi tuần bạn có thể tập: <span className="text-primary">{days[0]}</span></Label>
              <Slider className="mt-3" min={1} max={7} step={1} value={days} onValueChange={setDays} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Thời gian ngủ trung bình (giờ)">{(p) => <Input {...p} type="number" defaultValue={7} />}</FormField>
              <FormField label="Nghề nghiệp">{(p) => <Input {...p} defaultValue="Kỹ sư phần mềm (văn phòng)" />}</FormField>
            </div>
          </div>
        )}
        <div className="flex justify-between border-t border-border pt-5">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Quay lại</Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Tiếp tục</Button>
          ) : (
            <Button onClick={() => { setDone(true); toast.success("Đã gửi đánh giá"); }}>Gửi đánh giá</Button>
          )}
        </div>
      </div>
    </>
  );
}
