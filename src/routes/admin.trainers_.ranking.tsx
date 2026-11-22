import {createFileRoute} from '@tanstack/react-router';
import {seo} from '@/lib/seo';
import {EntityWorkspace} from '@/components/omnigym/entity-workspace';
export const Route=createFileRoute('/admin/trainers_/ranking')({head:()=>seo('Thống kê trainers','Thống kê vận hành OmniGym.'),component:()=> <EntityWorkspace entity="trainers"/>});
