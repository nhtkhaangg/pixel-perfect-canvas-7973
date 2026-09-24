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
          <Button onClick={() => toast.info("Chức năng đang được hoàn thiện", { description: title })}>
            Tạo mới
          </Button>
        }
      />
      <EmptyState
        icon={icon}
        title="Chưa có dữ liệu"
        description="Màn hình này đang được xây dựng. Nội dung và dữ liệu mẫu sẽ được bổ sung ở bước tiếp theo."
        action={
          <Button variant="outline" onClick={() => toast.success("Đã thực hiện thao tác mẫu")}>
            Thử thao tác
          </Button>
        }
      />
    </>
  );
}
