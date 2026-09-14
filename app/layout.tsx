import type { Metadata } from 'next';
import './globals.css';
import SonyHeader from '@/src/components/SonyHeader';
import SonyFooter from '@/src/components/SonyFooter';
import ErrorBoundary from '@/src/components/ErrorBoundary';
import { GoogleTagManager } from '@next/third-parties/google';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, TWITTER_HANDLE } from '@/src/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  keywords: ['AI Agent', 'IPARTNERS', 'AI Agency', 'UX', '워크플로우 자동화', 'AI 도입', '디지털 혁신', 'AI 전략'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'kO1KsAt-xxVmSG-NhZID58sgSNuRmlCnRBNXQ01eZ1M',
  },
};

const GTM_ID = 'GTM-M7ZLLG77';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      {/* GTM 은 next/script(afterInteractive)로 싣는다. head 에 원시 삽입하면
          하이드레이션 전 파싱을 차지하고 로드 순서를 다룰 수 없다. noscript
          iframe 은 이 컴포넌트가 만들지 않으므로 그대로 둔다. */}
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <ErrorBoundary>
          <div className="min-h-screen bg-white text-[#222] relative overflow-x-clip font-sans">
            <SonyHeader />
            {/* .header + div 가 헤더 높이만큼 본문을 내린다 */}
            <div>{children}</div>
            <SonyFooter />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
