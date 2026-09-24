import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { trainers } from "@/lib/mock/public";
import { CheckoutFlow } from "@/components/customer/checkout";
import { Avatar } from "@/components/public/cards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/book-pt")({
  head: () => seo("Book personal training", "Choose a PT package and trainer, then pay to start coaching."),
  component: BookPT,
});

const slots = ["Mon 18:00", "Tue 07:00", "Wed 18:00", "Thu 12:00", "Fri 07:00", "Sat 09:00"];

function BookPT() {
  const [trainerId, setTrainerId] = useState("maya-nguyen");
  const [picked, setPicked] = useState<string[]>(["Mon 18:00", "Wed 18:00"]);
  const t = trainers.find((x) => x.id === trainerId)!;

  return (
    <CheckoutFlow
      type="PT"
      title="Book a personal-trainer package"
      description="Choose sessions, pick your coach and preferred weekly slots."
      extraStep={{
        label: "Trainer",
        valid: picked.length > 0,
        summary: `${t.name} · ${picked.join(", ")}`,
        render: () => (
          <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2">
              {trainers.map((tr) => (
                <button key={tr.id} type="button" onClick={() => setTrainerId(tr.id)} className={cn("flex items-center gap-3 rounded-lg border p-3 text-left", tr.id === trainerId ? "border-primary ring-1 ring-primary" : "border-border")}>
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
              <p className="text-sm font-medium">Preferred weekly slots with {t.name.split(" ")[0]}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button key={s} type="button" onClick={() => setPicked(picked.includes(s) ? picked.filter((x) => x !== s) : [...picked, s])} className={cn("rounded-md border px-3 py-1.5 text-sm", picked.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
                    {s}
                  </button>
                ))}
              </div>
              {!picked.length ? <p className="mt-2 text-xs text-destructive">Choose at least one slot</p> : null}
            </div>
          </div>
        ),
      }}
    />
  );
}
