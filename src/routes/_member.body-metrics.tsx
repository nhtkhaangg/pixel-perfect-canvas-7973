import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MetricsPage } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/_member/body-metrics')({head:()=>seo('Chỉ số cơ thể', 'Chỉ số cơ thể tại OmniGym.'), component:MetricsPage});
