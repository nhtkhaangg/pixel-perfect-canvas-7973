import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, XCircle, CreditCard, QrCode } from "lucide-react";
import { entityStore, useEntities } from "@/lib/omnigym/store";
import {
  canonicalPackages,
  canonicalTrainers,
  demoCustomer,
  type RecordRow,
} from "@/lib/omnigym/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { vnd } from "@/lib/utils";
export function PaymentPage({
  packageId,
  result,
}: {
  packageId?: string;
  result?: "success" | "cancel";
}) {
  const checkout = useEntities("checkout");
  const navigate = useNavigate();
  const [id, setId] = useState(packageId ?? "pt-transform-24");
  const [trainerId, setTrainerId] = useState("maya-nguyen");
  const [method, setMethod] = useState("PAYOS");
  const [pending, setPending] = useState(false);
  const pkg = canonicalPackages.find((p) => p.id === id);
  const transaction = checkout.at(-1);
  if (result)
    return (
      <div className="mx-auto max-w-xl py-12">
        <div className="text-center">
          {result === "success" ? (
            <CheckCircle2 className="mx-auto size-12 text-success" />
          ) : (
            <XCircle className="mx-auto size-12 text-warning" />
          )}
          <h1 className="mt-5 text-2xl font-semibold">
            {result === "success"
              ? transaction?.["status"] === "PAID"
                ? "Thanh toán thành công"
                : "Chưa có giao dịch đã thanh toán"
              : "Đã hủy thanh toán"}
          </h1>
        </div>
        {transaction && (
          <dl className="mt-8 divide-y divide-border text-sm">
            {[
              ["invoice_code", "Mã hóa đơn"],
              ["amount", "Số tiền"],
              ["payment_method", "Phương thức"],
              ["status", "Trạng thái"],
            ].map(
              ([key, label]) =>
                key && (
                  <div key={key} className="flex justify-between py-4">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd>
                      {key === "amount" ? (
                        vnd(Number(transaction[key]))
                      ) : key === "status" ? (
                        <StatusBadge status={String(transaction[key])} />
                      ) : (
                        String(transaction[key])
                      )}
                    </dd>
                  </div>
                ),
            )}
          </dl>
        )}
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to={result === "success" ? "/transaction-history" : "/payment/checkout"}>
              {result === "success" ? "Xem gói đã mua" : "Thử lại"}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  if (!pkg) return <PageHeader title="Không tìm thấy gói tập" />;
  function prepare() {
    if (!pkg) return;
    const row: RecordRow = {
      id: crypto.randomUUID(),
      pay_id: crypto.randomUUID(),
      cpkg_id: crypto.randomUUID(),
      invoice_code: `OG-${Date.now()}`,
      amount: pkg.price,
      payment_method: method,
      status: "PENDING",
      transaction_ref: "",
      refund_reason: "",
      payment_time: new Date().toISOString(),
    };
    entityStore.save("checkout", row);
    setPending(true);
  }
  function confirm() {
    if (!pkg || !transaction) return;
    const paid = { ...transaction, status: method === "CASH" ? "PENDING" : "PAID" };
    entityStore.save("checkout", paid);
    entityStore.save("payments", paid);
    entityStore.save("purchased", {
      id: String(transaction["cpkg_id"]),
      cpkg_id: String(transaction["cpkg_id"]),
      cus_id: demoCustomer.id,
      pkg_id: pkg.id,
      trn_id: pkg.type === "PT" ? trainerId : "",
      actual_price: pkg.price,
      start_date: "2026-11-22",
      end_date: new Date(new Date("2026-11-22").getTime() + pkg.durationDays * 86400000)
        .toISOString()
        .slice(0, 10),
      total_sessions: pkg.totalSessions,
      remaining_sessions: pkg.totalSessions,
      status: method === "CASH" ? "PENDING" : "ACTIVE",
    });
    navigate({ to: "/payment/success" });
  }
  return (
    <>
      <PageHeader title="Thanh toán gói tập" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {!pending ? (
            <>
              <Select value={id} onValueChange={setId}>
                <SelectTrigger aria-label="Gói tập">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {canonicalPackages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {pkg.type === "PT" && (
                <Select value={trainerId} onValueChange={setTrainerId}>
                  <SelectTrigger aria-label="Huấn luyện viên">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {canonicalTrainers
                      .filter((t) => t.approval_status === "APPROVED")
                      .map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.fullName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
              <div className="grid gap-3 sm:grid-cols-3">
                {["PAYOS", "VNPAY", "CASH"].map((m) => (
                  <Button
                    key={m}
                    variant={method === m ? "default" : "outline"}
                    className="h-14"
                    onClick={() => setMethod(m)}
                  >
                    {m === "PAYOS" ? (
                      <QrCode className="size-4" />
                    ) : (
                      <CreditCard className="size-4" />
                    )}
                    {m === "PAYOS" ? "PayOS" : m === "CASH" ? "Tiền mặt" : m}
                  </Button>
                ))}
              </div>
              <Button onClick={prepare}>Tiếp tục thanh toán</Button>
            </>
          ) : (
            <div className="space-y-5">
              <StatusBadge status="PENDING" />
              <p className="font-mono text-sm">{String(transaction?.["invoice_code"] ?? "")}</p>
              {method === "PAYOS" && (
                <div className="w-fit rounded-xl bg-qr-background p-5">
                  <QRCodeSVG
                    value={`omnigym-demo:${String(transaction?.["invoice_code"])}`}
                    size={200}
                    fgColor="var(--qr-foreground)"
                    bgColor="var(--qr-background)"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {method === "CASH"
                  ? "Thanh toán tiền mặt tại quầy."
                  : "Mã thanh toán mô phỏng, không thực hiện chuyển tiền."}
              </p>
              <div className="flex gap-3">
                <Button onClick={confirm}>
                  {method === "CASH" ? "Giữ gói chờ thanh toán" : "Xác nhận thanh toán mẫu"}
                </Button>
                <Button variant="outline" onClick={() => navigate({ to: "/payment/cancel" })}>
                  Hủy thanh toán
                </Button>
              </div>
            </div>
          )}
        </div>
        <aside className="border-l border-border pl-6">
          <p className="text-xs text-muted-foreground">Tóm tắt gói tập</p>
          <h2 className="mt-3 text-xl font-semibold">{pkg.name}</h2>
          <p className="mt-4 text-3xl font-bold text-primary">{vnd(pkg.price)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {pkg.durationDays} ngày · {pkg.totalSessions} buổi
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {pkg.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
