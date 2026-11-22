import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Schedule } from "@/components/omnigym/workout-page";
export const Route = createFileRoute("/customer/schedule")({
  head: () => seo("Lịch tập của tôi", "Lịch các buổi tập của bạn tại OmniGym kèm yêu cầu đổi lịch."),
  component: Schedule,
});
