import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {CalendarPage} from '@/components/omnigym/calendar-page';
export const Route=createFileRoute('/trainer/reschedule_/create')({head:()=>seo('Yêu cầu đổi lịch tập','Chọn buổi tập và gửi yêu cầu đổi lịch.'),component:()=> <CalendarPage trainer/>});
