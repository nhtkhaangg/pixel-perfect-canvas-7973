import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/staff/members")({
  head: () => ({
    meta: [
      { title: "Hội viên — Nhân viên — GymFit" },
      { name: "description", content: "Tra cứu hồ sơ hội viên và tình trạng gói tập." },
      { property: "og:title", content: "Hội viên — Nhân viên — GymFit" },
      { property: "og:description", content: "Tra cứu hồ sơ hội viên và tình trạng gói tập." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffMembersPage,
});

function StaffMembersPage() {
  return <OpsPage config={opsPages.staffMembers} />;
}
