import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { canonicalBlogs } from '@/lib/omnigym/data';
import { BlogDetail } from '@/components/omnigym/discovery-pages';
export const Route=createFileRoute('/_public/blog_/$slug')({head:({params})=>{const a=canonicalBlogs.find(a=>a.slug===params.slug);return seo(a?.title??'Bài viết không tồn tại',a?.summary??'Bài viết OmniGym.');},component:Page});
function Page(){const {slug}=Route.useParams();return <BlogDetail slug={slug}/>;}
