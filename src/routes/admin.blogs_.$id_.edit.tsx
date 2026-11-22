import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/blogs_/$id_/edit')({head:()=>seo('Chỉnh sửa blogs','Quản lý dữ liệu OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <EntityWorkspace entity="blogs" initialMode="edit" recordId={id}/>;}
