import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { OperationsNotifications } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/admin/notifications')({head:()=>seo('Thông báo vận hành', 'Thông báo vận hành tại OmniGym.'), component:OperationsNotifications});
