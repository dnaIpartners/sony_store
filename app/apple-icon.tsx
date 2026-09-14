import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// public/asset/favicon.svg 와 동일한 마크: 밝은 회색 타일 위 검정 'i' 획.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EFEFEF',
        }}
      >
        <div
          style={{
            width: 22,
            height: 112,
            borderRadius: 4,
            background: '#000000',
          }}
        />
      </div>
    ),
    size,
  );
}
