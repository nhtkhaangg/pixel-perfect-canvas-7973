import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/check-in')({head:()=>seo(workspaces['check-in']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['check-in']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="check-in"/>});
