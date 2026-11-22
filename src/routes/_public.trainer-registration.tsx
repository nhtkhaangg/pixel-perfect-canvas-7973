import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { TrainerProfilePage } from '@/components/omnigym/trainer-profile-page';
export const Route=createFileRoute('/_public/trainer-registration')({head:()=>seo('Ứng tuyển huấn luyện viên','Ứng tuyển huấn luyện viên OmniGym.'),component:()=> <TrainerProfilePage registration/>});
