import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Dashboard } from "@/components/omnigym/trainer-dashboard-page";
export const Route = createFileRoute("/trainer/")({
  head: () => seo("Bảng điều khiển huấn luyện viên", "Buổi tập hôm nay, cảnh báo hội viên và các chỉ số huấn luyện."),
  component: Dashboard,
});
