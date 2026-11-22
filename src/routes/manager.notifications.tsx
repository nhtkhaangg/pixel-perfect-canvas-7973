import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { OperationsNotifications } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/manager/notifications')({head:()=>seo('Thông báo quản lý', 'Thông báo quản lý tại OmniGym.'), component:OperationsNotifications});
