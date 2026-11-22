import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PlanWorkspace } from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/lesson-plans_/create')({head:()=>seo('Giáo án · create','Giáo án tập luyện OmniGym.'),component:Page});
function Page(){return <PlanWorkspace mode="create" />;}
