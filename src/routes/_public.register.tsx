import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '@/components/omnigym/auth-page';
import { safeRedirect } from '@/lib/omnigym/contracts';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_public/register')({validateSearch:(s:Record<string,unknown>):{redirect?:string}=>{const redirect=safeRedirect(s['redirect']);return redirect?{redirect}:{};}, head:()=>seo('Tạo tài khoản','Tạo tài khoản tại OmniGym.'),component:Page});
function Page(){const search=Route.useSearch();return <AuthPage kind="register" {...(search.redirect?{redirect:search.redirect}:{})}/>;}
