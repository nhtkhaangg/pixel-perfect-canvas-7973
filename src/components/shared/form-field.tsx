import { useId, type ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FieldState = "default" | "error" | "success";

/**
 * Wraps any input control with label, helper text and visual validation state.
 * Pass the state class down via the render prop so controls stay framework-agnostic.
 */
export function FormField({
  label,
  hint,
  error,
  success,
  required,
  state,
  children,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  success?: string | undefined;
  required?: boolean;
  state?: FieldState;
  children: (props: { id: string; className: string; "aria-invalid": boolean }) => ReactNode;
}) {
  const id = useId();
  const resolved: FieldState = state ?? (error ? "error" : success ? "success" : "default");

  const controlClass = cn(
    resolved === "error" && "border-destructive focus-visible:ring-destructive/40",
    resolved === "success" && "border-success focus-visible:ring-success/40",
  );

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive">*</span> : null}
      </Label>
      {children({ id, className: controlClass, "aria-invalid": resolved === "error" })}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      ) : success ? (
        <p className="flex items-center gap-1.5 text-xs text-success">
          <CheckCircle2 className="size-3.5" />
          {success}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
