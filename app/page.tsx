import type { Metadata } from 'next';
import DesignGuidePage from '@/src/views/DesignGuidePage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Sony Store KR 디자인 가이드 — 폰트 · 색상 · 스타일 토큰' },
  description:
    'store.sony.co.kr 의 번들 CSS 를 통째로 받아 선언 빈도를 세고 정리한 디자인 토큰. 폰트, 타입 스케일, 색상, 테두리·라운드·그림자·모션, 레이아웃, 컴포넌트.',
  alternates: { canonical: SITE_URL },
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return <DesignGuidePage />;
}
