import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {RefundPanel} from '@/components/omnigym/refund-panel';
export const Route=createFileRoute('/customer/refund')({head:()=>seo('Yêu cầu hoàn tiền','Gửi yêu cầu hoàn tiền và thông tin ngân hàng.'),component:RefundPanel});
