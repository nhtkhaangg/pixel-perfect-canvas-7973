import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, OAuthButtons, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/login")({
  head: () => seo("Log in", "Log in to your GymFit account to book classes, manage your membership and track progress."),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isEmail(email)) errs["email"] = "Enter a valid email address";
    if (password.length < 6) errs["password"] = "Password must be at least 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Welcome back!");
    navigate({ to: "/customer" });
  }

  return (
    <AuthCard
      title="Log in"
      description="Welcome back — pick up where you left off."
      aside={<AuthAside quote="Booking a class takes me five seconds. I haven't missed a Tuesday session in a year." author="Ben W., Downtown" />}
      footer={<>New to GymFit? <Link to="/register" className="font-medium text-primary">Create an account</Link></>}
    >
      <OAuthButtons />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Email" required error={errors["email"]}>
          {(p) => <Input {...p} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />}
        </FormField>
        <FormField label="Password" required error={errors["password"]}>
          {(p) => <Input {...p} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        </FormField>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><Checkbox /> Remember me</label>
          <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </AuthCard>
  );
}
