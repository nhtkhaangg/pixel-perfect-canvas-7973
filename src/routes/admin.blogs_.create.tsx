import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/blogs_/create')({head:()=>seo('Tạo mới blogs','Quản lý dữ liệu OmniGym.'),component:Page});
function Page(){return <EntityWorkspace entity="blogs" initialMode="create" />;}
