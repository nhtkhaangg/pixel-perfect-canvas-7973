import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { TrainerProfilePage } from '@/components/omnigym/trainer-profile-page';
export const Route=createFileRoute('/trainer/profile')({head:()=>seo('Hồ sơ huấn luyện viên','Thông tin và trạng thái hồ sơ huấn luyện viên OmniGym.'),component:TrainerProfilePage});
