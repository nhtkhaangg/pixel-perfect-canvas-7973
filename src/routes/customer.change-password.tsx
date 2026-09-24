import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/change-password")({
  head: () => seo("Change password", "Update the password for your GymFit account."),
  component: ChangePassword,
});

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function ChangePassword() {
  const [f, setF] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const s = strength(f.next);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!f.current) errs["current"] = "Enter your current password";
    if (s < 3) errs["next"] = "Use 8+ characters with a capital letter and a number";
    if (f.next === f.current && f.next) errs["next"] = "New password must differ from current";
    if (f.confirm !== f.next) errs["confirm"] = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Password changed", { description: "Other devices have been signed out." });
    setF({ current: "", next: "", confirm: "" });
  }

  return (
    <>
      <PageHeader title="Change password" description="Choose a strong password you don't use anywhere else." />
      <form onSubmit={submit} noValidate className="max-w-md space-y-4 rounded-lg border border-border bg-card p-6">
        <FormField label="Current password" required error={errors["current"]}>
          {(p) => <Input {...p} type="password" value={f.current} onChange={(e) => setF({ ...f, current: e.target.value })} />}
        </FormField>
        <FormField label="New password" required error={errors["next"]}>
          {(p) => <Input {...p} type="password" value={f.next} onChange={(e) => setF({ ...f, next: e.target.value })} />}
        </FormField>
        <div>
          <Progress value={(s / 4) * 100} className="h-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Strength: {["Very weak", "Weak", "Fair", "Good", "Strong"][s]}</p>
        </div>
        <FormField label="Confirm new password" required error={errors["confirm"]}>
          {(p) => <Input {...p} type="password" value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} />}
        </FormField>
        <Button type="submit" className="w-full">Update password</Button>
      </form>
    </>
  );
}
