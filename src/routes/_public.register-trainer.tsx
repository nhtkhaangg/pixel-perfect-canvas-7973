import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { TrainerProfilePage } from '@/components/omnigym/trainer-profile-page';
export const Route=createFileRoute('/_public/register-trainer')({head:()=>seo('Đăng ký huấn luyện viên','Đăng ký huấn luyện viên OmniGym.'),component:()=> <TrainerProfilePage registration/>});
