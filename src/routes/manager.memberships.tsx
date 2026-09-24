import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/manager/memberships")({
  head: () => ({
    meta: [
      { title: "Gói hội viên — Quản lý — GymFit" },
      { name: "description", content: "Gói tập, giá bán và phê duyệt hội viên." },
      { property: "og:title", content: "Gói hội viên — Quản lý — GymFit" },
      { property: "og:description", content: "Gói tập, giá bán và phê duyệt hội viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManagerMembershipsPage,
});

function ManagerMembershipsPage() {
  return <OpsPage config={opsPages.managerMemberships} />;
}
