import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/exercises_/$id')({head:()=>seo('Chi tiết exercises','Quản lý dữ liệu OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <EntityWorkspace entity="exercises" initialMode="detail" recordId={id}/>;}
