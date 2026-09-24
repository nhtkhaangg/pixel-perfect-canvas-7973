import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";

export const Route = createFileRoute("/_public")({
  component: PublicShell,
});
