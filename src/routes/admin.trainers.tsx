import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/trainers')({head:()=>seo(workspaces['trainers']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['trainers']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="trainers"/>});
