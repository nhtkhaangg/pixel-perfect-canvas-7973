import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/trainer/exercises_/$id_/edit')({head:()=>seo('Chỉnh sửa bài tập','Bài tập tùy chỉnh của huấn luyện viên.'),component:Page});
function Page(){const {id}=Route.useParams();return <EntityWorkspace entity="exercises" initialMode="edit" recordId={id}/>;}
