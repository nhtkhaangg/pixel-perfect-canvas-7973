import type { LucideIcon } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/** Placeholder page body for scaffolded routes that will be filled in later. */
export function ScaffoldPage({
  title,
  description,
  icon = LayoutGrid,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button onClick={() => toast.info("Not wired up yet", { description: title })}>
            Primary action
          </Button>
        }
      />
      <EmptyState
        icon={icon}
        title="Nothing here yet"
        description="This screen is scaffolded. Content and mock data land in the next step."
        action={
          <Button variant="outline" onClick={() => toast.success("Placeholder action triggered")}>
            Show toast
          </Button>
        }
      />
    </>
  );
}
