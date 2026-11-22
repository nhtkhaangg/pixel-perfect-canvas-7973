import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/check-in_/statistics')({head:()=>seo('Thống kê check-in','Thống kê vận hành OmniGym.'),component:()=> <EntityWorkspace entity="check-in"/>});
