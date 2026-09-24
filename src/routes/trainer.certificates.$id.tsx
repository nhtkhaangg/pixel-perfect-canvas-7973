import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { certStore } from "@/lib/trainer-stores";
import { toStatus } from "@/lib/mock/customer";
import { DetailPanel } from "@/components/shared/detail-panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/trainer/certificates/$id")({
  head: () => seo("Certificate detail", "Certificate details and review status."),
  component: CertDetail,
});

function CertDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = certStore.use().find((x) => x.id === id);
  if (!c) return <EmptyState title="Certificate not found" action={<Button asChild><Link to="/trainer/certificates">Back</Link></Button>} />;
  return (
    <>
      <Link to="/trainer/certificates" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Certificates</Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <DetailPanel title={c.name} description={c.issuer} fields={[
          { label: "Status", value: <StatusBadge status={toStatus(c.status)} label={c.status} /> },
          { label: "Issued", value: c.issuedAt },
          { label: "Expires", value: c.expiresAt ?? "No expiry" },
          { label: "File", value: c.fileName },
          ...(c.note ? [{ label: "Reviewer note", value: <span className="text-destructive">{c.note}</span> }] : []),
        ]} footer={
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline" className="text-destructive"><Trash2 className="size-4" /> Delete certificate</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Delete {c.name}?</AlertDialogTitle><AlertDialogDescription>It will be removed from your public profile. This can't be undone.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => { certStore.remove(c.id); toast.success("Deleted"); navigate({ to: "/trainer/certificates" }); }}>Delete</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        } />
        <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground">
          <FileText className="size-12" />
          <p className="mt-3 text-sm">{c.fileName}</p>
          <Button size="sm" variant="ghost" className="mt-2" onClick={() => toast("Download started")}>Download</Button>
        </div>
      </div>
    </>
  );
}
