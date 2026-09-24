import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { articles, gymInfo, packages, reviews, trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { gymImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import {
  ArticleCard,
  MoreLink,
  PackageCard,
  ReviewCard,
  SectionHeading,
  Stars,
  TrainerCard,
} from "@/components/public/cards";

export const Route = createFileRoute("/_public/")({
  head: () =>
    seo(
      "Tập luyện có mục tiêu",
      "GymFit: một phòng gym đầy đủ trang thiết bị với huấn luyện viên chuyên nghiệp, 36 lớp học mỗi tuần, gói hội viên linh hoạt và huấn luyện cá nhân.",
    ),
  component: HomePage,
});

function HomePage() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <img
          src={gymImages.hero}
          alt="Không gian tập luyện tại GymFit"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.3fr_1fr] lg:px-6 lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              Tuần lễ kỷ niệm khu tạ tự do · 1–7/10
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-surface-foreground lg:text-6xl">
              Tập luyện có mục tiêu.
              <br />
              <span className="text-primary">Theo dõi từng buổi.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-surface-foreground/70">
              Một phòng gym đầy đủ trang thiết bị, 12 huấn luyện viên chuyên nghiệp và một ứng dụng hội viên
              lưu giữ giáo án, lịch tập và tiến độ của bạn ở cùng một nơi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/packages">Khám phá gói tập</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/tools/fitness-calculator">Tính TDEE của bạn</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-surface-foreground/70">
              <Stars rating={avg} />
              <span>
                {avg.toFixed(1)} từ {reviews.length * 45}+ đánh giá hội viên
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {gymInfo.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-surface-foreground/10 bg-surface/60 p-5 backdrop-blur-sm">
                <p className="text-3xl font-semibold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-surface-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Gói tập"
          title="Tìm gói phù hợp với lịch trình của bạn"
          description="Không phí gia nhập. Bảo lưu hoặc nâng cấp bất kỳ lúc nào từ khu vực hội viên."
          action={<MoreLink to="/packages">Tất cả gói tập</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {packages.filter((p) => p.featured || p.id === "flex-monthly").map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Huấn luyện viên"
            title="Gặp gỡ huấn luyện viên được đánh giá cao nhất"
            action={<MoreLink to="/trainers">Tất cả huấn luyện viên</MoreLink>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[...trainers].sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 3).map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Bài viết"
          title="Mới nhất từ blog"
          action={<MoreLink to="/articles">Tất cả bài viết</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
          <div>
            <SectionHeading
              eyebrow="Ghé thăm chúng tôi"
              title="Một phòng gym, đầy đủ mọi khu vực"
              description="Khu tạ tự do, khu cardio, phòng lớp nhóm và khu phục hồi — tất cả trong cùng một địa điểm."
            />
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Phone className="size-4 text-primary" /> {gymInfo.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> {gymInfo.address}</p>
              <p className="flex items-center gap-2"><Clock className="size-4 text-primary" /> {gymInfo.hours}</p>
            </div>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/gym-info">Xem đầy đủ thông tin phòng gym</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {gymInfo.zones.map((z) => (
              <div key={z.name} className="rounded-lg border border-border bg-card p-5">
                <p className="font-semibold">{z.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{z.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Đánh giá"
          title="Hội viên nói gì về chúng tôi"
          action={<MoreLink to="/reviews">Tất cả đánh giá</MoreLink>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.filter((r) => r.rating === 5).slice(0, 3).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <div className="mt-12 grid gap-4 rounded-lg bg-surface p-8 text-surface-foreground md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-2xl font-semibold">Ngày đầu tiên hoàn toàn miễn phí.</p>
            <p className="mt-1 text-surface-foreground/70">Tạo tài khoản để nhận ngay một ngày trải nghiệm miễn phí.</p>
          </div>
          <Button size="lg" asChild>
            <Link to="/register">Tạo tài khoản miễn phí</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
