import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Dashboard } from "@/components/omnigym/dashboard-page";
export const Route = createFileRoute("/customer/")({
  head: () => seo("Trang tổng quan hội viên", "Tổng quan OmniGym của bạn: gói tập, lịch tập sắp tới, tiến độ cơ thể và cảnh báo."),
  component: Dashboard,
});
