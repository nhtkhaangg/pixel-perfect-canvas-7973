import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/trainer/exercises/$id')({head:()=>seo('Chi tiết bài tập','Thư viện bài tập và bài tập tự tạo.'),component:Page});
function Page(){const {id}=Route.useParams();return <EntityWorkspace entity="exercises" initialMode="detail" recordId={id}/>;}
