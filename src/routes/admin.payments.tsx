import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { EntityWorkspace } from '@/components/omnigym/entity-workspace';
import { RefundPanel } from '@/components/omnigym/refund-panel';
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs';
import { workspaces } from '@/lib/omnigym/workspaces';
export const Route = createFileRoute('/admin/payments')({head:()=>seo(workspaces['payments']?.title ?? 'Vận hành', 'Quản lý '+(workspaces['payments']?.title ?? 'vận hành')+' tại OmniGym.'), component:()=> <Tabs defaultValue="payments"><TabsList><TabsTrigger value="payments">Giao dịch</TabsTrigger><TabsTrigger value="refunds">Yêu cầu hoàn tiền</TabsTrigger></TabsList><TabsContent value="payments"><EntityWorkspace entity="payments"/></TabsContent><TabsContent value="refunds"><RefundPanel operations/></TabsContent></Tabs>});
