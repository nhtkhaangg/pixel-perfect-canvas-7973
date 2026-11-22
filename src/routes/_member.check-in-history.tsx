import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { CheckInHistoryPage } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/_member/check-in-history')({head:()=>seo('Lịch sử check-in', 'Lịch sử check-in tại OmniGym.'), component:CheckInHistoryPage});
