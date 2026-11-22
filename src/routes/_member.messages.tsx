import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Chat } from "@/components/omnigym/messages-page";
export const Route = createFileRoute("/_member/messages")({
  head: () => seo("Trò chuyện với huấn luyện viên", "Nhắn tin trực tiếp với huấn luyện viên của bạn tại OmniGym."),
  component: Chat,
});
