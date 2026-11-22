import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { SettingsPage } from '@/components/omnigym/settings-page';
export const Route=createFileRoute('/admin/settings')({head:()=>seo('Cài đặt hệ thống','Cài đặt hệ thống OmniGym.'),component:SettingsPage});
