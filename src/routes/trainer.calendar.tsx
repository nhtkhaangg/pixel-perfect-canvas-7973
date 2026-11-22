import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { CalendarPage } from '@/components/omnigym/calendar-page';
export const Route=createFileRoute('/trainer/calendar')({head:()=>seo('Lịch huấn luyện','Lịch huấn luyện OmniGym.'),component:()=> <CalendarPage trainer/>});
