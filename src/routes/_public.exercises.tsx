import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { ExerciseLibrary } from '@/components/omnigym/discovery-pages';
export const Route = createFileRoute('/_public/exercises')({head:()=>seo('Thư viện bài tập', 'Thư viện bài tập tại OmniGym.'), component:ExerciseLibrary});
