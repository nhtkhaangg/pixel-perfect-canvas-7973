import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { me } from "@/lib/mock/customer";
import { PageHeader } from "@/components/shared/page-header";
import { DetailPanel } from "@/components/shared/detail-panel";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/profile")({
  head: () => seo("My profile", "View and edit your GymFit member profile."),
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState(me);
  const [draft, setDraft] = useState(me);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  function save() {
    if (draft.name.trim().length < 2) return setError("Name is required");
    setProfile(draft);
    setOpen(false);
    toast.success("Profile updated");
  }

  const field = (k: "name" | "phone" | "address" | "emergencyContact" | "goal", label: string) => (
    <FormField label={label} error={k === "name" ? error : undefined}>
      {(p) => <Input {...p} value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />}
    </FormField>
  );

  return (
    <>
      <PageHeader
        title="My profile"
        description="Personal details used by trainers and front-desk staff."
        actions={<><Button variant="outline" asChild><Link to="/customer/change-password">Change password</Link></Button><Button onClick={() => { setDraft(profile); setError(undefined); setOpen(true); }}>Edit profile</Button></>}
      />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="h-fit rounded-lg border border-border bg-card p-6 text-center">
          <Avatar className="mx-auto size-20"><AvatarFallback className="bg-accent text-xl font-semibold text-accent-foreground">AM</AvatarFallback></Avatar>
          <p className="mt-4 text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-3 flex justify-center"><StatusBadge status="active" label="Active member" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-left text-sm">
            <div><p className="text-xs text-muted-foreground">Member ID</p><p className="font-medium">{profile.id}</p></div>
            <div><p className="text-xs text-muted-foreground">Since</p><p className="font-medium">{profile.memberSince}</p></div>
            <div><p className="text-xs text-muted-foreground">Branch</p><p className="font-medium">{profile.homeBranch}</p></div>
            <div><p className="text-xs text-muted-foreground">Coach</p><p className="font-medium">{profile.trainerName}</p></div>
          </div>
        </div>
        <div className="space-y-6">
          <DetailPanel title="Personal information" fields={[
            { label: "Full name", value: profile.name },
            { label: "Email", value: profile.email },
            { label: "Phone", value: profile.phone },
            { label: "Date of birth", value: profile.dob },
            { label: "Gender", value: profile.gender },
            { label: "Address", value: profile.address },
          ]} />
          <DetailPanel title="Training" fields={[
            { label: "Goal", value: profile.goal },
            { label: "Emergency contact", value: profile.emergencyContact },
          ]} />
        </div>
      </div>
      <FormModal open={open} onOpenChange={setOpen} variant="drawer" title="Edit profile" description="Email changes require contacting the front desk." footer={<Button onClick={save} className="w-full">Save changes</Button>}>
        <div className="space-y-4">
          {field("name", "Full name")}
          {field("phone", "Phone")}
          {field("address", "Address")}
          {field("goal", "Training goal")}
          {field("emergencyContact", "Emergency contact")}
        </div>
      </FormModal>
    </>
  );
}
