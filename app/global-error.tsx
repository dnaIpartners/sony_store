'use client';

// 루트 레이아웃 자체가 죽었을 때. 이때는 globals.css 도 GNB 도 없다 — html 과
// body 를 여기서 직접 그리고, 스타일은 인라인으로 최소만 둔다.

export default function GlobalError({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fcfcfc',
          color: '#0B0B0B',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          padding: '0 24px',
        }}
      >
        <main style={{ maxWidth: 560, width: '100%' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#315dd7', margin: 0 }}>
            ✦ Error
          </p>
          <h1 style={{ fontSize: 28, lineHeight: 1.2, letterSpacing: '-0.03em', fontWeight: 500, margin: '16px 0 0' }}>
            사이트를 불러오지 못했습니다
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#4b5563', margin: '20px 0 0', wordBreak: 'keep-all' }}>
            잠시 뒤 다시 시도해 주세요. 계속되면 새로고침하거나 주소를 다시 입력해 주세요.
          </p>
          {error.digest ? (
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#6b7280', margin: '12px 0 0' }}>ref {error.digest}</p>
          ) : null}
          <div style={{ marginTop: 40, display: 'flex', gap: 24, alignItems: 'center' }}>
            <button
              type="button"
              onClick={reset}
              style={{ border: '1px solid #111', background: '#0B0B0B', color: '#fff', padding: '10px 20px', fontSize: 15, cursor: 'pointer' }}
            >
              다시 시도
            </button>
            {/* 루트 레이아웃이 죽은 자리라 next/link 도 믿을 수 없다. 평범한 a 를 쓴다 */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ color: '#0B0B0B', fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 4 }}>
              홈으로 →
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
