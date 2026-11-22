import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/blog-reviews')({head:()=>seo(workspaces['blog-reviews']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['blog-reviews']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <EntityWorkspace entity="blog-reviews"/>});
