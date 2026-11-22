import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Search } from "lucide-react";
import { useEntities } from "@/lib/omnigym/store";
import { canonicalExercises, canonicalBlogs } from "@/lib/omnigym/data";
import { imageFor } from "@/lib/images";
import { PageHeader } from "@/components/shared/page-header";
import { FormModal } from "@/components/shared/form-modal";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { valueLabels } from "@/lib/omnigym/workspaces";
export function ExerciseLibrary() {
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [selected, setSelected] = useState<(typeof canonicalExercises)[number] | null>(null);
  const rows = canonicalExercises.filter(
    (e) =>
      e.name.toLowerCase().includes(q.toLowerCase()) &&
      (muscle === "all" || e.muscle_group === muscle),
  );
  return (
    <>
      <PageHeader title="Thư viện bài tập" />
      <div className="flex flex-wrap gap-3">
        <Input
          className="max-w-sm"
          aria-label="Tìm bài tập"
          placeholder="Tìm bài tập…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {["all", ...new Set(canonicalExercises.map((e) => e.muscle_group))].map((v) => (
          <Button
            key={v}
            size="sm"
            variant={muscle === v ? "default" : "outline"}
            onClick={() => setMuscle(v)}
          >
            {v === "all" ? "Tất cả" : v}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((e) => (
          <Button
            key={e.id}
            variant="ghost"
            className="block h-auto overflow-hidden rounded-xl border border-border bg-card p-0 text-left whitespace-normal"
            onClick={() => setSelected(e)}
          >
            <div className="relative aspect-video">
              <img src={imageFor(e.id)} alt={e.name} className="size-full object-cover" />
              <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-4" />
              </span>
            </div>
            <div className="p-4">
              <p className="font-semibold">{e.name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{e.muscle_group}</Badge>
                <Badge variant="outline">{e.level}</Badge>
              </div>
            </div>
          </Button>
        ))}
      </div>
      {!rows.length && <EmptyState title="Không tìm thấy bài tập" />}
      <FormModal
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
        title={selected?.name ?? ""}
      >
        <p className="text-sm text-muted-foreground">
          {selected?.equipment} · {selected?.level}
        </p>
        <img
          src={imageFor(selected?.id ?? "")}
          alt={selected?.name ?? ""}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-sm leading-6">{selected?.instruction}</p>
        {selected?.videoUrl ? (
          <video controls src={selected.videoUrl} className="w-full" />
        ) : (
          <p className="text-xs text-muted-foreground">Chưa có video hướng dẫn.</p>
        )}
      </FormModal>
    </>
  );
}
export function BlogList() {
  const rows = useEntities("blogs");
  const [category, setCategory] = useState("ALL");
  const list = rows.filter(
    (r) => r["status"] === "PUBLISHED" && (category === "ALL" || r["category"] === category),
  );
  return (
    <>
      <PageHeader
        title="Blog thể hình"
        description="Kiến thức tập luyện, dinh dưỡng và phục hồi."
      />
      <div className="flex flex-wrap gap-2">
        {["ALL", "NUTRITION", "WORKOUT", "RECOVERY", "MINDSET"].map((c) => (
          <Button
            key={c}
            size="sm"
            variant={category === c ? "default" : "outline"}
            onClick={() => setCategory(c)}
          >
            {c === "ALL" ? "Tất cả" : valueLabels[c]}
          </Button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <Link
            key={String(a["id"])}
            to="/blog/$slug"
            params={{ slug: String(a["slug"]) }}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
          >
            <img
              src={imageFor(String(a["id"]))}
              alt={String(a["title"])}
              className="aspect-video w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-medium text-primary">
                {valueLabels[String(a["category"])]}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{String(a["title"])}</h2>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {String(a["summary"])}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {!list.length && <EmptyState title="Chưa có bài viết" />}
    </>
  );
}
export function BlogDetail({ slug }: { slug: string }) {
  const rows = useEntities("blogs");
  const a = rows.find((r) => r["slug"] === slug && r["status"] === "PUBLISHED");
  if (!a) return <EmptyState title="Không tìm thấy bài viết" />;
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-4 text-sm font-medium text-primary">{valueLabels[String(a["category"])]}</p>
      <h1 className="text-3xl font-bold leading-tight">{String(a["title"])}</h1>
      <img
        src={imageFor(String(a["id"]))}
        alt={String(a["title"])}
        className="my-7 aspect-video w-full rounded-xl object-cover"
      />
      <p className="mb-7 text-lg text-muted-foreground">{String(a["summary"])}</p>
      <div className="space-y-5 text-base leading-8">
        {String(a["content"])
          .split(/<\/p>/)
          .map((p, i) => p.replace(/<[^>]*>/g, "").trim())
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>
      <Button variant="outline" asChild className="mt-8">
        <Link to="/blog">Tất cả bài viết</Link>
      </Button>
    </article>
  );
}
