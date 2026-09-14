'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { MONO, H2, LEAD, ACCENT } from '@/src/lib/type';

// 라우트 안에서 난 렌더 오류. 루트 레이아웃(GNB · 풋터)은 살아 있고 이 자리만
// 바뀐다. reset() 은 그 구간을 다시 그린다 — 일시적 오류면 그것으로 풀린다.

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[route error]', error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col justify-center px-4 pb-24 pt-32 sm:px-8 md:px-12 md:pt-40">
      <p className={`${MONO} ${ACCENT}`}>
        <span aria-hidden="true" className="mr-1.5 inline-block align-middle text-[0.9375rem] leading-none">✦</span>
        Error
      </p>
      <h1 className={`mt-4 ${H2}`}>
        페이지를 그리는 중 <span className="text-gray-600">문제가 생겼습니다</span>
      </h1>
      <p className={`mt-5 ${LEAD}`}>
        잠시 뒤 다시 시도해 주세요. 계속되면 홈으로 돌아가 다른 길로 들어오시면 됩니다.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.02em] text-gray-600">ref {error.digest}</p>
      ) : null}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <button
          type="button"
          onClick={reset}
          className="border border-gray-900 bg-[#0B0B0B] px-5 py-2.5 font-pretendard text-[0.9375rem] font-medium text-white transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="font-pretendard text-[0.9375rem] font-medium tracking-[-0.01em] text-[#0B0B0B] underline-offset-4 hover:underline"
        >
          홈으로 →
        </Link>
      </div>
    </main>
  );
}
