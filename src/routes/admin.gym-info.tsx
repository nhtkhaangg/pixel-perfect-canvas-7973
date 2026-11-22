import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { SettingsPage } from '@/components/omnigym/settings-page';
export const Route=createFileRoute('/admin/gym-info')({head:()=>seo('Thông tin phòng gym','Thông tin phòng gym OmniGym.'),component:SettingsPage});
