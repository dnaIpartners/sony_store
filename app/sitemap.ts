import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/seo';

// lastModified 는 실제로 내용이 바뀐 날짜만 적는다.
// 빌드 시각을 넣으면 배포할 때마다 전 페이지가 "방금 수정됨"으로 신고되어
// 크롤러가 이 신호 자체를 신뢰하지 않게 된다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: '2026-09-01', changeFrequency: 'weekly', priority: 1.0 },
  ];
}
