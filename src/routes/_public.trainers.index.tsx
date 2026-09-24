import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PageHero, TrainerCard } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_public/trainers/")({
  head: () => seo("Huấn luyện viên", "Khám phá đội ngũ huấn luyện viên chuyên nghiệp tại GymFit theo chuyên môn, kinh nghiệm và đánh giá hội viên."),
  component: TrainersPage,
});

function TrainersPage() {
  const [q, setQ] = useState("");
  const [zone, setZone] = useState("all");
  const [sort, setSort] = useState("rating");
  const zones = [...new Set(trainers.map((t) => t.branch))];

  const list = useMemo(() => {
    const term = q.toLowerCase();
    return trainers
      .filter((t) => zone === "all" || t.branch === zone)
      .filter((t) => !term || [t.name, t.specialization, ...t.tags].join(" ").toLowerCase().includes(term))
      .sort((a, b) => (sort === "rating" ? b.ratingAvg - a.ratingAvg : b.experienceYears - a.experienceYears));
  }, [q, zone, sort]);

  return (
    <>
      <PageHero
        eyebrow="Huấn luyện viên"
        title="Những huấn luyện viên am hiểu chuyên môn"
        description="Mỗi huấn luyện viên tại GymFit đều có chứng chỉ, được bảo hiểm và đánh giá bởi hội viên. Tìm người phù hợp với mục tiêu của bạn."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative min-w-60 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Tìm tên, chuyên môn hoặc mục tiêu…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={zone} onValueChange={setZone}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả khu vực</SelectItem>
              {zones.map((z) => <SelectItem key={z} value={z}>{z}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              <SelectItem value="experience">Nhiều kinh nghiệm nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {list.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t) => <TrainerCard key={t.id} trainer={t} />)}
          </div>
        ) : (
          <EmptyState title="Không tìm thấy huấn luyện viên phù hợp" description="Hãy thử từ khóa hoặc khu vực khác." />
        )}
      </section>
    </>
  );
}
