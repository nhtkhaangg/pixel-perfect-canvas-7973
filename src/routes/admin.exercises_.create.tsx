import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/exercises_/create')({head:()=>seo('Tạo mới exercises','Quản lý dữ liệu OmniGym.'),component:Page});
function Page(){return <EntityWorkspace entity="exercises" initialMode="create" />;}
