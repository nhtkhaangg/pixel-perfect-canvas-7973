import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {PlanWorkspace} from '@/components/omnigym/plan-workspace';
export const Route=createFileRoute('/trainer/plans/')({head:()=>seo('Giáo án tập luyện','Danh sách giáo án, trạng thái và phiên bản.'),component:PlanWorkspace});
