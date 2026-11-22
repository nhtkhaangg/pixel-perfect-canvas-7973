import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/payments_/statistics')({head:()=>seo('Thống kê payments','Thống kê vận hành OmniGym.'),component:()=> <EntityWorkspace entity="payments"/>});
