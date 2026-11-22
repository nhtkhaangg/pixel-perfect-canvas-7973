import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/schedule')({head:()=>seo(workspaces['schedule']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['schedule']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="schedule"/>});
