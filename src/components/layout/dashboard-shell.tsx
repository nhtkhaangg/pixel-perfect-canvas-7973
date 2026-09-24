import { useState, type ReactNode } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { Bell, Dumbbell, Menu, Search, X } from "lucide-react";
import { getRoleArea, type RoleKey } from "@/lib/nav-config";
import { AppBreadcrumbs } from "@/components/layout/app-breadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * Shared dashboard chrome for Customer, Trainer, Staff, Manager and Admin areas.
 * Purely presentational — no auth, no guards.
 */
export function DashboardShell({ role, children }: { role: RoleKey; children?: ReactNode }) {
  const area = getRoleArea(role);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="space-y-0.5">
      {area.items.map((item, i) => (
        <div key={item.to}>
        {item.group && item.group !== area.items[i - 1]?.group ? (
          <p className="px-3 pt-4 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-foreground/45 uppercase">
            {item.group}
          </p>
        ) : null}
        <Link
          to={item.to}
          activeOptions={{ exact: item.to === area.home }}
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <span className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Dumbbell className="size-4" />
          </span>
          <span className="font-semibold tracking-tight text-sidebar-accent-foreground">
            GymFit
          </span>
        </div>
        <div className="px-4 py-4">
          <p className="text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            {area.name}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4">{nav}</div>
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/hub"
            className="block rounded-md px-3 py-2 text-xs text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            ← Về trang điều hướng
          </Link>
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Đóng điều hướng"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-64 flex-col bg-sidebar p-3">
            <div className="mb-4 flex items-center justify-between px-2 pt-1">
              <span className="font-semibold text-sidebar-accent-foreground">GymFit</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="size-4 text-sidebar-foreground" />
              </Button>
            </div>
            <div className="overflow-y-auto">{nav}</div>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
          <div className="hidden md:block">
            <AppBreadcrumbs />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden w-56 md:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm" className="h-9 pl-9" />
            </div>
            {role === "customer" || role === "trainer" ? (
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to={role === "customer" ? "/customer/notifications" : "/trainer/notifications"} aria-label="Thông báo">
                  <Bell className="size-4" />
                  <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon">
                <Bell className="size-4" />
              </Button>
            )}
            <div className="flex items-center gap-2 border-l border-border pl-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-muted text-xs font-semibold">
                  {role === "customer" ? "TA" : role === "trainer" ? "MN" : area.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-xs leading-tight sm:block">
                <p className="font-medium text-foreground">{role === "customer" ? "Trần An" : role === "trainer" ? "Minh Nguyên" : `${area.name} (demo)`}</p>
                <p className="text-muted-foreground">{area.key}@gymfit.dev</p>
              </div>
            </div>
          </div>
        </header>

        <main className={cn("flex-1 px-4 py-6 lg:px-8 lg:py-8")}>
          <div className="mx-auto w-full max-w-7xl space-y-6">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}
