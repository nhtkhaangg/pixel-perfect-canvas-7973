import { Link, Outlet } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { getRoleArea } from "@/lib/nav-config";
import { Button } from "@/components/ui/button";

/** Marketing-style public layout used by the Guest area. */
export function PublicShell() {
  const area = getRoleArea("guest");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 lg:px-6">
          <Link to="/guest" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4" />
            </span>
            <span className="font-semibold tracking-tight">GymFit</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {area.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === area.home }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-muted data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/customer">Member area</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/guest/pricing">Join now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground lg:px-6">
          <p className="font-medium text-foreground">GymFit</p>
          <p>Gym management platform — frontend prototype with mock data.</p>
        </div>
      </footer>
    </div>
  );
}
