import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { entityStore } from "@/lib/omnigym/store";
import { canonicalCustomers } from "@/lib/omnigym/data";
import { FormModal } from "@/components/shared/form-modal";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export function QuickCheckIn({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [qrPayload, setQrPayload] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!qrPayload.trim()) {
      setError("Nhập mã QR, mã hội viên hoặc số điện thoại");
      return;
    }
    setError("");
    const customer = canonicalCustomers.find(
      (c) =>
        c.customerCode === qrPayload ||
        c.phone === qrPayload ||
        qrPayload.includes(c.id) ||
        qrPayload.startsWith(c.customerCode + "-"),
    );
    if (!customer) {
      setResult("error");
      return;
    }
    entityStore.save("check-in", {
      id: crypto.randomUUID(),
      customerId: customer.id,
      checkInTime: new Date().toISOString(),
      checkOutTime: "",
      method: "MANUAL",
      status: "SUCCESS",
    });
    setResult("success");
    toast.success(`Đã check-in cho ${customer.fullName}`);
  }
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title="Check-in nhanh">
      <form className="space-y-4" onSubmit={submit}>
        <FormField label="Mã QR / mã hội viên / số điện thoại" required error={error}>
          {(p) => (
            <Input
              {...p}
              name="qrPayload"
              value={qrPayload}
              onChange={(e) => {
                setQrPayload(e.target.value);
                setResult(null);
              }}
            />
          )}
        </FormField>
        <Button type="submit" className="w-full">
          Xác nhận check-in
        </Button>
      </form>
      {result && (
        <div
          className={`mt-4 rounded-lg border p-4 ${result === "success" ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}`}
        >
          {result === "success" ? (
            <CheckCircle2 className="size-6 text-success" />
          ) : (
            <XCircle className="size-6 text-destructive" />
          )}
          <p className="mt-2 font-medium">
            {result === "success" ? "Check-in thành công" : "Không tìm thấy hội viên"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result === "success"
              ? canonicalCustomers.find(
                  (c) =>
                    c.customerCode === qrPayload ||
                    c.phone === qrPayload ||
                    qrPayload.includes(c.id),
                )?.fullName
              : "Kiểm tra lại mã và thử lại."}
          </p>
        </div>
      )}
    </FormModal>
  );
}
