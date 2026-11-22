import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PlanWorkspace } from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/lesson-plans_/$id')({head:()=>seo('Giáo án · detail','Giáo án tập luyện OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <PlanWorkspace mode="detail" id={id}/>;}
