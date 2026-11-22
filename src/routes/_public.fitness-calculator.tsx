import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { CalculatorPage } from "@/components/omnigym/calculator-page";
export const Route = createFileRoute("/_public/fitness-calculator")({
  head: () => seo("Công cụ tính BMI, BMR & TDEE", "Công cụ miễn phí tính chỉ số khối cơ thể, tỷ lệ trao đổi chất cơ bản và tổng năng lượng tiêu hao hàng ngày, kèm mục tiêu calo."),
  component: CalculatorPage,
});
