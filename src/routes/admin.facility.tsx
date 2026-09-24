import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/admin/facility")({
  head: () => ({
    meta: [
      { title: "Cơ sở vật chất — Quản trị viên — GymFit" },
      { name: "description", content: "Khu vực, giờ mở cửa và sức chứa của phòng gym." },
      { property: "og:title", content: "Cơ sở vật chất — Quản trị viên — GymFit" },
      { property: "og:description", content: "Khu vực, giờ mở cửa và sức chứa của phòng gym." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminBranchesPage,
});

function AdminBranchesPage() {
  return <OpsPage config={opsPages.adminFacility} />;
}
