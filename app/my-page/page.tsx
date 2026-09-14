import type { Metadata } from 'next';
import MyPage from '@/src/views/MyPage';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '주문·배송 현황, 쿠폰, 마일리지, 찜한 상품을 한곳에서 확인한다.',
  robots: { index: false, follow: false },
};

export default function MyPageRoute() {
  return <MyPage />;
}
