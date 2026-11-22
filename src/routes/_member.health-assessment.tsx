import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AssessmentPage } from '@/components/omnigym/assessment-page';
export const Route=createFileRoute('/_member/health-assessment')({head:()=>seo('Đánh giá thể trạng','Tiền sử sức khỏe, mục tiêu, lối sống và chỉ số cơ thể.'),component:AssessmentPage});
