import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { Live } from '@/components/omnigym/live-page';
export const Route=createFileRoute('/trainer/live-sessions/$id')({head:()=>seo('Buổi tập trực tiếp','Ghi nhật ký tập luyện và RPE.'),component:Page});
function Page(){const {id}=Route.useParams();return <Live sessionId={id}/>;}
