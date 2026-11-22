import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {CalendarPage} from '@/components/omnigym/calendar-page';
export const Route=createFileRoute('/_member/workout')({head:()=>seo('Lịch tập & PT','Lịch tập và giáo án hội viên OmniGym.'),component:CalendarPage});
