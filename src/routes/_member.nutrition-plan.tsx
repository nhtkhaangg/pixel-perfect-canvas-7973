import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {NutritionEditor} from '@/components/omnigym/nutrition-editor';
export const Route=createFileRoute('/_member/nutrition-plan')({head:()=>seo('Dinh dưỡng hội viên','Kế hoạch dinh dưỡng được chỉ định.'),component:()=> <NutritionEditor readOnly/>});
