import { Link, Outlet } from "@tanstack/react-router";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { getRoleArea } from "@/lib/nav-config";
import { gymInfo } from "@/lib/mock/public";
import { Button } from "@/components/ui/button";

/** Marketing-style public layout used by the Guest area. */
export function PublicShell() {
  const area = getRoleArea("guest");
  const [open, setOpen] = useState(false);

  const linkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-foreground data-[status=active]:bg-muted";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4" />
            </span>
            <span className="font-semibold tracking-tight">GymFit</span>
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex">
            {area.items.slice(1).map((item) => (
              <Link key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Join now</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-border px-4 py-3 lg:hidden">
            {area.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" className={linkClass} onClick={() => setOpen(false)}>
              Log in
            </Link>
          </nav>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-surface text-surface-foreground">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          <div>
            <p className="flex items-center gap-2 font-semibold">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Dumbbell className="size-4" />
              </span>
              GymFit
            </p>
            <p className="mt-3 text-sm text-surface-foreground/60">{gymInfo.tagline}.</p>
          </div>
          <FooterCol title="Explore">
            <Link to="/packages">Packages</Link>
            <Link to="/trainers">Trainers</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/tools/fitness-calculator">Fitness calculator</Link>
          </FooterCol>
          <FooterCol title="Company">
            <Link to="/gym-info">Gym info</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/register-trainer">Become a trainer</Link>
          </FooterCol>
          <FooterCol title="Contact">
            <span>{gymInfo.phone}</span>
            <span>{gymInfo.email}</span>
            <span>4 branches in San Francisco</span>
          </FooterCol>
        </div>
        <div className="border-t border-surface-foreground/10">
          <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-surface-foreground/50 lg:px-6">
            © 2026 GymFit. Prototype with mock data.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wider text-surface-foreground/50 uppercase">{title}</p>
      <div className="mt-3 flex flex-col gap-2 text-sm text-surface-foreground/80 [&_a:hover]:text-primary">
        {children}
      </div>
    </div>
  );
}
