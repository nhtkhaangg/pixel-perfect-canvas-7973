import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { CheckoutFlow } from "@/components/customer/checkout";
import { ExpiringPackageBanner } from "@/components/customer/alerts";

export const Route = createFileRoute("/customer/purchase")({
  head: () => seo("Mua gói tập", "Chọn một gói tập GymFit và thanh toán qua VNPAY, PayOS hoặc tiền mặt."),
  component: () => (
    <>
      <ExpiringPackageBanner />
      <CheckoutFlow type="MEMBERSHIP" title="Mua gói tập" description="Chọn gói, chọn cách thanh toán và bắt đầu tập ngay." />
    </>
  ),
});
