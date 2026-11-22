import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/trainer/exercises_/create')({head:()=>seo('Tạo bài tập','Bài tập tùy chỉnh của huấn luyện viên.'),component:Page});
function Page(){return <EntityWorkspace entity="exercises" initialMode="create" />;}
