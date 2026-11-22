import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PaymentPage } from '@/components/omnigym/payment-page';
export const Route=createFileRoute('/_member/payment/success')({head:()=>seo('Thanh toán success','Gói tập và thanh toán OmniGym.'),component:()=> <PaymentPage result="success"/>});
