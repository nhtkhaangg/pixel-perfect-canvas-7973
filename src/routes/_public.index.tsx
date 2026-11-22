import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { HomePage } from "@/components/omnigym/home-page";
export const Route = createFileRoute("/_public/")({
  head: () =>
    seo(
      "Tập luyện có mục tiêu",
      "OmniGym: một phòng gym đầy đủ trang thiết bị với huấn luyện viên chuyên nghiệp, 36 lớp học mỗi tuần, gói hội viên linh hoạt và huấn luyện cá nhân.",
    ),
  component: HomePage,
});
