import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/omnigym/auth-page';
import { safeRedirect } from '@/lib/omnigym/contracts';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_public/portal/login')({validateSearch:(s:Record<string,unknown>):{redirect?:string}=>{const redirect=safeRedirect(s['redirect']);return redirect?{redirect}:{};}, head:()=>seo('Đăng nhập nội bộ','Cổng đăng nhập nhân viên OmniGym.'),component:Page});
function Page(){const search=Route.useSearch();return <AuthPage kind="internal" {...(search.redirect?{redirect:search.redirect}:{})}/>;}
