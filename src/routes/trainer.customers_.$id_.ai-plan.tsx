import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PlanWorkspace } from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/customers_/$id_/ai-plan')({head:()=>seo('Giáo án · ai','Giáo án tập luyện OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <PlanWorkspace mode="ai" customerId={id}/>;}
