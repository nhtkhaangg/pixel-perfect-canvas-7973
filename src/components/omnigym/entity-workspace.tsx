import { useState } from "react";
import { Plus, Download, Trash2, Pencil, Eye, Check, X } from "lucide-react";
import { toast } from "sonner";
import { workspaces, fieldLabels, valueLabels, type Field } from "@/lib/omnigym/workspaces";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { packageErrors, canEditExercise } from "@/lib/omnigym/contracts";
import type { RecordRow } from "@/lib/omnigym/data";
import { canonicalCustomers } from "@/lib/omnigym/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RichEditor } from "./rich-editor";
import { vnd, vnDate } from "@/lib/utils";
import { useDemoSession } from "./demo-session";
export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: RecordRow[string] | undefined;
  onChange: (v: RecordRow[string]) => void;
}) {
  if (field.type === "boolean")
    return <Switch checked={value === true} onCheckedChange={onChange} aria-label={field.label} />;
  if (field.type === "richtext")
    return <RichEditor value={String(value ?? "")} onChange={onChange} />;
  if (field.type === "select")
    return (
      <Select value={String(value ?? "")} onValueChange={onChange}>
        <SelectTrigger aria-label={field.label}>
          <SelectValue placeholder="Chọn" />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((v) => (
            <SelectItem key={v} value={v}>
              <StatusText value={v} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  if (field.type === "list")
    return (
      <Textarea
        aria-label={field.label}
        value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
    );
  if (field.type === "textarea")
    return (
      <Textarea
        aria-label={field.label}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        maxLength={field.max}
      />
    );
  return (
    <Input
      aria-label={field.label}
      name={field.key}
      type={
        field.type === "number"
          ? "number"
          : field.type === "email"
            ? "email"
            : field.type === "date"
              ? "date"
              : field.type === "password"
                ? "password"
                : "text"
      }
      value={String(value ?? "")}
      maxLength={field.max}
      step={field.type === "number" ? "any" : undefined}
      onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
    />
  );
}
function StatusText({ value }: { value: string }) {
  return (
    <>
      {valueLabels[value] ??
        (
          {
            ACTIVE: "Đang hoạt động",
            LOCKED: "Đã khóa",
            AVAILABLE: "Sẵn sàng",
            MAINT: "Bảo trì",
            DECOMMISSIONED: "Ngừng sử dụng",
            DRAFT: "Bản nháp",
            PENDING_REVIEW: "Chờ duyệt",
            PUBLISHED: "Đã xuất bản",
            ARCHIVED: "Đã lưu trữ",
          } as Record<string, string>
        )[value] ??
        value}
    </>
  );
}
export function EntityWorkspace({
  entity,
  initialMode,
  recordId,
}: {
  entity: string;
  initialMode?: "create" | "edit" | "detail";
  recordId?: string;
}) {
  const config = workspaces[entity];
  const rows = useEntities(entity);
  const session = useDemoSession();
  const existing = rows.find((r) => r["id"] === recordId);
  const makeDraft = () =>
    Object.fromEntries(
      (config?.fields ?? []).map((f) => [
        f.key,
        f.default ?? (f.type === "boolean" ? false : f.type === "list" ? [] : ""),
      ]),
    ) as RecordRow;
  const [draft, setDraft] = useState<RecordRow>(existing ?? makeDraft());
  const [mode, setMode] = useState<"create" | "edit" | "detail" | null>(initialMode ?? null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleting, setDeleting] = useState<RecordRow | null>(null);
  if (!config) return null;
  function open(row: RecordRow, action: "edit" | "detail") {
    if (
      entity === "exercises" &&
      action === "edit" &&
      !canEditExercise(session.role, row["isCustom"] === true)
    ) {
      toast.error("Chỉ chỉnh sửa bài tập tự tạo");
      return;
    }
    setDraft(row);
    setMode(action);
    setErrors({});
  }
  function save() {
    if (!config) return;
    if (
      entity === "exercises" &&
      mode === "edit" &&
      !canEditExercise(session.role, draft["isCustom"] === true)
    ) {
      toast.error("Chỉ chỉnh sửa bài tập tự tạo");
      return;
    }
    const e: Record<string, string> = {};
    for (const f of config.fields) {
      if (f.createOnly && mode !== "create") continue;
      const v = draft[f.key];
      const text = String(v ?? "").trim();
      if (f.required && !text) e[f.key] = "Vui lòng nhập thông tin";
      if (f.max && text.length > f.max) e[f.key] = `Tối đa ${f.max} ký tự`;
      if (f.type === "email" && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))
        e[f.key] = "Email không hợp lệ";
      if (f.type === "password" && text.length < 6) e[f.key] = "Tối thiểu 6 ký tự";
      if (f.type === "richtext" && !text.replace(/<[^>]*>/g, "").trim())
        e[f.key] = "Vui lòng nhập nội dung";
      if (
        ["email", "phone", "serialNumber", "staffCode", "managerCode"].includes(f.key) &&
        text &&
        rows.some((r) => r[f.key] === v && r["id"] !== draft["id"])
      )
        e[f.key] = "Thông tin này đã tồn tại";
    }
    if (entity === "packages")
      Object.assign(
        e,
        packageErrors({
          name: String(draft["name"] ?? ""),
          price: Number(draft["price"]),
          durationDays: Number(draft["durationDays"]),
          totalSessions: Number(draft["totalSessions"]),
          type: String(draft["type"]),
        }),
      );
    if (entity === "exercises" && String(draft["name"] ?? "").trim().length < 3)
      e["name"] = "Tối thiểu 3 ký tự";
    if (
      entity === "blogs" &&
      draft["thumbnailUrl"] &&
      !/^https?:\/\//.test(String(draft["thumbnailUrl"]))
    )
      e["thumbnailUrl"] = "Dùng đường dẫn HTTP hoặc HTTPS";
    setErrors(e);
    if (Object.keys(e).length) return;
    const next: RecordRow = { ...draft, id: draft["id"] ?? crypto.randomUUID() };
    delete next["password"];
    if (entity === "blogs" && mode === "create") {
      next["slug"] = String(next["title"])
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      next["authorId"] = "admin-1";
      next["createdAt"] = new Date().toISOString();
    }
    if (entity === "exercises" && mode === "create") next["isCustom"] = session.role === "trainer";
    entityStore.save(entity, next);
    setMode(null);
    toast.success("Đã lưu thay đổi");
  }
  const label = (key: string) =>
    config.fields.find((f) => f.key === key)?.label ?? fieldLabels[key] ?? key;
  const display = (key: string, value: RecordRow[string] | undefined) => {
    if (value === undefined || value === "") return "—";
    if (key === "price" || key === "amount") return vnd(Number(value));
    if (key === "status" || key === "approval_status")
      return <StatusBadge status={String(value)} />;
    if (typeof value === "boolean") return value ? "Có" : "Không";
    if (Array.isArray(value)) return value.join(", ");
    if (key === "customerId" || key === "cus_id")
      return canonicalCustomers.find((c) => c.id === value)?.fullName ?? String(value);
    return valueLabels[String(value)] ?? vnDate(String(value));
  };
  function exportCsv() {
    if (!config) return;
    const keys = config.columns;
    const csv =
      "\uFEFF" +
      [keys.map(label), ...rows.map((r) => keys.map((k) => String(r[k] ?? "")))]
        .map((row) => row.map((c) => '"' + c.replace(/"/g, '""') + '"').join(","))
        .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `omnigym-${entity}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="size-4" />
              Xuất dữ liệu
            </Button>
            {config.editable && (
              <Button
                onClick={() => {
                  setDraft(makeDraft());
                  setMode("create");
                  setErrors({});
                }}
              >
                <Plus className="size-4" />
                Thêm mới
              </Button>
            )}
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Tổng số" value={rows.length} />
        <StatCard
          label={entity === "trainers" ? "Đã phê duyệt" : "Đang hoạt động"}
          value={
            rows.filter(
              (r) =>
                r["isActive"] === true ||
                ["ACTIVE", "AVAILABLE", "APPROVED", "PAID", "PUBLISHED", "SUCCESS"].includes(
                  String(r[config.statusKey ?? "status"]),
                ),
            ).length
          }
        />
        <StatCard
          label="Đang chờ xử lý"
          value={
            rows.filter((r) =>
              ["PENDING", "PENDING_REVIEW", "MAINT"].includes(
                String(r[config.statusKey ?? "status"]),
              ),
            ).length
          }
        />
      </div>
      <DataTable
        data={rows}
        rowKey={(r) => String(r["id"])}
        searchPlaceholder={`Tìm ${config.title.toLowerCase()}…`}
        columns={config.columns.map((key) => ({
          key,
          header: label(key),
          sortable: true,
          cell: (row: RecordRow) => (
            <span className="block max-w-72 truncate" title={String(row[key] ?? "")}>
              {display(key, row[key])}
            </span>
          ),
        }))}
        filters={
          config.statusKey
            ? [
                {
                  key: config.statusKey,
                  label: "Trạng thái",
                  options: [
                    ...new Set(rows.map((r) => String(r[config.statusKey ?? "status"]))),
                  ].map((v) => ({ value: v, label: v })),
                },
              ]
            : []
        }
        filterValue={(r, k) => String(r[k])}
        rowActions={[
          { label: "Xem chi tiết", onSelect: (r) => open(r, "detail") },
          ...(config.editable
            ? [
                { label: "Chỉnh sửa", onSelect: (r: RecordRow) => open(r, "edit") },
                { label: "Xóa", destructive: true, onSelect: (r: RecordRow) => setDeleting(r) },
              ]
            : []),
        ]}
      />
      <FormModal
        open={mode !== null}
        onOpenChange={(v) => !v && setMode(null)}
        title={`${mode === "detail" ? "Chi tiết" : mode === "create" ? "Thêm" : "Chỉnh sửa"} ${config.title.toLowerCase()}`}
        footer={
          mode === "detail" ? (
            entity === "trainers" ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    entityStore.save(entity, { ...draft, approval_status: "REJECTED" });
                    setMode(null);
                    toast.success("Đã từ chối hồ sơ");
                  }}
                >
                  <X className="size-4" />
                  Từ chối
                </Button>
                <Button
                  onClick={() => {
                    entityStore.save(entity, { ...draft, approval_status: "APPROVED" });
                    if (draft["id"] === session.trainerId) session.setApproval("APPROVED");
                    setMode(null);
                    toast.success("Đã phê duyệt hồ sơ");
                  }}
                >
                  <Check className="size-4" />
                  Phê duyệt
                </Button>
              </>
            ) : undefined
          ) : (
            <Button onClick={save}>Lưu thay đổi</Button>
          )
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {config.fields
            .filter((f) => !f.createOnly || mode === "create")
            .map((f) => (
              <div
                key={f.key}
                className={
                  ["richtext", "textarea", "list"].includes(f.type ?? "") ? "sm:col-span-2" : ""
                }
              >
                {mode === "detail" ? (
                  <div>
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="mt-1 break-words text-sm">
                      {f.type === "richtext"
                        ? String(draft[f.key] ?? "").replace(/<[^>]*>/g, "")
                        : display(f.key, draft[f.key])}
                    </p>
                  </div>
                ) : (
                  <FormField label={f.label} required={Boolean(f.required)} error={errors[f.key]}>
                    {() => (
                      <FieldInput
                        field={f}
                        value={draft[f.key]}
                        onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                      />
                    )}
                  </FormField>
                )}
              </div>
            ))}
        </div>
      </FormModal>
      <FormModal
        open={deleting !== null}
        onOpenChange={(v) => !v && setDeleting(null)}
        title="Xóa bản ghi"
        description="Thao tác này sẽ xóa bản ghi khỏi danh sách hiện tại."
        footer={
          <Button
            variant="destructive"
            onClick={() => {
              if (!deleting) return;
              entityStore.remove(entity, String(deleting["id"]));
              setDeleting(null);
              toast.success("Đã xóa");
            }}
          >
            <Trash2 className="size-4" />
            Xóa
          </Button>
        }
      >
        <p className="text-sm text-muted-foreground">
          {String(deleting?.["name"] ?? deleting?.["title"] ?? deleting?.["fullName"] ?? "")}
        </p>
      </FormModal>
    </div>
  );
}
