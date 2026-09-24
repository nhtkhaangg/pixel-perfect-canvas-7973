import { Link } from "@tanstack/react-router";
import { AlertTriangle, TrendingDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ExpiringPackageBanner({ days = 6, name = "Gói Tiêu chuẩn hàng tháng" }: { days?: number; name?: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3">
      <AlertTriangle className="size-5 shrink-0 text-warning-foreground" />
      <p className="flex-1 text-sm">
        <span className="font-semibold">{name} sẽ hết hạn sau {days} ngày.</span>{" "}
        <span className="text-muted-foreground">Gia hạn ngay để không bị gián đoạn quyền tập và đặt lịch.</span>
      </p>
      <Button size="sm" asChild>
        <Link to="/customer/purchase">Gia hạn</Link>
      </Button>
      <Button size="icon" variant="ghost" className="size-8" onClick={() => setOpen(false)} aria-label="Đóng">
        <X className="size-4" />
      </Button>
    </div>
  );
}

export function PlateauAlertCard() {
  return (
    <div className="rounded-lg border border-destructive/30 bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
          <TrendingDown className="size-4" />
        </span>
        <div className="flex-1">
          <p className="font-semibold">Phát hiện chững tiến bộ tập luyện</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bài đẩy ngực vẫn giữ ở mức <span className="font-medium text-foreground">85 kg</span> suốt 4 tuần. Hãy thử
            một tuần giảm tải, sau đó là chu kỳ 3 tuần với biến thể (đẩy ngực dừng, tay hẹp).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/customer/chat">Hỏi huấn luyện viên</Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/customer/progress">Xem tiến độ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-card ${className ?? ""}`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h3 className="text-sm font-semibold">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
