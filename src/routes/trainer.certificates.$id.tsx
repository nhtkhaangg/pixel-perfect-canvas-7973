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
  head: () => seo("Chi tiết chứng chỉ", "Chi tiết chứng chỉ và trạng thái xét duyệt."),
  component: CertDetail,
});

const statusLabel: Record<string, string> = { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Bị từ chối" };

function CertDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = certStore.use().find((x) => x.id === id);
  if (!c) return <EmptyState title="Không tìm thấy chứng chỉ" action={<Button asChild><Link to="/trainer/certificates">Quay lại</Link></Button>} />;
  return (
    <>
      <Link to="/trainer/certificates" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Chứng chỉ</Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <DetailPanel title={c.name} description={c.issuer} fields={[
          { label: "Trạng thái", value: <StatusBadge status={toStatus(c.status)} label={statusLabel[c.status] ?? c.status} /> },
          { label: "Ngày cấp", value: c.issuedAt },
          { label: "Hết hạn", value: c.expiresAt ?? "Không hết hạn" },
          { label: "Tệp", value: c.fileName },
          ...(c.note ? [{ label: "Ghi chú của người duyệt", value: <span className="text-destructive">{c.note}</span> }] : []),
        ]} footer={
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline" className="text-destructive"><Trash2 className="size-4" /> Xóa chứng chỉ</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Xóa {c.name}?</AlertDialogTitle><AlertDialogDescription>Chứng chỉ sẽ bị gỡ khỏi hồ sơ công khai của bạn. Không thể hoàn tác.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Hủy</AlertDialogCancel><AlertDialogAction onClick={() => { certStore.remove(c.id); toast.success("Đã xóa"); navigate({ to: "/trainer/certificates" }); }}>Xóa</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        } />
        <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground">
          <FileText className="size-12" />
          <p className="mt-3 text-sm">{c.fileName}</p>
          <Button size="sm" variant="ghost" className="mt-2" onClick={() => toast("Đang tải xuống")}>Tải xuống</Button>
        </div>
      </div>
    </>
  );
}
