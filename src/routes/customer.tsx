import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const Route = createFileRoute("/customer")({
  component: () => <DashboardShell role="customer" />,
});
