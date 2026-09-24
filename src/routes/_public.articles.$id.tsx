import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { articles, articleCategoryLabels, formatDate, trainers } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { imageFor } from "@/lib/images";
import { ArticleCard, Avatar } from "@/components/public/cards";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/articles/$id")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.article.title, loaderData.article.excerpt)
      : { meta: [{ title: "Không tìm thấy bài viết — GymFit" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: ArticleNotFound,
  component: ArticleDetail,
});

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState title="Không tìm thấy bài viết" action={<Button asChild><Link to="/articles">Tất cả bài viết</Link></Button>} />
    </div>
  );
}

function ArticleDetail() {
  const { article } = Route.useLoaderData();
  const coach = trainers.find((t) => t.name === article.author);
  const more = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-6">
        <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Tất cả bài viết
        </Link>
        <img
          src={imageFor(article.id)}
          alt={article.title}
          loading="lazy"
          width={768}
          height={280}
          className="mt-6 h-56 w-full rounded-lg object-cover"
        />
        <Badge className="mt-6">{articleCategoryLabels[article.category]}</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{article.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 border-y border-border py-4 text-sm">
          <Avatar name={article.author} />
          <div className="flex-1">
            <p className="font-medium">{article.author}</p>
            <p className="text-muted-foreground">{formatDate(article.date)}</p>
          </div>
          <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-4" /> {article.readMinutes} phút đọc</span>
        </div>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {coach ? (
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-lg bg-surface p-6 text-surface-foreground">
            <Avatar name={coach.name} size="lg" />
            <div className="flex-1">
              <p className="font-semibold">Tập luyện cùng {coach.name}</p>
              <p className="text-sm text-surface-foreground/70">{coach.specialization} · {coach.experienceYears} năm kinh nghiệm</p>
            </div>
            <Button asChild><Link to="/trainers/$id" params={{ id: coach.id }}>Xem hồ sơ</Link></Button>
          </div>
        ) : null}
      </article>
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6">
          <h2 className="mb-6 text-xl font-semibold">Đọc thêm</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {more.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
