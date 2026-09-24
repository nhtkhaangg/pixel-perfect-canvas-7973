import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const Route = createFileRoute("/trainer")({
  component: () => <DashboardShell role="trainer" />,
});
