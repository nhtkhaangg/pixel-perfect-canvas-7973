import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/trainer/exercises/')({head:()=>seo('Bài tập huấn luyện viên','Thư viện bài tập và bài tập tự tạo.'),component:Page});
function Page(){return <EntityWorkspace entity="exercises" />;}
