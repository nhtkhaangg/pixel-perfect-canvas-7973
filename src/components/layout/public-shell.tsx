import { Link, Outlet } from "@tanstack/react-router";
import { Dumbbell, Menu, X, Bell, QrCode, Home, MapPin, Users, Tags, LogIn } from "lucide-react";
import { useState } from "react";
import { guestNav, memberNav, discovery } from "@/lib/omnigym/navigation";
import { Button } from "@/components/ui/button";
import { useDemoSession } from "@/components/omnigym/demo-session";
import { QrModal } from "@/components/omnigym/qr-modal";
export function PublicShell() {
  const session = useDemoSession();
  const member = session.role === "customer";
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(false);
  const items = member ? [...memberNav, ...discovery] : guestNav;
  const nav = (
    <nav className="space-y-1">
      {items.map((i, n) => (
        <div key={i.to}>
          {i.group !== items[n - 1]?.group && (
            <p className="px-3 pt-6 pb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {i.group}
            </p>
          )}
          <Link
            to={i.to}
            activeOptions={{ exact: true }}
            onClick={() => setOpen(false)}
            className="flex h-11 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
          >
            <i.icon className="size-[18px]" />
            {i.label}
          </Link>
        </div>
      ))}
    </nav>
  );
  const bottom = [
    { to: "/" as const, label: "Trang chủ", icon: Home },
    { to: "/gym-info" as const, label: "Phòng gym", icon: MapPin },
    { to: "/trainers" as const, label: "HLV", icon: Users },
    { to: "/packages" as const, label: "Gói tập", icon: Tags },
    {
      to: member ? ("/profile" as const) : ("/login" as const),
      label: member ? "Hồ sơ" : "Đăng nhập",
      icon: LogIn,
    },
  ];
  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <Link to="/" className="flex h-16 items-center gap-3 border-b border-border px-6">
          <Dumbbell className="size-7 text-primary" />
          <span className="text-xl font-extrabold">OMNIGYM</span>
        </Link>
        <div className="flex-1 overflow-y-auto px-3 pb-6">{nav}</div>
        <div className="border-t border-border p-4">
          <Button className="w-full" variant={member ? "outline" : "default"} asChild>
            <Link to={member ? "/profile" : "/login"}>
              {member ? "Nguyễn Minh Anh" : "Đăng nhập"}
            </Link>
          </Button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">© 2026 OmniGym</p>
        </div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-overlay/75"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="relative flex h-dvh w-[min(80vw,280px)] flex-col bg-sidebar">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <span className="font-bold">OMNIGYM</span>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Đóng menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="overflow-y-auto px-3 pb-20">{nav}</div>
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background px-4 lg:px-8">
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            aria-label="Mở menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <p className="text-sm font-semibold">
            {member ? "Chào mừng, Minh Anh" : "OmniGym Fitness Center"}
          </p>
          <div className="ml-auto flex items-center gap-2">
            {member && (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/notifications" aria-label="Thông báo">
                    <Bell className="size-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="QR check-in"
                  onClick={() => setQr(true)}
                >
                  <QrCode className="size-5" />
                </Button>
              </>
            )}
            <Button size="sm" asChild>
              <Link to={member ? "/workout" : "/packages"}>
                {member ? "Đặt lịch tập" : "Khám phá gói tập"}
              </Link>
            </Button>
          </div>
        </header>
        <main className="page-enter min-w-0 flex-1 p-4 pb-24 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
        <nav
          aria-label="Điều hướng dưới"
          className="fixed inset-x-0 bottom-0 z-40 grid h-[calc(64px+env(safe-area-inset-bottom))] grid-cols-5 border-t border-border bg-sidebar pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          {bottom.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              activeOptions={{ exact: true }}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground data-[status=active]:text-primary"
            >
              <i.icon className="size-5" />
              <span className="text-[10px]">{i.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <QrModal open={qr} onOpenChange={setQr} />
    </div>
  );
}
