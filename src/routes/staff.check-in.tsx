import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage } from "@/components/shared/scaffold-page";

export const Route = createFileRoute("/staff/check-in")({
  head: () => ({
    meta: [
      { title: "Check-in — Nhân viên — GymFit" },
      { name: "description", content: "Quét mã hoặc tìm hội viên để ghi nhận check-in." },
      { property: "og:title", content: "Check-in — Nhân viên — GymFit" },
      { property: "og:description", content: "Quét mã hoặc tìm hội viên để ghi nhận check-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffCheckInPage,
});

function StaffCheckInPage() {
  return <ScaffoldPage title="Check-in" description="Quét mã hoặc tìm hội viên để ghi nhận check-in." />;
}
