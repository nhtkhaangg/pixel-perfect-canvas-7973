import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        success: "border-success/25 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/12 text-warning-foreground",
        danger: "border-destructive/25 bg-destructive/10 text-destructive",
        neutral: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const statusTone: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  active: "success",
  approved: "success",
  completed: "success",
  paid: "success",
  checked_in: "success",
  confirmed: "success",
  done: "success",
  requested: "warning",
  in_progress: "warning",
  upcoming: "warning",
  refunded: "neutral",
  missed: "danger",
  pending: "warning",
  processing: "warning",
  awaiting: "warning",
  rejected: "danger",
  failed: "danger",
  locked: "danger",
  overdue: "danger",
  draft: "neutral",
  expired: "neutral",
  cancelled: "neutral",
  inactive: "neutral",
};

const statusLabel: Record<string, string> = {
  active: "Đang hoạt động",
  approved: "Đã phê duyệt",
  completed: "Đã hoàn thành",
  paid: "Đã thanh toán",
  checked_in: "Đã check-in",
  confirmed: "Đã xác nhận",
  done: "Hoàn tất",
  requested: "Đã yêu cầu",
  in_progress: "Đang diễn ra",
  upcoming: "Sắp diễn ra",
  scheduled: "Đã lên lịch",
  refunded: "Đã hoàn tiền",
  missed: "Vắng mặt",
  pending: "Đang chờ xử lý",
  processing: "Đang xử lý",
  awaiting: "Đang chờ",
  rejected: "Đã từ chối",
  declined: "Đã từ chối",
  failed: "Thất bại",
  locked: "Đã khóa",
  overdue: "Quá hạn",
  draft: "Bản nháp",
  expired: "Đã hết hạn",
  cancelled: "Đã hủy",
  canceled: "Đã hủy",
  inactive: "Ngừng hoạt động",
  archived: "Đã lưu trữ",
  published: "Đã xuất bản",
  unread: "Chưa đọc",
  read: "Đã đọc",
  new: "Mới",
  replied: "Đã phản hồi",
  open: "Đang mở",
  closed: "Đã đóng",
  on_track: "Đúng tiến độ",
  at_risk: "Có rủi ro",
  plateau: "Chững lại",
  membership: "Gói tập",
  pt: "Gói PT",
};

export type StatusValue = keyof typeof statusTone | string;

export function StatusBadge({
  status,
  label,
  className,
  tone,
}: {
  status: StatusValue;
  label?: string;
  className?: string;
} & Partial<VariantProps<typeof statusBadgeVariants>>) {
  const resolved = tone ?? statusTone[String(status).toLowerCase()] ?? "neutral";
  const raw = label ?? String(status);
  const key = raw.trim().toLowerCase().replace(/[\s-]+/g, "_");
  const text = statusLabel[key] ?? raw.replace(/_/g, " ");

  return (
    <span className={cn(statusBadgeVariants({ tone: resolved }), className)}>
      <span className="size-1.5 rounded-full bg-current" />
      <span className="first-letter:uppercase">{text}</span>
    </span>
  );
}
