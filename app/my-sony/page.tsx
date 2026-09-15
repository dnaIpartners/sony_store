import type { Metadata } from 'next';
import MySonyPage from '@/src/views/MySonyPage';

export const metadata: Metadata = {
  title: '기획안 · My Sony',
  description: '주문·배송, 마일리지·쿠폰, 정품등록 제품, 아카데미 수강 내역을 한곳에서 확인한다.',
  robots: { index: false, follow: false },
};

export default function MySonyRoute() {
  return <MySonyPage />;
}
