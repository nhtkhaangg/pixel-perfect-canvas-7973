import { useState } from "react";
import { toast } from "sonner";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { PageHeader } from "@/components/shared/page-header";
import { FormField } from "@/components/shared/form-field";
import { StatusBadge } from "@/components/shared/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export function SessionActions({ id, verify = false }: { id: string; verify?: boolean }) {
  const rows = useEntities("schedule");
  const session = rows.find((r) => r["id"] === id);
  const [feedback, setFeedback] = useState(String(session?.["trainer_feedback"] ?? ""));
  if (!session) return <PageHeader title="Không tìm thấy buổi tập" />;
  return (
    <>
      <PageHeader
        title={verify ? "Xác nhận buổi tập" : "Nhận xét sau buổi tập"}
        description={String(session["session_notes"])}
      />
      <StatusBadge status={String(session["status"])} />
      {verify ? (
        <Button
          onClick={() => {
            entityStore.save("schedule", {
              ...session,
              status: "COMPLETED",
              verify_method: "TRAINER",
              completed_at: new Date().toISOString(),
            });
            toast.success("Đã xác nhận hoàn thành");
          }}
        >
          Xác nhận đã hoàn thành
        </Button>
      ) : (
        <form
          className="max-w-2xl space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            entityStore.save("schedule", { ...session, trainer_feedback: feedback });
            toast.success("Đã lưu nhận xét");
          }}
        >
          <FormField label="Nhận xét huấn luyện viên">
            {(p) => (
              <Textarea
                {...p}
                name="trainer_feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            )}
          </FormField>
          <Button type="submit">Lưu nhận xét</Button>
        </form>
      )}
    </>
  );
}
