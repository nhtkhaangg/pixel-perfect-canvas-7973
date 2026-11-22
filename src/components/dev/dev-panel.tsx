import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoSession } from "@/components/omnigym/demo-session";
import {
  roleNames,
  memberNav,
  guestNav,
  trainerNav,
  operationsNav,
} from "@/lib/omnigym/navigation";
import { operationsCanAccess, type DemoRole } from "@/lib/omnigym/contracts";
export function DevPanel() {
  const [open, setOpen] = useState(false);
  const session = useDemoSession();
  const nav =
    session.role === "guest"
      ? guestNav
      : session.role === "customer"
        ? memberNav
        : session.role === "trainer"
          ? trainerNav
          : operationsNav.filter((i) => operationsCanAccess(session.role, i.to));
  return (
    <div className="fixed right-4 bottom-20 z-[60] lg:bottom-4">
      {!open ? (
        <Button
          size="icon"
          variant="outline"
          title="Điều hướng kiểm thử"
          aria-label="Điều hướng kiểm thử"
          className="rounded-full bg-card shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Compass className="size-5" />
        </Button>
      ) : (
        <div className="flex max-h-[70dvh] w-[min(320px,90vw)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-border p-3">
            <p className="text-sm font-semibold">Điều hướng kiểm thử</p>
            <Button size="icon" variant="ghost" aria-label="Đóng" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 border-b border-border p-3">
            {(Object.keys(roleNames) as DemoRole[]).map((role) => (
              <Button
                key={role}
                variant={role === session.role ? "default" : "outline"}
                size="sm"
                onClick={() => session.setRole(role)}
              >
                {roleNames[role]}
              </Button>
            ))}
          </div>
          {session.role === "trainer" && (
            <div className="flex gap-2 p-3">
              <Button size="sm" variant="outline" onClick={() => session.setApproval("PENDING")}>
                Chờ duyệt
              </Button>
              <Button size="sm" variant="outline" onClick={() => session.setApproval("APPROVED")}>
                Đã duyệt
              </Button>
            </div>
          )}
          <div className="overflow-y-auto p-2">
            {nav.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
              >
                <i.icon className="size-4 text-primary" />
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
