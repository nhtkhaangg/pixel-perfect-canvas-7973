import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { BranchesPage } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/_public/branches')({head:()=>seo('Chi nhánh', 'Chi nhánh tại OmniGym.'), component:BranchesPage});
