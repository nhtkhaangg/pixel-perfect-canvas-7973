import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, DollarSign, Dumbbell } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, gymInfo, packages } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { imageFor } from "@/lib/images";
import { StatCard } from "@/components/shared/stat-card";
import { PackageCard } from "@/components/public/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export const Route = createFileRoute("/_public/packages/$id")({
  loader: ({ params }) => {
    const pkg = packages.find((p) => p.id === params.id);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.pkg.name, loaderData.pkg.description)
      : { meta: [{ title: "Không tìm thấy gói tập — GymFit" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: PackageNotFound,
  component: PackageDetail,
});

function PackageNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState
        title="Không tìm thấy gói tập"
        description="Gói này có thể đã ngừng cung cấp."
        action={<Button asChild><Link to="/packages">Xem các gói tập</Link></Button>}
      />
    </div>
  );
}

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const perSession = pkg.totalSessions ? pkg.price / pkg.totalSessions : null;
  const related = packages.filter((p) => p.type === pkg.type && p.id !== pkg.id).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Tất cả gói tập
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <img
            src={imageFor(pkg.id)}
            alt={pkg.name}
            loading="lazy"
            width={960}
            height={320}
            className="h-56 w-full rounded-lg object-cover"
          />
          <Badge className="mt-6">{pkg.type === "PT" ? "Huấn luyện cá nhân" : "Hội viên"}</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{pkg.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Giá" value={formatCurrency(pkg.price)} icon={DollarSign} hint={perSession ? `${formatCurrency(perSession)} mỗi buổi` : `${formatCurrency(pkg.price / (pkg.durationDays / 30))} / tháng`} />
            <StatCard label="Thời hạn" value={`${pkg.durationDays} ngày`} icon={CalendarDays} hint={`≈ ${Math.round(pkg.durationDays / 7)} tuần`} />
            <StatCard label="Số buổi" value={pkg.totalSessions ?? "Không giới hạn"} icon={Dumbbell} hint={pkg.totalSessions ? "1-kèm-1 với huấn luyện viên" : "Ra vào phòng gym & lớp học"} />
          </div>

          <h2 className="mt-10 text-lg font-semibold">Quyền lợi bao gồm</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.perks.map((p) => (
              <li key={p} className="flex gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-semibold">Cần biết thêm</h2>
          <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
            {gymInfo.faqs.slice(1).map((f) => (
              <div key={f.q} className="p-4">
                <p className="text-sm font-medium">{f.q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
          <p className="text-sm text-muted-foreground">Tổng cộng</p>
          <p className="text-4xl font-semibold tracking-tight">{formatCurrency(pkg.price)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Có hiệu lực {pkg.durationDays} ngày kể từ khi kích hoạt</p>
          <Button className="mt-6 w-full" size="lg" onClick={() => toast.success("Tạo tài khoản để mua gói này", { description: pkg.name })} asChild>
            <Link to="/register">Chọn gói này</Link>
          </Button>
          <Button className="mt-2 w-full" variant="outline" asChild>
            <Link to="/gym-info">Ghé tham quan trước</Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">Không phí gia nhập · Hủy trước khi gia hạn bất kỳ lúc nào</p>
        </aside>
      </div>

      {related.length ? (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-semibold">Gói tập tương tự</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </div>
      ) : null}
    </section>
  );
}
