import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 홈 디렉터리에 다른 lockfile 이 있으면 Turbopack 이 워크스페이스 루트를
  // 그쪽으로 잡는다. 이 저장소가 루트다.
  turbopack: { root: __dirname },

  // 사이트맵은 빌드 시점에 프리렌더되지만 Next 기본 헤더가
  // `max-age=0, must-revalidate` 라서 CDN·프록시가 캐시하지 못하고
  // 크롤러 요청이 매번 오리진까지 온다. 배포 주기보다 짧게 잡아 캐시시킨다.
  // /content/* 는 걷어 냈다. 사이트 안에서 아무도 가지 않던 주소지만
  // 사이트맵에 실려 있었으므로 색인에 남아 있을 수 있다. 404 로 떨구지 않고
  // 영구 이전으로 넘겨, 붙어 있던 신호를 제 짝에게 물려준다.
  async redirects() {
    return [
      { source: '/content/:path*', destination: '/', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

export default nextConfig
