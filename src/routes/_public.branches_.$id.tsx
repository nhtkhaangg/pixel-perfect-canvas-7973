import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { BranchDetail } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/_public/branches_/$id')({head:()=>seo('Chi tiết chi nhánh', 'Chi tiết chi nhánh tại OmniGym.'), component:BranchDetail});
