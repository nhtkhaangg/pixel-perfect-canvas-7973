import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PlanWorkspace } from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/plans_/$id_/publish')({head:()=>seo('Giáo án · publish','Giáo án tập luyện OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <PlanWorkspace mode="publish" id={id}/>;}
