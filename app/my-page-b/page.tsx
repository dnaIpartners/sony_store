import type { Metadata } from 'next';
import MyPage from '@/src/views/MyPage';

export const metadata: Metadata = {
  title: '마이페이지 B',
  description: '현행 마이페이지와 같은 항목·구성, 디자인만 다른 안.',
  robots: { index: false, follow: false },
};

export default function MyPageBRoute() {
  return <MyPage variant="b" />;
}
