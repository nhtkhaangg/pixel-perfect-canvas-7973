import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { packages, type PackageType } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { PackageCard, PageHero } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_public/packages/")({
  head: () =>
    seo("Gói tập & bảng giá", "So sánh các gói hội viên và huấn luyện cá nhân tại GymFit — giá, thời hạn và số buổi đi kèm."),
  component: PackagesPage,
});

type Filter = "ALL" | PackageType;

function PackagesPage() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [sort, setSort] = useState("price-asc");
  const list = useMemo(() => {
    const l = packages.filter((p) => filter === "ALL" || p.type === filter);
    return [...l].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : a.durationDays - b.durationDays,
    );
  }, [filter, sort]);

  return (
    <>
      <PageHero
        eyebrow="Gói tập"
        title="Hội viên và huấn luyện cá nhân"
        description="Chọn gói hội viên để ra vào phòng gym và lớp học, hoặc gói PT để được huấn luyện 1-kèm-1. Không phí gia nhập cho bất kỳ gói nào."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              <TabsTrigger value="ALL">Tất cả ({packages.length})</TabsTrigger>
              <TabsTrigger value="MEMBERSHIP">Hội viên</TabsTrigger>
              <TabsTrigger value="PT">Huấn luyện cá nhân</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Giá: thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá: cao đến thấp</SelectItem>
              <SelectItem value="duration">Thời hạn ngắn nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {list.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        ) : (
          <EmptyState title="Không có gói tập" description="Hãy thử bộ lọc khác." />
        )}
      </section>
    </>
  );
}
