import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { TransactionsPage } from '@/components/omnigym/misc-pages';
export const Route = createFileRoute('/_member/transaction-history')({head:()=>seo('Giao dịch của tôi', 'Giao dịch của tôi tại OmniGym.'), component:TransactionsPage});
