import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Trash2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { plansStore, usePlans, type Plan } from "@/lib/omnigym/plans";
import { canonicalCustomers, canonicalExercises } from "@/lib/omnigym/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
const empty: Plan = {
  id: "",
  plan_name: "",
  goal: "",
  durationWeeks: 4,
  cus_id: "",
  plan_type: "TEMPLATE",
  status: "DRAFT",
  is_ai_generated: false,
  version: 1,
  details: [],
};
export function PlanWorkspace({
  mode = "list",
  id,
  customerId,
}: {
  mode?: "list" | "create" | "edit" | "detail" | "versions" | "publish" | "ai";
  id?: string;
  customerId?: string;
}) {
  const plans = usePlans();
  const existing = plans.find((p) => p.id === id);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Plan>(
    existing ?? { ...empty, cus_id: customerId ?? "", is_ai_generated: mode === "ai" },
  );
  const [error, setError] = useState("");
  const select = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    options: { id: string; label: string }[],
  ) => (
    <div className="space-y-2">
      <p className="text-xs font-medium">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue placeholder="Chọn" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  if (mode === "list")
    return (
      <>
        <PageHeader
          title="Giáo án tập luyện"
          description="Giáo án mẫu, giáo án học viên và lịch sử phiên bản."
          actions={
            <Button asChild>
              <Link to="/trainer/lesson-plans/create">
                <Plus className="size-4" />
                Tạo giáo án
              </Link>
            </Button>
          }
        />
        <DataTable
          data={plans}
          rowKey={(p) => p.id}
          columns={[
            { key: "plan_name", header: "Giáo án" },
            { key: "goal", header: "Mục tiêu" },
            { key: "durationWeeks", header: "Số tuần" },
            { key: "version", header: "Phiên bản" },
            {
              key: "is_ai_generated",
              header: "Nguồn",
              cell: (p) => (p.is_ai_generated ? "AI" : "Huấn luyện viên"),
            },
            { key: "status", header: "Trạng thái", cell: (p) => <StatusBadge status={p.status} /> },
          ]}
          rowActions={[
            {
              label: "Xem chi tiết",
              onSelect: (p) => navigate({ to: "/trainer/lesson-plans/$id", params: { id: p.id } }),
            },
            {
              label: "Chỉnh sửa",
              onSelect: (p) =>
                navigate({ to: "/trainer/lesson-plans/$id/edit", params: { id: p.id } }),
            },
          ]}
        />
      </>
    );
  if ((mode === "detail" || mode === "versions" || mode === "publish") && !existing)
    return <PageHeader title="Không tìm thấy giáo án" />;
  if (mode === "versions")
    return (
      <>
        <PageHeader title={`Phiên bản · ${existing?.plan_name}`} />
        <DataTable
          data={[
            {
              version: existing?.version ?? 1,
              status: existing?.status ?? "DRAFT",
              plan_name: existing?.plan_name ?? "",
            },
          ]}
          rowKey={(r) => String(r.version)}
          columns={[
            { key: "version", header: "Phiên bản" },
            { key: "plan_name", header: "Giáo án" },
            { key: "status", header: "Trạng thái", cell: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
      </>
    );
  if (mode === "detail" || mode === "publish")
    return (
      <>
        <PageHeader
          title={existing?.plan_name ?? ""}
          description={existing?.goal ?? ""}
          actions={
            <>
              <Button variant="outline" asChild>
                <Link to="/trainer/lesson-plans/$id/edit" params={{ id: id ?? "" }}>
                  Chỉnh sửa
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/trainer/lesson-plans/$id/versions" params={{ id: id ?? "" }}>
                  Phiên bản
                </Link>
              </Button>
              <Button
                onClick={() => {
                  if (!id) return;
                  plansStore.activate(id);
                  toast.success("Đã kích hoạt giáo án");
                }}
              >
                <Check className="size-4" />
                Xuất bản & kích hoạt
              </Button>
            </>
          }
        />
        <div className="flex flex-wrap gap-4 text-sm">
          <StatusBadge status={existing?.status ?? "DRAFT"} />
          <span>{existing?.durationWeeks} tuần</span>
          <span>Phiên bản {existing?.version}</span>
        </div>
        <DataTable
          data={existing?.details ?? []}
          rowKey={(r) => `${r.day_of_week}-${r.ex_id}`}
          columns={[
            { key: "day_of_week", header: "Ngày trong tuần" },
            {
              key: "ex_id",
              header: "Bài tập",
              cell: (r) => canonicalExercises.find((e) => e.id === r.ex_id)?.name,
            },
            { key: "target_sets", header: "Hiệp" },
            { key: "target_reps", header: "Số lần" },
            { key: "target_weight_kg", header: "Mức tạ (kg)" },
            { key: "rest_seconds", header: "Nghỉ (giây)" },
          ]}
        />
      </>
    );
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (
      !draft.plan_name.trim() ||
      draft.plan_name.length > 100 ||
      !draft.goal.trim() ||
      draft.goal.length > 100 ||
      !Number.isInteger(draft.durationWeeks) ||
      draft.durationWeeks < 1 ||
      !draft.details.length ||
      draft.details.some((d) => d.target_sets < 1 || !d.target_reps || d.target_reps.length > 20)
    ) {
      setError("Kiểm tra tên, mục tiêu, số tuần và thêm ít nhất một bài tập hợp lệ.");
      return;
    }
    const saved = {
      ...draft,
      id: draft.id || crypto.randomUUID(),
      version: mode === "edit" ? draft.version + 1 : 1,
    };
    plansStore.save(saved);
    toast.success("Đã lưu giáo án");
    navigate({ to: "/trainer/lesson-plans/$id", params: { id: saved.id } });
  }
  return (
    <>
      <PageHeader
        title={
          mode === "ai" ? "Gợi ý giáo án AI" : mode === "edit" ? "Chỉnh sửa giáo án" : "Tạo giáo án"
        }
        actions={
          mode === "ai" ? (
            <Button
              onClick={() => {
                setDraft({
                  ...draft,
                  plan_name: "Giảm mỡ & tăng sức mạnh",
                  goal: "FAT_LOSS",
                  durationWeeks: 4,
                  is_ai_generated: true,
                  details: [
                    {
                      day_of_week: 1,
                      ex_id: "ex_2",
                      target_sets: 3,
                      target_reps: "10",
                      target_weight_kg: 40,
                      rest_seconds: 60,
                    },
                  ],
                });
                toast.info("Đã tạo gợi ý mẫu");
              }}
            >
              <Sparkles className="size-4" />
              Tạo gợi ý
            </Button>
          ) : undefined
        }
      />
      <form className="space-y-6" onSubmit={save}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Tên giáo án" required>
            {(p) => (
              <Input
                {...p}
                name="plan_name"
                value={draft.plan_name}
                maxLength={100}
                onChange={(e) => setDraft({ ...draft, plan_name: e.target.value })}
              />
            )}
          </FormField>
          <FormField label="Mục tiêu" required>
            {(p) => (
              <Input
                {...p}
                name="goal"
                value={draft.goal}
                maxLength={100}
                onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
              />
            )}
          </FormField>
          <FormField label="Số tuần" required>
            {(p) => (
              <Input
                {...p}
                name="durationWeeks"
                type="number"
                value={draft.durationWeeks}
                onChange={(e) => setDraft({ ...draft, durationWeeks: Number(e.target.value) })}
              />
            )}
          </FormField>
          {select(
            "Học viên",
            draft.cus_id || "template",
            (v) => setDraft({ ...draft, cus_id: v === "template" ? "" : v }),
            [
              { id: "template", label: "Giáo án mẫu" },
              ...canonicalCustomers.map((c) => ({ id: c.id, label: c.fullName })),
            ],
          )}
        </div>
        <div className="space-y-4">
          {draft.details.map((d, index) => (
            <div
              key={index}
              className="grid gap-3 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-6"
            >
              {select(
                "Ngày",
                String(d.day_of_week),
                (v) =>
                  setDraft({
                    ...draft,
                    details: draft.details.map((x, i) =>
                      i === index ? { ...x, day_of_week: Number(v) } : x,
                    ),
                  }),
                [1, 2, 3, 4, 5, 6, 7].map((v) => ({
                  id: String(v),
                  label: v === 7 ? "Chủ nhật" : `Thứ ${v + 1}`,
                })),
              )}
              {select(
                "Bài tập",
                d.ex_id,
                (v) =>
                  setDraft({
                    ...draft,
                    details: draft.details.map((x, i) => (i === index ? { ...x, ex_id: v } : x)),
                  }),
                canonicalExercises.map((e) => ({ id: e.id, label: e.name })),
              )}
              {(["target_sets", "target_reps", "target_weight_kg", "rest_seconds"] as const).map(
                (key) => (
                  <FormField
                    key={key}
                    label={
                      {
                        target_sets: "Số hiệp",
                        target_reps: "Số lần",
                        target_weight_kg: "Mức tạ (kg)",
                        rest_seconds: "Nghỉ (giây)",
                      }[key]
                    }
                  >
                    {(p) => (
                      <Input
                        {...p}
                        name={key}
                        type={key === "target_reps" ? "text" : "number"}
                        value={d[key]}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            details: draft.details.map((x, i) =>
                              i === index
                                ? {
                                    ...x,
                                    [key]:
                                      key === "target_reps"
                                        ? e.target.value
                                        : Number(e.target.value),
                                  }
                                : x,
                            ),
                          })
                        }
                      />
                    )}
                  </FormField>
                ),
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Xóa bài tập"
                onClick={() =>
                  setDraft({ ...draft, details: draft.details.filter((_, i) => i !== index) })
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setDraft({
              ...draft,
              details: [
                ...draft.details,
                {
                  day_of_week: 1,
                  ex_id: "ex_1",
                  target_sets: 3,
                  target_reps: "10",
                  target_weight_kg: 0,
                  rest_seconds: 60,
                },
              ],
            })
          }
        >
          <Plus className="size-4" />
          Thêm bài tập
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="border-t border-border pt-5">
          <Button type="submit">Lưu giáo án</Button>
        </div>
      </form>
    </>
  );
}
