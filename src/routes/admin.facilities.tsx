import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/facilities')({head:()=>seo(workspaces['facilities']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['facilities']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="facilities"/>});
