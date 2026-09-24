import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, OAuthButtons, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/register")({
  head: () => seo("Create your account", "Join GymFit in under a minute and get a free day pass at any of our four branches."),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs["name"] = "Enter your full name";
    if (!isEmail(form.email)) errs["email"] = "Enter a valid email address";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) errs["phone"] = "Enter a valid phone number";
    if (form.password.length < 8) errs["password"] = "Use at least 8 characters";
    if (form.confirm !== form.password) errs["confirm"] = "Passwords don't match";
    if (!agree) errs["agree"] = "You must accept the terms";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Account created", { description: "Your free day pass is in your member area." });
    navigate({ to: "/customer" });
  }

  return (
    <AuthCard
      title="Create your account"
      description="Free to join — pick a package whenever you're ready."
      aside={<AuthAside quote="Signed up on a Monday, had my first PT session on Wednesday. Down 7 kg three months later." author="James K., Riverside" />}
      footer={<>Already a member? <Link to="/login" className="font-medium text-primary">Log in</Link> · <Link to="/register-trainer" className="font-medium text-primary">Apply as a trainer</Link></>}
    >
      <OAuthButtons />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Full name" required error={errors["name"]}>
          {(p) => <Input {...p} value={form.name} onChange={set("name")} placeholder="Alex Morgan" />}
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email" required error={errors["email"]}>
            {(p) => <Input {...p} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />}
          </FormField>
          <FormField label="Phone" required error={errors["phone"]}>
            {(p) => <Input {...p} type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 415 555 0100" />}
          </FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Password" required error={errors["password"]} hint="At least 8 characters">
            {(p) => <Input {...p} type="password" value={form.password} onChange={set("password")} />}
          </FormField>
          <FormField label="Confirm password" required error={errors["confirm"]}>
            {(p) => <Input {...p} type="password" value={form.confirm} onChange={set("confirm")} />}
          </FormField>
        </div>
        <div>
          <label className="flex items-start gap-2 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
            I agree to the membership terms and privacy policy
          </label>
          {errors["agree"] ? <p className="mt-1 text-xs text-destructive">{errors["agree"]}</p> : null}
        </div>
        <Button type="submit" className="w-full">Create account</Button>
      </form>
    </AuthCard>
  );
}
