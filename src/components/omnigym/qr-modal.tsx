import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw } from "lucide-react";
import { FormModal } from "@/components/shared/form-modal";
import { Button } from "@/components/ui/button";
import { demoCustomer } from "@/lib/omnigym/data";
export function QrModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [remaining, setRemaining] = useState(60);
  const [token, setToken] = useState("CUS-0001-DEMO");
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setRemaining((v) => (v > 1 ? v - 1 : 60)), 1000);
    return () => clearInterval(t);
  }, [open]);
  useEffect(() => {
    if (remaining === 60 && open)
      setToken(`CUS-0001-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  }, [remaining, open]);
  return (
    <FormModal open={open} onOpenChange={onOpenChange} title="QR check-in">
      <div className="text-center">
        <p className="font-semibold">{demoCustomer.fullName}</p>
        <p className="mt-1 text-xs text-muted-foreground">{demoCustomer.customerCode}</p>
        <div className="mx-auto my-6 w-fit rounded-xl bg-qr-background p-5">
          <QRCodeSVG
            size={200}
            value={`omnigym://checkin/${demoCustomer.id}/${token}`}
            fgColor="var(--qr-foreground)"
            bgColor="var(--qr-background)"
          />
        </div>
        <p className="font-mono text-sm">{token}</p>
        <p className="mt-2 text-xs text-muted-foreground">Làm mới sau {remaining} giây</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => {
            setToken(`CUS-0001-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
            setRemaining(60);
          }}
        >
          <RefreshCw className="size-4" />
          Làm mới
        </Button>
      </div>
    </FormModal>
  );
}
