import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { BranchesPage } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/admin/branches')({head:()=>seo('Quản lý chi nhánh', 'Quản lý chi nhánh tại OmniGym.'), component:BranchesPage});
