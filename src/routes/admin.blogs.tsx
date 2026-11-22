import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/blogs')({head:()=>seo(workspaces['blogs']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['blogs']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="blogs"/>});
