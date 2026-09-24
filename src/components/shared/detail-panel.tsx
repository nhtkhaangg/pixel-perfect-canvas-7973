import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DetailField = { label: string; value: ReactNode };

export function DetailPanel({
  title,
  description,
  fields,
  footer,
  className,
}: {
  title: string;
  description?: string;
  fields: DetailField[];
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <dl className="divide-y divide-border">
        {fields.map((field) => (
          <div key={field.label} className="grid gap-1 px-5 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="text-xs font-medium text-muted-foreground uppercase">{field.label}</dt>
            <dd className="text-sm text-card-foreground sm:col-span-2">{field.value}</dd>
          </div>
        ))}
      </dl>
      {footer ? <div className="border-t border-border px-5 py-4">{footer}</div> : null}
    </div>
  );
}
