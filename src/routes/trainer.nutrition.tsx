import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {NutritionEditor} from '@/components/omnigym/nutrition-editor';
export const Route=createFileRoute('/trainer/nutrition')({head:()=>seo('Kế hoạch dinh dưỡng','Kế hoạch dinh dưỡng của hội viên OmniGym.'),component:NutritionEditor});
