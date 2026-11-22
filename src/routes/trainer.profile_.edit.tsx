import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { TrainerProfilePage } from '@/components/omnigym/trainer-profile-page';
export const Route=createFileRoute('/trainer/profile_/edit')({head:()=>seo('Chỉnh sửa hồ sơ HLV','Chỉnh sửa hồ sơ HLV OmniGym.'),component:()=> <TrainerProfilePage edit/>});
