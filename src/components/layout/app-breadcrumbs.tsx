import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

function titleize(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AppBreadcrumbs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
        GymFit
      </Link>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span
            className={
              index === segments.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            }
          >
            {titleize(segment)}
          </span>
        </span>
      ))}
    </nav>
  );
}
