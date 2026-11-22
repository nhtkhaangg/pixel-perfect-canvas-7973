import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { SessionActions } from '@/components/omnigym/session-actions';
export const Route=createFileRoute('/trainer/sessions/$id/verify')({head:()=>seo('Xác nhận buổi tập','Buổi tập OmniGym.'),component:Page});
function Page(){const {id}=Route.useParams();return <SessionActions id={id} verify/>;}
