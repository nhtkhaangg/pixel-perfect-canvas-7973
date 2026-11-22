import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { InternalProfile } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/admin/profile')({head:()=>seo('Hồ sơ nội bộ', 'Hồ sơ nội bộ tại OmniGym.'), component:InternalProfile});
