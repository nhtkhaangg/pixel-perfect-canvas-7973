import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { gymInfo } from "@/lib/mock/public";
import { seo } from "@/lib/seo";
import { AuthCard, isEmail } from "@/components/public/auth-card";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_public/register-trainer")({
  head: () => seo("Become a GymFit trainer", "Apply to coach at GymFit. Share your specialization, experience and certificates."),
  component: RegisterTrainerPage,
});

const specs = ["Strength & Powerlifting", "Fat Loss & Conditioning", "Mobility & Rehab", "Hypertrophy & Bodybuilding", "Endurance & Running", "Functional & Senior Fitness"];

function RegisterTrainerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", experienceYears: "", certificates: "", bio: "" });
  const [spec, setSpec] = useState("");
  const [branch, setBranch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Enter your full name";
    if (!isEmail(form.email)) errs.email = "Enter a valid email";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) errs.phone = "Enter a valid phone";
    if (!spec) errs.spec = "Choose a specialization";
    const y = Number(form.experienceYears);
    if (!(y >= 0 && y <= 50) || form.experienceYears === "") errs.experienceYears = "0–50 years";
    if (!form.certificates.trim()) errs.certificates = "List at least one certificate";
    if (form.bio.trim().length < 40) errs.bio = "Tell us a bit more (40+ characters)";
    setErrors(errs);
    if (!Object.keys(errs).length) setDone(true);
  }

  const aside = (
    <>
      <p className="text-xs font-semibold tracking-wider text-primary uppercase">Coach with us</p>
      <p className="mt-4 text-2xl font-semibold">Why trainers choose GymFit</p>
      <ul className="mt-5 space-y-3 text-sm text-surface-foreground/80">
        {["Keep up to 70% of PT package revenue", "Clients booked straight into your calendar", "Paid CPD and certification support", "Four branches to choose from"].map((b) => (
          <li key={b} className="flex gap-2"><BadgeCheck className="size-4 shrink-0 text-primary" /> {b}</li>
        ))}
      </ul>
    </>
  );

  if (done) {
    return (
      <AuthCard title="Application received" description="Our coaching lead reviews every application within 3 working days." aside={aside}>
        <div className="space-y-4 rounded-md border border-border p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status="pending" label="Under review" /></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{form.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Specialization</span><span>{spec}</span></div>
        </div>
        <Button className="mt-6 w-full" asChild><Link to="/trainers">Meet the current team</Link></Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Apply as a trainer"
      description="Tell us about your coaching. Applications are reviewed by a branch manager."
      aside={aside}
      footer={<>Joining as a member? <Link to="/register" className="font-medium text-primary">Create a member account</Link></>}
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Full name" required error={errors.name}>{(p) => <Input {...p} value={form.name} onChange={set("name")} />}</FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email" required error={errors.email}>{(p) => <Input {...p} type="email" value={form.email} onChange={set("email")} />}</FormField>
          <FormField label="Phone" required error={errors.phone}>{(p) => <Input {...p} type="tel" value={form.phone} onChange={set("phone")} />}</FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Specialization<span className="text-destructive">*</span></Label>
            <Select value={spec} onValueChange={setSpec}>
              <SelectTrigger aria-invalid={!!errors.spec}><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>{specs.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            {errors.spec ? <p className="text-xs text-destructive">{errors.spec}</p> : null}
          </div>
          <FormField label="Years of experience" required error={errors.experienceYears}>
            {(p) => <Input {...p} type="number" min={0} value={form.experienceYears} onChange={set("experienceYears")} />}
          </FormField>
        </div>
        <div className="space-y-1.5">
          <Label>Preferred branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger><SelectValue placeholder="Any branch" /></SelectTrigger>
            <SelectContent>{gymInfo.branches.map((b) => <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <FormField label="Certificates" required error={errors.certificates} hint="Comma-separated, e.g. NASM-CPT, CPR/AED">
          {(p) => <Input {...p} value={form.certificates} onChange={set("certificates")} />}
        </FormField>
        <FormField label="Short bio" required error={errors.bio}>
          {(p) => <Textarea {...p} rows={4} value={form.bio} onChange={set("bio")} placeholder="Your coaching style, who you work best with…" />}
        </FormField>
        <Button type="submit" className="w-full">Submit application</Button>
      </form>
    </AuthCard>
  );
}
