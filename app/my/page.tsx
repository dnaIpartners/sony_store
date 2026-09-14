import type { Metadata } from 'next';
import MyAllPage from '@/src/views/MyAllPage';

export const metadata: Metadata = {
  title: '통합 마이페이지',
  description: '스토어 마이페이지 · My Sony 서비스 · 정품등록을 한 화면으로 합친 제안.',
  robots: { index: false, follow: false },
};

export default function MyAllRoute() {
  return <MyAllPage />;
}
