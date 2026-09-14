import type { Metadata } from 'next';
import Link from 'next/link';
import { MONO, H2, LEAD, ACCENT } from '@/src/lib/type';

// 없는 주소. 전에는 Next 기본 영문 화면("404 | This page could not be found.")
// 이 GNB 도 풋터도 없이 떴다. 이 파일은 루트 레이아웃 안에서 그려지므로
// 위아래는 그대로 있고 가운데만 이 글이 선다.

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false, follow: false },
};

const WAYS = [
  { href: '/', label: '홈으로' },
  { href: '/#type', label: '폰트' },
  { href: '/#color', label: '색상' },
  { href: '/#components', label: '컴포넌트' },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col justify-center px-4 pb-24 pt-32 sm:px-8 md:px-12 md:pt-40">
      <p className={`${MONO} ${ACCENT}`}>
        <span aria-hidden="true" className="mr-1.5 inline-block align-middle text-[0.9375rem] leading-none">✦</span>
        404
      </p>
      <h1 className={`mt-4 ${H2}`}>
        이 주소에는 <span className="text-gray-600">페이지가 없습니다</span>
      </h1>
      <p className={`mt-5 ${LEAD}`}>
        주소가 바뀌었거나 처음부터 없던 자리입니다. 아래 가운데 하나로 돌아가시면 됩니다.
      </p>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {WAYS.map((w) => (
          <li key={w.href}>
            <Link
              href={w.href}
              className="font-pretendard text-[0.9375rem] font-medium tracking-[-0.01em] text-[#0B0B0B] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {w.label} →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
