import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PlanWorkspace } from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/lesson-plans_/$id_/edit')({head:()=>seo('Giáo án · edit','Giáo án tập luyện OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <PlanWorkspace mode="edit" id={id}/>;}
