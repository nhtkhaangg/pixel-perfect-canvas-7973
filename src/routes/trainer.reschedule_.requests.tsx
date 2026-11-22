import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { RescheduleRequests } from '@/components/omnigym/calendar-page';
export const Route=createFileRoute('/trainer/reschedule_/requests')({head:()=>seo('Yêu cầu đổi lịch','Yêu cầu đổi lịch OmniGym.'),component:()=> <RescheduleRequests />});
