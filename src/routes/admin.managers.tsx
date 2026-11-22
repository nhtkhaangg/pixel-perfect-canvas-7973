import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/managers')({head:()=>seo(workspaces['managers']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['managers']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="managers"/>});
