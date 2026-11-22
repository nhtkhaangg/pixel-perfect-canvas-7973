import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { CustomerProfile } from '@/components/omnigym/profile-page';
export const Route=createFileRoute('/_member/profile')({head:()=>seo('Hồ sơ hội viên','Hồ sơ hội viên OmniGym.'),component:CustomerProfile});
