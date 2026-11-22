import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {NutritionEditor} from '@/components/omnigym/nutrition-editor';
export const Route=createFileRoute('/trainer/customers_/$id_/nutrition-plan')({head:()=>seo('Dinh dưỡng học viên','Kế hoạch dinh dưỡng riêng cho học viên.'),component:Page});
function Page(){const {id}=Route.useParams();return <NutritionEditor customerId={id}/>;}
