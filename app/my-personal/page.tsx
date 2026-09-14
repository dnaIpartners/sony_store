import type { Metadata } from 'next';
import MyPersonalPage from '@/src/views/MyPersonalPage';

export const metadata: Metadata = {
  title: '개인화 마이페이지',
  description: '나의 상태와 지금 할 일을 한 화면에 — 개인화 마이페이지 제안.',
  robots: { index: false, follow: false },
};

export default function MyPersonalRoute() {
  return <MyPersonalPage />;
}
