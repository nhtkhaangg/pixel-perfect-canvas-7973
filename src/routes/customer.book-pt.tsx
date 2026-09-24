import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { trainers } from "@/lib/mock/public";
import { CheckoutFlow } from "@/components/customer/checkout";
import { Avatar } from "@/components/public/cards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/book-pt")({
  head: () => seo("Đặt lịch huấn luyện cá nhân", "Chọn gói PT và huấn luyện viên, sau đó thanh toán để bắt đầu tập luyện cùng chuyên gia."),
  component: BookPT,
});

const slots = ["Thứ 2 18:00", "Thứ 3 07:00", "Thứ 4 18:00", "Thứ 5 12:00", "Thứ 6 07:00", "Thứ 7 09:00"];

function BookPT() {
  const [trainerId, setTrainerId] = useState("maya-nguyen");
  const [picked, setPicked] = useState<string[]>(["Thứ 2 18:00", "Thứ 4 18:00"]);
  const t = trainers.find((x) => x.id === trainerId)!;

  return (
    <CheckoutFlow
      type="PT"
      title="Đặt gói huấn luyện viên cá nhân"
      description="Chọn số buổi tập, huấn luyện viên và khung giờ hàng tuần bạn muốn tập."
      extraStep={{
        label: "Huấn luyện viên",
        valid: picked.length > 0,
        summary: `${t.name} · ${picked.join(", ")}`,
        render: () => (
          <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2">
              {trainers.map((tr) => (
                <button key={tr.id} type="button" onClick={() => setTrainerId(tr.id)} className={cn("flex items-center gap-3 rounded-lg border p-3 text-left transition-colors", tr.id === trainerId ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50")}>
                  <Avatar name={tr.name} />
                  <span className="flex-1">
                    <span className="block font-medium">{tr.name}</span>
                    <span className="text-xs text-muted-foreground">{tr.specialization} · {tr.branch}</span>
                  </span>
                  <span className="flex items-center gap-1 text-sm"><Star className="size-3.5 fill-primary text-primary" />{tr.ratingAvg}</span>
                </button>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium">Khung giờ mong muốn tập cùng {t.name.split(" ").slice(-1)[0]}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button key={s} type="button" onClick={() => setPicked(picked.includes(s) ? picked.filter((x) => x !== s) : [...picked, s])} className={cn("rounded-md border px-3 py-1.5 text-sm transition-colors", picked.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
                    {s}
                  </button>
                ))}
              </div>
              {!picked.length ? <p className="mt-2 text-xs text-destructive">Chọn ít nhất một khung giờ</p> : null}
            </div>
          </div>
        ),
      }}
    />
  );
}
