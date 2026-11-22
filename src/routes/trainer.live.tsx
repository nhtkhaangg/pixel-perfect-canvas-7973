import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Live } from "@/components/omnigym/live-page";
export const Route = createFileRoute("/trainer/live")({
  head: () => seo("Buổi tập trực tiếp", "Điều hành buổi tập trực tiếp: ghi lại các set theo thời gian thực kèm điểm RPE."),
  component: Live,
});
