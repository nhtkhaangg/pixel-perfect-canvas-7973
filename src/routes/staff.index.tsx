import { createFileRoute } from "@tanstack/react-router";
import { OpsPage } from "@/components/shared/ops-page";
import { opsPages } from "@/lib/mock/operations";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Tổng quan — Nhân viên — GymFit" },
      { name: "description", content: "Tổng quan lễ tân: check-in, khách vãng lai và việc cần xử lý." },
      { property: "og:title", content: "Tổng quan — Nhân viên — GymFit" },
      { property: "og:description", content: "Tổng quan lễ tân: check-in, khách vãng lai và việc cần xử lý." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffIndexPage,
});

function StaffIndexPage() {
  return <OpsPage config={opsPages.staffIndex} />;
}
