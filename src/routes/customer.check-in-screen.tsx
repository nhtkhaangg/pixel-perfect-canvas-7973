import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Keyboard, ScanLine, XCircle } from "lucide-react";
import { useState } from "react";
import { seo } from "@/lib/seo";
import { customerPackages, me } from "@/lib/mock/customer";
import { vnDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customer/check-in-screen")({
  head: () => seo("Màn hình check-in", "Xem trước màn hình check-in tự động tại cổng vào GymFit."),
  component: Kiosk,
});

type State = "idle" | "scanning" | "ok" | "fail";

function Kiosk() {
  const [state, setState] = useState<State>("idle");
  const [code, setCode] = useState("");
  const active = customerPackages.find((p) => p.status === "ACTIVE" && p.type === "MEMBERSHIP")!;

  function scan(ok: boolean) {
    setState("scanning");
    setTimeout(() => setState(ok ? "ok" : "fail"), 1200);
    setTimeout(() => setState("idle"), 5200);
  }

  return (
    <>
      <PageHeader title="Màn hình check-in" description="Xem trước màn hình cổng check-in mà hội viên nhìn thấy tại phòng gym." />
      <div className="mx-auto flex min-h-[520px] max-w-3xl flex-col items-center justify-center rounded-xl bg-surface p-10 text-center text-surface-foreground shadow-sm">
        <p className="text-xs tracking-wider text-surface-foreground/50 uppercase">GymFit · Cổng xoay số 2</p>
        {state === "idle" && (
          <>
            <div className="mt-8 flex size-48 items-center justify-center rounded-2xl border-2 border-dashed border-primary/60">
              <ScanLine className="size-20 text-primary" />
            </div>
            <p className="mt-6 text-2xl font-semibold">Đưa mã QR vào máy quét</p>
            <p className="mt-1 text-surface-foreground/60">hoặc nhập mã hội viên bên dưới</p>
            <form className="mt-6 flex w-full max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); scan(code.trim().toUpperCase().startsWith("GF-1042")); }}>
              <div className="relative flex-1">
                <Keyboard className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="GF-1042-XXXX" className="bg-card pl-9 text-foreground" />
              </div>
              <Button type="submit">Check-in</Button>
            </form>
            <div className="mt-6 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => scan(true)}>Mô phỏng quét hợp lệ</Button>
              <Button variant="ghost" size="sm" className="text-surface-foreground/70" onClick={() => scan(false)}>Mô phỏng quét lỗi</Button>
            </div>
          </>
        )}
        {state === "scanning" && (
          <>
            <div className="mt-8 size-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-6 text-xl font-semibold">Đang xác thực…</p>
          </>
        )}
        {state === "ok" && (
          <>
            <CheckCircle2 className="mt-6 size-24 text-primary" />
            <p className="mt-4 text-3xl font-semibold">Chào mừng trở lại, {me.name.split(" ").slice(-1)[0]}!</p>
            <p className="mt-2 text-surface-foreground/70">{active.name} · có hiệu lực đến {vnDate(active.endDate)}</p>
            <p className="mt-6 rounded-md bg-primary/15 px-4 py-2 text-sm text-primary">Buổi PT của bạn với {me.trainerName} bắt đầu lúc 18:00 tại Khu tạ tự do A</p>
          </>
        )}
        {state === "fail" && (
          <>
            <XCircle className="mt-6 size-24 text-destructive" />
            <p className="mt-4 text-3xl font-semibold">Check-in thất bại</p>
            <p className="mt-2 text-surface-foreground/70">Mã đã hết hạn hoặc không hợp lệ. Hãy làm mới mã QR hoặc liên hệ quầy lễ tân.</p>
          </>
        )}
      </div>
    </>
  );
}
