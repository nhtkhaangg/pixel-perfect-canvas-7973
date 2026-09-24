import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { AuthAside, AuthCard, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_public/forgot-password")({
  head: () => seo("Reset your password", "Request a password reset link for your GymFit account."),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  return (
    <AuthCard
      title={sent ? "Check your inbox" : "Forgot password"}
      description={sent ? `We sent a reset link to ${email}. It expires in 30 minutes.` : "Enter your email and we'll send you a reset link."}
      aside={<AuthAside quote="The staff sorted my account in minutes. Genuinely the friendliest gym I've been to." author="Emily R., Downtown" />}
      footer={<>Remembered it? <Link to="/login" className="font-medium text-primary">Back to log in</Link></>}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground"><MailCheck className="size-6" /></span>
          <Button variant="outline" onClick={() => setSent(false)}>Use a different email</Button>
        </div>
      ) : (
        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isEmail(email)) return setError("Enter a valid email address");
            setError(undefined);
            setSent(true);
          }}
        >
          <FormField label="Email" required error={error}>
            {(p) => <Input {...p} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />}
          </FormField>
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthCard>
  );
}
