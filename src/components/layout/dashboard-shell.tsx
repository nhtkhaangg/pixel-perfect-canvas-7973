import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Dumbbell,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  QrCode,
  LogOut,
  Home,
  User,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import type { RoleKey } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import {
  memberNav,
  discovery,
  trainerNav,
  operationsNav,
  roleNames,
  type ShellItem,
} from "@/lib/omnigym/navigation";
import { operationsCanAccess, trainerCanAccess } from "@/lib/omnigym/contracts";
import { useDemoSession } from "@/components/omnigym/demo-session";
import { AccessState } from "@/components/omnigym/access-state";
import { QrModal } from "@/components/omnigym/qr-modal";
import { QuickCheckIn } from "@/components/omnigym/quick-check-in";
export function DashboardShell({ role, children }: { role: RoleKey; children?: ReactNode }) {
  const session = useDemoSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const effectiveRole =
    role === "admin" && ["staff", "manager", "admin"].includes(session.role) ? session.role : role;
  const operations = ["admin", "staff", "manager"].includes(effectiveRole);
  const customer = effectiveRole === "customer";
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [qr, setQr] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  useEffect(() => {
    if (!operations) return;
    const stored = localStorage.getItem("omnigym_admin_sidebar_collapsed");
    setCollapsed(stored === null ? window.innerWidth < 1280 : stored === "true");
  }, [operations]);
  const pending = effectiveRole === "trainer" && session.approval !== "APPROVED";
  const items = customer
    ? [...memberNav, ...discovery]
    : effectiveRole === "trainer"
      ? pending
        ? trainerNav.filter((i) => i.to === "/trainer/profile")
        : trainerNav
      : operationsNav.filter((i) => operationsCanAccess(effectiveRole, i.to));
  const denied =
    (pending && !trainerCanAccess(session.approval, pathname)) ||
    (role === "admin" &&
      pathname.startsWith("/admin/") &&
      !operationsCanAccess(effectiveRole, pathname));
  const nav = (compact = false) => (
    <nav className="space-y-1">
      {items.map((item, i) => (
        <div key={item.to}>
          {!compact && item.group !== items[i - 1]?.group && (
            <p className="px-3 pt-5 pb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {item.group}
            </p>
          )}
          <Link
            to={item.to}
            onClick={() => setOpen(false)}
            activeOptions={{ exact: true }}
            title={compact ? item.label : undefined}
            className={cn(
              "flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-primary",
              compact && "justify-center px-2",
            )}
          >
            <item.icon className="size-[18px] shrink-0" />
            {!compact && <span className="truncate">{item.label}</span>}
          </Link>
        </div>
      ))}
    </nav>
  );
  const bottom: ShellItem[] = customer
    ? [
        { label: "Trang chủ", to: "/", icon: Home, group: "" },
        { label: "Tập luyện", to: "/workout", icon: Dumbbell, group: "" },
        { label: "QR check-in", to: "/check-in-history", icon: QrCode, group: "" },
        { label: "Gói tập", to: "/packages", icon: Tags, group: "" },
        { label: "Hồ sơ", to: "/profile", icon: User, group: "" },
      ]
    : trainerNav.filter((i) =>
        [
          "/trainer/dashboard",
          "/trainer/calendar",
          "/trainer/customers",
          "/trainer/lesson-plans",
          "/trainer/chat",
        ].includes(i.to),
      );
  const chat =
    pathname === "/messages" || pathname === "/trainer/chat" || pathname.endsWith("/customer/chat");
  return (
    <div className="flex min-h-dvh bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-sidebar transition-[width] lg:flex",
          customer ? "w-64" : operations && collapsed ? "w-[72px]" : "w-60",
        )}
      >
        <Link
          to={
            customer ? "/" : effectiveRole === "trainer" ? "/trainer/dashboard" : "/admin/dashboard"
          }
          className={cn(
            "flex h-[60px] shrink-0 items-center gap-2 border-b border-border px-5",
            customer && "h-16",
            collapsed && operations && "justify-center px-2",
          )}
        >
          <Dumbbell className="size-7 shrink-0 text-primary" />
          {!(operations && collapsed) && (
            <span className="text-lg font-extrabold text-foreground">OMNIGYM</span>
          )}
        </Link>
        <div className="flex-1 overflow-y-auto px-3 pb-6">{nav(operations && collapsed)}</div>
        <div className="border-t border-border p-3">
          {operations ? (
            <Button
              size="icon"
              variant="ghost"
              aria-label={collapsed ? "Mở rộng thanh điều hướng" : "Thu gọn thanh điều hướng"}
              title={collapsed ? "Mở rộng" : "Thu gọn"}
              onClick={() => {
                setCollapsed(!collapsed);
                localStorage.setItem("omnigym_admin_sidebar_collapsed", String(!collapsed));
              }}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </Button>
          ) : (
            <Link to="/hub" className="block px-3 py-2 text-xs text-muted-foreground">
              {roleNames[effectiveRole]} · OmniGym
            </Link>
          )}
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
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
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
            <div className="overflow-y-auto px-3 pb-20">{nav()}</div>
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            "sticky top-0 z-30 flex h-[60px] shrink-0 items-center gap-3 border-b border-border bg-background px-4 lg:px-8",
            customer && "h-16",
          )}
        >
          <Button
            className="lg:hidden"
            variant="ghost"
            size="icon"
            aria-label="Mở menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="hidden min-w-0 md:block">
            <AppBreadcrumbs />
          </div>
          <span className="text-sm font-semibold md:hidden">OmniGym</span>
          <div className="ml-auto flex items-center gap-2">
            {operations ? (
              <Button variant="outline" size="sm" onClick={() => setCheckIn(true)}>
                <QrCode className="size-4" />
                <span className="hidden sm:inline">Check-in nhanh</span>
              </Button>
            ) : customer ? (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="QR check-in"
                  onClick={() => setQr(true)}
                >
                  <QrCode className="size-5" />
                </Button>
                <Button size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/workout">Đặt lịch tập</Link>
                </Button>
              </>
            ) : null}
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link
                aria-label="Thông báo"
                to={
                  customer
                    ? "/notifications"
                    : effectiveRole === "trainer"
                      ? "/trainer/notifications"
                      : "/admin/notifications"
                }
              >
                <Bell className="size-4" />
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
              </Link>
            </Button>
            <Link
              to={
                customer
                  ? "/profile"
                  : effectiveRole === "trainer"
                    ? "/trainer/profile"
                    : "/admin/profile"
              }
              className="flex items-center gap-2 border-l border-border pl-3"
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {customer ? "MA" : effectiveRole === "trainer" ? "MA" : "TP"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-xs sm:block">
                <span className="block font-semibold">
                  {customer
                    ? "Nguyễn Minh Anh"
                    : effectiveRole === "trainer"
                      ? "Nguyễn Minh Anh"
                      : "Trần Thanh Phong"}
                </span>
                <span className="text-muted-foreground">{roleNames[effectiveRole]}</span>
              </span>
            </Link>
          </div>
        </header>
        {pending && (
          <div className="border-b border-warning/20 bg-warning/10 px-5 py-3 text-sm text-warning">
            {session.approval === "REJECTED"
              ? "Hồ sơ bị từ chối — vui lòng cập nhật lại."
              : "Hồ sơ đang chờ phê duyệt."}
            <Link to="/trainer/profile/edit" className="ml-3 underline">
              Cập nhật hồ sơ
            </Link>
          </div>
        )}
        <main
          className={cn(
            "page-enter min-w-0 flex-1 p-4 md:p-6 lg:p-8",
            !operations && "pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-8",
            chat && "overflow-hidden",
          )}
        >
          <div
            className={cn("mx-auto w-full space-y-6", customer ? "max-w-7xl" : "max-w-[1536px]")}
          >
            {denied ? <AccessState trainer={pending} /> : (children ?? <Outlet />)}
          </div>
        </main>
        {!operations && !pending && (
          <nav
            aria-label="Điều hướng dưới"
            className="fixed inset-x-0 bottom-0 z-40 grid h-[calc(64px+env(safe-area-inset-bottom))] grid-cols-5 border-t border-border bg-sidebar pb-[env(safe-area-inset-bottom)] lg:hidden"
          >
            {bottom.map((i) =>
              customer && i.label === "QR check-in" ? (
                <Button
                  key={i.label}
                  variant="ghost"
                  className="h-16 flex-col gap-1 rounded-none p-1 text-primary"
                  aria-label="QR check-in"
                  onClick={() => setQr(true)}
                >
                  <span className="-mt-3 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <QrCode className="size-6" />
                  </span>
                  <span className="text-[10px]">Check-in</span>
                </Button>
              ) : (
                <Link
                  key={i.to}
                  to={i.to}
                  activeOptions={{ exact: true }}
                  className="flex min-w-0 flex-col items-center justify-center gap-1 text-muted-foreground data-[status=active]:text-primary"
                >
                  <i.icon className="size-5" />
                  <span className="max-w-full truncate px-1 text-[10px]">{i.label}</span>
                </Link>
              ),
            )}
          </nav>
        )}
      </div>
      <QrModal open={qr} onOpenChange={setQr} />
      <QuickCheckIn open={checkIn} onOpenChange={setCheckIn} />
    </div>
  );
}
