import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { BlogList } from '@/components/omnigym/discovery-pages';
export const Route = createFileRoute('/_public/blog')({head:()=>seo('Blog thể hình', 'Blog thể hình tại OmniGym.'), component:BlogList});
