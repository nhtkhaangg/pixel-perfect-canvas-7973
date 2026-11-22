import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { OperationsNotifications } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/staff/notifications')({head:()=>seo('Thông báo nhân viên', 'Thông báo nhân viên tại OmniGym.'), component:OperationsNotifications});
