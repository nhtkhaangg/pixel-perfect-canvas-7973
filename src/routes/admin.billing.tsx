import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {RefundPanel} from '@/components/omnigym/refund-panel';
export const Route=createFileRoute('/admin/billing')({head:()=>seo('Hoàn tiền','Theo dõi và xử lý yêu cầu hoàn tiền.'),component:()=> <RefundPanel operations/>});
