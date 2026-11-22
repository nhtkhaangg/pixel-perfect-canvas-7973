import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/omnigym/auth-page';
import { safeRedirect } from '@/lib/omnigym/contracts';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_public/forgot-password')({validateSearch:(s:Record<string,unknown>):{redirect?:string}=>{const redirect=safeRedirect(s['redirect']);return redirect?{redirect}:{};}, head:()=>seo('Khôi phục mật khẩu','Khôi phục mật khẩu tại OmniGym.'),component:Page});
function Page(){const search=Route.useSearch();return <AuthPage kind="forgot" {...(search.redirect?{redirect:search.redirect}:{})}/>;}
