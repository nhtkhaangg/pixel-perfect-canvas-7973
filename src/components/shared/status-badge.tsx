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
  const text = label ?? String(status).replace(/_/g, " ");

  return (
    <span className={cn(statusBadgeVariants({ tone: resolved }), className)}>
      <span className="size-1.5 rounded-full bg-current" />
      <span className="capitalize">{text}</span>
    </span>
  );
}
