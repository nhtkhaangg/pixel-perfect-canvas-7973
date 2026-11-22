import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { OperationsDashboard } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/admin/dashboard')({head:()=>seo('Tổng quan vận hành', 'Tổng quan vận hành tại OmniGym.'), component:OperationsDashboard});
