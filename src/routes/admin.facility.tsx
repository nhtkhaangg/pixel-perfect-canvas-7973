import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

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
  return <ScaffoldPage title="Cơ sở vật chất" description="Khu vực, giờ mở cửa và sức chứa của phòng gym." />;
}
