import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from './seo';
import { ACCENT_LIT_HEX } from './type';

// 공유 카드(og:image)를 그림으로 굽는다.
//
// 전에는 페이지마다 /asset/og-*.png 를 가리켰는데 그 파일이 여덟 개 모두
// 저장소에 없었다. 카카오톡·슬랙·링크드인 어디에 붙여도 그림이 비어 나갔다.
//
// PNG 를 새로 만들어 넣는 대신 여기서 굽는다. 제목이 바뀌면 카드도 따라
// 바뀌고, 관리할 이진 파일이 생기지 않는다. 정적 라우트라 빌드 때 한 번
// 구워져 요청마다 그리지 않는다.
//
// 글꼴은 Pretendard 하나로 충분하다 — 라틴과 한글을 함께 담고 있어서, 제목이
// 어느 쪽이든 한 벌만 실으면 된다. satori 는 woff2 를 읽지 못하므로 otf 를
// 쓴다.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const FONT_DIR = 'node_modules/pretendard/dist/public/static';

function loadFont(file: string) {
  return readFile(path.join(process.cwd(), FONT_DIR, file));
}

type Card = {
  /** 위쪽 작은 라벨. 사이트의 뱃지와 같은 자리다 */
  eyebrow: string;
  /** 큰 제목. 줄바꿈은 배열로 직접 나눈다 */
  title: string[];
  /** 제목 아래 한 줄 */
  note?: string;
};

export async function ogCard({ eyebrow, title, note }: Card) {
  const [medium, regular] = await Promise.all([
    loadFont('Pretendard-Medium.otf'),
    loadFont('Pretendard-Regular.otf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#050505',
          padding: '72px 80px',
          fontFamily: 'Pretendard',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, backgroundColor: ACCENT_LIT_HEX }} />
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: 4,
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 40,
              fontSize: 68,
              fontWeight: 500,
              lineHeight: 1.16,
              letterSpacing: -2,
              color: '#ffffff',
            }}
          >
            {title.map((line, i) => (
              <div key={i} style={{ color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.55)' }}>
                {line}
              </div>
            ))}
          </div>

          {note ? (
            <div
              style={{
                marginTop: 28,
                fontSize: 26,
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {note}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.14)' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 24,
              fontSize: 22,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{SITE_NAME}</div>
            <div>{SITE_URL.replace(/^https?:\/\//, '')}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Pretendard', data: medium, weight: 500, style: 'normal' },
        { name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
      ],
    },
  );
}
