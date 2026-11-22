import { useState } from "react";
import { toast } from "sonner";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import { canonicalPurchased, demoCustomer, type RecordRow } from "@/lib/omnigym/data";
import { useDemoSession } from "./demo-session";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { vnd } from "@/lib/utils";
export function RefundPanel({ operations = false }: { operations?: boolean }) {
  const requests = useEntities("refunds");
  const purchased = useEntities("purchased");
  const session = useDemoSession();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<RecordRow | null>(null);
  const [cpkgId, setCpkgId] = useState(String(purchased[0]?.["id"] ?? ""));
  const [values, setValues] = useState({
    reason: "",
    proofUrl: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountHolder: "",
  });
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [bankRef, setBankRef] = useState("");
  function submit() {
    const pkg = purchased.find((p) => p["id"] === cpkgId);
    if (
      !pkg ||
      !values.reason.trim() ||
      !values.bankName.trim() ||
      !values.bankAccountNumber.trim() ||
      !values.bankAccountHolder.trim()
    ) {
      setError("Chọn gói tập và điền đầy đủ lý do, thông tin ngân hàng");
      return;
    }
    entityStore.save("refunds", {
      ...values,
      id: crypto.randomUUID(),
      refundCode: `RF-${Date.now()}`,
      cpkgId,
      customerId: demoCustomer.id,
      originalAmount: Number(pkg["actual_price"]),
      adminFeeAmount: 0,
      refundAmount: 0,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
    setOpen(false);
    toast.success("Đã gửi yêu cầu hoàn tiền");
  }
  function review(status: "APPROVED" | "REJECTED") {
    if (!selected) return;
    if (status === "REJECTED" && !note.trim()) {
      toast.error("Nhập lý do từ chối");
      return;
    }
    entityStore.save("refunds", {
      ...selected,
      status,
      ...(status === "REJECTED" ? { rejectionReason: note } : { managerNote: note }),
      managerId: "manager-1",
      reviewedAt: new Date().toISOString(),
    });
    setSelected(null);
    toast.success(status === "APPROVED" ? "Đã duyệt yêu cầu" : "Đã từ chối yêu cầu");
  }
  return (
    <>
      <PageHeader
        title="Yêu cầu hoàn tiền"
        actions={
          !operations ? (
            <Button
              onClick={() => {
                setOpen(true);
                setError("");
              }}
            >
              Gửi yêu cầu
            </Button>
          ) : undefined
        }
      />
      <DataTable
        data={requests}
        rowKey={(r) => String(r["id"])}
        columns={[
          { key: "refundCode", header: "Mã yêu cầu" },
          {
            key: "originalAmount",
            header: "Số tiền gốc",
            cell: (r) => vnd(Number(r["originalAmount"])),
          },
          {
            key: "refundAmount",
            header: "Số tiền hoàn",
            cell: (r) =>
              Number(r["refundAmount"]) > 0 ? vnd(Number(r["refundAmount"])) : "Cần xác nhận",
          },
          { key: "reason", header: "Lý do" },
          {
            key: "status",
            header: "Trạng thái",
            cell: (r) => <StatusBadge status={String(r["status"])} />,
          },
        ]}
        rowActions={[
          {
            label: "Xem chi tiết",
            onSelect: (r) => {
              setSelected(r);
              setNote("");
            },
          },
        ]}
      />
      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="Yêu cầu hoàn tiền"
        footer={<Button onClick={submit}>Gửi yêu cầu</Button>}
      >
        <Select value={cpkgId} onValueChange={setCpkgId}>
          <SelectTrigger aria-label="Gói đã mua">
            <SelectValue placeholder="Chọn gói tập" />
          </SelectTrigger>
          <SelectContent>
            {purchased.map((p) => (
              <SelectItem key={String(p["id"])} value={String(p["id"])}>
                {String(p["pkg_id"])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(
          ["reason", "proofUrl", "bankName", "bankAccountNumber", "bankAccountHolder"] as const
        ).map((key) => (
          <FormField
            key={key}
            label={
              {
                reason: "Lý do",
                proofUrl: "Đường dẫn chứng từ",
                bankName: "Tên ngân hàng",
                bankAccountNumber: "Số tài khoản",
                bankAccountHolder: "Tên chủ tài khoản",
              }[key]
            }
            required={key !== "proofUrl"}
          >
            {(p) =>
              key === "reason" ? (
                <Textarea
                  {...p}
                  name={key}
                  value={values[key]}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              ) : (
                <Input
                  {...p}
                  name={key}
                  value={values[key]}
                  maxLength={
                    key === "bankAccountNumber" ? 50 : key === "proofUrl" ? undefined : 100
                  }
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              )
            }
          </FormField>
        ))}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </FormModal>
      <FormModal
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
        title={String(selected?.["refundCode"] ?? "")}
        footer={
          operations && selected?.["status"] === "PENDING" ? (
            <>
              <Button variant="outline" onClick={() => review("REJECTED")}>
                Từ chối
              </Button>
              <Button onClick={() => review("APPROVED")}>Phê duyệt</Button>
            </>
          ) : operations && session.role === "admin" && selected?.["status"] === "APPROVED" ? (
            <Button
              disabled={!bankRef || Number(selected?.["refundAmount"]) <= 0}
              onClick={() => {
                if (!selected) return;
                entityStore.save("refunds", {
                  ...selected,
                  status: "PROCESSED",
                  bankRef,
                  processedAt: new Date().toISOString(),
                });
                setSelected(null);
                toast.success("Đã ghi nhận hoàn tiền mẫu");
              }}
            >
              Xác nhận đã hoàn tiền
            </Button>
          ) : undefined
        }
      >
        <p className="text-sm">{String(selected?.["reason"] ?? "")}</p>
        <p className="text-sm text-muted-foreground">
          {String(selected?.["bankName"] ?? "")} · {String(selected?.["bankAccountNumber"] ?? "")} ·{" "}
          {String(selected?.["bankAccountHolder"] ?? "")}
        </p>
        <p className="text-sm">
          Số tiền hoàn:{" "}
          {Number(selected?.["refundAmount"]) > 0
            ? vnd(Number(selected?.["refundAmount"]))
            : "Cần xác nhận"}
        </p>
        {operations && (
          <FormField label="Ghi chú / lý do từ chối">
            {(p) => <Textarea {...p} value={note} onChange={(e) => setNote(e.target.value)} />}
          </FormField>
        )}
        {operations && session.role === "admin" && selected?.["status"] === "APPROVED" && (
          <FormField label="Mã giao dịch ngân hàng">
            {(p) => (
              <Input
                {...p}
                name="bankRef"
                value={bankRef}
                onChange={(e) => setBankRef(e.target.value)}
              />
            )}
          </FormField>
        )}
      </FormModal>
    </>
  );
}
