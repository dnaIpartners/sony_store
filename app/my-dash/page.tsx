import type { Metadata } from 'next';
import MyDashPage from '@/src/views/MyDashPage';

export const metadata: Metadata = {
  title: 'My Sony 대시보드',
  description: '통합 마이페이지의 내용을 한 화면 위젯으로 — 두 번째 제안.',
  robots: { index: false, follow: false },
};

export default function MyDashRoute() {
  return <MyDashPage />;
}
