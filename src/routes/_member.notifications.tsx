import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { NotificationsPage } from "@/components/omnigym/notifications-page";
export const Route = createFileRoute("/_member/notifications")({
  head: () => seo("Thông báo", "Thông báo về gói tập, buổi tập, thanh toán và tin nhắn."),
  component: NotificationsPage,
});
